import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { BackToHomeLink } from "@/components/ui/back-to-home-link";
import {
  Astro,
  Figma,
  NextJS,
  NodeJS,
  React as ReactLogo,
  Tailwind,
  Typescript,
} from "@/components/ui/logos";
import { OncineAnimatedBackground } from "@/components/ui/oncine-animated-background";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

type TechLogoProps = {
  tech: string;
  className?: string;
};

function TechLogo({ tech, className = "w-8 h-8" }: TechLogoProps) {
  const logoMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "Next.js": NextJS,
    React: ReactLogo,
    TypeScript: Typescript,
    Tailwind: Tailwind,
    "Node.js": NodeJS,
    Motion: () => null,
    "Design Systems": () => null,
    "UI Engineering": () => null,
  };

  const Logo = logoMap[tech];
  if (!Logo) return null;

  return (
    <div
      title={tech}
      className="flex items-center justify-center rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800"
    >
      <Logo className={className} />
    </div>
  );
}

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto nao encontrado" };
  }

  return {
    title: `${project.title} | Projeto`,
    description: project.description,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectParagraphsBySlug: Record<string, string[]> = {
    stellar: [
      project.description,
      "A proposta desta pagina e comunicar valor de forma direta, com narrativa clara e direcao visual forte para reforcar posicionamento de marca.",
      "A estrutura prioriza leitura rapida, hierarquia tipografica e uma experiencia consistente entre desktop e mobile.",
    ],
    oncine: [
      project.description,
      "No OnCine, o foco da experiencia e simplificar o controle de assinaturas recorrentes com feedback visual claro e uma interface objetiva.",
      "A identidade visual usa contraste e ritmo para evidenciar informacoes importantes e apoiar decisoes do usuario no dia a dia.",
    ],
    jumpie: [
      project.description,
      "Este projeto combina linguagem ludica com fundamentos de UX para transformar comunicacao de produto em uma experiencia memoravel.",
      "As decisoes de layout e microinteracoes foram pensadas para equilibrar personalidade visual e entendimento rapido da proposta.",
    ],
    colorspace: [
      project.description,
      "No ColorSpace, a prioridade foi criar um fluxo simples e confiavel para conversao de cores, reduzindo friccao em tarefas tecnicas.",
      "A interface foi desenhada para manter precisao e clareza, com foco em legibilidade e contexto para designers e devs.",
    ],
  };

  const projectParagraphs = projectParagraphsBySlug[project.slug] ?? [
    project.description,
  ];

  const hasLogos = project.stack.some((tech) =>
    ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"].includes(tech),
  );

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden px-6 py-10 md:py-14"
      style={{ background: project.background }}
    >
      {project.slug === "oncine" ? <OncineAnimatedBackground /> : null}

      <div className="relative z-10 mx-auto max-w-5xl">
        <BackToHomeLink className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* Project Card */}
          <ViewTransition
            name={`project-card-${project.slug}`}
            share="project-card-morph"
          >
            <div
              className={`sticky top-10 h-96 w-full overflow-hidden rounded-lg ${project.textClassName}`}
              style={{ background: project.background }}
            >
              <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 space-y-3 p-6">
                <p className="font-dmsans text-xs uppercase tracking-[0.2em] opacity-80">
                  {project.year}
                </p>
                <h1 className="font-bethany text-4xl leading-tight">
                  {project.title}
                </h1>
              </div>
            </div>
          </ViewTransition>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Header Section */}
            <div>
              <p className="font-dmsans text-xs text-zinc-500 uppercase tracking-[0.2em] dark:text-zinc-400">
                {project.status}
              </p>
              <h2 className="mt-3 font-bethany text-4xl text-foreground leading-tight md:text-5xl dark:text-zinc-50">
                {project.headline}
              </h2>
            </div>

            {/* Stack Section */}
            {hasLogos && (
              <div className="space-y-3">
                <p className="font-dmsans text-xs text-zinc-600 uppercase tracking-[0.2em] dark:text-zinc-400">
                  Tecnologias
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => {
                    if (
                      ![
                        "Next.js",
                        "React",
                        "TypeScript",
                        "Tailwind",
                        "Node.js",
                      ].includes(tech)
                    ) {
                      return null;
                    }
                    return (
                      <TechLogo key={tech} tech={tech} className="h-6 w-6" />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other Stack Items */}
            {project.stack.some(
              (tech) =>
                ![
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind",
                  "Node.js",
                ].includes(tech),
            ) && (
              <div className="space-y-3">
                <p className="font-dmsans text-xs text-zinc-600 uppercase tracking-[0.2em] dark:text-zinc-400">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack
                    .filter(
                      (tech) =>
                        ![
                          "Next.js",
                          "React",
                          "TypeScript",
                          "Tailwind",
                          "Node.js",
                        ].includes(tech),
                    )
                    .map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-zinc-300 px-3 py-1 font-dmsans text-xs text-zinc-700 uppercase tracking-[0.16em] dark:border-zinc-700 dark:text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {project.website ? (
              <Link
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 font-dmsans font-medium text-sm text-zinc-50 transition-all hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Acessar projeto
              </Link>
            ) : null}

            {/* Description */}
            <div className="space-y-4 border-zinc-200 border-t pt-8 dark:border-zinc-800">
              {projectParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-2xl font-dmsans text-sm text-zinc-600 leading-7 dark:text-zinc-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
