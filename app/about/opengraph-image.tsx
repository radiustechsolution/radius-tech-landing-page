import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "About Radius Tech Solutions";

export default function Image() {
  return renderOg({
    eyebrow: "About Us",
    title: "We build products that move businesses forward",
    subtitle:
      "Software for businesses, and training for the next generation of developers.",
  });
}
