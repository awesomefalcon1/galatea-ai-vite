import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { 
  FaHeart, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaBirthdayCake,
  FaStar,
  FaFilter,
  FaSearch
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { 
  getPotentialMatches, 
  getUserProfile, 
  getUserPreferences, 
  DatingProfile,
  ProfilePreferences 
} from '@/lib/datingProfile';

export function MatchesPage() {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<DatingProfile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<DatingProfile | null>(null);
  const [preferences, setPreferences] = useState<ProfilePreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    if (currentUser) {
      loadMatches();
    }
  }, [currentUser]);

  const loadMatches = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Load user's profile and preferences
      const [userProfile, userPrefs] = await Promise.all([
        getUserProfile(currentUser.uid),
        getUserPreferences(currentUser.uid)
      ]);
      
      if (!userProfile) {
        setError('Please complete your dating profile first');
        return;
      }
      
      if (!userPrefs) {
        setError('Please set your preferences first');
        return;
      }
      
      setCurrentProfile(userProfile);
      setPreferences(userPrefs);
      
      // Get potential matches
      const potentialMatches = await getPotentialMatches(currentUser.uid, userPrefs, userProfile);
      setMatches(potentialMatches);
      
    } catch (error: any) {
      setError('Failed to load matches: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    // TODO: Implement like functionality (save to matches collection)
    console.log('Liked:', matches[currentMatchIndex]);
    nextMatch();
  };

  const handlePass = () => {
    // TODO: Implement pass functionality (save to passes collection)
    console.log('Passed:', matches[currentMatchIndex]);
    nextMatch();
  };

  const nextMatch = () => {
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(prev => prev + 1);
    } else {
      // No more matches
      setMatches([]);
    }
  };

  const calculateAge = (birthDate: Date | string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714]">
        <div className="text-center">
          <h2 className="text-2xl font-cyber text-[#00ffff] mb-4">Access Denied</h2>
          <p className="text-gray-300">Please sign in to view matches.</p>
        </div>
      </div>
    );
  }

  const currentMatch = matches[currentMatchIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/5 via-transparent to-[#ff0080]/5"></div>
      <div className="scan-line opacity-20"></div>
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaHeart className="text-[#ff0080] text-2xl" />
              <h1 className="font-cyber text-3xl text-white glitch-small" data-text="DISCOVER">
                DISCOVER
              </h1>
              <HiSparkles className="text-[#00ffff] text-2xl" />
            </div>
            <p className="text-gray-300">Find your perfect AI companion match</p>
          </div>

          {/* Error state */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              {error}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ffff] mx-auto mb-4"></div>
              <p className="text-gray-300">Finding your matches...</p>
            </div>
          )}

          {/* No matches */}
          {!loading && matches.length === 0 && !error && (
            <div className="text-center py-12">
              <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No more matches</h3>
              <p className="text-gray-300 mb-6">
                We've shown you all potential matches. Check back later for new people!
              </p>
              <button
                onClick={loadMatches}
                className="bg-[#ff0080] hover:bg-[#ff0080]/80 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Refresh Matches
              </button>
            </div>
          )}

          {/* Match Card */}
          {currentMatch && (
            <div className="relative">
              <div className="bg-[#050714]/80 backdrop-blur-md border border-[#00ffff]/30 rounded-lg overflow-hidden shadow-lg shadow-[#00ffff]/10">
                {/* Profile Image */}
                <div className="h-96 bg-gradient-to-br from-[#00ffff]/20 to-[#ff0080]/20 flex items-center justify-center relative">
                  {currentMatch.photos && currentMatch.photos.length > 0 ? (
                    <img 
                      src={currentMatch.photos[0]} 
                      alt={currentMatch.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl text-white font-cyber">
                          {currentMatch.displayName?.charAt(0) || '?'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Match info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-2xl font-cyber text-white mb-1">
                      {currentMatch.displayName}, {currentMatch.age}
                    </h2>
                    {currentMatch.location && (
                      <p className="text-gray-300 flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {currentMatch.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                  {/* Bio */}
                  {currentMatch.bio && (
                    <div className="mb-4">
                      <h3 className="text-lg font-cyber text-[#00ffff] mb-2">About</h3>
                      <p className="text-gray-300">{currentMatch.bio}</p>
                    </div>
                  )}

                  {/* Looking For */}
                  <div className="mb-4">
                    <h3 className="text-lg font-cyber text-[#ff0080] mb-2">Looking For</h3>
                    <span className="bg-[#ff0080]/20 border border-[#ff0080]/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentMatch.lookingFor}
                    </span>
                  </div>

                  {/* Interests */}
                  {currentMatch.interests && currentMatch.interests.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-cyber text-[#00ffff] mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentMatch.interests.slice(0, 6).map((interest, index) => (
                          <span 
                            key={index}
                            className="bg-[#00ffff]/20 border border-[#00ffff]/50 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                        {currentMatch.interests.length > 6 && (
                          <span className="text-gray-400 text-sm">
                            +{currentMatch.interests.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-8 mt-8">
                <button
                  onClick={handlePass}
                  className="w-16 h-16 bg-gray-600 hover:bg-gray-500 text-white rounded-full flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                  <FaTimes />
                </button>
                
                <button
                  onClick={handleLike}
                  className="w-16 h-16 bg-gradient-to-r from-[#ff0080] to-[#ff0080]/80 hover:from-[#ff0080]/80 hover:to-[#ff0080]/60 text-white rounded-full flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 shadow-lg shadow-[#ff0080]/50"
                >
                  <FaHeart />
                </button>
              </div>

              {/* Match Counter */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">
                  {currentMatchIndex + 1} of {matches.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
