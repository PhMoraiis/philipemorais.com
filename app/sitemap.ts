import type { MetadataRoute } from "next";
import { getRecentPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = getRecentPosts(1000).map(
    (post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "yearly",
      priority: 0.7,
    }),
  );

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
