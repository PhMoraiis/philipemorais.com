import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  time: number;
  theme: string;
  description: string;
  date: string;
};

export type Post = PostMeta & {
  content: string;
};

const postsDir = path.join(process.cwd(), "content");

function listPostFiles(): string[] {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((filename) => filename.endsWith(".md"));
}

function readPostFile(filename: string): Post {
  const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
  const { data, content } = matter(raw);
  const fallbackSlug = filename.replace(/\.md$/, "");

  return {
    slug: String(data.slug ?? fallbackSlug),
    title: String(data.title ?? fallbackSlug),
    time: Number(data.time ?? 0),
    theme: String(data.theme ?? "default"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    content,
  };
}

export function getRecentPosts(limit = 3): PostMeta[] {
  return listPostFiles()
    .map((filename) => readPostFile(filename))
    .map(({ slug, title, description, date, time, theme }) => ({
      slug,
      title,
      description,
      date,
      time,
      theme,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return listPostFiles().map((filename) => readPostFile(filename).slug);
}

export function getPostBySlug(slug: string): Post | null {
  const post = listPostFiles()
    .map((filename) => readPostFile(filename))
    .find((item) => item.slug === slug);

  return post ?? null;
}
