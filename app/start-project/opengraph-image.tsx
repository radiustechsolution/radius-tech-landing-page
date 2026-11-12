import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Start a project with Radius Tech Solutions";

export default function Image() {
  return renderOg({
    eyebrow: "Start a Project",
    title: "Let's build something great",
    subtitle: "Tell us about your idea. It takes less than a minute.",
  });
}
