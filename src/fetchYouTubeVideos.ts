import { ITestimonial } from "@/types";

// Define YouTube API response type
interface YouTubePlaylistItem {
  snippet: {
    resourceId: { videoId: string };
    title: string;
    description: string;
    thumbnails?: { medium?: { url: string } };
    publishedAt: string;
  };
}

// Fetch YouTube videos from a playlist using the YouTube Data API
export const fetchYouTubeVideos = async (): Promise<ITestimonial[]> => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    console.error("Missing YouTube API key or Playlist ID.");
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
    );

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const { items } = await response.json();

    return items.map(({ snippet }: YouTubePlaylistItem) => ({
      videoId: snippet.resourceId.videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails?.medium?.url || "",
      publishedAt: snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};
