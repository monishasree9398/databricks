import React, { useEffect, useState } from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card.js';

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  icon?: LucideIcon;
  trendDelta?: number;
  trendLabel?: string;
  highlight?: boolean;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = '',
  prefix = '',
  icon: Icon,
  trendDelta,
  trendLabel = 'vs last week',
  highlight = false,
  subtext,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!isNumeric) return;
    let start = 0;
    const end = numericValue;
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericValue, isNumeric]);

  return (
    <Card className="p-5 flex flex-col justify-between" glow={highlight}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wider uppercase truncate">
          {label}
        </span>
        {Icon && (
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-neu-pressed ${
              highlight ? 'text-brand-orange bg-orange-50/50' : 'text-slate-500 bg-[#EEF2F6]'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-1.5">
          {prefix && <span className="text-base font-bold text-brand-orange font-mono">{prefix}</span>}
          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
            {isNumeric ? (Number.isInteger(numericValue) ? Math.round(displayValue) : displayValue.toFixed(1)) : value}
          </span>
          {suffix && <span className="text-xs font-bold text-slate-500 font-mono">{suffix}</span>}
        </div>

        {trendDelta !== undefined && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-mono">
            {trendDelta >= 0 ? (
              <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md shadow-neu-pressed text-[10px]">
                <TrendingUp className="w-3 h-3" />
                +{trendDelta}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-rose-700 font-bold px-1.5 py-0.5 rounded-md shadow-neu-pressed text-[10px]">
                <TrendingDown className="w-3 h-3" />
                {trendDelta}%
              </span>
            )}
            <span className="text-slate-500 text-[11px]">{trendLabel}</span>
          </div>
        )}

        {subtext && !trendDelta && (
          <p className="mt-2 text-xs text-slate-500 truncate font-medium">{subtext}</p>
        )}
      </div>
    </Card>
  );
};
