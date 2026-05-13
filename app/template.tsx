import type { ReactNode } from "react";
import { PageTransition } from "@/components/ui/page-transition";

type TemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: TemplateProps) {
  return (
    <PageTransition>
      <div>{children}</div>
    </PageTransition>
  );
}
