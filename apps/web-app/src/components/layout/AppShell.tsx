"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

interface AppShellProps {
  children: React.ReactNode;
  headerTitle?: string;
  showBack?: boolean;
  disableBack?: boolean;
  showTitleIcon?: boolean;
  footerSlot?: React.ReactNode;
}

export default function AppShell({
  children,
  headerTitle = "Assignment",
  showBack = true,
  disableBack = false,
  showTitleIcon = true,
  footerSlot,
}: AppShellProps) {
  return (
    /*
     * Full-screen centering shell — constrains the app to 1440px (Figma frame)
     * and centers it horizontally on ultra-wide displays.
     */
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%)",
        overflow: "visible",
      }}
    >
    {/*
     * Outer gray canvas — max 1440px, 12px padding on all sides, 12px gap.
     * Both sidebar and right panel float inside this canvas.
     */}
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: 1440,
        height: "100vh",
        padding: 12,
        gap: 12,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT: Sidebar — white floating card ── */}
      <div style={{ flexShrink: 0 }}>
        <aside
          style={{
            width: 304,
            minWidth: 304,
            height: "100%",
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "12px 16px 28px rgba(0, 0, 0, 0.16), 4px 6px 12px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Sidebar />
        </aside>
      </div>

      {/*
       * ── RIGHT: layout container ──
       * Same bg as outer canvas — transparent to canvas.
       * No overflow:hidden needed — header is a self-contained floating card.
       */}
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "transparent",
          minWidth: 0,
        }}
      >
        {/* White header bar — its top corners are clipped by parent borderRadius */}
        <Header title={headerTitle} showBack={showBack} disableBack={disableBack} showTitleIcon={showTitleIcon} />

        {/* Scrollable content — sits directly on the outer/primary gray */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            minHeight: 0,
            paddingTop: 12,
            paddingBottom: 10,
          }}
        >
          {children}
        </main>

        {/* Optional pinned footer (e.g. form Prev/Next) */}
        {footerSlot}
      </div>
    </div>
    </div>
  );
}
