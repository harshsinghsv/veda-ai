"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";

interface AssignmentCardMenuProps {
  assignmentId: string;
}

export default function AssignmentCardMenu({ assignmentId }: AssignmentCardMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteAssignment = useAssignmentStore((s) => s.deleteAssignment);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        id={`card-menu-${assignmentId}`}
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen((v) => !v);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          borderRadius: 6,
          color: "#888888",
          display: "flex",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
        }
      >
        <MoreVertical size={18} />
      </button>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 0,
            width: 140,
            height: 84,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            gap: 4,
            background: "#FFFFFF",
            boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.2), 0px 32px 48px rgba(0, 0, 0, 0.05)",
            borderRadius: 16,
            zIndex: 50,
            boxSizing: "border-box",
          }}
        >
          <button
            id={`view-${assignmentId}`}
            onClick={() => {
              setDropdownOpen(false);
              router.push("/assignments/output");
            }}
            style={{
              width: 124,
              height: 32,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 8px",
              gap: 10,
              background: "none",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.12s",
              boxSizing: "border-box",
              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            <span
              style={{
                width: 108,
                height: 20,
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "-0.04em",
                color: "#303030",
                whiteSpace: "nowrap",
              }}
            >
              View Assignment
            </span>
          </button>
          <button
            id={`delete-${assignmentId}`}
            onClick={() => {
              setDropdownOpen(false);
              deleteAssignment(assignmentId);
            }}
            style={{
              width: 124,
              height: 32,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 8px",
              gap: 10,
              background: "#F6F6F6",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.12s",
              boxSizing: "border-box",
              flex: "none",
              order: 1,
              alignSelf: "stretch",
              flexGrow: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#EBEBEB")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#F6F6F6")
            }
          >
            <span
              style={{
                width: 108,
                height: 20,
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "-0.04em",
                color: "#C53535",
                whiteSpace: "nowrap",
              }}
            >
              Delete
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
