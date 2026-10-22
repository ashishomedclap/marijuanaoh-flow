"use client";

import React, { useState } from "react";

interface DateOfBirthStepProps {
  dateOfBirth: string;
  onChangeDateOfBirth: (dob: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step03_DateOfBirth({
  dateOfBirth,
  onChangeDateOfBirth,
  onBack,
  onContinue,
}: DateOfBirthStepProps) {
  const [error, setError] = useState<string | null>(null);

  // Auto-format MM/DD/YYYY
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);

    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    onChangeDateOfBirth(formatted);
  };

  const validateAndContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateOfBirth || dateOfBirth.length < 10) {
      setError("Please enter your complete date of birth in MM/DD/YYYY format.");
      return;
    }

    const parts = dateOfBirth.split("/");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const currentYear = new Date().getFullYear();
    if (
      isNaN(month) ||
      isNaN(day) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      year < 1910 ||
      year > currentYear
    ) {
      setError("Please enter a valid calendar date of birth.");
      return;
    }

    // Check age 18+
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError("You must be 18 or older to apply for an Ohio medical marijuana card.");
      return;
    }

    setError(null);
    onContinue();
  };

  return (
    <form className="fld0dG_card" noValidate onSubmit={validateAndContinue}>
      <h1 tabIndex={-1} className="fld0dG_q">
        What&apos;s your date of birth?
      </h1>

      <p className="fld0dG_subtitle">
        You need to be 18 or older. Your physician confirms it with your photo ID.
      </p>

      {/* Date of Birth Input Field */}
      <div style={{ marginTop: "var(--space-sm)", display: "grid", gap: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label htmlFor="dob-input" className="fld0dG_label" style={{ margin: 0 }}>
            Date of birth
          </label>
          <button
            type="button"
            onClick={() => {
              setError(null);
              onChangeDateOfBirth("04/18/1992");
              setTimeout(() => {
                onContinue();
              }, 280);
            }}
            className="btn_autofill"
            title="Autofill a valid 18+ demo date of birth and continue"
          >
            ⚡ Autofill (04/18/1992)
          </button>
        </div>
        <input
          id="dob-input"
          type="text"
          inputMode="numeric"
          className="fld0dG_input"
          placeholder="MM/DD/YYYY"
          value={dateOfBirth}
          onChange={handleInputChange}
          maxLength={10}
          autoFocus
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="fld0dG_error" role="alert" style={{ marginTop: "var(--space-xs)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Bottom bar with Back on left and Continue on right */}
      <div
        className="fld0dG_nav"
        style={{
          marginTop: "auto",
          paddingTop: "var(--space-lg)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="fld0dG_ghost"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          Back
        </button>

        <button
          type="submit"
          className="fld0dG_primary"
        >
          Confirm Age & Continue →
        </button>
      </div>
    </form>
  );
}

export const DateOfBirthStep = Step03_DateOfBirth;
