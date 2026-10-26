import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/config/brand";
import { GUIDE_PAGES, SOLUTION_PAGES, ZONE_PAGES } from "@/config/solutions";
import { FAISABILITE_FONCIERE } from "@/content/faisabilite-fonciere";
import { ZONE_A } from "@/content/zonage-plu-zone-a";
import { ZONE_N } from "@/content/zonage-plu-zone-n";
import { CERTIFICAT_URBANISME } from "@/content/certificat-urbanisme";
import { DENT_CREUSE } from "@/content/dent-creuse";
import { EMPRISE_AU_SOL } from "@/content/emprise-au-sol";
import { SURFACE_DE_PLANCHER } from "@/content/surface-de-plancher";

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

/**
 * Pages réécrites après le 21/10/2026 : leur lastmod reprend le
 * `dateModified` publié dans leur JSON-LD, pour que les deux dates ne se
 * contredisent pas (QA SEO du 26/10/2026, relais 20, section 6).
 */
const PAGE_LAST_MODIFIED: Readonly<Record<string, string>> = {
  [FAISABILITE_FONCIERE.slug]: FAISABILITE_FONCIERE.dateModified,
  [ZONE_A.slug]: ZONE_A.dateModified,
  [ZONE_N.slug]: ZONE_N.dateModified,
  [CERTIFICAT_URBANISME.slug]: CERTIFICAT_URBANISME.dateModified,
  [DENT_CREUSE.slug]: DENT_CREUSE.dateModified,
  [EMPRISE_AU_SOL.slug]: EMPRISE_AU_SOL.dateModified,
  [SURFACE_DE_PLANCHER.slug]: SURFACE_DE_PLANCHER.dateModified,
};

const lastModifiedFor = (slug: string): string => PAGE_LAST_MODIFIED[slug] ?? SITE_LAST_MODIFIED;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Sans slash final : identique à la canonical de l'accueil, que Next.js
      // émet toujours sans slash pour la racine (resolve-url.js : origin seul).
      url: BRAND_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SOLUTION_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: lastModifiedFor(page.slug),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...GUIDE_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: lastModifiedFor(page.slug),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ZONE_PAGES.map((page) => ({
      url: `${BRAND_URL}${page.slug}`,
      lastModified: lastModifiedFor(page.slug),
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
