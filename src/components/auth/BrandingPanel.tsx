import React from 'react';

interface BrandingPanelProps {
  mode: 'signin' | 'signup';
}

export function BrandingPanel({ mode }: BrandingPanelProps) {
  const isSignUp = mode === 'signup';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <img 
          src="/galatea-ai-white.png" 
          alt="Galatea AI" 
          className="w-20 h-20 mx-auto mb-6"
        />
        <h1 className="text-4xl font-cyber text-white mb-4 glitch-small" data-text="GALATEA AI">
          GALATEA AI
        </h1>
        <h2 className="text-2xl font-bold text-[#ff0080] mb-6">FRIENDS WANTED</h2>
        <p className="text-xl text-gray-300 mb-8">
          {isSignUp 
            ? 'Start your journey with AI companions designed to help you practice social skills and build confidence.'
            : 'Welcome back to your AI companion experience. Continue building meaningful connections and developing your social confidence.'
          }
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#00ffff]/30 rounded-lg">
          <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse"></div>
          <span className="text-gray-300">
            {isSignUp 
              ? 'Free account creation'
              : 'Continue your progress'
            }
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#ff0080]/30 rounded-lg">
          <div className="w-3 h-3 bg-[#ff0080] rounded-full animate-pulse"></div>
          <span className="text-gray-300">
            {isSignUp
              ? 'Multiple authentication options'
              : 'Access your companions'
            }
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-[#050714]/50 border border-[#00ffff]/30 rounded-lg">
          <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse"></div>
          <span className="text-gray-300">
            {isSignUp
              ? 'Secure and private'
              : 'Safe learning environment'
            }
          </span>
        </div>
      </div>
    </div>
  );
}
