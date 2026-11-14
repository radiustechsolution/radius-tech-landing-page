import { getAllPosts, toMeta } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";
import { GlowButton } from "@/components/ui/GlowButton";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3).map(toMeta);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
              <span className="text-gradient">From the</span>{" "}
              <span className="font-serif font-normal italic tracking-normal text-silver">
                blog
              </span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-silver-400">
              Tips, tutorials and videos on building digital products.
            </p>
          </div>
          <GlowButton
            href="/blog"
            variant="outline"
            size="md"
            className="hidden md:inline-flex"
          >
            View all posts
          </GlowButton>
        </div>
      </div>

      {/* Phones: swipe row. Tablet & desktop: grid */}
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 md:hidden">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="w-[85vw] max-w-[400px] shrink-0 snap-start"
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>

      <div className="container-x mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="container-x mt-8 md:hidden">
        <GlowButton href="/blog" variant="outline" size="md" className="w-full">
          View all posts
        </GlowButton>
      </div>
    </section>
  );
}
