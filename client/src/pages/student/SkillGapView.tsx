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
  const { activeStudentId, activeStudent, selectedTargetRole, setSelectedTargetRole } = useApp();
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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Header & Target Role Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              GAP DIAGNOSTICS
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Target Bar: 90%+
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Skill Gap Matrix
          </h1>
        </div>

        {/* Target Role Selector Pill */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <Target className="w-4 h-4 text-brand-orange ml-2 shrink-0" />
          <select
            value={selectedTargetRole || analysis.targetRole}
            onChange={e => setSelectedTargetRole(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 pr-3 py-1 focus:outline-none cursor-pointer"
          >
            {roleOptions.map(role => (
              <option key={role} value={role} className="bg-white text-slate-900">
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero 2-Card Spotlight: Biggest Blocker vs Recommended Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Blocker Card */}
        <Card className="p-5 border-amber-200 bg-amber-50/30">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 font-mono">
            <AlertTriangle className="w-4 h-4" />
            Single Biggest Blocker
          </div>
          <h3 className="text-base font-bold text-slate-900 font-sans">
            {analysis.biggestBlocker.skill}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            {analysis.biggestBlocker.reason}
          </p>
          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 font-bold">
              {analysis.biggestBlocker.impactOnReadiness}
            </span>
          </div>
        </Card>

        {/* Recommended Action Card */}
        <Card className="p-5 border-orange-200 bg-orange-50/30">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-2 font-mono">
            <Zap className="w-4 h-4" />
            Recommended Sprint Action
          </div>
          <h3 className="text-base font-bold text-slate-900 font-sans">
            {analysis.recommendedNextStep.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            {analysis.recommendedNextStep.action}
          </p>
          <div className="mt-4 pt-3 border-t border-orange-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono flex items-center gap-1 text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              {analysis.recommendedNextStep.estimatedTimeToImpact}
            </span>
            <button
              onClick={() => navigate('/roadmap')}
              className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1 text-xs"
            >
              Start Sprint <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* 3-Column Visual Flow Architecture */}
      <SkillFlowDiagram gaps={analysis.gaps} targetRole={selectedTargetRole || analysis.targetRole} />
    </div>
  );
};
