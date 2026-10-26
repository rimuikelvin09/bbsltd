"use client";

import React from "react";

/** The one interactive thing in the hero, so the hero stays a server component. */
const ScrollCue: React.FC<{ targetId: string }> = ({ targetId }) => (
  <button
    type="button"
    onClick={() =>
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-[9px] p-[6px] font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--text-soft)]"
  >
    {/* FILLED, not outlined. A thin stroked arrow inheriting the band's
        text colour disappeared against a pale ground. The circle takes the
        band's button colours, which invert with it - navy disc and a white
        arrow on blush, white disc and a navy arrow on navy. */}
    <span
      className="grid h-[38px] w-[38px] place-items-center rounded-full motion-safe:animate-bounce"
      style={{ background: "var(--band-btn-bg)", color: "var(--band-btn-text)" }}
    >
      <svg width="13" height="15" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <path d="M6 1v11m0 0 4.2-4.2M6 12 1.8 7.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
    What&rsquo;s inside
  </button>
);

export default ScrollCue;
