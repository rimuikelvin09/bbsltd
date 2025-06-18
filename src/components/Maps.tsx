"use client";
import React, { useEffect, useRef } from "react";
import SectionTitle from "./SectionTitle";
import Container from "./Container";
import { MapSectionProps } from "@/types";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
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

export const childVariants = {
  offscreen: {
    opacity: 0,
    x: -50,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const MapSection: React.FC<MapSectionProps> = ({
  title,
  description,
  address,
  phone,
  email,
}) => {
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const iframeCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.984014313502!2d36.826334874586394!3d-1.1717401988170464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3d226b37a1cd%3A0x3c5feb1c073fa1a9!2sBenchmark%20Building%20Solutions%20Ltd!5e0!3m2!1sen!2ske!4v1745319406552!5m2!1sen!2ske" style="border:0; width: 100%; height: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  useEffect(() => {
    const handleResize = () => {
      if (iframeContainerRef.current) {
        const width = iframeContainerRef.current.offsetWidth;
        // Calculate a desired height based on a reasonable aspect ratio (e.g., 9/16 or similar)
        const aspectRatio = 9 / 16; // You can adjust this
        iframeContainerRef.current.style.height = `${width * aspectRatio}px`;
      }
    };

    // Initial call
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.section
      id="location-section"
      className="py-16 bg-gray-50"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
    >
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Map Area (Left) */}
          <motion.div
            className="lg:w-7/12 overflow-hidden rounded-lg shadow-lg"
            ref={iframeContainerRef}
          >
            <div
              className="map-div"
              dangerouslySetInnerHTML={{ __html: iframeCode }}
            />
          </motion.div>

          {/* Contact Details Area (Right) */}
          <div className="lg:w-5/12 text-left">
            <motion.div
              className="flex flex-col gap-4 items-start"
              variants={childVariants}
            >
              <SectionTitle>
                <h2 className="text-3xl lg:text-5xl lg:leading-tight font-black text-[#212466] text-left">
                  {title}
                </h2>
              </SectionTitle>
              {description && (
                <p className="mt-2 text-gray-700 text-left">{description}</p>
              )}
              <div className="mt-6 leading-relaxed text-left">
                <p>
                  <strong>Address:</strong> {address}
                </p>
                <p className="mt-2">
                  <strong>Phone:</strong> {phone}
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> {email}
                </p>
                {/* Add more contact details as needed */}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default MapSection;
