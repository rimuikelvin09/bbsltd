"use client";

import React, { useCallback, useRef } from "react";

/**
 * A horizontal rail of videos.
 *
 * Replaces react-slick, which was the only use of that library and its two
 * stylesheets in the whole codebase. The rail is now native scroll with CSS
 * scroll-snap: no carousel library, no layout thrash on resize, proper
 * momentum scrolling and swipe on a phone for free, and the cards are real
 * markup a crawler can read rather than clones a script generated.
 *
 * The only JavaScript left is the two arrow buttons, which scroll the
 * container. Someone without JavaScript can still swipe or trackpad through
 * it; the arrows are an affordance, not the mechanism.
 */
const VideoRail: React.FC<React.PropsWithChildren<{ label: string }>> = ({
  children,
  label,
}) => {
  const railRef = useRef<HTMLUListElement>(null);

  const nudge = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    // One card's width, so a press always lands on a card edge.
    const card = rail.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--rule)] text-[color:var(--text)] transition-colors hover:border-[#212466] hover:bg-[#212466] hover:text-white";

  return (
    <div>
      <ul
        ref={railRef}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div className="mt-6 flex items-center gap-3">
        <button type="button" onClick={() => nudge(-1)} aria-label="Previous" className={arrow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label="Next" className={arrow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoRail;
