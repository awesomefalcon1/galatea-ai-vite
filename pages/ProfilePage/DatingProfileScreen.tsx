import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { 
  FaHeart, 
  FaUser, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaBirthdayCake,
  FaCamera,
  FaPlus,
  FaMinus,
  FaCheck
} from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';

// Mock functions for now - these would be replaced with actual Firebase functions
const mockGetUserProfile = async (uid: string) => null;
const mockSaveUserProfile = async (profile: any) => {};
const mockGetUserPreferences = async (uid: string) => null;
const mockSaveUserPreferences = async (uid: string, preferences: any) => {};

interface DatingProfile {
  uid?: string;
  displayName?: string;
  age?: number;
  bio?: string;
  location?: string;
  interests?: string[];
  lookingFor?: string;
  genderIdentity?: string;
  genderPreference?: string[];
  photos?: string[];
  verified?: boolean;
}

interface ProfilePreferences {
  ageRange: { min: number; max: number };
  maxDistance: number;
  genderPreference: string[];
  lookingFor: string[];
}

export function DatingProfileScreen() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Profile state
  const [profile, setProfile] = useState<Partial<DatingProfile>>({
    displayName: '',
    age: 18,
    bio: '',
    location: '',
    interests: [],
    lookingFor: 'dating',
    genderIdentity: '',
    genderPreference: [],
    photos: [],
    verified: false
  });

  // Preferences state
  const [preferences, setPreferences] = useState<ProfilePreferences>({
    ageRange: { min: 18, max: 99 },
    maxDistance: 50,
    genderPreference: [],
    lookingFor: ['dating']
  });

  const [newInterest, setNewInterest] = useState('');

  // Interest suggestions
  const interestSuggestions = [
    'Gaming', 'Music', 'Movies', 'Travel', 'Cooking', 'Fitness', 'Reading',
    'Art', 'Photography', 'Dancing', 'Hiking', 'Sports', 'Tech', 'Fashion',
    'Food', 'Anime', 'Pets', 'Nature', 'Science', 'History', 'Politics',
    'Business', 'Cryptocurrency', 'AI', 'Programming', 'Design', 'Writing'
  ];

  const genderOptions = [
    'Man', 'Woman', 'Non-binary', 'Genderfluid', 'Agender', 'Other', 'Prefer not to say'
  ];

  const lookingForOptions = [
    { value: 'friendship', label: 'Friendship' },
    { value: 'casual', label: 'Something casual' },
    { value: 'dating', label: 'Dating' },
    { value: 'serious', label: 'Long-term relationship' }
  ];

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Load profile
      const userProfile = await mockGetUserProfile(currentUser.uid);
      if (userProfile) {
        setProfile(userProfile);
      } else {
        // Initialize with basic info
        setProfile(prev => ({
          ...prev,
          uid: currentUser.uid,
          displayName: currentUser.displayName || '',
        }));
      }
      
      // Load preferences
      const userPrefs = await mockGetUserPreferences(currentUser.uid);
      if (userPrefs) {
        setPreferences(userPrefs);
      }
    } catch (error: any) {
      setError('Failed to load profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      // Save profile to Firestore
      await mockSaveUserProfile({
        ...profile,
        uid: currentUser.uid
      });
      
      // Save preferences
      await mockSaveUserPreferences(currentUser.uid, preferences);
      
      // Update Firebase Auth profile
      if (profile.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: profile.displayName
        });
      }
      
      setMessage('Dating profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests?.includes(interest) && profile.interests!.length < 10) {
      setProfile(prev => ({
        ...prev,
        interests: [...(prev.interests || []), interest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests?.filter(i => i !== interest) || []
    }));
  };

  const toggleGenderPreference = (gender: string) => {
    setPreferences(prev => ({
      ...prev,
      genderPreference: prev.genderPreference.includes(gender)
        ? prev.genderPreference.filter(g => g !== gender)
        : [...prev.genderPreference, gender]
    }));
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-cyber text-[#00ffff]">DATING PROFILE</h2>
        <button
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          disabled={loading}
          className="bg-[#ff0080] hover:bg-[#ff0080]/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center">
          {message}
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
          {error}
        </div>
      )}

      {/* Profile Picture & Basic Info */}
      <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4 flex items-center gap-2">
          <FaHeart />
          BASIC INFORMATION
        </h3>
        
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full flex items-center justify-center">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="Profile" 
                  className="w-18 h-18 rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-white text-2xl" />
              )}
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 bg-[#ff0080] hover:bg-[#ff0080]/80 text-white p-2 rounded-full transition-all duration-300">
                <FaCamera className="text-xs" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="Your name"
                className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ffff] transition-colors"
              />
            ) : (
              <h3 className="text-xl font-cyber text-white">{profile.displayName || 'Your Name'}</h3>
            )}
          </div>
        </div>

        {/* Basic Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaBirthdayCake className="inline mr-2" />
              Age
            </label>
            {isEditing ? (
              <input
                type="number"
                min="18"
                max="99"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffff] transition-colors"
              />
            ) : (
              <p className="text-white">{profile.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Your city"
                className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ffff] transition-colors"
              />
            ) : (
              <p className="text-white">{profile.location || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender Identity</label>
            {isEditing ? (
              <select
                value={profile.genderIdentity}
                onChange={(e) => setProfile(prev => ({ ...prev, genderIdentity: e.target.value }))}
                className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffff] transition-colors"
              >
                <option value="">Select gender</option>
                {genderOptions.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            ) : (
              <p className="text-white">{profile.genderIdentity || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Looking For</label>
            {isEditing ? (
              <select
                value={profile.lookingFor}
                onChange={(e) => setProfile(prev => ({ ...prev, lookingFor: e.target.value as any }))}
                className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffff] transition-colors"
              >
                {lookingForOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <p className="text-white">
                {lookingForOptions.find(opt => opt.value === profile.lookingFor)?.label || 'Not specified'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4">ABOUT ME</h3>
        {isEditing ? (
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell people about yourself..."
            rows={4}
            className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ffff] transition-colors resize-none"
          />
        ) : (
          <p className="text-white whitespace-pre-wrap">{profile.bio || 'No bio added yet.'}</p>
        )}
      </div>

      {/* Interests */}
      <div className="bg-[#0a0b1a]/30 border border-[#ff0080]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4">INTERESTS</h3>
        
        {isEditing && (
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
                className="flex-1 bg-[#0a0b1a]/50 border border-[#ff0080]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff0080] transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && addInterest(newInterest)}
              />
              <button
                onClick={() => addInterest(newInterest)}
                className="bg-[#ff0080] hover:bg-[#ff0080]/80 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                <FaPlus />
              </button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {interestSuggestions
                .filter(suggestion => !profile.interests?.includes(suggestion))
                .slice(0, 8)
                .map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => addInterest(suggestion)}
                  className="text-xs bg-[#ff0080]/20 hover:bg-[#ff0080]/30 text-gray-300 px-3 py-1 rounded-full transition-all duration-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {profile.interests?.map(interest => (
            <div 
              key={interest}
              className="bg-[#ff0080]/20 border border-[#ff0080]/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {interest}
              {isEditing && (
                <button
                  onClick={() => removeInterest(interest)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <FaMinus className="text-xs" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      {isEditing && (
        <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-6">
          <h3 className="text-lg font-cyber text-[#00ffff] mb-4">MATCHING PREFERENCES</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age Range: {preferences.ageRange.min} - {preferences.ageRange.max}
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="18"
                  max="99"
                  value={preferences.ageRange.min}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    ageRange: { ...prev.ageRange, min: parseInt(e.target.value) }
                  }))}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="18"
                  max="99"
                  value={preferences.ageRange.max}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    ageRange: { ...prev.ageRange, max: parseInt(e.target.value) }
                  }))}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Distance: {preferences.maxDistance} km
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={preferences.maxDistance}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  maxDistance: parseInt(e.target.value)
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender Preference</label>
              <div className="flex flex-wrap gap-2">
                {genderOptions.map(gender => (
                  <button
                    key={gender}
                    onClick={() => toggleGenderPreference(gender)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      preferences.genderPreference.includes(gender)
                        ? 'bg-[#00ffff] text-black'
                        : 'bg-[#0a0b1a]/50 border border-[#00ffff]/30 text-gray-300'
                    }`}
                  >
                    {gender}
                    {preferences.genderPreference.includes(gender) && (
                      <FaCheck className="inline ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Completion Status */}
      <div className="bg-[#0a0b1a]/30 border border-[#ff0080]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4">PROFILE STATUS</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300">Profile Completion</span>
          <span className="text-[#00ffff] font-cyber">
            {Math.round(
              ((profile.displayName ? 1 : 0) +
              (profile.age ? 1 : 0) +
              (profile.bio ? 1 : 0) +
              (profile.location ? 1 : 0) +
              (profile.genderIdentity ? 1 : 0) +
              (profile.interests && profile.interests.length > 0 ? 1 : 0)) / 6 * 100
            )}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#ff0080] to-[#00ffff] h-2 rounded-full transition-all duration-300" 
            style={{
              width: `${Math.round(
                ((profile.displayName ? 1 : 0) +
                (profile.age ? 1 : 0) +
                (profile.bio ? 1 : 0) +
                (profile.location ? 1 : 0) +
                (profile.genderIdentity ? 1 : 0) +
                (profile.interests && profile.interests.length > 0 ? 1 : 0)) / 6 * 100
              )}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
