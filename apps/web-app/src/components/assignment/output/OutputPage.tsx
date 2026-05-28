"use client";

import React from "react";
import { Download } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { GeneratedPaper } from "@/types/assignment";
import QuestionSection from "@/components/assignment/output/QuestionSection";
import AnswerKeySection from "@/components/assignment/output/AnswerKeySection";

// ── Shared tokens ─────────────────────────────────────────────────────────────
const inter = "'Inter', sans-serif";
const bricolage = "'Bricolage Grotesque', sans-serif";
const primary = "#303030";

// ── Paper content: Frame 1618872449 ──────────────────────────────────────────
function PaperContent({ paper }: { paper: GeneratedPaper }) {
  return (
    <div
      className="paper-font"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 32,
        gap: 24,
        width: "100%",
        background: "#FFFFFF",
        borderRadius: 32,
        boxSizing: "border-box",
        fontFamily: inter,
      }}
    >
      {/* ── School / Subject / Class — 32px/700, centered ── */}
      <div
        style={{
          width: "100%",
          fontSize: 32,
          fontWeight: 700,
          lineHeight: "160%",
          textAlign: "center",
          letterSpacing: "-0.04em",
          color: primary,
          fontFamily: inter,
        }}
      >
        {paper.school}
        <br />
        {paper.subject ? `Subject: ${paper.subject}` : ""}
        <br />
        {paper.class ? `Class: ${paper.class}` : ""}
      </div>

      {/* ── Frame 1984077298: Time Allowed + Maximum Marks ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          width: "100%",
          height: 29,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primary,
            fontFamily: inter,
          }}
        >
          Time Allowed: {paper.timeAllowed}
        </span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primary,
            fontFamily: inter,
          }}
        >
          Maximum Marks: {paper.maxMarks}
        </span>
      </div>

      {/* ── Frame 1984077299: General instruction ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          width: "100%",
          height: 29,
        }}
      >
        <span
          style={{
            width: "100%",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primary,
            fontFamily: inter,
            display: "flex",
            alignItems: "center",
          }}
        >
          All questions are compulsory unless stated otherwise.
        </span>
      </div>

      {/* ── Frame 1984077300: Student info fields ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 0,
          width: "100%",
        }}
      >
        {[
          "Name: ______________________",
          "Roll Number: ________________",
          `Class: ${paper.class ?? "____"}   Section: __________`,
        ].map((line) => (
          <span
            key={line}
            style={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "160%",
              letterSpacing: "-0.04em",
              color: primary,
              fontFamily: inter,
              display: "flex",
              alignItems: "center",
              height: 29,
            }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* ── Sections ── */}
      {paper.sections
        .filter((s) => s.questions.length > 0)
        .map((section) => (
          <QuestionSection key={section.title} section={section} />
        ))}

      {/* ── Answer Key ── */}
      <AnswerKeySection paper={paper} />
    </div>
  );
}

// ── Main output page ──────────────────────────────────────────────────────────
export default function OutputPage() {
  const generatedOutput = useAssignmentStore((s) => s.generatedOutput);
  const isGenerating = useAssignmentStore((s) => s.isGenerating);
  const formData = useAssignmentStore((s) => s.formData);

  const handleDownload = () => {
    window.print();
  };

  // Intro message shown in the dark header
  const introText = isGenerating
    ? "Generating your question paper…"
    : generatedOutput
    ? `Here is your customized question paper for ${formData.class} ${formData.subject}${formData.school ? ` at ${formData.school}` : ""}.`
    : "No assignment generated yet.";

  return (
    <div style={{ padding: 0 }}>
      {/* ── Outer dark container: Frame 1618872395 ── */}
      <div
        style={{
          background: "#5E5E5E",
          borderRadius: 32,
          padding: 20,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxSizing: "border-box",
        }}
      >
        {/* ── Dark header bar: Frame 1618872450 ── */}
        {/* Figma: column layout, rgba(24,24,24,0.8), 32px radius, 24px/32px padding, gap 24px */}
        <div
          style={{
            background: "rgba(24, 24, 24, 0.8)",
            borderRadius: 32,
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 24,
            boxSizing: "border-box",
            width: "100%",
            minHeight: 164,
          }}
        >
          {/* Frame 1618872453 > Frame 1984077288 — title text */}
          <p
            style={{
              margin: 0,
              width: "100%",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: "140%",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              fontFamily: bricolage,
            }}
          >
            {introText}
          </p>

          {/* Frame 1618872463 > Frame 1618872346 — Download button */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <button
              id="download-pdf-btn"
              onClick={handleDownload}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 24px",
                gap: 4,
                width: 200,
                height: 44,
                background: "#FFFFFF",
                color: primary,
                border: "none",
                borderRadius: 100,
                cursor: "pointer",
                fontFamily: bricolage,
                transition: "opacity 0.15s",
                flexShrink: 0,
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
            >
              {/* Frame 1984077260 */}
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Download size={24} color={primary} strokeWidth={1.75} />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "22px",
                    letterSpacing: "-0.04em",
                    color: primary,
                    fontFamily: bricolage,
                    whiteSpace: "nowrap",
                  }}
                >
                  Download as PDF
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* ── White paper card: Frame 1618872449 ── */}
        <div
          style={{
            borderRadius: 32,
            overflow: "hidden",
          }}
        >
          {generatedOutput ? (
            <PaperContent paper={generatedOutput} />
          ) : (
            <div
              style={{
                padding: "48px 32px",
                textAlign: "center",
                color: "#8C8C8C",
                fontFamily: inter,
                fontSize: 16,
                background: "#FFFFFF",
                borderRadius: 32,
              }}
            >
              {isGenerating
                ? "Generating your assignment…"
                : "No assignment generated yet."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
