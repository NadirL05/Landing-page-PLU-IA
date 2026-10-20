import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-a.
 *
 * Textes : R151-22 (LEGIARTI000031720607) et R151-23 (LEGIARTI000031720605),
 * Légifrance, consultés le 2026-10-20, en vigueur depuis le 01/01/2016.
 *
 * Affirmations sur l'outil (sas-plu-3d, commit 1e2ba0a) :
 *  - zone A : contrainte bloquante « ZONE_NON_CONSTRUCTIBLE », aucune
 *    surface constructible calculée : src/lib/plu-engine.ts:2790-2797 et
 *    :2901-2910, src/config/plu-definitions.ts:84 ;
 *  - aucun bilan en zone A : src/lib/finance/scenario.ts:146-147 ;
 *  - zones A exclues des scans de prospection : src/lib/gisement-engine.ts
 *    (constructible false), cf. content/prospection-fonciere.ts.
 */
export const ZONE_A: MetierPageContent = {
  slug: "/zonage-plu/zone-a",
  navLabel: "Zone A",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/zonage-plu/zone-u", "/zonage-plu/zone-au", "/zonage-plu/zone-n", "/terrain-constructible"],

  metaTitle: "Zone A du PLU : zone agricole, ce qui y est autorisé",
  metaDescription:
    "Zone A du PLU : définition de la zone agricole (art. R151-22), constructions qui peuvent y être autorisées (art. R151-23), effet sur un projet immobilier.",
  dateModified: "2026-10-20",

  eyebrow: "Zonage PLU · zone agricole",
  h1: "Zone A du PLU : la zone agricole et ce qui peut y être autorisé",
  lede:
    "La zone A protège les terres agricoles. On n'y construit pas librement : le code de l'urbanisme énumère les constructions qui peuvent y être autorisées. Voici la définition exacte, la liste prévue par le code, et ce que cela signifie pour une étude foncière.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain proche d'une zone agricole.",

  guide: {
    kicker: "Définition",
    title: "Ce que dit le code de l'urbanisme",
    blocks: [
      {
        title: "La définition de la zone A",
        paragraphs: [
          "Les zones agricoles sont dites « zones A ». Peuvent y être classés les secteurs de la commune, équipés ou non, à protéger en raison du potentiel agronomique, biologique ou économique des terres agricoles. Le fait qu'un terrain soit desservi par les réseaux ne l'empêche donc pas d'être classé en zone A.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-22 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720607" }],
      },
      {
        title: "Ce qui peut être autorisé en zone A",
        paragraphs: ["Le code prévoit deux catégories, dans les conditions fixées par le règlement du PLU :"],
        list: [
          "Les constructions et installations nécessaires à l'exploitation agricole, ou au stockage et à l'entretien de matériel agricole par les coopératives d'utilisation de matériel agricole (CUMA) agréées.",
          "Les constructions, installations, extensions ou annexes aux bâtiments d'habitation, changements de destination et aménagements prévus par les articles L151-11, L151-12 et L151-13, dans les conditions qu'ils fixent.",
        ],
        sources: [{ label: "art. R151-23 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720605" }],
      },
      {
        title: "Ce que cela implique pour une opération immobilière",
        paragraphs: [
          "Une opération de logements neufs n'est en principe pas possible en zone A. Les possibilités existent surtout pour un bâti déjà présent (extension, annexe, changement de destination d'un bâtiment désigné par le PLU) ou dans des secteurs de taille et de capacité limitées que le PLU peut délimiter. Leur détail se lit dans le règlement de la commune.",
          "Les sous-secteurs (Ah, Ap…) sont, comme ailleurs, propres à chaque PLU.",
        ],
      },
    ],
  },

  problem: {
    title: "En zone A, la question n'est pas « combien » mais « quoi »",
    body: [
      "Sur une parcelle agricole, calculer une surface constructible à partir d'une emprise et d'une hauteur n'a pas de sens : ce qui compte, c'est la nature de la construction et son lien avec l'activité agricole ou un bâti existant.",
    ],
    points: [
      { title: "Les constructions sont énumérées", body: "Le code liste ce qui peut être autorisé ; tout le reste est exclu." },
      { title: "Le bâti existant ouvre quelques possibilités", body: "Extensions, annexes ou changements de destination, dans les conditions des articles L151-11 à L151-13." },
      { title: "Un faux potentiel coûte cher", body: "Un outil qui calcule une surface de plancher en zone A produit un candidat systématiquement faux." },
    ],
  },

  capabilities: {
    title: "Comment Fonciable traite une parcelle en zone A",
    intro: "L'outil refuse de produire un potentiel constructible là où le code ne le permet pas.",
    items: [
      { ref: "ZA.01", title: "Contrainte bloquante", body: "Une parcelle en zone A reçoit une contrainte bloquante « zone inconstructible » ; aucune surface constructible n'est calculée." },
      { ref: "ZA.02", title: "Aucun bilan promoteur", body: "Aucun bilan promoteur n'est produit en zone agricole : il afficherait une marge sur une opération impossible." },
      { ref: "ZA.03", title: "Exclue de la prospection", body: "Les parcelles en zone agricole sont écartées des scans de prospection foncière." },
    ],
  },

  steps: {
    title: "Lire une parcelle en zone A",
    items: [
      { n: "01", title: "Confirmer la zone", body: "Zone et document en vigueur, lus dans le Géoportail de l'Urbanisme." },
      { n: "02", title: "Écarter le calcul de potentiel", body: "La parcelle est signalée inconstructible pour une opération neuve." },
      { n: "03", title: "Étudier le bâti existant", body: "Les possibilités liées à un bâtiment existant se vérifient dans le règlement et auprès de la mairie." },
    ],
  },

  sources: {
    title: "Les données publiques consultées",
    intro: "Les sources réellement interrogées par le produit.",
    items: ["Géoportail de l'Urbanisme (GPU) : zone et document en vigueur.", "Cadastre, API Carto de l'IGN : contour et surface de la parcelle."],
    note: "Le règlement de la zone A de la commune fixe les conditions précises : il prime sur toute lecture générale.",
  },

  limits: {
    title: "Limites",
    intro: "Une lecture automatique ne remplace pas l'examen du règlement.",
    items: [
      "Les possibilités liées au bâti existant (extension, annexe, changement de destination) ne sont pas évaluées par l'outil.",
      "Une révision du PLU peut reclasser un secteur ; elle n'apparaît dans les données publiques qu'après son approbation et sa publication.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une zone A dans un PLU ?",
      a: "Une zone agricole : un secteur, équipé ou non, à protéger en raison du potentiel agronomique, biologique ou économique des terres agricoles (article R151-22 du code de l'urbanisme).",
    },
    {
      q: "Peut-on construire en zone A ?",
      a: "Seulement ce que prévoit l'article R151-23 : les constructions et installations nécessaires à l'exploitation agricole ou aux CUMA agréées, et, dans les conditions des articles L151-11 à L151-13, des extensions, annexes, changements de destination et aménagements. Hors de ces cas, par exemple un secteur de taille et de capacité d'accueil limitées délimité par le PLU, une maison neuve sans lien avec l'activité agricole n'y est pas autorisée.",
    },
    {
      q: "Une zone A peut-elle devenir constructible ?",
      a: "Seulement par une évolution du PLU qui reclasse le secteur, décidée par la collectivité au terme d'une procédure. Aucune démarche individuelle ne rend à elle seule un terrain agricole constructible.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain à la limite d'une zone agricole",
    body: "Apportez une adresse : nous vous montrerons comment Fonciable lit la zone et signale ce qui reste à vérifier.",
    label: "Prendre rendez-vous",
  },
};
