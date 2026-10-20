import React from "react";

interface StepProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  stepTitle: string;
}

export function StepProgressBar({
  currentStep,
  totalSteps = 4,
  stepTitle,
}: StepProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div
      className="fld0dG_progress"
      aria-label={`Step ${currentStep} of ${totalSteps}: ${stepTitle}`}
    >
      <div className="fld0dG_bar">
        <span style={{ width: `${percentage}%` }} />
      </div>
      <p className="fld0dG_stepOf">
        Step {currentStep} of {totalSteps} · {stepTitle}
      </p>
    </div>
  );
}
