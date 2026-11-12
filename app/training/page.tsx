import type { Metadata } from "next";
import { TrainingPage } from "@/components/training/TrainingPage";

export const metadata: Metadata = {
  title: "Training",
  description:
    "Learn web and mobile development with Radius Tech Solutions. Practical training in React, Next.js, Flutter and more.",
};

export default function Page() {
  return <TrainingPage />;
}
