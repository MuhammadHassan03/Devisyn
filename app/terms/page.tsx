import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/sections/LegalPage";

const doc = site.legal.terms;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={doc} />;
}
