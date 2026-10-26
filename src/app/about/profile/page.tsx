import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import IntroVideo from "@/components/IntroVideo";
import ProfileTimeline from "@/components/profile/ProfileTimeline";
import ApartIcon from "@/components/profile/ApartIcon";
import ComingSoon from "@/components/ComingSoon";
import {
  PROFILE_PUBLISHED,
  profileHero,
  profileOverview,
  marketStats,
  profilePillars,
  profileTimeline,
  differentiators,
  companyParticulars,
  sourceRows,
} from "@/data/profile";

/**
 * /about/profile - THE CORPORATE PROFILE
 *
 * Replaces the "in preparation" placeholder. Five movements:
 *   1. the film, which is the only thing on this site that shows the people
 *   2. the argument, with the market figures that make it checkable
 *   3. the story, as a timeline
 *   4. what sets us apart
 *   5. the way in, with the company particulars a prequalifier looks for
 *
 * THE ARGUMENT COMES BEFORE THE DIFFERENTIATORS, deliberately. "What sets
 * us apart" read first is a boast; read after the evidence it is a
 * conclusion the visitor has already started drawing for themselves.
 *
 * ON TONE. An earlier draft opened by describing how untrustworthy the
 * industry is. That wins the argument and loses the client - the reader
 * comes away thinking building is risky rather than thinking we are safe.
 * The page now names what a client actually wants and positions us as the
 * people who supply it. Nothing here disparages anybody else.
 *
 * NO PDF DOWNLOAD BUTTON YET. The PDF does not exist, and a button that
 * goes nowhere costs more trust than the button earns - which is the whole
 * point of the page. It goes in the moment the file does.
 *
 * EVERY COLOUR COMES FROM A BAND TOKEN. No literal navy, no literal white,
 * so the palette toggle reaches all of it.
 */
export const metadata: Metadata = {
  title: "Corporate Profile",
  description:
    "Who Benchmark Building Solutions is, the market we build in, and how we work - with every figure sourced. A Kenyan building contractor since 2012 and, from 2026, a developer.",
  alternates: { canonical: "/about/profile" },
  ...(PROFILE_PUBLISHED ? {} : { robots: { index: false, follow: true } }),

  /**
   * Next merges metadata SHALLOWLY - a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Without this block the
   * page inherited the root object, so sharing any inner page showed the HOME
   * page's title and description. Hence the repetition: images included on
   * purpose, because they would otherwise be dropped.
   */
  openGraph: {
    title: "Corporate Profile",
    description:
      "Who Benchmark Building Solutions is, the market we build in, and how we work - with every figure sourced.",
    url: "/about/profile",
    type: "website",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Profile",
    description:
      "Who Benchmark Building Solutions is, the market we build in, and how we work - with every figure sourced.",
    images: ["/images/seoimage.jpg"],
  },
};

