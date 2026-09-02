import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Student,
  StudentDashboardResponse,
  InternshipMatch,
  SkillGapAnalysis,
  StudentRoadmap,
  FacultyDashboardData,
  FacultyStudent360Response,
  ChatMessage
} from '../types/index.js';

const API_BASE = '/api';

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Network request failed' }));
    throw new Error(errorData.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Student Hooks
export function useAllStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => fetcher<Student[]>('/students'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useStudentDashboard(studentId: string) {
  return useQuery({
    queryKey: ['student-dashboard', studentId],
    queryFn: () => fetcher<StudentDashboardResponse>(`/student/${studentId}/dashboard`),
    enabled: !!studentId,
  });
}

export function useStudentProfile(studentId: string) {
  return useQuery({
    queryKey: ['student-profile', studentId],
    queryFn: () => fetcher<Student>(`/student/${studentId}/profile`),
    enabled: !!studentId,
  });
}

export function useStudentInternshipMatches(studentId: string) {
  return useQuery({
    queryKey: ['student-internships', studentId],
    queryFn: () => fetcher<InternshipMatch[]>(`/student/${studentId}/internship-matches`),
    enabled: !!studentId,
  });
}

export function useStudentSkillGap(studentId: string, targetRole?: string) {
  return useQuery({
    queryKey: ['student-skillgap', studentId, targetRole],
    queryFn: () => fetcher<SkillGapAnalysis>(`/student/${studentId}/skill-gap${targetRole ? `?targetRole=${encodeURIComponent(targetRole)}` : ''}`),
    enabled: !!studentId,
  });
}

export function useStudentRoadmap(studentId: string) {
  return useQuery({
    queryKey: ['student-roadmap', studentId],
    queryFn: () => fetcher<StudentRoadmap>(`/student/${studentId}/roadmap`),
    enabled: !!studentId,
  });
}

export function useAskUnlockAI(studentId: string) {
  return useMutation({
    mutationFn: (data: { query: string; conversationHistory?: any[] }) =>
      fetcher<ChatMessage>(`/student/${studentId}/ask`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

// Faculty Hooks
export function useFacultyDashboard(classId: string = 'cs-401') {
  return useQuery({
    queryKey: ['faculty-dashboard', classId],
    queryFn: () => fetcher<FacultyDashboardData>(`/faculty/${classId}/dashboard`),
    enabled: !!classId,
  });
}

export function useFacultyStudents(classId: string = 'cs-401') {
  return useQuery({
    queryKey: ['faculty-students', classId],
    queryFn: () => fetcher<Student[]>(`/faculty/${classId}/students`),
    enabled: !!classId,
  });
}

export function useFacultyStudent360(studentId: string) {
  return useQuery({
    queryKey: ['faculty-student-360', studentId],
    queryFn: () => fetcher<FacultyStudent360Response>(`/faculty/student/${studentId}/360`),
    enabled: !!studentId,
  });
}

export function useFacultySkillGaps(classId: string = 'cs-401') {
  return useQuery({
    queryKey: ['faculty-skill-gaps', classId],
    queryFn: () => fetcher<FacultyDashboardData['rankedClassSkillGaps']>(`/faculty/${classId}/skill-gaps`),
    enabled: !!classId,
  });
}

export function useFacultyAIInsights(classId: string = 'cs-401') {
  return useQuery({
    queryKey: ['faculty-ai-insights', classId],
    queryFn: () => fetcher<{ classId: string; insights: any[]; actionPlanPreset: any }>(`/faculty/${classId}/ai-insights`),
    enabled: !!classId,
  });
}
