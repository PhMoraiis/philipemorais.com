"use client";
import { motion } from "motion/react";
import React from "react";

export default function ColourfulText({ text }: { text: string }) {
  const colors = [
    "rgb(186, 255, 201)",
    "rgb(186, 225, 255)",
    "rgb(201, 186, 255)",
    "rgb(255, 186, 255)",
    "rgb(255, 120, 140)",
    "rgb(255, 180, 120)",
    "rgb(255, 255, 140)",
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${
        // biome-ignore lint/suspicious/noArrayIndexKey: <ignore>
        index
      }`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block max-w-xs whitespace-pre font-whyte tracking-tight"
    >
      {char}
    </motion.span>
  ));
}
