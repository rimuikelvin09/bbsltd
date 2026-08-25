import React from "react";
import clsx from "clsx";

interface CtaButtonProps {
  /** Inverted styling, for use on light surfaces. */
  dark?: boolean;
  onClick: () => void;
  /** Overrides the default wording. One CTA per asset (SOP 1.2). */
  label?: string;
}

const CtaButton: React.FC<CtaButtonProps> = ({ dark, onClick, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("btn-pill mt-3 w-full sm:w-fit", dark && "btn-pill-dark")}
    >
      {label || "Start Your Legacy"}
    </button>
  );
};

export default CtaButton;
