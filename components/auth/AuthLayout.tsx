import React from 'react';
import { Logo } from '../logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050714] via-[#0a0b1a] to-[#050714] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/5 via-transparent to-[#ff0080]/5"></div>
      <div className="scan-line opacity-20"></div>

      {/* Centered Logo - Absolute center of the page */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <Logo size={48} />
      </div>

      {/* Full screen grid layout */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
        {children}
        
        {/* Vertical divider for large screens */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent transform -translate-x-1/2 z-10"></div>
      </div>
    </div>
  );
}
