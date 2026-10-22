"use client";

import React, { useState } from "react";
import { QUALIFYING_CONDITIONS } from "@/lib/bookingData";

interface QualifyingConditionsStepProps {
  selectedConditions: string[];
  onToggleCondition: (condition: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step05_QualifyingConditions({
  selectedConditions,
  onToggleCondition,
  onBack,
  onContinue,
}: QualifyingConditionsStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const UNSURE_OPTION = "I’m not sure which applies";

  const specificConditions = QUALIFYING_CONDITIONS.filter(
    (c) => c !== UNSURE_OPTION
  );

  const filteredConditions = specificConditions.filter((condition) =>
    condition.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const isUnsureSelected = selectedConditions.includes(UNSURE_OPTION);

  const handleSelect = (condition: string) => {
    setError(null);
    onToggleCondition(condition);

    if (condition === UNSURE_OPTION) {
      setTimeout(() => {
        onContinue();
      }, 280);
    }
  };

  const handleAutofillCondition = () => {
    setError(null);
    if (!selectedConditions.includes("Pain that is chronic and severe, or intractable")) {
      onToggleCondition("Pain that is chronic and severe, or intractable");
    }
    setTimeout(() => {
      onContinue();
    }, 280);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConditions.length === 0) {
      setError("Please choose at least one condition or select 'I’m not sure which applies' to continue.");
      return;
    }
    setError(null);
    onContinue();
  };

  return (
    <form className="fld0dG_card" noValidate onSubmit={handleContinue}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap" }}>
        <div>
          <h1 tabIndex={-1} className="fld0dG_q" style={{ fontSize: "clamp(1.5rem, 1.3rem + 1vw, 2rem)", margin: 0 }}>
            Which condition would you like to be evaluated for?
          </h1>
          <p className="fld0dG_subtitle" style={{ marginTop: "4px" }}>
            These are Ohio&apos;s 21 qualifying conditions. Choose all that apply; your physician confirms the diagnosis.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutofillCondition}
          className="btn_autofill"
          title="Autofill most common condition (Chronic Pain) and proceed"
        >
          ⚡ Autofill (Chronic Pain)
        </button>
      </div>

      {/* Search Input matching Screenshot 2 */}
      <div style={{ position: "relative", marginTop: "var(--space-xs)" }}>
        <input
          type="text"
          className="fld0dG_input"
          placeholder="Search conditions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            minHeight: "48px",
            paddingLeft: "16px",
            borderRadius: "12px",
            borderColor: "var(--color-border-strong)",
          }}
          aria-label="Search qualifying conditions"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: "1.1rem",
              padding: "4px",
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scrollable Conditions Container matching Screenshot 2 */}
      <div
        className="conditions_scroll_container"
        style={{
          maxHeight: "220px",
          overflowY: "auto",
          padding: "4px 8px 8px 2px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 10px",
          alignContent: "flex-start",
        }}
        tabIndex={0}
        aria-label="List of qualifying conditions"
      >
        {filteredConditions.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", padding: "12px 4px" }}>
            No conditions match &ldquo;{searchQuery}&rdquo;. You may select &ldquo;I’m not sure which applies&rdquo; below.
          </p>
        ) : (
          filteredConditions.map((condition) => {
            const isSelected = selectedConditions.includes(condition);
            return (
              <button
                key={condition}
                type="button"
                className={`condition_pill ${isSelected ? "condition_pill_selected" : ""}`}
                onClick={() => handleSelect(condition)}
                aria-pressed={isSelected}
                style={{
                  borderRadius: "999px",
                  border: isSelected ? "1.5px solid var(--color-action-primary)" : "1.5px solid var(--color-border-default)",
                  background: isSelected ? "var(--color-action-primary)" : "var(--color-bg-surface)",
                  color: isSelected ? "#ffffff" : "var(--color-text-primary)",
                  padding: "7px 16px",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  lineHeight: 1.35,
                }}
              >
                {condition}
              </button>
            );
          })
        )}
      </div>

      {/* Sticky "I'm not sure which applies" option */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "var(--color-bg-surface)",
          paddingTop: "10px",
          paddingBottom: "4px",
          borderTop: "1px dashed var(--color-border-default)",
          marginTop: "4px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          zIndex: 2,
        }}
      >
        <button
          type="button"
          className={`condition_pill ${isUnsureSelected ? "condition_pill_selected" : ""}`}
          onClick={() => handleSelect(UNSURE_OPTION)}
          aria-pressed={isUnsureSelected}
          style={{
            borderRadius: "999px",
            border: isUnsureSelected
              ? "1.5px solid var(--color-action-primary)"
              : "1.5px solid var(--color-border-default)",
            background: isUnsureSelected
              ? "var(--color-action-primary)"
              : "var(--color-bg-surface)",
            color: isUnsureSelected ? "#ffffff" : "var(--color-text-primary)",
            padding: "8px 18px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
            textAlign: "left",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {UNSURE_OPTION}
        </button>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
          (Doctor will help you review symptoms on the call)
        </span>
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

      {/* Navigation matching Screenshot 2 */}
      <div className="fld0dG_nav" style={{ marginTop: "auto", paddingTop: "var(--space-md)" }}>
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
          Continue →
        </button>
      </div>
    </form>
  );
}

export const QualifyingConditionsStep = Step05_QualifyingConditions;
