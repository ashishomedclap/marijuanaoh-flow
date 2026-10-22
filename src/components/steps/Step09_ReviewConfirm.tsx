"use client";

import React, { useState } from "react";
import { ServicePlan } from "@/lib/bookingData";

interface ReviewConfirmStepProps {
  currentService: ServicePlan;
  selectedConditions: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onBack: () => void;
  onContinue: () => void;
}

export function Step09_ReviewConfirm({
  currentService,
  selectedConditions,
  firstName,
  lastName,
  email,
  phone,
  onBack,
  onContinue,
}: ReviewConfirmStepProps) {
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [referralSource, setReferralSource] = useState("");
  const [error, setError] = useState<string | null>(null);

  const conditionDisplay =
    selectedConditions.length > 0
      ? selectedConditions.join(", ")
      : "General Ohio Medical Condition";

  const contactDisplay = `${firstName || "Sarah"} ${lastName || "Jenkins"}, ${email || "patient@example.com"}, ${phone || "(614) 555-0192"}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentAgreed) {
      setError("Please agree to the telehealth consent, terms of use, and privacy policy to proceed.");
      return;
    }

    setError(null);
    onContinue();
  };

  return (
    <form className="fld0dG_card" noValidate onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap" }}>
        <h1 tabIndex={-1} className="fld0dG_q" style={{ fontSize: "clamp(1.5rem, 1.3rem + 1vw, 2.1rem)", margin: 0 }}>
          Review and confirm
        </h1>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setConsentAgreed(true);
          }}
          className="btn_autofill"
          title="Autofill required agreement for quick testing"
        >
          ⚡ Accept Agreement
        </button>
      </div>

      {/* Review Summary Box matching Screenshot 3 */}
      <div
        style={{
          background: "var(--teal-50)",
          borderRadius: "16px",
          padding: "18px 22px",
          display: "grid",
          gap: "12px",
          border: "1px solid var(--teal-100)",
        }}
      >
        {/* Visit row */}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "10px", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, color: "var(--color-text-brand)", fontSize: "0.9375rem" }}>
            Visit
          </span>
          <span style={{ color: "var(--color-text-primary)", fontSize: "0.9375rem" }}>
            {currentService.id === "new" ? "New card evaluation" : "Renewal evaluation"}, ${currentService.price}
          </span>
        </div>

        {/* Condition row */}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "10px", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, color: "var(--color-text-brand)", fontSize: "0.9375rem" }}>
            Condition
          </span>
          <span style={{ color: "var(--color-text-primary)", fontSize: "0.9375rem" }}>
            {conditionDisplay}
          </span>
        </div>

        {/* Contact row */}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "10px", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, color: "var(--color-text-brand)", fontSize: "0.9375rem" }}>
            Contact
          </span>
          <span style={{ color: "var(--color-text-primary)", fontSize: "0.9375rem", wordBreak: "break-word" }}>
            {contactDisplay}
          </span>
        </div>
      </div>

      {/* Merged Consent Checkbox */}
      <div style={{ display: "grid", gap: "12px", marginTop: "var(--space-xs)" }}>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            fontSize: "0.875rem",
            color: "var(--color-text-primary)",
            cursor: "pointer",
            lineHeight: 1.45,
          }}
        >
          <input
            type="checkbox"
            checked={consentAgreed}
            onChange={(e) => {
              setError(null);
              setConsentAgreed(e.target.checked);
            }}
            style={{
              width: "18px",
              height: "18px",
              accentColor: "var(--color-action-primary)",
              marginTop: "2px",
              cursor: "pointer",
              flexShrink: 0,
            }}
            required
          />
          <span>
            I agree to the{" "}
            <span style={{ textDecoration: "underline", color: "var(--color-action-primary)" }}>telehealth consent</span>,{" "}
            <span style={{ textDecoration: "underline", color: "var(--color-action-primary)" }}>terms of use</span>, and
            have read the{" "}
            <span style={{ textDecoration: "underline", color: "var(--color-action-primary)" }}>privacy policy</span> and{" "}
            <span style={{ textDecoration: "underline", color: "var(--color-action-primary)" }}>notice of privacy practices</span>.{" "}
            <strong style={{ fontWeight: 700 }}>Required</strong>
          </span>
        </label>
      </div>

      {/* Referral dropdown matching Screenshot 3 */}
      <div style={{ marginTop: "var(--space-xs)" }}>
        <label htmlFor="referral-select" className="fld0dG_label" style={{ fontSize: "0.875rem" }}>
          How did you hear about us? <span style={{ fontWeight: 400, color: "var(--color-text-secondary)" }}>Optional</span>
        </label>
        <select
          id="referral-select"
          className="fld0dG_input"
          value={referralSource}
          onChange={(e) => setReferralSource(e.target.value)}
          style={{
            borderRadius: "12px",
            minHeight: "48px",
            cursor: "pointer",
            background: "var(--color-bg-surface)",
          }}
        >
          <option value="">Choose one</option>
          <option value="google">Search (Google, Bing)</option>
          <option value="friend">Friend or family</option>
          <option value="dispensary">Dispensary</option>
          <option value="social">Social Media</option>
          <option value="doctor">Doctor referral</option>
          <option value="other">Other</option>
        </select>
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
          Agree & Continue to Physician →
        </button>
      </div>

      {/* Money back guarantee badge under button */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "6px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-action-primary)" }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <span>100% money-back guarantee if you don&apos;t qualify.</span>
      </div>
    </form>
  );
}

export const ReviewConfirmStep = Step09_ReviewConfirm;
