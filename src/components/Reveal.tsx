"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  /** Seconds of delay, for staggering siblings. */
  delay?: number;
  /** How far it travels, in px. Keep it small — this is punctuation. */
  distance?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

/**
 * The one entry animation used everywhere except the home hero.
 *
 * The hero earns a long, dramatic scroll sequence because it has to stop a
 * stranger. Everything after it should feel like the same hand without
 * competing: a short rise and fade, once, when the section arrives. Anything
 * more and the page starts performing instead of reading.
 *
 * Respects prefers-reduced-motion by rendering the final state immediately.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  distance = 18,
  className,
  as = "div",
}) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
