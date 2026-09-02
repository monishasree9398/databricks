import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import { getDataSource } from './adapters/dataSource.js';

const app = express();
app.use(express.json());
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);

async function runTests() {
  console.log('🧪 Starting UNLOCK API Endpoints Automated Verification...\n');

  const dataSource = getDataSource();
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: any) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`, detail || '');
      failed++;
    }
  }

  try {
    // 1. All Students
    const students = await dataSource.getAllStudents();
    assert(students.length >= 15, `getAllStudents returns 15+ students (actual: ${students.length})`);
    const student1 = students[0];
    assert(!!student1.id && !!student1.name, `Student object contains id (${student1?.id}) and name (${student1?.name})`);

    // 2. Student Dashboard
    const dashboard = await dataSource.getStudentDashboard(student1.id);
    assert(dashboard !== null, 'getStudentDashboard returns valid response');
    assert(typeof dashboard?.readinessScore === 'number', `Student readiness score is number (${dashboard?.readinessScore}%)`);
    assert(dashboard?.topInternshipMatches.length! > 0, `Top internship matches populated (count: ${dashboard?.topInternshipMatches.length})`);
    assert(dashboard?.nextMove?.actions?.length! >= 2, `Next Move contains 2+ concrete actions (count: ${dashboard?.nextMove?.actions?.length})`);

    // 3. Student Profile
    const profile = await dataSource.getStudentProfile(student1.id);
    assert(profile?.academic.cgpa !== undefined, `Student profile academic GPA present (${profile?.academic.cgpa})`);
    assert(profile?.skills.length! >= 5, `Student has 5+ skills with levels (actual: ${profile?.skills.length})`);

    // 4. Student Internship Matches
    const matches = await dataSource.getStudentInternshipMatches(student1.id);
    assert(matches.length >= 6, `Student internship matches calculated (actual: ${matches.length})`);
    assert(matches.every(m => m.matchedSkills.length > 0 || m.missingSkills.length > 0), 'Every match has matched or missing skills');
    assert(matches.every(m => typeof m.readinessScore === 'number' && m.readinessScore >= 0 && m.readinessScore <= 100), 'All match scores within 0-100%');

    // 5. Student Skill Gap
    const skillGap = await dataSource.getStudentSkillGap(student1.id, "AI / ML Systems Engineer");
    assert(skillGap !== null, 'getStudentSkillGap returns analysis object');
    assert(!!skillGap?.biggestBlocker?.skill, `Biggest blocker identified: ${skillGap?.biggestBlocker?.skill}`);
    assert(skillGap?.gaps.length! >= 5, `Gaps breakdown contains 5+ items (actual: ${skillGap?.gaps.length})`);

    // 6. Student Roadmap
    const roadmap = await dataSource.getStudentRoadmap(student1.id);
    assert(roadmap !== null, 'getStudentRoadmap returns 4-week structured sprint');
    assert(roadmap?.weeks.length === 4, `Roadmap has exactly 4 weeks (actual: ${roadmap?.weeks.length})`);
    assert(Boolean(roadmap?.weeks.every(w => w.tasks.length > 0)), 'Every week has guided tasks');

    // 7. Ask UNLOCK AI
    const aiResponse = await dataSource.askUnlockAI(student1.id, { studentId: student1.id, query: "What is my biggest blocker for OpenAI?" });
    assert(aiResponse.role === 'assistant', 'Ask UNLOCK AI returns assistant message');
    assert(aiResponse.content.length > 20, 'AI response content populated');
    assert(aiResponse.highlightedSkills!.length > 0, `AI response contains highlighted skills (actual: ${aiResponse.highlightedSkills?.join(', ')})`);
    assert(aiResponse.percentages!.length > 0, `AI response contains structured percentages (actual: ${aiResponse.percentages?.length})`);

    // 8. Faculty Dashboard
    const facultyDash = await dataSource.getFacultyDashboard('cs-401');
    assert(facultyDash !== null, 'getFacultyDashboard returns class analytics');
    assert(facultyDash?.totalHeadcount! > 0, `Faculty headcount present (actual: ${facultyDash?.totalHeadcount})`);
    assert(facultyDash?.readinessDistribution.ready! >= 0, `Readiness distribution present (Ready: ${facultyDash?.readinessDistribution.ready})`);
    assert(facultyDash?.rankedClassSkillGaps.length! >= 3, `Ranked class skill gaps present (actual: ${facultyDash?.rankedClassSkillGaps.length})`);

    // 9. Faculty Students
    const facultyStudents = await dataSource.getFacultyStudents('cs-401');
    assert(facultyStudents.length >= 15, `Faculty students roster contains 15+ students (actual: ${facultyStudents.length})`);

    // 10. Faculty Student 360
    const student360 = await dataSource.getFacultyStudent360(student1.id);
    assert(student360 !== null, 'Faculty Student 360 profile loaded');
    assert(student360?.aiDiagnostic?.keyStrengths.length! > 0, `AI diagnostic key strengths populated (${student360?.aiDiagnostic.keyStrengths.join(', ')})`);
    assert(student360?.facultyAdvisorNotes.length! > 0, `Faculty advisor notes present (${student360?.facultyAdvisorNotes.length} notes)`);

    // 11. Faculty Skill Gaps & AI Insights
    const facultyGaps = await dataSource.getFacultySkillGaps('cs-401');
    assert(facultyGaps.length >= 3, `Faculty skill gaps list populated (${facultyGaps.length} items)`);

    const aiInsights = await dataSource.getFacultyAIInsights('cs-401');
    assert(aiInsights.insights.length >= 2, `Faculty AI insights list populated (${aiInsights.insights.length} insights)`);
    assert(!!aiInsights.actionPlanPreset, 'Faculty action plan preset available');

    console.log(`\n==================================================`);
    console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`==================================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err: any) {
    console.error('💥 Test execution error:', err);
    process.exit(1);
  }
}

runTests();
