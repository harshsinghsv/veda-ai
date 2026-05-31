import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Assignment,
  AssignmentFormData,
  GeneratedPaper,
  QuestionTypeRow,
} from "@/types/assignment";
import { v4 as uuid } from "uuid";

const defaultFormData: AssignmentFormData = {
  dueDate: "",
  questionTypes: [],
  additionalInfo: "",
  subject: "Science",
  class: "8th",
  school: "Delhi Public School, Sector-4, Bokaro",
  timeAllowed: "45 minutes",
};

interface AssignmentStore {
  // List
  assignments: Assignment[];
  currentAssignmentId: string | null;
  // Create form
  formStep: number;
  formData: AssignmentFormData;
  isGenerating: boolean;
  generatedOutput: GeneratedPaper | null;
  // Actions
  setFormStep: (step: number) => void;
  updateFormData: (data: Partial<AssignmentFormData>) => void;
  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionType: (id: string, field: string, value: string | number) => void;
  submitForm: () => void;
  deleteAssignment: (id: string) => void;
  setGeneratedOutput: (paper: GeneratedPaper | null) => void;
  setIsGenerating: (v: boolean) => void;
  loadAssignment: (id: string) => Promise<void>;
  resetForm: () => void;
}

export const useAssignmentStore = create<AssignmentStore>()(
  persist(
    (set, get) => ({
      assignments: [
      ],
      currentAssignmentId: null,
      formStep: 1,
      formData: { ...defaultFormData },
      isGenerating: false,
      generatedOutput: null,

      setFormStep: (step) => set({ formStep: step }),

      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      addQuestionType: () => {
        const existing = get().formData.questionTypes;
        const allTypes = [
          "Multiple Choice Questions",
          "Short Questions",
          "Long Answer Questions",
          "Fill in the Blanks",
          "True / False",
          "Diagram/Graph-Based Questions",
          "Numerical Problems",
        ];
        const usedTypes = existing.map((q) => q.type);
        const nextType = allTypes.find((t) => !usedTypes.includes(t)) ?? allTypes[0];
        const newRow: QuestionTypeRow = {
          id: uuid(),
          type: nextType,
          count: 1,
          marks: 1,
        };
        set((state) => ({
          formData: {
            ...state.formData,
            questionTypes: [...state.formData.questionTypes, newRow],
          },
        }));
      },

      removeQuestionType: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            questionTypes: state.formData.questionTypes.filter((q) => q.id !== id),
          },
        })),

      updateQuestionType: (id, field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            questionTypes: state.formData.questionTypes.map((q) =>
              q.id === id ? { ...q, [field]: value } : q
            ),
          },
        })),

      submitForm: () => {
        const { formData } = get();
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
          "http://localhost:5000";

        const totalMarks = formData.questionTypes.reduce(
          (sum, qt) => sum + qt.count * qt.marks,
          0
        );
        const durationMatch = formData.timeAllowed.match(/\d+/);
        const duration = durationMatch ? Number(durationMatch[0]) : 45;
        const topics = formData.questionTypes.map(
          (qt) => `${qt.type}:${qt.count}:${qt.marks}`
        );

        set({ isGenerating: true, generatedOutput: null });

        fetch(`${apiBase}/api/assignments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `${formData.subject} Assignment`,
            subject: formData.subject,
            grade: formData.class,
            totalMarks,
            duration,
            topics,
            instructions: formData.additionalInfo,
          }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const error = await res.json().catch(() => ({}));
              throw new Error(error.error || "Failed to create assignment");
            }
            return res.json();
          })
          .then((data) => {
            const assignmentId = String(data.assignmentId ?? "");
            if (!assignmentId) throw new Error("Missing assignment id");

            const newAssignment: Assignment = {
              id: assignmentId,
              title: `${formData.subject} Assignment`,
              assignedOn: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
              dueDate: formData.dueDate,
              subject: formData.subject,
              class: formData.class,
            };

            set((state) => ({
              currentAssignmentId: assignmentId,
              assignments: [newAssignment, ...state.assignments],
            }));

            const poll = async () => {
              const res = await fetch(`${apiBase}/api/assignments/${assignmentId}`);
              if (!res.ok) throw new Error("Failed to fetch assignment status");
              const assignment = await res.json();

              if (assignment.status === "completed") {
                // Build sections from the question types the teacher selected
                const sectionLetters = ["A", "B", "C", "D", "E", "F"];
                const sections = formData.questionTypes.map((qt, idx) => {
                  const sectionLetter = sectionLetters[idx] ?? String.fromCharCode(65 + idx);
                  const questions = (assignment.questions || [])
                    .filter((q: any) => q.section === sectionLetter)
                    .sort((a: any, b: any) => a.questionNumber - b.questionNumber)
                    .map((q: any, qIdx: number) => ({
                      id: qIdx + 1,
                      text: q.text,
                      difficulty:
                        q.difficulty === "Easy"
                          ? "Easy"
                          : q.difficulty === "Medium"
                            ? "Moderate"
                            : "Challenging",
                      marks: q.marks,
                      options: q.options,
                    }));

                  return {
                    title: `Section ${sectionLetter}`,
                    questionType: qt.type,
                    instruction: `Attempt all questions. Each question carries ${qt.marks} mark${qt.marks > 1 ? "s" : ""}.`,
                    questions,
                  };
                });

                // Build real answer key from AI-generated answers
                const answerKey = (assignment.questions || []).map((q: any, idx: number) => ({
                  id: idx + 1,
                  questionSection: q.section,
                  questionNumber: q.questionNumber,
                  text: q.answer ||
                    (q.correctAnswer ? `Correct answer: ${q.correctAnswer}` : "Answer not available."),
                }));

                const paper: GeneratedPaper = {
                  school: formData.school,
                  subject: assignment.subject ?? "",
                  class: assignment.grade ?? "",
                  timeAllowed: `${assignment.duration ?? duration} minutes`,
                  maxMarks: assignment.totalMarks ?? totalMarks,
                  sections: sections.filter((s) => s.questions.length > 0),
                  answerKey,
                };

                const realSubject = assignment.subject || formData.subject;
                const realClass = assignment.grade || formData.class;

                set((state) => ({
                  assignments: state.assignments.map((a) =>
                    a.id === assignmentId
                      ? {
                          ...a,
                          subject: realSubject,
                          class: realClass,
                          title: `${realSubject} Assignment`,
                        }
                      : a
                  ),
                  isGenerating: false,
                  generatedOutput: paper,
                }));
                return;
              }

              if (assignment.status === "failed") {
                set({ isGenerating: false, generatedOutput: null });
                return;
              }

              setTimeout(poll, 2000);
            };

            poll().catch(() => {
              set({ isGenerating: false, generatedOutput: null });
            });
          })
          .catch(() => {
            set({ isGenerating: false, generatedOutput: null });
          });
      },

      deleteAssignment: (id) =>
        set((state) => ({
          assignments: state.assignments.filter((a) => a.id !== id),
        })),

      setGeneratedOutput: (paper) => set({ generatedOutput: paper }),
      setIsGenerating: (v) => set({ isGenerating: v }),

      loadAssignment: async (id) => {
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
          "http://localhost:5000";

        set({ isGenerating: true, generatedOutput: null });

        try {
          const res = await fetch(`${apiBase}/api/assignments/${id}`);
          if (!res.ok) throw new Error("Failed to fetch assignment");
          const assignment = await res.json();

          if (assignment.status === "completed") {
            const sectionsMap: Record<string, any[]> = {};
            (assignment.questions || []).forEach((q: any) => {
              const sec = q.section || "A";
              if (!sectionsMap[sec]) sectionsMap[sec] = [];
              sectionsMap[sec].push(q);
            });

            const sectionLetters = Object.keys(sectionsMap).sort();
            const sections = sectionLetters.map((secLetter) => {
              const qList = sectionsMap[secLetter].sort((a, b) => a.questionNumber - b.questionNumber);
              const firstQ = qList[0];
              
              let typeLabel = "Questions";
              if (firstQ) {
                if (firstQ.type === "MCQ") typeLabel = "Multiple Choice Questions";
                else if (firstQ.type === "Short Answer") typeLabel = "Short Questions";
                else if (firstQ.type === "Long Answer") typeLabel = "Long Answer Questions";
                else typeLabel = firstQ.type;
              }
              
              const marks = firstQ?.marks || 1;
              
              let instruction = `Attempt all questions. Each question carries ${marks} mark${marks > 1 ? "s" : ""}.`;
              if (firstQ?.type === "MCQ") {
                instruction = `Choose the correct option. Each question carries ${marks} mark${marks > 1 ? "s" : ""}.`;
              } else if (firstQ?.type === "Short Answer") {
                instruction = `Answer the following questions in 2–3 sentences. Each question carries ${marks} mark${marks > 1 ? "s" : ""}.`;
              } else if (firstQ?.type === "Long Answer") {
                instruction = `Answer the following questions in detail. Each question carries ${marks} mark${marks > 1 ? "s" : ""}.`;
              }

              const mappedQuestions = qList.map((q, idx) => ({
                id: idx + 1,
                text: q.text,
                difficulty: (
                  q.difficulty === "Easy"
                    ? "Easy"
                    : q.difficulty === "Medium" || q.difficulty === "Moderate"
                      ? "Moderate"
                      : "Challenging"
                ) as "Easy" | "Moderate" | "Challenging",
                marks: q.marks,
                options: q.options,
              }));

              return {
                title: `Section ${secLetter}`,
                questionType: typeLabel,
                instruction,
                questions: mappedQuestions,
              };
            });

            const answerKey = (assignment.questions || []).map((q: any, idx: number) => ({
              id: idx + 1,
              questionSection: q.section,
              questionNumber: q.questionNumber,
              text: q.answer ||
                (q.correctAnswer ? `Correct answer: ${q.correctAnswer}` : "Answer not available."),
            }));

            const paper: GeneratedPaper = {
              school: get().formData.school || "Delhi Public School, Sector-4, Bokaro",
              subject: assignment.subject ?? "",
              class: assignment.grade ?? "",
              timeAllowed: `${assignment.duration ?? 45} minutes`,
              maxMarks: assignment.totalMarks ?? 0,
              sections: sections.filter((s) => s.questions.length > 0),
              answerKey,
            };

            set({ isGenerating: false, generatedOutput: paper });
          } else if (assignment.status === "failed") {
            set({ isGenerating: false, generatedOutput: null });
          } else {
            set({ isGenerating: true, generatedOutput: null });
          }
        } catch (error) {
          console.error("loadAssignment error:", error);
          set({ isGenerating: false, generatedOutput: null });
        }
      },

      resetForm: () =>
        set({
          formStep: 1,
          formData: { ...defaultFormData },
          isGenerating: false,
          generatedOutput: null,
          currentAssignmentId: null,
        }),
    }),
    { name: "veda-assignment-store" }
  )
);
