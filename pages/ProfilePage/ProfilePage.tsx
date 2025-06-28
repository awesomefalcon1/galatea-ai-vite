import React from 'react';
import { useAuth } from '@contexts/AuthContext';
import { ProfileProvider, useProfile } from '@contexts/ProfileContext';
import { ProfileSidebar } from './ProfileSidebar';
import { SocialsScreen } from './SocialsScreen';
import { ProfileSetupScreen } from './ProfileSetupScreen';
import { FriendsScreen } from './FriendsScreen';
import { DatingProfileScreenMUI } from './DatingProfileScreenMUI';

function ProfilePageContent() {
  const { currentUser } = useAuth();
  const { activeScreen } = useProfile();

  const renderContent = () => {
    switch (activeScreen) {
      case 'socials':
        return <SocialsScreen />;
      case 'profile-setup':
        return <ProfileSetupScreen />;
      case 'dating-profile':
        return <DatingProfileScreenMUI />;
      case 'friends':
        return <FriendsScreen />;
      default:
        return <SocialsScreen />;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714]">
        <div className="text-center">
          <h2 className="text-2xl font-cyber text-[#00ffff] mb-4">Access Denied</h2>
          <p className="text-gray-300">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/5 via-transparent to-[#ff0080]/5"></div>
      <div className="scan-line opacity-20"></div>
      
      <div className="flex">
        <ProfileSidebar />

        {/* Main Content Area */}
        <div className="flex-1 md:ml-80 p-6 pt-24">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="bg-[#050714]/80 backdrop-blur-md border border-[#00ffff]/30 rounded-lg p-8 shadow-lg shadow-[#00ffff]/10">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfilePageContent />
    </ProfileProvider>
  );
}
