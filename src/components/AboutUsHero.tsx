import React from "react";
import Container from "./Container";
import IntroVideo from "./IntroVideo";
import Reveal from "./Reveal";
import { aboutUsHeroDetails } from "@/data/aboutushero";
import { philosophyPanels, PhilosophyPanel } from "@/data/philosophy";

/**
 * WHO WE ARE
 * ----------
 * Navy hero, then a paper band carrying what the company stands for.
 *
 * The band went through a stacked-paragraph version and a definition-list
 * version before this one. Both were tidy and neither was read: four blocks
 * of similar-looking text in a column give a skimming eye nothing to catch
 * on, so people scrolled past the part the page exists to communicate.
 *
 * So the band now does two different jobs with two different shapes. The
 * philosophy is the thesis: centred, set large, with four phrases marked so
 * that someone who reads only the marks still collects the argument - what
 * we build, who it starts with, what it is built on, what it is for. The
 * mission, the vision and the values are the supporting facts: three cards
 * in a row, equal weight, scannable side by side rather than one after
 * another.
 *
 * THE WORDING IS THE BRAND'S OWN AND IS NOT EDITED HERE. The marks are
 * declared as substrings in data/philosophy.ts precisely so that nobody has
 * to put tags inside the sentence to emphasise part of it.
 */

/**
 * Splits a statement on its highlight phrases and wraps each one. The swash
 * is a background gradient rather than a border or an underline: it sits
 * behind the words at x-height, survives a line break with
 * box-decoration-break, and occupies no layout space, so marking a phrase
 * never reflows the paragraph.
 */
const marked = (body: string, highlights: string[] = []) => {
  if (!highlights.length) return body;
  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return body.split(new RegExp(`(${pattern})`, "g")).map((part, i) =>
    highlights.includes(part) ? (
      <mark
        key={`${part}-${i}`}
        className="bg-[linear-gradient(transparent_56%,rgba(153,18,18,0.18)_56%,rgba(153,18,18,0.18)_93%,transparent_93%)] px-[0.1em] text-[color:var(--text)] [-webkit-box-decoration-break:clone] [background-color:transparent] [box-decoration-break:clone]"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={`t-${i}`}>{part}</React.Fragment>
    ),
  );
};

const AboutUsHero: React.FC = () => {
  const philosophy = philosophyPanels.find((p) => p.title === "Our Philosophy");
  const cards: PhilosophyPanel[] = philosophyPanels.filter(
    (p) => p.title !== "Our Philosophy",
  );

  return (
    <>
      {/* The opening statement and the film. */}
      <section id="about-us-hero" className="surface-dark w-full">
        <Container
          className="pb-16 lg:pb-24"
          style={{ paddingTop: "calc(var(--header-h, 5rem) + 3rem)" }}
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-14">
            <div className="order-2 lg:order-1">
              <p className="eyebrow eyebrow-muted">
                {aboutUsHeroDetails.eyebrow}
              </p>
              <h1 className="mt-4">{aboutUsHeroDetails.heading}</h1>
              <p className="lede mt-6 max-w-xl">
                {aboutUsHeroDetails.subheading}
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <IntroVideo
                src={aboutUsHeroDetails.videoSrc}
                captionsSrc={aboutUsHeroDetails.captionsSrc}
                label={aboutUsHeroDetails.videoLabel}
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="what-we-stand-for"
        className="surface-light w-full py-16 sm:py-20 lg:py-28"
      >
        <Container>
          {/* The thesis. */}
          {philosophy ? (
            <Reveal>
              <div className="mx-auto max-w-4xl text-center">
                <p className="eyebrow">{philosophy.title}</p>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-6 block h-px w-12 bg-[color:var(--accent)]"
                />
                <p className="t-sub mt-8 leading-[1.5] text-[color:var(--text)]">
                  {marked(philosophy.body ?? "", philosophy.highlights)}
                </p>
              </div>
            </Reveal>
          ) : null}

          {/* The supporting facts, side by side. */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-24 lg:gap-8">
            {cards.map((panel, i) => (
              <Reveal key={panel.title} delay={Math.min(i, 2) * 0.08}>
                <article className="flex h-full flex-col border-t-2 border-[color:var(--accent)] bg-white p-7 shadow-[0_1px_0_0_rgba(23,23,23,0.06)] lg:p-9">
                  <span
                    aria-hidden="true"
                    className="numeral text-[length:var(--type-eyebrow)] text-[color:var(--text-muted)]"
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="t-card mt-3 text-[#212466]">{panel.title}</h3>

                  {panel.body ? (
                    <p className="body-text mt-4">{panel.body}</p>
                  ) : null}

                  {panel.items?.length ? (
                    <ul className="mt-5 flex flex-col gap-3">
                      {panel.items.map((item) => (
                        <li
                          key={item}
                          className="body-text flex items-baseline gap-3 font-medium text-[color:var(--text)]"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 translate-y-[-0.2em] rounded-full bg-[color:var(--accent)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutUsHero;
