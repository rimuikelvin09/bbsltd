import React from "react";
import CompareFrame from "./CompareFrame";
import MediaFrame from "./MediaFrame";
import { CaseStudy } from "@/data/caseStudies";
import { caseImage } from "@/lib/projects/images";

/**
 * THE HERO PROOF DEVICE.
 *
 * This is the ONLY place the kind of project changes the page. Narrative,
 * spec, navigation and enquiry are identical for an apartment block, a
 * repair job and a drawings-only commission.
 *
 * LAYOUT FOLLOWS THE DEVICE, not the other way round. A slider or a single
 * image sits beside the copy at 40/60. A PAIR or a GALLERY needs width, so
 * the copy goes above and the images take the full container - two small
 * frames squeezed into 60% of a column prove nothing.
 */

const Labelled: React.FC<{
  src?: string;
  kind: "photo" | "drawing" | "diagram" | "render";
  label: string;
  caption: string;
  priority?: boolean;
}> = ({ src, kind, label, caption, priority }) => (
  <figure className="m-0 min-w-0">
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color:var(--rule)] lg:max-h-[min(42svh,380px)]">
      <MediaFrame src={src} kind={kind} caption={caption} priority={priority} />
      <span className="pointer-events-none absolute left-3 top-3 z-[2] rounded-md bg-black/45 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
        {label}
      </span>
    </div>
    <figcaption className="mt-2 text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
      {caption}
    </figcaption>
  </figure>
);

const Copy: React.FC<{ study: CaseStudy }> = ({ study }) => (
  <div className="min-w-0">
    <p className="eyebrow">
      Case study {study.index} &middot; {study.location}
    </p>
    <h1 className="mt-4 max-w-[14ch]">{study.headline}</h1>
    <p className="mt-5 text-[length:var(--type-meta)] font-semibold uppercase tracking-[0.13em] text-[color:var(--text-muted)]">
      {study.statusNote}
    </p>
  </div>
);

const CaseHero: React.FC<{ study: CaseStudy }> = ({ study }) => {
  const { hero, imageFolder } = study;

  /* --- two images that do not share a viewpoint, side by side ---------- */
  if (hero.kind === "pair") {
    return (
      <div className="flex flex-col gap-8 lg:gap-10">
        <Copy study={study} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7">
          <Labelled
            src={caseImage(imageFolder, hero.left)}
            kind={hero.leftKind}
            label={hero.leftLabel}
            caption={hero.leftCaption}
            priority
          />
          <Labelled
            src={caseImage(imageFolder, hero.right)}
            kind={hero.rightKind}
            label={hero.rightLabel}
            caption={hero.rightCaption}
            priority
          />
        </div>
      </div>
    );
  }

  /* --- drawings only: show them as drawings ---------------------------- */
  if (hero.kind === "gallery") {
    return (
      <div className="flex flex-col gap-8 lg:gap-10">
        <Copy study={study} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {hero.images.map((name, i) => (
            <div
              key={name}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[color:var(--rule)]"
            >
              <MediaFrame
                src={caseImage(imageFolder, name)}
                kind={hero.kinds[i] ?? "drawing"}
                caption={study.title}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* --- matched viewpoints, or a single image: beside the copy ---------- */
  const frame =
    hero.kind === "compare" ? (
      <CompareFrame
        left={caseImage(imageFolder, hero.left)}
        right={caseImage(imageFolder, hero.right)}
        leftLabel={hero.leftLabel}
        rightLabel={hero.rightLabel}
        leftKind={hero.leftKind}
        rightKind={hero.rightKind}
        leftCaption={`${hero.leftLabel} - ${study.title}`}
        rightCaption={`${hero.rightLabel} - ${study.title}`}
        className="lg:max-h-[min(52svh,470px)]"
        priority
      />
    ) : (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color:var(--rule)] lg:max-h-[min(52svh,470px)]">
        <MediaFrame
          src={caseImage(imageFolder, hero.image)}
          kind={hero.imageKind}
          caption={study.title}
          priority
        />
      </div>
    );

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[40fr_60fr] lg:gap-12">
      <Copy study={study} />
      <div className="min-w-0">{frame}</div>
    </div>
  );
};

export default CaseHero;
