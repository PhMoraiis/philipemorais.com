"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { GoArrowLeft } from "react-icons/go";

type BackToHomeLinkProps = {
  className?: string;
};

export function BackToHomeLink({ className }: BackToHomeLinkProps) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.setItem("skip_home_reveal", "1");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{ display: "inline-flex", transformOrigin: "center" }}
    >
      <Link
        href="/"
        transitionTypes={["nav-back"]}
        onClick={handleClick}
        aria-label="Voltar para home"
        className="group inline-flex size-10 items-center justify-center rounded-full text-current transition-colors hover:cursor-pointer hover:bg-current"
      >
        <GoArrowLeft className="size-6 transition-[filter] group-hover:invert" />
      </Link>
    </motion.div>
  );
}
