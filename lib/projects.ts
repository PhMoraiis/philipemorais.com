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
    headline: "Estudio digital com foco em software e social media.",
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
    headline: "Gestao de assinaturas e pagamentos recorrentes.",
    description:
      "Produto em desenvolvimento para monitorar assinaturas, centralizar cobrancas e simplificar o controle financeiro mensal.",
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
    headline: "Experiencia de marca com linguagem visual ludica.",
    description:
      "Landing page desenhada para comunicar produto e personalidade com narrativa visual forte e interacoes leves.",
    paragraphs: [
      "O Jumpie é um SaaS de gerenciamento de indicações com uma camada de gamificação por cima. A ideia é transformar o processo de referral normalmente invisível e passivo, em algo que os usuários querem participar ativamente, com progressão, recompensas e senso de conquista.",
      // "A landing page foi pensada para comunicar essa personalidade antes mesmo do usuário entender o produto por completo. A linguagem visual é leve e direta, com microinterações que reforçam a proposta sem explicar demais. Energia de produto, não de SaaS genérico.",
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
    headline: "Ferramenta para conversao de cores com precisao.",
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
