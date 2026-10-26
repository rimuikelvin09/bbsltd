import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CaseGrid from "@/components/projects/CaseGrid";
import ComingSoon from "@/components/ComingSoon";
import { getCaseStudies } from "@/data/caseStudies";
import { caseImage } from "@/lib/projects/images";

/**
 * /portfolio - OUR WORK
 *
 * NO HERO BAND. On a listing page the cards ARE the hero: each one carries
 * a large image and a headline, so a navy block before them spends the
 * first screen restating the page title. It also matches the IA rule set
 * for the rest of the site - inner pages get breadcrumbs, not banners.
 *
 * WHAT IS KEPT is the one framing sentence. That line is not decoration:
 * without it a visitor arriving from search reads a grid of buildings as a
 * portfolio and files it as "pictures of houses". With it, they read the
 * same grid as arguments. Removing the band costs nothing; removing the
 * sentence would change what the page means.
 *
 * The photo gallery moved to /portfolio/gallery. Two different jobs -
 * browsing buildings and reading how a problem was solved - and mixing
 * them meant whichever a visitor wanted, they had to scroll past the other.
 */
export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from Benchmark Building Solutions: what each client came to us with, what the site and the budget allowed, and what the project is doing now. Homes, apartments, design commissions and commercial work across Kenya.",
  alternates: { canonical: "/portfolio" },
  // Nothing published yet, so it must not be indexed. Flip automatically
  // the moment a case study loses its draft flag.
  ...(getCaseStudies().length === 0
    ? { robots: { index: false, follow: true } }
    : {}),
  openGraph: {
    title: "Our Work | Benchmark Building Solutions",
    description:
      "Case studies: the brief, the constraint, the solution and the result on real Kenyan projects.",
    url: "/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  const items = getCaseStudies().map((study) => ({
    study,
    image: caseImage(study.imageFolder, "card", "hero-built", "hero-progress"),
  }));

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-24">
      <Container style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}>
        <Breadcrumbs trail={[{ label: "Our Work" }]} />

        <div className="mt-7 flex flex-col gap-5 border-b border-[color:var(--rule)] pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <p className="eyebrow">Our work</p>
            <h1 className="t-section mt-4 max-w-[18ch]">
              Every project here started as somebody&rsquo;s problem.
            </h1>
          </div>
          <p className="max-w-[46ch] text-[length:var(--type-lede)] leading-[1.6] text-[color:var(--text-soft)]">
            Not a gallery. Each one sets out what the client came to us with,
            what the site and the numbers allowed, where it got difficult, and
            what it is doing now. If one sounds like your situation, that is
            the point.
          </p>
        </div>

        <div className="mt-10">
          {items.length > 0 ? (
            <CaseGrid items={items} />
          ) : (
            <ComingSoon
              title="The first case studies are with their clients for sign-off."
              body="Each one names a real client, a real budget and what actually went wrong, so none of them goes up until the person who paid for it has read it and agreed. In the meantime the photographs are all here."
              primary={{ label: "See the gallery", href: "/portfolio/gallery" }}
              secondary={{ label: "Talk to us", href: "/contact" }}
            />
          )}
        </div>

        <p className="mt-12 text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
          Looking for photographs rather than the story?{" "}
          <Link href="/portfolio/gallery" className="font-semibold text-[color:var(--accent)] hover:underline">
            The gallery is here
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
