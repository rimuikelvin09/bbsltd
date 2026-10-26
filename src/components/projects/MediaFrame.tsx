import React from "react";
import Image from "next/image";
import { MediaKind } from "@/data/caseStudies";

const LABELS: Record<MediaKind, string> = {
  photo: "Photograph",
  drawing: "Drawing",
  diagram: "Diagram",
  render: "Render",
};

/**
 * One picture, or the absence of one.
 *
 * When the file is not there yet it draws a quiet panel carrying the
 * caption instead. Deliberately NOT marked "missing" or "to do": the site
 * speaks as if it is live, and a caption on a plain panel reads as a
 * considered choice rather than an unfinished page. What is outstanding
 * lives on the backlog, not in front of a client.
 */
const MediaFrame: React.FC<{
  src?: string;
  kind: MediaKind;
  caption?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  showKind?: boolean;
}> = ({ src, kind, caption, alt, priority, className = "", showKind = true }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? caption ?? ""}
        fill
        priority={priority}
        sizes="(min-width: 1000px) 50vw, 100vw"
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden bg-[color:var(--rule)] p-5 text-center"
      role="img"
      aria-label={caption ?? LABELS[kind]}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(135deg,currentColor_0_1px,transparent_1px_14px)] [color:var(--rule)]"
      />
      <span className="relative max-w-[32ch]">
        {showKind && (
          <span className="block font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {LABELS[kind]}
          </span>
        )}
        {caption && (
          <span className="mt-2 block text-[0.82rem] leading-[1.45] text-[color:var(--text-muted)]">
            {caption}
          </span>
        )}
      </span>
    </div>
  );
};

export default MediaFrame;
