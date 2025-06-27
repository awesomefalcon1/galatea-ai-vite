import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ProfileScreen = 'socials' | 'profile-setup' | 'friends' | 'dating-profile';

interface ProfileContextType {
  activeScreen: ProfileScreen;
  setActiveScreen: (screen: ProfileScreen) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [activeScreen, setActiveScreen] = useState<ProfileScreen>('socials');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProfileContext.Provider value={{
      activeScreen,
      setActiveScreen,
      isSidebarOpen,
      setIsSidebarOpen
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
