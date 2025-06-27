import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { FaGoogle, FaFacebook, FaEnvelope, FaUser, FaEdit, FaSave, FaTimes, FaCheck, FaUnlink, FaLink, FaHeart, FaArrowRight, FaCog, FaUsers } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { updateProfile, linkWithPopup, GoogleAuthProvider, FacebookAuthProvider, unlink, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Link } from 'react-router-dom';

type ProfileScreen = 'socials' | 'profile-setup' | 'friends';

export function ProfilePage() {
  const { currentUser, loginWithGoogle, loginWithFacebook } = useAuth();
  const [activeScreen, setActiveScreen] = useState<ProfileScreen>('socials');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Check which providers are linked
  const [linkedProviders, setLinkedProviders] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      
      // Get linked providers
      const providers = currentUser.providerData.map(provider => provider.providerId);
      setLinkedProviders(providers);
    }
  }, [currentUser]);

  const sidebarItems = [
    {
      id: 'socials' as ProfileScreen,
      label: 'Social Accounts',
      icon: FaLink,
      description: 'Connect your accounts'
    },
    {
      id: 'profile-setup' as ProfileScreen,
      label: 'Profile Setup',
      icon: FaCog,
      description: 'Personal preferences'
    },
    {
      id: 'friends' as ProfileScreen,
      label: 'AI Friends',
      icon: FaUsers,
      description: 'Connected companions'
    }
  ];

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

  const handleLinkProvider = async (provider: 'google' | 'facebook') => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      const authProvider = provider === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
      await linkWithPopup(currentUser, authProvider);
      
      // Update linked providers
      const newProviderId = provider === 'google' ? 'google.com' : 'facebook.com';
      setLinkedProviders([...linkedProviders, newProviderId]);
      
      setMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} account linked successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setError('Failed to link provider: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlinkProvider = async (providerId: string) => {
    if (!currentUser) return;

    // Don't allow unlinking if it's the only provider
    if (linkedProviders.length <= 1) {
      setError('Cannot unlink the only authentication method. Please link another provider first.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await unlink(currentUser, providerId);
      
      // Update linked providers
      setLinkedProviders(linkedProviders.filter(p => p !== providerId));
      
      const providerName = providerId === 'google.com' ? 'Google' : 
                          providerId === 'facebook.com' ? 'Facebook' : 
                          'Email';
      
      setMessage(`${providerName} account unlinked successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setError('Failed to unlink provider: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isProviderLinked = (providerId: string) => {
    return linkedProviders.includes(providerId);
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiSparkles className="text-[#00ffff] text-2xl" />
              <h1 className="font-cyber text-3xl text-white glitch-small" data-text="USER PROFILE">
                USER PROFILE
              </h1>
              <HiSparkles className="text-[#ff0080] text-2xl" />
            </div>
            <p className="text-gray-300">
              Welcome back, {currentUser.displayName || currentUser.email?.split('@')[0] || 'Friend'}!
            </p>
          </div>

          {/* Main Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="comic-panel p-6 sticky top-24">
                <h3 className="font-cyber text-lg text-[#00ffff] mb-6">Navigation</h3>
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeScreen === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveScreen(item.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          isActive 
                            ? 'bg-[#00ffff]/20 border border-[#00ffff]/50 text-[#00ffff]' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs opacity-75">{item.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeScreen === 'socials' && <SocialsScreen 
                currentUser={currentUser}
                linkedProviders={linkedProviders}
                setLinkedProviders={setLinkedProviders}
                loading={loading}
                setLoading={setLoading}
                message={message}
                setMessage={setMessage}
                error={error}
                setError={setError}
                handleLinkProvider={handleLinkProvider}
                handleUnlinkProvider={handleUnlinkProvider}
                isProviderLinked={isProviderLinked}
              />}
              {activeScreen === 'profile-setup' && <ProfileSetupScreen currentUser={currentUser} />}
              {activeScreen === 'friends' && <FriendsScreen currentUser={currentUser} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Socials Screen Component
function SocialsScreen({ 
  currentUser, 
  linkedProviders, 
  setLinkedProviders, 
  loading, 
  setLoading, 
  message, 
  setMessage, 
  error, 
  setError,
  handleLinkProvider,
  handleUnlinkProvider,
  isProviderLinked 
}: any) {
  return (
    <div className="space-y-6">
      <div className="comic-panel p-6">
        <h3 className="font-cyber text-xl text-[#00ffff] mb-4">Social Accounts</h3>
        <p className="text-gray-300 mb-6">
          Connect and manage your social media accounts for easier sign-in and enhanced security.
        </p>

        {/* Messages */}
        {message && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between p-4 bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#00ffff] text-xl" />
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-gray-400 text-sm">{currentUser.email}</p>
              </div>
            </div>
            <FaCheck className="text-green-400" />
          </div>

          {/* Google */}
          <div className="flex items-center justify-between p-4 bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <FaGoogle className="text-red-400 text-xl" />
              <div>
                <p className="text-white font-medium">Google</p>
                <p className="text-gray-400 text-sm">
                  {isProviderLinked('google.com') ? 'Connected to your Google account' : 'Not connected'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isProviderLinked('google.com') ? (
                <>
                  <button
                    onClick={() => handleUnlinkProvider('google.com')}
                    disabled={loading}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <FaUnlink />
                    Unlink
                  </button>
                  <FaCheck className="text-green-400 ml-2" />
                </>
              ) : (
                <button
                  onClick={() => handleLinkProvider('google')}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  <FaLink />
                  Connect
                </button>
              )}
            </div>
          </div>

          {/* Facebook */}
          <div className="flex items-center justify-between p-4 bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <FaFacebook className="text-blue-400 text-xl" />
              <div>
                <p className="text-white font-medium">Facebook</p>
                <p className="text-gray-400 text-sm">
                  {isProviderLinked('facebook.com') ? 'Connected to your Facebook account' : 'Not connected'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isProviderLinked('facebook.com') ? (
                <>
                  <button
                    onClick={() => handleUnlinkProvider('facebook.com')}
                    disabled={loading}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <FaUnlink />
                    Unlink
                  </button>
                  <FaCheck className="text-green-400 ml-2" />
                </>
              ) : (
                <button
                  onClick={() => handleLinkProvider('facebook')}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  <FaLink />
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-[#ff0080]/10 border border-[#ff0080]/30 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong className="text-[#ff0080]">Security Note:</strong> You must have at least one authentication method connected to your account. 
            We recommend connecting multiple methods for better security and account recovery options.
          </p>
        </div>
      </div>
    </div>
  );
}

// Profile Setup Screen Component  
function ProfileSetupScreen({ currentUser }: any) {
  return (
    <div className="space-y-6">
      <div className="comic-panel p-6">
        <h3 className="font-cyber text-xl text-[#00ffff] mb-4">Profile Setup</h3>
        <p className="text-gray-300 mb-6">
          Set up your preferences for AI companion matching and interactions.
        </p>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#00ffff]"
                  placeholder="Your display name"
                  defaultValue={currentUser?.displayName || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#00ffff]"
                  placeholder="Your age"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">About You</h4>
            <textarea
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#00ffff]"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Interests */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Interests</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Technology', 'Gaming', 'Art', 'Music', 'Sports', 'Movies', 'Books', 'Travel', 'Cooking'].map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-600 text-[#00ffff] focus:ring-[#00ffff]" />
                  <span className="text-gray-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Companion Preferences */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Companion Preferences</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Looking For</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#00ffff]">
                  <option>Friendship</option>
                  <option>Mentorship</option>
                  <option>Practice Partner</option>
                  <option>All Types</option>
                </select>
              </div>
            </div>
          </div>

          <button className="bg-[#00ffff] hover:bg-[#00cccc] text-black font-medium px-6 py-3 rounded-lg transition-all duration-300">
            Save Profile Setup
          </button>
        </div>
      </div>
    </div>
  );
}

// Friends Screen Component
function FriendsScreen({ currentUser }: any) {
  const mockFriends = [
    { id: 1, name: 'Zara', type: 'Tech Enthusiast', status: 'online', avatar: '🤖' },
    { id: 2, name: 'Alex', type: 'Creative Artist', status: 'offline', avatar: '🎨' },
    { id: 3, name: 'Morgan', type: 'Social Connector', status: 'online', avatar: '🌟' },
  ];

  return (
    <div className="space-y-6">
      <div className="comic-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-cyber text-xl text-[#00ffff] mb-2">AI Friends</h3>
            <p className="text-gray-300">Your connected AI companions</p>
          </div>
          <Link 
            to="/matches" 
            className="bg-[#ff0080] hover:bg-[#cc0066] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          >
            <FaHeart />
            Find New Friends
          </Link>
        </div>

        <div className="space-y-4">
          {mockFriends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between p-4 bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg hover:border-[#00ffff]/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{friend.avatar}</div>
                <div>
                  <h4 className="text-white font-medium">{friend.name}</h4>
                  <p className="text-gray-400 text-sm">{friend.type}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span className="text-xs text-gray-400 capitalize">{friend.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#00ffff] hover:bg-[#00cccc] text-black px-4 py-2 rounded-lg font-medium transition-all duration-300">
                  Chat
                </button>
                <button className="text-gray-400 hover:text-white px-2">
                  <FaCog />
                </button>
              </div>
            </div>
          ))}

          {mockFriends.length === 0 && (
            <div className="text-center py-12">
              <FaUsers className="text-4xl text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg text-gray-400 mb-2">No AI friends yet</h4>
              <p className="text-gray-500 mb-4">Start by finding some AI companions to connect with!</p>
              <Link 
                to="/matches" 
                className="bg-[#00ffff] hover:bg-[#00cccc] text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaArrowRight />
                Discover Companions
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
