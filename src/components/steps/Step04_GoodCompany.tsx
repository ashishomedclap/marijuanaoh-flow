"use client";

import React from "react";

interface GoodCompanyStepProps {
  onBack: () => void;
  onContinue: () => void;
}

export function Step04_GoodCompany({ onBack, onContinue }: GoodCompanyStepProps) {
  return (
    <div className="fld0dG_card">
      <div style={{ display: "grid", gap: "8px" }}>
        <p className="fld0dG_kicker" style={{ letterSpacing: "0.08em" }}>
          YOU&apos;RE IN GOOD COMPANY
        </p>

        <h1
          tabIndex={-1}
          style={{
            font: "800 clamp(2.75rem, 2.2rem + 2.5vw, 4rem)/1 var(--font-display)",
            color: "var(--color-text-brand)",
            margin: "4px 0 0 0",
            letterSpacing: "-0.02em",
          }}
        >
          475,281
        </h1>

        <p
          style={{
            fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)",
            fontWeight: 800,
            lineHeight: 1.25,
            color: "var(--color-text-brand)",
            margin: "2px 0 0 0",
          }}
        >
          Ohioans have registered as medical marijuana patients
        </p>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            margin: "4px 0 0 0",
          }}
        >
          Division of Cannabis Control, as of 31 Aug 2026.
        </p>
      </div>

      {/* Feature list matching Screenshot 1 */}
      <div
        style={{
          display: "grid",
          gap: "18px",
          marginTop: "var(--space-sm)",
        }}
      >
        {/* Item 1: Private by law */}
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "var(--color-bg-subtle)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              color: "var(--color-text-brand)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.5, color: "var(--color-text-primary)" }}>
            <strong style={{ color: "var(--color-text-brand)", fontWeight: 700 }}>Private by law.</strong>{" "}
            Registry information that identifies you is confidential under Ohio law and isn&apos;t a public record.
          </p>
        </div>

        {/* Item 2: No state fee */}
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "var(--color-bg-subtle)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              color: "var(--color-text-brand)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.5, color: "var(--color-text-primary)" }}>
            <strong style={{ color: "var(--color-text-brand)", fontWeight: 700 }}>No state fee.</strong>{" "}
            Ohio&apos;s current rule sets no registration fee. You pay only for your visit.
          </p>
        </div>

        {/* Item 3: From home */}
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "var(--color-bg-subtle)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              color: "var(--color-text-brand)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.5, color: "var(--color-text-primary)" }}>
            <strong style={{ color: "var(--color-text-brand)", fontWeight: 700 }}>From home.</strong>{" "}
            Your visit is a video call, so there&apos;s no waiting room.
          </p>
        </div>
      </div>

      {/* Navigation matching Screenshot 1 */}
      <div className="fld0dG_nav" style={{ marginTop: "auto", paddingTop: "var(--space-lg)" }}>
        <button
          type="button"
          onClick={onBack}
          className="fld0dG_ghost"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="fld0dG_primary"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

export const GoodCompanyStep = Step04_GoodCompany;
