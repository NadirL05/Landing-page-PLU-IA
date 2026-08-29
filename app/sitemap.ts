import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/config/brand";
import { SOLUTION_PAGES } from "@/config/solutions";

/**
 * Sitemap de la landing.
 *
 * Ne contiennent QUE des pages publiques réellement servies en 200 par ce
 * domaine : l'accueil et les trois pages métier. Pas d'ancres (elles ne sont
 * pas des URLs distinctes), pas de route de app-plu-ia.agentimpact.fr (autre
 * domaine, majoritairement authentifié et en noindex), pas de fichier
 * technique.
 *
 * `lastModified` est une date figée et non `new Date()` : une date
 * recalculée à chaque requête déclare une modification qui n'a pas eu lieu,
 * ce que les moteurs finissent par ignorer. À mettre à jour à la main lors
 * d'une modification éditoriale substantielle.
 */
const HOME_LAST_MODIFIED = "2026-08-29";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BRAND_URL}/`,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SOLUTION_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
