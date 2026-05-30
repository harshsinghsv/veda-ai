import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  id: string;
  section: 'A' | 'B' | 'C';
  questionNumber: number;
  text: string;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Short Answer' | 'Long Answer';
  options?: string[]; // for MCQ
  correctAnswer?: string; // for MCQ
  answer?: string; // full answer key text
}

export interface IAssignment extends Document {
  title: string;
  subject: string;
  grade: string;
  totalMarks: number;
  duration: number; // in minutes
  topics: string[];
  instructions?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  questions: IQuestion[];
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  id: { type: String, required: true },
  section: { type: String, enum: ['A', 'B', 'C'], required: true },
  questionNumber: { type: Number, required: true },
  text: { type: String, required: true },
  marks: { type: Number, required: true, min: 1 },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  type: { type: String, enum: ['MCQ', 'Short Answer', 'Long Answer'], required: true },
  options: [{ type: String }],
  correctAnswer: { type: String },
  answer: { type: String },
});

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    grade: { type: String, required: false, default: '', trim: true },
    totalMarks: { type: Number, required: true, min: 1 },
    duration: { type: Number, required: true, min: 1 },
    topics: [{ type: String, required: true }],
    instructions: { type: String },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    questions: [QuestionSchema],
    errorMessage: { type: String },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);