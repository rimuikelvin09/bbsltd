import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import AskForm from "@/components/learn/AskForm";
import CaseHero from "@/components/projects/CaseHero";
import CaseNarrative from "@/components/projects/CaseNarrative";
import CaseSpec from "@/components/projects/CaseSpec";
import { JsonLd, caseStudyJsonLd } from "@/lib/seo/jsonLd";
import { allocateCaseImages, caseImage } from "@/lib/projects/images";
import {
  CHAPTER_KICKERS,
  CATEGORY_LABELS,
  getCaseStudies,
  getCaseStudy,
} from "@/data/caseStudies";

/**
 * /portfolio/[slug] - ONE CASE STUDY
 *
 * This single template serves every category. Nothing below branches on
 * what KIND of project it is; the only polymorphism lives in CaseHero,
 * which picks a proof device, and in the chapter array, which is ordered
 * per project. A drawings-only commission simply has fewer chapters and a
 * gallery hero, and renders through exactly this file.
 *
 * STATICALLY GENERATED. generateStaticParams means every case study is a
 * flat file at build time - no runtime cost, and the images resolve from
 * disk during the build.
 */

/** No drafts in production, so this is empty there and no route is built. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  const og = caseImage(study.imageFolder, "card", "hero-built", "hero-drawn");

  return {
    title: `${study.title} | Case study`,
    description: study.summary,
    alternates: { canonical: `/portfolio/${study.slug}` },
    openGraph: {
      title: `${study.headline} - ${study.title}`,
      description: study.summary,
      url: `/portfolio/${study.slug}`,
      type: "article",
      images: og ? [{ url: og, width: 1600, height: 1000, alt: study.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: study.headline,
      description: study.summary,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  // Numbered files are handed out in storyline order, so the allocation is
  // done once for the whole study rather than per chapter.
  const allocated = allocateCaseImages(study.imageFolder, study.chapters);

  const chapters = study.chapters.map((c, i) => ({
    key: c.key,
    kicker: c.kicker ?? CHAPTER_KICKERS[c.key],
    title: c.title,
    body: c.body,
    pull: c.pull,
    caption: c.caption,
    images: allocated[i] ?? [],
  }));

  const others = getCaseStudies().filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={caseStudyJsonLd(study)} />

      {/* 1. THE OPENING. The comparison IS the hero: the drawing becoming
             the building proves the promise before a word is read. */}
      <section className="surface-dark relative flex w-full items-center overflow-hidden lg:min-h-[100svh]">
        <Container
          className="w-full pb-20 sm:pb-24"
          style={{ paddingTop: "calc(var(--header-h, 5rem) + 2.5rem)" }}
        >
          <Breadcrumbs
            trail={[
              { label: "Our Work", href: "/portfolio" },
              { label: study.title },
            ]}
          />
          <div className="mt-8 lg:mt-10">
            <CaseHero study={study} />
          </div>
        </Container>

        <Link
          href="#how-it-went"
          className="absolute bottom-5 left-1/2 z-[7] flex -translate-x-1/2 flex-col items-center gap-1 rounded-lg px-3 py-2 text-[0.64rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)] no-underline transition-colors hover:text-[color:var(--text)]"
        >
          The story
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="motion-safe:animate-bounce">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </Link>
      </section>

      {/* 2. THE NARRATIVE */}
      <section id="how-it-went" className="w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow">{study.narrativeEyebrow}</p>
            <h2 className="t-section mt-5 max-w-[24ch]">
              {study.narrativeHeading}
            </h2>
            {study.narrativeLede && (
              <p className="lede mt-6 max-w-[56ch]">{study.narrativeLede}</p>
            )}
          </Reveal>

          <CaseNarrative chapters={chapters} />

          <div className="mt-16">
            <p className="eyebrow">The detail</p>
            <CaseSpec groups={study.spec} />
          </div>
        </Container>
      </section>

      {/* 3. KEEP GOING */}
      {others.length > 0 && (
        <section className="surface-dark w-full py-14 sm:py-16">
          <Container>
            <p className="eyebrow">Keep going</p>
            <h2 className="t-sub mt-4">Other situations we have handled</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/portfolio/${o.slug}`}
                  className="flex min-w-0 flex-col gap-2 rounded-xl border border-[color:var(--rule)] p-5 no-underline transition-colors hover:border-[color:var(--accent)]"
                >
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
                    Case study {o.index} &middot; {CATEGORY_LABELS[o.category]}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-tight">
                    {o.headline}
                  </span>
                  <span className="text-[length:var(--type-meta)] leading-[1.45] text-[color:var(--text-muted)]">
                    {o.summary}
                  </span>
                </Link>
              ))}
              <Link
                href="/portfolio"
                className="flex min-w-0 flex-col gap-2 rounded-xl border border-[color:var(--rule)] p-5 no-underline transition-colors hover:border-[color:var(--accent)]"
              >
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
                  All work
                </span>
                <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-tight">
                  Back to every case study
                </span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* 4. ASK ABOUT THIS ONE. Reuses the Learn question pipeline with the
             case slug, rather than standing up a third form. */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="min-w-0">
              <p className="eyebrow">Ask about this one</p>
              <h2 className="t-section mt-5 max-w-[16ch]">
                {study.askHeading}
              </h2>
              <p className="lede mt-6 max-w-[42ch]">{study.askBody}</p>
            </div>
            <div className="min-w-0">
              <AskForm slug={`case:${study.slug}`} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
