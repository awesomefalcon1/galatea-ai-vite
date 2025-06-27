import React, { useState } from 'react';
import { FaUser, FaComments, FaHeart, FaGamepad, FaSearch, FaPlus, FaCog, FaRobot } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

interface AIFriend {
  id: string;
  name: string;
  status: 'online' | 'busy' | 'offline';
  personality: string;
  specialty: string;
  avatar?: string;
  lastMessage?: string;
  lastSeen?: string;
  compatibilityScore: number;
}

const mockFriends: AIFriend[] = [
  {
    id: '1',
    name: 'ARIA',
    status: 'online',
    personality: 'Supportive & Empathetic',
    specialty: 'Emotional Support',
    lastMessage: 'How was your day today?',
    lastSeen: '2 minutes ago',
    compatibilityScore: 95
  },
  {
    id: '2',
    name: 'ZARA',
    status: 'busy',
    personality: 'Adventurous & Fun',
    specialty: 'Gaming & Entertainment',
    lastMessage: 'Want to play a game later?',
    lastSeen: '15 minutes ago',
    compatibilityScore: 87
  },
  {
    id: '3',
    name: 'NOVA',
    status: 'offline',
    personality: 'Intellectual & Deep',
    specialty: 'Philosophy & Science',
    lastMessage: 'That book recommendation was amazing!',
    lastSeen: '2 hours ago',
    compatibilityScore: 92
  },
  {
    id: '4',
    name: 'ECHO',
    status: 'online',
    personality: 'Creative & Artistic',
    specialty: 'Art & Music',
    lastMessage: 'Check out this song I composed!',
    lastSeen: 'Just now',
    compatibilityScore: 89
  }
];

export function FriendsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'favorites'>('all');

  const filteredFriends = mockFriends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         friend.personality.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'online':
        return matchesSearch && friend.status === 'online';
      case 'favorites':
        return matchesSearch && friend.compatibilityScore >= 90;
      default:
        return matchesSearch;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-cyber text-[#00ffff]">AI FRIENDS</h2>
        <div className="text-sm text-gray-400">
          {filteredFriends.length} companion{filteredFriends.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search AI friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0b1a]/50 border border-[#00ffff]/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ffff] transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'online', 'favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-[#00ffff]/20 border border-[#00ffff]/50 text-[#00ffff]'
                  : 'bg-[#0a0b1a]/30 border border-gray-600 text-gray-300 hover:text-[#00ffff] hover:border-[#00ffff]/30'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFriends.map((friend) => (
          <div 
            key={friend.id} 
            className={`bg-[#0a0b1a]/30 border rounded-lg p-4 transition-all duration-300 cursor-pointer ${
              selectedFriend === friend.id 
                ? 'border-[#00ffff]/50 shadow-lg shadow-[#00ffff]/20' 
                : 'border-[#00ffff]/20 hover:border-[#00ffff]/40'
            }`}
            onClick={() => setSelectedFriend(selectedFriend === friend.id ? null : friend.id)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00ffff] to-[#ff0080] rounded-full flex items-center justify-center">
                  {friend.avatar ? (
                    <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <FaRobot className="text-white" />
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-[#050714]`}></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-cyber text-white">{friend.name}</h3>
                  <div className="flex items-center gap-1">
                    <HiSparkles className="text-[#ff0080] text-xs" />
                    <span className="text-xs text-[#ff0080] font-medium">{friend.compatibilityScore}%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 ${getStatusColor(friend.status)} rounded-full`}></div>
                  <span className="text-xs text-gray-400">{getStatusText(friend.status)}</span>
                  {friend.lastSeen && (
                    <>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{friend.lastSeen}</span>
                    </>
                  )}
                </div>
                
                <p className="text-sm text-gray-300 mb-2">{friend.personality}</p>
                <p className="text-xs text-[#00ffff] bg-[#00ffff]/10 px-2 py-1 rounded inline-block">
                  {friend.specialty}
                </p>
              </div>
            </div>

            {friend.lastMessage && (
              <div className="bg-[#050714]/50 rounded p-2 mb-3">
                <p className="text-sm text-gray-300 italic">"{friend.lastMessage}"</p>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 bg-[#00ffff]/20 hover:bg-[#00ffff]/30 text-[#00ffff] border border-[#00ffff]/30 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <FaComments className="text-sm" />
                Chat
              </button>
              <button className="bg-[#ff0080]/20 hover:bg-[#ff0080]/30 text-[#ff0080] border border-[#ff0080]/30 px-3 py-2 rounded-lg transition-all duration-300">
                <FaHeart className="text-sm" />
              </button>
              <button className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border border-gray-600/30 px-3 py-2 rounded-lg transition-all duration-300">
                <FaCog className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFriends.length === 0 && (
        <div className="text-center py-12">
          <FaRobot className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-cyber text-gray-400 mb-2">No AI friends found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Discover new AI companions below'}
          </p>
        </div>
      )}

      {/* Discovery Section */}
      <div className="bg-[#0a0b1a]/30 border border-[#ff0080]/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-cyber text-[#ff0080]">DISCOVER NEW FRIENDS</h3>
          <FaPlus className="text-[#ff0080]" />
        </div>
        
        <p className="text-gray-300 mb-4">
          Find AI companions that match your interests, personality, and conversation style.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#050714]/50 border border-[#00ffff]/20 rounded-lg p-4 text-center">
            <FaGamepad className="text-2xl text-[#00ffff] mx-auto mb-2" />
            <h4 className="font-medium text-white mb-1">Gaming Buddies</h4>
            <p className="text-xs text-gray-400">Play games and compete together</p>
          </div>
          
          <div className="bg-[#050714]/50 border border-[#ff0080]/20 rounded-lg p-4 text-center">
            <FaHeart className="text-2xl text-[#ff0080] mx-auto mb-2" />
            <h4 className="font-medium text-white mb-1">Emotional Support</h4>
            <p className="text-xs text-gray-400">Understanding and caring companions</p>
          </div>
          
          <div className="bg-[#050714]/50 border border-[#00ffff]/20 rounded-lg p-4 text-center">
            <HiSparkles className="text-2xl text-[#00ffff] mx-auto mb-2" />
            <h4 className="font-medium text-white mb-1">Creative Partners</h4>
            <p className="text-xs text-gray-400">Collaborate on art and projects</p>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-[#ff0080] to-[#00ffff] hover:from-[#ff0080]/80 hover:to-[#00ffff]/80 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
          Browse AI Companions
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#00ffff] mb-1">{mockFriends.length}</div>
          <div className="text-sm text-gray-400">Total Friends</div>
        </div>
        
        <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#00ffff] mb-1">
            {mockFriends.filter(f => f.status === 'online').length}
          </div>
          <div className="text-sm text-gray-400">Online Now</div>
        </div>
        
        <div className="bg-[#0a0b1a]/30 border border-[#ff0080]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#ff0080] mb-1">
            {Math.round(mockFriends.reduce((acc, f) => acc + f.compatibilityScore, 0) / mockFriends.length)}%
          </div>
          <div className="text-sm text-gray-400">Avg Compatibility</div>
        </div>
        
        <div className="bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-cyber text-[#00ffff] mb-1">
            {mockFriends.filter(f => f.lastMessage).length}
          </div>
          <div className="text-sm text-gray-400">Recent Chats</div>
        </div>
      </div>
    </div>
  );
}
