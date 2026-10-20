"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES_CATALOG, PHYSICIANS_ROSTER } from "@/lib/bookingData";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId") || "MMJ-OH-89241";
  const serviceKey = (searchParams.get("service") as "new" | "renew") || "new";
  const doctorId = searchParams.get("doctor") || "dr-miller";
  const dateFormatted = searchParams.get("date") || "Today, October 20, 2026";
  const timeSlot = searchParams.get("time") || "2:30 PM";
  const patientName = searchParams.get("name") || "Valued Patient";
  const patientEmail = searchParams.get("email") || "patient@example.com";
  const paidAmount = searchParams.get("paid") || (SERVICES_CATALOG[serviceKey] || SERVICES_CATALOG.new).total.toString();

  const service = SERVICES_CATALOG[serviceKey] || SERVICES_CATALOG.new;
  const physician =
    PHYSICIANS_ROSTER.find((d) => d.id === doctorId) || PHYSICIANS_ROSTER[0];

  const statusBadge = (
    <span className="fld0dG_timer" role="status" style={{ background: "var(--green-50)", color: "var(--green-600)" }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <strong style={{ color: "var(--green-600)" }}>Payment Confirmed</strong>
    </span>
  );

  return (
    <div className="fld0dG_funnel">
      <a href="#main" className="skip">
        Skip to content
      </a>

      {/* Header */}
      <Header showTimer={false} statusBadge={statusBadge} />

      {/* Main Stage */}
      <div id="main" className="fld0dG_stage">
        <div className="fld0dG_shell">
          <div className="fld0dG_main">
            {/* Step indicator */}
            <div className="fld0dG_progress" aria-label="Step 4 of 4: Completed">
              <div className="fld0dG_bar">
                <span style={{ width: "100%", background: "var(--green-600)" }} />
              </div>
              <p className="fld0dG_stepOf" style={{ color: "var(--green-600)", fontWeight: 700 }}>
                Step 4 of 4 · Booking & Payment Complete
              </p>
            </div>

            {/* Confirmation Card */}
            <div className="fld0dG_card" style={{ gap: "var(--space-xl)" }}>
              <div className="fld0dG_done">
                <div className="fld0dG_doneIcon">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <span className="confirm_badge">CONFIRMATION #{bookingId}</span>

                <h1 className="fld0dG_q" style={{ textAlign: "center" }}>
                  You&apos;re all set, {patientName}!
                </h1>

                <p className="fld0dG_subtitle" style={{ textAlign: "center", maxWidth: "34rem" }}>
                  Your appointment has been booked and your payment of{" "}
                  <strong>${paidAmount}.00</strong> was verified successfully. A confirmation receipt
                  and your private telehealth video link were sent to{" "}
                  <strong>{patientEmail}</strong>.
                </p>
              </div>

              {/* Appointment Details Box */}
              <div className="booking_details_box">
                <div className="detail_row">
                  <div className="detail_icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 700 }}>
                      DATE & TIME
                    </div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: "var(--color-text-brand)" }}>
                      {dateFormatted} at {timeSlot} (EDT)
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--teal-600)" }}>
                      Telehealth Video Call (10-15 minutes)
                    </div>
                  </div>
                </div>

                <div className="detail_row">
                  <div className="detail_icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 700 }}>
                      LICENSED PHYSICIAN
                    </div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: "var(--color-text-brand)" }}>
                      {physician.name}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                      {physician.boardNumber} · {physician.credentials}
                    </div>
                  </div>
                </div>

                <div className="detail_row">
                  <div className="detail_icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 700 }}>
                      SERVICE SELECTED & PAYMENT
                    </div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: "var(--color-text-brand)" }}>
                      {service.title}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--green-600)", fontWeight: 600 }}>
                      Paid: ${paidAmount}.00 (No state fee · 100% money back guarantee)
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)", justifyContent: "center" }}>
                <a
                  href={`https://portal.marijuanacardoh.com/patient/${bookingId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fld0dG_primary"
                  style={{ textDecoration: "none", minWidth: "220px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Redirecting to patient portal for appointment ${bookingId}. Details have also been emailed to ${patientEmail}.`);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Go to the portal
                </a>
              </div>

              {/* What happens next section */}
              <div style={{ borderTop: "1px solid var(--color-border-default)", paddingTop: "var(--space-lg)" }}>
                <p className="fld0dG_kicker" style={{ marginBottom: "var(--space-md)" }}>
                  WHAT HAPPENS NEXT
                </p>
                <ul className="fld0dG_prep">
                  <li>
                    <span className="step_number">1</span>
                    <div>
                      <strong>Check your email for the video link:</strong> We&apos;ve sent your meeting URL and
                      pre-consultation guide to <strong>{patientEmail}</strong>.
                    </div>
                  </li>
                  <li>
                    <span className="step_number">2</span>
                    <div>
                      <strong>Connect from any device:</strong> Smartphone, iPad, tablet, or desktop computer with a
                      camera and microphone. No app download required.
                    </div>
                  </li>
                  <li>
                    <span className="step_number">3</span>
                    <div>
                      <strong>Brief 10-15 minute visit:</strong> {physician.name} will discuss your medical history,
                      symptoms, and qualify you for the Ohio Medical Marijuana Control Program.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
          <p>Loading your confirmation details...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
