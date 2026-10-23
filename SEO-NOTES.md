# SEO and AEO notes

Researched 2026-10-24. Most search results were vendor and agency blogs, so only claims that agreed across sources, or that came from a vendor's own docs, were acted on.

## What was implemented

| Area | What | Why |
| --- | --- | --- |
| Basics | One `<h1>`, real `<h2>`/`<h3>` headings, `lang="en"`, title, description, canonical, Open Graph, Twitter card, OG image (`app/opengraph-image.png`, brand kit in `public/brand/`) | Standard on-page SEO. |
| Core Web Vitals | Static page, `next/font` (self-hosted, no layout shift), no UI or animation libraries, CSS-only animation | Common targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Lighthouse locally: 100 desktop, 93 mobile performance. |
| Structured data | JSON-LD `Organization`, `WebSite`, `ProfessionalService`, one `Service` per service, `OfferCatalog` for plans, `FAQPage` (built from `content/site.ts` in `lib/jsonld.ts`) | Schema must match visible copy. Prices come from `content/site.ts` (monthly, yearly and setup per plan; from-price per service). |
| Answer-engine friendliness | FAQ answers and all six service panels are in the HTML (hidden, not removed); short, direct answers under question headings | Engines retrieve and quote page text. Sources agree clear question headings and direct answers matter most. |
| `robots.txt` | Allows search and AI crawlers, blocks only `/api/` | See below. |
| `sitemap.xml` | Single URL | One-page site. |
| `llms.txt` | Plain-language summary generated from `content/site.ts` (`/llms.txt`) | Cheap to add. **Weakest-supported item**: no source showed ChatGPT, Perplexity or Google using it. |

## Crawler tokens (checked against vendor docs)

| Token | Vendor | Purpose | robots.txt honoured |
| --- | --- | --- | --- |
| `OAI-SearchBot` | OpenAI | ChatGPT search index and citations | Yes |
| `ChatGPT-User` | OpenAI | Fetches when a user asks | May not apply (user-initiated) |
| `GPTBot` | OpenAI | Model training | Yes |
| `ClaudeBot` | Anthropic | Model training | Yes |
| `Claude-SearchBot` | Anthropic | Search quality and indexing | Yes |
| `Claude-User` | Anthropic | Fetches when a user asks | Yes |
| `PerplexityBot` | Perplexity | Search results, not model training | Yes |
| `Perplexity-User` | Perplexity | User-requested fetch | Generally ignores it |
| `Google-Extended` | Google | Gemini/Vertex training control token, not a crawler, no effect on Search ranking | Yes |
| `Googlebot`, `Bingbot` | Google, Microsoft | Search | Yes |
| `Applebot-Extended` | Apple | Apple AI training control token | Yes |

**Decision for you:** all of them are allowed. To opt out of model training but stay citable, set `Disallow: /` for `GPTBot`, `ClaudeBot`, `Google-Extended` and `Applebot-Extended` in `app/robots.ts`.

## Sources

- OpenAI crawler docs: https://developers.openai.com/api/docs/bots
- Anthropic crawler support article: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity bots guide: https://docs.perplexity.ai/guides/bots
- Technical SEO guide for small business (2026): https://eseospace.com/blog/the-complete-technical-seo-guide-for-small-businesses-2026/
- SEO best practices 2026 (vendor blog): https://chatterbuzzmedia.com/blog/seo-practices-2018-dos-donts
- GEO for B2B, cited by ChatGPT and Perplexity: https://blog.magmalabs.io/2026/07/23/geo-for-b2b-how-to-get-your-company-cited-by-chatgpt-and-perplexity.html
- 2026 technical GEO guide: https://asisteclick.com/en/blog/aparecer-en-chatgpt-perplexity-empresas/
- AI crawler user-agent list 2026: https://www.anagram.ai/blog/ai-crawler-user-agent-list-2026-14-bots-and-robotstxt-tokens-to-know

## Not verified

- Claims like "FAQ schema gives 2.7x citation rate" and "citations in 6 to 12 weeks" are vendor figures with no primary study. Not relied on.
- Core Web Vitals thresholds came from vendor blogs; confirm against Google Search Central.
- Run Google's Rich Results Test on the live URL after deploy.
