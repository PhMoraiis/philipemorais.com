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
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "bg-background", dmSans.className)}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
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
