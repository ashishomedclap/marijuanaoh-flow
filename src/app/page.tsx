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
  ConsultationMode,
} from "@/lib/bookingData";

import { Header, Footer, StepProgressBar } from "@/components/common";
import {
  Step01_ServiceSelection,
  Step02_Residency,
  Step03_DateOfBirth,
  Step04_GoodCompany,
  Step05_QualifyingConditions,
  Step06_DiagnosisRecords,
  Step07_EligibilityNotice,
  Step08_ContactInfo,
  Step09_ReviewConfirm,
  Step10_PhysicianSelection,
  Step11_ScheduleAppointment,
  Step12_CheckoutPayment,
} from "@/components/steps";
import { ExitIntentModal } from "@/components/modals";
import { DiagnosisStatus, RecordsStatus } from "@/lib/bookingData";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function BookingFunnelContent() {
  const router = useRouter();

  // Complete patient intake & scheduling funnel:
  // 1: Service, 2: Residency, 3: DOB, 4: Good Company, 5: Conditions, 6: Diagnosis & Records,
  // 7: Good News, 8: Contact Info, 9: Review & Confirm, 10: Date/Time & Doctor, 11: Checkout
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Countdown timer in header (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Booking state
  const [selectedServiceId, setSelectedServiceId] = useState<"new" | "renew">("new");
  const [livesInOhio, setLivesInOhio] = useState<boolean | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [diagnosisStatus, setDiagnosisStatus] = useState<DiagnosisStatus | null>(null);
  const [recordsStatus, setRecordsStatus] = useState<RecordsStatus | null>(null);
  const [selectedPhysician, setSelectedPhysician] = useState<Physician>(PHYSICIANS_ROSTER[0]);
  const [availableDays] = useState<DaySchedule[]>(DEFAULT_DAYS);
  const [selectedDay, setSelectedDay] = useState<DaySchedule>(DEFAULT_DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState<Slot>(TIME_SLOTS[5]); // Default 2:30 PM
  const [consultationMode, setConsultationMode] = useState<ConsultationMode | null>(null);

  // Patient contact details (entered in Step 8)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [smsReminders, setSmsReminders] = useState(true);

  const patientName = `${firstName} ${lastName}`.trim() || "Sarah Jenkins";

  // Payment inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  // Submission / Loading / Error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Exit Intent Modal state ("Before You Go" when user attempts to leave window)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);

  // Detect exit intent when cursor leaves through the top of the browser window
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // clientY <= 12 means mouse is leaving through top towards address bar / tabs / close
      if (e.clientY <= 12 && !hasShownExitModal && !isExitModalOpen) {
        setIsExitModalOpen(true);
        setHasShownExitModal(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShownExitModal, isExitModalOpen]);

  // Conditions toggle handler
  const handleToggleCondition = (condition: string) => {
    setSelectedConditions((prev) => {
      if (condition === "I’m not sure which applies") {
        return prev.includes(condition) ? [] : [condition];
      }
      const filtered = prev.filter((c) => c !== "I’m not sure which applies");
      if (filtered.includes(condition)) {
        return filtered.filter((c) => c !== condition);
      } else {
        return [...filtered, condition];
      }
    });
  };

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

      const confirmedBookingData = {
        bookingId,
        service: selectedServiceId,
        doctor: selectedPhysician.id,
        date: selectedDay.fullDateFormatted,
        time: selectedSlot.time,
        mode: consultationMode || "video",
        name: patientName,
        email: patientEmail,
        phone: patientPhone,
        dob: dateOfBirth,
        resident: livesInOhio ? "yes" : "no",
        conditions: selectedConditions.join(", ") || "General evaluation",
        paid: finalTotal.toString(),
      };

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("mmj_confirmed_booking", JSON.stringify(confirmedBookingData));
        } catch (e) {
          console.error("Could not write booking to sessionStorage", e);
        }
      }

      router.push("/appointment-confirmed");
    }, 1200);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setSelectedServiceId("new");
    setLivesInOhio(null);
    setDateOfBirth("");
    setSelectedConditions([]);
    setDiagnosisStatus(null);
    setRecordsStatus(null);
    setSelectedPhysician(PHYSICIANS_ROSTER[0]);
    setSelectedDay(DEFAULT_DAYS[0]);
    setSelectedSlot(TIME_SLOTS[5]);
    setConsultationMode(null);
    setFirstName("");
    setLastName("");
    setPatientEmail("");
    setPatientPhone("");
    setZipCode("");
    setSmsReminders(true);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setConsentGiven(false);
    setPromoCodeInput("");
    setAppliedPromo(null);
    setPromoError(null);
    setPromoSuccess(null);
    setErrorMessage(null);
    setTimeLeft(300);
    setIsExitModalOpen(false);
    setHasShownExitModal(false);
  };

  const stepTitles: Record<Step, string> = {
    1: "Select Service",
    2: "Ohio Residency",
    3: "Date of Birth",
    4: "You're in Good Company",
    5: "Qualifying Conditions",
    6: "Doctor Diagnosis & Records",
    7: "Evaluation Eligibility",
    8: "Contact Information",
    9: "Review & Confirm",
    10: "Meet Your Physician",
    11: "Choose Date & Time",
    12: "Secure Checkout",
  };

  const TOTAL_STEPS = 12;

  return (
    <div className="fld0dG_funnel">
      <a href="#main" className="skip">
        Skip to content
      </a>

      {/* Header */}
      <Header
        formattedTime={formattedTime}
        onStartOver={handleStartOver}
        onTriggerExitModal={() => setIsExitModalOpen(true)}
      />

      {/* Main Funnel Stage */}
      <div id="main" className="fld0dG_stage">
        <div className="fld0dG_shell">
          <div className="fld0dG_main">
            {/* Step Progress Indicator (Step X of 12) */}
            <StepProgressBar
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              stepTitle={stepTitles[currentStep]}
            />

            {/* STEP 1: Service Selection */}
            {currentStep === 1 && (
              <Step01_ServiceSelection
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
                onContinue={() => setCurrentStep(2)}
              />
            )}

            {/* STEP 2: Ohio Residency */}
            {currentStep === 2 && (
              <Step02_Residency
                livesInOhio={livesInOhio}
                onSelectLivesInOhio={setLivesInOhio}
                onBack={() => setCurrentStep(1)}
                onContinue={() => setCurrentStep(3)}
              />
            )}

            {/* STEP 3: Date of Birth */}
            {currentStep === 3 && (
              <Step03_DateOfBirth
                dateOfBirth={dateOfBirth}
                onChangeDateOfBirth={setDateOfBirth}
                onBack={() => setCurrentStep(2)}
                onContinue={() => setCurrentStep(4)}
              />
            )}

            {/* STEP 4: You're in Good Company */}
            {currentStep === 4 && (
              <Step04_GoodCompany
                onBack={() => setCurrentStep(3)}
                onContinue={() => setCurrentStep(5)}
              />
            )}

            {/* STEP 5: Qualifying Conditions */}
            {currentStep === 5 && (
              <Step05_QualifyingConditions
                selectedConditions={selectedConditions}
                onToggleCondition={handleToggleCondition}
                onBack={() => setCurrentStep(4)}
                onContinue={() => setCurrentStep(6)}
              />
            )}

            {/* STEP 6: Doctor Diagnosis & Records Choice */}
            {currentStep === 6 && (
              <Step06_DiagnosisRecords
                diagnosisStatus={diagnosisStatus}
                recordsStatus={recordsStatus}
                onSelectDiagnosisStatus={setDiagnosisStatus}
                onSelectRecordsStatus={setRecordsStatus}
                onBack={() => setCurrentStep(5)}
                onContinue={() => setCurrentStep(7)}
              />
            )}

            {/* STEP 7: Evaluation Eligibility Notice */}
            {currentStep === 7 && (
              <Step07_EligibilityNotice
                currentService={currentService}
                selectedConditions={selectedConditions}
                onBack={() => setCurrentStep(6)}
                onContinue={() => setCurrentStep(8)}
              />
            )}

            {/* STEP 8: Contact Info */}
            {currentStep === 8 && (
              <Step08_ContactInfo
                firstName={firstName}
                lastName={lastName}
                email={patientEmail}
                phone={patientPhone}
                zipCode={zipCode}
                smsReminders={smsReminders}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
                onEmailChange={setPatientEmail}
                onPhoneChange={setPatientPhone}
                onZipCodeChange={setZipCode}
                onSmsRemindersChange={setSmsReminders}
                onBack={() => setCurrentStep(7)}
                onContinue={() => setCurrentStep(9)}
              />
            )}

            {/* STEP 9: Review & Confirm */}
            {currentStep === 9 && (
              <Step09_ReviewConfirm
                currentService={currentService}
                selectedConditions={selectedConditions}
                firstName={firstName}
                lastName={lastName}
                email={patientEmail}
                phone={patientPhone}
                onBack={() => setCurrentStep(8)}
                onContinue={() => setCurrentStep(10)}
              />
            )}

            {/* STEP 10: Meet Your Physician */}
            {currentStep === 10 && (
              <Step10_PhysicianSelection
                selectedPhysician={selectedPhysician}
                onSelectPhysician={setSelectedPhysician}
                onBack={() => setCurrentStep(9)}
                onContinue={() => setCurrentStep(11)}
                ctaText="Continue to Choose Date & Time →"
              />
            )}

            {/* STEP 11: Choose Date & Time */}
            {currentStep === 11 && (
              <Step11_ScheduleAppointment
                selectedPhysician={selectedPhysician}
                availableDays={availableDays}
                selectedDay={selectedDay}
                selectedSlot={selectedSlot}
                currentService={currentService}
                consultationMode={consultationMode}
                patientPhone={patientPhone}
                onSelectConsultationMode={setConsultationMode}
                onSelectDay={setSelectedDay}
                onSelectSlot={setSelectedSlot}
                onBack={() => setCurrentStep(10)}
                onContinue={() => setCurrentStep(12)}
              />
            )}

            {/* STEP 12: Checkout */}
            {currentStep === 12 && (
              <Step12_CheckoutPayment
                currentService={currentService}
                selectedPhysician={selectedPhysician}
                selectedDay={selectedDay}
                selectedSlot={selectedSlot}
                consultationMode={consultationMode || "video"}
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
                onBack={() => setCurrentStep(11)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Exit Intent "Before You Go" Modal */}
      <ExitIntentModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onContinue={() => setIsExitModalOpen(false)}
        defaultEmail={patientEmail || "sarah.jenkins@example.com"}
      />
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
