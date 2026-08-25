"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const logosData = [
  { src: "/images/Jengalogo.png", alt: "Jenga Logo" },
  { src: "/images/bsh.png", alt: "Bsh Logo" },
  { src: "/images/legacy.png", alt: "Legacy Logo" },
  { src: "/images/cmaxlogo.png", alt: "Cmax Logo" },
  { src: "/images/Kmrclogo.png", alt: "Kmrc Logo" },
  { src: "/images/alphalogo.png", alt: "Alpha Logo" },
  { src: "/images/kpra.png", alt: "Kpra Logo" },
  { src: "/images/kanamna.jpg", alt: "Kanamna Logo" },
  { src: "/images/codisha.png", alt: "Codisha Logo" },
];

const Logos: React.FC = () => {
  const controls = useAnimation();

  const effectiveLogoItemWidth = 160 + 32 * 2;

  useEffect(() => {
    const totalLogosSetWidth = effectiveLogoItemWidth * logosData.length;
    const animationSpeed = 50;
    const duration = totalLogosSetWidth / animationSpeed;

    controls.start({
      x: -totalLogosSetWidth,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    });
  }, [controls, effectiveLogoItemWidth]);

  return (
    <section className="mt-6 px-5">
      <div className="ncaaccreditation flex flex-col items-center mb-12 justify-center">
        <Image
          src="/images/NCA.png"
          className="w-20 h-20 sm:w-40 sm:h-40"
          alt="NCA Logo"
          width={160}
          height={160}
        />
      </div>
      <div id="logomarks" className="logo-carousel-wrapper">
        <motion.div
          className="logo-carousel-inner"
          // We double the total width to accommodate the duplicated logos for seamless looping
          style={{
            width: `${effectiveLogoItemWidth * logosData.length * 2}px`,
          }}
          animate={controls}
        >
          {/* Duplicate logos to create a seamless loop */}
          {[...logosData, ...logosData].map((logo, index) => (
            <div key={index} className="logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160} // Keep these fixed for Next/Image optimization
                height={160} // Keep these fixed for Next/Image optimization
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Logos;
