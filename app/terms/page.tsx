import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern the use of Radius Tech Solutions Limited's website and services.",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
