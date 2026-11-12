import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Radius Tech Solutions Limited collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
