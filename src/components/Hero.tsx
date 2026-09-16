"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { heroDetails } from "@/data/hero";

/**
 * THE OPENING SEQUENCE
 * --------------------
 * This used to be driven by scroll: the section was 240vh tall with a pinned
 * pane inside it, and you had to scroll roughly two and a half screens before
 * the page would move on. Users reported the site as hard to navigate and
 * this was the main reason - scrolling stopped meaning "move down the page"
 * and started meaning "advance an animation", with no way to tell how long
 * that would last and no way to skip it.
 *
 * The sequence now runs on a clock instead, once, on mount. The beats are
 * unchanged; they simply take 1.9 seconds rather than 2.4 screens:
 *
 *   0.00  eyebrow sits dead centre, scaled up, over a near-solid navy veil
 *   0.05  it begins travelling to its real position as the veil thins
 *   0.34  the hook rises word by word out of its own baseline
 *   0.62  the paragraph arrives
 *   0.72  the button arrives
 *   0.88  the navigation appears
 *
 * Two escapes, because an intro must never be a toll gate: any scroll or key
 * press during the sequence completes it immediately, and
 * prefers-reduced-motion skips it altogether. The section is a normal 100svh
 * either way, so the page below is always one scroll away.
 *
 * Everything is transform, opacity and font-size - no layout is animated.
 */

/** How long the sequence runs, in milliseconds. */
const DURATION_MS = 1900;
/** Ceiling on how large the centred eyebrow gets on wide screens. */
const MAX_EYEBROW_SCALE = 3.2;

/** Linear interpolation between a and b. */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Normalised progress of `p` across the window [a, b]. */
const seg = (p: number, a: number, b: number) =>
  Math.min(Math.max((p - a) / (b - a), 0), 1);

