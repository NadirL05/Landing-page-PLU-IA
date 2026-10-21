import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/config/brand";
import { GUIDE_PAGES, SOLUTION_PAGES, ZONE_PAGES } from "@/config/solutions";

/**
 * Sitemap de la landing.
 *
 * Ne contiennent QUE des pages publiques réellement servies en 200 par ce
 * domaine : l'accueil, les pages métier, les guides et les pages de zone. Pas d'ancres (elles ne sont
 * pas des URLs distinctes), pas de route de app.fonciable.fr (autre
 * domaine applicatif, majoritairement authentifié et en noindex), pas de fichier
 * technique.
 *
 * `lastModified` est une date figée et non `new Date()` : une date
 * recalculée à chaque requête déclare une modification qui n'a pas eu lieu,
 * ce que les moteurs finissent par ignorer. À mettre à jour à la main lors
 * d'une modification éditoriale substantielle.
 */
const SITE_LAST_MODIFIED = "2026-10-21";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BRAND_URL}/`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SOLUTION_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...GUIDE_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ZONE_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BRAND_URL}/mentions-legales`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BRAND_URL}/confidentialite`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
