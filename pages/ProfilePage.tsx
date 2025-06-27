import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { FaGoogle, FaFacebook, FaEnvelope, FaUser, FaEdit, FaSave, FaTimes, FaCheck, FaUnlink, FaLink } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { updateProfile, linkWithPopup, GoogleAuthProvider, FacebookAuthProvider, unlink, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function ProfilePage() {
  const { currentUser, loginWithGoogle, loginWithFacebook } = useAuth();
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

  const handleLinkProvider = async (providerType: 'google' | 'facebook') => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      let provider;
      if (providerType === 'google') {
        provider = new GoogleAuthProvider();
      } else {
        provider = new FacebookAuthProvider();
      }

      await linkWithPopup(currentUser, provider);
      
      // Update linked providers
      const providers = currentUser.providerData.map(p => p.providerId);
      setLinkedProviders([...providers, provider.providerId]);
      
      setMessage(`${providerType === 'google' ? 'Google' : 'Facebook'} account linked successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        setError(`This ${providerType === 'google' ? 'Google' : 'Facebook'} account is already linked to another user.`);
      } else if (error.code === 'auth/provider-already-linked') {
        setError(`${providerType === 'google' ? 'Google' : 'Facebook'} is already linked to your account.`);
      } else {
        setError(`Failed to link ${providerType === 'google' ? 'Google' : 'Facebook'}: ` + error.message);
      }
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiSparkles className="text-[#00ffff] text-2xl" />
              <h1 className="font-cyber text-3xl text-white glitch-small" data-text="USER PROFILE">
                USER PROFILE
              </h1>
              <HiSparkles className="text-[#ff0080] text-2xl" />
            </div>
            <p className="text-gray-300">Manage your account and connected services</p>
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

          {/* Profile Card */}
          <div className="bg-[#050714]/80 backdrop-blur-md border border-[#00ffff]/30 rounded-lg p-8 shadow-lg shadow-[#00ffff]/10">
            {/* Profile Picture & Basic Info */}
            <div className="flex items-center gap-6 mb-8">
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

            {/* Connected Accounts */}
            <div>
              <h3 className="text-lg font-cyber text-[#ff0080] mb-6">CONNECTED ACCOUNTS</h3>
              
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
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-green-400" />
                    <span className="text-green-400 text-sm">Connected</span>
                  </div>
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
            </div>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-[#ff0080]/10 border border-[#ff0080]/30 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-[#ff0080]">Security Note:</strong> You must have at least one authentication method connected to your account. 
                We recommend connecting multiple methods for better security and account recovery options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
