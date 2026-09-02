import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAllStudents } from '../api/client.js';
import { Student } from '../types/index.js';

export type AppMode = 'student' | 'faculty';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: AppMode;
  initials: string;
  targetRoleOrDept: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  currentUser: UserSession | null;
  login: (role: AppMode, studentId?: string) => void;
  logout: () => void;
  mode: AppMode;
  setMode: (mode: AppMode, studentId?: string) => void;
  authenticatedStudentId: string;
  setAuthenticatedStudentId: (id: string) => void;
  inspectedStudentId: string;
  setInspectedStudentId: (id: string) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeStudent: Student | null;
  studentsList: Student[];
  isLoadingStudents: boolean;
  selectedTargetRole: string;
  setSelectedTargetRole: (role: string) => void;
  completedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  getDynamicReadinessScore: (baseScore: number) => number;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('unlock_auth') === 'true';
  });
  
  const [mode, setModeState] = useState<AppMode>(() => {
    return (localStorage.getItem('unlock_mode') as AppMode) || 'student';
  });

  // Authenticated Student ID (Strictly for Student Mode)
  const [authenticatedStudentId, setAuthenticatedStudentIdState] = useState<string>(() => {
    return localStorage.getItem('unlock_auth_student_id') || 'stu-001';
  });

  // Inspected Student ID (Strictly for Faculty Mode)
  const [inspectedStudentId, setInspectedStudentIdState] = useState<string>(() => {
    return localStorage.getItem('unlock_inspected_student_id') || 'stu-001';
  });

  // Completed Roadmap Tasks tracking
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('unlock_completed_tasks') || '{"t-1-1": true, "t-1-2": true}');
    } catch {
      return { "t-1-1": true, "t-1-2": true };
    }
  });

  const [selectedTargetRole, setSelectedTargetRole] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const { data: students = [], isLoading: isLoadingStudents } = useAllStudents();

  // Active student ID is strictly separated by mode
  const activeStudentId = mode === 'student' ? authenticatedStudentId : inspectedStudentId;
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0] || null;

  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    return {
      id: 'stu-001',
      name: 'Monisha Sree',
      email: 'monisha.sree@stanford.edu',
      role: 'student',
      initials: 'MS',
      targetRoleOrDept: 'AI / ML Systems Engineer',
    };
  });

  useEffect(() => {
    if (activeStudent) {
      if (!selectedTargetRole) {
        setSelectedTargetRole(activeStudent.targetRole);
      }
      if (mode === 'student') {
        const initials = activeStudent.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        setCurrentUser({
          id: activeStudent.id,
          name: activeStudent.name,
          email: activeStudent.email,
          role: 'student',
          initials,
          targetRoleOrDept: activeStudent.targetRole,
        });
      }
    }
  }, [activeStudent, mode, selectedTargetRole]);

  const setAuthenticatedStudentId = (id: string) => {
    setAuthenticatedStudentIdState(id);
    localStorage.setItem('unlock_auth_student_id', id);
  };

  const setInspectedStudentId = (id: string) => {
    setInspectedStudentIdState(id);
    localStorage.setItem('unlock_inspected_student_id', id);
  };

  const setMode = (newMode: AppMode, studentId?: string) => {
    setModeState(newMode);
    localStorage.setItem('unlock_mode', newMode);

    if (newMode === 'faculty') {
      setCurrentUser({
        id: 'fac-001',
        name: 'Prof. David Patterson',
        email: 'patterson@cs.stanford.edu',
        role: 'faculty',
        initials: 'DP',
        targetRoleOrDept: 'Dept. of Computer Science',
      });
    } else {
      const targetId = studentId || authenticatedStudentId || 'stu-001';
      setAuthenticatedStudentId(targetId);
      const st = students.find(s => s.id === targetId) || students[0];
      const initials = st ? st.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'MS';
      setCurrentUser({
        id: targetId,
        name: st?.name || 'Monisha Sree',
        email: st?.email || 'monisha.sree@stanford.edu',
        role: 'student',
        initials,
        targetRoleOrDept: st?.targetRole || 'AI / ML Systems Engineer',
      });
    }
  };

  const setActiveStudentId = (id: string) => {
    if (mode === 'faculty') {
      setInspectedStudentId(id);
    } else {
      setAuthenticatedStudentId(id);
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      localStorage.setItem('unlock_completed_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  const getDynamicReadinessScore = (baseScore: number) => {
    const extraCompletedCount = Object.values(completedTasks).filter(Boolean).length;
    return Math.min(98, baseScore + (extraCompletedCount * 2));
  };

  const login = (newRole: AppMode, studentId: string = 'stu-001') => {
    setIsAuthenticated(true);
    setModeState(newRole);
    localStorage.setItem('unlock_auth', 'true');
    localStorage.setItem('unlock_mode', newRole);

    if (newRole === 'faculty') {
      setInspectedStudentId('stu-001');
      setCurrentUser({
        id: 'fac-001',
        name: 'Prof. David Patterson',
        email: 'patterson@cs.stanford.edu',
        role: 'faculty',
        initials: 'DP',
        targetRoleOrDept: 'Dept. of Computer Science',
      });
    } else {
      setAuthenticatedStudentId(studentId);
      const st = students.find(s => s.id === studentId) || students[0];
      const initials = st
        ? st.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'MS';
      setCurrentUser({
        id: studentId,
        name: st?.name || 'Monisha Sree',
        email: st?.email || 'monisha.sree@stanford.edu',
        role: 'student',
        initials,
        targetRoleOrDept: st?.targetRole || 'AI / ML Systems Engineer',
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.setItem('unlock_auth', 'false');
  };

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        mode,
        setMode,
        authenticatedStudentId,
        setAuthenticatedStudentId,
        inspectedStudentId,
        setInspectedStudentId,
        activeStudentId,
        setActiveStudentId,
        activeStudent,
        studentsList: students,
        isLoadingStudents,
        selectedTargetRole,
        setSelectedTargetRole,
        completedTasks,
        toggleTask,
        getDynamicReadinessScore,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
