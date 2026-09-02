import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const AIBadge: React.FC<AIBadgeProps> = ({
  label = 'UNLOCK AI',
  size = 'sm',
  pulse = false,
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange ${sizeClasses} ${className}`}
    >
      <Sparkles className={`w-3 h-3 text-brand-orange ${pulse ? 'animate-pulse' : ''}`} />
      <span className="tracking-wider uppercase font-mono font-bold">{label}</span>
    </div>
  );
};
