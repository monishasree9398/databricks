import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp, AppMode } from '../../context/AppContext.js';
import { Modal } from './Modal.js';
import {
  GraduationCap,
  Users,
  ChevronDown,
  LogOut,
  User,
  BadgeCheck,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    mode,
    setMode,
    authenticatedStudentId,
    inspectedStudentId,
    setInspectedStudentId,
    studentsList,
    activeStudent,
    currentUser,
    logout,
    isSidebarCollapsed,
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Faculty Auth Modal (for entering Faculty mode)
  const [isFacultyAuthModalOpen, setIsFacultyAuthModalOpen] = useState(false);
  const [modalFacultyId, setModalFacultyId] = useState('FAC-CS-40182');
  const [modalFacultyPin, setModalFacultyPin] = useState('••••••••');

  // Student Auth Modal (for entering Student mode)
  const [isStudentAuthModalOpen, setIsStudentAuthModalOpen] = useState(false);
  const [modalStudentId, setModalStudentId] = useState('stu-001');
  const [modalStudentPin, setModalStudentPin] = useState('••••••••');

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModeChange = (newMode: AppMode) => {
    if (newMode === 'faculty' && mode === 'student') {
      setIsFacultyAuthModalOpen(true);
      return;
    }
    if (newMode === 'student' && mode === 'faculty') {
      // Default the modal to the currently authenticated student
      setModalStudentId(authenticatedStudentId || 'stu-001');
      setIsStudentAuthModalOpen(true);
      return;
    }
    setMode(newMode);
    if (newMode === 'faculty') {
      navigate('/faculty/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleVerifyFacultyId = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFacultyAuthModalOpen(false);
    setMode('faculty');
    navigate('/faculty/dashboard');
  };

  const handleVerifyStudentId = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStudentAuthModalOpen(false);
    setMode('student', modalStudentId);
    navigate('/dashboard');
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setInspectedStudentId(id);
    if (mode === 'faculty') {
      navigate(`/faculty/student/${id}/360`);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
      }`}
    >
      {/* Left: Active Status Badge (Student Mode) OR Selector (Faculty Mode) */}
      <div className="flex items-center gap-3">
        {mode === 'student' ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-800 truncate max-w-[150px] sm:max-w-[200px]">
              {activeStudent?.name || 'Monisha Sree'}
            </span>
            <span className="text-[10px] text-brand-orange font-mono font-bold bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded shrink-0">
              {activeStudent?.readinessScore || 78}% READY
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 font-medium hidden sm:inline">
              Inspect Student:
            </span>
            <div className="relative flex items-center">
              <select
                value={inspectedStudentId}
                onChange={handleStudentChange}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-1.5 text-xs font-semibold text-slate-800 hover:border-brand-orange/50 focus:outline-none focus:border-brand-orange cursor-pointer transition-colors shadow-sm max-w-[200px] sm:max-w-[280px] truncate"
              >
                {studentsList.map(st => (
                  <option key={st.id} value={st.id} className="bg-white text-slate-900 py-1">
                    {st.name} ({st.readinessScore}%)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Right: Mode Switcher & User Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Experience Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => handleModeChange('student')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
              mode === 'student'
                ? 'bg-white text-brand-orange shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Student</span>
          </button>
          <button
            onClick={() => handleModeChange('faculty')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
              mode === 'faculty'
                ? 'bg-white text-brand-orange shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Faculty</span>
          </button>
        </div>

        {/* User Account Menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileOpen(prev => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <img
              src={mode === 'student' ? activeStudent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'}
              alt="Avatar"
              className="w-6 h-6 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <span className="hidden md:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
              {currentUser?.name.split(' ')[0] || 'User'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 space-y-1">
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 block truncate">
                  {currentUser?.name}
                </span>
                <span className="text-[11px] text-slate-500 block truncate font-mono">
                  {currentUser?.email}
                </span>
                <span className="inline-block mt-1 text-[10px] font-semibold text-brand-orange uppercase font-mono">
                  {currentUser?.role === 'faculty' ? 'Faculty Portal' : 'Student Digital Twin'}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate(mode === 'student' ? '/profile' : '/faculty/dashboard');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>View Profile</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 1. FACULTY ID AUTHENTICATION MODAL (Student -> Faculty) */}
      <Modal
        isOpen={isFacultyAuthModalOpen}
        onClose={() => setIsFacultyAuthModalOpen(false)}
        title="Faculty ID Authentication"
        maxWidth="md"
      >
        <form onSubmit={handleVerifyFacultyId} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-brand-orange shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block font-sans">
                Faculty Advisor Verification
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Enter your Faculty ID to inspect cohort digital twins.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono flex items-center justify-between">
              <span>Faculty ID</span>
              <span className="text-brand-orange font-bold">REQUIRED</span>
            </label>
            <div className="relative">
              <BadgeCheck className="w-4 h-4 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={modalFacultyId}
                onChange={e => setModalFacultyId(e.target.value)}
                placeholder="e.g. FAC-CS-40182"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono block">
              Passcode
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={modalFacultyPin}
                onChange={e => setModalFacultyPin(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsFacultyAuthModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs transition-all shadow-sm"
            >
              <span>Access Faculty Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. STUDENT ID AUTHENTICATION MODAL (Faculty -> Student) */}
      <Modal
        isOpen={isStudentAuthModalOpen}
        onClose={() => setIsStudentAuthModalOpen(false)}
        title="Student ID Sign In"
        maxWidth="md"
      >
        <form onSubmit={handleVerifyStudentId} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-brand-orange shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block font-sans">
                Student Twin Sign In
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Select your Student Account to open your verified personal workspace.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono flex items-center justify-between">
              <span>Select Student Account</span>
              <span className="text-brand-orange font-bold">REQUIRED</span>
            </label>
            <div className="relative">
              <select
                value={modalStudentId}
                onChange={e => setModalStudentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
              >
                {studentsList.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.id}) — {st.readinessScore}% Ready
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono block">
              Student Passcode
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={modalStudentPin}
                onChange={e => setModalStudentPin(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsStudentAuthModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs transition-all shadow-sm"
            >
              <span>Open Student Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Modal>
    </header>
  );
};
