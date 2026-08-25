"use client";
import React from "react";
import Image from "next/image";
import Container from "./Container";
import { AboutUsHeroProps } from "@/types";
import { aboutUsHeroDetails } from "@/data/aboutushero"; // Import About Us hero details

const AboutUsHero: React.FC<AboutUsHeroProps> = ({
  heading = aboutUsHeroDetails.heading,
  subheading = aboutUsHeroDetails.subheading,
  id = "about-us-hero",
}) => {
  return (
    <section
      id={id}
      className="relative flex items-center justify-center py-16 md:py-24 px-5 min-h-screen"
    >
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <Image
          src={aboutUsHeroDetails.heroBgSrc}
          alt="Hero background"
          fill
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(33,36,102,0.75)]" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <Container className=" z-10">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="text-left md:w-1/2 md:pr-8">
            <h1 className="text-shadow-md text-[#fefeff] max-w-lg md:max-w-2xl mx-auto md:mx-0 capitalize">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-4 max-w-lg md:max-w-xl text-white mx-auto md:mx-0">
                {subheading}
              </p>
            )}
          </div>
          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
            <div className="w-[min(554px,100%)] h-auto relative">
              {" "}
              {/* Responsive image container */}
              <Image
                src={aboutUsHeroDetails.centerImageSrc} // Use About Us page image
                width={554}
                height={510}
                quality={100}
                sizes="(max-width: 768px) 100vw, 554px" // Adjust sizes for responsiveness
                priority={true}
                unoptimized={true}
                alt={aboutUsHeroDetails.centerImageAlt}
                className="h-auto w-full object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUsHero;
