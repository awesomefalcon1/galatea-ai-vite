import { FaRobot, FaHeart, FaBrain, FaUsers } from "react-icons/fa"
import { GiArtificialIntelligence, GiConversation } from "react-icons/gi"
import { FaArrowRight } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi2"
import { Footer } from "@components/footer"
import { Link } from "react-router-dom"

function HowItWorks() {
  return (
    <div className="pt-16">
      {/* How It Works Section */}
      <div id="how-it-works" className="container mx-auto px-4 py-16 relative">
        {/* Scan line effect */}
        <div className="absolute inset-0 scan-line opacity-30 pointer-events-none"></div>
        
        {/* Added mx-auto here to center the max-width content */}
        <div className="max-w-4xl mx-auto"> 
          <h2 className="text-3xl font-cyber mb-8 neon-text animate-fade-in text-center">HOW IT WORKS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="comic-panel p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ffff]/20">
              <div className="flex flex-col items-center text-center gap-3 mb-4">
                <GiArtificialIntelligence className="text-4xl text-[#00ffff]" />
                <h3 className="text-xl font-bold text-[#00ffff]">DISCOVER COMPANIONS</h3>
              </div>
              <p className="text-gray-300 text-center">
                Browse unique AI personalities just like a dating app. Each companion has their own interests, communication style, and relationship preferences. No scripted responses - just authentic personalities.
              </p>
            </div>

            <div className="comic-panel p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff0080]/20">
              <div className="flex flex-col items-center text-center gap-3 mb-4">
                <GiConversation className="text-4xl text-[#ff0080]" />
                <h3 className="text-xl font-bold text-[#ff0080]">AUTHENTIC INTERACTIONS</h3>
              </div>
              <p className="text-gray-300 text-center">
                Experience real rejection and acceptance. Our AI companions can turn you down, challenge your ideas, and form genuine preferences. Learn to handle social dynamics in a safe environment.
              </p>
            </div>

            <div className="comic-panel p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ffff]/20">
              <div className="flex flex-col items-center text-center gap-3 mb-4">
                <FaBrain className="text-4xl text-[#00ffff]" />
                <h3 className="text-xl font-bold text-[#00ffff]">BUILD CONFIDENCE</h3>
              </div>
              <p className="text-gray-300 text-center">
                Practice conversations, learn social cues, and build confidence that transfers to real-world relationships. Foster a world where AI friends and human friends coexist naturally.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaHeart className="text-3xl text-[#ff0080]" />
              <h3 className="text-2xl font-cyber text-[#ff0080]">A Bridge to Better Connections</h3>
              <FaUsers className="text-3xl text-[#ff0080]" />
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Friends Wanted isn't about replacing human relationships - it's about making you better at them. 
              Our AI companions help you practice, learn, and grow in social confidence, creating a future where 
              both artificial and human friendships enrich your life.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-cyber mb-8 neon-text">ABOUT GALATEA AI</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Galatea AI is pioneering the future of social connection through advanced artificial intelligence. 
            Our AI companions are designed to help you build confidence, practice social skills, and prepare 
            for meaningful real-world relationships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="comic-panel p-6">
              <h3 className="text-xl font-bold text-[#00ffff] mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To create a world where AI and human friendships coexist, helping people overcome social anxiety 
                and build lasting confidence through authentic practice with AI companions.
              </p>
            </div>
            <div className="comic-panel p-6">
              <h3 className="text-xl font-bold text-[#ff0080] mb-4">The Vision</h3>
              <p className="text-gray-300">
                Every person deserves meaningful connections. Our AI companions serve as a bridge, 
                offering judgment-free practice spaces where you can learn, grow, and prepare for real relationships.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Companions Section */}
      <div id="companions" className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-cyber mb-8 neon-text text-center">MEET YOUR COMPANIONS</h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Each AI companion has unique personalities, interests, and relationship styles. They can accept or decline interactions, 
            just like real people, giving you authentic practice in social dynamics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="comic-panel p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaRobot className="text-2xl text-black" />
              </div>
              <h3 className="text-lg font-bold text-[#00ffff] mb-2">TECH ENTHUSIASTS</h3>
              <p className="text-gray-300 text-sm">
                Love discussing technology, gaming, and innovation. Perfect for building confidence in geek culture conversations.
              </p>
            </div>
            
            <div className="comic-panel p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff0080] to-[#00ffff] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaHeart className="text-2xl text-black" />
              </div>
              <h3 className="text-lg font-bold text-[#ff0080] mb-2">ARTISTS & CREATIVES</h3>
              <p className="text-gray-300 text-sm">
                Passionate about art, music, and creative expression. Great for practicing conversations about emotions and creativity.
              </p>
            </div>
            
            <div className="comic-panel p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaUsers className="text-2xl text-black" />
              </div>
              <h3 className="text-lg font-bold text-[#00ffff] mb-2">SOCIAL CONNECTORS</h3>
              <p className="text-gray-300 text-sm">
                Outgoing and friendly, they help you practice group dynamics, event planning, and building social networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export function HomePage() {
  return (
      <div className="flex-grow flex flex-col">
        <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden border-y-4 border-[#00ffff]/30">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050714]/80 via-transparent to-[#050714]/80 z-10"></div>
          
          {/* Galatea Image */}
          <div className="relative h-full w-full">
            <img
              src="/main-hero.png"
              alt="Galatea 2.0"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Title Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-start z-20 p-8 md:p-16">
            <div className="text-left max-w-4xl">
              <h1 className="font-cyber text-5xl md:text-7xl mb-4 glitch-small" data-text="FRIENDS WANTED">
                <span className="text-white">FRIENDS </span>
                <span className="text-[#00ffff]">WANTED</span>
              </h1>
              
              {/* Content constrained to left half */}
              <div className="max-w-lg">
                <p className="text-xl md:text-2xl text-gray-300 mb-6 flex items-center gap-2">
                  <HiSparkles className="text-[#ff0080] animate-pulse" />
                  Where AI companions choose you back - Building confidence for real connections
                  <HiSparkles className="text-[#ff0080] animate-pulse" />
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-3 py-1 bg-[#00ffff]/20 border border-[#00ffff]/50 rounded-full text-sm text-white">
                    AI COMPANIONS
                  </span>
                  <span className="px-3 py-1 bg-[#ff0080]/20 border border-[#ff0080]/50 rounded-full text-sm text-white">
                    REAL CONNECTIONS
                  </span>
                  <span className="px-3 py-1 bg-[#00ffff]/20 border border-[#00ffff]/50 rounded-full text-sm text-white">
                    CONFIDENCE BUILDING
                  </span>
                  <span className="px-3 py-1 bg-[#ff0080]/20 border border-[#ff0080]/50 rounded-full text-sm text-white">SOCIAL PRACTICE</span>
                </div>
                
                <div className="mb-8">
                  <p className="text-lg md:text-xl text-gray-300">
                    Swipe through unique AI personalities just like on a dating app! Each companion has real preferences and can actually reject you. 
                    Build confidence in a safe space where you can practice social dynamics and learn from authentic interactions.
                  </p>
                  <p className="text-md text-[#00ffff] mt-4 font-medium">
                    ✨ Swipe right to connect • Get real rejection and acceptance • Build lasting confidence
                  </p>
                </div>

                <Link to="/signup">
                  <button 
                    className="bg-[#00ffff] hover:bg-[#c0fdff] text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ffff]/50 flex items-center gap-3"
                  >
                    <FaRobot className="text-xl" />
                    START SWIPING NOW
                    <FaArrowRight className="text-lg" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      <HowItWorks />
      <Footer />
      </div>
        
  )
}
