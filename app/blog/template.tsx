import type { ReactNode } from "react";
import { PageTransition } from "@/components/ui/page-transition";

type BlogTemplateProps = {
  children: ReactNode;
};

export default function BlogTemplate({ children }: BlogTemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
