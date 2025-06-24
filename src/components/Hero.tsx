"use client";

import React, { useState } from "react";
import { heroDetails } from "@/data/hero";
import CtaButton from "./CtaButton";
import Container from "./Container";
import LeadForm from "./LeadForm";

const Hero: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center py-16 md:py-24 px-5 min-h-screen"
    >
      {/* Background Video with Preload */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={heroDetails.centerVideoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[rgba(33,36,102,0.75)]" />
      </div>

      {/* Content Container - Visible Once Preloader Completes */}
      <Container>
        <div className="max-w-7xl container mx-auto py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          {/* Text Content */}
          <div className="lg:w-7/12 text-left">
            <p className="mt-4 max-w-lg md:max-w-xl text-white mx-auto md:mx-0">
              {heroDetails.subheading}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl md:leading-tight font-bold text-shadow-md text-[#fefeff] max-w-lg md:max-w-2xl mx-auto md:mx-0 capitalize">
              {heroDetails.heading}
            </h1>
            <p className="mt-4 max-w-lg md:max-w-xl text-white mx-auto md:mx-0">
              {heroDetails.description}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
              <CtaButton onClick={toggleForm} />
            </div>
          </div>

          {/* Foreground Video - Preloaded & Autoplaying */}
          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
            <div className="w-[min(554px,100%)] product-card-hover bg-white/10 backdrop-blur-md h-auto relative p-4 border-2 border-white">
              <video
                className="w-full max-w-lg filter object-cover saturate-150 shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
                width={554}
                height={510}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={heroDetails.centerVideoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </Container>
      {isFormOpen && <LeadForm onClose={toggleForm} />}
    </section>
  );
};

export default Hero;
