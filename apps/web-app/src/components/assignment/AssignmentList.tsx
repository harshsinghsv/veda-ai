"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import AssignmentEmptyState from "@/components/assignment/AssignmentEmptyState";

export default function AssignmentList() {
  const assignments = useAssignmentStore((s) => s.assignments);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  // Show empty state when there are no assignments at all
  if (assignments.length === 0) {
    return <AssignmentEmptyState />;
  }

  return (
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 20, paddingBottom: 120 }}>

        {/* Title — plain on grey background, no card */}
        <div
          style={{
            marginBottom: 12,
            paddingLeft: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#4BC26D",
              border: "4px solid rgba(75, 194, 109, 0.4)",
              display: "inline-block",
              flexShrink: 0,
              boxShadow: "0px 16px 48px rgba(0,0,0,0.12), 0px 32px 48px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#303030",
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              Assignments
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(94, 94, 94, 0.55)",
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              Manage and create assignments for your classes.
            </p>
          </div>
        </div>


        {/* Card 2 — Filter row */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            height: 64,
            width: "100%",
            marginBottom: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 16px",
            gap: 36,
            flex: "none",
            order: 1,
            alignSelf: "stretch",
            flexGrow: 0,
            zIndex: 4,
            boxSizing: "border-box",
          }}
        >
          <button
            id="filter-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              color: "#A9A9A9",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9A9A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter By
          </button>

          <div style={{ position: "relative", width: 380 }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A8A8A"
              strokeWidth="2"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="assignment-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Assignment"
              style={{
                width: "100%",
                height: 44,
                paddingLeft: 44,
                paddingRight: 16,
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                color: "#A9A9A9",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                background: "#ffffff",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E8490F")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E2E2E2")}
            />
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            paddingTop: 4,
          }}
        >
          {filtered.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>

      {/* Bottom blur fade + centered button */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          background: "linear-gradient(to top, rgba(220,220,220,0.98) 30%, rgba(220,220,220,0) 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 24,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <button
          id="list-create-btn"
          onClick={() => router.push("/assignments/create")}
          style={{
            pointerEvents: "all",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 46,
            padding: "0 28px",
            background: "linear-gradient(#1C1C1C, #1C1C1C) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
            color: "#ffffff",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.18s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <Plus size={17} />
          Create Assignment
        </button>
      </div>
    </div>
  );
}
