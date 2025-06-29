import React from 'react';
import { useAuth } from '@contexts/AuthContext';
import { HomePage } from './HomePage';
import WelcomeDashboard from './WelcomeDashboard';

const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();

  // Show welcome dashboard for authenticated users, regular homepage for visitors
  return currentUser ? <WelcomeDashboard /> : <HomePage />;
};

export default LandingPage;
