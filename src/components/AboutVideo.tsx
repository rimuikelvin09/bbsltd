"use client";
import React, { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { aboutIntroData } from "@/data/aboutintro";
import Image from "next/image";

const containerVariants: Variants = {
  offscreen: { opacity: 0, y: 100 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  offscreen: { opacity: 0, x: -50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", bounce: 0.2, duration: 1 },
  },
};

const AboutIntro: React.FC = () => {
  const { title, subheading, description, videoId } = aboutIntroData;
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!videoId) return <div>Error: Video ID is missing</div>;

  return (
    <section id="about-intro" className="py-16 sm:py-24 bg-gray-50">
      <motion.div
        className="sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center h-full"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        {/* Video Section - Appears first on mobile and left on large screens */}
        <div className="lg:w-10/12   flex justify-end relative bg-white/10 backdrop-blur-md h-auto p-4 border-2 border-white order-1">
          <div className="relative w-full h-full">
            {!showIframe ? (
              <>
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="About Benchmark Video Thumbnail"
                  width={1280}
                  height={720}
                  className="object-cover saturate-150 w-full h-full rounded-lg"
                  priority
                />
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/50 rounded-lg transition-opacity hover:bg-black/40"
                  onClick={() => setShowIframe(true)}
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </>
            ) : (
              <iframe
                ref={iframeRef}
                className="w-full h-full aspect-video rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="About Benchmark Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        {/* Text Section - Appears after video on mobile and right on large screens */}
        <div className="lg:w-8/12 text-left order-2">
          <motion.div className="flex flex-col gap-4" variants={childVariants}>
            <p className="mt-4 text-left text-sm text-[#991212] uppercase tracking-wider">
              {subheading}
            </p>
            <div className="w-32 h-[2px] bg-[#991212] my-1"></div>
            <h2 className="text-3xl sm:text-4xl text-left font-semibold capitalize text-[#212466]">
              {title}
            </h2>
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="leading-relaxed text-foreground-accent text-base sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutIntro;
