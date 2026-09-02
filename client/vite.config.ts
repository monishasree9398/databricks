import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import url from 'url';

function unlockApiPlugin(): Plugin {
  return {
    name: 'unlock-api-plugin',
    configureServer(server) {
      const dataDir = path.resolve(__dirname, '../server/src/data');
      
      function loadJson<T>(file: string): T {
        const filePath = path.join(dataDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) {
          return next();
        }

        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname || '';
        const method = req.method || 'GET';

        res.setHeader('Content-Type', 'application/json');

        try {
          const students = loadJson<any[]>('students.json');
          const internships = loadJson<any[]>('internships.json');
          const roadmaps = loadJson<Record<string, any>>('roadmaps.json');
          const faculty = loadJson<any>('faculty.json');
          const skillGaps = loadJson<Record<string, any>>('skillGaps.json');
          const aiInsights = loadJson<any>('aiInsights.json');
          const chatPresets = loadJson<any>('chatPresets.json');

          // GET /api/health
          if (pathname === '/api/health') {
            res.end(JSON.stringify({
              status: 'ok',
              service: 'UNLOCK Embedded API Service',
              version: '1.0.0',
              timestamp: new Date().toISOString(),
              adapter: 'High-Fidelity Mock Fixture (Databricks-ready)'
            }));
            return;
          }

          // GET /api/students
          if (pathname === '/api/students') {
            res.end(JSON.stringify(students));
            return;
          }

          // GET /api/student/:id/dashboard
          const dashMatch = pathname.match(/^\/api\/student\/([^/]+)\/dashboard$/);
          if (dashMatch) {
            const studentId = dashMatch[1];
            const student = students.find(s => s.id === studentId) || students[0];
            
            const strongCount = student.skills.filter((s: any) => s.status === 'strong' || s.level >= 80).length;
            const improveCount = student.skills.filter((s: any) => s.status === 'improve' || (s.level >= 65 && s.level < 80)).length;
            const missingCount = student.skills.filter((s: any) => s.status === 'missing' || s.status === 'learning' || s.level < 65).length;

            const nextMove = {
              title: "Close Distributed Systems & CUDA Gap",
              summary: `Your digital twin indicates that advancing ${student.skills[1]?.name || 'Distributed Systems'} will boost your readiness score past 90% and unlock Tier-1 recommendations.`,
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

            res.end(JSON.stringify({
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
              topInternshipMatches: matches.slice(0, 4)
            }));
            return;
          }

          // GET /api/student/:id/profile
          const profMatch = pathname.match(/^\/api\/student\/([^/]+)\/profile$/);
          if (profMatch) {
            const student = students.find(s => s.id === profMatch[1]) || students[0];
            res.end(JSON.stringify(student));
            return;
          }

          // GET /api/student/:id/internship-matches
          const matchMatch = pathname.match(/^\/api\/student\/([^/]+)\/internship-matches$/);
          if (matchMatch) {
            const student = students.find(s => s.id === matchMatch[1]) || students[0];
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
                recommendationNote: status === 'Ready' ? 'Fast-track candidate: submit application with portfolio.' : 'Complete the recommended 2-week sprint.'
              };
            }).sort((a, b) => b.readinessScore - a.readinessScore);

            res.end(JSON.stringify(matches));
            return;
          }

          // GET /api/student/:id/skill-gap
          const gapMatch = pathname.match(/^\/api\/student\/([^/]+)\/skill-gap$/);
          if (gapMatch) {
            const studentId = gapMatch[1];
            if (skillGaps[studentId]) {
              res.end(JSON.stringify(skillGaps[studentId]));
              return;
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

            res.end(JSON.stringify({
              studentId: student.id,
              studentName: student.name,
              targetRole: parsedUrl.query.targetRole as string || student.targetRole,
              targetCompanyProfile: "Tier 1 High-Growth Tech & AI Labs",
              targetRoleReadiness: student.readinessScore,
              skillsHaveCount: gaps.filter((g: any) => g.status === 'have').length,
              skillsImproveCount: gaps.filter((g: any) => g.status === 'improve').length,
              skillsLearnCount: gaps.filter((g: any) => g.status === 'learn').length,
              biggestBlocker: {
                skill: gaps.find((g: any) => g.gapDelta > 10)?.skillName || "System Design Depth",
                reason: "Recruiter benchmarks require demonstrated hands-on architecture artifacts.",
                impactOnReadiness: `Closing this will elevate your score by ~${Math.min(12, 100 - student.readinessScore)}%.`
              },
              recommendedNextStep: {
                title: `Execute Sprint on ${gaps.find((g: any) => g.gapDelta > 10)?.skillName || 'Target Skills'}`,
                action: "Complete the guided weekly roadmap modules to build verified evidence.",
                estimatedTimeToImpact: "1 to 2 weeks",
                roadmapWeekTarget: 2
              },
              gaps
            }));
            return;
          }

          // GET /api/student/:id/roadmap
          const roadMatch = pathname.match(/^\/api\/student\/([^/]+)\/roadmap$/);
          if (roadMatch) {
            const studentId = roadMatch[1];
            if (roadmaps[studentId]) {
              res.end(JSON.stringify(roadmaps[studentId]));
              return;
            }
            const student = students.find(s => s.id === studentId) || students[0];
            const template = roadmaps["stu-001"];
            res.end(JSON.stringify({
              ...template,
              studentId: student.id,
              targetRole: `${student.targetRole} Fast-Track`,
              overallProgress: Math.round(student.readinessScore * 0.6)
            }));
            return;
          }

          // POST /api/student/:id/ask
          const askMatch = pathname.match(/^\/api\/student\/([^/]+)\/ask$/);
          if (askMatch && method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              let query = '';
              try {
                const parsed = JSON.parse(body);
                query = (parsed.query || '').toLowerCase();
              } catch (e) {}

              let responseData = chatPresets.responses.generic;
              if (query.includes('openai') || query.includes('ai system') || query.includes('gpu') || query.includes('cuda') || query.includes('blocker')) {
                responseData = chatPresets.responses.openai;
              } else if (query.includes('stripe') || query.includes('backend') || query.includes('database') || query.includes('postgres')) {
                responseData = chatPresets.responses.stripe;
              }

              res.end(JSON.stringify({
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
              }));
            });
            return;
          }

          // Faculty Routes
          if (pathname === '/api/faculty/cs-401/dashboard' || pathname.startsWith('/api/faculty/') && pathname.endsWith('/dashboard')) {
            res.end(JSON.stringify(faculty));
            return;
          }

          if (pathname.includes('/faculty/') && pathname.endsWith('/students')) {
            res.end(JSON.stringify(students));
            return;
          }

          const f360Match = pathname.match(/^\/api\/faculty\/student\/([^/]+)\/360$/);
          if (f360Match) {
            const studentId = f360Match[1];
            const student = students.find(s => s.id === studentId) || students[0];
            const gapsAnalysis = skillGaps[studentId] || skillGaps["stu-001"];
            const roadmap = roadmaps[studentId] || roadmaps["stu-001"];
            
            res.end(JSON.stringify({
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
            }));
            return;
          }

          if (pathname.includes('/faculty/') && pathname.endsWith('/skill-gaps')) {
            res.end(JSON.stringify(faculty.rankedClassSkillGaps));
            return;
          }

          if (pathname.includes('/faculty/') && pathname.endsWith('/ai-insights')) {
            res.end(JSON.stringify({
              classId: 'cs-401',
              insights: aiInsights.cohortInsights,
              actionPlanPreset: aiInsights.actionPlanPreset
            }));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Not found: ${pathname}` }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), unlockApiPlugin()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
});
