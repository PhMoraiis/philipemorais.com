import type { ReactNode } from "react";
import { PageTransition } from "@/components/ui/page-transition";

type WorkLayoutProps = {
  children: ReactNode;
};

export default function WorkLayout({ children }: WorkLayoutProps) {
  return <PageTransition>{children}</PageTransition>;
}
