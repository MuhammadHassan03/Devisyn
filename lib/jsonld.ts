import { SITE_URL, site } from "@/content/site";

const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#service-provider`;

/** Structured data for the single page, built from content/site.ts so it never drifts from the visible copy. */
export function buildJsonLd() {
  const { name, seo, services, industries, pricing, faq, contact } = site;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name,
        url: SITE_URL,
        email: contact.email,
        sameAs: [contact.linkedin, contact.instagram],
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}/opengraph-image.png`,
        description: seo.description,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name,
        url: SITE_URL,
        description: seo.description,
        parent: { "@id": ORG_ID },
        areaServed: "United States",
        audience: industries.items.map((i) => ({ "@type": "Audience", audienceType: i.audience })),
        email: contact.email,
        serviceType: "Missed-call text-back, call answering and lead follow-up for small businesses",
        hasOfferCatalog: { "@id": `${SITE_URL}/#plans` },
      },
      ...services.map((service) => ({
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${service.n}`,
        name: service.name,
        description: `${service.headline} ${service.body}`,
        provider: { "@id": BUSINESS_ID },
        audience: { "@type": "Audience", audienceType: service.bestFor },
        url: `${SITE_URL}/#services`,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "https://schema.org/MinimumAdvertisedPrice",
            price: service.priceFrom,
            priceCurrency: "USD",
            unitText: service.priceUnit === "mo" ? "month" : "campaign",
          },
        },
      })),
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/#plans`,
        name: `${name} plans`,
        itemListElement: pricing.plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: `${plan.blurb} Includes: ${plan.features.join(", ")}.`,
          url: `${SITE_URL}/#pricing`,
          priceCurrency: "USD",
          price: plan.priceMonthly,
          priceSpecification: [
            { "@type": "UnitPriceSpecification", price: plan.priceMonthly, priceCurrency: "USD", unitText: "month", name: "Billed monthly" },
            { "@type": "UnitPriceSpecification", price: plan.priceYearly, priceCurrency: "USD", unitText: "month", name: "Billed yearly" },
            { "@type": "UnitPriceSpecification", price: plan.setup, priceCurrency: "USD", priceType: "https://schema.org/OneTimeFee", name: "One-time setup" },
          ],
          seller: { "@id": ORG_ID },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faq.items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}
