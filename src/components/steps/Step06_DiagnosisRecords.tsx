"use client";

import React, { useState } from "react";
import { DiagnosisStatus, RecordsStatus } from "@/lib/bookingData";

interface DiagnosisStepProps {
  diagnosisStatus: DiagnosisStatus | null;
  recordsStatus: RecordsStatus | null;
  onSelectDiagnosisStatus: (status: DiagnosisStatus) => void;
  onSelectRecordsStatus: (status: RecordsStatus) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step06_DiagnosisRecords({
  diagnosisStatus,
  recordsStatus,
  onSelectDiagnosisStatus,
  onSelectRecordsStatus,
  onBack,
  onContinue,
}: DiagnosisStepProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDiagnosisSelect = (id: DiagnosisStatus) => {
    setError(null);
    onSelectDiagnosisStatus(id);
    if (recordsStatus) {
      setTimeout(() => {
        onContinue();
      }, 260);
    }
  };

  const handleRecordsSelect = (id: RecordsStatus) => {
    setError(null);
    onSelectRecordsStatus(id);
    if (diagnosisStatus) {
      setTimeout(() => {
        onContinue();
      }, 260);
    }
  };

  const handleAutofillDiagnosis = () => {
    setError(null);
    onSelectDiagnosisStatus("yes");
    onSelectRecordsStatus("have_them");
    setTimeout(() => {
      onContinue();
    }, 260);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosisStatus) {
      setError("Please indicate whether a doctor has diagnosed your condition.");
      return;
    }
    if (!recordsStatus) {
      setError("Please select your medical records status.");
      return;
    }
    setError(null);
    onContinue();
  };

  return (
    <form className="fld0dG_card" noValidate onSubmit={handleContinue}>
      {/* Section 1: Has a doctor diagnosed this condition? */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap" }}>
          <h1 tabIndex={-1} className="fld0dG_q" style={{ fontSize: "clamp(1.4rem, 1.25rem + 0.8vw, 1.875rem)", margin: 0 }}>
            Has a doctor diagnosed this condition?
          </h1>
          <button
            type="button"
            onClick={handleAutofillDiagnosis}
            className="btn_autofill"
            title="Autofill: Diagnosed Yes & Have Records"
          >
            ⚡ Autofill (Yes & Records)
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginTop: "var(--space-md)",
          }}
        >
          {([
            { id: "yes", label: "Yes" },
            { id: "no", label: "No" },
            { id: "not_sure", label: "Not sure" },
          ] as const).map(({ id, label }) => {
            const isSelected = diagnosisStatus === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleDiagnosisSelect(id)}
                className={`segmented_button ${isSelected ? "segmented_button_active" : ""}`}
                aria-pressed={isSelected}
                style={{
                  minHeight: "50px",
                  borderRadius: "12px",
                  border: isSelected ? "2px solid var(--color-action-primary)" : "1.5px solid var(--color-border-default)",
                  background: isSelected ? "var(--teal-50)" : "var(--color-bg-surface)",
                  color: isSelected ? "var(--color-action-primary)" : "var(--color-text-primary)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 0 0 1px var(--color-action-primary) inset" : "none",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Can you share medical records? */}
      <div style={{ marginTop: "var(--space-xs)" }}>
        <h2
          style={{
            font: "700 1.25rem/1.3 var(--font-display)",
            color: "var(--color-text-brand)",
            margin: "0 0 4px 0",
          }}
        >
          Can you share medical records?
        </h2>

        <p className="fld0dG_subtitle" style={{ fontSize: "0.9375rem", marginTop: 0 }}>
          Records help but aren&apos;t always required. Photos or PDFs from a patient portal are fine.
        </p>

        {/* 3 Radio cards matching Screenshot 3 */}
        <div className="fld0dG_choices" style={{ marginTop: "var(--space-md)" }}>
          {([
            { id: "have_them", title: "Yes, I have them" },
            { id: "can_get", title: "I can get them" },
            { id: "no_records", title: "I don’t have records" },
          ] as const).map(({ id, title }) => {
            const isSelected = recordsStatus === id;
            return (
              <button
                key={id}
                type="button"
                className={`fld0dG_choice ${isSelected ? "fld0dG_selected" : ""}`}
                onClick={() => handleRecordsSelect(id)}
                aria-pressed={isSelected}
                style={{
                  justifyContent: "space-between",
                  minHeight: "56px",
                  padding: "12px 18px",
                  borderRadius: "12px",
                }}
              >
                <span className="fld0dG_choiceTitle" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {title}
                </span>
                <span className="fld0dG_radio" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Error */}
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

      {/* Navigation matching Screenshot 3 */}
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
          type="submit"
          className="fld0dG_primary"
        >
          Confirm & See If You Qualify →
        </button>
      </div>
    </form>
  );
}

export const DiagnosisStep = Step06_DiagnosisRecords;
