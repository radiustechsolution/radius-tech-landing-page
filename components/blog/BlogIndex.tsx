"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { PostMeta } from "@/lib/blog-utils";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function BlogIndex({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All" ? posts : posts.filter((p) => p.category === active),
    [active, posts],
  );

  const [featured, ...rest] = filtered;

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 p-16 text-center text-silver-400">
        No posts yet. Check back soon.
      </div>
    );
  }

  return (
    <>
      {/* Categories */}
      {categories.length > 1 && (
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "shrink-0 rounded-[10px] border px-4 py-2 text-sm transition-all duration-300",
                active === c
                  ? "border-white bg-white text-black"
                  : "border-white/10 text-silver-400 hover:border-white/25 hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Featured */}
      {featured && (
        <motion.div
          key={`${active}-${featured.slug}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mt-10"
        >
          <PostCard post={featured} featured />
        </motion.div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <motion.div
              key={`${active}-${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.06 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
