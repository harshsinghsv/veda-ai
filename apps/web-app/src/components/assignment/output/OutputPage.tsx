"use client";

import React from "react";
import dynamic from "next/dynamic";
import generatingAnimation from "../../../../public/generating.json";
import { useAssignmentStore } from "@/store/assignmentStore";
import { GeneratedPaper } from "@/types/assignment";
import QuestionSection from "@/components/assignment/output/QuestionSection";
import AnswerKeySection from "@/components/assignment/output/AnswerKeySection";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ── Shared tokens ─────────────────────────────────────────────────────────────
const inter = "'Inter', sans-serif";
const bricolage = "'Bricolage Grotesque', sans-serif";
const primary = "#303030";

// ── Paper content: Frame 1618872449 ──────────────────────────────────────────
function PaperContent({ paper }: { paper: GeneratedPaper }) {
  return (
    <div
      className="output-paper paper-font"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 32,
        gap: 24,
        width: 1060,
        maxWidth: "100%",
        minHeight: 1465,
        background: "#FFFFFF",
        borderRadius: 32,
        boxSizing: "border-box",
        fontFamily: inter,
        margin: "0 auto",
      }}
    >
      {/* ── Delhi Public School Header ── */}
      <div
        className="output-paper__title"
        style={{
          width: "100%",
          maxWidth: 996,
          minHeight: 124,
          fontSize: 32,
          fontWeight: 700,
          lineHeight: "160%",
          textAlign: "center",
          letterSpacing: "-0.04em",
          color: primary,
          fontFamily: inter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>{paper.school}</span>
        <span>Subject: {paper.subject}</span>
        <span>Class: {paper.class}</span>
      </div>

      {/* ── Frame 1984077298: Time Allowed + Maximum Marks ── */}
      <div
        className="output-paper__meta"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          gap: 10,
          width: "100%",
          maxWidth: 996,
          height: 29,
        }}
      >
        <span
          className="output-paper__meta-item"
          style={{
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
          Time Allowed: {paper.timeAllowed}
        </span>
        <span
          className="output-paper__meta-item"
          style={{
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
          padding: 0,
          gap: 10,
          width: "100%",
          maxWidth: 996,
          height: 29,
        }}
      >
        <span
          className="output-paper__compulsory-text"
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
        className="output-paper__student"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 0,
          width: "100%",
          maxWidth: 996,
          height: 87,
        }}
      >
        {[
          "Name: ______________________",
          "Roll Number: ________________",
          `Class: ${paper.class ?? "____"} Section: __________`,
        ].map((line) => (
          <span
            key={line}
            className="output-paper__student-line"
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

  // ── Empty state: not generating, no output ──────────────────────────────
  if (!isGenerating && !generatedOutput) {
    return (
      <div style={{ padding: 0, height: "100%" }}>
        <div
          className="output-outer"
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
          <div
            className="output-header"
            style={{
              background: "rgba(24, 24, 24, 0.8)",
              borderRadius: 32,
              padding: "24px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            <p
              className="output-header__intro"
              style={{
                margin: 0,
                width: "100%",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: bricolage,
              }}
            >
              No assignment generated yet.
            </p>
          </div>
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
            Generate an assignment to see your question paper here.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 0, height: "100%" }}>
      {isGenerating ? (
        /* ── Full-height generating state ── */
        <div
          className="output-generating"
          style={{
            background: "rgba(24, 24, 24, 0.92)",
            borderRadius: 32,
            width: "100%",
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            boxSizing: "border-box",
            padding: 40,
          }}
        >
          <Lottie
            animationData={generatingAnimation}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: bricolage,
                textAlign: "center",
              }}
            >
              Generating your question paper…
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "-0.02em",
                lineHeight: "150%",
                fontFamily: inter,
                textAlign: "center",
              }}
            >
              This may take a few moments. Please don&apos;t close the tab.
            </p>
          </div>
        </div>
      ) : (
        /* ── Outer dark container: Frame 1618872395 ── */
        <div
        className="output-outer"
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
          className="output-header"
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
            className="output-header__intro"
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
            className="output-download-desktop"
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.92243 3.57745C9.24786 3.90289 9.24786 4.43053 8.92243 4.75596L4.51168 9.16671H17.4998C17.9601 9.16671 18.3332 9.5398 18.3332 10C18.3332 10.4603 17.9601 10.8334 17.4998 10.8334H4.51168L8.92243 15.2441C9.24786 15.5696 9.24786 16.0972 8.92243 16.4226C8.59699 16.7481 8.06935 16.7481 7.74391 16.4226L1.91058 10.5893C1.58514 10.2639 1.58514 9.73622 1.91058 9.41079L7.74391 3.57745C8.06935 3.25201 8.59699 3.25201 8.92243 3.57745Z" fill="#303030"/>
                </svg>
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

          {/* Mobile icon-only download button */}
          <button
            className="output-download-mobile"
            id="download-pdf-btn-mobile"
            onClick={handleDownload}
            style={{
              display: "none",
              width: 36,
              height: 36,
              background: "rgba(246, 246, 246, 0.1)",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 2.5C10.4602 2.5 10.8333 2.8731 10.8333 3.33333V11.1548L13.2441 8.74408C13.5696 8.41864 14.0972 8.41864 14.4226 8.74408C14.7481 9.06951 14.7481 9.59715 14.4226 9.92259L10.5893 13.7559C10.2639 14.0814 9.73622 14.0814 9.41079 13.7559L5.57745 9.92259C5.25201 9.59715 5.25201 9.06951 5.57745 8.74408C5.90289 8.41864 6.43053 8.41864 6.75596 8.74408L9.16667 11.1548V3.33333C9.16667 2.8731 9.53976 2.5 10 2.5ZM3.33333 14.1667C3.79357 14.1667 4.16667 14.5398 4.16667 15V16.6667H15.8333V15C15.8333 14.5398 16.2064 14.1667 16.6667 14.1667C17.1269 14.1667 17.5 14.5398 17.5 15V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667Z" fill="white"/>
            </svg>
          </button>
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
              No assignment generated yet.
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
