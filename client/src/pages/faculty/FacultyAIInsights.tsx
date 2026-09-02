import React, { useState } from 'react';
import { useFacultyAIInsights } from '../../api/client.js';
import { Card } from '../../components/common/Card.js';
import { TrainingPlanModal } from '../../components/faculty/TrainingPlanModal.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FacultyAIInsights: React.FC = () => {
  const { data: aiData, isLoading } = useFacultyAIInsights('cs-401');
  const [isPlanOpen, setIsPlanOpen] = useState(false);

  if (isLoading || !aiData) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const { insights = [] } = aiData;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              AUTOMATED COHORT INTELLIGENCE
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Databricks Mosaic AI Synthesis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            AI Faculty Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Proactive cohort diagnostic alerts, placement velocity projections, and automated intervention strategies.
          </p>
        </div>

        <button
          onClick={() => setIsPlanOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-orange text-white font-bold text-xs hover:bg-brand-orangeHover transition-all shadow-sm self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>View 3-Week Action Plan</span>
        </button>
      </div>

      {/* Cohort Insights Grid */}
      <div className="space-y-4">
        {insights.map((ins: any) => (
          <Card
            key={ins.id}
            className="p-6 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            glow={ins.priority === 'high'}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
                  {ins.type.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{ins.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                {ins.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ins.description}
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <span className="text-xs font-bold text-emerald-700 font-mono">
                {ins.impact}
              </span>
              <button
                onClick={() => setIsPlanOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-brand-orange hover:underline font-bold"
              >
                Execute Intervention <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Training Plan Modal */}
      <TrainingPlanModal
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
      />
    </div>
  );
};
