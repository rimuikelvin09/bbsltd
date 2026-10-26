import fs from "fs";
import path from "path";

/**
 * LEARN IMAGES, BY CONVENTION
 * ---------------------------
 * The filename is the mapping. This reads public/images/learnimages once at
 * build time and answers lookups from memory, so pages ask for the image
 * they want by name and get back a path or undefined.
 *
 * Why not a list in a data file: a list has to be kept in sync by hand, and
 * the day it falls out of sync you get a broken image on a live page. Here,
 * adding a category means adding one correctly named file. Nothing to edit.
 *
 * Returning `undefined` rather than a path that may not exist is the point -
 * the caller falls back to the drawn gradient, so a missing image is a
 * slightly plainer card rather than a broken one.
 *
 * See the README in that folder for the naming scheme and size limits.
 */

const DIR = path.join(process.cwd(), "public/images/learnimages");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

let index: Map<string, string> | null = null;

function build(): Map<string, string> {
  if (index) return index;

  const map = new Map<string, string>();
  try {
    for (const file of fs.readdirSync(DIR)) {
      const ext = path.extname(file).toLowerCase();
      if (!EXTENSIONS.includes(ext)) continue;
      // Keyed on the bare name, lowercased, so "Card-Podcast.PNG" and
      // "card-podcast.jpg" both answer to "card-podcast".
      map.set(path.basename(file, path.extname(file)).toLowerCase(), `/images/learnimages/${file}`);
    }
  } catch {
    // Folder absent in a fresh checkout. Not an error: everything falls back.
  }

  index = map;
  return map;
}

/**
 * First match wins, so a caller can pass a specific name then a generic one:
 *   learnImage(`card-${slug}`, "card-default")
 */
export function learnImage(...names: string[]): string | undefined {
  const map = build();
  for (const name of names) {
    const hit = map.get(name.toLowerCase());
    if (hit) return hit;
  }
  return undefined;
}
