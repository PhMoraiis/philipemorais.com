export type Project = {
  slug: "stellar" | "oncine" | "jumpie" | "colorspace";
  title: string;
  headline: string;
  description: string;
  year: string;
  status: string;
  background: string;
  textClassName: string;
  website?: string;
  stack: string[];
};

export const projects: readonly Project[] = [
  {
    slug: "stellar",
    title: "Stellar Studio",
    headline: "Estudio digital com foco em software e social media.",
    description:
      "Site institucional da Stellar Studio pensado para apresentar servicos, reforcar autoridade e converter leads de forma clara.",
    year: "2025",
    status: "Online",
    background: "linear-gradient(180deg, #FF6D1F 0%, #FF8949 100%)",
    textClassName: "text-black",
    website: "https://stellarbr.studio",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    slug: "oncine",
    title: "OnCine",
    headline: "Gestao de assinaturas e pagamentos recorrentes.",
    description:
      "Produto em desenvolvimento para monitorar assinaturas, centralizar cobrancas e simplificar o controle financeiro mensal.",
    year: "2026",
    status: "Em desenvolvimento",
    background: "#1F1F1F",
    textClassName: "text-white",
    stack: ["React", "TypeScript", "Node.js"],
  },
  {
    slug: "jumpie",
    title: "Jumpie",
    headline: "Experiencia de marca com linguagem visual ludica.",
    description:
      "Landing page desenhada para comunicar produto e personalidade com narrativa visual forte e interacoes leves.",
    year: "2025",
    status: "Online",
    background: "#6DACDF",
    textClassName: "text-white",
    stack: ["Next.js", "Motion", "Tailwind"],
  },
  {
    slug: "colorspace",
    title: "ColorSpace",
    headline: "Ferramenta para conversao de cores com precisao.",
    description:
      "Aplicacao utilitaria para designers e devs converterem entre espacos de cor de forma rapida e confiavel.",
    year: "2024",
    status: "Online",
    background: "#282829",
    textClassName: "text-[#333333]",
    stack: ["TypeScript", "Design Systems", "UI Engineering"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug);
}
