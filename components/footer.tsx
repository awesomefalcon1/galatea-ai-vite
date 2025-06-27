import { FaRobot, FaHeart, FaTwitter, FaDiscord, FaGithub } from "react-icons/fa"
import { GiArtificialIntelligence } from "react-icons/gi"
import { Link } from "react-router-dom"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-[#050714]/95 border-t border-[#00ffff]/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-4 mb-6">
              <Logo size={40} />
              <div className="flex flex-col">
                <h3 className="font-cyber text-2xl text-[#00ffff] leading-none glitch-small" data-text="GALATEA AI">
                  GALATEA AI
                </h3>
                <p className="text-sm text-[#ff0080] font-medium tracking-wider">
                  FRIENDS WANTED
                </p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Building bridges between AI and human connection. Practice social skills, 
              build confidence, and prepare for meaningful relationships in a safe, 
              judgment-free environment.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <GiArtificialIntelligence className="text-[#00ffff]" />
              <span>Powered by Advanced AI Technology</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cyber text-lg text-[#00ffff] mb-4">EXPLORE</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 flex items-center gap-2"
                >
                  <FaRobot className="text-xs" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/companions" 
                  className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 flex items-center gap-2"
                >
                  <FaHeart className="text-xs" />
                  AI Companions
                </Link>
              </li>
              <li>
                <a 
                  href="/#how-it-works" 
                  className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 flex items-center gap-2"
                >
                  <GiArtificialIntelligence className="text-xs" />
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-cyber text-lg text-[#ff0080] mb-4">CONNECT</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-[#ff0080] transition-colors duration-300 flex items-center gap-2"
                >
                  <FaTwitter className="text-sm" />
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-[#ff0080] transition-colors duration-300 flex items-center gap-2"
                >
                  <FaDiscord className="text-sm" />
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-[#ff0080] transition-colors duration-300 flex items-center gap-2"
                >
                  <FaGithub className="text-sm" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#00ffff]/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Galatea AI. Building better connections through technology.
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#00ffff] transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-[#00ffff] transition-colors duration-300">
                Terms of Service
              </a>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1 text-gray-400">
                <FaHeart className="text-[#ff0080] text-xs" />
                <span>Made with AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
