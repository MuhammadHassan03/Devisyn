import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/sections/LegalPage";

const doc = site.legal.privacy;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={doc} />;
}
