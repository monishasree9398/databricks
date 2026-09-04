import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/common/Sidebar.js';
import { Header } from './components/common/Header.js';
import { useApp } from './context/AppContext.js';

// Landing & Auth Pages
import { LandingPage } from './pages/landing/LandingPage.js';
import { LoginPage } from './pages/auth/LoginPage.js';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard.js';
import { StudentProfile } from './pages/student/StudentProfile.js';
import { InternshipMatches } from './pages/student/InternshipMatches.js';
import { SkillGapView } from './pages/student/SkillGapView.js';
import { RoadmapView } from './pages/student/RoadmapView.js';
import { AskUnlock } from './pages/student/AskUnlock.js';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard.js';
import { StudentsDirectory } from './pages/faculty/StudentsDirectory.js';
import { Student360View } from './pages/faculty/Student360View.js';
import { ReadinessAnalytics } from './pages/faculty/ReadinessAnalytics.js';
import { FacultySkillGaps } from './pages/faculty/FacultySkillGaps.js';
import { FacultyAIInsights } from './pages/faculty/FacultyAIInsights.js';

// 404 Fallback
import { Card } from './components/common/Card.js';
import { ArrowLeft, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-12 max-w-lg mx-auto text-center space-y-6">
      <Card className="p-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-brand-orange flex items-center justify-center mx-auto">
          <Compass className="w-7 h-7 stroke-[2]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-sans">404 — Route Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested path does not exist in the UNLOCK digital twin navigation matrix.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orangeHover transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Dashboard
        </button>
      </Card>
    </div>
  );
};

export const App: React.FC = () => {
  const { isAuthenticated, login, isSidebarCollapsed } = useApp();
  const [showSignInScreen, setShowSignInScreen] = useState<boolean>(false);
  const [initialAuthRole, setInitialAuthRole] = useState<'student' | 'faculty'>('student');
  const location = useLocation();

  if (!isAuthenticated) {
    if (showSignInScreen) {
      return (
        <LoginPage
          initialRole={initialAuthRole}
          onBackToLanding={() => setShowSignInScreen(false)}
        />
      );
    }
    return (
      <LandingPage
        onGetStarted={() => {
          setInitialAuthRole('student');
          setShowSignInScreen(true);
        }}
        onQuickStudentLogin={() => login('student', 'stu-001')}
        onQuickFacultyLogin={() => {
          setInitialAuthRole('faculty');
          setShowSignInScreen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-slate-900 flex">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Sticky Top Header */}
        <Header />

        {/* Page Content with Framer Motion Page Transition */}
        <main className="flex-1 pb-16 bg-[#EEF2F6]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Routes location={location} key={location.pathname}>
                {/* Default root redirects to student dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Student Mode Routes */}
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/internships" element={<InternshipMatches />} />
                <Route path="/skill-gap" element={<SkillGapView />} />
                <Route path="/roadmap" element={<RoadmapView />} />
                <Route path="/ask" element={<AskUnlock />} />

                {/* Faculty Mode Routes */}
                <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
                <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty/students" element={<StudentsDirectory />} />
                <Route path="/faculty/student/:id/360" element={<Student360View />} />
                <Route path="/faculty/student/:id" element={<Student360View />} />
                <Route path="/faculty/analytics" element={<ReadinessAnalytics />} />
                <Route path="/faculty/skill-gaps" element={<FacultySkillGaps />} />
                <Route path="/faculty/ai-insights" element={<FacultyAIInsights />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
