import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://plu-ia.agentimpact.fr",
      // Audit SEO/GEO 24/08 : new Date() est évalué au build (ce fichier
      // n'est pas force-dynamic), donc figé à la date de déploiement — pas
      // un lastModified qui bouge à chaque requête (ce qui serait pire :
      // les moteurs traitent un lastmod qui change en permanence comme du
      // bruit et peuvent le disqualifier). Se remet à jour naturellement à
      // chaque redéploiement de contenu.
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
