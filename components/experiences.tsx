import { HBR, Place, Sarah, Stellar } from "./ui/logos";
import { Reveal } from "./ui/reveal";

export const Experiences = () => {
  const experiences = [
    {
      id: 1,
      icon: <Stellar className="size-8" />,
      company: "Stellar Studio",
      position: "Founder & CEO",
      period: "2024 - Atualmente",
      description:
        "Construí um estúdio de tecnologia especializado em desenvolvimento de software e estratégia de social media. Liderei 10+ projetos end-to-end usando React, NextJS e NodeJS, entregando aplicações escaláveis para clientes dos setores financeiro, saúde e retail.",
    },
    {
      id: 2,
      icon: <HBR className="size-9" />,
      company: "Intituto Hardware BR",
      position: "Estagiário de Engenharia de Software",
      period: "Atualmente",
      description:
        "Desenvolvimento de interface para tomógrafo computadorizado, sistema embarcado com React, Styled Components, Electron e integração com Ruby on Rails. Com foco na experiência do usuário em ambiente médico.",
    },
    {
      id: 3,
      icon: <Sarah className="size-8" />,
      company: "Rede SARAH de Hospitais de Reabilitação",
      position: "Estagiário de Desenvolvimento de Software",
      period: "2024 - 2025",
      description:
        "Desenvolvimento full-stack com React, NextJS, NodeJS e Tauri. Arquitetei plataforma Cruz para automação de processamento de dados internos, reduzindo tempo de operação manual. Implementei suite completa de testes E2E com Playwright, garantindo alta qualidade e confiabilidade do sistema.",
    },
    {
      id: 4,
      icon: <Place className="size-8" />,
      company: "Place Tecnologia e Inovação",
      position: "Estagiário de Desenvolvimento de Software",
      period: "2023 - 2024",
      description:
        "Desenvolvimento full-stack em Liferay DXP, Java e ReactJS. Participei do ciclo completo de projetos enterprise. Obtive expertise em metodologias ágeis (Scrum, Kanban), descoberta e elicitação de requisitos e resolução de problemas complexos.",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-6">
      <Reveal>
        <h2 className="font-bethany text-2xl text-foreground dark:text-zinc-50">
          Experiências
        </h2>
      </Reveal>
      <div className="mt-10 flex flex-col items-start justify-center gap-12 pr-2">
        {experiences.map((exp, index) => (
          <Reveal key={exp.id} index={index + 1}>
            <div className="flex items-start gap-10">
              <div className="flex items-center">{exp.icon}</div>
              <div className="flex flex-col items-start justify-center">
                <h3 className="font-bethany text-foreground text-lg dark:text-zinc-50">
                  {exp.company}
                </h3>
                <h4 className="font-bethany text-foreground text-sm dark:text-zinc-50">
                  {exp.position}
                  <span className="px-1 text-foreground dark:text-gray-50">
                    •
                  </span>
                  {exp.period}
                </h4>
                <p className="mt-2 max-w-md font-dmsans text-sm text-zinc-600 md:text-md dark:text-zinc-200">
                  {exp.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
