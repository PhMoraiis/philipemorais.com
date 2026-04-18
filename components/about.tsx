"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ImgStack from "./ui/image-stack";
import { Reveal } from "./ui/reveal";
import UnderlineToBackground from "./ui/underline-to-background";

export const About = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted && resolvedTheme === "dark";
  const imageUrls = [
    {
      src: "/images/me1.jpeg",
      title: "Nice to Meet You",
      subtitle: "Esse sou eu!",
    },
    {
      src: "/images/bsb2.jpeg",
      title: "Esse céu é surreal!",
      subtitle: "Brasília, DF",
    },
    {
      src: "/images/me2.jpeg",
      title: "Mue hobbie favorito",
      subtitle: "Um grande fã da música",
    },
    {
      src: "/images/meandlove.png",
      title: "Minhas duas paixões",
      subtitle: "Minha namorada e o Vasco (ela é a mais importante)",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-6">
      <Reveal>
        <h2 className="font-bethany text-2xl text-foreground dark:text-zinc-50">
          Sobre Mim
        </h2>
      </Reveal>
      <div className="my-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-4">
          <Reveal index={1}>
            <p className="mt-2 max-w-md font-dmsans text-base text-zinc-600 md:text-md dark:text-zinc-200">
              Me chamo Philipe Morais, um desenvolvedor, designer e entusiasta
              de tecnologia. Atualmente sou estudante de Engenharia de Software
              na UnB e estagiário no Instituto Hardware BR. Mas estou sempre
              explorando as infinitas possibilidades da criatividade e da
              tecnologia.
            </p>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-2 max-w-md font-dmsans text-base text-zinc-600 md:text-md dark:text-zinc-200">
              Gosto de transformar ideias em realidade, seja criando interfaces
              digitais, prototipando experiências ou escrevendo código. Sou
              apaixonado por design e acredito que a tecnologia é uma ferramenta
              poderosa para contar histórias e criar grandes conexões.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-2 max-w-md font-dmsans text-base text-zinc-600 md:text-md dark:text-zinc-200">
              Sou fundador da{" "}
              <UnderlineToBackground
                targetTextColor={isDarkTheme ? "#e4e4e7" : "#333333"}
                className="cursor-pointer text-zinc-600 dark:text-zinc-200"
              >
                <a
                  href="https://stellarbr.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stellar Studio
                </a>
              </UnderlineToBackground>
              , um estúdio de tecnologia, especializado em desenvolvimento de
              software e estratégia de social media, combinando toda a minha
              criatividade e experiência para proporcionar soluções incríveis.
            </p>
          </Reveal>
        </div>
        <div className="flex items-center justify-center lg:translate-x-8 lg:justify-end">
          <ImgStack images={imageUrls} />
        </div>
      </div>
      <div className="max-w-xl">
        <Reveal index={4}>
          <h3 className="font-bethany text-[#F9581C] text-[38px]">
            Design não é apenas a aparência & a sensação. Design é como funciona
          </h3>
        </Reveal>
      </div>
    </section>
  );
};
