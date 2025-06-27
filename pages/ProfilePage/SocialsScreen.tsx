import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { FaGoogle, FaFacebook, FaEnvelope, FaCheck, FaUnlink, FaLink } from 'react-icons/fa';
import { updateProfile, linkWithPopup, GoogleAuthProvider, FacebookAuthProvider, unlink } from 'firebase/auth';

export function SocialsScreen() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [linkedProviders, setLinkedProviders] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      // Get linked providers
      const providers = currentUser.providerData.map(provider => provider.providerId);
      setLinkedProviders(providers);
    }
  }, [currentUser]);

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

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-cyber text-[#00ffff]">SOCIAL ACCOUNTS</h2>
        <div className="text-sm text-gray-400">
          {linkedProviders.length} account{linkedProviders.length !== 1 ? 's' : ''} connected
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

      {/* Security Note */}
      <div className="p-4 bg-[#ff0080]/10 border border-[#ff0080]/30 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-[#ff0080]">Security Note:</strong> You must have at least one authentication method connected to your account. 
          We recommend connecting multiple methods for better security and account recovery options.
        </p>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#00ffff] mb-1">{linkedProviders.length}</div>
          <div className="text-sm text-gray-400">Connected Accounts</div>
        </div>
        <div className="bg-[#0a0b1a]/30 border border-[#ff0080]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#ff0080] mb-1">100%</div>
          <div className="text-sm text-gray-400">Account Security</div>
        </div>
        <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#00ffff] mb-1">
            {currentUser.metadata.lastSignInTime ? 
              new Date(currentUser.metadata.lastSignInTime).toLocaleDateString() : 'Today'
            }
          </div>
          <div className="text-sm text-gray-400">Last Sign In</div>
        </div>
      </div>
    </div>
  );
}
