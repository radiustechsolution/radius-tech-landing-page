import type { Metadata } from "next";
import { SolutionsPage } from "@/components/solutions/SolutionsPage";
import { ProjectStarter } from "@/components/sections/ProjectStarter";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Mobile apps, web applications, backend systems, integrations, cloud, UI/UX design and fintech solutions by Radius Tech Solutions Limited.",
};

export default function Page() {
  return (
    <>
      <SolutionsPage />
      <ProjectStarter />
    </>
  );
}
