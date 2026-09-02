import React from 'react';
import { Card } from '../common/Card.js';
import { FacultyDashboardData } from '../../types/index.js';

interface SkillGapMatrixProps {
  skillGaps: FacultyDashboardData['rankedClassSkillGaps'];
  onSelectIntervention?: (skillName: string) => void;
}

export const SkillGapMatrix: React.FC<SkillGapMatrixProps> = ({ skillGaps }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight font-sans">
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

      <div className="space-y-3">
        {skillGaps.map((gap, index) => (
          <div
            key={gap.skillName}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-orange/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              <span className="font-mono text-xs font-bold text-slate-400 pt-0.5">
                0{index + 1}
              </span>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 font-sans">{gap.skillName}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                      gap.priority === 'Urgent'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : gap.priority === 'High'
                        ? 'bg-orange-50 text-brand-orange border border-orange-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
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
            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block font-mono">
                  {gap.studentsDeficientCount} Students
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({gap.cohortDeficiencyPercentage}% of class)
                </span>
              </div>

              <div className="w-24 text-right">
                <span className="text-xs font-mono font-bold text-brand-orange block">
                  {gap.classProficiencyAvg}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Cohort Avg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
