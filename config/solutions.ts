/**
 * Référentiel des pages métier publiques (SEO/GEO).
 *
 * Source unique pour : la navigation, le pied de page, le bloc "Solutions" de
 * l'accueil, le maillage interne entre pages métier, le fil d'Ariane et le
 * sitemap. Ajouter une page métier ici la fait apparaître partout — c'est
 * volontaire : trois listes de liens recopiées à la main divergent toujours.
 *
 * Ces pages sont PUBLIQUES et purement éditoriales : aucun moteur de calcul,
 * aucune base de données, aucun formulaire. Tous les calculs restent dans
 * l'application privée (app.fonciable.fr).
 */

export interface SolutionPage {
  /** Chemin absolu sur la landing, sans slash final. */
  readonly slug: string;
  /** Libellé court, utilisé en navigation et en fil d'Ariane. */
  readonly navLabel: string;
  /** Lien descriptif (pied de page, maillage interne) — jamais « cliquez ici ». */
  readonly linkLabel: string;
  /** Résumé d'une phrase, réutilisé par le bloc Solutions de l'accueil. */
  readonly summary: string;
}

export const SOLUTION_PAGES: readonly SolutionPage[] = [
  {
    slug: "/bilan-promoteur",
    navLabel: "Bilan promoteur",
    linkLabel: "Bilan promoteur : méthode et hypothèses",
    summary:
      "Comprendre la structure d'un bilan promoteur et les hypothèses à poser avant d'engager une offre sur un terrain.",
  },
  {
    slug: "/faisabilite-fonciere",
    navLabel: "Faisabilité foncière",
    linkLabel: "Faisabilité foncière : première étude d'une parcelle",
    summary:
      "Savoir en quelques minutes si une parcelle mérite une étude approfondie : zonage, règles applicables, contraintes connues.",
  },
  {
    slug: "/prospection-fonciere",
    navLabel: "Prospection foncière",
    linkLabel: "Prospection foncière : repérer des parcelles à potentiel",
    summary:
      "Balayer un territoire pour faire remonter les parcelles au potentiel constructible résiduel le plus crédible.",
  },
  {
    slug: "/analyse-plu-parcelle",
    navLabel: "Analyse PLU",
    linkLabel: "Analyse PLU d'une parcelle : zonage et règles sourcés",
    summary:
      "Lire la zone, les règles du règlement et l'enveloppe constructible théorique d'une parcelle, chaque valeur avec sa source.",
  },
];

/**
 * Guides de fond (décision de Nadir du 20/10/2026, IMPLEMENTATION_PLAN § E) :
 * une page par requête cœur de cible. Même gabarit que les pages Solutions,
 * mais hors de la navigation principale (pied de page, accueil, maillage).
 */
export const GUIDE_PAGES: readonly SolutionPage[] = [];

/**
 * Pages filles de /zonage-plu, une par famille de zones du code de
 * l'urbanisme (art. R151-18 à R151-25). Jamais de page par commune ici.
 */
export const ZONE_PAGES: readonly SolutionPage[] = [];

/** Toutes les pages éditoriales publiques : sitemap, llms.txt, maillage. */
export const ALL_EDITORIAL_PAGES: readonly SolutionPage[] = [...SOLUTION_PAGES, ...GUIDE_PAGES, ...ZONE_PAGES];

/** Les autres pages métier, pour le maillage interne d'une page donnée. */
export function otherSolutionPages(currentSlug: string): readonly SolutionPage[] {
  return SOLUTION_PAGES.filter((page) => page.slug !== currentSlug);
}

/**
 * Pages du bloc « À lire aussi ». Un chemin absent du référentiel fait
 * échouer le build : un lien interne vers une page inexistante serait une 404.
 */
export function relatedPages(currentSlug: string, related?: readonly string[]): readonly SolutionPage[] {
  if (!related) return otherSolutionPages(currentSlug);
  return related.map((slug) => {
    const page = ALL_EDITORIAL_PAGES.find((candidate) => candidate.slug === slug);
    if (!page) throw new Error(`Page liée inconnue du référentiel : ${slug} (depuis ${currentSlug})`);
    return page;
  });
}
