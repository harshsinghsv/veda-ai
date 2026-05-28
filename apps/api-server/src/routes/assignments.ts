import { Router, Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { assignmentQueue } from '../queues/assignmentQueue';
import { CreateAssignmentDTO } from '../types';

const router = Router();

// POST /api/assignments — Create and enqueue
router.post('/', async (req: Request, res: Response) => {
  try {
    const body: CreateAssignmentDTO = req.body;

    // Validation
    const { title, subject, grade, totalMarks, duration, topics } = body;
    if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
    if (!subject?.trim()) return res.status(400).json({ error: 'Subject is required' });
    if (!grade?.trim()) return res.status(400).json({ error: 'Grade is required' });
    if (!totalMarks || totalMarks < 1) return res.status(400).json({ error: 'Total marks must be at least 1' });
    if (!duration || duration < 1) return res.status(400).json({ error: 'Duration must be at least 1 minute' });
    if (!topics?.length) return res.status(400).json({ error: 'At least one topic is required' });

    // Save to MongoDB with status: pending
    const assignment = await Assignment.create({
      title: title.trim(),
      subject: subject.trim(),
      grade: grade.trim(),
      totalMarks,
      duration,
      topics,
      instructions: body.instructions,
      status: 'pending',
    });

    // Enqueue BullMQ job
    await assignmentQueue.add('generate', {
      assignmentId: assignment._id.toString(),
      title: assignment.title,
      subject: assignment.subject,
      grade: assignment.grade,
      totalMarks: assignment.totalMarks,
      duration: assignment.duration,
      topics: assignment.topics,
      instructions: assignment.instructions,
    });

    res.status(201).json({
      assignmentId: assignment._id,
      status: 'pending',
      message: 'Assignment queued for generation',
    });
  } catch (err: any) {
    console.error('POST /api/assignments error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/assignments/:id — Poll status / fetch result
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    res.json(assignment);
  } catch (err: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;