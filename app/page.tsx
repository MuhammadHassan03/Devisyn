import { Calculator } from "@/components/sections/Calculator";
import { Comparison } from "@/components/sections/Comparison";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Journey } from "@/components/sections/Journey";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { buildJsonLd } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
      <Header />
      <main>
        <Hero />
        <MarqueeBand />
        <Stats />
        <Services />
        <LiveDemo />
        <Industries />
        <Journey />
        <Comparison />
        <Pricing />
        <Faq />
        <Calculator />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
