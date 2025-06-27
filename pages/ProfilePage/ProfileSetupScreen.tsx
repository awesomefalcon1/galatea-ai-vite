import React, { useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { FaUser, FaEdit, FaSave, FaTimes, FaHeart, FaArrowRight, FaCamera, FaPalette, FaBell, FaLock } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';

export function ProfileSetupScreen() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Profile preferences
  const [preferences, setPreferences] = useState({
    theme: 'cyberpunk',
    notifications: true,
    autoMatch: false,
    profileVisibility: 'public'
  });

  const handleUpdateProfile = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      await updateProfile(currentUser, {
        displayName: displayName
      });
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-cyber text-[#00ffff]">PROFILE SETUP</h2>
        <div className="text-sm text-gray-400">
          Complete your profile setup
        </div>
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

      {/* Basic Information */}
      <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4 flex items-center gap-2">
          <FaUser />
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
            <button className="absolute -bottom-1 -right-1 bg-[#00ffff] text-black p-2 rounded-full hover:bg-[#c0fdff] transition-colors">
              <FaCamera className="text-xs" />
            </button>
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display Name"
                  className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ffff] transition-colors"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="bg-[#00ffff] hover:bg-[#c0fdff] text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                  >
                    <FaSave />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(currentUser.displayName || '');
                    }}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-cyber text-[#00ffff]">
                    {currentUser.displayName || 'Anonymous User'}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-[#00ffff] transition-colors"
                  >
                    <FaEdit />
                  </button>
                </div>
                <p className="text-gray-300">{currentUser.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Member since {currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4 flex items-center gap-2">
          <FaPalette />
          PREFERENCES
        </h3>
        
        <div className="space-y-4">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
            <select 
              value={preferences.theme}
              onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
              className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffff] transition-colors"
            >
              <option value="cyberpunk">Cyberpunk</option>
              <option value="neon">Neon Dreams</option>
              <option value="matrix">Matrix Green</option>
              <option value="classic">Classic Dark</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaBell className="text-[#00ffff]" />
              <div>
                <label className="block text-sm font-medium text-gray-300">Notifications</label>
                <p className="text-xs text-gray-400">Receive updates about your AI friends</p>
              </div>
            </div>
            <button
              onClick={() => setPreferences({...preferences, notifications: !preferences.notifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.notifications ? 'bg-[#00ffff]' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Auto Match */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaHeart className="text-[#ff0080]" />
              <div>
                <label className="block text-sm font-medium text-gray-300">Auto Match</label>
                <p className="text-xs text-gray-400">Automatically find compatible AI companions</p>
              </div>
            </div>
            <button
              onClick={() => setPreferences({...preferences, autoMatch: !preferences.autoMatch})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.autoMatch ? 'bg-[#ff0080]' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.autoMatch ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Profile Visibility */}
          <div>
            <label className="flex text-sm font-medium text-gray-300 mb-2 items-center gap-2">
              <FaLock className="text-[#00ffff]" />
              Profile Visibility
            </label>
            <select 
              value={preferences.profileVisibility}
              onChange={(e) => setPreferences({...preferences, profileVisibility: e.target.value})}
              className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffff] transition-colors"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dating Profile CTA */}
      <div className="bg-[#0a0b1a]/30 border border-[#ff0080]/20 rounded-lg p-6">
        <h3 className="text-lg font-cyber text-[#ff0080] mb-4">DATING PROFILE</h3>
        <p className="text-gray-300 mb-4">Create your dating profile to find meaningful connections with AI companions</p>
        <Link 
          to="/dating-profile"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff0080] to-[#00ffff] hover:from-[#ff0080]/80 hover:to-[#00ffff]/80 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          <FaHeart />
          Create Dating Profile
          <FaArrowRight />
        </Link>
      </div>

      {/* Profile Completion */}
      <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-cyber text-[#00ffff]">PROFILE COMPLETION</h3>
          <span className="text-2xl font-cyber text-[#00ffff]">85%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-[#00ffff] to-[#ff0080] h-2 rounded-full" style={{width: '85%'}}></div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Basic Info</span>
            <span className="text-green-400">Complete</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Social Accounts</span>
            <span className="text-green-400">Complete</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Preferences</span>
            <span className="text-yellow-400">Partial</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Dating Profile</span>
            <span className="text-red-400">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
