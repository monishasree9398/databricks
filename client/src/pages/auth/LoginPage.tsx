import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext.js';
import { Logo } from '../../components/common/Logo.js';
import { Card } from '../../components/common/Card.js';
import { assetUrl } from '../../utils/assets.js';
import {
  GraduationCap,
  Users,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Mail,
  Zap,
  BadgeCheck,
  Building,
} from 'lucide-react';

interface LoginPageProps {
  onBackToLanding?: () => void;
  initialRole?: 'student' | 'faculty';
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToLanding, initialRole = 'student' }) => {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty'>(initialRole);
  
  // Student state
  const [studentEmail, setStudentEmail] = useState<string>('monisha.sree@stanford.edu');
  const [studentPassword, setStudentPassword] = useState<string>('••••••••••••');

  // Faculty state
  const [facultyId, setFacultyId] = useState<string>('FAC-CS-40182');
  const [facultyPin, setFacultyPin] = useState<string>('••••••••');
  const [facultyDepartment, setFacultyDepartment] = useState<string>('Computer Science & Engineering');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(selectedRole, selectedRole === 'student' ? 'stu-001' : undefined);
      setLoading(false);
    }, 250);
  };

  const handleQuickStudentLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('student', 'stu-001');
      setLoading(false);
    }, 200);
  };

  const handleQuickFacultyLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('faculty');
      setLoading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center p-4 sm:p-8 overflow-hidden">
      {/* Background Campus Photo with Soft Light Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={assetUrl('/images/campus_hero.jpg')}
          alt="Campus"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-md space-y-5"
      >
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between mb-2">
            {onBackToLanding ? (
              <button
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-bold text-slate-700 hover:text-brand-orange hover:bg-white transition-all shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </button>
            ) : <div />}
            <Logo size="md" />
            <div className="w-20" />
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {selectedRole === 'faculty'
              ? 'Enter your verified Faculty ID to inspect cohort digital twins'
              : 'Sign in to access your student digital twin workspace'}
          </p>
        </div>

        {/* 1-Click Quick Demo Sign In Card */}
        <Card className="p-4 space-y-3 border-orange-200 bg-white/95 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              1-Click Demo Sign In
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              INSTANT
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Student Demo Persona */}
            <button
              type="button"
              onClick={handleQuickStudentLogin}
              disabled={loading}
              className={`p-3 rounded-xl border text-left transition-all group flex items-center gap-3 shadow-xs ${
                selectedRole === 'student'
                  ? 'bg-orange-50/60 border-brand-orange/40'
                  : 'bg-slate-50 hover:bg-orange-50/80 border-slate-200 hover:border-brand-orange/40'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Monisha"
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-brand-orange">
                  Monisha Sree
                </span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">
                  Student Twin
                </span>
              </div>
            </button>

            {/* Faculty Demo Persona */}
            <button
              type="button"
              onClick={handleQuickFacultyLogin}
              disabled={loading}
              className={`p-3 rounded-xl border text-left transition-all group flex items-center gap-3 shadow-xs ${
                selectedRole === 'faculty'
                  ? 'bg-orange-50/60 border-brand-orange/40'
                  : 'bg-slate-50 hover:bg-orange-50/80 border-slate-200 hover:border-brand-orange/40'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Faculty"
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-brand-orange">
                  Prof. Patterson
                </span>
                <span className="text-[10px] text-brand-orange font-bold font-mono">
                  ID: FAC-40182
                </span>
              </div>
            </button>
          </div>
        </Card>

        {/* Regular Login Card */}
        <Card className="p-6 space-y-4 bg-white/95 shadow-lg">
          {/* Role Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                selectedRole === 'student'
                  ? 'bg-white text-brand-orange font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('faculty')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                selectedRole === 'faculty'
                  ? 'bg-white text-brand-orange font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Faculty ID Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {selectedRole === 'faculty' ? (
              /* FACULTY ID LOGIN FORM */
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono flex items-center justify-between">
                    <span>Faculty Registration ID</span>
                    <span className="text-brand-orange font-bold">REQUIRED</span>
                  </label>
                  <div className="relative">
                    <BadgeCheck className="w-4 h-4 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={facultyId}
                      onChange={e => setFacultyId(e.target.value)}
                      placeholder="e.g. FAC-CS-40182"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Assigned by Stanford Academic Computing Department
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono block">
                    Academic Department
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={facultyDepartment}
                      onChange={e => setFacultyDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                      <option value="AI & Machine Learning Institute">AI & Machine Learning Institute</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Data Science & Informatics">Data Science & Informatics</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono block">
                    Faculty Security PIN / Passcode
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={facultyPin}
                      onChange={e => setFacultyPin(e.target.value)}
                      placeholder="Enter 6-8 digit faculty PIN"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* STUDENT LOGIN FORM */
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                    Student Email / Roll No
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={e => setStudentEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={studentPassword}
                      onChange={e => setStudentPassword(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Authenticating {selectedRole === 'faculty' ? 'Faculty ID' : 'Student'}...</span>
              ) : (
                <>
                  <span>{selectedRole === 'faculty' ? 'Verify Faculty ID & Access Cohort' : 'Enter Workspace'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </Card>

        {/* Security Note */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Stanford CS Verified Telemetry</span>
        </div>
      </motion.div>
    </div>
  );
};
