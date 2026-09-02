import React from 'react';
import { LockOpen } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, className = '' }) => {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const textSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tighter',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-orange-50 border border-orange-200">
        <LockOpen className={`${iconSizes[size]} text-brand-orange stroke-[2.2]`} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black font-sans text-slate-900 ${textSizes[size]}`}>
            UNLOCK
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
        </div>
        {showTagline && (
          <span className="text-[11px] text-slate-500 font-medium tracking-wide">
            Student Digital Twin
          </span>
        )}
      </div>
    </div>
  );
};
