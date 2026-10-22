"use client";

import React, { useEffect, useRef, useState } from "react";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  defaultEmail?: string;
}

export function ExitIntentModal({
  isOpen,
  onClose,
  onContinue,
  defaultEmail = "sarah.jenkins@example.com",
}: ExitIntentModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState(defaultEmail);
  const [subscribeChecked, setSubscribeChecked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Sync defaultEmail when modal opens
  useEffect(() => {
    if (isOpen) {
      if (defaultEmail && defaultEmail.trim()) {
        setEmail(defaultEmail);
      }
      setEmailSent(false);
      setEmailError(null);
    }
  }, [isOpen, defaultEmail]);

  // Handle ESC key and focus lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    setEmailSent(true);
  };

  return (
    <div
      className="modal_overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="exit_modal_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
        aria-describedby="exit-modal-desc"
        tabIndex={-1}
        ref={dialogRef}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="exit_close_btn"
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header Section */}
        <div>
          <p className="exit_kicker">BEFORE YOU GO</p>
          <h2 id="exit-modal-title" className="exit_title">
            You&apos;re nearly there
          </h2>
          <p id="exit-modal-desc" className="exit_subtitle">
            Most people finish in about 5 minutes. If something&apos;s holding you back, here&apos;s what to know:
          </p>
        </div>

        {/* Value Reassurance Bullets */}
        <ul className="exit_bullets" aria-label="Key patient benefits">
          <li className="exit_bullet_item">
            <span className="exit_check_icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Ohio-licensed physicians whose licenses you can look up</span>
          </li>

          <li className="exit_bullet_item">
            <span className="exit_check_icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>100% money-back guarantee if you don&apos;t qualify</span>
          </li>

          <li className="exit_bullet_item">
            <span className="exit_check_icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Ohio charges no state registration fee</span>
          </li>
        </ul>

        {/* Primary Action Button */}
        <div>
          <button
            type="button"
            onClick={onContinue}
            className="exit_btn_primary"
          >
            Continue my answers
          </button>
        </div>

        {/* Divider */}
        <div className="exit_divider" />

        {/* Finish Later Section */}
        <div className="exit_finish_section">
          <h3 className="exit_finish_title">Finish later?</h3>
          <p className="exit_finish_desc">
            We&apos;ll email you a link to come back. For your privacy we don&apos;t save your answers, and starting again takes about 5 minutes.
          </p>

          {emailSent ? (
            <div
              style={{
                background: "var(--teal-50)",
                border: "1px solid var(--teal-300)",
                color: "var(--teal-900)",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "0.9375rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 600,
              }}
              role="status"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>We&apos;ve emailed your return link to {email}!</span>
            </div>
          ) : (
            <form onSubmit={handleSendLink} noValidate style={{ display: "grid", gap: "10px" }}>
              <div>
                <label htmlFor="exit-email-input" className="exit_email_label">
                  Email address
                </label>
                <div className="exit_input_row" style={{ marginTop: "6px" }}>
                  <input
                    id="exit-email-input"
                    type="email"
                    className="exit_input"
                    value={email}
                    onChange={(e) => {
                      setEmailError(null);
                      setEmail(e.target.value);
                    }}
                    placeholder="sarah.jenkins@example.com"
                    autoComplete="email"
                  />
                  <button type="submit" className="exit_btn_email">
                    Email me a link
                  </button>
                </div>
                {emailError && (
                  <p style={{ color: "var(--color-status-error)", fontSize: "0.8125rem", margin: "4px 0 0 4px", fontWeight: 600 }}>
                    {emailError}
                  </p>
                )}
              </div>

              <label className="exit_checkbox_label">
                <input
                  type="checkbox"
                  checked={subscribeChecked}
                  onChange={(e) => setSubscribeChecked(e.target.checked)}
                  className="exit_checkbox"
                />
                <span>
                  Email me a link to finish, plus occasional Ohio medical card updates. Unsubscribe anytime.
                </span>
              </label>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
