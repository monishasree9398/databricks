import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.js';
import { useStudentSkillGap } from '../../api/client.js';
import { Card } from '../../components/common/Card.js';
import { SkillFlowDiagram } from '../../components/student/SkillFlowDiagram.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import {
  AlertTriangle,
  ArrowRight,
  Target,
  Clock,
  Zap,
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { activeStudentId, selectedTargetRole, setSelectedTargetRole } = useApp();
  const { data: analysis, isLoading } = useStudentSkillGap(activeStudentId, selectedTargetRole);
  const navigate = useNavigate();

  if (isLoading || !analysis) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const roleOptions = [
    "AI / ML Systems Engineer",
    "Full Stack Product Engineer",
    "Cloud Infrastructure & Platform Engineer",
    "Distributed Systems & Database Engineer",
    "Cybersecurity & Security Engineer",
    "Data Platform & Analytics Engineer"
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header & Target Role Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
              DIAGNOSTICS
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              Target: 90%+
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Skill Gap Matrix
          </h1>
        </div>

        {/* Target Role Selector Pill */}
        <div className="flex items-center gap-2 bg-[#EEF2F6] p-1.5 rounded-2xl shadow-neu-pressed">
          <Target className="w-4 h-4 text-brand-orange ml-2 shrink-0" />
          <select
            value={selectedTargetRole || analysis.targetRole}
            onChange={e => setSelectedTargetRole(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-900 pr-4 py-1.5 focus:outline-none cursor-pointer"
          >
            {roleOptions.map(role => (
              <option key={role} value={role} className="bg-[#EEF2F6] text-slate-900">
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero 2-Card Spotlight: Biggest Blocker vs Recommended Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {/* Blocker Card */}
        <Card className="p-6">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Top Blocker
          </div>
          <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">
            {analysis.biggestBlocker.skill}{analysis.biggestBlocker.gapDelta ? ` (-${analysis.biggestBlocker.gapDelta}%)` : ''}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {analysis.biggestBlocker.reason}
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#CAD4E0]/40 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg shadow-neu-sm">
              {analysis.biggestBlocker.impactOnReadiness}
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-medium">Critical</span>
          </div>
        </Card>

        {/* Recommended Next Step Card */}
        <Card className="p-6" glow>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-2 font-mono">
            <Zap className="w-4 h-4" />
            Next Action
          </div>
          <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">
            {analysis.recommendedNextStep.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {analysis.recommendedNextStep.action}
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#CAD4E0]/40 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 inline-flex items-center gap-1 font-bold">
              <Clock className="w-3.5 h-3.5" />
              {analysis.recommendedNextStep.estimatedTimeToImpact}
            </span>
            <button
              onClick={() => navigate('/roadmap')}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-brand-orange transition-all font-mono"
            >
              <span>Week {analysis.recommendedNextStep.roadmapWeekTarget} Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* 3-Column Architecture Visualization */}
      <SkillFlowDiagram
        gaps={analysis.gaps}
        targetRole={selectedTargetRole || analysis.targetRole}
      />
    </div>
  );
};
