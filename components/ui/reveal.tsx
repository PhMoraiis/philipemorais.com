"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
  stagger?: number;
  y?: number;
  blur?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
};

export const Reveal = ({
  children,
  className,
  delay = 0,
  index = 0,
  stagger = 0.08,
  y = 28,
  blur = 3,
  duration = 0.75,
  amount = 0.25,
  once = true,
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.2,
            delay: delay + index * stagger,
          },
        },
      }
    : {
        hidden: {
          opacity: 0,
          y,
          filter: `blur(${blur}px)`,
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * stagger,
          },
        },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};
