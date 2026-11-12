import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Radius Tech Solutions: Solutions";

export default function Image() {
  return renderOg({
    eyebrow: "Solutions",
    title: "Solutions that grow with you",
    subtitle:
      "Mobile apps, web apps, backend, integrations, cloud, UI/UX and fintech.",
  });
}
