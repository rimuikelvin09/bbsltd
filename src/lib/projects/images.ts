import fs from "fs";
import path from "path";
import { MediaKind } from "@/data/caseStudies";

/**
 * CASE-STUDY IMAGES
 * -----------------
 * NUMBERED, NOT DESCRIBED. Inside public/images/projects/<folder>/ there are
 * exactly three kinds of file:
 *
 *   hero-drawn.jpg     the design - render, elevation, or the BEFORE photo
 *   hero-built.jpg     the outcome - as built, or progress, or the AFTER
 *   1.jpg 2.jpg 3.jpg  the narrative, in storyline order
 *
 * The numbered files are handed out to chapters in order. Each chapter
 * declares a `media` array in caseStudies.ts, and the LENGTH of that array
 * is how many images it takes. So if chapter 2 declares one image and
 * chapter 5 declares two, chapter 2 gets 1.jpg and chapter 5 gets 2.jpg and
 * 3.jpg.
 *
 * WHY THIS IS BETTER THAN THE OLD NN-chapter-kind-x SCHEME. That one needed
 * a seven-section manual to explain, which was the evidence against it - a
 * convention a person needs instructions for is a convention that gets
 * followed wrongly. Here the only rule is "number them in the order they
 * should appear". Caption and media kind move into the data file, where the
 * person writing the copy is already working.
 *
 * Sorting is NUMERIC, so 10.jpg lands after 9.jpg rather than after 1.jpg.
 * Files that are not plain numbers are ignored, so Thumbs.db, the image
 * guide and a stray "2 copy.jpg" never shift the sequence.
 */

export interface CaseImage {
  src: string;
  kind: MediaKind;
  caption?: string;
}

export interface MediaSlot {
  caption: string;
  kind: MediaKind;
}

const ROOT = path.join(process.cwd(), "public/images/projects");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const cache = new Map<string, { named: Map<string, string>; numbered: string[] }>();

function read(folder: string) {
  const hit = cache.get(folder);
  if (hit) return hit;

  const named = new Map<string, string>();
  const numbered: { n: number; src: string }[] = [];

  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(ROOT, folder));
  } catch {
    // Folder absent in a fresh checkout. Everything falls back to a drawn
    // panel carrying the caption, which is plainer rather than broken.
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTENSIONS.includes(ext)) continue;

    const base = path.basename(file, path.extname(file));
    const src = `/images/projects/${folder}/${file}`;
    named.set(base.toLowerCase(), src);

    if (/^\d+$/.test(base)) numbered.push({ n: parseInt(base, 10), src });
  }

  const index = {
    named,
    numbered: numbered.sort((a, b) => a.n - b.n).map((f) => f.src),
  };
  cache.set(folder, index);
  return index;
}

/** First match wins, so callers can pass a specific name then a fallback. */
export function caseImage(folder: string, ...names: string[]): string | undefined {
  const { named } = read(folder);
  for (const name of names) {
    const hit = named.get(name.toLowerCase());
    if (hit) return hit;
  }
  return undefined;
}

/**
 * Hands the numbered files out to chapters in order.
 *
 * Declaring more slots than there are files is FINE and expected while a
 * case study is being photographed: the surplus slots come back without a
 * src and render as a captioned panel. The caption is still the real copy,
 * so the page reads as finished rather than as a building site.
 */
export function allocateCaseImages(
  folder: string,
  chapters: { media?: MediaSlot[] }[],
): CaseImage[][] {
  const { numbered } = read(folder);
  let cursor = 0;

  return chapters.map((chapter) => {
    const slots = chapter.media ?? [];
    return slots.map((slot) => ({
      src: numbered[cursor++],
      kind: slot.kind,
      caption: slot.caption,
    }));
  });
}