/** Decelerating ease, applied per beat rather than to the clock itself. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const Hero: React.FC = () => {
  const paneRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  /**
   * The eyebrow's resting geometry inside the pane, plus the size it opens
   * at. It is rendered absolutely and its font-size is interpolated rather
   * than transform-scaled: scaling an 11px face up almost threefold
   * rasterises at the small size and arrives visibly soft.
   */
  const [box, setBox] = useState<{
    left: number;
    top: number;
    w: number;
    h: number;
    font: number;
    bigFont: number;
  } | null>(null);

  const words = heroDetails.heading.split(" ");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const measure = useCallback(() => {
    const pane = paneRef.current;
    const slot = eyebrowRef.current;
    if (!pane || !slot) return;
    const p = pane.getBoundingClientRect();
    const e = slot.getBoundingClientRect();
    const font = parseFloat(getComputedStyle(slot).fontSize) || 12;
    // On a phone the label is far too long to grow on one line, so the
    // opening state is allowed to wrap and the size is worked out from the
    // area it may occupy rather than from a single line's width.
    const lines = p.width < 700 ? 2.4 : 1;
    const ratio = Math.max(
      1,
      Math.min(
        MAX_EYEBROW_SCALE,
        (p.width * 0.86 * lines) / Math.max(e.width, 1),
      ),
    );
    setBox({
      left: e.left - p.left,
      top: e.top - p.top,
      w: e.width,
      h: e.height,
      font,
      bigFont: font * ratio,
    });
  }, []);

  // The clock. Also the escape hatches: a visitor who scrolls or presses a
  // key during the intro has told us they are not here for the animation.
  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    measure();

    let frame = 0;
    let start = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(1);
      if (frame) window.cancelAnimationFrame(frame);
    };

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      setProgress(t);
      if (t < 1) frame = window.requestAnimationFrame(tick);
      else done = true;
    };
    frame = window.requestAnimationFrame(tick);

    window.addEventListener("wheel", finish, { passive: true, once: true });
    window.addEventListener("touchmove", finish, { passive: true, once: true });
    window.addEventListener("keydown", finish, { once: true });
    // A restored scroll position, or a click straight onto an anchor, also
    // means the visitor is past the opening.
    if (window.scrollY > 4) finish();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [reduced, measure]);

  // Re-measure the eyebrow slot when the pane changes width.
  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const ro = new ResizeObserver(measure);
    ro.observe(pane);
    return () => ro.disconnect();
  }, [measure]);

  // Takes the visitor to the products and opens the guide waiting there.
  // A custom event rather than shared state: the two components are on
  // opposite ends of the page and have nothing else to say to each other.
  const openGuide = useCallback(() => {
    const target = document.getElementById("product-listings");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(
      () => window.dispatchEvent(new CustomEvent("bbs:open-guide")),
      450,
    );
  }, []);

  // The cue is a control, not a caption: clicking it moves the page the way
  // the visitor expected scrolling to.
  const goToProcess = useCallback(() => {
    const target = document.getElementById("process");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  // Fades the scroll cue out once the visitor has started moving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The header stays out of the way until the sequence has landed. Done as a
  // document attribute so the Header component needs no knowledge of this one.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.heroIntro = reduced || progress > 0.88 ? "done" : "active";
    return () => {
      root.dataset.heroIntro = "done";
    };
  }, [progress, reduced]);

  const settled = reduced ? 1 : easeOut(seg(progress, 0.05, 0.45));
  const paneW = paneRef.current?.clientWidth ?? 0;
  const paneH = paneRef.current?.clientHeight ?? 0;
  const veil = reduced ? 0 : 0.96 * (1 - seg(progress, 0.1, 0.55));
  const uvp = reduced ? 1 : easeOut(seg(progress, 0.62, 0.82));
  const cta = reduced ? 1 : easeOut(seg(progress, 0.72, 0.92));

  return (
    <section id="hero" className="surface-dark relative w-full">
      <div
        ref={paneRef}
        className="relative flex h-[100svh] w-full items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={heroDetails.backgroundVideo} type="video/mp4" />
          </video>
          {/* Resting treatment: heavier behind the type, lighter over the footage. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(33,36,102,0.42)_0%,rgba(33,36,102,0.80)_34%,rgba(33,36,102,0.96)_70%)]" />
          {/* The opening veil, which thins as the sequence runs. */}
          <div
            className="absolute inset-0 bg-[#1b1e58b0]"
            style={{ opacity: veil }}
            aria-hidden="true"
          />
          {/* THE JOIN. The hero's radial closes to 96% navy, not 100%, so the
              last few percent of video was still showing where the section
              ends - and the process section's own photograph starts there.
              Two different photographs meeting at a hard horizontal line is
              what made the seam ugly. Both sides now dissolve into the same
              flat navy before they meet, so there is nothing to see. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(to_bottom,rgba(33,36,102,0)_0%,rgba(33,36,102,0.75)_55%,rgba(33,36,102,1)_100%)]"
          />
        </div>

        <Container className="relative z-10 pt-28 pb-24">
          <div className="max-w-3xl">
            {/* Reserves the layout slot and is what gets measured. */}
            <p
              ref={eyebrowRef}
              aria-hidden="true"
              className="eyebrow eyebrow-muted w-fit"
              style={{ visibility: box ? "hidden" : undefined }}
            >
              {heroDetails.eyebrow}
            </p>

            <h1 className="display-shadow mt-6">
              {words.map((word, i) => {
                const start = 0.34 + i * 0.035;
                const w = reduced
                  ? 1
                  : easeOut(seg(progress, start, start + 0.2));
                return (
                  <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <span
                      className="inline-block will-change-transform"
                      style={{
                        transform: `translateY(${(1 - w) * 105}%)`,
                        opacity: w,
                      }}
                    >
                      {word}
                    </span>
                    {i < words.length - 1 ? <span>&nbsp;</span> : null}
                  </span>
                );
              })}
            </h1>

            <p
              className="lede display-shadow mt-7 max-w-[600px] will-change-transform"
              style={{
                opacity: uvp,
                transform: `translateY(${(1 - uvp) * 24}px)`,
              }}
            >
              {heroDetails.description}
            </p>

            <div
              className="flex flex-wrap items-center gap-x-7 gap-y-4 will-change-transform"
              style={{
                opacity: cta,
                transform: `translateY(${(1 - cta) * 24}px)`,
              }}
            >
              <Link href={heroDetails.ctaHref} className="btn-pill mt-10">
                {heroDetails.ctaLabel}
              </Link>
              <button
                type="button"
                onClick={openGuide}
                className="link display-shadow mt-10 font-semibold text-white"
              >
                Not sure which is yours?
              </button>
            </div>
          </div>
        </Container>

        {box ? (
          <p
            className="eyebrow eyebrow-muted display-shadow pointer-events-none absolute z-20"
            style={{
              // Width closes onto the resting slot, so the label is back to a
              // single line by the time it arrives.
              maxWidth: lerp(paneW * 0.86, box.w + 2, settled),
              left: lerp(paneW * 0.07, box.left, settled),
              top: lerp(
                (paneH - box.h * (box.bigFont / box.font)) / 2,
                box.top,
                settled,
              ),
              fontSize: lerp(box.bigFont, box.font, settled),
              lineHeight: 1.25,
              textWrap: "balance",
              color: settled < 1 ? "#ffffff" : undefined,
            }}
          >
            {heroDetails.eyebrow}
          </p>
        ) : null}

        {/* Users were observed trying to CLICK this, so it is a button now.
            Centred at the foot of the hero where the eye lands after reading,
            with a ring that pulses outward so it reads as interactive rather
            than as a label. Reduced motion drops both animations and keeps
            the button. */}
        <div
          className="pointer-events-none absolute bottom-10 left-0 right-0 z-10 flex justify-center transition-opacity duration-500"
          style={{ opacity: scrolled ? 0 : cta }}
        >
          <button
            type="button"
            onClick={goToProcess}
            aria-label="Scroll to how it works"
            className="pointer-events-auto group flex flex-col items-center gap-3"
            tabIndex={scrolled ? -1 : 0}
          >
            <span className="eyebrow eyebrow-muted display-shadow tracking-[0.2em] transition-colors group-hover:text-white">
              Scroll
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center">
              {!reduced ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full border border-white/40"
                  style={{ animationDuration: "2.4s" }}
                />
              ) : null}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-white/45 transition-colors duration-300 group-hover:border-white group-hover:bg-white/10"
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`relative text-white/85 transition-colors group-hover:text-white ${
                  reduced ? "" : "animate-bounce"
                }`}
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
