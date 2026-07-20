export type Project = {
  slug: "stellar" | "oncine" | "jumpie" | "colorspace";
  title: string;
  headline: string;
  description: string;
  paragraphs: string[];
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
    headline: "Estúdio digital com foco em software e social media.",
    description:
      "Site institucional da Stellar Studio pensado para apresentar servicos, reforcar autoridade e converter leads de forma clara.",
    paragraphs: [
      "A Stellar Studio nasceu da vontade de construir software com identidade, produtos que comunicam bem antes mesmo de serem usados. O site institucional foi o primeiro projeto assinado pelo estúdio, e precisava refletir exatamente isso: posicionamento claro, narrativa direta e direção visual consistente.",
      "A estrutura foi desenhada para converter sem pressionar. Cada seção conduz o visitante naturalmente até o contato, com hierarquia tipográfica que funciona tanto no desktop quanto no mobile. Menos decoração, mais intenção.",
    ],
    year: "2025",
    status: "Online",
    background: "linear-gradient(180deg, #FF6D1F 0%, #FF8949 100%)",
    textClassName: "text-black",
    website: "https://stellarbr.studio",
    stack: ["Next.js", "Tailwind"],
  },
  {
    slug: "oncine",
    title: "OnCine",
    headline: "Horários de cinema em tempo real, com sessões planejadas.",
    description:
      "Produto em desenvolvimento que centraliza os horários da rede CineFlix em tempo real e planeja sessões consecutivas em poucos toques.",
    paragraphs: [
      "O OnCine resolve uma frustração real de quem frequenta cinema: descobrir os horários certos, encaixar sessões consecutivas e nunca perder a cena de abertura por ter chegado tarde. O OnCine centraliza listagens em tempo real de todos os cinemas da rede CineFlix e entrega planejamento inteligente em poucos toques.",
      "Contruí o OnCine do zero, da arquitetura de dados à interface. O foco da experiência é reduzir o atrito entre a vontade de ir ao cinema e a decisão de comprar o ingresso, com recomendações que se adaptam ao contexto do usuário.",
    ],
    year: "2026",
    status: "Em desenvolvimento",
    background: "#1F1F1F",
    textClassName: "text-white",
    website: "https://oncine.philipemorais.com",
    stack: ["React", "Prisma", "Node.js"],
  },
  {
    slug: "jumpie",
    title: "Jumpie",
    headline: "Campanhas de indicação gamificadas para qualquer negócio.",
    description:
      "Plataforma SaaS que transforma indicações em campanhas gamificadas — via iframe, QR Code ou link — com metas, recompensas e ranking em tempo real.",
    paragraphs: [
      "O Jumpie é uma plataforma SaaS de gerenciamento de indicações com uma camada de gamificação por cima. A ideia é transformar o referral, normalmente invisível e passivo, em algo que as pessoas querem participar ativamente, com progressão por metas, recompensas e senso de conquista.",
      "Qualquer negócio, digital ou físico, cria uma campanha e a distribui por iframe, QR Code ou link direto. O indicador se cadastra, recebe um link e um QR Code únicos e avança por milestones que liberam recompensas. Pensado para o mercado brasileiro e LATAM, entrega um programa de indicação plugável em minutos, sem precisar construir rastreamento, pontuação e anti-fraude do zero.",
    ],
    year: "2025",
    status: "Online",
    background: "#6DACDF",
    textClassName: "text-white",
    stack: ["Next.js", "Motion", "Tailwind"],
  },
  {
    slug: "colorspace",
    title: "ColorSpace",
    headline: "Ferramenta para conversão de cores com precisão.",
    description:
      "Aplicacao utilitaria para designers e devs converterem entre espacos de cor de forma rapida e confiavel.",
    paragraphs: [
      "O ColorSpace nasceu da adoção crescente do OKLCH no ecossistema do Tailwind e Shadcn/UI, e da ausência de uma ferramenta que tratasse essa conversão com a seriedade que merece. Projetei para quem quer resultado rápido e preciso, sem precisar entender a matemática por trás.",
      "A interface entrega controle real: sliders para Lightness, Chroma e Hue, conversão simultânea para HEX, RGB e HSL, e cópia com um clique. Simples na superfície, correto por baixo.",
    ],
    year: "2024",
    status: "Online",
    background:
      "linear-gradient(135deg, #fbc4a0 0%, #d8b4fe 35%, #a5f3fc 65%, #bbf7d0 100%)",
    textClassName: "text-zinc-800",
    website: "https://colorspace.philipemorais.com",
    stack: ["Next.js", "Tailwind", "Culori"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug);
}
