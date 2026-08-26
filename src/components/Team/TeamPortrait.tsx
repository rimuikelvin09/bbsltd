"use client";

import React from "react";
import Image from "next/image";

interface TeamPortraitProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  /** Tailwind aspect ratio class. Fixes the frame so a swap cannot resize it. */
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * A portrait that swaps to a second frame on hover or keyboard focus.
 *
 * The frame is a fixed aspect ratio and both images are cropped to fill it,
 * so the two photos can have completely different dimensions and the layout
 * never moves — nobody has to scroll to find where the picture went.
 *
 * Both images are always in the DOM and cross-faded, so there is no flash
 * while the second one loads. Where a person has no second frame, nothing
 * happens on hover, which reads as intentional rather than broken.
 */
const TeamPortrait: React.FC<TeamPortraitProps> = ({
  src,
  hoverSrc,
  alt,
  aspect = "aspect-[3/4]",
  className = "",
  sizes = "(max-width: 1024px) 90vw, 544px",
  priority,
}) => {
  const second = hoverSrc || src;
  const hasSwap = second !== src;

  return (
    <div
      className={`group/portrait relative w-full overflow-hidden ${aspect} ${className}`}
      tabIndex={hasSwap ? 0 : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          hasSwap
            ? "group-hover/portrait:scale-[1.03] group-hover/portrait:opacity-0 group-focus-within/portrait:scale-[1.03] group-focus-within/portrait:opacity-0"
            : ""
        }`}
      />
      {hasSwap ? (
        <Image
          src={second}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          quality={90}
          className="absolute inset-0 scale-[1.03] object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/portrait:scale-100 group-hover/portrait:opacity-100 group-focus-within/portrait:scale-100 group-focus-within/portrait:opacity-100"
        />
      ) : null}
    </div>
  );
};

export default TeamPortrait;