export default function CorporateProfilePage() {
  if (!PROFILE_PUBLISHED) {
    return (
      <section className="w-full pb-16 sm:pb-20 lg:pb-24">
        <Container style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}>
          <Breadcrumbs
            trail={[
              { label: "About Us", href: "/about" },
              { label: "Corporate Profile" },
            ]}
          />
          <ComingSoon
            title="The profile is being finished, not written."
            body="Everything it will contain already exists elsewhere on this site - who we are, how we work, the market we build in and the projects behind it. What is left is checking two figures against our own records, because a profile that a bank reads is the wrong place to round anything up."
            primary={{ label: "How we work", href: "/about/how-we-work" }}
            secondary={{ label: "The team", href: "/about/leadership" }}
          />
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* ---------------------------------------------------- 1. THE FILM */}
      <section className="surface-dark w-full">
        <Container
          className="pb-14 sm:pb-16 lg:pb-20"
          style={{ paddingTop: "calc(var(--header-h, 5rem) + 3rem)" }}
        >
          <Breadcrumbs
            trail={[
              { label: "About Us", href: "/about" },
              { label: "Corporate Profile" },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="min-w-0">
              <p className="eyebrow">{profileHero.eyebrow}</p>
              <h1 className="mt-5 max-w-[13ch]">{profileHero.heading}</h1>
              <p className="lede mt-7 max-w-[46ch]">{profileHero.lede}</p>
              <Link href="#overview" className="btn-pill mt-9">
                Read the profile
              </Link>
            </div>

            <div className="min-w-0">
              <IntroVideo
                src={profileHero.videoSrc}
                captionsSrc={profileHero.captionsSrc}
                label={profileHero.videoLabel}
                poster={profileHero.videoPoster}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------- 2. THE ARGUMENT */}
      <section id="overview" className="w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow">{profileOverview.eyebrow}</p>
            <h2 className="t-section mt-5 max-w-[20ch]">
              {profileOverview.heading}
            </h2>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
                {profileOverview.paragraphs.map((para) => (
                  <p key={para.slice(0, 24)} className="lede mt-5 first:mt-0">
                    {para}
                  </p>
                ))}
              </div>
              <p className="t-sub min-w-0 border-l-[3px] border-[color:var(--accent)] pl-5 font-[family-name:var(--font-display)] leading-[1.3] text-[color:var(--navy)]">
                {profileOverview.pull}
              </p>
            </div>
          </Reveal>

          {/* The market, in sourced numbers. */}
          <Reveal>
            <h3 className="t-sub mt-16 sm:mt-20">The market we work in</h3>
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[color:var(--rule)] bg-[color:var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
              {marketStats.map((stat) => (
                <div
                  key={stat.figure}
                  className="flex min-w-0 flex-col gap-2 bg-white p-6 lg:p-7"
                >
                  <p className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,2.6rem)] font-semibold leading-none text-[color:var(--navy)] [font-variant-numeric:tabular-nums]">
                    {stat.figure}
                  </p>
                  <p className="text-[length:var(--type-body)] font-semibold leading-snug">
                    {stat.claim}
                  </p>
                  <p className="mt-auto pt-2 text-[0.75rem] leading-[1.45] text-[color:var(--text-muted)]">
                    {stat.detail}
                    <br />
                    <span className="italic">{stat.source}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* What we do about it. */}
          <h3 className="t-sub mt-16 sm:mt-20">What we actually do about it</h3>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {profilePillars.map((pillar) => (
              <Reveal key={pillar.index}>
                <article className="flex h-full min-w-0 flex-col rounded-xl border border-[color:var(--rule)] border-t-[3px] border-t-[color:var(--accent)] bg-white p-7 lg:p-9">
                  <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                    {pillar.index} / {pillar.kicker}
                  </p>
                  <h4 className="t-card mt-3">{pillar.title}</h4>
                  <p className="body-text mt-4">{pillar.body}</p>

                  <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-[color:var(--rule)] pt-5">
                    <p className="font-[family-name:var(--font-display)] text-[1.6rem] font-semibold leading-none text-[color:var(--navy)] [font-variant-numeric:tabular-nums]">
                      {pillar.figure}
                    </p>
                    <p className="min-w-0 flex-1 basis-[14ch] text-[0.78rem] leading-[1.5] text-[color:var(--text-muted)]">
                      {pillar.figureNote}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- 3. THE STORY */}
      <section className="surface-dark w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <p className="eyebrow">Our story</p>
          <h2 className="t-section mt-5 max-w-[22ch]">
            Fourteen years, and the part that mattered came late.
          </h2>
          <p className="lede mt-6 max-w-[58ch]">
            We spent nine years learning this industry the slow way before we
            were ready to change how we worked in it. These are the four dates
            that actually moved us.
          </p>

          <ProfileTimeline entries={profileTimeline} />
        </Container>
      </section>

      {/* --------------------------------------- 4. WHAT SETS US APART */}
      <section className="surface-light w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow">What sets us apart</p>
            <h2 className="t-section mt-5 max-w-[22ch]">
              Four things a competitor cannot copy by next quarter.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[color:var(--rule)] bg-[color:var(--rule)] md:grid-cols-2">
            {differentiators.map((item) => (
              <article
                key={item.title}
                className="min-w-0 bg-white p-7 lg:p-9"
              >
                <span className="block text-[color:var(--accent)]">
                  <ApartIcon name={item.icon} />
                </span>
                <h3 className="t-card mt-4">{item.title}</h3>
                <p className="body-text mt-4">{item.body}</p>
                <ul className="mt-5 flex list-none flex-col gap-[0.6rem] p-0">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-[1.1rem] text-[length:var(--type-meta)] leading-[1.5] text-[color:var(--text-faint)]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.62em] h-[5px] w-[5px] rounded-full bg-[color:var(--accent)]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- 5. THE WAY IN */}
      <section className="surface-dark w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="min-w-0">
              <p className="eyebrow">Next</p>
              <h2 className="t-section mt-5 max-w-[20ch]">
                Bring us the plot, and we will tell you what it costs.
              </h2>
              <p className="lede mt-6 max-w-[46ch]">
                Before you commit to anything, you get the figure, the
                programme and the approvals route in writing. That is the
                first thing we do, not the last.
              </p>
              <Link href="/contact" className="btn-pill mt-9">
                Talk to us about your project
              </Link>
            </div>

            <div className="min-w-0 rounded-xl border border-[color:var(--rule)] p-6 lg:p-7">
              <p className="eyebrow">Company particulars</p>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-[length:var(--type-meta)]">
                {companyParticulars.map((row) => (
                  <React.Fragment key={row.term}>
                    <dt className="text-[color:var(--text-muted)]">
                      {row.term}
                    </dt>
                    <dd className="m-0 min-w-0 font-semibold">
                      {row.href ? (
                        <a href={row.href} className="hover:underline">
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- THE SOURCES */}
      <section className="w-full border-t border-[color:var(--rule)] py-12 sm:py-16">
        <Container>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-3 text-[length:var(--type-meta)] font-semibold text-[color:var(--text-faint)] marker:content-none">
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-open:rotate-90"
              >
                &rsaquo;
              </span>
              Sources for every figure on this page
            </summary>

            <p className="mt-5 max-w-[62ch] text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
              Citing the numbers is the same argument this page is making,
              performed rather than claimed.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-[0.8125rem]">
                <thead>
                  <tr>
                    {["Figure", "Claim", "Source", "Year"].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="whitespace-nowrap border-b border-[color:var(--rule)] px-3 py-[0.65rem] text-left text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[color:var(--text-muted)]"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sourceRows.map((row) => (
                    <tr
                      key={row.figure + row.claim.slice(0, 12)}
                      className={
                        row.unconfirmed
                          ? "text-[color:var(--accent)]"
                          : undefined
                      }
                    >
                      <td className="whitespace-nowrap border-b border-[color:var(--rule)] px-3 py-[0.65rem] align-top font-bold [font-variant-numeric:tabular-nums]">
                        {row.figure}
                      </td>
                      <td className="border-b border-[color:var(--rule)] px-3 py-[0.65rem] align-top">
                        {row.claim}
                      </td>
                      <td className="border-b border-[color:var(--rule)] px-3 py-[0.65rem] align-top">
                        {row.source}
                      </td>
                      <td className="whitespace-nowrap border-b border-[color:var(--rule)] px-3 py-[0.65rem] align-top">
                        {row.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Container>
      </section>
    </>
  );
}
