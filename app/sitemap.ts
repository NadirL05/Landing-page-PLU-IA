import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://plu-ia.agentimpact.fr",
      lastModified: new Date("2026-08-21"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
