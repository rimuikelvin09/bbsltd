"use client";

import React, { useState } from "react";
import AskForm from "./AskForm";

/**
 * The form is a disclosure. The ANSWERS above it never are.
 *
 * Answered questions are indexable content on our own domain, so they
 * render server-side, always. A form is interface - worth nothing to a
 * crawler, and a screen of vertical space to a reader who has not decided
 * to ask anything. That is the half worth hiding.
 */
const AskDisclosure: React.FC<{ slug: string; timestamp?: string }> = ({
  slug,
  timestamp,
}) => {
  const [open, setOpen] = useState(false);

  if (open) return <AskForm slug={slug} timestamp={timestamp} />;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-expanded={false}
      className="inline-flex items-center gap-[9px] rounded-full border border-[color:var(--rule)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--text)] transition-colors hover:border-[color:var(--accent)]"
    >
      <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-[color:var(--accent)]" />
      Ask a question about this
    </button>
  );
};

export default AskDisclosure;
