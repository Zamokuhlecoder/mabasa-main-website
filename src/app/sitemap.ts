import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number]> = [
    ["", 1],
    ["/services", 0.9],
    ["/outsourced-development", 0.8],
    ["/outsourced-development/proposal", 0.6],
    ["/industries", 0.8],
    ["/how-we-work", 0.8],
    ["/about", 0.7],
    ["/contact", 0.9],
    ["/privacy", 0.3],
  ];
  return [
    ...pages.map(([path, priority]) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
