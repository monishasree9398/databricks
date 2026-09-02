import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFacultyStudent360 } from '../../api/client.js';
import { useApp } from '../../context/AppContext.js';
import { Card } from '../../components/common/Card.js';
import { SkillBar } from '../../components/common/SkillBar.js';
import { ReadinessGauge } from '../../components/common/ReadinessGauge.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import {
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const Student360View: React.FC = () => {
  const { id, studentId } = useParams<{ id?: string; studentId?: string }>();
  const { activeStudentId, setActiveStudentId } = useApp();
  const navigate = useNavigate();

  const currentId = id || studentId || activeStudentId || 'stu-001';
  const { data, isLoading } = useFacultyStudent360(currentId);

  useEffect(() => {
    if (currentId && currentId !== activeStudentId) {
      setActiveStudentId(currentId);
    }
  }, [currentId, activeStudentId, setActiveStudentId]);

  if (isLoading || !data) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const { student, aiDiagnostic, facultyAdvisorNotes, matches } = data;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Back to roster navigation */}
      <button
        onClick={() => navigate('/faculty/students')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Class Directory
      </button>

      {/* Student 360 Hero Card */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Verified Candidate" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
                  DIGITAL TWIN 360
                </span>
                <span className="text-xs font-mono text-slate-500">ID: {student.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-orange font-bold">
                Target: {student.targetRole}
              </p>
              <p className="text-xs text-slate-600 font-mono">
                {student.academic?.degree || 'BS Computer Science'} • GPA: {student.academic?.cgpa || 3.9} / 4.0
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <ReadinessGauge
              score={student.readinessScore}
              tier={student.readinessTier}
              reassurance={student.readinessReassurance}
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* AI Diagnostic Summary */}
      <Card className="p-6 border-orange-200 bg-orange-50/20">
        <div className="flex items-center justify-between pb-3 border-b border-orange-100 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-orange text-white font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI DIAGNOSTIC
            </span>
            <span className="text-xs font-bold uppercase text-brand-orange tracking-wider font-mono">
              Trajectory: {aiDiagnostic.trajectoryStatus}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Mentor: {aiDiagnostic.recommendedMentorAssignment}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
          {aiDiagnostic.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-orange-100">
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block mb-1 font-mono">
              Key Strengths
            </span>
            <div className="flex flex-wrap gap-1.5">
              {aiDiagnostic.keyStrengths.map(st => (
                <span key={st} className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {st}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-brand-orange tracking-wider block mb-1 font-mono">
              Faculty Interventions
            </span>
            <ul className="text-xs text-slate-600 space-y-1">
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
        <Card className="lg:col-span-6 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-sans">
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
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Advisor Notes
            </h3>
            <div className="space-y-3">
              {facultyAdvisorNotes.map((note, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{note.author}</span>
                    <span className="text-slate-400 font-mono">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {note.note}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Top Recruiter Alignments
            </h3>
            <div className="space-y-2.5">
              {matches.slice(0, 3).map(m => (
                <div key={m.internshipId} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{m.company} • {m.role}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{m.location}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-brand-orange font-mono">{m.readinessScore}%</span>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">{m.status}</span>
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
