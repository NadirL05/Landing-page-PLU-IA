import type { Metadata } from "next";
import type { MetierPageContent } from "@/components/metier/types";

/**
 * Métadonnées des pages métier.
 *
 * `alternates.canonical` est OBLIGATOIRE : le layout racine pose
 * `canonical: "/"`, hérité tel quel par toute page qui ne le redéfinit pas —
 * les trois pages se déclareraient alors comme des variantes de l'accueil et
 * seraient écartées de l'index.
 *
 * `images` est posé explicitement : vérifié sur le rendu, l'image générée par
 * app/opengraph-image.tsx n'est PAS reprise automatiquement sur les routes
 * enfants dès lors que la page redéfinit son bloc `openGraph`. Sans cette
 * ligne, les trois pages partaient sans aperçu social.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "PLU IA — Analyse de parcelle, urbanisme et bilan promoteur",
};

export function buildMetierMetadata(content: MetierPageContent): Metadata {
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: content.slug },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      siteName: "PLU IA",
      url: content.slug,
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
  };
}
