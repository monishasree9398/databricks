import React from 'react';
import { Card } from '../common/Card.js';
import { ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface ClassDistributionChartProps {
  distribution: {
    ready: number;
    readyPercentage: number;
    almostReady: number;
    almostReadyPercentage: number;
    needsSupport: number;
    needsSupportPercentage: number;
  };
  totalHeadcount: number;
}

export const ClassDistributionChart: React.FC<ClassDistributionChartProps> = ({
  distribution,
  totalHeadcount,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight font-sans">
            Cohort Readiness Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time digital twin classification across {totalHeadcount} enrolled students
          </p>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="h-3.5 w-full rounded-full bg-slate-100 p-0.5 flex gap-1 overflow-hidden my-5">
        <div
          style={{ width: `${distribution.readyPercentage}%` }}
          className="h-full rounded-l-full bg-emerald-500 transition-all duration-500 relative cursor-pointer"
          title={`Ready: ${distribution.ready} students (${distribution.readyPercentage}%)`}
        />
        <div
          style={{ width: `${distribution.almostReadyPercentage}%` }}
          className="h-full bg-brand-orange transition-all duration-500 relative cursor-pointer"
          title={`Almost Ready: ${distribution.almostReady} students (${distribution.almostReadyPercentage}%)`}
        />
        <div
          style={{ width: `${distribution.needsSupportPercentage}%` }}
          className="h-full rounded-r-full bg-amber-500 transition-all duration-500 relative cursor-pointer"
          title={`Needs Support: ${distribution.needsSupport} students (${distribution.needsSupportPercentage}%)`}
        />
      </div>

      {/* 3 Tier KPI Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Tier 1: Ready */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Ready for Hire
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">
              {distribution.readyPercentage}%
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 font-mono">{distribution.ready}</span>
            <span className="text-xs text-slate-500 ml-1">students</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
            Meets or exceeds 80% readiness benchmark for target roles.
          </p>
        </div>

        {/* Tier 2: Almost Ready */}
        <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-orange flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Almost Ready (Focus)
            </span>
            <span className="text-xs font-mono font-bold text-brand-orange">
              {distribution.almostReadyPercentage}%
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 font-mono">{distribution.almostReady}</span>
            <span className="text-xs text-slate-500 ml-1">students</span>
          </div>
          <p className="text-[11px] text-brand-orange mt-1.5 font-medium">
            1-2 skill closures away from 80%+ hiring tier.
          </p>
        </div>

        {/* Tier 3: Needs Support */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Needs Support
            </span>
            <span className="text-xs font-mono font-bold text-amber-800">
              {distribution.needsSupportPercentage}%
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 font-mono">{distribution.needsSupport}</span>
            <span className="text-xs text-slate-500 ml-1">students</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
            Targeted labs & foundational mentoring recommended.
          </p>
        </div>
      </div>
    </Card>
  );
};
