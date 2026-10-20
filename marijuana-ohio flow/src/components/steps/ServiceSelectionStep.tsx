import React from "react";
import { SERVICES_CATALOG } from "@/lib/bookingData";

interface ServiceSelectionStepProps {
  selectedServiceId: "new" | "renew";
  onSelectService: (id: "new" | "renew") => void;
  onContinue: () => void;
}

export function ServiceSelectionStep({
  selectedServiceId,
  onSelectService,
  onContinue,
}: ServiceSelectionStepProps) {
  return (
    <form
      className="fld0dG_card"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
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
          onClick={() => onSelectService("new")}
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
          onClick={() => onSelectService("renew")}
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
          onClick={onContinue}
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
            Money back if you don&apos;t qualify
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z M8 2v4 M16 2v4 M8 10h8 M8 14h5" />
            </svg>
            No state fee
          </li>
        </ul>
      </div>
    </form>
  );
}
