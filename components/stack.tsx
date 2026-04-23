import { Reveal } from "./ui/reveal";

export const Stack = () => {
  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-6">
      <Reveal>
        <h2 className="font-bethany text-2xl text-primary dark:text-zinc-50">
          Stack
        </h2>
      </Reveal>
      <div className="mt-6 flex max-w-4xl items-start gap-24 text-primary">
        <Reveal index={1}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bethany text-lg">Linguagens</h2>
            <ul className="flex flex-col gap-1 font-light text-md">
              <li>C/C++</li>
              <li>HTML & CSS</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>SQL</li>
              <li>Swift</li>
            </ul>
          </div>
        </Reveal>
        <Reveal index={2}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bethany text-lg">Frameworks</h2>
            <ul className="flex flex-col gap-1 font-light text-md">
              <li>React</li>
              <li>Next JS</li>
              <li>Astro</li>
              <li>Tailwind</li>
              <li>Fastify</li>
              <li>Elysia</li>
            </ul>
          </div>
        </Reveal>
        <Reveal index={3}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bethany text-lg">Techs</h2>
            <ul className="flex flex-col gap-1 font-light text-md">
              <li>Git</li>
              <li>Docker</li>
              <li>Copilot/Claude Code</li>
              <li>Framer Motion</li>
              <li>GSAP</li>
            </ul>
          </div>
        </Reveal>
        <Reveal index={4}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bethany text-lg">Principais Ferramentas</h2>
            <ul className="flex flex-col gap-1 font-light text-md">
              <li>VS Code</li>
              <li>Figma</li>
              <li>GitHub/Bitbucket</li>
              <li>Notion</li>
              <li>Dia</li>
              <li>Jira</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
