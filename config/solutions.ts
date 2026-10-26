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
export const GUIDE_PAGES: readonly SolutionPage[] = [
  {
    slug: "/charge-fonciere",
    navLabel: "Charge foncière",
    linkLabel: "Charge foncière : définition et calcul à rebours",
    summary:
      "Calculer ce qu'une opération peut payer pour un terrain : charge foncière admissible, incidence foncière, exemple chiffré fictif.",
  },
  {
    slug: "/terrain-constructible",
    navLabel: "Terrain constructible",
    linkLabel: "Savoir si un terrain est constructible : la méthode",
    summary:
      "Document d'urbanisme, zone, règlement, servitudes, réseaux, certificat d'urbanisme : les six vérifications de la constructibilité d'un terrain.",
  },
  {
    slug: "/division-parcellaire",
    navLabel: "Division parcellaire",
    linkLabel: "Division parcellaire : règles, autorisations et étapes",
    summary:
      "Déclaration préalable ou permis d'aménager, application du PLU aux lots, rôle du géomètre-expert : préparer la division d'un terrain.",
  },
  {
    slug: "/zonage-plu",
    navLabel: "Zonage PLU",
    linkLabel: "Zonage PLU : les zones U, AU, A et N expliquées",
    summary:
      "Ce que dit le code de l'urbanisme des zones U, AU, A et N, pourquoi UA, UB ou AUa varient d'un PLU à l'autre, et comment trouver la zone d'une parcelle.",
  },
  {
    slug: "/surface-de-plancher",
    navLabel: "Surface de plancher",
    linkLabel: "Calcul de la surface de plancher : méthode et exemple",
    summary:
      "Définition de l'article R111-22, les huit déductions, exemple fictif, et la différence avec l'enveloppe théorique qu'un PLU autorise.",
  },
  {
    slug: "/emprise-au-sol",
    navLabel: "Emprise au sol",
    linkLabel: "Emprise au sol et CES : définition et calcul",
    summary:
      "Définition de l'article R420-1, ce qui est compté ou non, coefficient d'emprise au sol du PLU et conflit avec les espaces verts.",
  },
  {
    slug: "/dent-creuse",
    navLabel: "Dent creuse",
    linkLabel: "Dent creuse : définition, densification et repérage",
    summary:
      "Définition, place dans la densification et la sobriété foncière, repérage des terrains libres entre constructions et pièges des données sur le bâti.",
  },
  {
    slug: "/certificat-urbanisme",
    navLabel: "Certificat d'urbanisme",
    linkLabel: "Certificat d'urbanisme : CU d'information ou opérationnel",
    summary:
      "CUa ou CUb, délais d'instruction, validité de 18 mois, prorogation, et ce qu'il faut vérifier sur le terrain avant de le demander.",
  },
  {
    slug: "/prix-terrain-constructible",
    navLabel: "Prix d'un terrain constructible",
    linkLabel: "Prix d'un terrain constructible : comment l'estimer",
    summary:
      "Trouver les ventes réelles (DVF, Patrim), ce qui fait varier le prix, et la différence entre prix du marché et prix admissible d'un promoteur.",
  },
];

/**
 * Pages filles de /zonage-plu, une par famille de zones du code de
 * l'urbanisme (art. R151-18 à R151-25). Jamais de page par commune ici.
 */
export const ZONE_PAGES: readonly SolutionPage[] = [
  {
    slug: "/zonage-plu/zone-u",
    navLabel: "Zone U",
    linkLabel: "Zone U : la zone urbaine et ses secteurs UA, UB",
    summary: "Définition de l'article R151-18, lecture des secteurs UA et UB, vérifications avant de construire.",
  },
  {
    slug: "/zonage-plu/zone-au",
    navLabel: "Zone AU",
    linkLabel: "Zone AU : zone à urbaniser, ouverte ou fermée",
    summary: "Définition de l'article R151-20, zones ouvertes et fermées, appellations 1AU, 2AU et AUa.",
  },
  {
    slug: "/zonage-plu/zone-a",
    navLabel: "Zone A",
    linkLabel: "Zone A : la zone agricole",
    summary: "Définition de l'article R151-22 et constructions qui peuvent y être autorisées (article R151-23).",
  },
  {
    slug: "/zonage-plu/zone-n",
    navLabel: "Zone N",
    linkLabel: "Zone N : la zone naturelle et forestière",
    summary: "Les cinq motifs de l'article R151-24 et constructions qui peuvent y être autorisées (article R151-25).",
  },
];

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
