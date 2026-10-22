"use client";

import React, { useState } from "react";

interface ResidencyStepProps {
  livesInOhio: boolean | null;
  onSelectLivesInOhio: (value: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step02_Residency({
  livesInOhio,
  onSelectLivesInOhio,
  onBack,
  onContinue,
}: ResidencyStepProps) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleSelect = (value: boolean) => {
    onSelectLivesInOhio(value);
    setAttemptedSubmit(false);

    // If user selects "Yes, I live in Ohio", smoothly advance after short feedback delay
    if (value === true) {
      setTimeout(() => {
        onContinue();
      }, 260);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (livesInOhio === null) {
      setAttemptedSubmit(true);
      return;
    }
    if (livesInOhio === false) {
      return;
    }
    onContinue();
  };

  return (
    <form className="fld0dG_card" noValidate onSubmit={handleContinue}>
      <h1 tabIndex={-1} className="fld0dG_q">
        Do you live in Ohio?
      </h1>

      <p className="fld0dG_subtitle">
        Ohio&apos;s program is for Ohio residents, and our physicians are licensed in Ohio.
      </p>

      {/* Choices matching Screenshot 1 */}
      <div className="fld0dG_choices" style={{ marginTop: "var(--space-xs)" }}>
        {/* Option 1: Yes, I live in Ohio */}
        <button
          type="button"
          className={`fld0dG_choice ${livesInOhio === true ? "fld0dG_selected" : ""}`}
          aria-pressed={livesInOhio === true}
          onClick={() => handleSelect(true)}
          style={{ justifyContent: "space-between" }}
        >
          <span className="fld0dG_choiceTitle" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
            Yes, I live in Ohio
          </span>
          <span className="fld0dG_radio" aria-hidden="true" />
        </button>

        {/* Option 2: No */}
        <button
          type="button"
          className={`fld0dG_choice ${livesInOhio === false ? "fld0dG_selected" : ""}`}
          aria-pressed={livesInOhio === false}
          onClick={() => handleSelect(false)}
          style={{ justifyContent: "space-between" }}
        >
          <span className="fld0dG_choiceTitle" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
            No
          </span>
          <span className="fld0dG_radio" aria-hidden="true" />
        </button>
      </div>

      {/* Warning if user selects No */}
      {livesInOhio === false && (
        <div className="fld0dG_error" role="alert" style={{ marginTop: "var(--space-xs)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            Under Ohio law, you must be a resident of Ohio with a valid state ID or driver&apos;s license to qualify for an Ohio medical marijuana card.
          </span>
        </div>
      )}

      {/* Error if submitted without selecting */}
      {attemptedSubmit && livesInOhio === null && (
        <div className="fld0dG_error" role="alert" style={{ marginTop: "var(--space-xs)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>Please select whether you live in Ohio to continue.</span>
        </div>
      )}

      {/* Bottom bar with divider, Back link, and Assurances matching Screenshot 1 */}
      <div
        style={{
          borderTop: "1px solid var(--color-border-default)",
          marginTop: "auto",
          paddingTop: "var(--space-lg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-md)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={onBack}
            className="fld0dG_ghost"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            Back
          </button>
          {livesInOhio === true && (
            <button
              type="submit"
              className="fld0dG_primary"
              style={{ padding: "8px 18px", fontSize: "0.875rem" }}
            >
              Continue →
            </button>
          )}
        </div>

        <ul className="fld0dG_assure" style={{ borderTop: "none", padding: 0 }} aria-label="Program benefits">
          <li>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Ohio-licensed physicians
          </li>
          <li>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            Money back if you don&apos;t qualify
          </li>
          <li>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            No state fee
          </li>
        </ul>
      </div>
    </form>
  );
}

export const ResidencyStep = Step02_Residency;
