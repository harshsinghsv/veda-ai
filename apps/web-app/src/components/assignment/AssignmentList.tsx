"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 2.32153C0 1.03938 1.03938 0 2.32153 0H12.6785C13.9606 0 15 1.03938 15 2.32153C15 2.99412 14.7594 3.64453 14.3217 4.1552L11.9599 6.91062C11.0537 7.96787 10.5556 9.31442 10.5556 10.7069V12.5C10.5556 13.8807 9.43627 15 8.05556 15H6.94444C5.56373 15 4.44444 13.8807 4.44444 12.5V10.7069C4.44444 9.31442 3.94632 7.96787 3.04011 6.91062L0.678317 4.1552C0.240601 3.64453 0 2.99412 0 2.32153ZM2.32153 1.66667C1.95986 1.66667 1.66667 1.95986 1.66667 2.32153C1.66667 2.59627 1.76495 2.86195 1.94375 3.07054L4.30554 5.82597C5.47067 7.18529 6.11111 8.91657 6.11111 10.7069V12.5C6.11111 12.9602 6.48421 13.3333 6.94444 13.3333H8.05556C8.51579 13.3333 8.88889 12.9602 8.88889 12.5V10.7069C8.88889 8.91657 9.52933 7.18529 10.6945 5.82597L13.0563 3.07054C13.2351 2.86195 13.3333 2.59627 13.3333 2.32153C13.3333 1.95986 13.0401 1.66667 12.6785 1.66667H2.32153Z" fill="#A9A9A9"/>
            </svg>
            Filter By
          </button>

          <div style={{ position: "relative", width: 380 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M7.5 1.66667C4.27834 1.66667 1.66667 4.27834 1.66667 7.5C1.66667 10.7217 4.27834 13.3333 7.5 13.3333C10.7217 13.3333 13.3333 10.7217 13.3333 7.5C13.3333 4.27834 10.7217 1.66667 7.5 1.66667ZM0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5Z" fill="#A9A9A9"/>
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
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 7.49996C0 7.03972 0.373096 6.66663 0.833333 6.66663H14.1667C14.6269 6.66663 15 7.03972 15 7.49996C15 7.9602 14.6269 8.33329 14.1667 8.33329H0.833333C0.373096 8.33329 0 7.9602 0 7.49996Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.49992 -3.64262e-08C7.96016 -1.63085e-08 8.33325 0.373096 8.33325 0.833333L8.33325 14.1667C8.33325 14.6269 7.96016 15 7.49992 15C7.03968 15 6.66658 14.6269 6.66658 14.1667L6.66659 0.833333C6.66659 0.373096 7.03968 -5.65438e-08 7.49992 -3.64262e-08Z" fill="white"/>
          </svg>
          Create Assignment
        </button>
      </div>
    </div>
  );
}
