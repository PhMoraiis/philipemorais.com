"use client";

import { motion } from "motion/react";

export function OncineAnimatedBackground() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      animate={{
        background: [
          "linear-gradient(135deg, #1F1F1F 0%, #3a3a3a 50%, #1F1F1F 100%)",
          "linear-gradient(135deg, #2e2e2e 0%, #4a4a4a 50%, #252525 100%)",
          "linear-gradient(135deg, #1a1a1a 0%, #383838 50%, #2a2a2a 100%)",
          "linear-gradient(135deg, #1F1F1F 0%, #3a3a3a 50%, #1F1F1F 100%)",
        ],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}
