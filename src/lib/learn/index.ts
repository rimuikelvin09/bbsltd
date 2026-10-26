import {
  LearnCategory,
  LearnCategoryDef,
  LearnCategorySummary,
  LearnItem,
} from "@/types";
import { categories, episodeNotes, episodeTopics, guides, written } from "@/data/learn";
import { getPlaylistVideos } from "@/lib/youtube";
import { learnImage } from "@/lib/learn/images";
import { generateSlug } from "@/utils";

/**
 * CONTENT LAYER FOR /learn
 *
 * Three sources, one list. Episodes arrive from the YouTube Data API at
 * build time; guides and written pieces come from data/learn.ts. Nothing
 * that renders knows which is which - every page reads LearnItem[].
 *
 * DEGRADES QUIETLY. If YouTube is unconfigured or the key is wrong,
 * getPlaylistVideos returns an empty array and the rest of the section
 * renders as normal. A category missing its items beats a build that fails.
 */

const PODCAST_PLAYLIST_ID =
  process.env.YOUTUBE_PODCAST_PLAYLIST_ID || process.env.YOUTUBE_PLAYLIST_ID;

/** Drafts are readable in `next dev` and dropped by `next build`. */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

/** YouTube descriptions run long. A card wants a sentence, not an essay. */
function firstSentences(text: string | undefined, max = 180): string {
  if (!text) return "";
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const stop = cut.lastIndexOf(". ");
  return stop > 60 ? cut.slice(0, stop + 1) : cut.trimEnd() + "…";
}

async function getPodcastItems(): Promise<LearnItem[]> {
  const videos = await getPlaylistVideos(PODCAST_PLAYLIST_ID, 50);

  return videos.map((v) => ({
    slug: generateSlug(v.title),
    category: "podcast" as const,
    form: "video" as const,
    title: v.title,
    summary:
      firstSentences(v.description) ||
      "An episode of The Smart Builder, the Benchmark Group real estate podcast.",
    publishedAt: (v.publishedAt || "").slice(0, 10),
    topics: episodeTopics[v.videoId] ?? [],
    videoId: v.videoId,
    thumbnail: v.thumbnail,
    notes: episodeNotes[v.videoId],
  }));
}

/** Everything, newest first. */
export async function getLearnItems(): Promise<LearnItem[]> {
  const episodes = await getPodcastItems();

  return [...episodes, ...written, ...guides]
    .filter((item) => SHOW_DRAFTS || !item.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getItemsByCategory(
  category: LearnCategory,
): Promise<LearnItem[]> {
  const all = await getLearnItems();
  return all.filter((item) => item.category === category);
}

export function getCategoryDef(slug: string): LearnCategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * The six cards, with counts and images resolved.
 *
 * Counts are derived, never typed in. A card that disagrees with its own
 * category is the classic way a page like this rots.
 */
export async function getCategorySummaries(): Promise<LearnCategorySummary[]> {
  const all = await getLearnItems();

  return categories.map((c) => ({
    ...c,
    count: all.filter((item) => item.category === c.slug).length,
    image: learnImage(`card-${c.slug}`),
  }));
}

export async function getLearnItemBySlug(
  category: string,
  slug: string,
): Promise<LearnItem | undefined> {
  const all = await getLearnItems();
  return all.find((item) => item.category === category && item.slug === slug);
}

/** Up to `limit` others, preferring ones that share a topic. */
export async function getRelatedItems(
  item: LearnItem,
  limit = 3,
): Promise<LearnItem[]> {
  const all = await getLearnItems();
  const shared = (i: LearnItem) =>
    i.topics.filter((t) => item.topics.includes(t)).length;

  return all
    .filter((i) => !(i.category === item.category && i.slug === item.slug))
    .sort(
      (a, b) => shared(b) - shared(a) || b.publishedAt.localeCompare(a.publishedAt),
    )
    .slice(0, limit);
}

/** Every publication URL, for generateStaticParams and the sitemap. */
export async function getLearnRoutes(): Promise<
  Array<{ category: string; slug: string; publishedAt: string; form: string }>
> {
  const all = await getLearnItems();
  return all.map((i) => ({
    category: i.category,
    slug: i.slug,
    publishedAt: i.publishedAt,
    form: i.form,
  }));
}
