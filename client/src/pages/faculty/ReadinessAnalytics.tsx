import React from 'react';
import { useFacultyDashboard } from '../../api/client.js';
import { Card } from '../../components/common/Card.js';
import { StatCard } from '../../components/common/StatCard.js';
import { ClassDistributionChart } from '../../components/faculty/ClassDistributionChart.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { TrendingUp, Layers, GraduationCap, Building2 } from 'lucide-react';

export const ReadinessAnalytics: React.FC = () => {
  const { data: dashboard, isLoading } = useFacultyDashboard('cs-401');

  if (isLoading || !dashboard) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const { departmentComparison, readinessDistribution, totalHeadcount, averageReadinessScore, averageWeeklyGrowth } = dashboard;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
            MACRO COHORT ANALYTICS
          </span>
          <span className="text-xs text-slate-500 font-mono font-bold">
            Inter-Department Benchmarking
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
          Readiness Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
          Historical placement readiness trends and multi-department performance calibration.
        </p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Cohort Avg Readiness"
          value={averageReadinessScore}
          suffix="%"
          icon={TrendingUp}
          trendDelta={averageWeeklyGrowth}
          trendLabel="YoY improvement"
          highlight
        />
        <StatCard
          label="Ready Candidates"
          value={readinessDistribution.ready}
          suffix="Students"
          icon={GraduationCap}
          subtext="Direct to interview loop"
        />
        <StatCard
          label="Almost Ready"
          value={readinessDistribution.almostReady}
          suffix="Students"
          icon={Layers}
          subtext="Target of 3-week sprint"
        />
        <StatCard
          label="Total Monitored Twins"
          value={totalHeadcount}
          suffix="Active"
          icon={Building2}
          subtext="100% sync rate"
        />
      </div>

      {/* Cohort Distribution */}
      <ClassDistributionChart
        distribution={readinessDistribution}
        totalHeadcount={totalHeadcount}
      />

      {/* Department Comparison Table */}
      <Card className="p-6 md:p-7 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#CAD4E0]/40">
          <div>
            <h3 className="text-base font-black text-slate-900 font-sans">
              Departmental Readiness Comparison
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cross-faculty benchmark index across engineering sub-disciplines
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold">4 Programs Tracked</span>
        </div>

        <div className="space-y-4">
          {departmentComparison.map(dept => (
            <div
              key={dept.department}
              className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-black text-slate-900 block font-sans">{dept.department}</span>
                <span className="text-[11px] text-slate-500 font-medium">Key Strength: {dept.topSpecialty}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32 hidden sm:block">
                  <div className="h-2 rounded-full bg-[#EEF2F6] shadow-neu-pressed p-0.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-orange"
                      style={{ width: `${dept.avgReadiness}%` }}
                    />
                  </div>
                </div>
                <div className="text-right min-w-[60px] px-2.5 py-1 rounded-xl bg-[#EEF2F6] shadow-neu-pressed">
                  <span className="text-xs font-mono font-black text-slate-900 block">{dept.avgReadiness}%</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">Avg Score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
