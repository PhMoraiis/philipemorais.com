import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import colorspaceName from "@/assets/colorspace/name.svg";
import jumpieName from "@/assets/jumpie/name.svg";
import oncineName from "@/assets/oncine/name.svg";
import stellarLogo from "@/assets/stellar/logoStellar.svg";
import stellarName from "@/assets/stellar/name.svg";
import { BackToHomeLink } from "@/components/ui/back-to-home-link";
import { ColorspaceAnimatedBackground } from "@/components/ui/colorspace-animated-background";
import {
  NextJSName,
  NodeJS,
  Prisma,
  React as ReactLogo,
  Tailwind,
} from "@/components/ui/logos";
import { OncineAnimatedBackground } from "@/components/ui/oncine-animated-background";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

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
    return { title: "Projeto não encontrado" };
  }

  return {
    title: `${project.title} — Philipe Morais`,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Philipe Morais`,
      description: project.description,
      type: "website",
      url: absoluteUrl(`/work/${project.slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Philipe Morais`,
      description: project.description,
    },
  };
}

const techLogoMap: Record<
  string,
  { component: React.ComponentType<{ className?: string }>; className: string }
> = {
  "Next.js": { component: NextJSName, className: "h-5 w-auto opacity-70" },
  React: { component: ReactLogo, className: "h-8 w-auto opacity-70" },
  Tailwind: { component: Tailwind, className: "h-6 w-auto opacity-70" },
  "Node.js": { component: NodeJS, className: "h-8 w-auto opacity-70" },
  Prisma: { component: Prisma, className: "h-10 w-auto opacity-70" },
};

function ProjectLogo({ slug }: { slug: string }) {
  if (slug === "stellar") {
    return (
      <div className="flex items-center gap-3">
        <Image src={stellarLogo} alt="Stellar" className="h-12 w-auto" />
        <Image src={stellarName} alt="Stellar Studio" className="h-4 w-auto" />
      </div>
    );
  }
  if (slug === "oncine") {
    return <Image src={oncineName} alt="OnCine" className="h-12 w-auto" />;
  }
  if (slug === "jumpie") {
    return (
      <div className="flex items-center gap-3">
        <Image src={jumpieName} alt="Jumpie" className="h-16 w-auto" />
      </div>
    );
  }
  if (slug === "colorspace") {
    return (
      <Image
        src={colorspaceName}
        alt="ColorSpace"
        className="h-12 w-auto brightness-0"
      />
    );
  }
  return null;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const techLogos = project.stack.filter((t) => techLogoMap[t]);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.headline,
    description: project.description,
    url: absoluteUrl(`/work/${project.slug}`),
    inLanguage: "pt-BR",
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    ...(project.website ? { sameAs: project.website } : {}),
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteUrl,
    },
  };

  return (
    <main
      className={`relative min-h-screen ${project.textClassName}`}
      style={{ background: project.background }}
    >
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático controlado
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {project.slug === "oncine" ? <OncineAnimatedBackground /> : null}
      {project.slug === "colorspace" ? <ColorspaceAnimatedBackground /> : null}

      <div className="relative mx-auto max-w-4xl px-6 py-10 md:py-16">
        {/* Back link */}
        <BackToHomeLink />

        {/* Two-column layout */}
        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
          {/* LEFT — logo, headline, stack */}
          <div className="space-y-8">
            <ProjectLogo slug={project.slug} />

            {/* Headline */}
            {project.website ? (
              <Link
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
                aria-label={`Acessar ${project.title}`}
              >
                <h1 className="font-bethany text-4xl leading-tight md:text-[44px]">
                  <span className="bg-bottom-left bg-linear-to-r bg-size-[0%_2px] from-current to-current bg-no-repeat transition-[background-size] duration-300 group-hover:bg-size-[100%_2px]">
                    {project.headline}
                  </span>
                  <span className="ml-2 inline-flex translate-y-[-2px] items-center align-middle">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs opacity-50 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </span>
                </h1>
              </Link>
            ) : (
              <h1 className="font-bethany text-4xl leading-tight md:text-[44px]">
                {project.headline}
              </h1>
            )}

            {/* Technologies */}
            {techLogos.length > 0 && (
              <div className="space-y-3">
                <p className="font-dmsans text-xs uppercase tracking-[0.18em] opacity-50">
                  Tecnologias Utilizadas
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  {techLogos.map((tech) => {
                    const { component: Logo, className } = techLogoMap[tech];
                    return <Logo key={tech} className={className} />;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — paragraphs */}
          <div className="space-y-5 pt-1">
            {project.paragraphs.map((p) => (
              <p key={p} className="font-dmsans text-md leading-7 opacity-75">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
