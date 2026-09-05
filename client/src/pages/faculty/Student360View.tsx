import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFacultyStudent360 } from '../../api/client.js';
import { useApp } from '../../context/AppContext.js';
import { Card } from '../../components/common/Card.js';
import { SkillBar } from '../../components/common/SkillBar.js';
import { ReadinessGauge } from '../../components/common/ReadinessGauge.js';
import { SkillRadarChart } from '../../components/visuals/SkillRadarChart.js';
import { ReadinessTrajectoryChart } from '../../components/visuals/ReadinessTrajectoryChart.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import {
  Sparkles,
  ArrowLeft,
  Activity,
  TrendingUp,
} from 'lucide-react';

export const Student360View: React.FC = () => {
  const { id: paramId, studentId: routeStudentId } = useParams<{ id?: string; studentId?: string }>();
  const { inspectedStudentId, activeStudentId } = useApp();
  const effectiveId = paramId || routeStudentId || inspectedStudentId || activeStudentId || 'stu-001';
  
  const { data: student360, isLoading } = useFacultyStudent360(effectiveId);
  const navigate = useNavigate();

  if (isLoading || !student360) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const { student, aiDiagnostic, facultyAdvisorNotes, matches } = student360;

  const radarSkills = student.skills.map(s => ({
    name: s.name,
    level: s.level,
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => navigate('/faculty/students')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-xs font-bold text-slate-700 hover:text-brand-orange transition-all mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Students Directory</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shadow-neu-sm shrink-0"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
                  DIGITAL TWIN 360
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold">ID: {student.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-orange font-bold font-mono">
                Target: {student.targetRole}
              </p>
              <p className="text-xs text-slate-600 font-mono font-bold">
                {student.academic?.degree || 'BS Computer Science'} • GPA: {student.academic?.cgpa || 3.9} / 4.0
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[#CAD4E0]/40">
            <ReadinessGauge
              score={student.readinessScore}
              tier={student.readinessTier}
              reassurance={student.readinessReassurance}
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* 50/50 VISUAL TELEMETRY SECTION (RADAR + TRAJECTORY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <Card className="lg:col-span-6 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#CAD4E0]/40">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-orange" />
              <h3 className="text-sm font-black text-slate-900 font-mono uppercase">
                Competency Polygon
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
              6 VECTORS
            </span>
          </div>

          <div className="my-2">
            <SkillRadarChart skills={radarSkills} targetThreshold={80} />
          </div>

          <div className="pt-3 border-t border-[#CAD4E0]/40 text-[11px] font-mono text-slate-500 text-center">
            Benchmark: 80% Tier-1 Readiness Bar
          </div>
        </Card>

        <Card className="lg:col-span-6 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#CAD4E0]/40">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-900 font-mono uppercase">
                Readiness Progression
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 shadow-neu-sm font-mono">
              VELOCITY
            </span>
          </div>

          <div className="my-2">
            <ReadinessTrajectoryChart currentScore={student.readinessScore} />
          </div>

          <div className="pt-3 border-t border-[#CAD4E0]/40 text-[11px] font-mono text-slate-500 text-center">
            Trajectory Status: <strong className="text-emerald-700 font-bold">{aiDiagnostic.trajectoryStatus}</strong>
          </div>
        </Card>
      </div>

      {/* AI Diagnostic Summary */}
      <Card className="p-6 md:p-7" glow>
        <div className="flex items-center justify-between pb-3 border-b border-[#CAD4E0]/40 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-brand-orange text-white font-mono flex items-center gap-1 shadow-neu-orange">
              <Sparkles className="w-3 h-3" />
              AI DIAGNOSTIC
            </span>
            <span className="text-xs font-black uppercase text-brand-orange tracking-wider font-mono">
              Trajectory: {aiDiagnostic.trajectoryStatus}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 font-mono">
            Mentor: {aiDiagnostic.recommendedMentorAssignment}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-medium">
          {aiDiagnostic.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#CAD4E0]/40">
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block mb-1.5 font-mono">
              Key Strengths
            </span>
            <div className="flex flex-wrap gap-1.5">
              {aiDiagnostic.keyStrengths.map(st => (
                <span key={st} className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 shadow-neu-sm">
                  {st}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-brand-orange tracking-wider block mb-1.5 font-mono">
              Faculty Interventions
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5">
              {aiDiagnostic.immediateInterventions.map((inv, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                  {inv}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Two Columns: Skills Matrix & Advisor Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verified Skills */}
        <Card className="lg:col-span-6 p-6 md:p-7 space-y-4">
          <h3 className="text-base font-black text-slate-900 font-sans">
            Verified Competencies
          </h3>
          <div className="space-y-4">
            {student.skills.map(sk => (
              <SkillBar key={sk.id} skill={sk} showDetails />
            ))}
          </div>
        </Card>

        {/* Right: Advisor Notes & Internship Matches */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-6 md:p-7 space-y-4">
            <h3 className="text-base font-black text-slate-900 font-sans">
              Advisor Notes
            </h3>
            <div className="space-y-3">
              {facultyAdvisorNotes.map((note, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-sm space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{note.author}</span>
                    <span className="text-slate-400 font-mono">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {note.note}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-7 space-y-4">
            <h3 className="text-base font-black text-slate-900 font-sans">
              Top Recruiter Alignments
            </h3>
            <div className="space-y-3">
              {matches.slice(0, 3).map(m => (
                <div key={m.internshipId} className="p-3.5 rounded-2xl bg-[#EEF2F6] shadow-neu-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{m.company} • {m.role}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{m.location}</span>
                  </div>
                  <div className="text-right px-2.5 py-1 rounded-xl bg-[#EEF2F6] shadow-neu-pressed">
                    <span className="text-sm font-black text-brand-orange font-mono">{m.readinessScore}%</span>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
