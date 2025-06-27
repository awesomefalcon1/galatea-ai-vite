import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface SocialLoginPanelProps {
  mode: 'signin' | 'signup';
  onGoogleAuth: () => void;
  onFacebookAuth: () => void;
  loading: boolean;
}

export function SocialLoginPanel({ mode, onGoogleAuth, onFacebookAuth, loading }: SocialLoginPanelProps) {
  const isSignUp = mode === 'signup';

  return (
    <div className="h-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-[#ff0080] mb-4">
          {isSignUp ? 'Quick Sign Up' : 'Quick Sign In'}
        </h3>
        <p className="text-gray-300 text-sm">
          Use your existing social accounts
        </p>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={onGoogleAuth}
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <FaGoogle className="text-xl" />
          <span className="text-lg">
            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
          </span>
        </button>

        <button
          type="button"
          onClick={onFacebookAuth}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <FaFacebook className="text-xl" />
          <span className="text-lg">
            {isSignUp ? 'Sign up with Facebook' : 'Sign in with Facebook'}
          </span>
        </button>
      </div>

      {/* Branding Info */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#00ffff]/30 rounded-lg">
          <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse"></div>
          <span className="text-gray-300">
            {isSignUp 
              ? 'Free account creation'
              : 'Practice social skills in a safe environment'
            }
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#ff0080]/30 rounded-lg">
          <div className="w-3 h-3 bg-[#ff0080] rounded-full animate-pulse"></div>
          <span className="text-gray-300">
            {isSignUp
              ? 'Multiple authentication options'
              : 'Build confidence for real relationships'
            }
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#00ffff]/30 rounded-lg">
          <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse"></div>
          <span className="text-gray-300">
            {isSignUp
              ? 'Secure and private'
              : 'Judgment-free learning experience'
            }
          </span>
        </div>
      </div>
    </div>
  );
}
