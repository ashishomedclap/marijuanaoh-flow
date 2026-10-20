"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  SERVICES_CATALOG,
  PHYSICIANS_ROSTER,
  DEFAULT_DAYS,
  TIME_SLOTS,
  Physician,
  DaySchedule,
  Slot,
} from "@/lib/bookingData";

type Step = 1 | 2 | 3 | 4;

function BookingFunnelContent() {
  const router = useRouter();

  // Steps: 1: Service, 2: Physician, 3: Date/Time, 4: Checkout
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Countdown timer in header
  const [timeLeft, setTimeLeft] = useState<number>(78);

  // Booking state
  const [selectedServiceId, setSelectedServiceId] = useState<"new" | "renew">("new");
  const [selectedPhysician, setSelectedPhysician] = useState<Physician>(PHYSICIANS_ROSTER[0]);

  const [availableDays] = useState<DaySchedule[]>(DEFAULT_DAYS);
  const [selectedDay, setSelectedDay] = useState<DaySchedule>(DEFAULT_DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState<Slot>(TIME_SLOTS[5]); // Default e.g. 2:30 PM

  // Pre-filled from intake survey responses
  const [patientName] = useState("Sarah Jenkins");
  const [patientEmail] = useState("sarah.jenkins@example.com");
  const [patientPhone] = useState("(614) 555-0192");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  // Submission / Loading / Error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const currentService = SERVICES_CATALOG[selectedServiceId];
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, currentService.total - discountAmount);

  const handleApplyPromo = () => {
    const cleanCode = promoCodeInput.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError("Please enter a promo code.");
      setPromoSuccess(null);
      return;
    }

    if (cleanCode === "OHIO20" || cleanCode === "SAVE20") {
      setAppliedPromo({ code: cleanCode, discount: 20 });
      setPromoSuccess(`Promo code "${cleanCode}" applied! $20.00 saved.`);
      setPromoError(null);
    } else if (cleanCode === "SAVE10" || cleanCode === "MMJ10") {
      setAppliedPromo({ code: cleanCode, discount: 10 });
      setPromoSuccess(`Promo code "${cleanCode}" applied! $10.00 saved.`);
      setPromoError(null);
    } else if (cleanCode === "OHIO15" || cleanCode === "SPECIAL15") {
      setAppliedPromo({ code: cleanCode, discount: 15 });
      setPromoSuccess(`Promo code "${cleanCode}" applied! $15.00 saved.`);
      setPromoError(null);
    } else {
      setPromoError(`Code "${cleanCode}" is invalid or expired. Try "OHIO20" for $20 off.`);
      setPromoSuccess(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput("");
    setPromoSuccess(null);
    setPromoError(null);
  };

  // Helper for demo payment autofill
  const handleFillDemoPayment = () => {
    setCardNumber("4242 •••• •••• 4242");
    setCardExpiry("12/28");
    setCardCvc("842");
    setZipCode("43215");
    setConsentGiven(true);
    setErrorMessage(null);
  };

  // Process checkout submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
      setErrorMessage("Please provide valid payment card details.");
      return;
    }
    if (!consentGiven) {
      setErrorMessage("Please agree to the telehealth consent to complete your booking.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Simulate backend payment gateway processing with verification
    setTimeout(() => {
      const generatedBookingId = `MMJ-OH-${Math.floor(10000 + Math.random() * 90000)}`;
      const query = new URLSearchParams({
        bookingId: generatedBookingId,
        service: selectedServiceId,
        doctor: selectedPhysician.id,
        date: selectedDay.fullDateFormatted,
        time: selectedSlot.time,
        name: patientName,
        email: patientEmail,
        paid: finalTotal.toString(),
      });

      // Navigate to the confirmation screen URL slug
      router.push(`/confirmation?${query.toString()}`);
    }, 1200);
  };

  return (
    <div className="fld0dG_funnel">
      <a href="#main" className="skip">
        Skip to content
      </a>

      {/* Header */}
      <header className="fld0dG_fHead">
        <span className="fld0dG_brand">
          <svg
            width="32"
            height="32"
            viewBox="8 8 84 84"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M45 45 C20 44 11 27 13 10 C31 8 46 19 45 45 Z M45 55 C20 54 9 71 10 89 C29 91 45 79 45 55 Z M55 55 C54 80 71 91 89 90 C91 71 79 55 55 55 Z"
              fill="var(--teal-600)"
            />
            <path
              d="M55 45 C54 20 71 9 89 10 C91 29 79 45 55 45 Z"
              fill="var(--sun-400)"
            />
          </svg>
          <span>Marijuana Card OH</span>
        </span>

        <span
          className="fld0dG_timer"
          role="timer"
          aria-label={`About ${minutes} minutes ${seconds} seconds left`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z M12 7v5l3 2" />
          </svg>
          <span className="fld0dG_timerLabel">Time left</span>
          <strong>{formattedTime}</strong>
        </span>

        <span />
      </header>

      {/* Main Funnel Stage */}
      <div id="main" className="fld0dG_stage">
        <div className="fld0dG_shell">
          <div className="fld0dG_main">
            {/* Dynamic Step Progress Indicator */}
            <div className="fld0dG_progress" aria-label={`Step ${currentStep} of 4`}>
              <div className="fld0dG_bar">
                <span
                  style={{
                    width: `${(currentStep / 4) * 100}%`,
                  }}
                />
              </div>
              <p className="fld0dG_stepOf">
                Step {currentStep} of 4 ·{" "}
                {currentStep === 1 && "Select Service"}
                {currentStep === 2 && "Meet Your Physician"}
                {currentStep === 3 && "Choose Date & Time"}
                {currentStep === 4 && "Secure Checkout"}
              </p>
            </div>

            {/* SCREEN 1: What can we help you with? */}
            {currentStep === 1 && (
              <form
                className="fld0dG_card"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  setCurrentStep(2);
                }}
              >
                <p className="fld0dG_kicker">TAKES ABOUT 2 MINUTES</p>
                <h1 tabIndex={-1} className="fld0dG_q">
                  What can we help you with?
                </h1>

                <div className="fld0dG_choices">
                  {/* Option 1: New card */}
                  <button
                    type="button"
                    className={`fld0dG_choice ${
                      selectedServiceId === "new" ? "fld0dG_selected" : ""
                    }`}
                    aria-pressed={selectedServiceId === "new"}
                    onClick={() => setSelectedServiceId("new")}
                  >
                    <span className="fld0dG_choiceIcon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z M15.5 8.5l-2 5-5 2 2-5Z" />
                      </svg>
                    </span>
                    <span className="fld0dG_choiceText">
                      <span className="fld0dG_choiceTitle">
                        {SERVICES_CATALOG.new.title}
                      </span>
                      <span className="fld0dG_choiceHint">
                        ${SERVICES_CATALOG.new.price} evaluation
                      </span>
                    </span>
                    <span className="fld0dG_radio" aria-hidden="true" />
                  </button>

                  {/* Option 2: Renew card */}
                  <button
                    type="button"
                    className={`fld0dG_choice ${
                      selectedServiceId === "renew" ? "fld0dG_selected" : ""
                    }`}
                    aria-pressed={selectedServiceId === "renew"}
                    onClick={() => setSelectedServiceId("renew")}
                  >
                    <span className="fld0dG_choiceIcon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 2l4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3" />
                      </svg>
                    </span>
                    <span className="fld0dG_choiceText">
                      <span className="fld0dG_choiceTitle">
                        {SERVICES_CATALOG.renew.title}
                      </span>
                      <span className="fld0dG_choiceHint">
                        ${SERVICES_CATALOG.renew.price} evaluation
                      </span>
                    </span>
                    <span className="fld0dG_radio" aria-hidden="true" />
                  </button>
                </div>

                {/* Continue button */}
                <div style={{ marginTop: "var(--space-md)" }}>
                  <button
                    type="button"
                    className="fld0dG_primary"
                    style={{ width: "100%" }}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Physician Selection →
                  </button>
                </div>

                {/* Assurances */}
                <div className="fld0dG_nav">
                  <ul className="fld0dG_assure" aria-label="Why patients choose us">
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z M16 11l2 2 4-4" />
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
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4" />
                      </svg>
                      Money back if you don’t qualify
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
                        <path d="M5 2v20l2-1.5L9 22l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5V2l-2 1.5L15 2l-2 1.5L11 2 9 3.5 7 2Z M15 8H9 M15 12H9 M13 16H9" />
                      </svg>
                      No state fee
                    </li>
                  </ul>
                </div>
              </form>
            )}

            {/* SCREEN 2: Meet Your Physician */}
            {currentStep === 2 && (
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
                        onClick={() => setSelectedPhysician(physician)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setSelectedPhysician(physician);
                        }}
                      >
                        <div className="fld0dG_docAvatar">{physician.avatarText}</div>
                        <div className="fld0dG_docText">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px" }}>
                            <div>
                              <div className="doc_name">{physician.name}</div>
                              <div className="doc_meta">{physician.boardNumber} · {physician.credentials}</div>
                            </div>
                            <span className="doc_badge">{physician.badge}</span>
                          </div>

                          <div className="doc_stars">
                            <span>★★★★★</span>
                            <span style={{ color: "var(--teal-800)" }}>
                              {physician.rating} ({physician.reviewsCount} reviews)
                            </span>
                          </div>

                          <p style={{ margin: "4px 0 0", color: "var(--color-text-secondary)", fontSize: "0.875rem", lineHeight: 1.45 }}>
                            {physician.bio}
                          </p>

                          <div style={{ marginTop: "6px", fontSize: "0.8125rem", color: "var(--green-600)", fontWeight: 700 }}>
                            🟢 {physician.availabilityStatus}
                          </div>
                        </div>

                        <span
                          className="fld0dG_radio"
                          style={{
                            borderColor: isSelected ? "var(--color-action-primary)" : "var(--color-border-strong)",
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
                    onClick={() => setCurrentStep(1)}
                    className="fld0dG_ghost"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="fld0dG_primary"
                  >
                    Choose Date & Time with {selectedPhysician.name.split(",")[0]} →
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 3: Choose Date and Time */}
            {currentStep === 3 && (
              <div className="fld0dG_card">
                <p className="fld0dG_kicker">SCHEDULE TELEHEALTH APPOINTMENT</p>
                <h1 tabIndex={-1} className="fld0dG_q">
                  Choose Date & Time
                </h1>
                <p className="fld0dG_subtitle">
                  Select a convenient 10-15 minute video appointment slot with {selectedPhysician.name}.
                  Times are displayed in Eastern Time (EDT).
                </p>

                <div className="schedule_section">
                  {/* Date selector tabs */}
                  <div>
                    <div className="slot_group_title">Available Dates</div>
                    <div className="days_row">
                      {availableDays.map((day) => {
                        const isDayActive = selectedDay.dateString === day.dateString;
                        return (
                          <button
                            type="button"
                            key={day.dateString}
                            className={`btn_day ${isDayActive ? "activeDay" : ""}`}
                            onClick={() => setSelectedDay(day)}
                          >
                            <span className="day_name">{day.dayLabel}</span>
                            <span className="day_date">{day.monthDate}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots by period */}
                  <div>
                    <div className="slot_group_title">
                      Afternoon Slots ({selectedDay.dayLabel}, {selectedDay.monthDate})
                    </div>
                    <div className="slots_grid">
                      {TIME_SLOTS.filter((s) => s.period === "Afternoon").map((slot) => {
                        const isSlotActive = selectedSlot.id === slot.id;
                        return (
                          <button
                            type="button"
                            key={slot.id}
                            className={`btn_slot ${isSlotActive ? "activeSlot" : ""}`}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="slot_group_title">Morning & Evening Slots</div>
                    <div className="slots_grid">
                      {TIME_SLOTS.filter((s) => s.period !== "Afternoon").map((slot) => {
                        const isSlotActive = selectedSlot.id === slot.id;
                        return (
                          <button
                            type="button"
                            key={slot.id}
                            className={`btn_slot ${isSlotActive ? "activeSlot" : ""}`}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Summary Bar */}
                  <div className="selected_summary_bar">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>
                        <strong>{selectedDay.dayLabel}, {selectedDay.monthDate}</strong> at{" "}
                        <strong>{selectedSlot.time} EDT</strong>
                      </span>
                    </div>
                    <span style={{ fontSize: "0.8125rem", color: "var(--teal-700)" }}>
                      with {selectedPhysician.name.split(",")[0]}
                    </span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="fld0dG_nav">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="fld0dG_ghost"
                  >
                    ← Back to Doctors
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="fld0dG_primary"
                  >
                    Proceed to Checkout (${currentService.price}) →
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: Checkout */}
            {currentStep === 4 && (
              <form className="fld0dG_card" noValidate onSubmit={handlePaymentSubmit}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <p className="fld0dG_kicker">SECURE 256-BIT ENCRYPTED CHECKOUT</p>
                  <button
                    type="button"
                    onClick={handleFillDemoPayment}
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
                      onChange={(e) => {
                        setPromoCodeInput(e.target.value);
                        setPromoError(null);
                      }}
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
                        onClick={handleRemovePromo}
                        className="fld0dG_ghost"
                        style={{ minHeight: "44px", color: "var(--color-status-error)", fontWeight: 700 }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyPromo}
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

                {/* Verified Patient Info (Already shared from previous survey steps) */}
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
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      required
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-sm)" }}>
                      <input
                        type="text"
                        className="fld0dG_input"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                        required
                      />
                      <input
                        type="text"
                        className="fld0dG_input"
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={4}
                        required
                      />
                      <input
                        type="text"
                        className="fld0dG_input"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
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
                      onChange={(e) => setConsentGiven(e.target.checked)}
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
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fld0dG_fFoot">
        <p>
          © 2026 Marijuana Card OH ·{" "}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>
            Privacy
          </a>{" "}
          ·{" "}
          <a href="#terms" onClick={(e) => e.preventDefault()}>
            Terms
          </a>
        </p>
        <p>In crisis? Call or text 988. In an emergency, call 911.</p>
      </footer>

      {/* Keyframe animation for spinner */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function BookingFunnel() {
  return (
    <React.Suspense
      fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
          <p>Loading booking flow...</p>
        </div>
      }
    >
      <BookingFunnelContent />
    </React.Suspense>
  );
}
