"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ITestimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: ITestimonial;
  index: number;
}

/**
 * A facade, not an embed.
 *
 * A YouTube iframe pulls close to a megabyte of JavaScript before anyone has
 * pressed play. Twelve of them on one page is a page nobody waits for. This
 * renders the poster frame and swaps in the real player on click, so the cost
 * is paid by the one person who actually wants to watch - and only for the
 * video they chose.
 *
 * `index` decides loading strategy: the first two cards are what a visitor
 * sees without scrolling, so they load eagerly; the rest wait.
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  const [playing, setPlaying] = useState(false);

  return (
    <li className="w-[86vw] shrink-0 snap-start sm:w-[420px] lg:w-[460px]">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#1B1E58]">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${testimonial.videoId}?autoplay=1&rel=0`}
            title={testimonial.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${testimonial.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <Image
              src={
                testimonial.thumbnail ||
                `https://i.ytimg.com/vi/${testimonial.videoId}/hqdefault.jpg`
              }
              alt=""
              fill
              sizes="(max-width: 640px) 86vw, 460px"
              loading={index < 2 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(27,30,88,0.78)_0%,rgba(27,30,88,0.18)_52%,rgba(27,30,88,0.08)_100%)]"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110"
            >
              <svg width="20" height="22" viewBox="0 0 20 22" aria-hidden="true">
                <path d="M19 11 0 22V0z" fill="#212466" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <h3 className="t-card mt-5 line-clamp-2 text-[#212466]">
        {testimonial.title}
      </h3>
    </li>
  );
};

export default TestimonialCard;
