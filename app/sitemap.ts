import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Update this date when you make major content changes */
const LAST_UPDATED = "2026-11-12";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/solutions",
    "/training",
    "/start-project",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: LAST_UPDATED,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === "" ? 1 : route === "/privacy" || route === "/terms" ? 0.3 : 0.8,
  }));
}
