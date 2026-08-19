import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://plu-ia.agentimpact.fr", changeFrequency: "weekly", priority: 1 },
  ];
}
