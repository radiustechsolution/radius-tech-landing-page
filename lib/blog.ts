import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractYouTubeId, type BlogBanner, type PostMeta } from "./blog-utils";

export type Post = PostMeta & { content: string };

/* Posts can live in either folder */
const CANDIDATE_DIRS = [
  path.join(process.cwd(), "src", "content", "blog"),
  path.join(process.cwd(), "content", "blog"),
];

const isDev = process.env.NODE_ENV !== "production";

function blogDir(): string | null {
  return CANDIDATE_DIRS.find((dir) => fs.existsSync(dir)) ?? null;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

function parseBanner(data: Record<string, unknown>): BlogBanner {
  if (data.youtube)
    return { type: "youtube", id: extractYouTubeId(String(data.youtube)) };
  if (data.banner) {
    return {
      type: "image",
      src: String(data.banner),
      alt: data.bannerAlt ? String(data.bannerAlt) : undefined,
    };
  }
  return null;
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(
  dir: string,
  fileName: string,
): (Post & { draft: boolean }) | null {
  try {
    const slug = fileName.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
    const { data, content } = matter(raw);
    const date = normalizeDate(data.date);

    if (isDev && !data.title) {
      console.warn(`[blog] "${fileName}" has no title in its frontmatter.`);
    }

    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date,
      dateLabel: date
        ? dateFormatter.format(new Date(`${date}T00:00:00Z`))
        : "",
      category: String(data.category ?? "General"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      author: String(data.author ?? "Radius Tech Team"),
      banner: parseBanner(data),
      readingTime: readingTime(content),
      draft: data.draft === true,
      content,
    };
  } catch (error) {
    if (isDev) console.error(`[blog] Could not read "${fileName}":`, error);
    return null;
  }
}

/** All published posts, newest first */
export function getAllPosts(): Post[] {
  const dir = blogDir();

  if (!dir) {
    if (isDev) {
      console.warn(
        `[blog] No blog folder found. Create one of:\n  ${CANDIDATE_DIRS.join("\n  ")}`,
      );
    }
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));

  if (isDev && files.length === 0) {
    console.warn(`[blog] "${dir}" has no .md files yet.`);
  }

  return files
    .map((file) => readPostFile(dir, file))
    .filter((p): p is Post & { draft: boolean } => p !== null && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/** Strip content so only light data is sent to the browser */
export function toMeta(post: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...meta } = post;
  return meta;
}

export function getCategories(posts: Post[]): string[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
