import { Hero } from "@/components/home/Hero";
import { BuildStory } from "@/components/home/BuildStory";
import { Services } from "@/components/home/Services";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { TechStack } from "@/components/home/TechStack";
import { Portfolio } from "@/components/home/Portfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { Engagement } from "@/components/home/Engagement";
import { Training } from "@/components/home/Training";
import { Faq } from "@/components/home/Faq";
import { ProjectStarter } from "@/components/sections/ProjectStarter";

export default function Home() {
  return (
    <>
      <Hero />
      <BuildStory />
      <Services />
      <WhatWeBuild />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <Engagement />
      <Training />
      <Faq />
      <ProjectStarter />
    </>
  );
}
