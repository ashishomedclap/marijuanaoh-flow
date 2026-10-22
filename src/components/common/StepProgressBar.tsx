import React from "react";

interface StepProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  stepTitle: string;
}

export function StepProgressBar({
  currentStep,
  totalSteps = 12,
  stepTitle,
}: StepProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((currentStep / totalSteps) * 100)));

  return (
    <div
      className="fld0dG_progress"
      aria-label={`Step ${currentStep} of ${totalSteps}: ${stepTitle}`}
    >
      <div className="fld0dG_bar">
        <span style={{ width: `${percentage}%` }} />
      </div>
      <p className="fld0dG_stepOf">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
