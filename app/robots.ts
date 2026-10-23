import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Search and answer-engine crawlers are allowed on purpose so Devisyn can be cited.
 * Tokens verified against each vendor's docs, see SEO-NOTES.md.
 */
const CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: "/", disallow: "/api/" };

  return {
    rules: [{ userAgent: "*", ...rule }, ...CRAWLERS.map((userAgent) => ({ userAgent, ...rule }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
