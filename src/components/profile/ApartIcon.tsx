import React from "react";
import { DifferentiatorIcon } from "@/data/profile";

/**
 * The four "what sets us apart" marks. Stroked rather than filled, and
 * drawn in currentColor, so they take the accent from whichever band they
 * land on and need no second version for the palette toggle.
 */
const ApartIcon: React.FC<{ name: DifferentiatorIcon }> = ({ name }) => {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "tech") {
    return (
      <svg {...common}>
        <rect x="2.5" y="4" width="19" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M7 9.5l2.5 2L7 14M12.5 14h4" />
      </svg>
    );
  }

  if (name === "partners") {
    return (
      <svg {...common}>
        <path d="M8.5 15.5 12 19l3.5-3.5M12 19V9" />
        <path d="M6 11a4 4 0 0 1 .8-7.9 5 5 0 0 1 9.4 0A4 4 0 0 1 18 11" />
      </svg>
    );
  }

  if (name === "culture") {
    return (
      <svg {...common}>
        <path d="M12 2.5 3.5 5.5v6.1c0 4.9 3.5 8.6 8.5 9.9 5-1.3 8.5-5 8.5-9.9V5.5L12 2.5Z" />
        <path d="m8.6 11.9 2.4 2.4 4.4-4.6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <circle cx="17.5" cy="6.5" r="2.4" />
      <path d="M15.8 12.4A5 5 0 0 1 22 17.2" />
    </svg>
  );
};

export default ApartIcon;
