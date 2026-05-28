"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid, ChevronDown, Sparkles } from "lucide-react";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  disableBack?: boolean;
  showTitleIcon?: boolean;
}

export default function Header({ title, showBack = true, disableBack = false, showTitleIcon = true }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAssignmentsRoot = pathname === "/assignments";

  return (
    /*
     * Frame 1618872397 — 1100×56px, padding 0px 12px 0px 24px, gap 10px
     * background: rgba(255,255,255,0.75), border-radius: 16px
     */
    <div
      style={{
        margin: 0,
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid rgba(255,255,255,0.6)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 24,
          paddingRight: 12,
        }}
      >
        {/* ── Left: back arrow + breadcrumb ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {showBack && (
            <button
              id="header-back-btn"
              disabled={disableBack}
              onClick={() => {
                if (!disableBack) router.back();
              }}
              style={{
                background: "#ffffff",
                border: "none",
                cursor: disableBack ? "not-allowed" : "pointer",
                opacity: disableBack ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                color: "#1A1A1A",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "background 0.14s",
              }}
              onMouseEnter={(e) => {
                if (!disableBack) (e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4";
              }}
              onMouseLeave={(e) => {
                if (!disableBack) (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              }}
            >
              <ArrowLeft size={24} strokeWidth={2} />
            </button>
          )}
          {showTitleIcon && (
            isAssignmentsRoot
              ? <LayoutGrid size={20} color="#A9A9A9" strokeWidth={1.8} />
              : <Sparkles size={18} color="#AAAAAA" />
          )}
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#8A8A8A",
              fontFamily: "inherit",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </span>
        </div>

        {/* ── Right: bell + user ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {/* Bell with orange dot */}
          <div
            style={{
              position: "relative",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#F5F5F5",
            }}
          >
            {/* Bell icon — outlined style */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4B4B4B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Orange dot badge */}
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 6,
                width: 8,
                height: 8,
                background: "#E8490F",
                borderRadius: "50%",
                border: "1.5px solid #ffffff",
              }}
            />
          </div>

          {/* User section */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: 157,
              height: 44,
              gap: 8,
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: 12,
              background: "linear-gradient(90deg, #ffffff 40.5%, rgba(255, 255, 255, 0) 64.5%)",
              boxShadow: "-8px 4px 12px rgba(0, 0, 0, 0.02)",
              transition: "box-shadow 0.14s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(90deg, #F9F9F9 40.5%, rgba(255, 255, 255, 0) 64.5%)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "-8px 4px 16px rgba(0, 0, 0, 0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(90deg, #ffffff 40.5%, rgba(255, 255, 255, 0) 64.5%)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "-8px 4px 12px rgba(0, 0, 0, 0.02)";
            }}
          >
            {/* Avatar — circular image with fallback */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                gap: 10,
                width: 32,
                height: 32,
                borderRadius: 100,
                overflow: "hidden",
                flexShrink: 0,
                background: "#F6F6F6",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe&backgroundColor=b6e3f4"
                alt="John Doe"
                width={32}
                height={32}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  // Fallback to gradient initial on error
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<div style="width:30px;height:30px;borderRadius:50%;background:linear-gradient(135deg,#f5a623,#e8490f);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;">J</div>`;
                  }
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 0,
                gap: 4,
                width: 93,
                height: 24,
              }}
            >
              {/* Name */}
              <span
                style={{
                  width: 65,
                  height: 19,
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "19px",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "-0.04em",
                  color: "#303030",
                }}
              >
                John Doe
              </span>

              {/* Chevron */}
              <ChevronDown size={24} color="#303030" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
