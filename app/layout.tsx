import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Philipe Morais - Frontend Developer",
  description:
    "Frontend developer helping the internet be more creative, accessible, and a better place. Specializing in React, TypeScript, and web design.",
  keywords: ["frontend", "developer", "react", "typescript", "web design"],
  openGraph: {
    title: "Philipe Morais - Frontend Developer",
    description:
      "Frontend developer helping the internet be more creative, accessible, and a better place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "dark", dmSans.className)}>
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-zinc-900">
        {children}
      </body>
    </html>
  );
}
