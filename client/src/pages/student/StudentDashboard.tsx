import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboard } from '../../api/client.js';
import { useApp } from '../../context/AppContext.js';
import { StatCard } from '../../components/common/StatCard.js';
import { ReadinessGauge } from '../../components/common/ReadinessGauge.js';
import { SkillBar } from '../../components/common/SkillBar.js';
import { NextMoveCard } from '../../components/student/NextMoveCard.js';
import { InternshipCard } from '../../components/student/InternshipCard.js';
import { Card } from '../../components/common/Card.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { assetUrl } from '../../utils/assets.js';
import {
  Briefcase,
  GitBranch,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { activeStudentId, getDynamicReadiness } = useApp();
  const { data, isLoading } = useStudentDashboard(activeStudentId);
  const navigate = useNavigate();

  if (isLoading || !data) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const {
    student,
    readinessReassurance,
    quickStats,
    skillsSummary,
    nextMove,
    topInternshipMatches,
  } = data;

  // Interconnected live readiness score boosted by checked roadmap tasks
  const { dynamicScore, dynamicTier } = getDynamicReadiness(student.readinessScore);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7"
    >
      {/* 1. HERO STUDENT HEADER */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#EEF2F6] shadow-neu-sm"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-neu-sm shrink-0"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 shadow-sm flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] shadow-neu-sm text-emerald-700 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                LIVE SYNCED
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">{student.cohort}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {student.name}
            </h1>

            <p className="text-xs sm:text-sm text-brand-orange font-bold">
              Target: {student.targetRole}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/ask')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-orange text-white font-black text-xs shadow-neu-orange transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask UNLOCK AI</span>
        </button>
      </motion.div>

      {/* 2. KPI STATS GRID */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Internship Matches"
          value={quickStats.matchedInternships}
          suffix="Direct"
          icon={Briefcase}
          trendDelta={student.weeklyProgressDelta}
          trendLabel="pool delta"
          highlight
        />
        <StatCard
          label="Almost Ready"
          value={quickStats.almostReadyInternships}
          suffix="Roles"
          icon={Zap}
          subtext="1-2 skill closures"
        />
        <StatCard
          label="Identified Gaps"
          value={quickStats.criticalGaps}
          suffix="Skills"
          icon={GitBranch}
          subtext="Mapped to roadmap"
        />
        <StatCard
          label="Sprint Velocity"
          value={quickStats.weeklyProgressDelta}
          prefix="+"
          suffix="%"
          icon={TrendingUp}
          subtext="Top 15% in cohort"
        />
      </motion.div>

      {/* 3. READINESS GAUGE & COMPETENCIES */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Circular Gauge Card */}
        <Card className="lg:col-span-5 p-6 md:p-8 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Readiness Diagnosis
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] shadow-neu-sm text-slate-600 font-mono">
              CALIBRATED
            </span>
          </div>

          <ReadinessGauge
            score={dynamicScore}
            tier={dynamicTier}
            reassurance={readinessReassurance}
            size="lg"
            className="my-2"
          />

          <div className="mt-5 w-full pt-4 border-t border-[#CAD4E0]/40 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">Hiring Bar: <strong className="text-slate-900 font-bold">80% Ready</strong></span>
            <button
              onClick={() => navigate('/skill-gap')}
              className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1"
            >
              Analyze Gaps <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Competencies Progress Card */}
        <Card className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Verified Technical Competencies
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Coursework, repo commits, and benchmarks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 shadow-neu-sm font-mono">
                  {skillsSummary.strongCount} Strong
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
                  {skillsSummary.improveCount} Improve
                </span>
              </div>
            </div>

            <div className="space-y-4 my-2">
              {skillsSummary.topSkills.slice(0, 4).map(sk => (
                <SkillBar key={sk.id} skill={sk} showDetails={false} />
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#CAD4E0]/40 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">6 verified projects</span>
            <button
              onClick={() => navigate('/profile')}
              className="text-slate-700 hover:text-brand-orange font-bold transition-colors inline-flex items-center gap-1"
            >
              Full Profile <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </motion.div>

      {/* 4. NEXT MOVE CARD */}
      <motion.div variants={itemVariants}>
        <NextMoveCard
          title={nextMove.title}
          summary={nextMove.summary}
          actions={nextMove.actions}
        />
      </motion.div>

      {/* 5. VERIFIED CAPSTONE PROJECT CARD */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: 3D Data Architecture Graphic */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-neu-sm relative group">
              <img
                src={assetUrl('/images/unlock_project.jpg')}
                alt="Neural Data Architecture"
                className="w-full h-48 md:h-52 object-cover object-center group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#EEF2F6]/95 text-brand-orange font-bold shadow-neu-sm">
                  CORE REPO
                </span>
                <span className="text-white font-bold bg-slate-900/85 px-2 py-0.5 rounded-lg">
                  99.9% Uptime
                </span>
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-orange-50 text-brand-orange shadow-neu-sm font-mono">
                  VERIFIED REPO EVALUATION
                </span>
                <span className="text-xs font-mono text-slate-400">CS Capstone</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                High-Throughput Distributed LLM Serving Engine
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Custom CUDA kernels with continuous batching and PagedAttention, achieving 3.4x higher token throughput.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {['CUDA 12.2', 'PyTorch 2.4', 'vLLM', 'FastAPI', 'Docker'].map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#EEF2F6] text-slate-700 shadow-neu-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 6. MATCHED INTERNSHIPS */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Top Matched Internships
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by digital twin readiness alignment for Tier 1 teams
            </p>
          </div>
          <button
            onClick={() => navigate('/internships')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orangeHover transition-colors"
          >
            <span>Explore All 8 Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {topInternshipMatches.map(match => (
            <InternshipCard key={match.internshipId} match={match} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
