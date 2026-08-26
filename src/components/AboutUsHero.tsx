"use client";

import React, { useEffect, useRef, useState } from "react";
import Container from "./Container";
import IntroVideo from "./IntroVideo";
import { aboutUsHeroDetails } from "@/data/aboutushero";
import { philosophyPanels, PhilosophyPanel } from "@/data/philosophy";

/**
 * WHO WE ARE
 * ----------
 * The video and the navy field are fixed for the length of this section;
 * only the words move. Scrolling walks through the opening statement, then
 * the philosophy, the mission, the vision and the values, each one drifting
 * up and dissolving into the next while the right-hand side never moves.
 *
 * Same pinning technique as the process rail on the home page: a tall
 * section with a full-viewport pane stuck inside it. With
 * prefers-reduced-motion the panels are simply stacked and read normally.
 */

/** Scroll length per panel. Lower it to move through the section faster. */
const VH_PER_PANEL = 100;

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

const AboutUsHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  const opening: PhilosophyPanel = {
    eyebrow: aboutUsHeroDetails.eyebrow,
    title: aboutUsHeroDetails.heading,
    body: aboutUsHeroDetails.subheading,
  };
  const panels = [opening, ...philosophyPanels];

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(q.matches);
    apply();
    q.addEventListener("change", apply);
    return () => q.removeEventListener("change", apply);
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
      setProgress(clamp(-el.getBoundingClientRect().top / scrollable));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const steps = Math.max(panels.length - 1, 1);
  const raw = progress * steps;
  const active = Math.min(panels.length - 1, Math.round(raw));

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + (scrollable * i) / steps,
      behavior: "smooth",
    });
  };

  const renderPanel = (panel: PhilosophyPanel) => (
    <>
      {panel.eyebrow ? (
        <p className="eyebrow eyebrow-muted">{panel.eyebrow}</p>
      ) : null}
      <h2 className={panel.eyebrow ? "mt-4" : undefined}>{panel.title}</h2>
      {panel.body ? <p className="lede mt-5 max-w-xl">{panel.body}</p> : null}
      {panel.items ? (
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {panel.items.map((item) => (
            <li
              key={item}
              className="t-card flex items-center gap-3 text-[color:var(--text)]"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  // Reduced motion: no pinning, no cross-fading — just read it.
  if (reduced) {
    return (
      <section id="about-us-hero" className="surface-dark w-full py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-14">
            <div className="flex flex-col gap-16">
              {panels.map((panel) => (
                <div key={panel.eyebrow}>{renderPanel(panel)}</div>
              ))}
            </div>
            <IntroVideo
              src={aboutUsHeroDetails.videoSrc}
              captionsSrc={aboutUsHeroDetails.captionsSrc}
              label={aboutUsHeroDetails.videoLabel}
            />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="about-us-hero"
      ref={sectionRef}
      className="surface-dark relative w-full"
      style={{ height: `${panels.length * VH_PER_PANEL}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Container
          className="pb-10 lg:pb-20"
          style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-14">
            {/* The words. Absolutely stacked so they cross-fade in place. */}
            <div className="relative order-2 min-h-[50svh] lg:order-1 lg:min-h-[440px]">
              {panels.map((panel, i) => {
                const d = raw - i;
                const opacity = clamp(1 - (Math.abs(d) - 0.22) / 0.34);
                return (
                  <div
                    key={panel.eyebrow}
                    aria-hidden={i !== active}
                    className="absolute inset-0 will-change-transform"
                    style={{
                      opacity,
                      transform: `translateY(${d * -56}px)`,
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                  >
                    {renderPanel(panel)}
                  </div>
                );
              })}
            </div>

            {/* Fixed for the whole section. */}
            <div className="order-1 lg:order-2">
              <IntroVideo
                src={aboutUsHeroDetails.videoSrc}
                captionsSrc={aboutUsHeroDetails.captionsSrc}
                label={aboutUsHeroDetails.videoLabel}
              />
            </div>
          </div>

          {/* Where you are in the sequence, and a way to skip about. */}
          <div className="order-3 mt-6 flex items-center gap-2 lg:mt-10">
            {panels.map((panel, i) => (
              <button
                key={panel.eyebrow}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${panel.eyebrow}`}
                aria-current={i === active ? "true" : undefined}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-10 bg-[color:var(--accent)]"
                      : "w-5 bg-white/25 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default AboutUsHero;
