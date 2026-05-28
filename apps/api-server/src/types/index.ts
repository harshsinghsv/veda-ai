export interface CreateAssignmentDTO {
  title: string;
  subject: string;
  grade: string;
  totalMarks: number;
  duration: number;
  topics: string[];
  instructions?: string;
}

export interface AssignmentJobData {
  assignmentId: string;
  title: string;
  subject: string;
  grade: string;
  totalMarks: number;
  duration: number;
  topics: string[];
  instructions?: string;
}