import React from 'react';
import { useApp } from '../../context/AppContext.js';
import { useStudentProfile } from '../../api/client.js';
import { Card } from '../../components/common/Card.js';
import { SkillBar } from '../../components/common/SkillBar.js';
import { ReadinessGauge } from '../../components/common/ReadinessGauge.js';
import { SkillRadarChart } from '../../components/visuals/SkillRadarChart.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { assetUrl } from '../../utils/assets.js';
import {
  Award,
  Trophy,
  Activity,
  Layers,
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

  const radarSkills = skills.map(s => ({
    name: s.name,
    level: s.level,
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Top Banner Card */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shadow-neu-sm shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] shadow-neu-sm text-emerald-700 font-mono">
                  {student.id}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">{student.cohort}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-orange font-bold font-mono">
                {student.email} • {student.targetRole}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[#CAD4E0]/40">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Card className="p-5 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
            Cumulative GPA
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{academic.cgpa}</span>
            <span className="text-xs text-slate-400 font-mono">/ {academic.scale}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-bold">{academic.university}</span>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
            Cohort Rank
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">#{academic.departmentRank}</span>
            <span className="text-xs text-slate-400 font-mono">of {academic.totalStudentsInCohort}</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 font-bold font-mono">Top 3% Percentile</span>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
            Degree Credits
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{academic.creditsCompleted}</span>
            <span className="text-xs text-slate-400 font-mono">/ {academic.totalCredits}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-bold">Class of {academic.graduationYear}</span>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
            Attendance Rate
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{academic.attendanceRate}%</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 font-bold font-mono">Verified Presence</span>
        </Card>
      </div>

      {/* 50/50 VISUAL MATRIX & KEY ARTIFACTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Verified Skills Matrix + Spider Radar (5 Cols) */}
        <Card className="lg:col-span-5 p-6 md:p-7 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#CAD4E0]/40">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-orange" />
                <h3 className="text-base font-black text-slate-900 font-sans">
                  Competency Vectors
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 shadow-neu-sm font-mono">
                VERIFIED
              </span>
            </div>

            {/* Visual Radar Polygon */}
            <div className="my-3">
              <SkillRadarChart skills={radarSkills} targetThreshold={80} />
            </div>

            {/* Linear Skill Bars */}
            <div className="space-y-3.5 pt-2">
              {skills.slice(0, 4).map(skill => (
                <SkillBar key={skill.id} skill={skill} showDetails />
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#CAD4E0]/40 text-[11px] font-mono text-slate-400 text-center">
            Calibrated against industry benchmark (80%)
          </div>
        </Card>

        {/* Right: Key Project Portfolio & Certs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 md:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#CAD4E0]/40">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-orange" />
                <h3 className="text-base font-black text-slate-900 font-sans">
                  Key Artifacts & Repos
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono font-bold">2 Repositories</span>
            </div>

            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-3xl bg-[#EEF2F6] shadow-neu-sm space-y-3 hover:shadow-neu-flat transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 font-sans">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                        {proj.tagline}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-black bg-emerald-50 text-emerald-700 shadow-neu-sm shrink-0">
                      Score: {proj.impactScore}/100
                    </span>
                  </div>

                  {idx === 0 && (
                    <div className="relative rounded-2xl overflow-hidden shadow-neu-sm h-36 my-2">
                      <img
                        src={assetUrl('/images/unlock_project.jpg')}
                        alt="Project architecture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-3 rounded-2xl bg-[#EEF2F6] shadow-neu-pressed text-xs text-slate-700 font-mono">
                    <strong className="text-brand-orange text-[11px] uppercase tracking-wide mr-1.5 font-bold">Impact:</strong>
                    {proj.metrics}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {proj.skills.map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#EEF2F6] text-slate-700 shadow-neu-sm"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 pb-2.5 border-b border-[#CAD4E0]/40">
                <Award className="w-4 h-4 text-brand-orange" />
                <h4 className="text-sm font-black text-slate-900 font-sans">
                  Certifications
                </h4>
              </div>
              <div className="space-y-2.5">
                {certifications.map(c => (
                  <div key={c.name} className="text-xs space-y-0.5 p-2.5 rounded-xl bg-[#EEF2F6] shadow-neu-sm">
                    <p className="font-bold text-slate-800">{c.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{c.issuer} • {c.issueDate}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 pb-2.5 border-b border-[#CAD4E0]/40">
                <Trophy className="w-4 h-4 text-brand-orange" />
                <h4 className="text-sm font-black text-slate-900 font-sans">
                  Hackathons & Awards
                </h4>
              </div>
              <div className="space-y-2.5">
                {hackathons.map(h => (
                  <div key={h.name} className="text-xs space-y-0.5 p-2.5 rounded-xl bg-[#EEF2F6] shadow-neu-sm">
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
