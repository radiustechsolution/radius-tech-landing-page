import type { Metadata } from "next";
import {
  AboutHero,
  Manifesto,
  Principles,
  TwoSides,
} from "@/components/about/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Radius Tech Solutions Limited designs and builds mobile apps, web platforms and fintech systems, and trains the next generation of developers.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Manifesto />
      <Principles />
      <TwoSides />
    </>
  );
}
