import { ITestimonial } from "@/types";

/**
 * YOUTUBE, FETCHED ON THE SERVER
 * ------------------------------
 * This used to run in the browser from a `"use client"` component inside a
 * useEffect, which cost four things at once:
 *
 *   1. The API key had to be NEXT_PUBLIC_, so it shipped to every visitor and
 *      could only be defended with an HTTP-referrer restriction.
 *   2. That restriction is why the section is blank on localhost - the
 *      whitelist names the live site, so development was blind.
 *   3. Every visitor paid for the round trip, after hydration, on every view.
 *   4. The videos were invisible to search engines. A crawler sees the HTML,
 *      and the HTML had an empty carousel in it.
 *
 * Fetched here instead, on the server, cached by Next for an hour. The key
 * stays private, there is nothing to whitelist, the markup arrives with the
 * episodes already in it, and YouTube is called roughly 24 times a day rather
 * than once per visitor.
 *
 * QUOTA: playlistItems.list costs 1 unit against a 10,000/day allowance.
 * Revalidating hourly uses about 24. There is no quota concern here.
 *
 * FAILURE IS NOT AN ERROR. If YouTube is down, the key is wrong or the quota
 * is somehow spent, this returns an empty array and the caller renders
 * nothing. A testimonials section that quietly isn't there beats a page that
 * will not build, and beats a carousel of empty frames.
 */

interface YouTubePlaylistItem {
  snippet?: {
    resourceId?: { videoId?: string };
    title?: string;
    description?: string;
    thumbnails?: {
      medium?: { url?: string };
      high?: { url?: string };
      maxres?: { url?: string };
    };
    publishedAt?: string;
  };
}

/** How long Next serves the cached list before refetching, in seconds. */
const REVALIDATE_SECONDS = 3600;

/**
 * Server-only first, with the NEXT_PUBLIC_ name as a fallback so the section
 * keeps working before the Vercel variables are renamed. Drop the fallbacks
 * once YOUTUBE_API_KEY and YOUTUBE_PLAYLIST_ID are set in production.
 */
const API_KEY =
  process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const PLAYLIST_ID =
  process.env.YOUTUBE_PLAYLIST_ID || process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;

export async function getPlaylistVideos(
  playlistId: string | undefined = PLAYLIST_ID,
  max = 12,
): Promise<ITestimonial[]> {
  if (!API_KEY || !playlistId) {
    console.warn("[youtube] API key or playlist id not configured.");
    return [];
  }

  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems" +
    `?part=snippet&maxResults=${max}` +
    `&playlistId=${encodeURIComponent(playlistId)}` +
    `&key=${encodeURIComponent(API_KEY)}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.warn(`[youtube] ${res.status} fetching playlist ${playlistId}`);
      return [];
    }

    const data = (await res.json()) as { items?: YouTubePlaylistItem[] };

    return (data.items ?? [])
      .map(({ snippet }): ITestimonial | null => {
        const videoId = snippet?.resourceId?.videoId;
        if (!videoId) return null;
        return {
          videoId,
          title: snippet?.title ?? "Untitled",
          description: snippet?.description ?? "",
          // maxres is absent on older uploads, so fall back down the chain.
          thumbnail:
            snippet?.thumbnails?.maxres?.url ??
            snippet?.thumbnails?.high?.url ??
            snippet?.thumbnails?.medium?.url ??
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          publishedAt: snippet?.publishedAt ?? "",
        };
      })
      .filter((v): v is ITestimonial => v !== null)
      // Deleted and private videos stay in a playlist as placeholders. They
      // would render as broken cards, so they are dropped here.
      .filter((v) => v.title !== "Deleted video" && v.title !== "Private video");
  } catch (err) {
    console.warn("[youtube] fetch failed:", err);
    return [];
  }
}
