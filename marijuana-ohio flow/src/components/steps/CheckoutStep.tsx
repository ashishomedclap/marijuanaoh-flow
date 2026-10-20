import React from "react";
import { ServicePlan, Physician, DaySchedule, Slot } from "@/lib/bookingData";

interface CheckoutStepProps {
  currentService: ServicePlan;
  selectedPhysician: Physician;
  selectedDay: DaySchedule;
  selectedSlot: Slot;
  finalTotal: number;
  // Patient details
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  // Promo code
  promoCodeInput: string;
  appliedPromo: { code: string; discount: number } | null;
  promoError: string | null;
  promoSuccess: string | null;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
  // Card inputs
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  zipCode: string;
  consentGiven: boolean;
  onCardNumberChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvcChange: (value: string) => void;
  onZipCodeChange: (value: string) => void;
  onConsentChange: (value: boolean) => void;
  onFillDemoPayment: () => void;
  // Submission
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmitPayment: (e: React.FormEvent) => void;
}

export function CheckoutStep({
  currentService,
  selectedPhysician,
  selectedDay,
  selectedSlot,
  finalTotal,
  patientName,
  patientPhone,
  patientEmail,
  promoCodeInput,
  appliedPromo,
  promoError,
  promoSuccess,
  onPromoCodeChange,
  onApplyPromo,
  onRemovePromo,
  cardNumber,
  cardExpiry,
  cardCvc,
  zipCode,
  consentGiven,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
  onZipCodeChange,
  onConsentChange,
  onFillDemoPayment,
  isSubmitting,
  errorMessage,
  onSubmitPayment,
}: CheckoutStepProps) {
  return (
    <form className="fld0dG_card" noValidate onSubmit={onSubmitPayment}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p className="fld0dG_kicker">SECURE 256-BIT ENCRYPTED CHECKOUT</p>
        <button
          type="button"
          onClick={onFillDemoPayment}
          style={{
            background: "var(--teal-100)",
            border: "1px dashed var(--teal-600)",
            color: "var(--teal-800)",
            padding: "4px 10px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.75rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ⚡ Auto-Fill Test Card Details
        </button>
      </div>

      <h1 tabIndex={-1} className="fld0dG_q">
        Review & Complete Booking
      </h1>

      {/* Summary Box */}
      <div className="checkout_summary_card">
        <div className="summary_header">
          <div>
            <strong style={{ fontSize: "1.0625rem", color: "var(--color-text-brand)" }}>
              {currentService.title}
            </strong>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              {selectedPhysician.name} · {selectedDay.fullDateFormatted} at {selectedSlot.time} EDT
            </div>
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-brand)" }}>
            ${currentService.price}
          </span>
        </div>

        <div className="summary_item">
          <span>Telehealth Video Consultation</span>
          <span>${currentService.price}.00</span>
        </div>

        <div className="summary_item">
          <span>Electronic Certification & State Submission</span>
          <span className="free_tag">Included</span>
        </div>

        {appliedPromo && (
          <div className="summary_item" style={{ color: "var(--green-600)", fontWeight: 700 }}>
            <span>Promo Discount ({appliedPromo.code})</span>
            <span>-${appliedPromo.discount}.00</span>
          </div>
        )}

        <div className="summary_item total">
          <span>Total Due Today</span>
          <span>${finalTotal}.00</span>
        </div>
      </div>

      {/* Promo Code Input & Apply Field */}
      <div
        style={{
          background: "var(--color-bg-surface)",
          border: "1.5px dashed var(--color-border-strong)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-md) var(--space-lg)",
          display: "grid",
          gap: "var(--space-xs)",
        }}
      >
        <label
          htmlFor="promo-code"
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--color-text-brand)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Have a Promo Code?
        </label>

        <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "2px" }}>
          <input
            id="promo-code"
            type="text"
            className="fld0dG_input"
            placeholder="Enter promo code (e.g. OHIO20)"
            value={promoCodeInput}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            disabled={!!appliedPromo}
            style={{
              minHeight: "44px",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.05em",
              flex: 1,
            }}
          />

          {appliedPromo ? (
            <button
              type="button"
              onClick={onRemovePromo}
              className="fld0dG_ghost"
              style={{ minHeight: "44px", color: "var(--color-status-error)", fontWeight: 700 }}
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={onApplyPromo}
              className="fld0dG_primary"
              style={{ minHeight: "44px", padding: "0 var(--space-lg)", fontSize: "0.9375rem" }}
            >
              Apply
            </button>
          )}
        </div>

        {promoSuccess && (
          <div style={{ fontSize: "0.8125rem", color: "var(--green-600)", fontWeight: 700, marginTop: "4px" }}>
            ✓ {promoSuccess}
          </div>
        )}

        {promoError && (
          <div style={{ fontSize: "0.8125rem", color: "var(--color-status-error)", fontWeight: 600, marginTop: "4px" }}>
            ✕ {promoError}
          </div>
        )}
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="fld0dG_error" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Verified Patient Info */}
      <div
        style={{
          background: "var(--teal-50)",
          border: "1px solid var(--teal-200)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-md) var(--space-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-md)",
          fontSize: "0.875rem",
          color: "var(--teal-900)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: "var(--teal-600)", flexShrink: 0 }}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <div>
            <strong>Patient:</strong> {patientName} · {patientPhone}
            <div style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem" }}>
              Video link & receipt will be sent to <strong>{patientEmail}</strong>
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--green-600)",
            background: "var(--color-status-success-bg)",
            padding: "3px 8px",
            borderRadius: "var(--radius-full)",
            whiteSpace: "nowrap",
          }}
        >
          ✓ Contact Shared
        </span>
      </div>

      <div style={{ display: "grid", gap: "var(--space-md)" }}>
        {/* Payment Card Fields */}
        <div className="cc_box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label className="fld0dG_label" style={{ marginBottom: 0 }}>
              Credit or Debit Card
            </label>
            <div className="secure_badges">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>

          <input
            type="text"
            className="fld0dG_input"
            placeholder="Card number (4242 •••• •••• 4242)"
            value={cardNumber}
            onChange={(e) => onCardNumberChange(e.target.value)}
            maxLength={19}
            required
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-sm)" }}>
            <input
              type="text"
              className="fld0dG_input"
              placeholder="MM / YY"
              value={cardExpiry}
              onChange={(e) => onCardExpiryChange(e.target.value)}
              maxLength={5}
              required
            />
            <input
              type="text"
              className="fld0dG_input"
              placeholder="CVC"
              value={cardCvc}
              onChange={(e) => onCardCvcChange(e.target.value)}
              maxLength={4}
              required
            />
            <input
              type="text"
              className="fld0dG_input"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => onZipCodeChange(e.target.value)}
              maxLength={5}
              required
            />
          </div>
        </div>

        {/* Telehealth Consent Checkbox */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-md)",
            fontSize: "0.875rem",
            cursor: "pointer",
            color: "var(--color-text-primary)",
            marginTop: "var(--space-xs)",
          }}
        >
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => onConsentChange(e.target.checked)}
            style={{ width: "20px", height: "20px", accentColor: "var(--teal-600)", marginTop: "2px" }}
          />
          <span>
            I consent to receive telehealth medical marijuana evaluation services and agree to the{" "}
            <a href="#terms" style={{ textDecoration: "underline", color: "var(--teal-600)" }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" style={{ textDecoration: "underline", color: "var(--teal-600)" }}>
              Notice of Privacy Practices
            </a>
            .
          </span>
        </label>
      </div>

      {/* Money Back Guarantee callout */}
      <div className="fld0dG_guaranteeBox">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4" />
        </svg>
        <div style={{ fontSize: "0.875rem", color: "var(--green-600)", lineHeight: 1.45 }}>
          <strong>100% Money-Back Guarantee:</strong> If the physician determines you do not qualify for an
          Ohio medical marijuana card, you receive an immediate full refund of ${currentService.total}.
        </div>
      </div>

      {/* Action Button */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "var(--space-md)" }}>
        <button
          type="submit"
          className="fld0dG_primary"
          disabled={isSubmitting}
          style={{ width: "100%", minHeight: "54px", fontSize: "1.0625rem" }}
        >
          {isSubmitting ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                style={{ animation: "spin 1s linear infinite" }}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Verifying Payment...
            </span>
          ) : (
            `Pay $${finalTotal}.00 & Confirm Appointment`
          )}
        </button>
      </div>
    </form>
  );
}
