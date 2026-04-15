import type { Metadata } from "next";
import { Inter, Rammetto_One } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const rammettoOne = Rammetto_One({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        rammettoOne.className,
        inter.variable,
      )}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
