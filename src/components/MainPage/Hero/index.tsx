"use client";
"";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Ripple } from "@/components/magicui/ripple";
const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <Skeleton className="w-full h-96 mt-20" />;
  }

  const buttonList = [
    {
      id: 1,
      href: "https://www.linkedin.com/in/ph-morais",
      icon: <FaLinkedin size={22} />,
    },
    {
      id: 2,
      href: "https://www.github.com/PhMoraiis",
      icon: <FaGithub size={22} />,
    },
    {
      id: 3,
      href: "https://www.instagram.com/philipemoraiis",
      icon: <RiInstagramFill size={22} />,
    },
    {
      id: 4,
      href: "https://www.instagram.com/philipemoraiis",
      icon: <FaDev size={22} />,
    },
  ];

  return (
    <section className="flex gap-6 justify-center flex-col lg:flex-row md:flex-row">
      <div className="flex flex-col items-start justify-between p-12 shadow-sm rounded-xl bg-[radial-gradient(circle_at_120%_30%,#fef3c7_05%,transparent_50%),radial-gradient(circle_at_90%_70%,#d1fae5_05%,#f0f0f0_50%)] dark:bg-[radial-gradient(circle_at_90%_50%,#CD5D26_8%,transparent_50%),radial-gradient(circle_at_160%_50%,#EEBB93_8%,#151515_50%)] lg:w-full md:w-3/4 min-h-[850px]">
        <div className="flex flex-col items-start gap-4 md:gap-6 md:max-w-sm lg:gap-8 lg:max-w-full text-card-foreground">
          <div className="max-w-sm lg:max-w-3xl">
            <h1 className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-7xl">
              {/* {t("title")} */}
            </h1>
            <span className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-7xl">
              {" "}
              a front-end developer & ux/ui designer
            </span>
          </div>
          <p className="max-w-md font-RelativeBk lg:max-w-lg lg:text-lg">
            {/* {t("paragraph")} */}
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button className="bg-foreground hover:bg-foreground/85 dark:hover:bg-foreground/90 text-background text-sm rounded-full h-13 px-7 py-4">
            {/* {t("buttonText")} */}
          </Button>
          {buttonList.map((button) => (
            <Link key={button.id} href={button.href}>
              <motion.button
                className="h-10 px-4 py-6 bg-background text-foreground hover:bg-card rounded-[100%] flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 17,
                  bounce: 1,
                }}
              >
                {button.icon}
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative lg:flex md:flex items-center justify-center min-h-[850px] p-10 shadow-sm rounded-xl text-primary-foreground lg:w-1/2 md:w-2/4 overflow-hidden">
        {/* Fundo com overlay sutil */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/images/hero.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* Ripple com opacidade ajustada */}
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <Ripple
            mainCircleSize={180}
            mainCircleOpacity={0.25}
            numCircles={8}
            className="opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
