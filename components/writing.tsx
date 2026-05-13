import { getRecentPosts } from "@/lib/posts";
import Link from "next/link";
import { Reveal } from "./ui/reveal";

export const Writing = () => {
  const posts = getRecentPosts(1);

  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-8">
      <Reveal>
        <h2 className="font-bethany text-2xl text-foreground dark:text-zinc-50">
          Artigos Recentes
        </h2>
      </Reveal>
      <div className="mt-6 flex max-w-xl flex-col items-start gap-6 border-zinc-200 border-b-2 pb-3 transition-colors duration-300 ease-in-out hover:underline hover:decoration-[#F9581C] hover:underline-offset-2 dark:border-zinc-600">
        {posts.map((post) => (
          <Reveal key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-bethany text-foreground text-lg dark:text-zinc-50">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 max-w-xl font-light text-sm text-zinc-600 dark:text-zinc-200">
                {post.description}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
