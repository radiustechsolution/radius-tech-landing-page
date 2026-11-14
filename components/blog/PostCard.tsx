import Link from "next/link";
import type { PostMeta } from "@/lib/blog-utils";
import { PostBanner } from "./PostBanner";
import { cn } from "@/lib/utils";

export function PostMetaLine({
  post,
  className,
}: {
  post: PostMeta;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs",
        className,
      )}
    >
      <span className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-silver-300">
        {post.category}
      </span>
      <span className="text-silver-500">{post.dateLabel}</span>
      <span className="text-silver-500">{post.readingTime} min read</span>
      {post.banner?.type === "youtube" && (
        <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-black">
          Video
        </span>
      )}
    </div>
  );
}

export function PostCard({
  post,
  featured = false,
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2 transition-colors duration-300 hover:border-white/20",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
          <PostBanner
            banner={post.banner}
            title={post.title}
            category={post.category}
            size={featured ? "lg" : "sm"}
            priority={featured}
          />
        </div>
      </div>

      <div
        className={cn(
          "p-6",
          featured && "lg:flex lg:flex-col lg:justify-center lg:p-10",
        )}
      >
        <PostMetaLine post={post} />
        <h3
          className={cn(
            "mt-4 font-semibold tracking-tight text-white transition-colors group-hover:text-silver-100",
            featured
              ? "text-2xl md:text-4xl md:leading-[1.1]"
              : "text-xl leading-snug",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-silver-400",
            featured ? "md:text-lg" : "line-clamp-2 text-[15px]",
          )}
        >
          {post.description}
        </p>
        <span className="mt-6 inline-block text-sm font-medium text-white underline-offset-4 group-hover:underline">
          {post.banner?.type === "youtube" ? "Watch and read" : "Read article"}
        </span>
      </div>
    </Link>
  );
}
