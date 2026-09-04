import React from 'react';
import { SkillGapItem } from '../../types/index.js';
import { Card } from '../common/Card.js';
import { CheckCircle2 } from 'lucide-react';

interface SkillFlowDiagramProps {
  gaps: SkillGapItem[];
  targetRole: string;
}

export const SkillFlowDiagram: React.FC<SkillFlowDiagramProps> = ({ gaps, targetRole }) => {
  const haveSkills = gaps.filter(g => g.status === 'have');
  const improveSkills = gaps.filter(g => g.status === 'improve');
  const learnSkills = gaps.filter(g => g.status === 'learn' || g.status === 'build' || g.status === 'later');

  return (
    <div className="space-y-6">
      {/* 3-Column Visual Flow Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Column 1: Verified Mastered */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#CAD4E0]/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                  Verified Skills
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 shadow-neu-sm font-mono">
                {haveSkills.length} Mastered
              </span>
            </div>

            <div className="space-y-3">
              {haveSkills.map(s => (
                <div
                  key={s.skillName}
                  className="p-3.5 rounded-2xl bg-[#EEF2F6] shadow-neu-sm flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block line-clamp-1">{s.skillName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Proficiency: {s.currentLevel}%</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 pt-3.5 border-t border-[#CAD4E0]/40 text-[11px] text-slate-400 font-medium">
            Exceeds recruiter threshold for {targetRole}
          </div>
        </Card>

        {/* Column 2: Active Skill Gaps */}
        <Card className="p-6 flex flex-col justify-between" glow>
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#CAD4E0]/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange shadow-sm" />
                <h4 className="text-sm font-black text-brand-orange tracking-tight uppercase">
                  Active Skill Gaps
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
                {improveSkills.length + learnSkills.length} Gaps
              </span>
            </div>

            <div className="space-y-3">
              {[...improveSkills, ...learnSkills].map(s => (
                <div
                  key={s.skillName}
                  className="p-3.5 rounded-2xl bg-[#EEF2F6] shadow-neu-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">{s.skillName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
                      -{s.gapDelta}% Gap
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Current: <strong className="text-slate-800">{s.currentLevel}%</strong></span>
                    <span>Target: <strong className="text-brand-orange">{s.targetLevel}%</strong></span>
                  </div>

                  <p className="text-[11px] text-slate-500 italic line-clamp-1">
                    {s.recommendedAction}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 pt-3.5 border-t border-[#CAD4E0]/40 flex items-center justify-between text-[11px] text-brand-orange font-mono">
            <span>Total effort required</span>
            <span className="font-bold">~{improveSkills.reduce((acc, s) => acc + s.estimatedHoursToClose, 0) + learnSkills.reduce((acc, s) => acc + s.estimatedHoursToClose, 0)} hours</span>
          </div>
        </Card>

        {/* Column 3: Target Role Benchmark */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#CAD4E0]/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 shadow-sm" />
                <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                  Target Benchmark
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] shadow-neu-sm text-slate-700 font-mono">
                90%+ Ready
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-pressed space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                Target Role Definition
              </span>
              <h5 className="text-base font-black text-slate-900 font-sans">
                {targetRole}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized competency matrix calibrated against frontier AI labs and high-growth engineering teams.
              </p>

              <div className="pt-2 border-t border-[#CAD4E0]/40 space-y-1.5 text-xs text-slate-600 font-mono">
                <div className="flex items-center justify-between">
                  <span>Prerequisite Skills:</span>
                  <strong className="text-slate-900">{gaps.length}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Bar:</span>
                  <strong className="text-emerald-700">85% Avg</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-3.5 border-t border-[#CAD4E0]/40 text-[11px] text-slate-400 text-center font-medium">
            Continuously updated by digital twin telemetry
          </div>
        </Card>
      </div>
    </div>
  );
};
