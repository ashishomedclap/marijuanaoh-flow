"use client";

import React, { useState, useEffect, Suspense } from "react";
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

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { StepProgressBar } from "@/components/common/StepProgressBar";
import { ServiceSelectionStep } from "@/components/steps/ServiceSelectionStep";
import { PhysicianSelectionStep } from "@/components/steps/PhysicianSelectionStep";
import { ScheduleStep } from "@/components/steps/ScheduleStep";
import { CheckoutStep } from "@/components/steps/CheckoutStep";

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
  const [selectedSlot, setSelectedSlot] = useState<Slot>(TIME_SLOTS[5]); // Default 2:30 PM

  // Pre-filled from intake survey responses
  const [patientName] = useState("Sarah Jenkins");
  const [patientEmail] = useState("sarah.jenkins@example.com");
  const [patientPhone] = useState("(614) 555-0192");

  // Payment inputs
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

  const handleFillDemoPayment = () => {
    setCardNumber("4242 •••• •••• 4242");
    setCardExpiry("12/28");
    setCardCvc("842");
    setZipCode("43215");
    setConsentGiven(true);
    setErrorMessage(null);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!cardNumber || !cardExpiry || !cardCvc || !zipCode) {
      setErrorMessage("Please complete all payment card fields.");
      return;
    }

    if (!consentGiven) {
      setErrorMessage("Please check the consent box to proceed with telehealth evaluation.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = `MMJ-OH-${Math.floor(10000 + Math.random() * 90000)}`;

      const params = new URLSearchParams({
        bookingId,
        service: selectedServiceId,
        doctor: selectedPhysician.id,
        date: selectedDay.fullDateFormatted,
        time: selectedSlot.time,
        name: patientName,
        email: patientEmail,
        paid: finalTotal.toString(),
      });

      router.push(`/confirmation?${params.toString()}`);
    }, 1200);
  };

  const stepTitles: Record<Step, string> = {
    1: "Select Service",
    2: "Meet Your Physician",
    3: "Choose Date & Time",
    4: "Secure Checkout",
  };

  return (
    <div className="fld0dG_funnel">
      <a href="#main" className="skip">
        Skip to content
      </a>

      {/* Header */}
      <Header formattedTime={formattedTime} />

      {/* Main Funnel Stage */}
      <div id="main" className="fld0dG_stage">
        <div className="fld0dG_shell">
          <div className="fld0dG_main">
            {/* Step Progress Indicator */}
            <StepProgressBar currentStep={currentStep} stepTitle={stepTitles[currentStep]} />

            {/* STEP 1: Service Selection */}
            {currentStep === 1 && (
              <ServiceSelectionStep
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
                onContinue={() => setCurrentStep(2)}
              />
            )}

            {/* STEP 2: Meet Your Physician */}
            {currentStep === 2 && (
              <PhysicianSelectionStep
                selectedPhysician={selectedPhysician}
                onSelectPhysician={setSelectedPhysician}
                onBack={() => setCurrentStep(1)}
                onContinue={() => setCurrentStep(3)}
              />
            )}

            {/* STEP 3: Choose Date & Time */}
            {currentStep === 3 && (
              <ScheduleStep
                selectedPhysician={selectedPhysician}
                availableDays={availableDays}
                selectedDay={selectedDay}
                selectedSlot={selectedSlot}
                currentService={currentService}
                onSelectDay={setSelectedDay}
                onSelectSlot={setSelectedSlot}
                onBack={() => setCurrentStep(2)}
                onContinue={() => setCurrentStep(4)}
              />
            )}

            {/* STEP 4: Checkout */}
            {currentStep === 4 && (
              <CheckoutStep
                currentService={currentService}
                selectedPhysician={selectedPhysician}
                selectedDay={selectedDay}
                selectedSlot={selectedSlot}
                finalTotal={finalTotal}
                patientName={patientName}
                patientPhone={patientPhone}
                patientEmail={patientEmail}
                promoCodeInput={promoCodeInput}
                appliedPromo={appliedPromo}
                promoError={promoError}
                promoSuccess={promoSuccess}
                onPromoCodeChange={(val) => {
                  setPromoCodeInput(val);
                  setPromoError(null);
                }}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
                cardNumber={cardNumber}
                cardExpiry={cardExpiry}
                cardCvc={cardCvc}
                zipCode={zipCode}
                consentGiven={consentGiven}
                onCardNumberChange={setCardNumber}
                onCardExpiryChange={setCardExpiry}
                onCardCvcChange={setCardCvc}
                onZipCodeChange={setZipCode}
                onConsentChange={setConsentGiven}
                onFillDemoPayment={handleFillDemoPayment}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                onSubmitPayment={handlePaymentSubmit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
          <div className="fld0dG_kicker">Loading appointment journey...</div>
        </div>
      }
    >
      <BookingFunnelContent />
    </Suspense>
  );
}
