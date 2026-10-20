import React from "react";
import {
  Physician,
  DaySchedule,
  Slot,
  TIME_SLOTS,
  ServicePlan,
} from "@/lib/bookingData";

interface ScheduleStepProps {
  selectedPhysician: Physician;
  availableDays: DaySchedule[];
  selectedDay: DaySchedule;
  selectedSlot: Slot;
  currentService: ServicePlan;
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
  onSelectDay,
  onSelectSlot,
  onBack,
  onContinue,
}: ScheduleStepProps) {
  return (
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
                  onClick={() => onSelectSlot(slot)}
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
                  onClick={() => onSelectSlot(slot)}
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
              <strong>
                {selectedDay.dayLabel}, {selectedDay.monthDate}
              </strong>{" "}
              at <strong>{selectedSlot.time} EDT</strong>
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
          onClick={onBack}
          className="fld0dG_ghost"
        >
          ← Back to Doctors
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="fld0dG_primary"
        >
          Proceed to Checkout (${currentService.price}) →
        </button>
      </div>
    </div>
  );
}
