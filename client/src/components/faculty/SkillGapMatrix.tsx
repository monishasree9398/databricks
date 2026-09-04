import React from 'react';
import { Card } from '../common/Card.js';
import { FacultyDashboardData } from '../../types/index.js';

interface SkillGapMatrixProps {
  skillGaps: FacultyDashboardData['rankedClassSkillGaps'];
  onSelectIntervention?: (skillName: string) => void;
}

export const SkillGapMatrix: React.FC<SkillGapMatrixProps> = ({ skillGaps }) => {
  return (
    <Card className="p-6 md:p-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight font-sans">
            Ranked Class Skill Bottlenecks
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated skill deficits impacting cohort internship qualification rates
          </p>
        </div>
        <span className="text-xs font-bold text-brand-orange font-mono">
          5 Bottlenecks Tracked
        </span>
      </div>

      <div className="space-y-4">
        {skillGaps.map((gap, index) => (
          <div
            key={gap.skillName}
            className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              <span className="font-mono text-xs font-black text-slate-400 pt-0.5">
                0{index + 1}
              </span>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 font-sans">{gap.skillName}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono shadow-neu-sm ${
                      gap.priority === 'Urgent'
                        ? 'bg-rose-50 text-rose-700'
                        : gap.priority === 'High'
                        ? 'bg-orange-50 text-brand-orange'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {gap.priority} Priority
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Industry Demand: {gap.industryDemandScore}/100
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">
                  Suggested Action: {gap.suggestedIntervention}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t md:border-t-0 pt-2.5 md:pt-0 border-[#CAD4E0]/40">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block font-mono">
                  {gap.studentsDeficientCount} Students
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({gap.cohortDeficiencyPercentage}% of class)
                </span>
              </div>

              <div className="w-24 text-right px-3 py-1.5 rounded-xl bg-[#EEF2F6] shadow-neu-pressed">
                <span className="text-xs font-mono font-black text-brand-orange block">
                  {gap.classProficiencyAvg}%
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-mono">Cohort Avg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
