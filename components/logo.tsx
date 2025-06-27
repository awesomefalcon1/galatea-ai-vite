interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <div className={className}>
      <img 
        src="/galatea-ai-white.png" 
        alt="Galatea AI Logo" 
        width={size} 
        height={size}
        className="object-contain"
      />
    </div>
  )
}
