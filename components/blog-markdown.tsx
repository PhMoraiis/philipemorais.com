"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import UnderlineToBackground from "@/components/ui/underline-to-background";

type BlogMarkdownProps = {
  content: string;
};

export const BlogMarkdown = ({ content }: BlogMarkdownProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted && resolvedTheme === "dark";

  const markdownComponents: Components = {
    a: ({ children, ...props }) => (
      <UnderlineToBackground
        as="a"
        className="inline"
        targetTextColor={isDarkTheme ? "#e4e4e7" : "#333333"}
        {...props}
      >
        {children}
      </UnderlineToBackground>
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
};
