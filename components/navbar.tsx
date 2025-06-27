import { useState } from "react"
import { Link } from "react-router-dom"
import { FaRobot, FaUsers, FaBrain, FaSignOutAlt, FaUser, FaHeart } from "react-icons/fa"
import { HiMenu, HiX } from "react-icons/hi"
import { useAuth } from "@contexts/AuthContext"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050714]/95 backdrop-blur-md border-b border-[#00ffff]/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src="/galatea-ai-white.png" 
              alt="Galatea AI" 
              className="w-8 h-8 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="font-cyber text-xl text-[#00ffff] leading-none glitch-small" data-text="GALATEA AI">
                GALATEA AI
              </h1>
              <p className="text-xs text-[#ff0080] font-medium tracking-wider">
                FRIENDS WANTED
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 flex items-center gap-2"
            >
              <FaRobot className="text-sm" />
              About
            </Link>
            <Link 
              to="/companions" 
              className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 flex items-center gap-2"
            >
              <FaUsers className="text-sm" />
              Companions
            </Link>
            <Link 
              to="/matches" 
              className="text-gray-300 hover:text-[#ff0080] transition-colors duration-300 flex items-center gap-2"
            >
              <FaHeart className="text-sm" />
              Discover
            </Link>
            <a 
              href="/#how-it-works" 
              className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 flex items-center gap-2"
            >
              <FaBrain className="text-sm" />
              How It Works
            </a>
            
            {/* Auth buttons */}
            <div className="flex items-center gap-3">
              {currentUser ? (
                // Authenticated user menu
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 px-4 py-2 rounded-lg border border-transparent hover:border-[#00ffff]/30 flex items-center gap-2"
                  >
                    <FaUser className="text-sm" />
                    Profile
                  </Link>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-sm">
                      Welcome, {currentUser.displayName || currentUser.email?.split('@')[0] || 'Friend'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-[#ff0080] transition-colors duration-300 px-4 py-2 rounded-lg border border-transparent hover:border-[#ff0080]/30 flex items-center gap-2"
                  >
                    <FaSignOutAlt className="text-sm" />
                    Sign Out
                  </button>
                </div>
              ) : (
                // Unauthenticated user buttons
                <>
                  <Link
                    to="/signin"
                    className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 px-4 py-2 rounded-lg border border-transparent hover:border-[#00ffff]/30"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#00ffff] hover:bg-[#c0fdff] text-black font-bold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ffff]/50"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#00ffff] hover:text-[#ff0080] transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#050714]/98 border-t border-[#00ffff]/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/about"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#00ffff] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaRobot className="text-sm" />
                About
              </Link>
              <Link
                to="/companions"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#00ffff] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUsers className="text-sm" />
                Companions
              </Link>
              <a
                href="/#how-it-works"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#00ffff] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaBrain className="text-sm" />
                How It Works
              </a>
              
              {/* Mobile auth buttons */}
              <div className="px-3 py-2 space-y-2">
                <Link
                  to="/auth/signin"
                  className="block w-full text-center text-gray-300 hover:text-[#00ffff] py-2 rounded-lg border border-[#00ffff]/30 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="block w-full text-center bg-[#00ffff] hover:bg-[#c0fdff] text-black font-bold py-2 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
