import React from "react";
import Link from "next/link";

interface HeaderProps {
  formattedTime?: string;
  showTimer?: boolean;
  statusBadge?: React.ReactNode;
  onStartOver?: () => void;
  onTriggerExitModal?: () => void;
}

export function Header({
  formattedTime,
  showTimer = true,
  statusBadge,
  onStartOver,
  onTriggerExitModal,
}: HeaderProps) {
  return (
    <header className="fld0dG_fHead">
      <Link href="/" className="fld0dG_brand">
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
      </Link>

      {statusBadge ? (
        statusBadge
      ) : showTimer && formattedTime ? (
        <span className="fld0dG_timer" role="timer" aria-live="polite">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Time left <strong className="tabular-nums">{formattedTime}</strong>
        </span>
      ) : (
        <span />
      )}

      {/* Top Right: Discreet Test / Start Over button & Exit Modal trigger */}
      <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: "8px" }}>
        {onTriggerExitModal && (
          <button
            type="button"
            onClick={onTriggerExitModal}
            className="btn_start_over"
            title="Preview 'Before You Go' Exit Modal"
            aria-label="Preview exit modal"
          >
            <span>Exit Modal</span>
          </button>
        )}
        {onStartOver && (
          <button
            type="button"
            onClick={onStartOver}
            className="btn_start_over"
            title="Reset all steps for testing"
            aria-label="Start over"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Start over</span>
          </button>
        )}
      </div>
    </header>
  );
}
