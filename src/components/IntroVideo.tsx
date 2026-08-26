"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface IntroVideoProps {
  src: string;
  captionsSrc?: string;
  label: string;
}

/**
 * Autoplays muted on load — the only way a browser will start a video
 * unprompted — and unmutes on the first click or key press. Captions are
 * turned on programmatically rather than trusting the `default` attribute,
 * which browsers honour inconsistently.
 */
const IntroVideo: React.FC<IntroVideoProps> = ({ src, captionsSrc, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // React can drop the muted attribute on hydration, and autoplay fails
  // without it, so it is set on the element directly.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = el.play();
    if (play) play.catch(() => undefined);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const showCaptions = () => {
      for (let i = 0; i < el.textTracks.length; i += 1) {
        if (el.textTracks[i].kind === "captions") {
          el.textTracks[i].mode = "showing";
        }
      }
    };
    showCaptions();
    el.addEventListener("loadedmetadata", showCaptions);
    return () => el.removeEventListener("loadedmetadata", showCaptions);
  }, []);

  const toggleSound = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    if (!next) {
      const play = el.play();
      if (play) play.catch(() => undefined);
    }
    setMuted(next);
  }, []);

  return (
    <div className="group relative w-full overflow-hidden rounded-lg bg-[#1B1E58] shadow-2xl">
      <video
        ref={videoRef}
        className="aspect-video w-full cursor-pointer object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onClick={toggleSound}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
        {captionsSrc ? (
          <track
            kind="captions"
            src={captionsSrc}
            srcLang="en"
            label="English"
            default
          />
        ) : null}
      </video>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>

      {muted ? (
        <span className="pointer-events-none absolute bottom-6 left-4 rounded-full bg-black/45 px-3 py-1 text-[length:var(--type-eyebrow)] uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
          Tap for sound
        </span>
      ) : null}
    </div>
  );
};

export default IntroVideo;
