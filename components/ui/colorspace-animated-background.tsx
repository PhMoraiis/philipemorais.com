"use client";

import { motion } from "motion/react";

const blobs = [
  {
    color: "#fbc4a0", // peach
    initial: { x: "-20%", y: "-20%", scale: 1 },
    animate: {
      x: ["-20%", "10%", "-10%", "20%", "-20%"],
      y: ["-20%", "15%", "-15%", "5%", "-20%"],
      scale: [1, 1.2, 0.9, 1.1, 1],
    },
    duration: 14,
  },
  {
    color: "#d8b4fe", // lavender
    initial: { x: "60%", y: "-10%", scale: 1 },
    animate: {
      x: ["60%", "30%", "70%", "40%", "60%"],
      y: ["-10%", "20%", "-5%", "25%", "-10%"],
      scale: [1, 0.85, 1.15, 0.95, 1],
    },
    duration: 18,
  },
  {
    color: "#a5f3fc", // sky
    initial: { x: "10%", y: "50%", scale: 1 },
    animate: {
      x: ["10%", "50%", "5%", "40%", "10%"],
      y: ["50%", "20%", "60%", "30%", "50%"],
      scale: [1, 1.1, 0.9, 1.2, 1],
    },
    duration: 16,
  },
  {
    color: "#bbf7d0", // mint
    initial: { x: "70%", y: "60%", scale: 1 },
    animate: {
      x: ["70%", "40%", "80%", "50%", "70%"],
      y: ["60%", "80%", "40%", "70%", "60%"],
      scale: [1, 1.15, 0.85, 1.05, 1],
    },
    duration: 20,
  },
  {
    color: "#fbcfe8", // rose
    initial: { x: "40%", y: "20%", scale: 1 },
    animate: {
      x: ["40%", "70%", "20%", "60%", "40%"],
      y: ["20%", "50%", "10%", "40%", "20%"],
      scale: [1, 0.9, 1.2, 0.95, 1],
    },
    duration: 12,
  },
  {
    color: "#fef08a", // lemon
    initial: { x: "80%", y: "30%", scale: 1 },
    animate: {
      x: ["80%", "55%", "90%", "60%", "80%"],
      y: ["30%", "60%", "15%", "50%", "30%"],
      scale: [1, 1.1, 0.9, 1.15, 1],
    },
    duration: 22,
  },
];

export function ColorspaceAnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#f8f8f8" }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          className="absolute h-[55%] w-[55%] rounded-full"
          style={{
            background: blob.color,
            filter: "blur(80px)",
            opacity: 0.55,
            left: 0,
            top: 0,
          }}
          initial={blob.initial}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
}
