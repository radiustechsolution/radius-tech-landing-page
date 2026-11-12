import type { Metadata } from "next";
import { ProjectStarter } from "@/components/sections/ProjectStarter";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us about your idea. Mobile apps, websites, fintech platforms and more.",
};

export default function StartProjectPage() {
  return (
    <div className="pt-[76px]">
      <div className="container-x pt-16 md:pt-24">
        <h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl">
          <span className="text-gradient">Start a</span>{" "}
          <span className="font-serif font-normal italic tracking-normal text-silver">
            project
          </span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-silver-400">
          Tell us what you want to build. It takes less than a minute.
        </p>
      </div>
      <div className="-mt-16 md:-mt-20">
        <ProjectStarter showHeading={false} />
      </div>
    </div>
  );
}
