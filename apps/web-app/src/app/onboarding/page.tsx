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

  const defaultName =
    user?.firstName
      ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
      : user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "";

  const [name, setName] = useState(defaultName);
  const [school, setSchool] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarSeed>("Felix");
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

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
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid rgba(0,0,0,0.1)", borderTopColor: "#E8490F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleFinish = async () => {
    if (!school.trim()) return;
    setLoading(true);
    completeOnboarding(school.trim(), selectedAvatar);
    await new Promise((r) => setTimeout(r, 300));
    router.push("/assignments");
  };

  return (
    <div className="ob-root">
      <div className="ob-card">
        {/* Logo */}
        <div className="ob-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo 2.svg" alt="VedaAI" width={36} height={32} />
          <span className="ob-logo__text">VedaAI</span>
        </div>

        {/* Step indicator */}
        <div className="ob-steps">
          <div className={`ob-step-dot ${step === 1 ? "ob-step-dot--active" : "ob-step-dot--done"}`}>
            {step > 1 ? "✓" : "1"}
          </div>
          <div className="ob-steps__line" />
          <div className={`ob-step-dot ${step === 2 ? "ob-step-dot--active" : ""}`}>2</div>
        </div>

        {step === 1 && (
          <div key="step1" className="ob-content">
            <h1 className="ob-title">Set up your profile</h1>
            <p className="ob-subtitle">This info will appear on your question papers.</p>

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

            <div className="ob-field">
              <label className="ob-label">School name</label>
              <input
                className="ob-input"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Delhi Public School, Bokaro"
                onKeyDown={(e) => e.key === "Enter" && name.trim() && school.trim() && setStep(2)}
              />
              <span className="ob-hint">Appears automatically on every question paper you create.</span>
            </div>

            <button
              className="ob-btn-primary"
              disabled={!name.trim() || !school.trim()}
              onClick={() => setStep(2)}
            >
              Next: Choose your avatar →
            </button>
          </div>
        )}

        {step === 2 && (
          <div key="step2" className="ob-content">
            <h1 className="ob-title">Choose your avatar</h1>
            <p className="ob-subtitle">Appears in the header and sidebar across the app.</p>

            <div className="ob-avatar-grid">
              {AVATAR_SEEDS.map((seed) => (
                <button
                  key={seed}
                  className={`ob-avatar-item ${selectedAvatar === seed ? "ob-avatar-item--selected" : ""}`}
                  onClick={() => setSelectedAvatar(seed)}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl(seed)} alt={seed} width={56} height={56} />
                  {selectedAvatar === seed && <div className="ob-avatar-check">✓</div>}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="ob-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl(selectedAvatar)} alt="preview" width={48} height={48} className="ob-preview__avatar" />
              <div>
                <div className="ob-preview__name">{name}</div>
                <div className="ob-preview__school">{school}</div>
              </div>
            </div>

            <div className="ob-actions">
              <button className="ob-btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="ob-btn-primary ob-btn-primary--flex" onClick={handleFinish} disabled={loading}>
                {loading ? "Setting up…" : "Start using VedaAI 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ob-root {
          min-height: 100vh;
          background: linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: var(--font-plus-jakarta), sans-serif;
        }
        .ob-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 40px 36px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
          box-sizing: border-box;
        }
        .ob-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .ob-logo__text {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.04em;
        }

        /* Steps */
        .ob-steps {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
        }
        .ob-step-dot {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: #F0F0F0;
          color: #9A9A9A;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .ob-step-dot--active {
          background: #E8490F;
          color: #fff;
        }
        .ob-step-dot--done {
          background: #4BC26D;
          color: #fff;
        }
        .ob-steps__line {
          flex: 1;
          height: 2px;
          background: #EBEBEB;
          border-radius: 1px;
        }

        .ob-content { animation: fadeUp 0.25s ease both; }

        .ob-title {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.04em;
          margin: 0 0 6px;
        }
        .ob-subtitle {
          font-size: 14px;
          color: #8A8A8A;
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .ob-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .ob-label { font-size: 13px; font-weight: 600; color: #4A4A4A; }
        .ob-input {
          width: 100%;
          height: 48px;
          background: #F7F7F7;
          border: 1.5px solid #E8E8E8;
          border-radius: 12px;
          padding: 0 16px;
          font-size: 15px;
          font-family: inherit;
          color: #303030;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .ob-input::placeholder { color: #B5B5B5; }
        .ob-input:focus { border-color: #E8490F; background: #fff; }
        .ob-hint { font-size: 12px; color: #ABABAB; line-height: 1.5; }

        .ob-btn-primary {
          width: 100%;
          height: 50px;
          border-radius: 14px;
          background: linear-gradient(135deg, #ff7243 0%, #c93d08 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          border: none;
          margin-top: 8px;
          transition: opacity 0.18s;
          letter-spacing: -0.02em;
          box-shadow: 0 4px 16px rgba(232,73,15,0.24);
        }
        .ob-btn-primary--flex { flex: 1; margin-top: 0; }
        .ob-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .ob-btn-primary:not(:disabled):hover { opacity: 0.88; }

        .ob-btn-ghost {
          height: 50px;
          padding: 0 24px;
          border-radius: 14px;
          background: #F5F5F5;
          color: #5A5A5A;
          font-size: 15px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          border: 1.5px solid #E8E8E8;
          transition: background 0.15s;
        }
        .ob-btn-ghost:hover { background: #EBEBEB; }

        .ob-actions { display: flex; gap: 12px; margin-top: 8px; }

        /* Avatars */
        .ob-avatar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .ob-avatar-item {
          position: relative;
          border-radius: 16px;
          border: 2px solid transparent;
          background: #F5F5F5;
          cursor: pointer;
          padding: 10px;
          transition: border-color 0.18s, background 0.18s, transform 0.14s;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1;
          overflow: hidden;
        }
        .ob-avatar-item:hover { background: #EBEBEB; transform: scale(1.04); }
        .ob-avatar-item--selected {
          border-color: #E8490F;
          background: rgba(232,73,15,0.06);
        }
        .ob-avatar-item img { width: 100%; height: 100%; object-fit: contain; border-radius: 8px; }
        .ob-avatar-check {
          position: absolute;
          top: 4px; right: 4px;
          width: 18px; height: 18px;
          background: #E8490F;
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Preview */
        .ob-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #F7F7F7;
          border: 1.5px solid #E8E8E8;
          border-radius: 14px;
          margin-bottom: 20px;
        }
        .ob-preview__avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .ob-preview__name { font-size: 15px; font-weight: 700; color: #303030; letter-spacing: -0.03em; }
        .ob-preview__school { font-size: 13px; color: #8A8A8A; margin-top: 2px; }
      `}</style>
    </div>
  );
}
