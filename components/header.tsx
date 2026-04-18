import { Reveal } from "./ui/reveal";

type HeaderProps = {
  revealDelay?: number;
  revealDuration?: number;
};

export const Header = ({
  revealDelay = 0,
  revealDuration = 0.95,
}: HeaderProps) => {
  const texts = {
    name: "Philipe",
    lastName: "Morais",
    description:
      "Sou um desenvolvedor Front-end & UX/UI Designer que deseja contribuir para tornar a internet um lugar mais criativo, acessível e melhor.",
  };

  return (
    <header className="mx-auto max-w-4xl pt-8 md:pt-11">
      <div className="flex flex-col items-start justify-center">
        <Reveal delay={revealDelay} duration={revealDuration}>
          <h1 className="font-bethany text-4xl text-foreground leading-tight md:text-5xl dark:text-zinc-50">
            {texts.name}
            <br />
            {texts.lastName}
          </h1>
        </Reveal>
        <Reveal
          delay={revealDelay}
          duration={revealDuration}
          index={1}
          stagger={0.14}
        >
          <p className="mt-2 max-w-md font-dmsans text-base text-zinc-600 md:text-md dark:text-zinc-200">
            {texts.description}
          </p>
        </Reveal>
      </div>
    </header>
  );
};
