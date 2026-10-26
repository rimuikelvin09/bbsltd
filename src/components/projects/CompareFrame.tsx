"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import MediaFrame from "./MediaFrame";
import { MediaKind } from "@/data/caseStudies";

/**
 * THE COMPARISON FRAME
 * --------------------
 * ONE component, three jobs. Only the labels change:
 *
 *   completed build     "Drawn"  / "Built"
 *   under construction  "Drawn"  / "As at March 2026"
 *   repair or refurb    "Before" / "After"
 *
 * That is why a project still under construction is not a second-class case
 * study. It is the same device told honestly, and a dated right-hand label
 * is MORE convincing than a vague one because it proves the photograph is
 * current rather than flattering.
 *
 * IT DEMONSTRATES ITSELF. On first view the frame is entirely the left
 * image, then the handle travels in from the right and settles at the
 * middle, so the reader watches the reveal and learns what the control does
 * without being told. It plays once, yields the instant anyone touches it,
 * and prefers-reduced-motion skips straight to the halfway state.
 *
 * The control is a real range input, so it is keyboard-operable and
 * announced properly. The visible handle is decoration over it.
 */

export interface CompareFrameProps {
  left?: string;
  right?: string;
  leftLabel: string;
  rightLabel: string;
  leftKind: MediaKind;
  rightKind: MediaKind;
  leftCaption?: string;
  rightCaption?: string;
  priority?: boolean;
  className?: string;
}

const CompareFrame: React.FC<CompareFrameProps> = ({
  left,
  right,
  leftLabel,
  rightLabel,
  leftKind,
  rightKind,
  leftCaption,
  rightCaption,
  priority,
  className = "",
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const touchedRef = useRef(false);
  const playedRef = useRef(false);
  const [touched, setTouched] = useState(false);

  const apply = useCallback((v: number) => {
    const el = wrapRef.current;
    if (el) el.style.setProperty("--split", `${v}%`);
    if (inputRef.current) inputRef.current.value = String(v);
  }, []);

  const onInput = useCallback(() => {
    touchedRef.current = true;
    setTouched(true);
    apply(Number(inputRef.current?.value ?? 50));
  }, [apply]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      apply(50);
      return;
    }

    // Hold on the left image so the reader registers WHAT it is before it
    // becomes the other thing. Without that beat the reveal means nothing.
    apply(100);

    let raf = 0;
    let timer = 0;

    const tween = (from: number, to: number, ms: number) => {
      let t0: number | null = null;
      const frame = (ts: number) => {
        if (touchedRef.current) return;
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / ms);
        apply(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = window.requestAnimationFrame(frame);
      };
      raf = window.requestAnimationFrame(frame);
    };

    if (!("IntersectionObserver" in window)) {
      apply(50);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || playedRef.current) return;
          playedRef.current = true;
          timer = window.setTimeout(() => tween(100, 50, 1150), 900);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [apply]);

  return (
    <div
      ref={wrapRef}
      style={{ "--split": "50%" } as React.CSSProperties}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color:var(--rule)] [touch-action:pan-y] ${className}`}
    >
      {/* Right-hand image sits underneath; the left is clipped over it. */}
      <MediaFrame src={right} kind={rightKind} caption={rightCaption} priority={priority} />

      <div className="absolute inset-0 [clip-path:inset(0_calc(100%_-_var(--split))_0_0)]">
        <MediaFrame src={left} kind={leftKind} caption={leftCaption} priority={priority} />
      </div>

      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        step={0.5}
        defaultValue={50}
        onInput={onInput}
        onChange={onInput}
        aria-label={`Reveal more of the ${leftLabel} image or the ${rightLabel} image`}
        className="absolute inset-0 z-[5] m-0 h-full w-full cursor-ew-resize opacity-0"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[var(--split)] z-[3] w-[2px] bg-[color:var(--accent)]"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[var(--split)] top-1/2 z-[4] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--band)] shadow-[0_3px_14px_rgba(0,0,0,0.3)] ${
          touched ? "" : "motion-safe:animate-pulse"
        }`}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
        </svg>
      </span>

      <span className="pointer-events-none absolute left-3 top-3 z-[2] rounded-md bg-black/45 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
        {leftLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-[2] rounded-md bg-black/45 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
        {rightLabel}
      </span>

      <span
        className={`pointer-events-none absolute bottom-4 left-1/2 z-[6] inline-flex -translate-x-1/2 items-center gap-[6px] whitespace-nowrap rounded-full bg-black/55 px-3 py-[6px] text-[0.62rem] font-bold uppercase tracking-[0.13em] text-white backdrop-blur-sm transition-opacity duration-500 ${
          touched ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
        </svg>
        Drag to compare
      </span>
    </div>
  );
};

export default CompareFrame;
