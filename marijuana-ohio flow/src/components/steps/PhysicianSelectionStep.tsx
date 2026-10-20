import React from "react";
import { PHYSICIANS_ROSTER, Physician } from "@/lib/bookingData";

interface PhysicianSelectionStepProps {
  selectedPhysician: Physician;
  onSelectPhysician: (physician: Physician) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function PhysicianSelectionStep({
  selectedPhysician,
  onSelectPhysician,
  onBack,
  onContinue,
}: PhysicianSelectionStepProps) {
  return (
    <div className="fld0dG_card">
      <p className="fld0dG_kicker">CERTIFIED OHIO TELEHEALTH PHYSICIANS</p>
      <h1 tabIndex={-1} className="fld0dG_q">
        Meet Your Physician
      </h1>
      <p className="fld0dG_subtitle">
        You will be evaluated by an Ohio State Medical Board licensed physician. Select your
        preferred doctor or continue with our earliest available specialist.
      </p>

      <div style={{ display: "grid", gap: "var(--space-md)" }}>
        {PHYSICIANS_ROSTER.map((physician) => {
          const isSelected = selectedPhysician.id === physician.id;
          return (
            <div
              key={physician.id}
              className={`fld0dG_docCard ${isSelected ? "selectedDoc" : ""}`}
              onClick={() => onSelectPhysician(physician)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelectPhysician(physician);
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
                    gap: "4px",
                  }}
                >
                  <div>
                    <div className="doc_name">{physician.name}</div>
                    <div className="doc_meta">
                      {physician.boardNumber} · {physician.credentials}
                    </div>
                  </div>
                  <span className="doc_badge">{physician.badge}</span>
                </div>

                <div className="doc_stars">
                  <span>★★★★★</span>
                  <span style={{ color: "var(--teal-800)" }}>
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

              <span
                className="fld0dG_radio"
                style={{
                  borderColor: isSelected
                    ? "var(--color-action-primary)"
                    : "var(--color-border-strong)",
                  background: isSelected
                    ? "radial-gradient(circle, var(--color-action-primary) 45%, transparent 50%)"
                    : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Guarantee callout */}
      <div className="fld0dG_guaranteeBox">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4" />
        </svg>
        <div style={{ fontSize: "0.875rem", color: "var(--green-600)", lineHeight: 1.45 }}>
          <strong>100% Legal & HIPAA Compliant:</strong> Video evaluations are fully recognized by the
          Ohio Department of Commerce and State Medical Board.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fld0dG_nav">
        <button
          type="button"
          onClick={onBack}
          className="fld0dG_ghost"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="fld0dG_primary"
        >
          Choose Date & Time with {selectedPhysician.name.split(",")[0]} →
        </button>
      </div>
    </div>
  );
}
