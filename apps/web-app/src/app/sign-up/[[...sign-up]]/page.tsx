"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo 2.svg" alt="VedaAI" width={44} height={40} />
          <span className="auth-logo__name">VedaAI</span>
        </div>

        <p className="auth-tagline">Create your free account and start building question papers with AI.</p>

        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#E8490F",
              colorBackground: "#ffffff",
              colorText: "#303030",
              colorTextSecondary: "#8A8A8A",
              colorInputBackground: "#F7F7F7",
              colorInputText: "#303030",
              borderRadius: "12px",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "15px",
            },
            elements: {
              rootBox: { width: "100%" },
              card: {
                boxShadow: "none",
                border: "none",
                padding: "0",
                width: "100%",
                background: "transparent",
              },
              headerTitle: {
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: "800",
                fontSize: "22px",
                letterSpacing: "-0.04em",
                color: "#1A1A1A",
              },
              headerSubtitle: { color: "#8A8A8A", fontSize: "14px" },
              formFieldInput: {
                border: "1.5px solid #E8E8E8",
                borderRadius: "12px",
                fontSize: "15px",
                height: "48px",
                background: "#F7F7F7",
                color: "#303030",
                transition: "border-color 0.15s",
              },
              formButtonPrimary: {
                background: "linear-gradient(135deg, #ff7243 0%, #c93d08 100%)",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "15px",
                height: "48px",
                letterSpacing: "-0.02em",
                boxShadow: "0 4px 16px rgba(232, 73, 15, 0.28)",
              },
              socialButtonsBlockButton: {
                border: "1.5px solid #E8E8E8",
                borderRadius: "12px",
                height: "48px",
                color: "#303030",
                fontWeight: "500",
              },
              footerActionLink: { color: "#E8490F", fontWeight: "600" },
              dividerLine: { background: "#EBEBEB" },
              dividerText: { color: "#B0B0B0", fontSize: "13px" },
              formFieldLabel: { color: "#5A5A5A", fontWeight: "600", fontSize: "13px" },
            },
          }}
        />
      </div>

      <style>{`
        .auth-root {
          min-height: 100vh;
          background: linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: var(--font-plus-jakarta), sans-serif;
        }
        .auth-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 40px 36px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
          box-sizing: border-box;
        }
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .auth-logo__name {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.04em;
        }
        .auth-tagline {
          font-size: 14px;
          color: #8A8A8A;
          margin: 0 0 28px 0;
          letter-spacing: -0.01em;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
