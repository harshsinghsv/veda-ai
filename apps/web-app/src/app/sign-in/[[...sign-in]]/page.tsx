"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="veda-auth-root">
      {/* Animated background */}
      <div className="veda-auth-bg">
        <div className="veda-auth-orb veda-auth-orb--1" />
        <div className="veda-auth-orb veda-auth-orb--2" />
        <div className="veda-auth-orb veda-auth-orb--3" />
      </div>

      <div className="veda-auth-layout">
        {/* Left branding panel */}
        <div className="veda-auth-brand">
          <div className="veda-auth-brand__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo 2.svg" alt="VedaAI" width={56} height={50} style={{ filter: "brightness(0) invert(1)" }} />
            <span className="veda-auth-brand__wordmark">VedaAI</span>
          </div>
          <div className="veda-auth-brand__copy">
            <h1 className="veda-auth-brand__headline">
              AI-powered<br />question papers,<br />
              <span className="veda-auth-brand__accent">in seconds.</span>
            </h1>
            <p className="veda-auth-brand__sub">
              Generate customized, curriculum-aligned assignments with the power of AI. Built for teachers who value their time.
            </p>
          </div>
          <div className="veda-auth-brand__chips">
            {["Smart Generation", "Auto Answer Keys", "Mobile Ready"].map((chip) => (
              <span key={chip} className="veda-auth-brand__chip">✦ {chip}</span>
            ))}
          </div>
        </div>

        {/* Right: Clerk form */}
        <div className="veda-auth-form-wrap">
          <SignIn
            appearance={{
              elements: {
                rootBox: "veda-clerk-root",
                card: "veda-clerk-card",
                headerTitle: "veda-clerk-header-title",
                headerSubtitle: "veda-clerk-header-subtitle",
                formButtonPrimary: "veda-clerk-btn-primary",
                formFieldInput: "veda-clerk-input",
                footerActionLink: "veda-clerk-footer-link",
                dividerLine: "veda-clerk-divider-line",
                dividerText: "veda-clerk-divider-text",
                socialButtonsBlockButton: "veda-clerk-social-btn",
                identityPreviewText: "veda-clerk-identity-text",
              },
            }}
          />
        </div>
      </div>

      <style>{`
        .veda-auth-root {
          min-height: 100vh;
          background: #0e0e0e;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: var(--font-plus-jakarta), sans-serif;
        }

        /* Animated orbs */
        .veda-auth-bg { position: absolute; inset: 0; pointer-events: none; }
        .veda-auth-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: orbFloat 12s ease-in-out infinite;
        }
        .veda-auth-orb--1 {
          width: 560px; height: 560px;
          background: radial-gradient(circle, #ff7243, #c93d08);
          top: -120px; left: -120px;
          animation-delay: 0s;
        }
        .veda-auth-orb--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #a855f7, #6366f1);
          bottom: -80px; right: 20%;
          animation-delay: -4s;
        }
        .veda-auth-orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #22d3ee, #0891b2);
          top: 40%; right: -60px;
          animation-delay: -8s;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.06); }
        }

        /* Layout */
        .veda-auth-layout {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 80px;
          width: 100%;
          max-width: 1100px;
          padding: 40px 24px;
          box-sizing: border-box;
        }

        /* Brand */
        .veda-auth-brand {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 40px;
          color: #fff;
        }
        .veda-auth-brand__logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .veda-auth-brand__wordmark {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
        }
        .veda-auth-brand__headline {
          font-family: var(--font-bricolage), sans-serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .veda-auth-brand__accent {
          background: linear-gradient(90deg, #ff7243, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .veda-auth-brand__sub {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          margin: 0;
          max-width: 420px;
        }
        .veda-auth-brand__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .veda-auth-brand__chip {
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.05);
          letter-spacing: -0.01em;
        }

        /* Clerk card wrapper */
        .veda-auth-form-wrap {
          flex-shrink: 0;
          width: 420px;
        }

        /* Override Clerk card */
        .veda-clerk-root { width: 100% !important; }
        .veda-clerk-card {
          background: rgba(255,255,255,0.05) !important;
          backdrop-filter: blur(24px) !important;
          -webkit-backdrop-filter: blur(24px) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 24px !important;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4) !important;
          padding: 40px 32px !important;
          color: #fff !important;
        }
        .veda-clerk-header-title {
          color: #fff !important;
          font-family: var(--font-bricolage), sans-serif !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          letter-spacing: -0.04em !important;
        }
        .veda-clerk-header-subtitle {
          color: rgba(255,255,255,0.5) !important;
          font-size: 14px !important;
        }
        .veda-clerk-btn-primary {
          background: linear-gradient(135deg, #ff7243, #c93d08) !important;
          border: none !important;
          border-radius: 12px !important;
          font-weight: 600 !important;
          font-size: 15px !important;
          height: 48px !important;
          transition: opacity 0.2s !important;
        }
        .veda-clerk-btn-primary:hover { opacity: 0.88 !important; }
        .veda-clerk-input {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          border-radius: 10px !important;
          color: #fff !important;
          height: 44px !important;
        }
        .veda-clerk-input:focus {
          border-color: #ff7243 !important;
          outline: none !important;
        }
        .veda-clerk-footer-link { color: #ff7243 !important; }
        .veda-clerk-divider-line { background: rgba(255,255,255,0.12) !important; }
        .veda-clerk-divider-text { color: rgba(255,255,255,0.4) !important; }
        .veda-clerk-social-btn {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          border-radius: 10px !important;
          color: #fff !important;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .veda-auth-layout { flex-direction: column; gap: 32px; align-items: center; }
          .veda-auth-brand { align-items: center; text-align: center; }
          .veda-auth-brand__sub { text-align: center; }
          .veda-auth-brand__chips { justify-content: center; }
          .veda-auth-form-wrap { width: 100%; max-width: 420px; }
        }
      `}</style>
    </div>
  );
}
