import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Radius Tech Solutions: Training";

export default function Image() {
  return renderOg({
    eyebrow: "Training",
    title: "Learn to build real products",
    subtitle: "Practical training in web and mobile development.",
  });
}
