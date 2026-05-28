"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Mic, Upload, CalendarPlus, Plus } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { QuestionTypeRow } from "@/types/assignment";
import Stepper from "@/components/ui/Stepper";

// ── Custom dropdown — replaces native <select> to stay within layout ──────────
function QuestionTypeSelect({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: 44 }}>
      {/* Trigger pill */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          height: 44,
          padding: "11px 40px 11px 16px",
          border: "none",
          borderRadius: 100,
          fontSize: 16,
          fontWeight: 500,
          color: "#303030",
          letterSpacing: "-0.04em",
          lineHeight: "140%",
          background: "#FFFFFF",
          outline: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          boxSizing: "border-box",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
          {value}
        </span>
      </button>

      {/* Chevron icon */}
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        color="#303030"
        style={{
          position: "absolute",
          right: 14,
          top: "50%",
          transform: open ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
          pointerEvents: "none",
          transition: "transform 0.18s",
        }}
      />

      {/* Dropdown list */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 50,
            overflow: "hidden",
            padding: "6px 0",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 16px",
                background: opt === value ? "#F0F0F0" : "transparent",
                color: "#303030",
                border: "none",
                textAlign: "left",
                fontSize: 15,
                fontWeight: opt === value ? 600 : 400,
                letterSpacing: "-0.03em",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (opt !== value)
                  (e.currentTarget as HTMLButtonElement).style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                if (opt !== value)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Answer Questions",
  "Fill in the Blanks",
  "True / False",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
];

interface FieldError {
  dueDate?: string;
  questionTypes?: string;
}

interface Step1DetailsProps {
  formData: {
    dueDate: string;
    fileName?: string | null;
    additionalInfo: string;
    questionTypes: QuestionTypeRow[];
  };
  errors: FieldError;
  setErrors: React.Dispatch<React.SetStateAction<FieldError>>;
  dragOver: boolean;
  setDragOver: (value: boolean) => void;
  handleFileChange: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  addQuestionType: () => void;
  updateFormData: (data: Partial<Step1DetailsProps["formData"]>) => void;
  totalQuestions: number;
  totalMarks: number;
}

function QuestionTypeRowComponent({ row }: { row: QuestionTypeRow }) {
  const updateQuestionType = useAssignmentStore((s) => s.updateQuestionType);
  const removeQuestionType = useAssignmentStore((s) => s.removeQuestionType);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        gap: 12,
        width: "100%",
        height: 44,
        flexShrink: 0,
      }}
    >
      {/* Custom dropdown — stays inside layout, no native OS popup */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <QuestionTypeSelect
          id={`qt-type-${row.id}`}
          value={row.type}
          onChange={(v) => updateQuestionType(row.id, "type", v)}
          options={QUESTION_TYPES}
        />
      </div>

      {/* X button — 16×16px */}
      <button
        id={`qt-remove-${row.id}`}
        onClick={() => removeQuestionType(row.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#303030",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          width: 16,
          height: 16,
          flexShrink: 0,
          transition: "opacity 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.opacity = "0.4")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
        }
      >
        <X size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function Step1Details({
  formData,
  errors,
  setErrors,
  dragOver,
  setDragOver,
  handleFileChange,
  fileInputRef,
  addQuestionType,
  updateFormData,
  totalQuestions,
  totalMarks,
}: Step1DetailsProps) {
  const updateQuestionType = useAssignmentStore((s) => s.updateQuestionType);

  return (
    <div
      style={{
        /* Frame 1984077359 */
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 32,
        gap: 32,
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: 32,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* ── Header: Frame 1984077347 ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 0,
          gap: 2,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: "#303030",
            letterSpacing: "-0.04em",
            lineHeight: "140%",
            fontFamily: "inherit",
          }}
        >
          Assignment Details
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(94, 94, 94, 0.8)",
            letterSpacing: "-0.04em",
            lineHeight: "140%",
            fontFamily: "inherit",
          }}
        >
          Basic information about your assignment
        </p>
      </div>

      {/* ── Content area: Frame 1984077364 ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 0,
          gap: 16,
          width: "100%",
        }}
      >
        {/* ── File upload section: Frame 1984077301 ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            gap: 12,
            width: "100%",
          }}
        >
          {/* Upload box: Frame 1618872469 */}
          <div
            id="file-upload-zone"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFileChange(file);
            }}
            onClick={() => fileInputRef.current?.click()}
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px 32px",
              gap: 16,
              width: "100%",
              height: 202,
              background: dragOver ? "rgba(232,73,15,0.03)" : "#FFFFFF",
              border: "none",
              backgroundImage: dragOver
                ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23E8490F' stroke-width='1.75' stroke-dasharray='10%2c 8' stroke-linecap='round'/%3e%3c/svg%3e")`
                : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23000000' stroke-opacity='0.2' stroke-width='1.75' stroke-dasharray='10%2c 8' stroke-linecap='round'/%3e%3c/svg%3e")`,
              borderRadius: 24,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {/* Icon box: Frame 1618872514 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                gap: 10,
                width: 40,
                height: 40,
                background: "#FFFFFF",
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              <Upload size={24} strokeWidth={2.5} color="#1E1E1E" />
            </div>

            {/* Text block: Frame 1618872516 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 4,
                width: "100%",
              }}
            >
              <p
                style={{
                  margin: 0,
                  width: "100%",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  textAlign: "center",
                  fontFamily: "inherit",
                }}
              >
                {formData.fileName ?? "Choose a file or drag & drop it here"}
              </p>
              <p
                style={{
                  margin: 0,
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#A9A9A9",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  textAlign: "center",
                  fontFamily: "inherit",
                }}
              >
                JPEG, PNG, upto 10MB
              </p>
            </div>

            {/* Browse Files button */}
            <button
              id="browse-files-btn"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "8px 24px",
                gap: 4,
                height: 36,
                background: "#F6F6F6",
                borderRadius: 48,
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#EBEBEB")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#F6F6F6")
              }
            >
              Browse Files
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(file);
              }}
            />
          </div>

          {/* "Upload images..." subtitle */}
          <p
            style={{
              margin: 0,
              width: "100%",
              fontSize: 16,
              fontWeight: 500,
              color: "rgba(48, 48, 48, 0.6)",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              textAlign: "center",
              fontFamily: "inherit",
            }}
          >
            Upload images of your preferred document/image
          </p>
        </div>

        {/* ── Due Date section: Frame 1618872464 ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 0,
            gap: 24,
            width: "100%",
          }}
        >
          {/* Frame 1618872457 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: 0,
              gap: 8,
              width: "100%",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                fontSize: 16,
                fontWeight: 700,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: "inherit",
              }}
            >
              Due Date
            </label>

            {/* Input pill: Frame 1618872169 */}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                id="due-date-input"
                className="due-date-input"
                type="text"
                placeholder="DD-MM-YYYY"
                value={formData.dueDate}
                onChange={(e) => {
                  updateFormData({ dueDate: e.target.value });
                  if (errors.dueDate) setErrors((p) => ({ ...p, dueDate: undefined }));
                }}
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 50px 11px 16px",
                  gap: 10,
                  width: "100%",
                  height: 44,
                  border: `1.25px solid ${errors.dueDate ? "#E53935" : "#DADADA"}`,
                  borderRadius: 100,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  background: "transparent",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => {
                  if (!errors.dueDate)
                    (e.target as HTMLInputElement).style.borderColor = "#303030";
                }}
                onBlur={(e) => {
                  if (!errors.dueDate)
                    (e.target as HTMLInputElement).style.borderColor = "#DADADA";
                }}
              />
              <CalendarPlus
                size={24}
                color="#2B2B2B"
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            {errors.dueDate && (
              <p style={{ fontSize: 12, color: "#E53935", margin: 0 }}>{errors.dueDate}</p>
            )}
          </div>
        </div>

        {/* ── Question type section: Frame 1618872171 ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            padding: 0,
            gap: 16,
            width: "100%",
          }}
        >
          {/* Frame 1984077498: left (471px) + right (275px) with gap 64px */}
          {/* Frame 1984077498: left (471px) + right (275px) with gap 32px */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 0,
              gap: 32,
              width: "100%",
            }}
          >
            {/* Left column: Frame 1618872458 — Question Type label + rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 16,
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* "Question Type" header */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  fontFamily: "inherit",
                }}
              >
                Question Type
              </span>

              {/* Rows */}
              {formData.questionTypes.map((row) => (
                <QuestionTypeRowComponent key={row.id} row={row} />
              ))}

              {errors.questionTypes && (
                <p style={{ fontSize: 12, color: "#E53935", margin: 0 }}>
                  {errors.questionTypes}
                </p>
              )}

              {/* Add Question Type button: Frame 1984077500 */}
              <button
                id="add-question-type-btn"
                onClick={() => {
                  addQuestionType();
                  if (errors.questionTypes)
                    setErrors((p) => ({ ...p, questionTypes: undefined }));
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 0,
                  gap: 8,
                  height: 36,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {/* Dark circle button */}
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 8,
                    width: 36,
                    height: 36,
                    background: "#2B2B2B",
                    borderRadius: 48,
                    flexShrink: 0,
                  }}
                >
                  <Plus size={20} strokeWidth={2} color="#FFFFFF" />
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#303030",
                    letterSpacing: "-0.04em",
                    lineHeight: "140%",
                    fontFamily: "inherit",
                  }}
                >
                  Add Question Type
                </span>
              </button>
            </div>

            {/* Right column: Frame 1984077499 — No. of Questions + Marks */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 0,
                gap: 16,
                flex: 1,
              }}
            >
              {/* No. of Questions column: Frame 1618872459 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                  gap: 16,
                  width: 116,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 116,
                    height: 22,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#303030",
                    letterSpacing: "-0.04em",
                    lineHeight: "140%",
                    textAlign: "center",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  No. of Questions
                </span>
                {formData.questionTypes.map((row) => (
                  <Stepper
                    key={row.id}
                    id={`qt-count-${row.id}`}
                    value={row.count}
                    onChange={(v) => updateQuestionType(row.id, "count", v)}
                    min={1}
                    max={50}
                  />
                ))}
              </div>

              {/* Marks column: Frame 1618872460 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                  gap: 16,
                  width: 100,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 100,
                    height: 22,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#303030",
                    letterSpacing: "-0.04em",
                    lineHeight: "140%",
                    textAlign: "center",
                    fontFamily: "inherit",
                  }}
                >
                  Marks
                </span>
                {formData.questionTypes.map((row) => (
                  <Stepper
                    key={row.id}
                    id={`qt-marks-${row.id}`}
                    value={row.marks}
                    onChange={(v) => updateQuestionType(row.id, "marks", v)}
                    min={1}
                    max={100}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Total Questions / Total Marks: Frame 1984077510 */}
          {formData.questionTypes.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 8,
                width: 150,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 150,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "110%",
                  textAlign: "right",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                Total Questions : {totalQuestions}
              </span>
              <span
                style={{
                  width: 150,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "110%",
                  textAlign: "right",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                Total Marks : {totalMarks}
              </span>
            </div>
          )}
        </div>

        {/* ── Additional Information: Frame 1984077522 ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            gap: 8,
            width: "100%",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#303030",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              fontFamily: "inherit",
            }}
          >
            Additional Information&nbsp;
            <span style={{ fontWeight: 400, color: "rgba(48,48,48,0.5)" }}>
              (For better output)
            </span>
          </label>

          {/* Textarea box: Frame 1984077611 */}
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: 16,
              gap: 10,
              width: "100%",
              height: 102,
              border: "none",
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23DADADA' stroke-width='1.25' stroke-dasharray='10%2c 8' stroke-linecap='round'/%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              borderRadius: 16,
              position: "relative",
            }}
          >
            <textarea
              id="additional-info-textarea"
              className="additional-info-textarea"
              value={formData.additionalInfo}
              onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              style={{
                width: "100%",
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 14,
                fontWeight: 500,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: "inherit",
                resize: "none",
                padding: 0,
                alignSelf: "stretch",
              }}
            />

            {/* Mic button: Frame 1984077290 */}
            <button
              type="button"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 0.82px",
                gap: 8.18,
                width: 36,
                height: 36,
                background: "#F0F0F0",
                borderRadius: 18,
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#E0E0E0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#F0F0F0")
              }
            >
              <Mic size={16} color="#303030" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
