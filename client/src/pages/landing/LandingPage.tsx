import React from 'react';
import { motion } from 'framer-motion';
import {
  LockOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  ShieldCheck,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onQuickStudentLogin: () => void;
  onQuickFacultyLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onQuickStudentLogin,
  onQuickFacultyLogin,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
      {/* 1. FULL PAGE CAMPUS BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/campus_hero.jpg"
          alt="University Campus"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, light vignette overlay for high contrast and focus */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      </div>

      {/* TOP HEADER */}
      <header className="relative z-10 h-20 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-sm text-xs font-bold text-slate-800 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Stanford Cohort Telemetry Active
        </div>

        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white border border-slate-200 text-slate-900 font-bold text-xs transition-all shadow-sm hover:border-brand-orange/50 hover:text-brand-orange"
        >
          <span>Sign In</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* 2. BIG UNLOCK IN THE MIDDLE WITH LOGO & AI DIGITAL TWIN */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-12 max-w-4xl mx-auto w-full my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Logo Icon */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-orange-200 shadow-xl backdrop-blur-md">
            <LockOpen className="w-10 h-10 sm:w-14 sm:h-14 text-brand-orange stroke-[2.2]" />
          </div>

          {/* Big UNLOCK Title */}
          <div className="space-y-3">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 tracking-tight font-sans">
              UNLOCK<span className="text-brand-orange">.</span>
            </h1>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-orange-200 text-xs sm:text-sm font-bold text-brand-orange font-mono shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              AI-POWERED STUDENT DIGITAL TWIN
            </div>
          </div>

          {/* Core Tagline */}
          <p className="text-base sm:text-xl text-slate-700 font-medium max-w-2xl leading-relaxed bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            Not scattered data. A living digital twin that converts coursework, repositories, and skills into verified internship readiness.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-orange hover:bg-brand-orangeHover text-white font-black text-sm sm:text-base transition-all shadow-lg hover:shadow-orange-500/25 group"
            >
              <span>Sign In to Twin Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onQuickStudentLogin}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/95 hover:bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all shadow-sm hover:border-brand-orange/40"
              >
                <GraduationCap className="w-4 h-4 text-brand-orange" />
                <span>Student Demo</span>
              </button>

              <button
                onClick={onQuickFacultyLogin}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/95 hover:bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all shadow-sm hover:border-emerald-500/40"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Faculty Demo</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 sm:px-12 py-5 text-center text-xs text-slate-600 font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Stanford CS Digital Twin Platform • Enterprise Grade</span>
      </footer>
    </div>
  );
};
