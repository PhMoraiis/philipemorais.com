import { type ReactNode, ViewTransition } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "route-forward",
        "nav-back": "route-back",
        default: "route-fade",
      }}
      exit={{
        "nav-forward": "route-forward",
        "nav-back": "route-back",
        default: "route-fade",
      }}
      default="route-fade"
    >
      {children}
    </ViewTransition>
  );
}
