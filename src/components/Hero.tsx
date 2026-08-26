"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { heroDetails } from "@/data/hero";

/**
 * THE OPENING SEQUENCE
 * --------------------
 * The only place on the site that scroll-jacks, and deliberately so: this is
 * the one moment where a stranger decides whether to stay.
 *
 * The section is tall; a full-viewport pane stays pinned inside it, and how
 * far you have scrolled through that height drives one timeline:
 *
 *   0.00  eyebrow sits dead centre, scaled up, over a near-solid navy veil
 *   0.05  it begins travelling to its real position as the veil thins
 *   0.34  the hook rises word by word out of its own baseline
 *   0.62  the paragraph arrives
 *   0.72  the button arrives
 *   0.88  the navigation appears and the page is ready to move on
 *
 * Everything is transform and opacity — no layout is animated — so it stays
 * smooth on a phone. With prefers-reduced-motion the whole sequence is
 * skipped and the hero renders in its final state at normal height.
 */

/** Total scroll length of the sequence. Lower it to make the intro quicker. */
const SCROLL_VH = 240;
/** Ceiling on how large the centred eyebrow gets on wide screens. */
const MAX_EYEBROW_SCALE = 3.2;

/** Linear interpolation between a and b. */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Normalised progress of `p` across the window [a, b]. */
const seg = (p: number, a: number, b: number) =>
  Math.min(Math.max((p - a) / (b - a), 0), 1);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const travelled = -el.getBoundingClientRect().top;
      setProgress(Math.min(Math.max(travelled / scrollable, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, measure]);

  // The header stays out of the way until the sequence has landed. Done as a
  // document attribute so the Header component needs no knowledge of this one.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.heroIntro = reduced || progress > 0.88 ? "done" : "active";
    return () => {
      root.dataset.heroIntro = "done";
    };
  }, [progress, reduced]);

  const settled = reduced ? 1 : seg(progress, 0.05, 0.42);
  const paneW = paneRef.current?.clientWidth ?? 0;
  const paneH = paneRef.current?.clientHeight ?? 0;
  const veil = reduced ? 0 : 0.96 * (1 - seg(progress, 0.1, 0.5));
  const uvp = reduced ? 1 : seg(progress, 0.62, 0.8);
  const cta = reduced ? 1 : seg(progress, 0.72, 0.88);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="surface-dark relative w-full"
      style={{ height: reduced ? "100svh" : `${SCROLL_VH}vh` }}
    >
      <div
        ref={paneRef}
        className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden"
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
                const start = 0.34 + i * 0.03;
                const w = reduced ? 1 : seg(progress, start, start + 0.2);
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
              className="will-change-transform"
              style={{
                opacity: cta,
                transform: `translateY(${(1 - cta) * 24}px)`,
              }}
            >
              <Link href={heroDetails.ctaHref} className="btn-pill mt-10">
                {heroDetails.ctaLabel}
              </Link>
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

        <div
          className="absolute bottom-8 left-0 right-0 z-10 transition-opacity duration-500"
          style={{ opacity: reduced ? 1 : 1 - seg(progress, 0.86, 1) }}
        >
          <Container>
            <div className="flex items-center gap-3">
              <span className="eyebrow eyebrow-muted display-shadow tracking-[0.2em]">
                Scroll
              </span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce text-[color:var(--text-muted)]"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Hero;
