import { useRef, useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLIFrameElement,
        options: YT.PlayerOptions
      ) => YouTubePlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const loadYouTubeAPI = () => {
  if (
    typeof window !== "undefined" &&
    !window.YT &&
    !document.getElementById("youtube-iframe-api")
  ) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "youtube-iframe-api";
    document.head.appendChild(tag);
  }
};

interface YouTubePlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
}

export const useYouTubePlayer = (
  videoId: string,
  onPlay?: () => void,
  onPause?: () => void
) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializePlayer = useCallback(() => {
    if (iframeRef.current && window.YT?.Player) {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId,
        events: {
          onStateChange: ({ data }: { data: number }) => {
            setIsPlaying(data === window.YT.PlayerState.PLAYING);

            // Fixed shorthand condition (Line 61)
            if (data === window.YT.PlayerState.PLAYING) {
              onPlay?.();
            } else {
              onPause?.();
            }
          },
          onError: () => setIsPlaying(false),
        },
      });
    }
  }, [videoId, onPlay, onPause]);

  useEffect(() => {
    loadYouTubeAPI();
    const handleAPIReady = () => {
      if (!playerRef.current) initializePlayer();
    };
    window.onYouTubeIframeAPIReady = handleAPIReady;

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [initializePlayer]);

  const togglePlay = useCallback(() => {
    if (playerRef.current) {
      // Fixed shorthand condition (Line 85)
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  }, [isPlaying]);

  return { iframeRef, togglePlay, isPlaying };
};
