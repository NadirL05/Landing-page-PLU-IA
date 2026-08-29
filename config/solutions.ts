/**
 * Référentiel des trois pages métier publiques (SEO/GEO).
 *
 * Source unique pour : la navigation, le pied de page, le bloc "Solutions" de
 * l'accueil, le maillage interne entre pages métier, le fil d'Ariane et le
 * sitemap. Ajouter une page métier ici la fait apparaître partout — c'est
 * volontaire : trois listes de liens recopiées à la main divergent toujours.
 *
 * Ces pages sont PUBLIQUES et purement éditoriales : aucun moteur de calcul,
 * aucune base de données, aucun formulaire. Tous les calculs restent dans
 * l'application privée (app-plu-ia.agentimpact.fr).
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
];

/** Les deux autres pages métier, pour le maillage interne d'une page donnée. */
export function otherSolutionPages(currentSlug: string): readonly SolutionPage[] {
  return SOLUTION_PAGES.filter((page) => page.slug !== currentSlug);
}
