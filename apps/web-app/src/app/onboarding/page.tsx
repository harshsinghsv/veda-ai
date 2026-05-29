"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  useUserProfileStore,
  AVATAR_SEEDS,
  avatarUrl,
  type AvatarSeed,
} from "@/store/userProfileStore";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const completeOnboarding = useUserProfileStore((s) => s.completeOnboarding);

  // Pre-fill name from Clerk
  const defaultName =
    user?.firstName
      ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
      : user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "";

  const [name, setName] = useState(defaultName);
  const [school, setSchool] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarSeed>("Felix");
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  // Update name once user loads
  React.useEffect(() => {
    if (user && !name) {
      const n = user.firstName
        ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
        : user.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "";
      setName(n);
    }
  }, [user, name]);

  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#ff7243", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleFinish = async () => {
    if (!school.trim()) return;
    setLoading(true);
    completeOnboarding(school.trim(), selectedAvatar);
    // Small delay for visual feedback
    await new Promise((r) => setTimeout(r, 400));
    router.push("/assignments");
  };

  return (
    <div className="ob-root">
      {/* Background */}
      <div className="ob-bg">
        <div className="ob-orb ob-orb--1" />
        <div className="ob-orb ob-orb--2" />
      </div>

      {/* Card */}
      <div className="ob-card">
        {/* Logo */}
        <div className="ob-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo 2.svg" alt="VedaAI" width={36} height={32} style={{ filter: "brightness(0) invert(1)" }} />
          <span className="ob-logo__text">VedaAI</span>
        </div>

        {/* Progress dots */}
        <div className="ob-progress">
          <div className={`ob-dot ${step >= 1 ? "ob-dot--active" : ""}`} />
          <div className="ob-progress__line" />
          <div className={`ob-dot ${step >= 2 ? "ob-dot--active" : ""}`} />
        </div>

        {step === 1 && (
          <div className="ob-step ob-step--enter">
            <h1 className="ob-title">Welcome to VedaAI 👋</h1>
            <p className="ob-subtitle">Let&apos;s set up your teacher profile. This takes 30 seconds.</p>

            {/* Name */}
            <div className="ob-field">
              <label className="ob-label">Your name</label>
              <input
                className="ob-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                autoFocus
              />
            </div>

            {/* School */}
            <div className="ob-field">
              <label className="ob-label">School name</label>
              <input
                className="ob-input"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Delhi Public School, Bokaro"
                onKeyDown={(e) => e.key === "Enter" && name && school && setStep(2)}
              />
              <span className="ob-hint">This appears on your question papers automatically.</span>
            </div>

            <button
              className="ob-btn ob-btn--primary"
              disabled={!name.trim() || !school.trim()}
              onClick={() => setStep(2)}
            >
              Next — Choose your avatar →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="ob-step ob-step--enter">
            <h1 className="ob-title">Pick your avatar</h1>
            <p className="ob-subtitle">This will appear in the header and across the app.</p>

            <div className="ob-avatar-grid">
              {AVATAR_SEEDS.map((seed) => (
                <button
                  key={seed}
                  className={`ob-avatar-btn ${selectedAvatar === seed ? "ob-avatar-btn--selected" : ""}`}
                  onClick={() => setSelectedAvatar(seed)}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl(seed)}
                    alt={seed}
                    width={64}
                    height={64}
                    className="ob-avatar-img"
                  />
                  {selectedAvatar === seed && (
                    <div className="ob-avatar-check">✓</div>
                  )}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="ob-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl(selectedAvatar)} alt="preview" width={52} height={52} className="ob-preview__avatar" />
              <div className="ob-preview__info">
                <span className="ob-preview__name">{name || "Your Name"}</span>
                <span className="ob-preview__school">{school || "Your School"}</span>
              </div>
            </div>

            <div className="ob-btn-row">
              <button className="ob-btn ob-btn--ghost" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="ob-btn ob-btn--primary"
                onClick={handleFinish}
                disabled={loading}
              >
                {loading ? "Setting up…" : "Let's go! 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.05); }
        }

        .ob-root {
          min-height: 100vh;
          background: #0e0e0e;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
          font-family: var(--font-plus-jakarta), sans-serif;
        }
        .ob-bg { position: absolute; inset: 0; pointer-events: none; }
        .ob-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.14;
          animation: orbFloat 10s ease-in-out infinite;
        }
        .ob-orb--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #ff7243, #c93d08);
          top: -150px; left: -100px;
        }
        .ob-orb--2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #a855f7, #6366f1);
          bottom: -100px; right: -50px;
          animation-delay: -5s;
        }

        .ob-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 500px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 40px 36px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
          box-sizing: border-box;
        }

        .ob-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .ob-logo__text {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
        }

        .ob-progress {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .ob-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: background 0.3s;
        }
        .ob-dot--active { background: #ff7243; }
        .ob-progress__line {
          flex: 1;
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 1px;
        }

        .ob-step { animation: fadeUp 0.3s ease both; }

        .ob-title {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
          margin: 0 0 8px;
        }
        .ob-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin: 0 0 28px;
          line-height: 1.5;
        }

        .ob-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .ob-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); letter-spacing: -0.01em; }
        .ob-input {
          width: 100%;
          height: 48px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 0 16px;
          font-size: 15px;
          font-family: inherit;
          color: #fff;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .ob-input::placeholder { color: rgba(255,255,255,0.3); }
        .ob-input:focus { border-color: #ff7243; background: rgba(255,255,255,0.1); }
        .ob-hint { font-size: 12px; color: rgba(255,255,255,0.35); }

        .ob-btn {
          height: 50px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: opacity 0.18s, background 0.18s;
          border: none;
        }
        .ob-btn--primary {
          width: 100%;
          background: linear-gradient(135deg, #ff7243, #c93d08);
          color: #fff;
          margin-top: 8px;
        }
        .ob-btn--primary:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .ob-btn--primary:not(:disabled):hover { opacity: 0.88; }
        .ob-btn--ghost {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0 24px;
        }
        .ob-btn--ghost:hover { background: rgba(255,255,255,0.12); }

        .ob-btn-row {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .ob-btn-row .ob-btn--primary { flex: 1; margin-top: 0; }

        /* Avatar grid */
        .ob-avatar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .ob-avatar-btn {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 18px;
          border: 2px solid transparent;
          background: rgba(255,255,255,0.06);
          cursor: pointer;
          padding: 8px;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ob-avatar-btn:hover { background: rgba(255,255,255,0.1); transform: scale(1.04); }
        .ob-avatar-btn--selected {
          border-color: #ff7243;
          background: rgba(255,114,67,0.1);
        }
        .ob-avatar-img { width: 100%; height: 100%; object-fit: contain; border-radius: 12px; }
        .ob-avatar-check {
          position: absolute;
          top: 4px; right: 4px;
          width: 20px; height: 20px;
          background: #ff7243;
          border-radius: 50%;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Preview */
        .ob-preview {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          margin-bottom: 20px;
        }
        .ob-preview__avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          flex-shrink: 0;
          object-fit: cover;
        }
        .ob-preview__info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ob-preview__name {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .ob-preview__school {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
        }
      `}</style>
    </div>
  );
}
