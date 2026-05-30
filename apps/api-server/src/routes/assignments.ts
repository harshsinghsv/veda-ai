import { Router, Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { assignmentQueue } from '../queues/assignmentQueue';
import { CreateAssignmentDTO } from '../types';

const router = Router();

const subjectMatchers: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Physics', pattern: /\bphysics\b/i },
  { label: 'Chemistry', pattern: /\bchemistry\b/i },
  { label: 'Biology', pattern: /\bbiology\b/i },
  { label: 'Mathematics', pattern: /\b(math|maths|mathematics)\b/i },
  { label: 'Science', pattern: /\bscience\b/i },
  { label: 'Computer Science', pattern: /\b(computer science|cs)\b/i },
  { label: 'English', pattern: /\benglish\b/i },
  { label: 'History', pattern: /\bhistory\b/i },
  { label: 'Geography', pattern: /\bgeography\b/i },
  { label: 'Economics', pattern: /\beconomics\b/i },
  { label: 'Civics', pattern: /\bcivics\b/i },
  { label: 'Accountancy', pattern: /\b(accountancy|accounts)\b/i },
  { label: 'Business Studies', pattern: /\b(business studies|bst)\b/i },
  { label: 'Hindi', pattern: /\bhindi\b/i },
  { label: 'Urdu', pattern: /\burdu\b/i },
];

const romanToNumber: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
  xi: 11,
  xii: 12,
};

function ordinal(n: number): string {
  if (n >= 11 && n <= 13) return `${n}th`;
  const last = n % 10;
  if (last === 1) return `${n}st`;
  if (last === 2) return `${n}nd`;
  if (last === 3) return `${n}rd`;
  return `${n}th`;
}

function inferSubject(text: string | undefined): string | null {
  if (!text) return null;
  for (const matcher of subjectMatchers) {
    if (matcher.pattern.test(text)) return matcher.label;
  }
  return null;
}

function inferGrade(text: string | undefined): string | null {
  if (!text) return null;
  const match = text.match(/\b(class|grade)\s*([0-9]{1,2}|[ivx]{1,4})\b/i);
  if (match) {
    const raw = match[2].toLowerCase();
    const number = romanToNumber[raw] ?? Number(raw);
    if (Number.isFinite(number) && number > 0) return ordinal(number);
  }
  const suffixMatch = text.match(/\b([0-9]{1,2})(st|nd|rd|th)\b/i);
  if (suffixMatch) {
    const number = Number(suffixMatch[1]);
    if (Number.isFinite(number) && number > 0) return ordinal(number);
  }
  return null;
}

function inferFromInstructions(instructions?: string) {
  return {
    subject: inferSubject(instructions),
    grade: inferGrade(instructions),
  };
}

// POST /api/assignments — Create and enqueue
router.post('/', async (req: Request, res: Response) => {
  try {
    const body: CreateAssignmentDTO = req.body;

    const inferred = inferFromInstructions(body.instructions);
    const resolvedSubject = inferred.subject ?? '';
    const resolvedGrade = inferred.grade ?? '';

    // Validation
    const { title, totalMarks, duration, topics } = body;
    const finalTitle = title?.trim() || (resolvedSubject ? `${resolvedSubject} Assignment` : 'Assignment');
    if (!finalTitle?.trim()) return res.status(400).json({ error: 'Title is required' });
    if (!totalMarks || totalMarks < 1) return res.status(400).json({ error: 'Total marks must be at least 1' });
    if (!duration || duration < 1) return res.status(400).json({ error: 'Duration must be at least 1 minute' });
    if (!topics?.length) return res.status(400).json({ error: 'At least one topic is required' });

    // Save to MongoDB with status: pending
    const assignment = await Assignment.create({
      title: finalTitle.trim(),
      subject: resolvedSubject.trim(),
      grade: resolvedGrade.trim(),
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