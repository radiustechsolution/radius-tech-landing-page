import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    inlineCss: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // YouTube thumbnails for blog banners
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Make sure blog post files are always included when deployed
  outputFileTracingIncludes: {
    "/": ["./src/content/blog/**/*", "./content/blog/**/*"],
    "/**": ["./src/content/blog/**/*", "./content/blog/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
