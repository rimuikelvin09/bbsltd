import React from "react";
import type { Metadata } from "next";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import OurApproach from "@/components/OurApproach";
import { ourApproachData } from "@/data/ourapproach";
import { philosophyPanels } from "@/data/philosophy";

/**
 * /about/how-we-work
 *
 * The philosophy statement IS the hero - no separate headline competing
 * with it. Then mission, vision and values, then the approach. Renamed
 * from "Our Philosophy" because a label should say what the reader gets.
 *
 * NO HERO BANNER of the usual kind: the breadcrumb and the statement do
 * that work, and most arrivals here come straight from search.
 *
 * THE WORDING IS THE BRAND'S OWN, VERBATIM. `highlights` names exact
 * substrings to mark as the eye travels, so the sentence is never rewritten
 * with tags inside it.
 */
export const metadata: Metadata = {
  title: "How We Work",
  description:
    "The philosophy, mission, vision and values behind Benchmark Building Solutions, and the approach every build is held to.",
  alternates: { canonical: "/about/how-we-work" },

  /**
   * Next merges metadata SHALLOWLY - a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Without this block the
   * page inherited the root object, so sharing any inner page showed the HOME
   * page's title and description. Hence the repetition: images included on
   * purpose, because they would otherwise be dropped.
   */
  openGraph: {
    title: "How We Work",
    description:
      "The philosophy, mission, vision and values behind Benchmark Building Solutions.",
    url: "/about/how-we-work",
    type: "website",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work",
    description:
      "The philosophy, mission, vision and values behind Benchmark Building Solutions.",
    images: ["/images/seoimage.jpg"],
  },
};

/** Marks the declared phrases without touching the wording around them. */
function marked(body: string, highlights?: string[]): React.ReactNode {
  if (!highlights || highlights.length === 0) return body;

  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const parts = body.split(new RegExp(`(${pattern})`, "g"));

  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <mark
        key={i}
        className="bg-transparent bg-[linear-gradient(transparent_56%,rgba(153,18,18,0.22)_56%,rgba(153,18,18,0.22)_93%,transparent_93%)] px-[0.1em] text-[#212466] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export default function HowWeWorkPage() {
  const philosophy = philosophyPanels.find((p) => p.title === "Our Philosophy");
  const mission = philosophyPanels.find((p) => p.title === "Our Mission");
  const vision = philosophyPanels.find((p) => p.title === "Our Vision");
  const values = philosophyPanels.find((p) => p.title === "Core Values");

  return (
    <>
      {/* The statement, as the hero. White ground and navy type in both
          themes - this is the brand speaking in its own voice, so it is not
          a band and does not invert. Centred, as it has always been. */}
      <section className="flex w-full items-center bg-white lg:min-h-[100svh]">
        <Container
          className="w-full pb-16 text-center sm:pb-20 lg:pb-24"
          style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}
        >
          <Breadcrumbs
            trail={[{ label: "About Us", href: "/about" }, { label: "How We Work" }]}
            className="flex justify-center"
          />
          <p className="eyebrow mt-7">Our philosophy</p>
          {philosophy?.body && (
            <p className="t-sub mx-auto mt-6 max-w-[52ch] font-[family-name:var(--font-display)] leading-[1.4] text-[#212466]">
              {marked(philosophy.body, philosophy.highlights)}
            </p>
          )}
        </Container>
      </section>

      <section className="surface-light w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-7 lg:grid-cols-3 lg:gap-9">
            {[mission, vision].map(
              (panel) =>
                panel && (
                  <Reveal key={panel.title}>
                    <article className="flex h-full flex-col border-t-2 border-[color:var(--accent)] bg-white p-7 lg:p-9">
                      <h2 className="t-card">{panel.title}</h2>
                      <p className="body-text mt-4">{panel.body}</p>
                    </article>
                  </Reveal>
                ),
            )}

            {values?.items && (
              <Reveal>
                <article className="flex h-full flex-col border-t-2 border-[color:var(--accent)] bg-white p-7 lg:p-9">
                  <h2 className="t-card">{values.title}</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {values.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
                        />
                        <span className="body-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      <section className="surface-light w-full pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <Reveal>
            <OurApproach approach={ourApproachData} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
