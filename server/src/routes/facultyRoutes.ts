import { Router, Request, Response } from 'express';
import { getDataSource } from '../adapters/dataSource.js';

const router = Router();
const dataSource = getDataSource();

// GET /api/faculty/:classId/dashboard
router.get('/faculty/:classId/dashboard', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getFacultyDashboard(req.params.classId);
    if (!data) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/faculty/:classId/students
router.get('/faculty/:classId/students', async (req: Request, res: Response) => {
  try {
    const students = await dataSource.getFacultyStudents(req.params.classId);
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/faculty/student/:id/360
router.get('/faculty/student/:id/360', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getFacultyStudent360(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Student 360 profile not found' });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/faculty/:classId/skill-gaps
router.get('/faculty/:classId/skill-gaps', async (req: Request, res: Response) => {
  try {
    const gaps = await dataSource.getFacultySkillGaps(req.params.classId);
    res.json(gaps);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/faculty/:classId/ai-insights
router.get('/faculty/:classId/ai-insights', async (req: Request, res: Response) => {
  try {
    const insights = await dataSource.getFacultyAIInsights(req.params.classId);
    res.json(insights);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
