import React from "react";
import Link from "next/link";
import Container from "./Container";
import { heroDetails } from "@/data/hero";

/**
 * Home banner. A visitor should know what this company does inside the
 * first thirty words, so the paragraph names all six routes rather than
 * describing values. Eyebrow, headline, paragraph, one button.
 *
 * No type sizes here: `surface-dark` supplies the colour tokens and the
 * base rules in globals.css supply the scale.
 */
const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="surface-dark relative flex min-h-screen w-full items-center overflow-hidden"
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
        {/* Radial rather than a flat wash: heavier behind the type on the
            left, lighter on the right so the footage still reads. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(33,36,102,0.42)_0%,rgba(33,36,102,0.80)_34%,rgba(33,36,102,0.96)_70%)]" />
      </div>

      <Container className="relative z-10 pt-28 pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-muted display-shadow">
            {heroDetails.eyebrow}
          </p>
          <h1 className="mt-6 display-shadow">{heroDetails.heading}</h1>
          <p className="lede display-shadow mt-7 max-w-[600px]">
            {heroDetails.description}
          </p>
          <Link href={heroDetails.ctaHref} className="btn-pill mt-10">
            {heroDetails.ctaLabel}
          </Link>
        </div>
      </Container>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <Container>
          <div className="flex items-center gap-3">
            <span className="eyebrow eyebrow-muted display-shadow tracking-[0.2em]">
              Our products
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
              className="text-[color:var(--text-muted)]"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
