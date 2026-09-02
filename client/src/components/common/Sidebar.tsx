import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.js';
import { Logo } from './Logo.js';
import {
  LayoutDashboard,
  User,
  Briefcase,
  GitBranch,
  Map,
  MessageSquareCode,
  Users,
  Eye,
  BarChart3,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { mode, activeStudent, currentUser, logout, isSidebarCollapsed, toggleSidebar } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const studentNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Internship Match', path: '/internships', icon: Briefcase, badge: activeStudent?.matchedCount ? String(activeStudent.matchedCount) : undefined },
    { label: 'Skill Gap', path: '/skill-gap', icon: GitBranch, badge: activeStudent?.skillGapsCount ? `${activeStudent.skillGapsCount} gaps` : undefined },
    { label: 'Roadmap', path: '/roadmap', icon: Map, badge: 'Week 2' },
    { label: 'Ask UNLOCK', path: '/ask', icon: MessageSquareCode, isAI: true },
  ];

  const facultyNavItems = [
    { label: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/faculty/students', icon: Users, badge: '142' },
    { label: 'Student 360', path: `/faculty/student/${activeStudent?.id || 'stu-001'}/360`, icon: Eye },
    { label: 'Readiness Analytics', path: '/faculty/analytics', icon: BarChart3 },
    { label: 'Skill Gaps', path: '/faculty/skill-gaps', icon: Layers, badge: '5 gaps' },
    { label: 'AI Insights', path: '/faculty/ai-insights', icon: Sparkles, isAI: true },
  ];

  const navItems = mode === 'student' ? studentNavItems : facultyNavItems;

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
        {!isSidebarCollapsed ? (
          <Logo size="md" showTagline />
        ) : (
          <div className="mx-auto">
            <Logo size="sm" />
          </div>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        <div className={`px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono ${isSidebarCollapsed ? 'text-center' : ''}`}>
          {isSidebarCollapsed ? 'NAV' : `${mode === 'student' ? 'Student Workspace' : 'Faculty Cohort'}`}
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path.includes('/faculty/student/') && location.pathname.includes('/faculty/student/'));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative group flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-brand-orange/10 text-brand-orange font-bold border border-brand-orange/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-brand-orange' : item.isAI ? 'text-brand-orange' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                />
              </div>

              {!isSidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-brand-orange text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User Profile Block & Sign Out */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {!isSidebarCollapsed ? (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <img
              src={mode === 'student' ? activeStudent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'}
              alt="Avatar"
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {mode === 'student' ? activeStudent?.name : 'Prof. Patterson'}
              </p>
              <p className="text-[11px] text-slate-500 truncate font-mono">
                {mode === 'student' ? `${activeStudent?.readinessScore}% Ready` : 'CS 401 Cohort'}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img
              src={mode === 'student' ? activeStudent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'}
              alt="Avatar"
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="w-full py-1 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xs"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
};
