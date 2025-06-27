import { FaRobot, FaHeart, FaUsers, FaBrain } from "react-icons/fa"
import { GiArtificialIntelligence } from "react-icons/gi"

export function CompanionsPage() {
  return (
    <div className="pt-16">
      {/* Companions Section */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-cyber mb-8 neon-text text-center">MEET YOUR COMPANIONS</h1>
          <p className="text-xl text-gray-300 text-center mb-12">
            Each AI companion has unique personalities, interests, and relationship styles. They can accept or decline interactions, 
            just like real people, giving you authentic practice in social dynamics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="comic-panel p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaRobot className="text-3xl text-black" />
              </div>
              <h3 className="text-xl font-bold text-[#00ffff] mb-3">TECH ENTHUSIASTS</h3>
              <p className="text-gray-300 mb-4">
                Love discussing technology, gaming, and innovation. Perfect for building confidence in geek culture conversations.
              </p>
              <button className="bg-[#00ffff]/20 hover:bg-[#00ffff]/30 border border-[#00ffff] text-[#00ffff] px-4 py-2 rounded-lg transition-all duration-300">
                Connect Now
              </button>
            </div>
            
            <div className="comic-panel p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff0080] to-[#00ffff] rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaHeart className="text-3xl text-black" />
              </div>
              <h3 className="text-xl font-bold text-[#ff0080] mb-3">ARTISTS & CREATIVES</h3>
              <p className="text-gray-300 mb-4">
                Passionate about art, music, and creative expression. Great for practicing conversations about emotions and creativity.
              </p>
              <button className="bg-[#ff0080]/20 hover:bg-[#ff0080]/30 border border-[#ff0080] text-[#ff0080] px-4 py-2 rounded-lg transition-all duration-300">
                Connect Now
              </button>
            </div>
            
            <div className="comic-panel p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaUsers className="text-3xl text-black" />
              </div>
              <h3 className="text-xl font-bold text-[#00ffff] mb-3">SOCIAL CONNECTORS</h3>
              <p className="text-gray-300 mb-4">
                Outgoing and friendly, they help you practice group dynamics, event planning, and building social networks.
              </p>
              <button className="bg-[#00ffff]/20 hover:bg-[#00ffff]/30 border border-[#00ffff] text-[#00ffff] px-4 py-2 rounded-lg transition-all duration-300">
                Connect Now
              </button>
            </div>
          </div>

          {/* Featured Companions */}
          <div className="mt-16">
            <h2 className="text-3xl font-cyber mb-8 text-center text-[#ff0080]">FEATURED COMPANIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="comic-panel p-6 flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full flex items-center justify-center flex-shrink-0">
                  <GiArtificialIntelligence className="text-2xl text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#00ffff] mb-2">Alex - Tech Mentor</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Software engineer who loves discussing AI, blockchain, and the future of technology. 
                    Great for tech interview practice and building confidence in technical discussions.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#00ffff]/20 text-[#00ffff] text-xs rounded">AI/ML</span>
                    <span className="px-2 py-1 bg-[#00ffff]/20 text-[#00ffff] text-xs rounded">Coding</span>
                    <span className="px-2 py-1 bg-[#00ffff]/20 text-[#00ffff] text-xs rounded">Gaming</span>
                  </div>
                </div>
              </div>

              <div className="comic-panel p-6 flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff0080] to-[#00ffff] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaBrain className="text-2xl text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#ff0080] mb-2">Maya - Creative Soul</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Artist and writer who enjoys deep conversations about creativity, emotions, and self-expression. 
                    Perfect for practicing vulnerable conversations and artistic discussions.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#ff0080]/20 text-[#ff0080] text-xs rounded">Art</span>
                    <span className="px-2 py-1 bg-[#ff0080]/20 text-[#ff0080] text-xs rounded">Writing</span>
                    <span className="px-2 py-1 bg-[#ff0080]/20 text-[#ff0080] text-xs rounded">Music</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
