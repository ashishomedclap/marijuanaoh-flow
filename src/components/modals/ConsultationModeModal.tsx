"use client";

import React, { useEffect, useRef, useState } from "react";
import { ConsultationMode, Physician, DaySchedule, Slot } from "@/lib/bookingData";

interface ConsultationModeModalProps {
  isOpen: boolean;
  selectedMode: ConsultationMode | null;
  physician: Physician;
  selectedDay: DaySchedule;
  selectedSlot: Slot;
  servicePrice: number;
  patientPhone: string;
  onSelectMode: (mode: ConsultationMode) => void;
  onClose: () => void;
  onConfirm: (mode: ConsultationMode) => void;
}

export function ConsultationModeModal({
  isOpen,
  selectedMode,
  physician,
  selectedDay,
  selectedSlot,
  patientPhone,
  onSelectMode,
  onClose,
  onConfirm,
}: ConsultationModeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [tempMode, setTempMode] = useState<ConsultationMode | null>(selectedMode);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTempMode(selectedMode);
      setValidationError(null);
    }
  }, [isOpen, selectedMode]);

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

  const handleCardClick = (mode: ConsultationMode) => {
    setTempMode(mode);
    setValidationError(null);
    onSelectMode(mode);
    // Instant confirmation on tap to reduce thumb taps
    setTimeout(() => {
      onConfirm(mode);
    }, 220);
  };

  const handleConfirmClick = () => {
    if (!tempMode) {
      setValidationError("Please select an option to continue.");
      return;
    }
    onSelectMode(tempMode);
    onConfirm(tempMode);
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
        className="modal_dialog minimal_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-mode-title"
        aria-describedby="modal-mode-desc"
        tabIndex={-1}
        ref={dialogRef}
      >
        {/* Minimal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="minimal_close_btn"
          aria-label="Close dialog"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Minimal Header */}
        <div className="minimal_header">
          <h2 id="modal-mode-title" className="minimal_title">
            Choose Visit Type
          </h2>
          <p id="modal-mode-desc" className="minimal_subtitle">
            {selectedDay.dayLabel}, {selectedDay.monthDate} at {selectedSlot.time} EDT with {physician.name.split(",")[0]}
          </p>
        </div>

        {/* Validation hint */}
        {validationError && (
          <div className="minimal_alert" role="alert">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}

        {/* Minimal Option Cards */}
        <div className="minimal_options_list" role="radiogroup" aria-label="Visit type options">
          {/* OPTION 1: Video Call */}
          <div
            className={`minimal_option_card ${tempMode === "video" ? "selected" : ""}`}
            role="radio"
            aria-checked={tempMode === "video"}
            tabIndex={0}
            onClick={() => handleCardClick("video")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                handleCardClick("video");
              }
            }}
          >
            <div className="minimal_icon_box video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>

            <div className="minimal_option_info">
              <div className="minimal_title_row">
                <span className="minimal_card_name">Video Call</span>
                <span className="minimal_rec_tag">Recommended</span>
              </div>
              <span className="minimal_card_desc">Private browser visit · No app download</span>
            </div>

            <div className={`minimal_radio_circle ${tempMode === "video" ? "checked" : ""}`}>
              {tempMode === "video" && <span className="minimal_radio_inner" />}
            </div>
          </div>

          {/* OPTION 2: Audio Call (Phone) */}
          <div
            className={`minimal_option_card ${tempMode === "phone" ? "selected" : ""}`}
            role="radio"
            aria-checked={tempMode === "phone"}
            tabIndex={0}
            onClick={() => handleCardClick("phone")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                handleCardClick("phone");
              }
            }}
          >
            <div className="minimal_icon_box phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>

            <div className="minimal_option_info">
              <div className="minimal_title_row">
                <span className="minimal_card_name">Audio Call (Phone)</span>
              </div>
              <span className="minimal_card_desc">Doctor calls {patientPhone} directly</span>
            </div>

            <div className={`minimal_radio_circle ${tempMode === "phone" ? "checked" : ""}`}>
              {tempMode === "phone" && <span className="minimal_radio_inner" />}
            </div>
          </div>
        </div>

        {/* Minimal compliance note */}
        <p className="minimal_note">
          Both options are fully certified for Ohio MMJ recommendation.
        </p>

        {/* Actions */}
        <div className="minimal_actions">
          <button
            type="button"
            onClick={onClose}
            className="minimal_btn_cancel"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmClick}
            className="fld0dG_primary minimal_btn_confirm"
          >
            {tempMode
              ? `Select ${tempMode === "phone" ? "Audio Call" : "Video Call"}`
              : "Select Visit Type"}
          </button>
        </div>
      </div>
    </div>
  );
}
