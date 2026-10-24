import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Crawlers that only collect content to train AI models. They are asked to stay out.
 * robots.txt is honoured by reputable operators but is not enforcement - see README.
 */
const trainingCrawlers = [
  "GPTBot", // OpenAI model training
  "ClaudeBot", // Anthropic model training
  "anthropic-ai",
  "CCBot", // Common Crawl (widely used for training data)
  "Applebot-Extended", // Apple AI training (Applebot search is unaffected)
  "Bytespider", // ByteDance
  "meta-externalagent", // Meta AI training
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "omgili",
  "img2dataset",
];

/**
 * Search engines and AI assistants that fetch pages to answer a user's question and link
 * back to the source. These are explicitly welcomed so the site can be found and recommended.
 */
const searchAndAssistants = [
  "Googlebot",
  "Google-Extended", // Gemini grounding; allowing it lets Gemini cite and recommend the site
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User",
  "Claude-SearchBot", // Claude search
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: trainingCrawlers, disallow: "/" },
      { userAgent: searchAndAssistants, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
