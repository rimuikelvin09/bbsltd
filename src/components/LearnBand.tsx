import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { getCategorySummaries } from "@/lib/learn";
import { learnImage } from "@/lib/learn/images";

/**
 * THE LEARN BAND
 *
 * Replaces the thin podcast strip. Same instinct - Learn deserves presence
 * on the home page - but doing the job properly: the proposition, the six
 * categories so the breadth is visible at a glance, and one way in.
 *
 * It ADDS rather than swaps. The products list stays: the home page is the
 * one place a visitor who arrived from search finds out what we sell, and
 * someone already here is further down the funnel than a Learn reader.
 * Learn earns its acquisition traffic by people landing on it directly.
 *
 * Counts come from the content layer, so a category that is still empty
 * says so rather than promising something that is not there.
 */
const LearnBand: React.FC = async () => {
  const categories = await getCategorySummaries();
  const art = learnImage("hero", "card-podcast");

  return (
    <section className="surface-dark w-full" aria-labelledby="learn-band-heading">
      <Container className="py-16 sm:py-20 lg:py-24">
        {/* Three columns: the argument, the picture, the contents. The
            artwork sits in the middle so it separates the claim from the
            list rather than bookending them. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.3fr_0.65fr] lg:gap-10">
          <div className="min-w-0">
            <p className="eyebrow">Learn</p>
            <h2 id="learn-band-heading" className="t-section mt-5 max-w-[16ch]">
              Know what you are getting into before you build.
            </h2>
            <p className="lede mt-6 max-w-[46ch]">
              What it costs, which approvals you need, how the financing works
              and what the law requires. Written and recorded by the people who
              do it.
            </p>
            <Link href="/learn" className="btn-pill mt-8">
              What&rsquo;s inside
            </Link>
          </div>

          <div className="min-w-0 order-first lg:order-none">
            {art ? (
              <Image
                src={art}
                alt=""
                width={2400}
                height={1350}
                className="h-auto w-full rounded-2xl object-contain"
              />
            ) : (
              <div className="flex items-center gap-5 rounded-2xl border border-[color:var(--rule)] p-6">
                <Image
                  src="/images/tsblogo.png"
                  alt="The Smart Builder Real Estate Podcast"
                  width={120}
                  height={120}
                  className="h-16 w-16 flex-none rounded-xl object-contain"
                />
                <p className="t-card font-[family-name:var(--font-display)] leading-tight">
                  The Smart Builder Real Estate Podcast
                </p>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
              What is in there
            </p>
            <ul className="mt-4 list-none p-0">
              {categories.map((c) => {
                const row =
                  "flex items-center justify-between gap-3 py-[13px] text-[1.0625rem] font-semibold";
                return (
                  <li
                    key={c.slug}
                    className="border-t border-[color:var(--rule)] last:border-b"
                  >
                    {/* Parked categories are shown, not hidden - the breadth
                        is part of the pitch - but they do not navigate. A
                        greyed row that still clicks is worse than one that
                        plainly does not. */}
                    {c.parked ? (
                      <span className={`${row} opacity-60`}>
                        {c.title}
                        <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={`/learn/${c.slug}`}
                        className={`group ${row} transition-colors hover:text-[color:var(--accent)]`}
                      >
                        {c.title}
                        <span
                          aria-hidden="true"
                          className="text-[color:var(--accent)] transition-transform group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LearnBand;
