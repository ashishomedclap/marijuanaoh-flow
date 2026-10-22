"use client";

import React from "react";
import { ServicePlan } from "@/lib/bookingData";

interface GoodNewsStepProps {
  currentService: ServicePlan;
  selectedConditions: string[];
  onBack: () => void;
  onContinue: () => void;
}

export function Step07_EligibilityNotice({
  currentService,
  selectedConditions,
  onBack,
  onContinue,
}: GoodNewsStepProps) {
  // Primary condition name to highlight
  const conditionDisplay =
    selectedConditions.length > 0
      ? selectedConditions[0] === "I’m not sure which applies"
        ? "your qualifying symptoms"
        : selectedConditions[0]
      : "qualifying health conditions";

  return (
    <div className="fld0dG_card">
      <div style={{ display: "grid", gap: "14px" }}>
        {/* Circle Checkmark matching Screenshot 1 */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "var(--teal-50)",
            display: "grid",
            placeItems: "center",
            color: "var(--color-action-primary)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          tabIndex={-1}
          className="fld0dG_q"
          style={{
            fontSize: "clamp(1.5rem, 1.3rem + 1vw, 2.1rem)",
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          Good news: you may be a good fit for an evaluation
        </h1>

        <p className="fld0dG_subtitle" style={{ fontSize: "1rem", lineHeight: 1.5, margin: 0 }}>
          Based on your answers about{" "}
          <strong style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>
            {conditionDisplay}
          </strong>
          , the next step is a video visit with an Ohio-licensed physician, who decides whether you qualify.
        </p>
      </div>

      {/* Feature list matching Screenshot 1 */}
      <div style={{ display: "grid", gap: "16px", marginTop: "var(--space-sm)" }}>
        {/* Item 1: Video visit */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div style={{ color: "var(--color-action-primary)", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--color-text-primary)", lineHeight: 1.4 }}>
            Video visit from home, anywhere in Ohio
          </p>
        </div>

        {/* Item 2: Price evaluation & no state fee */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div style={{ color: "var(--color-action-primary)", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--color-text-primary)", lineHeight: 1.4 }}>
            ${currentService.price} evaluation, no state fee, full refund if you don&apos;t qualify
          </p>
        </div>

        {/* Item 3: Fast registry submission */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div style={{ color: "var(--color-action-primary)", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--color-text-primary)", lineHeight: 1.4 }}>
            If you qualify, your recommendation is submitted to the Ohio registry right after your visit
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
          Continue to Contact Info →
        </button>
      </div>
    </div>
  );
}

export const GoodNewsStep = Step07_EligibilityNotice;
