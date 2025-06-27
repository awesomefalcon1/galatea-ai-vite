interface AnimatedCirclesProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AnimatedCircles({ size = 'md', className = '' }: AnimatedCirclesProps) {
  const sizes = {
    sm: {
      circle1: 'w-32 h-32',
      circle2: 'w-24 h-24',
      circle3: 'w-16 h-16'
    },
    md: {
      circle1: 'w-64 h-64',
      circle2: 'w-48 h-48',
      circle3: 'w-32 h-32'
    },
    lg: {
      circle1: 'w-80 h-80',
      circle2: 'w-64 h-64',
      circle3: 'w-48 h-48'
    }
  }

  const currentSize = sizes[size]

  return (
    <div className={`relative ${className}`}>
      {/* Animated circles */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`${currentSize.circle1} rounded-full border-4 border-[#00ffff]/20 animate-pulse`}></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${currentSize.circle2} rounded-full border-4 border-[#00ffff]/30 animate-pulse`}
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${currentSize.circle3} rounded-full border-4 border-[#00ffff]/40 animate-pulse`}
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  )
}
