"use client";

import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { Button } from "./ui/button";
import { Reveal } from "./ui/reveal";

type SocialLinksProps = {
  revealDelay?: number;
  revealDuration?: number;
};

export const SocialLinks = ({
  revealDelay = 0,
  revealDuration = 0.95,
}: SocialLinksProps) => {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl pt-4 md:pt-8">
      <Reveal delay={revealDelay} duration={revealDuration}>
        <ul className="flex items-center gap-2">
          <li>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                className=""
                variant="ghost"
                size="icon-links"
                onClick={() =>
                  handleLinkClick("https://www.linkedin.com/in/ph-morais")
                }
              >
                <FaLinkedinIn className="size-6" />
              </Button>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon-links"
                onClick={() =>
                  handleLinkClick("mailto:contato@philipemorais.com")
                }
              >
                <TfiEmail className="size-6" />
              </Button>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon-links"
                onClick={() => handleLinkClick("https://github.com/PhMoraiis")}
              >
                <FaGithub className="size-6" />
              </Button>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon-links"
                onClick={() =>
                  handleLinkClick("https://www.instagram.com/philipemoraiis")
                }
              >
                <FiInstagram className="size-6" />
              </Button>
            </motion.div>
          </li>
        </ul>
      </Reveal>
    </div>
  );
};
