"use client";
import React from "react";
import Image from "next/image";
import Container from "./Container";
import { PortalHeroProps } from "@/types";
import { portalHeroDetails } from "@/data/portalhero";
import LoginButton from "./LoginButton";
import { motion, Variants } from "framer-motion";

// Define animation variants for the image
const imageVariants: Variants = {
  offscreen: {
    opacity: 0,
    x: 100, // Start 100px to the right
  },
  onscreen: {
    opacity: 1,
    x: 0, // Slide to original position
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
    },
  },
};

const PortalHero: React.FC<PortalHeroProps> = ({
  heading = portalHeroDetails.heading,
  subheading = portalHeroDetails.subheading,
  id = "about-us-hero",
}) => {
  return (
    <section
      id={id}
      className="relative flex items-center justify-center py-16 md:py-24 px-5 min-h-screen"
    >
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <Image
          src={portalHeroDetails.heroBgSrc}
          alt="Hero background"
          fill
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(33,36,102,0.83)]" />
        {/* Fallback background color for better contrast */}
      </div>
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <Container className="z-10">
        <div className="mx-auto py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          <div className="text-left md:w-1/2 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl md:leading-tight font-bold text-shadow-md text-[#fefeff] max-w-lg md:max-w-2xl mx-auto md:mx-0 capitalize">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-4 max-w-lg md:max-w-xl text-white mx-auto md:mx-0">
                {subheading}
              </p>
            )}
            <div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
              <LoginButton dark />
            </div>
          </div>
          <motion.div
            className="md:w-1/2 flex justify-center mt-12 md:mt-0"
            variants={imageVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <div className="w-[min(2108px,100%)] h-auto relative">
              <Image
                src={portalHeroDetails.centerImageSrc}
                width={854}
                height={810}
                quality={100}
                sizes="(max-width: 768px) 100vw, 1508px"
                priority={true}
                unoptimized={true}
                alt={portalHeroDetails.centerImageAlt}
                className="w-full max-w-lg filter saturate-150 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PortalHero;
