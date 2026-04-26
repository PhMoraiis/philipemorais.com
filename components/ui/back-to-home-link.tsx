"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

type BackToHomeLinkProps = {
  className?: string;
};

export function BackToHomeLink({ className }: BackToHomeLinkProps) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.setItem("skip_home_reveal", "1");
  };

  return (
    <Link
      href="/"
      transitionTypes={["nav-back"]}
      onClick={handleClick}
      className={className}
    >
      <span aria-hidden="true">&larr;</span>
      Voltar
    </Link>
  );
}
