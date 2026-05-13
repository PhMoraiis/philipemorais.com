import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Philipe Morais - Desenvolvedor Frontend & UX/UI Designer",
  description:
    "Desenvolvedor front-end que contribui para tornar a internet mais criativa, acessível e um lugar melhor. Especializado em React, Next.js, TypeScript e web design.",
  keywords: [
    "frontend",
    "developer",
    "react",
    "next.js",
    "typescript",
    "web design",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Philipe Morais - Desenvolvedor Frontend & UX/UI Designer",
    description:
      "Desenvolvedor front-end que contribui para tornar a internet mais criativa, acessível e um lugar melhor.",
    type: "website",
    url: "https://philipemorais.com",
    siteName: "Philipe Morais",
    images: [
      {
        url: "https://philipemorais.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Philipe Morais - Desenvolvedor Frontend & UX/UI Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Philipe Morais - Desenvolvedor Frontend & UX/UI Designer",
    description:
      "Desenvolvedor front-end que contribui para tornar a internet mais criativa, acessível e um lugar melhor.",
    images: ["https://philipemorais.com/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
