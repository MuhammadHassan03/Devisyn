import { SITE_URL, servicePriceLabel, site, usd } from "@/content/site";

export const dynamic = "force-static";

function buildLlmsTxt(): string {
  const { name, seo, services, industries, pricing, faq, contact } = site;

  const lines = [
    `# ${name}`,
    "",
    `> ${seo.description}`,
    "",
    `${name} is a done-for-you service for small businesses. We set it up and run it. The customer keeps their phone number and does not have to learn new software.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- **${s.name}** (${servicePriceLabel(s)}): ${s.headline} ${s.body} Best for ${s.bestFor}.`),
    "",
    "## Industries",
    "",
    ...industries.items.flatMap((i) => [
      `### ${i.name}`,
      `${i.headline} Recommended plan: ${i.plan}.`,
      ...i.cards.map((c) => `- **${c.title}**: ${c.text}`),
      "",
    ]),
    "",
    "## Plans",
    "",
    `${pricing.footnote} Yearly billing saves 10%.`,
    "",
    ...pricing.plans.map((p) => `- **${p.name}** (${usd(p.priceMonthly)}/mo, ${usd(p.priceYearly)}/mo billed yearly, ${usd(p.setup)} setup): ${p.blurb} Includes: ${p.features.join("; ")}.`),
    "",
    "## Free missed-call check",
    "",
    contact.body,
    "",
    "## Frequently asked questions",
    "",
    ...faq.items.flatMap((f) => [`**${f.q}**`, f.a, ""]),
    "## Links",
    "",
    `- [Home page](${SITE_URL}/)`,
    `- [Services](${SITE_URL}/#services)`,
    `- [Industries](${SITE_URL}/#industries)`,
    `- [Live demo](${SITE_URL}/#demo)`,
    `- [Privacy](${SITE_URL}/privacy)`,
    `- [Terms](${SITE_URL}/terms)`,
    `Contact: ${contact.email}`,
    `- [Pricing](${SITE_URL}/#pricing)`,
    `- [FAQ](${SITE_URL}/#faq)`,
    `- [Get a free missed-call check](${SITE_URL}/#contact)`,
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
