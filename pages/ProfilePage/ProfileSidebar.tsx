import React from 'react';
import { FaLink, FaCog, FaUsers, FaBars, FaHeart } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useProfile, ProfileScreen } from '@contexts/ProfileContext';

const sidebarItems = [
  {
    id: 'socials' as ProfileScreen,
    label: 'Social Accounts',
    icon: FaLink,
    description: 'Connect your accounts'
  },
  {
    id: 'profile-setup' as ProfileScreen,
    label: 'Profile Setup',
    icon: FaCog,
    description: 'Personal preferences'
  },
  {
    id: 'dating-profile' as ProfileScreen,
    label: 'Dating Profile',
    icon: FaHeart,
    description: 'AI companion matching'
  },
  {
    id: 'friends' as ProfileScreen,
    label: 'AI Friends',
    icon: FaUsers,
    description: 'Connected companions'
  }
];

export function ProfileSidebar() {
  const { activeScreen, setActiveScreen, isSidebarOpen, setIsSidebarOpen } = useProfile();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-20 left-4 z-40 bg-[#050714]/95 backdrop-blur-md border border-[#00ffff]/30 text-[#00ffff] p-3 rounded-lg shadow-lg"
      >
        <FaBars />
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`w-80 h-screen bg-[#050714]/95 backdrop-blur-md border-r border-[#00ffff]/30 fixed left-0 top-16 z-40 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiSparkles className="text-[#00ffff] text-2xl" />
              <h1 className="font-cyber text-2xl text-white glitch-small" data-text="PROFILE">
                PROFILE
              </h1>
              <HiSparkles className="text-[#ff0080] text-2xl" />
            </div>
            <p className="text-gray-300 text-sm">Manage your account</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveScreen(item.id);
                    setIsSidebarOpen(false); // Close mobile sidebar
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00ffff]/20 border border-[#00ffff]/50 text-[#00ffff]'
                      : 'text-gray-300 hover:text-[#00ffff] hover:bg-[#00ffff]/10 border border-transparent'
                  }`}
                >
                  <Icon className="text-lg" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Profile Summary */}
          <div className="mt-8 p-4 bg-[#0a0b1a]/30 border border-[#00ffff]/20 rounded-lg">
            <h3 className="text-sm font-cyber text-[#ff0080] mb-2">QUICK STATS</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Connected Accounts:</span>
                <span className="text-[#00ffff]">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">AI Friends:</span>
                <span className="text-[#00ffff]">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profile Complete:</span>
                <span className="text-green-400">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
