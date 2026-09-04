import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFacultyDashboard } from '../../api/client.js';
import { Card } from '../../components/common/Card.js';
import { StatCard } from '../../components/common/StatCard.js';
import { ClassDistributionChart } from '../../components/faculty/ClassDistributionChart.js';
import { CohortDeficitChart } from '../../components/visuals/CohortDeficitChart.js';
import { SkillGapMatrix } from '../../components/faculty/SkillGapMatrix.js';
import { TrainingPlanModal } from '../../components/faculty/TrainingPlanModal.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import {
  Users,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BarChart2,
  PieChart,
} from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { data: dashboard, isLoading } = useFacultyDashboard('cs-401');
  const navigate = useNavigate();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  if (isLoading || !dashboard) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const {
    className,
    semester,
    academicYear,
    totalHeadcount,
    averageReadinessScore,
    averageWeeklyGrowth,
    readinessDistribution,
    topHiringRoles,
    rankedClassSkillGaps,
    aiClassInsight,
  } = dashboard;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Faculty Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-[#EEF2F6] shadow-neu-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
              FACULTY COHORT
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              {semester} • {academicYear}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            {className}
          </h1>
          <p className="text-xs text-slate-500 font-mono font-bold mt-0.5">
            {totalHeadcount} Students • Stanford CS
          </p>
        </div>

        <button
          onClick={() => setIsPlanModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-orange text-white font-black text-xs shadow-neu-orange transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate 3-Week Plan</span>
        </button>
      </div>

      {/* Cohort KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Cohort Headcount"
          value={totalHeadcount}
          suffix="Students"
          icon={Users}
          subtext="100% telemetry synced"
          highlight
        />
        <StatCard
          label="Avg Readiness"
          value={averageReadinessScore}
          suffix="%"
          icon={TrendingUp}
          trendDelta={averageWeeklyGrowth}
          trendLabel="vs last week"
        />
        <StatCard
          label="Placement Ready"
          value={readinessDistribution.ready}
          suffix={`(${readinessDistribution.readyPercentage}%)`}
          icon={Users}
          subtext="Above 80% readiness bar"
        />
        <StatCard
          label="Primary Bottleneck"
          value="CUDA"
          suffix="Kernels"
          icon={AlertCircle}
          subtext="64 students deficient"
        />
      </div>

      {/* 50/50 VISUAL TELEMETRY ROW: DISTRIBUTION + COHORT DEFICIT BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Readiness Distribution Gauge (6 Cols) */}
        <div className="lg:col-span-6">
          <ClassDistributionChart
            distribution={readinessDistribution}
            totalHeadcount={totalHeadcount}
          />
        </div>

        {/* Right: Class Proficiency vs Industry Benchmark (6 Cols) */}
        <Card className="lg:col-span-6 p-6 md:p-7 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#CAD4E0]/40">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-brand-orange" />
              <h3 className="text-sm font-black text-slate-900 font-mono uppercase">
                Skill Deficit Telemetry
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
              TOP 5 DEFICITS
            </span>
          </div>

          <div className="my-2">
            <CohortDeficitChart />
          </div>

          <div className="pt-3 border-t border-[#CAD4E0]/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>64 students need CUDA intervention</span>
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="text-brand-orange font-bold hover:underline"
            >
              Fix Gaps →
            </button>
          </div>
        </Card>
      </div>

      {/* AI Cohort Diagnosis Card */}
      <Card className="p-6 md:p-7" glow>
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-brand-orange text-white font-mono flex items-center gap-1 shadow-neu-orange">
              <Sparkles className="w-3 h-3" />
              AI COHORT DIAGNOSIS
            </span>
            <span className="text-xs font-bold text-slate-900 font-sans">
              {aiClassInsight.headline}
            </span>
          </div>
          <button
            onClick={() => setIsPlanModalOpen(true)}
            className="text-xs font-bold text-brand-orange hover:underline font-mono inline-flex items-center gap-1"
          >
            Deploy Lab <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {aiClassInsight.analysis}
        </p>

        <div className="mt-4 pt-3.5 border-t border-[#CAD4E0]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-mono">
            Projected Impact: <strong className="text-emerald-700">{aiClassInsight.projectedCohortImpact}</strong>
          </span>
          <span className="text-slate-500 font-mono">
            Critical Bottleneck: <strong className="text-slate-900">{aiClassInsight.criticalBottleneck}</strong>
          </span>
        </div>
      </Card>

      {/* Ranked Class Skill Bottlenecks Matrix */}
      <SkillGapMatrix
        skillGaps={rankedClassSkillGaps}
        onSelectIntervention={() => setIsPlanModalOpen(true)}
      />

      {/* Top Hiring Roles Aligned */}
      <Card className="p-6 md:p-7 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#CAD4E0]/40">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight font-sans">
              Top Target Hiring Roles
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Active hiring market demand
            </p>
          </div>
          <button
            onClick={() => navigate('/faculty/students')}
            className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1 font-mono"
          >
            Inspect Students <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topHiringRoles.map(role => (
            <div
              key={role.role}
              className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-sans truncate">
                  {role.role}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
                  {role.demandIndex}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-500 font-medium">Match Rate</span>
                <span className="font-black text-slate-900">{role.studentMatchRate}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EEF2F6] shadow-neu-pressed p-0.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-orange"
                  style={{ width: `${role.studentMatchRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Training Plan Generation Modal */}
      <TrainingPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  );
};
