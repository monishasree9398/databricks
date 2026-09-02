import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ReadinessTier } from '../../types/index.js';
import { ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface ReadinessGaugeProps {
  score: number; // 0 - 100
  tier: ReadinessTier;
  reassurance?: string;
  size?: 'sm' | 'md' | 'lg';
  showReassurance?: boolean;
  className?: string;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  score,
  tier,
  reassurance,
  size = 'lg',
  showReassurance = true,
  className = '',
}) => {
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, score));
    const duration = 1000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, stepTime);

    const setDisplay = (val: number) => setAnimatedScore(val);

    return () => clearInterval(timer);
  }, [score]);

  // Dimension settings
  const config = {
    sm: { radius: 36, stroke: 6, sizePx: 88, textClass: 'text-xl font-bold' },
    md: { radius: 54, stroke: 8, sizePx: 128, textClass: 'text-3xl font-extrabold' },
    lg: { radius: 80, stroke: 10, sizePx: 188, textClass: 'text-5xl font-black' },
  }[size];

  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const tierColors = {
    'Ready': {
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      stroke: '#059669',
      icon: ShieldCheck,
    },
    'Almost Ready': {
      text: 'text-brand-orange',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      stroke: '#FF5500',
      icon: Zap,
    },
    'Needs Work': {
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      stroke: '#D97706',
      icon: AlertCircle,
    },
    'Foundational': {
      text: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      stroke: '#E11D48',
      icon: AlertCircle,
    },
  }[tier] || {
    text: 'text-brand-orange',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    stroke: '#FF5500',
    icon: Zap,
  };

  const Icon = tierColors.icon;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: config.sizePx, height: config.sizePx }}>
        <svg
          className="transform -rotate-90"
          width={config.sizePx}
          height={config.sizePx}
        >
          {/* Background Track */}
          <circle
            cx={config.sizePx / 2}
            cy={config.sizePx / 2}
            r={config.radius}
            stroke="#E2E8F0"
            strokeWidth={config.stroke}
            fill="transparent"
          />
          {/* Animated Progress Ring */}
          <motion.circle
            cx={config.sizePx / 2}
            cy={config.sizePx / 2}
            r={config.radius}
            stroke={tierColors.stroke}
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Numbers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className={`${config.textClass} text-slate-900 tracking-tight font-sans`}>
              {Math.round(animatedScore)}
            </span>
            <span className="text-sm font-bold text-slate-400 ml-0.5 font-mono">%</span>
          </div>
          {size === 'lg' && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 font-mono">
              READINESS
            </span>
          )}
        </div>
      </div>

      {/* Tier Badge */}
      <div className="mt-3 flex items-center justify-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tierColors.bg} ${tierColors.text} ${tierColors.border}`}
        >
          <Icon className="w-3.5 h-3.5" />
          {tier}
        </span>
      </div>

      {/* Reassurance text */}
      {showReassurance && reassurance && (
        <p className="mt-2 text-xs text-slate-500 max-w-xs leading-relaxed font-medium">
          {reassurance}
        </p>
      )}
    </div>
  );
};
