"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { Button } from "./ui/button";

export const SocialLinks = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl md:pt-8">
      <ul className="flex items-center gap-4">
        <li>
          <Button
            className="hover:cursor-pointer"
            variant="ghost"
            size="icon-lg"
            onClick={() =>
              handleLinkClick("https://www.linkedin.com/in/ph-morais")
            }
          >
            <FaLinkedinIn className="size-6" />
          </Button>
        </li>
        <li>
          <Button
            className="hover:cursor-pointer"
            variant="ghost"
            size="icon-lg"
            onClick={() => handleLinkClick("mailto:contato@philipemorais.com")}
          >
            <TfiEmail className="size-6" />
          </Button>
        </li>
        <li>
          <Button
            className="hover:cursor-pointer"
            variant="ghost"
            size="icon-lg"
            onClick={() => handleLinkClick("https://github.com/PhMoraiis")}
          >
            <FaGithub className="size-6" />
          </Button>
        </li>
        <li>
          <Button
            className="hover:cursor-pointer"
            variant="ghost"
            size="icon-lg"
            onClick={() =>
              handleLinkClick("https://www.instagram.com/philipemoraiis")
            }
          >
            <SlSocialInstagram className="size-6" />
          </Button>
        </li>
      </ul>
    </div>
  );
};
