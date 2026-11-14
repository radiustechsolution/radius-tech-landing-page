import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

/** Update this date when you make major content changes */
const LAST_UPDATED = "2026-11-14";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/solutions",
    "/training",
    "/blog",
    "/start-project",
    "/privacy",
    "/terms",
  ];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: LAST_UPDATED,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority:
      route === "" ? 1 : route === "/privacy" || route === "/terms" ? 0.3 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
