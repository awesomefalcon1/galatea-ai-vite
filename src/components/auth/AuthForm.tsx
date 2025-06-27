import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  formData: {
    email: string;
    password: string;
    confirmPassword?: string;
    displayName?: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
}

export function AuthForm({ mode, formData, onChange, onSubmit, loading, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isSignUp = mode === 'signup';

  return (
    <div className="comic-panel p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src="/galatea-ai-white.png"
            alt="Galatea AI"
            className="w-12 h-12"
          />
          <h1 className="text-2xl font-cyber text-white">
            FRIENDS WANTED
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <HiSparkles className="text-[#ff0080] animate-pulse text-lg" />
          <h2 className="text-xl font-bold text-[#00ffff]">
            {isSignUp ? 'Join the Community' : 'Welcome Back'}
          </h2>
          <HiSparkles className="text-[#ff0080] animate-pulse text-lg" />
        </div>
        <p className="text-gray-300 text-sm">
          {isSignUp 
            ? 'Create your account and start building connections'
            : 'Sign in to continue your AI companion journey'
          }
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Display Name (Sign Up only) */}
        {isSignUp && (
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Display Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="displayName"
                type="text"
                value={formData.displayName || ''}
                onChange={(e) => onChange('displayName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-colors"
                placeholder="Enter your display name"
              />
            </div>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => onChange('password', e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-colors"
              placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password (Sign Up only) */}
        {isSignUp && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword || ''}
                onChange={(e) => onChange('confirmPassword', e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-colors"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        )}

        {/* Forgot Password Link (Sign In only) */}
        {!isSignUp && (
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#00ffff] hover:text-[#c0fdff] transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        )}

        {/* Terms and Privacy (Sign Up only) */}
        {isSignUp && (
          <div className="text-xs text-gray-400 text-center">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-[#00ffff] hover:text-[#c0fdff] transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-[#00ffff] hover:text-[#c0fdff] transition-colors">
              Privacy Policy
            </Link>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
            isSignUp
              ? 'bg-[#ff0080] hover:bg-[#ff4da6] text-white hover:shadow-[#ff0080]/50'
              : 'bg-[#00ffff] hover:bg-[#c0fdff] text-black hover:shadow-[#00ffff]/50'
          }`}
        >
          {loading 
            ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
            : (isSignUp ? 'Create Account' : 'Sign In')
          }
        </button>

        {/* Navigation Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Link
              to={isSignUp ? "/signin" : "/signup"}
              className={`font-medium transition-colors ${
                isSignUp 
                  ? 'text-[#00ffff] hover:text-[#c0fdff]'
                  : 'text-[#ff0080] hover:text-[#ff4da6]'
              }`}
            >
              {isSignUp ? 'Sign in here' : 'Create one here'}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
