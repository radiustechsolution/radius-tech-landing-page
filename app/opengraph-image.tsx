import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt =
  "Radius Tech Solutions: We turn ideas into powerful digital products";

export default function Image() {
  return renderOg({
    eyebrow: "Software Development Company",
    title: "We turn ideas into powerful digital products",
    subtitle:
      "Mobile apps, web platforms and fintech systems built to scale your business.",
  });
}
