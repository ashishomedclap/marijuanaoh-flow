"use client";

import React, { useState } from "react";

interface ContactInfoStepProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  smsReminders: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onZipCodeChange: (value: string) => void;
  onSmsRemindersChange: (value: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step08_ContactInfo({
  firstName,
  lastName,
  email,
  phone,
  zipCode,
  smsReminders,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onZipCodeChange,
  onSmsRemindersChange,
  onBack,
  onContinue,
}: ContactInfoStepProps) {
  const [error, setError] = useState<string | null>(null);

  // Auto-format US Phone Number (XXX) XXX-XXXX
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      formatted = `(${digits}`;
    }
    onPhoneChange(formatted);
  };

  const handleZipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
    onZipCodeChange(digits);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("Please enter a complete 10-digit mobile phone number.");
      return;
    }
    if (zipCode.length < 5) {
      setError("Please enter a valid 5-digit Ohio ZIP code.");
      return;
    }

    setError(null);
    onContinue();
  };

  const handleAutofill = () => {
    setError(null);
    onFirstNameChange("Sarah");
    onLastNameChange("Jenkins");
    onEmailChange("sarah.jenkins@example.com");
    onPhoneChange("(614) 555-0192");
    onZipCodeChange("43215");
    onSmsRemindersChange(true);
  };

  return (
    <form className="fld0dG_card" noValidate onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap" }}>
        <div>
          <h1 tabIndex={-1} className="fld0dG_q" style={{ fontSize: "clamp(1.5rem, 1.3rem + 1vw, 2.1rem)", lineHeight: 1.25, margin: 0 }}>
            Where should we send your booking link?
          </h1>

          <p className="fld0dG_subtitle" style={{ fontSize: "0.9375rem", lineHeight: 1.5, marginTop: "6px" }}>
            We use this only for your visit and registration. No spam, and we never sell your information.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutofill}
          className="btn_autofill"
          title="Autofill test patient information"
        >
          ⚡ Autofill Demo Info
        </button>
      </div>

      {/* Form Fields matching Screenshot 2 */}
      <div style={{ display: "grid", gap: "14px", marginTop: "var(--space-xs)" }}>
        {/* Row 1: First name & Last name */}
        <div className="fld0dG_grid2" style={{ gap: "14px" }}>
          <div>
            <label htmlFor="first-name-input" className="fld0dG_label" style={{ fontSize: "0.875rem" }}>
              First name
            </label>
            <input
              id="first-name-input"
              type="text"
              className="fld0dG_input"
              value={firstName}
              onChange={(e) => {
                setError(null);
                onFirstNameChange(e.target.value);
              }}
              autoComplete="given-name"
              required
            />
          </div>

          <div>
            <label htmlFor="last-name-input" className="fld0dG_label" style={{ fontSize: "0.875rem" }}>
              Last name
            </label>
            <input
              id="last-name-input"
              type="text"
              className="fld0dG_input"
              value={lastName}
              onChange={(e) => {
                setError(null);
                onLastNameChange(e.target.value);
              }}
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label htmlFor="email-input" className="fld0dG_label" style={{ fontSize: "0.875rem" }}>
            Email
          </label>
          <input
            id="email-input"
            type="email"
            className="fld0dG_input"
            value={email}
            onChange={(e) => {
              setError(null);
              onEmailChange(e.target.value);
            }}
            autoComplete="email"
            required
          />
        </div>

        {/* Row 3: Mobile phone & ZIP code */}
        <div className="fld0dG_grid2" style={{ gap: "14px" }}>
          <div>
            <label htmlFor="phone-input" className="fld0dG_label" style={{ fontSize: "0.875rem" }}>
              Mobile phone
            </label>
            <input
              id="phone-input"
              type="tel"
              className="fld0dG_input"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={handlePhoneInput}
              autoComplete="tel"
              required
            />
          </div>

          <div>
            <label htmlFor="zip-input" className="fld0dG_label" style={{ fontSize: "0.875rem" }}>
              ZIP code
            </label>
            <input
              id="zip-input"
              type="text"
              inputMode="numeric"
              className="fld0dG_input"
              maxLength={5}
              value={zipCode}
              onChange={handleZipInput}
              autoComplete="postal-code"
              required
            />
          </div>
        </div>

        {/* Checkbox: Text reminders matching Screenshot 2 */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            cursor: "pointer",
            lineHeight: 1.45,
            marginTop: "4px",
          }}
        >
          <input
            type="checkbox"
            checked={smsReminders}
            onChange={(e) => onSmsRemindersChange(e.target.checked)}
            style={{
              width: "18px",
              height: "18px",
              accentColor: "var(--color-action-primary)",
              marginTop: "2px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span>
            Text me appointment reminders. Optional. Message and data rates may apply; reply STOP to opt out.
          </span>
        </label>
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

      {/* Navigation matching Screenshot 2 */}
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
          Save Details & Review Booking →
        </button>
      </div>
    </form>
  );
}

export const ContactInfoStep = Step08_ContactInfo;
