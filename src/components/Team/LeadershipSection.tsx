"use client";
import Image from "next/image";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

import LeadershipBullet from "./LeadershipBullet";
import SectionTitle from "../SectionTitle";
import { ILeadership } from "@/types";

interface Props {
  leadership: ILeadership;
  imageAtRight?: boolean;
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

const LeadershipSection: React.FC<Props> = ({
  leadership,
  imageAtRight,
}: Props) => {
  const { title, description, imageSrc, bullets } = leadership;

  return (
    <section className="leadership-section">
      <motion.div
        className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <div
          className={clsx("w-full lg:w-fit flex", {
            "justify-center lg:justify-start": imageAtRight,
            "justify-center lg:justify-end": !imageAtRight,
            "order-first lg:order-2": imageAtRight,
            "order-first lg:order-none": !imageAtRight,
          })}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={544}
            height={722}
            quality={100}
            className="lg:ml-0 shadow-xl/20 rounded-lg max-w-full"
          />
        </div>

        <div
          className={clsx("flex flex-wrap items-center w-full max-w-lg", {
            "justify-center lg:justify-start": imageAtRight,
            "justify-center lg:justify-end": !imageAtRight,
            "order-last lg:order-1": imageAtRight,
            "order-last lg:order-none": !imageAtRight,
          })}
        >
          <div className="w-full text-left ">
            <motion.div
              className="flex flex-col w-full"
              variants={childVariants}
            >
              <SectionTitle>
                <h3 className="text-4xl md:text-5xl lg:text-6xl md:leading-tight font-black text-[#991212] max-w-lg md:max-w-2xl  lg:mx-0">
                  {title}
                </h3>
              </SectionTitle>

              <p className="mt-1.5 leading-normal text-foreground-accent">
                {description}
              </p>
            </motion.div>
            <div className="w-full mx-auto lg:mx-0">
              {bullets.map((item, index) => (
                <LeadershipBullet
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LeadershipSection;
