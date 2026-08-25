"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  FaSearch,
  FaLightbulb,
  FaUsers,
  FaFilter,
  FaPencilAlt,
  FaCheckCircle,
} from "react-icons/fa";
import SectionTitle from "./SectionTitle";

interface ApproachStep {
  title: string;
  description: string;
}

interface Props {
  approach: {
    title: string;
    description: string;
    steps: ApproachStep[];
    imageSrc: string;
  };
}

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

const OurApproach: React.FC<Props> = ({ approach }) => {
  const { title, description, steps, imageSrc } = approach;

  const getIcon = (stepTitle: string) => {
    switch (stepTitle.toLowerCase()) {
      case "listen":
        return <FaSearch className="mr-4 text-[#991212]" size={24} />;
      case "explore":
        return <FaLightbulb className="mr-4 text-[#991212]" size={24} />;
      case "involve":
        return <FaUsers className="mr-4 text-[#991212]" size={24} />;
      case "distill":
        return <FaFilter className="mr-4 text-[#991212]" size={24} />;
      case "express":
        return <FaPencilAlt className="mr-4 text-[#991212]" size={24} />;
      case "execute":
        return <FaCheckCircle className="mr-4 text-[#991212]" size={24} />;
      default:
        return null;
    }
  };

  return (
    <section id="our-approach" className="py-24 bg-gray-50">
      <motion.div
        className="max-w-screen-lg mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" // Use grid layout
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        {/* Left side: Image */}
        <div className="relative overflow-hidden rounded-md shadow-md lg:h-full">
          <Image
            src={imageSrc}
            alt="Our Approach"
            layout="fill"
            objectFit="cover"
            priority
            className="object-cover"
          />
        </div>

        {/* Right side: Text */}
        <div className="text-left">
          <motion.div className="flex flex-col gap-6" variants={childVariants}>
            <SectionTitle>
              <h2>{title}</h2>
            </SectionTitle>
            <p className="leading-relaxed text-foreground-accent">
              {description}
            </p>
            <ul>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="py-3 border-b border-gray-200 last:border-b-0 flex items-center"
                >
                  {getIcon(step.title)}
                  <div>
                    <h4 className="text-secondary">
                      {step.title}
                    </h4>
                    <p className="text-sm mt-1 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurApproach;
