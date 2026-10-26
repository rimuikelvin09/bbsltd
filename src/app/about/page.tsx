import React from "react";
import Link from "next/link";
import AboutUsHero from "@/components/AboutUsHero";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who we are: a Kenyan building contractor since 2012, with architectural, structural and MEP work in house, and the values the team is held to.",
  alternates: { canonical: "/about" },

  /**
   * Next merges metadata SHALLOWLY - a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Without this block the
   * page inherited the root object, so sharing any inner page showed the HOME
   * page's title and description. Hence the repetition: images included on
   * purpose, because they would otherwise be dropped.
   */
  openGraph: {
    title: "About us",
    description:
      "Who we are: a Kenyan building contractor since 2012, with architectural, structural and MEP work in house.",
    url: "/about",
    type: "website",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About us",
    description:
      "Who we are: a Kenyan building contractor since 2012, with architectural, structural and MEP work in house.",
    images: ["/images/seoimage.jpg"],
  },
};


const AboutUsPage = () => {
  return (
    <>
      <AboutUsHero />
      <Container className="py-16 sm:py-20">
        {/* The approach and the team used to live here. Both now have
            pages of their own, reached from the About menu and from here -
            one long page was burying the leadership section at the foot of
            a scroll almost nobody reached. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {[
            {
              href: "/about/how-we-work",
              kicker: "How we work",
              title: "The principles, and the approach every build is held to.",
              body: "What we insist on from the first site visit to handover, and why.",
            },
            {
              href: "/about/leadership",
              kicker: "Leadership",
              title: "The directors and the technical team leads.",
              body: "Who runs the firm, who leads the work, and what each is accountable for.",
            },
          ].map((card) => (
            <Reveal key={card.href}>
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl border border-[color:var(--rule)] bg-white p-7 transition-colors hover:border-[color:var(--accent)] lg:p-9"
              >
                <p className="eyebrow">{card.kicker}</p>
                <h3 className="t-sub mt-4">{card.title}</h3>
                <p className="mt-4 text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
                  {card.body}
                </p>
                <span className="mt-auto pt-6 text-[length:var(--type-meta)] font-semibold text-[color:var(--accent)]">
                  Read on &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
};

export default AboutUsPage;
