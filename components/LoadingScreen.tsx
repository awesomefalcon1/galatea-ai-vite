import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

interface LoadingScreenProps {
  message?: string;
  provider?: 'google' | 'facebook' | null;
}

export function LoadingScreen({ message, provider }: LoadingScreenProps) {
  const getProviderIcon = () => {
    if (provider === 'google') return <FaGoogle className="text-4xl" />;
    if (provider === 'facebook') return <FaFacebook className="text-4xl" />;
    return <HiSparkles className="text-4xl animate-pulse" />;
  };

  const getProviderColor = () => {
    if (provider === 'google') return 'text-red-400';
    if (provider === 'facebook') return 'text-blue-400';
    return 'text-[#00ffff]';
  };

  return (
    <div className="fixed inset-0 bg-[#050714]/95 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/5 via-transparent to-[#ff0080]/5"></div>
      <div className="scan-line opacity-20"></div>

      {/* Loading content */}
      <div className="text-center space-y-6">
        {/* Animated icon */}
        <div className={`${getProviderColor()} animate-pulse flex justify-center`}>
          {getProviderIcon()}
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-cyber text-white glitch-small" data-text="AUTHENTICATING">
            AUTHENTICATING
          </h2>
          {message && (
            <p className="text-gray-300 text-lg">{message}</p>
          )}
        </div>

        {/* Loading animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-[#ff0080] rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>

        {/* Cyberpunk loading bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff0080] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
