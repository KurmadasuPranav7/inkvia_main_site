import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center neon-glow">
          <span className="text-primary font-bold text-xl">I</span>
        </div>
      </div>
      <span className="text-xl font-bold tracking-wider">
        <span className="text-foreground">INK</span>
        <span className="text-primary">VIA</span>
      </span>
    </div>
  );
};

export default Logo;
