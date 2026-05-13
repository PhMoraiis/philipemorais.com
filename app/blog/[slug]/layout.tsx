import type { ReactNode } from "react";
import { PageTransition } from "@/components/ui/page-transition";

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <PageTransition>{children}</PageTransition>;
}
