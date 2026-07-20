import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { BlogMarkdown } from "@/components/blog-markdown";
import { Reveal } from "@/components/ui/reveal";
import { getAllPostSlugs, getPostBySlug, getRecentPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPostDate(dateValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${day} ${month}, ${year}`;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
    };
  }

  return {
    title: `${post.title} — Philipe Morais`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — Philipe Morais`,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: [post.theme],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Philipe Morais`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = getRecentPosts(3)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: `${siteUrl}/opengraph-image`,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteUrl,
    },
    articleSection: post.theme,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático controlado
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        <FaArrowLeft className="size-3.5 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100" />
        Voltar
      </Link>

      <article className="mt-6">
        <header className="flex flex-col items-start gap-2">
          <h1 className="mt-3 font-bethany text-2xl text-primary md:text-3xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <p className="blog-post-date">
              {formatPostDate(post.date)} • {post.time} min • {post.theme}
            </p>
          </div>
        </header>

        <section className="blog-post-content">
          <BlogMarkdown content={post.content} />
        </section>
      </article>

      {otherPosts.length > 0 ? (
        <section className="mt-16 border-zinc-200 border-t pt-10 dark:border-zinc-600">
          <h2 className="font-bethany text-2xl text-primary md:text-xl">
            Mais Artigos
          </h2>

          <div className="mt-6 flex flex-col items-start gap-6">
            {otherPosts.map((otherPost) => (
              <Reveal key={otherPost.slug}>
                <Link
                  className="flex flex-col items-start gap-2"
                  href={`/blog/${otherPost.slug}`}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-[0.18em] dark:text-zinc-400">
                    {formatPostDate(otherPost.date)}
                  </p>
                  <div>
                    <h3 className="font-bethany text-foreground text-lg dark:text-zinc-50">
                      {otherPost.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 max-w-xl font-light text-sm text-zinc-600 dark:text-zinc-200">
                      {otherPost.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
