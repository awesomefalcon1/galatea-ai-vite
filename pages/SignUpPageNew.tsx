import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, displayName);
      navigate('/');
    } catch (error: any) {
      setError('Failed to create account: ' + error.message);
    }

    setLoading(false);
  }

  async function handleGoogleSignUp() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (error: any) {
      setError('Failed to sign up with Google: ' + error.message);
    }

    setLoading(false);
  }

  async function handleFacebookSignUp() {
    try {
      setError('');
      setLoading(true);
      await loginWithFacebook();
      navigate('/');
    } catch (error: any) {
      setError('Failed to sign up with Facebook: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/5 via-transparent to-[#ff0080]/5"></div>
      <div className="scan-line opacity-20"></div>
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding & Info */}
            <div className="hidden lg:block space-y-8">
              <div className="text-center">
                <img 
                  src="/galatea-ai-white.png" 
                  alt="Galatea AI" 
                  className="w-20 h-20 mx-auto mb-6"
                />
                <h1 className="text-4xl font-cyber text-white mb-4 glitch-small" data-text="GALATEA AI">
                  GALATEA AI
                </h1>
                <h2 className="text-2xl font-bold text-[#ff0080] mb-6">FRIENDS WANTED</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Start your journey with AI companions designed to help you practice social skills and build confidence.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#00ffff]/30 rounded-lg">
                  <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Free account creation</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#ff0080]/30 rounded-lg">
                  <div className="w-3 h-3 bg-[#ff0080] rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Multiple authentication options</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#00ffff]/30 rounded-lg">
                  <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Secure and private</span>
                </div>
              </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="w-full">
              <div className="comic-panel p-8 backdrop-blur-sm max-w-md mx-auto lg:max-w-none">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                    <img 
                      src="/galatea-ai-white.png" 
                      alt="Galatea AI" 
                      className="w-12 h-12"
                    />
                    <h1 className="text-2xl font-cyber text-white">FRIENDS WANTED</h1>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <HiSparkles className="text-[#ff0080] animate-pulse text-lg" />
                    <h2 className="text-xl font-bold text-[#00ffff]">Join the Community</h2>
                    <HiSparkles className="text-[#ff0080] animate-pulse text-lg" />
                  </div>
                  <p className="text-gray-300 text-sm">Create your account and start building connections</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Display Name */}
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                      Display Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-black/30 border border-[#00ffff]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:outline-none transition-colors duration-300"
                        placeholder="Enter your display name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black/30 border border-[#00ffff]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:outline-none transition-colors duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-black/30 border border-[#00ffff]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:outline-none transition-colors duration-300"
                        placeholder="Create a strong password"
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

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-black/30 border border-[#00ffff]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#00ffff] focus:outline-none transition-colors duration-300"
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

                  {/* Terms and Privacy */}
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

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ff0080] hover:bg-[#ff4da6] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ff0080]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Sign Up Buttons */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleGoogleSignUp}
                      disabled={loading}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <FaGoogle className="text-lg" />
                      Sign up with Google
                    </button>

                    <button
                      type="button"
                      onClick={handleFacebookSignUp}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <FaFacebook className="text-lg" />
                      Sign up with Facebook
                    </button>
                  </div>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-300 text-sm">
                    Already have an account?{' '}
                    <Link 
                      to="/signin" 
                      className="text-[#00ffff] hover:text-[#c0fdff] font-medium transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
