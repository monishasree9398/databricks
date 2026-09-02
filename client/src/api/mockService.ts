import studentsData from '../data/students.json';
import internshipsData from '../data/internships.json';
import roadmapsData from '../data/roadmaps.json';
import skillGapsData from '../data/skillGaps.json';
import facultyData from '../data/faculty.json';
import aiInsightsData from '../data/aiInsights.json';
import chatPresetsData from '../data/chatPresets.json';

const students = studentsData as any[];
const internships = internshipsData as any[];
const roadmaps = roadmapsData as Record<string, any>;
const skillGaps = skillGapsData as Record<string, any>;
const faculty = facultyData as any;
const aiInsights = aiInsightsData as any;
const chatPresets = chatPresetsData as any;

export function handleClientMockRequest(endpoint: string, options?: RequestInit): any {
  const url = endpoint.replace(/^\/api/, '');

  // GET /students
  if (url === '/students') {
    return students;
  }

  // GET /student/:id/dashboard
  const dashMatch = url.match(/^\/student\/([^/]+)\/dashboard/);
  if (dashMatch) {
    const studentId = dashMatch[1];
    const student = students.find(s => s.id === studentId) || students[0];

    const strongCount = student.skills.filter((s: any) => s.status === 'strong' || s.level >= 80).length;
    const improveCount = student.skills.filter((s: any) => s.status === 'improve' || (s.level >= 65 && s.level < 80)).length;
    const missingCount = student.skills.filter((s: any) => s.status === 'missing' || s.status === 'learning' || s.level < 65).length;

    const nextMove = {
      title: "Close Distributed Systems & CUDA Gap",
      summary: `Your digital twin indicates that advancing ${student.skills[1]?.name || 'Distributed Systems'} will boost your readiness score past 90%.`,
      actions: [
        {
          id: "act-1",
          title: "Complete Roadmap Week 2: Tensor Parallelism",
          description: "Hands-on PyTorch DDP sharding module with NCCL Ring Reduction.",
          impactLabel: "+6% Readiness Gain",
          effortLabel: "4.5 hours",
          actionText: "Open Roadmap",
          actionType: "navigate_roadmap"
        },
        {
          id: "act-2",
          title: "Verify HNSW Vector Search Lab",
          description: "Benchmark your vector quantization implementation against standard recall curves.",
          impactLabel: "+4% Readiness Gain",
          effortLabel: "3 hours",
          actionText: "View Skill Gap",
          actionType: "navigate_skillgap"
        }
      ]
    };

    const studentSkillMap = new Map<string, number>();
    student.skills.forEach((s: any) => studentSkillMap.set(s.name.toLowerCase(), s.level));

    const matches = internships.map(internship => {
      let totalWeightedScore = 0;
      let totalWeight = 0;
      const matchedSkills: string[] = [];
      const missingSkills: string[] = [];
      const improvingSkills: string[] = [];

      internship.requiredSkills.forEach((req: any) => {
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
      const blendedScore = Math.min(98, Math.max(45, Math.round(calculatedScore * 0.7 + student.readinessScore * 0.3)));

      let status = 'Needs Work';
      if (blendedScore >= 80) status = 'Ready';
      else if (blendedScore >= 68) status = 'Almost Ready';

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
        keyBlocker: missingSkills[0] ? `Requires verified proficiency in ${missingSkills[0]}` : 'None — meets target threshold',
        recommendationNote: status === 'Ready' ? 'Fast-track candidate: submit application with portfolio.' : 'Complete the recommended 2-week targeted sprint.'
      };
    }).sort((a, b) => b.readinessScore - a.readinessScore);

    return {
      student,
      readinessScore: student.readinessScore,
      readinessTier: student.readinessTier,
      readinessReassurance: student.readinessReassurance,
      quickStats: {
        matchedInternships: matches.filter(m => m.status === 'Ready').length,
        almostReadyInternships: matches.filter(m => m.status === 'Almost Ready').length,
        criticalGaps: student.skills.filter((s: any) => s.level < 75).length,
        weeklyProgressDelta: student.weeklyProgressDelta
      },
      skillsSummary: {
        strongCount,
        improveCount,
        missingCount,
        topSkills: student.skills
      },
      nextMove,
      topInternshipMatches: matches.slice(0, 4)
    };
  }

  // GET /student/:id/profile
  const profMatch = url.match(/^\/student\/([^/]+)\/profile/);
  if (profMatch) {
    const studentId = profMatch[1];
    return students.find(s => s.id === studentId) || students[0];
  }

  // GET /student/:id/internship-matches
  const matchRoute = url.match(/^\/student\/([^/]+)\/internship-matches/);
  if (matchRoute) {
    const studentId = matchRoute[1];
    const student = students.find(s => s.id === studentId) || students[0];
    const studentSkillMap = new Map<string, number>();
    student.skills.forEach((s: any) => studentSkillMap.set(s.name.toLowerCase(), s.level));

    return internships.map(internship => {
      let totalWeightedScore = 0;
      let totalWeight = 0;
      const matchedSkills: string[] = [];
      const missingSkills: string[] = [];
      const improvingSkills: string[] = [];

      internship.requiredSkills.forEach((req: any) => {
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
      const blendedScore = Math.min(98, Math.max(45, Math.round(calculatedScore * 0.7 + student.readinessScore * 0.3)));

      let status = 'Needs Work';
      if (blendedScore >= 80) status = 'Ready';
      else if (blendedScore >= 68) status = 'Almost Ready';

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
        keyBlocker: missingSkills[0] ? `Requires verified proficiency in ${missingSkills[0]}` : 'None — meets target threshold',
        recommendationNote: status === 'Ready' ? 'Fast-track candidate: submit application with portfolio.' : 'Complete the recommended 2-week sprint.'
      };
    }).sort((a, b) => b.readinessScore - a.readinessScore);
  }

  // GET /student/:id/skill-gap
  const gapMatch = url.match(/^\/student\/([^/]+)\/skill-gap/);
  if (gapMatch) {
    const studentId = gapMatch[1];
    if (skillGaps[studentId]) {
      return skillGaps[studentId];
    }
    const student = students.find(s => s.id === studentId) || students[0];
    const gaps = student.skills.map((s: any) => {
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
        importance: s.level < 70 ? 'Critical' : 'Medium',
        estimatedHoursToClose: s.level < 75 ? Math.round((targetLevel - s.level) * 0.6) : 0,
        recommendedAction: `Focus on hands-on project artifacts for ${s.name}.`,
        suggestedResource: {
          title: `${s.name} Applied Mastery Guide`,
          type: 'Interactive Lab',
          duration: '3 hrs'
        }
      };
    });

    return {
      studentId: student.id,
      targetRole: student.targetRole,
      currentReadinessScore: student.readinessScore,
      targetThresholdScore: 85,
      biggestBlocker: {
        skill: gaps.find((g: any) => g.importance === 'Critical')?.skillName || 'Distributed Systems',
        reason: 'Required for high-throughput backend infrastructure roles.',
        gapDelta: 16,
        impactOnReadiness: '+11% Potential Readiness Gain'
      },
      recommendedNextStep: {
        title: `Execute Sprint on ${gaps.find((g: any) => g.gapDelta > 10)?.skillName || 'Target Skills'}`,
        action: "Complete the guided weekly roadmap modules to build verified evidence.",
        estimatedTimeToImpact: "1 to 2 weeks",
        roadmapWeekTarget: 2
      },
      gaps
    };
  }

  // GET /student/:id/roadmap
  const roadMatch = url.match(/^\/student\/([^/]+)\/roadmap/);
  if (roadMatch) {
    const studentId = roadMatch[1];
    if (roadmaps[studentId]) {
      return roadmaps[studentId];
    }
    const student = students.find(s => s.id === studentId) || students[0];
    const template = roadmaps["stu-001"];
    return {
      ...template,
      studentId: student.id,
      targetRole: `${student.targetRole} Fast-Track`,
      overallProgress: Math.round(student.readinessScore * 0.6)
    };
  }

  // POST /student/:id/ask
  const askMatch = url.match(/^\/student\/([^/]+)\/ask/);
  if (askMatch) {
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: chatPresets.responses.openai.text,
      timestamp: new Date().toISOString(),
      highlightedSkills: chatPresets.responses.openai.highlightedSkills,
      percentages: chatPresets.responses.openai.percentages,
      recommendationCards: chatPresets.responses.openai.recommendationCards,
      directActions: [
        { label: "View Weekly Roadmap", route: "/roadmap" },
        { label: "Inspect Skill Gaps", route: "/skill-gap" }
      ]
    };
  }

  // Faculty Routes
  if (url.includes('/faculty/') && url.endsWith('/dashboard')) {
    return faculty;
  }

  if (url.includes('/faculty/') && url.endsWith('/students')) {
    return students;
  }

  const f360Match = url.match(/^\/faculty\/student\/([^/]+)\/360/);
  if (f360Match) {
    const studentId = f360Match[1];
    const student = students.find(s => s.id === studentId) || students[0];
    const gapsAnalysis = skillGaps[studentId] || skillGaps["stu-001"];
    const roadmap = roadmaps[studentId] || roadmaps["stu-001"];

    return {
      student,
      skillGapAnalysis: gapsAnalysis,
      roadmap,
      matches: internships.slice(0, 4),
      facultyAdvisorNotes: [
        {
          author: "Prof. David Patterson (Academic Advisor)",
          date: "2026-08-28",
          note: `Student demonstrates top 5% execution speed in systems programming. Recommend encouraging submission to the IEEE student poster track.`,
          flag: "positive"
        },
        {
          author: "Dr. Elena Rostova (Capstone Faculty)",
          date: "2026-08-15",
          note: "Consistently leads capstone discussions. Ready for corporate partner mentorship pairing.",
          flag: "positive"
        }
      ],
      aiDiagnostic: {
        trajectoryStatus: student.readinessScore >= 80 ? 'Exceptional' : student.readinessScore >= 70 ? 'Accelerating' : 'Steady',
        summary: `Student has established strong proficiency in ${student.skills[0]?.name || 'Core Systems'}. Projected to attain 90%+ readiness prior to recruitment.`,
        keyStrengths: student.skills.filter((s: any) => s.level >= 80).map((s: any) => s.name),
        immediateInterventions: [
          `Assign to Multi-GPU Sandbox session on ${student.skills[1]?.name || 'Distributed Systems'}.`,
          "Connect with Industry Mentor in AI Infrastructure."
        ],
        recommendedMentorAssignment: "Principal Infrastructure Engineer @ Partner Lab"
      }
    };
  }

  if (url.includes('/faculty/') && url.endsWith('/skill-gaps')) {
    return faculty.rankedClassSkillGaps;
  }

  if (url.includes('/faculty/') && url.endsWith('/ai-insights')) {
    return {
      classId: 'cs-401',
      insights: aiInsights.cohortInsights,
      actionPlanPreset: aiInsights.actionPlanPreset
    };
  }

  return students;
}
