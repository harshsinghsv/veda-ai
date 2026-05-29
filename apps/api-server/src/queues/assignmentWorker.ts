import { Worker, Job } from 'bullmq';
import OpenAI from 'openai';
import { Assignment } from '../models/Assignment';
import redisConnection from '../config/redis';
import { AssignmentJobData } from '../types';
import { broadcastAssignmentUpdate } from '../websocket/wsServer';

const openai = new OpenAI({
  apiKey: process.env.CEREBRAS_API_KEY!,
  baseURL: 'https://api.cerebras.ai/v1',
});

/**
 * Each "topic" in our system is a question type chosen by the teacher:
 * e.g. "Multiple Choice Questions", "Short Questions", "Long Answer Questions"
 *
 * We map these into sections with appropriate instructions.
 */
function getSectionLabel(questionType: string): string {
  const t = questionType.toLowerCase();
  if (t.includes('multiple choice') || t.includes('mcq')) return 'MCQ';
  if (t.includes('short')) return 'Short Answer';
  if (t.includes('long')) return 'Long Answer';
  if (t.includes('fill')) return 'Fill in the Blanks';
  if (t.includes('true') || t.includes('false')) return 'True / False';
  if (t.includes('diagram') || t.includes('graph')) return 'Diagram / Graph';
  if (t.includes('numerical')) return 'Numerical Problems';
  return questionType;
}

function getSectionInstruction(questionType: string, marksEach: number): string {
  const t = questionType.toLowerCase();
  if (t.includes('multiple choice') || t.includes('mcq'))
    return `Choose the correct option. Each question carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  if (t.includes('short'))
    return `Answer the following questions in 2–3 sentences. Each question carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  if (t.includes('long'))
    return `Answer the following questions in detail. Each question carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  if (t.includes('fill'))
    return `Fill in the blanks with the correct answer. Each carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  if (t.includes('true') || t.includes('false'))
    return `State whether the following are True or False. Each carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  if (t.includes('diagram') || t.includes('graph'))
    return `Draw and label the diagram/graph as required. Each question carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  if (t.includes('numerical'))
    return `Solve the following numerical problems. Show your working clearly. Each question carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
  return `Attempt all questions. Each question carries ${marksEach} mark${marksEach > 1 ? 's' : ''}.`;
}

function getDifficulty(questionType: string): string {
  const t = questionType.toLowerCase();
  if (t.includes('multiple choice') || t.includes('mcq') || t.includes('fill') || t.includes('true')) return 'Easy';
  if (t.includes('short') || t.includes('numerical') || t.includes('diagram')) return 'Medium';
  if (t.includes('long')) return 'Hard';
  return 'Medium';
}

function buildPrompt(data: AssignmentJobData): string {
  // topics is an array of question type strings with their counts and marks
  // Format: "Multiple Choice Questions:5:2" (type:count:marksEach)
  const sectionLines = data.topics.map((t, i) => {
    const [type, count, marks] = t.split(':');
    const sectionLetter = String.fromCharCode(65 + i); // A, B, C...
    return `  - Section ${sectionLetter}: ${type} — ${count} questions, ${marks} marks each`;
  }).join('\n');

  const totalQuestions = data.topics.reduce((sum, t) => {
    const count = parseInt(t.split(':')[1] ?? '1');
    return sum + count;
  }, 0);

  return `You are an expert ${data.subject} teacher for Grade ${data.grade}. Generate a complete, high-quality question paper as valid JSON only.

Paper Details:
- Subject: ${data.subject}
- Grade/Class: ${data.grade}
- Total Marks: ${data.totalMarks}
- Duration: ${data.duration} minutes
- Total Questions: ${totalQuestions}
${data.instructions ? `- Special Instructions: ${data.instructions}` : ''}

Sections required (generate EXACTLY this many questions per section):
${sectionLines}

Rules:
1. Questions must be relevant to ${data.subject} for Grade ${data.grade} students
2. Each question must be clear, unambiguous and educationally sound
3. For MCQ, provide exactly 4 options (a, b, c, d) — one must be correct
4. For Fill in the Blanks, use "______" as the blank
5. Marks must match the specification exactly
6. Provide a detailed, correct answer for EVERY question in the answerKey
7. Answer keys must be complete sentences explaining the answer, not just the answer letter

Respond ONLY with this exact JSON structure (no markdown, no code fences, no explanation):
{
  "questions": [
    {
      "id": "q1",
      "section": "A",
      "questionNumber": 1,
      "text": "Question text here",
      "marks": 2,
      "difficulty": "Easy",
      "type": "MCQ",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "answer": "The correct answer is Option A because..."
    }
  ]
}

IMPORTANT:
- Every question MUST have an "answer" field with a clear, detailed explanation
- MCQ questions MUST have "options" (array of 4 strings) AND "correctAnswer"
- Do NOT include [Easy], [Medium], [Hard] tags in question text
- Do NOT include marks in question text — they will be displayed separately
- Total marks across all questions must equal ${data.totalMarks}`;
}

function parseResponse(rawText: string) {
  const cleaned = rawText.replace(/```json\n?|\n?```/g, '').trim();

  // Sometimes the model wraps in extra text — try to extract JSON object
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON object found in response');

  const parsed = JSON.parse(jsonMatch[0]);

  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error('Invalid response structure: missing questions array');
  }

  parsed.questions.forEach((q: any, i: number) => {
    if (!q.id || !q.section || !q.text || !q.marks || !q.type) {
      throw new Error(`Question at index ${i} is missing required fields`);
    }
    // Ensure answer exists
    if (!q.answer) {
      q.answer = q.correctAnswer
        ? `The correct answer is: ${q.correctAnswer}.`
        : 'Answer not provided.';
    }
  });

  return parsed.questions;
}

export const assignmentWorker = new Worker<AssignmentJobData>(
  'assignment-generation',
  async (job: Job<AssignmentJobData>) => {
    const { assignmentId, ...jobData } = job.data;
    console.log(`🔄 Processing job ${job.id} for assignment ${assignmentId}`);

    await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' });
    broadcastAssignmentUpdate(assignmentId, { status: 'processing' });

    try {
      const prompt = buildPrompt(job.data);
      const result = await openai.chat.completions.create({
        model: 'zai-glm-4.7',
        messages: [
          {
            role: 'system',
            content: 'You generate JSON only. No markdown, no code fences.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      });
      const rawText = result.choices[0]?.message?.content ?? '';
      if (!rawText) {
        throw new Error('Empty response from Cerebras');
      }

      const questions = parseResponse(rawText);

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: 'completed',
        questions,
      });

      console.log(`✅ Assignment ${assignmentId} completed with ${questions.length} questions`);

      broadcastAssignmentUpdate(assignmentId, {
        status: 'completed',
        questions,
      });
    } catch (err: any) {
      console.error(`Job failed for assignment ${assignmentId}:`, err.message);

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: 'failed',
        errorMessage: err.message,
      });

      broadcastAssignmentUpdate(assignmentId, {
        status: 'failed',
        errorMessage: err.message,
      });

      throw err;
    }
  },
  {
    connection: redisConnection as any,
    concurrency: 3,
  }
);

assignmentWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

assignmentWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

export { getSectionLabel, getSectionInstruction };