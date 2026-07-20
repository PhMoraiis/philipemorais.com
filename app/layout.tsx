import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import ReactDOM from "react-dom";
import "./globals.css";
import { siteConfig, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  // Apenas os pesos usados nas classes (font-light/normal/medium/bold).
  weight: ["300", "400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s — Philipe Morais",
  },
  description: siteConfig.description,
  keywords: [
    "Philipe Morais",
    "desenvolvedor frontend",
    "frontend developer",
    "react",
    "next.js",
    "typescript",
    "web design",
    "ux/ui designer",
    "desenvolvedor front-end brasil",
  ],
  authors: [{ name: siteConfig.author.name, url: siteUrl }],
  creator: siteConfig.author.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.author.name,
      url: siteUrl,
      jobTitle: siteConfig.author.jobTitle,
      email: `mailto:${siteConfig.author.email}`,
      image: `${siteUrl}/opengraph-image`,
      sameAs: siteConfig.author.sameAs,
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Web Design",
        "UX/UI Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Preload da Bethany: fonte do <h1> (elemento LCP) na home.
  // ReactDOM.preload emite um único <link rel="preload"> içado no <head>.
  ReactDOM.preload("/fonts/BethanyElingston.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "bg-background", dmSans.className)}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full select-none flex-col"
      >
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático controlado
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
