import { Router, Request, Response } from 'express';
import { getDataSource } from '../adapters/dataSource.js';

const router = Router();
const dataSource = getDataSource();

// GET /api/students - List all students (for selector/switcher)
router.get('/students', async (req: Request, res: Response) => {
  try {
    const students = await dataSource.getAllStudents();
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/student/:id/dashboard
router.get('/student/:id/dashboard', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getStudentDashboard(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/student/:id/profile
router.get('/student/:id/profile', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getStudentProfile(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/student/:id/internship-matches
router.get('/student/:id/internship-matches', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getStudentInternshipMatches(req.params.id);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/student/:id/skill-gap
router.get('/student/:id/skill-gap', async (req: Request, res: Response) => {
  try {
    const targetRoleId = req.query.targetRole as string | undefined;
    const data = await dataSource.getStudentSkillGap(req.params.id, targetRoleId);
    if (!data) {
      return res.status(404).json({ error: 'Student skill gap data not found' });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/student/:id/roadmap
router.get('/student/:id/roadmap', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getStudentRoadmap(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/student/:id/ask - Structured AI Chat
router.post('/student/:id/ask', async (req: Request, res: Response) => {
  try {
    const { query, conversationHistory } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await dataSource.askUnlockAI(req.params.id, { query, studentId: req.params.id, conversationHistory });
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
