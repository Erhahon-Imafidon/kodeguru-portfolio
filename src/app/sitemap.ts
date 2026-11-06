import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((s) => ({
      url: `${site.url}/work/${s.slug}`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
