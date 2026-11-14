import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts, getPost, getRelatedPosts, toMeta } from "@/lib/blog";
import { bannerImageUrl } from "@/lib/blog-utils";
import { site } from "@/lib/site";
import { Markdown } from "@/components/blog/Markdown";
import { PostBanner } from "@/components/blog/PostBanner";
import { PostCard, PostMetaLine } from "@/components/blog/PostCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { YouTubePlayer } from "@/components/blog/YouTubePlayer";
import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const image = bannerImageUrl(post.banner);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const related = getRelatedPosts(post).map(toMeta);
  const image = bannerImageUrl(post.banner);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: url,
    ...(image
      ? { image: image.startsWith("http") ? image : `${site.url}${image}` }
      : {}),
  };

  return (
    <article className="pt-[76px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="container-x max-w-4xl pt-14 md:pt-20">
        <Link
          href="/blog"
          className="text-sm text-silver-400 transition-colors hover:text-white"
        >
          All posts
        </Link>
        <PostMetaLine post={toMeta(post)} className="mt-8" />
        <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-white md:text-6xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-lg text-silver-400 md:text-xl">
            {post.description}
          </p>
        )}
        <p className="mt-6 text-sm text-silver-500">By {post.author}</p>
      </header>

      {/* Banner */}
      <div className="container-x mt-10 max-w-5xl md:mt-14">
        {post.banner?.type === "youtube" ? (
          <YouTubePlayer id={post.banner.id} title={post.title} />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <PostBanner
              banner={post.banner}
              title={post.title}
              category={post.category}
              size="lg"
              priority
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="container-x mt-12 max-w-3xl">
        <Markdown content={post.content} />

        {post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-silver-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-white/[0.08] pt-8">
          <ShareButtons url={url} title={post.title} />
        </div>
      </div>

      {/* CTA */}
      <div className="container-x mt-20 max-w-5xl">
        <BeamCard speed={8}>
          <div className="relative flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Have a project in{" "}
                <span className="font-serif font-normal italic text-silver">
                  mind?
                </span>
              </h2>
              <p className="mt-2 text-silver-400">
                Tell us what you want to build. We&apos;ll help you make it
                real.
              </p>
            </div>
            <GlowButton href="/start-project" variant="primary" size="md">
              Start a Project
            </GlowButton>
          </div>
        </BeamCard>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x mt-24 pb-8">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
