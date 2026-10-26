"use client";

import React, { useState } from "react";

/**
 * A YouTube embed costs close to a megabyte of JavaScript. Twelve of them on
 * one index is a page nobody waits for, on the connections our visitors
 * actually use.
 *
 * So: a poster frame and a play button, which is one image. The real player
 * loads only for the video someone chooses, and only then.
 */
interface Props {
  videoId: string;
  title: string;
  thumbnail?: string;
  /** The first couple of posters are above the fold on most screens. */
  priority?: boolean;
  className?: string;
}

const VideoFacade: React.FC<Props> = ({
  videoId,
  title,
  thumbnail,
  priority = false,
  className = "",
}) => {
  const [playing, setPlaying] = useState(false);

  const poster =
    thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div
        className={`video-poster relative aspect-video w-full overflow-hidden rounded-xl bg-[#1b1e58] ${className}`}
      >
        <iframe
          // nocookie: no tracking cookie is set unless the visitor plays.
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className={`video-poster group relative block aspect-video w-full overflow-hidden rounded-xl bg-[#1b1e58] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[rgba(27,30,88,0.78)] via-[rgba(27,30,88,0.12)] to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 transition-transform duration-200 group-hover:scale-110"
      >
        <svg width="17" height="19" viewBox="0 0 18 20" aria-hidden="true">
          <path d="M17 10 0 20V0z" fill="#212466" />
        </svg>
      </span>
    </button>
  );
};

export default VideoFacade;
