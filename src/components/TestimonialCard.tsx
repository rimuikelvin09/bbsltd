"use client";
import React, { useState } from "react";
import { ITestimonial } from "@/types";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: ITestimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [showIframe, setShowIframe] = useState(false);

  const handleClick = () => setShowIframe(true);

  return (
    <div className="px-4 flex flex-col items-center testimonial-slide mx-2">
      <div className="relative w-full h-96 p-4 border-2 border-white rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
        <div className="relative w-full h-full max-w-lg">
          {!showIframe ? (
            <>
              <Image
                src={`https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`}
                alt={`Thumbnail for ${testimonial.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-lg object-cover saturate-150 cursor-pointer"
                onClick={handleClick}
                onError={(e) => {
                  e.currentTarget.src = "/images/ctacover.JPG";
                }}
              />
              <div className="absolute inset-0 bg-[rgba(33,36,102,0.57)]" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={handleClick}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 68 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 45 24 L 27 35 L 27 13 Z" fill="white" />
                </svg>
              </div>
            </>
          ) : (
            <iframe
              className="w-full h-full rounded-lg object-cover saturate-150 shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
              src={`https://www.youtube.com/embed/${testimonial.videoId}?enablejsapi=1&autoplay=1&controls=1`}
              title={testimonial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-label={`Testimonial video: ${testimonial.title}`}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
