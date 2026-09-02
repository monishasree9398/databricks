import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  IDataSource
} from './dataSource.js';
import {
  Student,
  StudentDashboardResponse,
  InternshipListing,
  InternshipMatch,
  SkillGapAnalysis,
  StudentRoadmap,
  FacultyDashboardData,
  FacultyStudent360Response,
  ChatMessage,
  ChatRequest,
  ReadinessTier
} from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDataDir(): string {
  const candidates = [
    path.resolve(__dirname, '../data'),
    path.resolve(__dirname, '../../src/data'),
    path.resolve(__dirname, '../src/data'),
    path.resolve(process.cwd(), 'src/data'),
    path.resolve(process.cwd(), 'server/src/data'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return path.resolve(__dirname, '../data');
}

const DATA_DIR = getDataDir();

function loadJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export class MockDataSource implements IDataSource {
  private students: Student[];
  private internships: InternshipListing[];
  private roadmaps: Record<string, StudentRoadmap>;
  private facultyDashboard: FacultyDashboardData;
  private skillGaps: Record<string, SkillGapAnalysis>;
  private aiInsights: any;
  private chatPresets: any;

  constructor() {
    this.students = loadJson<Student[]>('students.json');
    this.internships = loadJson<InternshipListing[]>('internships.json');
    this.roadmaps = loadJson<Record<string, StudentRoadmap>>('roadmaps.json');
    this.facultyDashboard = loadJson<FacultyDashboardData>('faculty.json');
    this.skillGaps = loadJson<Record<string, SkillGapAnalysis>>('skillGaps.json');
    this.aiInsights = loadJson<any>('aiInsights.json');
    this.chatPresets = loadJson<any>('chatPresets.json');
  }

  async getAllStudents(): Promise<Student[]> {
    return this.students;
  }

  async getStudentById(id: string): Promise<Student | null> {
    const student = this.students.find(s => s.id === id);
    return student || this.students[0] || null;
  }

  async getStudentProfile(studentId: string): Promise<Student | null> {
    return this.getStudentById(studentId);
  }

  async getStudentDashboard(studentId: string): Promise<StudentDashboardResponse | null> {
    const student = await this.getStudentById(studentId);
    if (!student) return null;

    const matches = await this.getStudentInternshipMatches(studentId);
    const topInternships = matches.slice(0, 4);

    const strongCount = student.skills.filter(s => s.status === 'strong' || s.level >= 80).length;
    const improveCount = student.skills.filter(s => s.status === 'improve' || (s.level >= 65 && s.level < 80)).length;
    const missingCount = student.skills.filter(s => s.status === 'missing' || s.status === 'learning' || s.level < 65).length;

    const nextMove = {
      title: "Close Distributed Systems & CUDA Gap",
      summary: `Your digital twin indicates that advancing ${student.skills[1]?.name || 'Distributed Systems'} will boost your readiness score past 90% and unlock Tier-1 internship recommendations.`,
      actions: [
        {
          id: "act-1",
          title: "Complete Roadmap Week 2: Tensor Parallelism",
          description: "Hands-on PyTorch DDP sharding module with NCCL Ring Reduction.",
          impactLabel: "+6% Readiness Gain",
          effortLabel: "4.5 hours",
          actionText: "Open Roadmap",
          actionType: "navigate_roadmap" as const
        },
        {
          id: "act-2",
          title: "Verify HNSW Vector Search Lab",
          description: "Benchmark your vector quantization implementation against standard recall curves.",
          impactLabel: "+4% Readiness Gain",
          effortLabel: "3 hours",
          actionText: "View Skill Gap",
          actionType: "navigate_skillgap" as const
        }
      ]
    };

    return {
      student,
      readinessScore: student.readinessScore,
      readinessTier: student.readinessTier,
      readinessReassurance: student.readinessReassurance,
      quickStats: {
        matchedInternships: student.matchedCount,
        almostReadyInternships: student.almostReadyCount,
        criticalGaps: student.skillGapsCount,
        weeklyProgressDelta: student.weeklyProgressDelta
      },
      skillsSummary: {
        strongCount,
        improveCount,
        missingCount,
        topSkills: student.skills
      },
      nextMove,
      topInternshipMatches: topInternships
    };
  }

  async getStudentInternshipMatches(studentId: string): Promise<InternshipMatch[]> {
    const student = await this.getStudentById(studentId);
    if (!student) return [];

    const studentSkillMap = new Map<string, number>();
    student.skills.forEach(s => studentSkillMap.set(s.name.toLowerCase(), s.level));

    return this.internships.map(internship => {
      let totalWeightedScore = 0;
      let totalWeight = 0;
      const matchedSkills: string[] = [];
      const missingSkills: string[] = [];
      const improvingSkills: string[] = [];

      internship.requiredSkills.forEach(req => {
        totalWeight += req.weight;
        const matchingKey = Array.from(studentSkillMap.keys()).find(k => k.includes(req.name.toLowerCase().split(' ')[0]) || req.name.toLowerCase().includes(k.split(' ')[0]));
        const studentLevel = matchingKey ? studentSkillMap.get(matchingKey) || 0 : 50;

        totalWeightedScore += (studentLevel / 100) * req.weight;

        if (studentLevel >= req.minLevel) {
          matchedSkills.push(req.name);
        } else if (studentLevel >= req.minLevel - 15) {
          improvingSkills.push(req.name);
        } else {
          missingSkills.push(req.name);
        }
      });

      const calculatedScore = Math.round((totalWeightedScore / (totalWeight || 1)) * 100);
      // Blend slightly with student base readiness for internal consistency
      const blendedScore = Math.min(98, Math.max(45, Math.round(calculatedScore * 0.7 + student.readinessScore * 0.3)));

      let status: ReadinessTier = 'Needs Work';
      if (blendedScore >= 80) status = 'Ready';
      else if (blendedScore >= 68) status = 'Almost Ready';

      const keyBlocker = missingSkills.length > 0 
        ? `Requires verified proficiency in ${missingSkills[0]}` 
        : improvingSkills.length > 0 
        ? `Elevate ${improvingSkills[0]} to senior benchmark` 
        : 'None — profile meets or exceeds target threshold';

      return {
        internshipId: internship.id,
        company: internship.company,
        role: internship.role,
        location: internship.location,
        type: internship.type,
        stipend: internship.stipend,
        readinessScore: blendedScore,
        status,
        matchedSkills,
        missingSkills,
        improvingSkills,
        whyItMatches: `Your verified strengths in ${matchedSkills.slice(0, 2).join(' and ') || 'core software systems'} directly satisfy their production pipeline needs.`,
        keyBlocker,
        recommendationNote: status === 'Ready' 
          ? 'Fast-track candidate: submit application with your verified project portfolio.' 
          : 'Complete the recommended 2-week targeted roadmap sprint before applying.'
      };
    }).sort((a, b) => b.readinessScore - a.readinessScore);
  }

  async getStudentSkillGap(studentId: string, targetRoleId?: string): Promise<SkillGapAnalysis | null> {
    const student = await this.getStudentById(studentId);
    if (!student) return null;

    if (this.skillGaps[studentId]) {
      return this.skillGaps[studentId];
    }

    // Dynamic generation if specific student isn't hardcoded
    const gaps = student.skills.map(s => {
      const targetLevel = 80;
      let status: any = 'have';
      if (s.level < 60) status = 'learn';
      else if (s.level < 75) status = 'improve';

      return {
        skillName: s.name,
        category: s.category,
        currentLevel: s.level,
        targetLevel,
        status,
        gapDelta: Math.max(0, targetLevel - s.level),
        importance: s.level < 70 ? 'Critical' as const : 'Medium' as const,
        estimatedHoursToClose: s.level < 75 ? Math.round((targetLevel - s.level) * 0.6) : 0,
        recommendedAction: `Focus on hands-on project artifacts for ${s.name}.`,
        suggestedResource: {
          title: `${s.name} Applied Mastery Guide`,
          type: 'Interactive Lab' as const,
          duration: '3 hrs'
        }
      };
    });

    const haveCount = gaps.filter(g => g.status === 'have').length;
    const improveCount = gaps.filter(g => g.status === 'improve').length;
    const learnCount = gaps.filter(g => g.status === 'learn').length;

    return {
      studentId: student.id,
      studentName: student.name,
      targetRole: targetRoleId || student.targetRole,
      targetCompanyProfile: "Tier 1 High-Growth Tech & AI Labs",
      targetRoleReadiness: student.readinessScore,
      skillsHaveCount: haveCount,
      skillsImproveCount: improveCount,
      skillsLearnCount: learnCount,
      biggestBlocker: {
        skill: gaps.find(g => g.gapDelta > 10)?.skillName || "System Design Depth",
        reason: "Recruiter benchmarks require demonstrated hands-on architecture artifacts.",
        impactOnReadiness: `Closing this will elevate your score by ~${Math.min(12, 100 - student.readinessScore)}%.`
      },
      recommendedNextStep: {
        title: `Execute Sprint on ${gaps.find(g => g.gapDelta > 10)?.skillName || 'Target Skills'}`,
        action: "Complete the guided weekly roadmap modules to build verified evidence.",
        estimatedTimeToImpact: "1 to 2 weeks",
        roadmapWeekTarget: 2
      },
      gaps
    };
  }

  async getStudentRoadmap(studentId: string): Promise<StudentRoadmap | null> {
    if (this.roadmaps[studentId]) {
      return this.roadmaps[studentId];
    }
    // Return template roadmap adapted for student
    const student = await this.getStudentById(studentId);
    const template = this.roadmaps["stu-001"];
    if (!template || !student) return null;

    return {
      ...template,
      studentId: student.id,
      targetRole: `${student.targetRole} Fast-Track`,
      overallProgress: Math.round(student.readinessScore * 0.6)
    };
  }

  async askUnlockAI(studentId: string, request: ChatRequest): Promise<ChatMessage> {
    const student = await this.getStudentById(studentId);
    const query = request.query.toLowerCase();

    let responseData = this.chatPresets.responses.generic;

    if (query.includes('openai') || query.includes('ai system') || query.includes('gpu') || query.includes('cuda') || query.includes('blocker')) {
      responseData = this.chatPresets.responses.openai;
    } else if (query.includes('stripe') || query.includes('backend') || query.includes('database') || query.includes('postgres')) {
      responseData = this.chatPresets.responses.stripe;
    }

    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: responseData.text,
      timestamp: new Date().toISOString(),
      highlightedSkills: responseData.highlightedSkills,
      percentages: responseData.percentages,
      recommendationCards: responseData.recommendationCards,
      directActions: [
        { label: "View Weekly Roadmap", route: "/roadmap" },
        { label: "Inspect Skill Gaps", route: "/skill-gap" }
      ]
    };
  }

  async getFacultyDashboard(classId: string): Promise<FacultyDashboardData | null> {
    return this.facultyDashboard;
  }

  async getFacultyStudents(classId: string): Promise<Student[]> {
    return this.students;
  }

  async getFacultyStudent360(studentId: string): Promise<FacultyStudent360Response | null> {
    const student = await this.getStudentById(studentId);
    if (!student) return null;

    const skillGapAnalysis = (await this.getStudentSkillGap(studentId))!;
    const roadmap = (await this.getStudentRoadmap(studentId))!;
    const matches = await this.getStudentInternshipMatches(studentId);

    const facultyAdvisorNotes = [
      {
        author: "Prof. David Patterson (Academic Advisor)",
        date: "2026-08-28",
        note: `Student demonstrates top 5% execution speed in systems programming. Recommend encouraging submission to the upcoming IEEE distributed systems student poster track.`,
        flag: "positive" as const
      },
      {
        author: "Dr. Elena Rostova (Capstone Faculty)",
        date: "2026-08-15",
        note: "Consistently leads capstone group discussions. Ready for corporate partner mentorship pairing.",
        flag: "positive" as const
      }
    ];

    const aiDiagnostic = {
      trajectoryStatus: (student.readinessScore >= 80 ? 'Exceptional' : student.readinessScore >= 70 ? 'Accelerating' : 'Steady') as any,
      summary: `Student has established strong proficiency in ${student.skills[0]?.name || 'Core Architecture'}. With targeted closure on ${student.skills[1]?.name || 'Secondary Systems'}, this student is projected to attain 90%+ readiness prior to fall recruitment.`,
      keyStrengths: student.skills.filter(s => s.level >= 80).map(s => s.name),
      immediateInterventions: [
        `Assign to Multi-GPU Lab Sandbox session on ${student.skills[1]?.name || 'Distributed Systems'}.`,
        "Connect with Industry Mentor in AI Infrastructure."
      ],
      recommendedMentorAssignment: "Principal Infrastructure Engineer @ Partner Lab"
    };

    return {
      student,
      skillGapAnalysis,
      roadmap,
      matches,
      facultyAdvisorNotes,
      aiDiagnostic
    };
  }

  async getFacultySkillGaps(classId: string): Promise<FacultyDashboardData['rankedClassSkillGaps']> {
    return this.facultyDashboard.rankedClassSkillGaps;
  }

  async getFacultyAIInsights(classId: string): Promise<any> {
    return {
      classId,
      insights: this.aiInsights.cohortInsights,
      actionPlanPreset: this.aiInsights.actionPlanPreset
    };
  }
}
