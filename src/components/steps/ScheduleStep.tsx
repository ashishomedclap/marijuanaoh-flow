"use client";

import React, { useState } from "react";
import {
  Physician,
  DaySchedule,
  Slot,
  TIME_SLOTS,
  ServicePlan,
  ConsultationMode,
} from "@/lib/bookingData";
import { ConsultationModeModal } from "@/components/modals/ConsultationModeModal";

interface ScheduleStepProps {
  selectedPhysician: Physician;
  availableDays: DaySchedule[];
  selectedDay: DaySchedule;
  selectedSlot: Slot;
  currentService: ServicePlan;
  consultationMode: ConsultationMode | null;
  patientPhone: string;
  onSelectConsultationMode: (mode: ConsultationMode) => void;
  onSelectDay: (day: DaySchedule) => void;
  onSelectSlot: (slot: Slot) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function ScheduleStep({
  selectedPhysician,
  availableDays,
  selectedDay,
  selectedSlot,
  currentService,
  consultationMode,
  patientPhone,
  onSelectConsultationMode,
  onSelectDay,
  onSelectSlot,
  onBack,
  onContinue,
}: ScheduleStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSlotClick = (slot: Slot) => {
    onSelectSlot(slot);
    setValidationError(null);
  };

  const handleProceedClick = () => {
    if (!consultationMode) {
      setValidationError("Please choose an Audio or Video call option to proceed.");
      setIsModalOpen(true);
      return;
    }
    setValidationError(null);
    onContinue();
  };

  return (
    <div className="fld0dG_card">
      <p className="fld0dG_kicker">SCHEDULE TELEHEALTH APPOINTMENT</p>
      <h1 tabIndex={-1} className="fld0dG_q">
        Choose Date & Time
      </h1>
      <p className="fld0dG_subtitle">
        Select a convenient 10-15 minute{" "}
        {consultationMode
          ? consultationMode === "phone"
            ? "phone"
            : "video"
          : "telehealth"}{" "}
        appointment slot with {selectedPhysician.name}. Times are displayed in Eastern Time (EDT).
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
                  onClick={() => onSelectDay(day)}
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
                  onClick={() => handleSlotClick(slot)}
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
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unified Minimal Slot & Visit Type Bar */}
        <div className={`appointment_slot_bar ${validationError && !consultationMode ? "slot_bar_error" : ""}`}>
          <div className="slot_bar_info">
            <div className="slot_bar_time_row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="slot_bar_date">
                <strong>{selectedDay.dayLabel}, {selectedDay.monthDate}</strong> at <strong>{selectedSlot.time} EDT</strong>
              </span>
              <span className="slot_bar_physician">· {selectedPhysician.name.split(",")[0]}</span>
            </div>

            <div className="slot_bar_mode_row">
              <span className="slot_mode_label">Visit format:</span>
              {consultationMode ? (
                <span className="slot_mode_val">
                  {consultationMode === "phone" ? "📞 Audio Call (Phone)" : "📹 Video Call"}
                </span>
              ) : (
                <span className="slot_mode_not_selected">Required · not selected</span>
              )}
            </div>
          </div>

          <div className="slot_bar_action">
            {consultationMode ? (
              <button
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setIsModalOpen(true);
                }}
                className="btn_mode_edit_minimal"
                aria-label="Change visit type"
              >
                Change
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setIsModalOpen(true);
                }}
                className="btn_choose_mode_minimal"
                id="btn-choose-call-mode"
              >
                <span>Choose Call Type</span>
                <span className="btn_arrow">→</span>
              </button>
            )}
          </div>
        </div>

        {/* Subtle Validation Message */}
        {validationError && (
          <p className="slot_bar_validation_msg" role="alert">
            Please choose an Audio or Video call option to proceed.
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fld0dG_nav">
        <button
          type="button"
          onClick={onBack}
          className="fld0dG_ghost"
        >
          ← Back to Doctors
        </button>

        <button
          type="button"
          onClick={handleProceedClick}
          className="fld0dG_primary"
        >
          Proceed to Checkout (${currentService.price}) →
        </button>
      </div>

      {/* Pop-up Modal for Consultation Mode */}
      <ConsultationModeModal
        isOpen={isModalOpen}
        selectedMode={consultationMode}
        physician={selectedPhysician}
        selectedDay={selectedDay}
        selectedSlot={selectedSlot}
        servicePrice={currentService.price}
        patientPhone={patientPhone}
        onSelectMode={onSelectConsultationMode}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(mode) => {
          onSelectConsultationMode(mode);
          setIsModalOpen(false);
          setValidationError(null);
        }}
      />
    </div>
  );
}
