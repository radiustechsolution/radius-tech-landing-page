import type { Metadata } from "next";
import { getAllPosts, getCategories, toMeta } from "@/lib/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, tutorials, videos and updates on apps, websites, fintech and building digital products.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-[76px]">
      <section className="container-x pt-16 pb-24 md:pt-24">
        <h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl">
          <span className="text-gradient">Insights &amp;</span>{" "}
          <span className="font-serif font-normal italic tracking-normal text-silver">
            stories
          </span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-silver-400">
          Tips, tutorials and updates from the Radius team.
        </p>

        <div className="mt-12">
          <BlogIndex
            posts={posts.map(toMeta)}
            categories={getCategories(posts)}
          />
        </div>
      </section>
    </div>
  );
}
