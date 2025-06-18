"use client";
import React from "react";
import Image from "next/image";
import Container from "./Container";
import { PortfolioHeroProps } from "@/types";
import { portfolioHeroDetails } from "@/data/portfoliohero"; // Import About Us hero details

const PortfolioHero: React.FC<PortfolioHeroProps> = ({
  heading = portfolioHeroDetails.heading,
  id = "portfolio-hero",
}) => {
  return (
    <section
      id={id}
      className="relative flex items-center justify-center py-16 md:py-24 px-5 h-[50vh]"
    >
      {/* Background elements remain unchanged */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <Image
          src={portfolioHeroDetails.heroBgSrc}
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

      <Container className="z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl md:leading-tight font-black text-shadow-md text-[#fefeff] max-w-lg md:max-w-2xl capitaliza">
            {heading}
          </h1>
          <p className="mt-4 text-md text-white uppercase">Featured Projects</p>
        </div>
      </Container>
    </section>
  );
};

export default PortfolioHero;
