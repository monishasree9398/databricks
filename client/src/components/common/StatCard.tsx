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
    <Card className="p-4 flex flex-col justify-between" glow={highlight}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wider uppercase truncate">
          {label}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded-lg border ${highlight ? 'bg-orange-50 text-brand-orange border-orange-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-1">
          {prefix && <span className="text-sm font-bold text-brand-orange font-mono">{prefix}</span>}
          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
            {isNumeric ? (Number.isInteger(numericValue) ? Math.round(displayValue) : displayValue.toFixed(1)) : value}
          </span>
          {suffix && <span className="text-xs font-bold text-slate-500 font-mono">{suffix}</span>}
        </div>

        {trendDelta !== undefined && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-mono">
            {trendDelta >= 0 ? (
              <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold">
                <TrendingUp className="w-3 h-3" />
                +{trendDelta}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-rose-600 font-bold">
                <TrendingDown className="w-3 h-3" />
                {trendDelta}%
              </span>
            )}
            <span className="text-slate-400 text-[11px]">{trendLabel}</span>
          </div>
        )}

        {subtext && !trendDelta && (
          <p className="mt-1.5 text-xs text-slate-500 truncate font-medium">{subtext}</p>
        )}
      </div>
    </Card>
  );
};
