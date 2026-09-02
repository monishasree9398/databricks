export type ReadinessTier = 'Ready' | 'Almost Ready' | 'Needs Work' | 'Foundational';

export type SkillProficiency = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | 'Learning';

export type SkillCategory = 'Core Tech' | 'AI & ML' | 'Cloud & Systems' | 'Architecture' | 'Tools & Infra' | 'Communication & Product';

export type SkillStatus = 'have' | 'improve' | 'learn' | 'build' | 'later';

export interface StudentSkill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 - 100
  proficiency: SkillProficiency;
  status: 'strong' | 'improve' | 'missing' | 'learning';
  verifiedProjectsCount: number;
  lastAssessed: string;
  evidence: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  tagline: string;
  role: string;
  skills: string[];
  impactScore: number; // 0 - 100
  metrics: string;
  githubUrl?: string;
  liveUrl?: string;
  date: string;
}

export interface CertificationRecord {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  skillsVerified: string[];
  badgeColor: string;
}

export interface AcademicRecord {
  university: string;
  degree: string;
  major: string;
  graduationYear: number;
  cgpa: number;
  scale: number;
  creditsCompleted: number;
  totalCredits: number;
  attendanceRate: number; // 0 - 100
  departmentRank: number;
  totalStudentsInCohort: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  targetRole: string;
  secondaryTarget?: string;
  cohort: string;
  classId: string;
  readinessScore: number; // 0 - 100
  readinessTier: ReadinessTier;
  readinessReassurance: string;
  weeklyProgressDelta: number; // e.g. +4%
  matchedCount: number;
  almostReadyCount: number;
  skillGapsCount: number;
  academic: AcademicRecord;
  skills: StudentSkill[];
  projects: ProjectRecord[];
  certifications: CertificationRecord[];
  hackathons: { name: string; position: string; date: string; project: string }[];
  timeline: { date: string; title: string; type: 'milestone' | 'project' | 'assessment' | 'cert'; scoreDelta?: string }[];
  bio: string;
  lastSyncedAt: string;
}

export interface InternshipListing {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  type: 'Full-time Intern' | 'Co-op' | 'Summer 2026' | 'Fall 2026';
  stipend: string;
  description: string;
  requiredSkills: { name: string; minLevel: number; weight: number }[];
  niceToHaveSkills: string[];
  tags: string[];
}

export interface InternshipMatch {
  internshipId: string;
  company: string;
  role: string;
  location: string;
  type: string;
  stipend: string;
  readinessScore: number;
  status: ReadinessTier;
  matchedSkills: string[];
  missingSkills: string[];
  improvingSkills: string[];
  whyItMatches: string;
  keyBlocker: string;
  recommendationNote: string;
}

export interface SkillGapItem {
  skillName: string;
  category: SkillCategory;
  currentLevel: number;
  targetLevel: number;
  status: SkillStatus;
  gapDelta: number;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedHoursToClose: number;
  recommendedAction: string;
  suggestedResource: {
    title: string;
    type: 'Interactive Lab' | 'Code Challenge' | 'Project Blueprint' | 'Documentation';
    duration: string;
  };
}

export interface SkillGapAnalysis {
  studentId: string;
  studentName: string;
  targetRole: string;
  targetCompanyProfile: string;
  targetRoleReadiness: number;
  skillsHaveCount: number;
  skillsImproveCount: number;
  skillsLearnCount: number;
  biggestBlocker: {
    skill: string;
    reason: string;
    impactOnReadiness: string;
  };
  recommendedNextStep: {
    title: string;
    action: string;
    estimatedTimeToImpact: string;
    roadmapWeekTarget: number;
  };
  gaps: SkillGapItem[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  skillsAddressed: string[];
  deliverable: string;
  completed: boolean;
  status: 'completed' | 'in_progress' | 'pending';
  type: 'project_build' | 'deep_dive' | 'assessment' | 'deployment';
}

export interface RoadmapWeek {
  weekNumber: number;
  theme: string;
  tagline: string;
  state: 'completed' | 'current' | 'upcoming';
  progressPercentage: number;
  estimatedHoursTotal: number;
  keyMilestone: string;
  tasks: RoadmapTask[];
  resources: {
    title: string;
    provider: string;
    url: string;
    type: string;
  }[];
}

export interface StudentRoadmap {
  studentId: string;
  targetRole: string;
  totalWeeks: number;
  currentWeek: number;
  overallProgress: number;
  generatedDate: string;
  weeks: RoadmapWeek[];
}

export interface AIRecommendationCard {
  id: string;
  title: string;
  description: string;
  impactLabel: string;
  effortLabel: string;
  actionText: string;
  actionType: 'navigate_roadmap' | 'navigate_skillgap' | 'take_assessment' | 'build_repo';
  targetParams?: Record<string, any>;
}

export interface StudentDashboardResponse {
  student: Student;
  readinessScore: number;
  readinessTier: ReadinessTier;
  readinessReassurance: string;
  quickStats: {
    matchedInternships: number;
    almostReadyInternships: number;
    criticalGaps: number;
    weeklyProgressDelta: number;
  };
  skillsSummary: {
    strongCount: number;
    improveCount: number;
    missingCount: number;
    topSkills: StudentSkill[];
  };
  nextMove: {
    title: string;
    summary: string;
    actions: AIRecommendationCard[];
  };
  topInternshipMatches: InternshipMatch[];
}

export interface FacultyDashboardData {
  classId: string;
  className: string;
  department: string;
  semester: string;
  academicYear: string;
  totalHeadcount: number;
  averageReadinessScore: number;
  averageWeeklyGrowth: number;
  readinessDistribution: {
    ready: number;
    readyPercentage: number;
    almostReady: number;
    almostReadyPercentage: number;
    needsSupport: number;
    needsSupportPercentage: number;
  };
  topHiringRoles: { role: string; studentMatchRate: number; demandIndex: string }[];
  rankedClassSkillGaps: {
    skillName: string;
    category: string;
    classProficiencyAvg: number;
    studentsDeficientCount: number;
    cohortDeficiencyPercentage: number;
    industryDemandScore: number;
    priority: 'Urgent' | 'High' | 'Moderate';
    suggestedIntervention: string;
  }[];
  aiClassInsight: {
    headline: string;
    analysis: string;
    criticalBottleneck: string;
    actionableProposal: string;
    projectedCohortImpact: string;
  };
  departmentComparison: {
    department: string;
    avgReadiness: number;
    topSpecialty: string;
  }[];
}

export interface FacultyStudent360Response {
  student: Student;
  skillGapAnalysis: SkillGapAnalysis;
  roadmap: StudentRoadmap;
  matches: InternshipMatch[];
  facultyAdvisorNotes: {
    author: string;
    date: string;
    note: string;
    flag: 'positive' | 'warning' | 'neutral';
  }[];
  aiDiagnostic: {
    trajectoryStatus: 'Accelerating' | 'Steady' | 'At Risk' | 'Exceptional';
    summary: string;
    keyStrengths: string[];
    immediateInterventions: string[];
    recommendedMentorAssignment: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  highlightedSkills?: string[];
  readinessDelta?: number;
  percentages?: { label: string; value: number }[];
  recommendationCards?: AIRecommendationCard[];
  directActions?: { label: string; route: string }[];
}

export interface ChatRequest {
  query: string;
  studentId: string;
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
}
