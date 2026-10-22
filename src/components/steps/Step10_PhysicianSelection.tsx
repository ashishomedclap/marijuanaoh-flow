"use client";

import React from "react";
import { PHYSICIANS_ROSTER, Physician } from "@/lib/bookingData";

interface PhysicianSelectionStepProps {
  selectedPhysician?: Physician;
  onSelectPhysician?: (physician: Physician) => void;
  onBack: () => void;
  onContinue: () => void;
  ctaText?: string;
}

export function Step10_PhysicianSelection({
  selectedPhysician,
  onSelectPhysician,
  onBack,
  onContinue,
  ctaText = "Continue to Choose Date & Time →",
}: PhysicianSelectionStepProps) {
  return (
    <div className="fld0dG_card">
      <p className="fld0dG_kicker">CERTIFIED OHIO TELEHEALTH PHYSICIANS</p>
      <h1 tabIndex={-1} className="fld0dG_q">
        Meet Your Physician
      </h1>
      <p className="fld0dG_subtitle">
        You will be evaluated by Ohio State Medical Board licensed physicians. We have the best doctors in the state, ensuring compassionate, expert, and 100% confidential telehealth care.
      </p>

      {/* Physician Roster Display (No radio selection) */}
      <div style={{ display: "grid", gap: "var(--space-md)", marginTop: "var(--space-xs)" }}>
        {PHYSICIANS_ROSTER.map((physician) => {
          const isSelected = selectedPhysician?.id === physician.id;
          return (
            <div
              key={physician.id}
              className={`fld0dG_docCard ${isSelected ? "selectedDoc" : ""}`}
              onClick={() => onSelectPhysician?.(physician)}
              style={{
                cursor: onSelectPhysician ? "pointer" : "default",
                borderColor: isSelected ? "var(--color-action-primary)" : "var(--color-border-default)",
              }}
            >
              <div className="fld0dG_docAvatar">{physician.avatarText}</div>
              <div className="fld0dG_docText">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  <div>
                    <div className="doc_name">{physician.name}</div>
                    <div className="doc_meta" style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", marginTop: "2px" }}>
                      <strong>OH License #{physician.ohioLicense}</strong>
                      <span>·</span>
                      <span>NPI: {physician.npi}</span>
                      <span>·</span>
                      <span>{physician.credentials}</span>
                    </div>
                  </div>
                  <span className="doc_badge">{physician.badge}</span>
                </div>

                <div className="doc_stars">
                  <span>★★★★★</span>
                  <span style={{ color: "var(--teal-800)", fontWeight: 700 }}>
                    {physician.rating} ({physician.reviewsCount} reviews)
                  </span>
                </div>

                <p
                  style={{
                    margin: "4px 0 0",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.45,
                  }}
                >
                  {physician.bio}
                </p>

                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "0.8125rem",
                    color: "var(--green-600)",
                    fontWeight: 700,
                  }}
                >
                  🟢 {physician.availabilityStatus}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guarantee callout matching Screenshot */}
      <div className="fld0dG_guaranteeBox" style={{ marginTop: "var(--space-sm)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4" />
        </svg>
        <div style={{ fontSize: "0.875rem", color: "var(--green-600)", lineHeight: 1.45 }}>
          <strong>100% Legal & HIPAA Compliant:</strong> Video evaluations are fully recognized by the
          Ohio Department of Commerce and State Medical Board.
        </div>
      </div>

      {/* Navigation Buttons */}
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
          {ctaText}
        </button>
      </div>
    </div>
  );
}

export const PhysicianSelectionStep = Step10_PhysicianSelection;
