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
import { HiSparkles } from 'react-icons/hi2';
import { updateProfile } from 'firebase/auth';
import { 
  getUserProfile, 
  saveUserProfile, 
  getUserPreferences, 
  saveUserPreferences,
  DatingProfile,
  ProfilePreferences 
} from '@/lib/datingProfile';

export function DatingProfilePage() {
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
      const userProfile = await getUserProfile(currentUser.uid);
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
      const userPrefs = await getUserPreferences(currentUser.uid);
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
      await saveUserProfile({
        ...profile,
        uid: currentUser.uid
      });
      
      // Save preferences
      await saveUserPreferences(currentUser.uid, preferences);
      
      // Update Firebase Auth profile
      if (profile.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: profile.displayName
        });
      }
      
      setMessage('Profile updated successfully!');
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

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714]">
        <div className="text-center">
          <h2 className="text-2xl font-cyber text-[#00ffff] mb-4">Access Denied</h2>
          <p className="text-gray-300">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/5 via-transparent to-[#ff0080]/5"></div>
      <div className="scan-line opacity-20"></div>
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaHeart className="text-[#ff0080] text-2xl" />
              <h1 className="font-cyber text-3xl text-white glitch-small" data-text="DATING PROFILE">
                DATING PROFILE
              </h1>
              <HiSparkles className="text-[#00ffff] text-2xl" />
            </div>
            <p className="text-gray-300">Create your perfect dating profile</p>
          </div>

          {/* Messages */}
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="bg-[#050714]/80 backdrop-blur-md border border-[#00ffff]/30 rounded-lg p-6 shadow-lg shadow-[#00ffff]/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-cyber text-[#00ffff]">PROFILE INFO</h2>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  disabled={loading}
                  className="bg-[#ff0080] hover:bg-[#ff0080]/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  {isEditing ? <FaSave /> : <FaEdit />}
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              {/* Profile Picture */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full flex items-center justify-center">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile" 
                        className="w-22 h-22 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-white text-2xl" />
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 bg-[#ff0080] hover:bg-[#ff0080]/80 text-white p-2 rounded-full transition-all duration-300">
                      <FaCamera className="text-sm" />
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
                    <h3 className="text-2xl font-cyber text-white">{profile.displayName || 'Your Name'}</h3>
                  )}
                </div>
              </div>

              {/* Basic Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">About Me</label>
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
              </div>
            </div>

            {/* Right Column - Interests & Preferences */}
            <div className="space-y-6">
              {/* Interests */}
              <div className="bg-[#050714]/80 backdrop-blur-md border border-[#ff0080]/30 rounded-lg p-6 shadow-lg shadow-[#ff0080]/10">
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
                        .slice(0, 10)
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
                <div className="bg-[#050714]/80 backdrop-blur-md border border-[#00ffff]/30 rounded-lg p-6 shadow-lg shadow-[#00ffff]/10">
                  <h3 className="text-lg font-cyber text-[#00ffff] mb-4">PREFERENCES</h3>
                  
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
