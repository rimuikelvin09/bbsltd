import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Container from "@/components/Container";
import CategoryGrid from "@/components/learn/CategoryGrid";
import HubSearch from "@/components/learn/HubSearch";
import ScrollCue from "@/components/learn/ScrollCue";
import { getCategorySummaries, getLearnItems } from "@/lib/learn";
import { learnImage } from "@/lib/learn/images";

/**
 * /learn - THE LANDING PAGE
 *
 * A full-height hero, then six cards. Each category is its own page, which
 * is the point: six landing pages are six search entry points, and a filter
 * chip can never rank for anything.
 *
 * THE HERO IS PALE, NOT NAVY. Light is better for reading, and almost
 * everything below this screen is reading. The hero is the one place that
 * is not - a headline, a sentence and a button - but a warm ground suits a
 * publication better than a corporate slab, and it holds up far better on a
 * phone in direct sunlight, which is where a lot of this traffic is.
 *
 * The site header is FIXED and overlays this page, so the first section
 * clears it with --header-h, published by Header.tsx. Forgetting that is
 * what put the logo through the headline on the first build.
 */
export const metadata: Metadata = {
  title: "Learn",
  description:
    "What a build actually costs, which approvals you need and how the financing works. The Smart Builder Real Estate Podcast, articles, guides and legislation from Benchmark Building Solutions.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn | Benchmark Building Solutions",
    description:
      "Podcast, articles, guides and legislation on building in Kenya. Nothing gated.",
    url: "/learn",
  },
};

export default async function LearnPage() {
  const [categories, items] = await Promise.all([
    getCategorySummaries(),
    getLearnItems(),
  ]);
  const hero = learnImage("hero");

  // Search is client-side over data this page already has, so the titles
  // come along rather than being looked up again in the browser.
  const categoryTitles = Object.fromEntries(categories.map((c) => [c.slug, c.title]));

  return (
    <>
      <section
        className="learn-hero relative flex w-full items-center overflow-hidden"
        style={{
          // Colour comes from --band so the hero inverts with every other
          // navy surface. Hardcoding it here would opt it out of the toggle.
          minHeight: "100svh",
          paddingTop: "calc(var(--header-h, 5rem) + 3rem)",
          paddingBottom: "7rem",
        }}
      >
        {/* A pale hero has no mass of its own, so a warm wash gives it depth. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(85% 70% at 80% 18%, rgba(153,18,18,.13) 0%, rgba(153,18,18,0) 60%)",
          }}
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <span
                aria-hidden="true"
                className="hero-rule mb-[26px] block h-[3px] w-[54px] bg-[color:var(--crimson)]"
              />
              <p className="eyebrow">Learn</p>
              <h1 className="mt-5 max-w-[15ch]">
                Building in Kenya, explained by the people who build.
              </h1>
              <p className="lede mt-6 max-w-[54ch]">
                What it costs, which approvals you need, how the financing
                works, what the law requires, and what actually goes wrong on
                site. Free, ungated, and specific to here.
              </p>

              {/* In the hero rather than below it: this is the one place on
                  the site with enough content to hunt through, and putting
                  the field where the eye already is saves a scroll. */}
              <div className="mt-8">
                <HubSearch items={items} categoryTitles={categoryTitles} />
              </div>
            </div>

            {hero ? (
              <Image
                src={hero}
                alt=""
                width={2400}
                height={1350}
                priority
                // No forced aspect, no cover. The supplied artwork is not 16:9 and
                // cropping it to fit ate the top and bottom of the composition.
                className="h-auto w-full rounded-xl object-contain"
              />
            ) : (
              // Waiting on public/images/learnimages/hero.jpg
              <span aria-hidden="true" className="hidden lg:block" />
            )}
          </div>
        </Container>

        <ScrollCue targetId="categories" />
      </section>

      <section
        id="categories"
        className="surface-light w-full scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="max-w-[58ch]">
            <p className="eyebrow">Six places to start</p>
            <h2 className="t-section mt-4">Pick what you came for.</h2>
            <p className="lede mt-5">
              Each one is its own page, so you are never scrolling past four
              things you did not want to find the one you did.
            </p>
          </div>

          <CategoryGrid categories={categories} />
        </Container>
      </section>

      <section className="w-full bg-[#212466] text-white">
        <Container className="flex flex-wrap items-center justify-between gap-7 py-14 sm:py-16">
          <div>
            <p className="eyebrow text-[color:var(--crimson-on-dark)]">
              Still deciding
            </p>
            <h2 className="t-section mt-4 max-w-[20ch] text-white">
              Reading about it only gets you so far.
            </h2>
          </div>
          <Link href="/contact" className="btn-pill">
            Talk to us about your project
          </Link>
        </Container>
      </section>
    </>
  );
}
