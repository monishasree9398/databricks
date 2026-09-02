import React from 'react';
import { useApp } from '../../context/AppContext.js';
import { useStudentProfile } from '../../api/client.js';
import { Card } from '../../components/common/Card.js';
import { SkillBar } from '../../components/common/SkillBar.js';
import { ReadinessGauge } from '../../components/common/ReadinessGauge.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import {
  Award,
  Trophy,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { activeStudentId } = useApp();
  const { data: student, isLoading } = useStudentProfile(activeStudentId);

  if (isLoading || !student) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const { academic, skills, projects, certifications, hackathons } = student;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Profile Hero Banner */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Live Synced" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  VERIFIED DIGITAL TWIN
                </span>
                <span className="text-xs font-mono text-slate-400">ID: {student.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-orange font-bold">
                {student.targetRole}
              </p>
              <p className="text-xs text-slate-600 max-w-xl line-clamp-2">
                {student.bio}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <ReadinessGauge
              score={student.readinessScore}
              tier={student.readinessTier}
              size="sm"
              showReassurance={false}
            />
          </div>
        </div>
      </Card>

      {/* Academic Record KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
            Cumulative GPA
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{academic.cgpa}</span>
            <span className="text-xs text-slate-400 font-mono">/ {academic.scale}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1">{academic.university}</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
            Cohort Rank
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">#{academic.departmentRank}</span>
            <span className="text-xs text-slate-400 font-mono">of {academic.totalStudentsInCohort}</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 font-bold font-mono">Top 3% Percentile</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
            Degree Credits
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{academic.creditsCompleted}</span>
            <span className="text-xs text-slate-400 font-mono">/ {academic.totalCredits}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1">Class of {academic.graduationYear}</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
            Attendance Rate
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{academic.attendanceRate}%</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 font-bold font-mono">Verified Presence</span>
        </Card>
      </div>

      {/* Two Columns: Skills & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verified Skills Matrix */}
        <Card className="lg:col-span-5 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Verified Skills Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated through code reviews & lab performance
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              VERIFIED
            </span>
          </div>

          <div className="space-y-4">
            {skills.map(skill => (
              <SkillBar key={skill.id} skill={skill} showDetails />
            ))}
          </div>
        </Card>

        {/* Right: Key Project Portfolio & Certs */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Digital Twin Key Artifacts & Repos
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-impact production projects mapped to hiring benchmarks
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 hover:border-brand-orange/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {proj.tagline}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      Score: {proj.impactScore}/100
                    </span>
                  </div>

                  {idx === 0 && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 h-32 my-2">
                      <img
                        src="/images/unlock_project.jpg"
                        alt="Project architecture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                    <strong className="text-brand-orange text-[11px] uppercase tracking-wide mr-1.5 font-mono">Impact:</strong>
                    {proj.metrics}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {proj.skills.map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Certifications & Hackathons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Award className="w-4 h-4 text-brand-orange" />
                <h4 className="text-sm font-bold text-slate-900 font-sans">
                  Certifications
                </h4>
              </div>
              <div className="space-y-2">
                {certifications.map(c => (
                  <div key={c.name} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-800">{c.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{c.issuer} • {c.issueDate}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Trophy className="w-4 h-4 text-brand-orange" />
                <h4 className="text-sm font-bold text-slate-900 font-sans">
                  Hackathons & Awards
                </h4>
              </div>
              <div className="space-y-2">
                {hackathons.map(h => (
                  <div key={h.name} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-800">{h.name}</p>
                    <p className="text-[11px] text-brand-orange font-bold font-mono">{h.position} • {h.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
