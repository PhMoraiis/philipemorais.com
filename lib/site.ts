const rawSiteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ?? "https://philipemorais.com";

// Normaliza removendo barra final para evitar URLs com "//" no sitemap/canonical.
export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "Philipe Morais",
  title: "Philipe Morais - Desenvolvedor Frontend & UX/UI Designer",
  description:
    "Desenvolvedor front-end que contribui para tornar a internet mais criativa, acessível e um lugar melhor. Especializado em React, Next.js, TypeScript e web design.",
  url: siteUrl,
  locale: "pt_BR",
  author: {
    name: "Philipe Morais",
    jobTitle: "Desenvolvedor Frontend & UX/UI Designer",
    email: "contato@philipemorais.com",
    sameAs: [
      "https://github.com/PhMoraiis",
      "https://www.linkedin.com/in/ph-morais",
      "https://www.instagram.com/philipemoraiis",
    ],
  },
} as const;

// URL absoluta a partir de um path relativo.
export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
