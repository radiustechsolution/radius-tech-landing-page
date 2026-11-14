/* Helpers that are safe to use in the browser (no file system access) */

export type BlogBanner =
  | { type: "youtube"; id: string }
  | { type: "image"; src: string; alt?: string }
  | null;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  category: string;
  tags: string[];
  author: string;
  banner: BlogBanner;
  readingTime: number;
};

/** Accepts a full YouTube link (watch, youtu.be, shorts, embed) or just the ID */
export function extractYouTubeId(input: string): string {
  const value = input.trim();
  const match = value.match(
    /(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/,
  );
  if (match) return match[1];
  return value;
}

export function youtubeThumb(id: string, quality: "hq" | "maxres" = "hq") {
  return `https://i.ytimg.com/vi/${id}/${quality === "maxres" ? "maxresdefault" : "hqdefault"}.jpg`;
}

/** Image to use for share previews, or null to use the site default */
export function bannerImageUrl(banner: BlogBanner): string | null {
  if (!banner) return null;
  if (banner.type === "image") return banner.src;
  return youtubeThumb(banner.id, "hq");
}
