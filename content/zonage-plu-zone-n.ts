import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-n.
 *
 * Textes : R151-24 (LEGIARTI000031720603) et R151-25 (LEGIARTI000031720601),
 * Légifrance, consultés le 2026-10-20, en vigueur depuis le 01/01/2016.
 *
 * Affirmations sur l'outil (sas-plu-3d, commit 1e2ba0a) :
 *  - zone N : contrainte bloquante « ZONE_NON_CONSTRUCTIBLE », aucune
 *    surface constructible calculée : src/lib/plu-engine.ts:2790-2797 et
 *    :2901-2910, src/config/plu-definitions.ts:84 ;
 *  - aucun bilan en zone N : src/lib/finance/scenario.ts:146-147 ;
 *  - zones N exclues des scans de prospection : src/lib/gisement-engine.ts ;
 *  - risques Géorisques : src/lib/plu-engine.ts:739 ; PPRI bloquant en zone
 *    rouge : src/config/plu-definitions.ts:73-80, src/lib/plu-engine.ts:2738-2745.
 *
 * Réécriture du 26/10/2026 (bloc « Comment Fonciable traite » et étapes,
 * propres à la zone N ; vérifié sur sas-plu-3d commit 85370de) :
 *  - libellé de la contrainte « … la construction neuve y est interdite
 *    (zone naturelle) » : src/lib/plu-engine.ts:2982-2990 ;
 *  - PPRI / PPRT traités comme bloquants en zone réglementaire rouge :
 *    src/config/plu-definitions.ts:73-80, src/lib/plu-engine.ts:2818-2825
 *    (une servitude portant un drapeau `blocking` explicite peut aussi
 *    bloquer hors zone rouge : isServitudeBlocking, d'où « traité comme »
 *    et non « seulement » — QA SEO du 26/10/2026, relais 20) ;
 *  - l'outil n'identifie pas le motif de classement en zone N : l'étape 03
 *    renvoie au règlement et à la mairie (titre reformulé, même QA) ;
 *  - servitudes via l'API Carto du GPU : liste des sources de cette page.
 */
export const ZONE_N: MetierPageContent = {
  slug: "/zonage-plu/zone-n",
  navLabel: "Zone N",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/analyse-plu-parcelle", "/zonage-plu/zone-u", "/zonage-plu/zone-au", "/zonage-plu/zone-a", "/terrain-constructible"],

  metaTitle: "Zone N du PLU : zone naturelle et forestière",
  metaDescription:
    "Zone N du PLU : cinq motifs de classement en zone naturelle et forestière (art. R151-24) et constructions qui peuvent y être autorisées (art. R151-25).",
  dateModified: "2026-10-26",

  eyebrow: "Zonage PLU · zone naturelle et forestière",
  h1: "Zone N du PLU : la zone naturelle et forestière",
  lede:
    "La zone N protège les espaces naturels, les forêts, les paysages et les secteurs exposés à certains risques. Comme en zone agricole, le code de l'urbanisme énumère ce qui peut y être autorisé. Voici la définition exacte, les cinq motifs de classement, et ce que cela implique pour une étude foncière.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain proche d'une zone naturelle.",

  guide: {
    kicker: "Définition",
    title: "Ce que dit le code de l'urbanisme",
    blocks: [
      {
        title: "La définition de la zone N",
        paragraphs: ["Les zones naturelles et forestières sont dites « zones N ». Peuvent y être classés les secteurs de la commune, équipés ou non, à protéger en raison :"],
        list: [
          "soit de la qualité des sites, milieux et espaces naturels, des paysages et de leur intérêt, notamment du point de vue esthétique, historique ou écologique ;",
          "soit de l'existence d'une exploitation forestière ;",
          "soit de leur caractère d'espaces naturels ;",
          "soit de la nécessité de préserver ou restaurer les ressources naturelles ;",
          "soit de la nécessité de prévenir les risques, notamment d'expansion des crues.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-24 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720603" }],
      },
      {
        title: "Ce qui peut être autorisé en zone N",
        paragraphs: ["Le code prévoit deux catégories, dans les conditions fixées par le règlement du PLU :"],
        list: [
          "Les constructions et installations nécessaires à l'exploitation agricole et forestière, ou au stockage et à l'entretien de matériel agricole par les CUMA agréées.",
          "Les constructions, installations, extensions ou annexes aux bâtiments d'habitation, changements de destination et aménagements prévus par les articles L151-11, L151-12 et L151-13, dans les conditions qu'ils fixent.",
        ],
        sources: [{ label: "art. R151-25 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720601" }],
      },
      {
        title: "Les sous-secteurs de la zone N",
        paragraphs: [
          "Comme pour les autres zones, les PLU créent des sous-secteurs (Nh, Nl, Nzh…) dont le nom et les règles sont propres à chaque commune. Seul le règlement local dit ce qu'ils permettent.",
        ],
      },
    ],
  },

  problem: {
    title: "En zone N, le potentiel constructible n'est pas un calcul",
    body: [
      "Une parcelle boisée ou en bord de rivière peut sembler vaste et desservie. Si elle est classée en zone N, sa valeur pour une opération neuve est en principe nulle, quelle que soit sa surface, sauf secteur de taille et de capacité d'accueil limitées délimité par le PLU.",
    ],
    points: [
      { title: "Cinq motifs de protection", body: "Paysage, forêt, caractère naturel, ressources, risques : le motif oriente souvent ce que le règlement admet." },
      { title: "Les risques s'ajoutent", body: "Une zone N liée aux crues peut se doubler d'un plan de prévention des risques, avec ses propres interdictions." },
      { title: "Le bâti existant reste encadré", body: "Extensions et annexes ne sont possibles que dans les conditions du code et du règlement." },
    ],
  },

  capabilities: {
    title: "Comment Fonciable traite une parcelle en zone N",
    intro: "L'outil n'affiche pas de potentiel là où la zone l'exclut.",
    items: [
      { ref: "ZN.01", title: "Contrainte bloquante « zone naturelle »", body: "L'analyse affiche une contrainte bloquante qui nomme la zone et précise que la construction neuve y est interdite, au titre de la zone naturelle. Aucune surface constructible n'est calculée." },
      { ref: "ZN.02", title: "Aucun bilan promoteur", body: "Aucun bilan n'est produit en zone naturelle." },
      { ref: "ZN.03", title: "Risques recensés", body: "Les risques déclarés sur la commune sont relevés via Géorisques ; un plan de prévention du risque inondation est traité comme bloquant en zone rouge." },
    ],
  },

  steps: {
    title: "Lire une parcelle en zone N",
    items: [
      { n: "01", title: "Lire la contrainte « zone naturelle »", body: "Zone et document en vigueur viennent du Géoportail de l'Urbanisme ; la parcelle est signalée fermée à la construction neuve." },
      { n: "02", title: "Croiser avec les risques", body: "Risques déclarés sur la commune (Géorisques) et servitudes publiées : un plan de prévention du risque inondation ou technologique est traité comme bloquant en zone rouge." },
      { n: "03", title: "Vérifier le motif de protection dans le règlement", body: "Paysage, forêt, ressources ou risque d'expansion des crues : le règlement de la commune et la mairie disent ce que permet le bâti existant." },
    ],
  },

  sources: {
    title: "Les données publiques consultées",
    intro: "Les sources réellement interrogées par le produit.",
    items: [
      "Géoportail de l'Urbanisme (GPU) : zone et document en vigueur.",
      "API Carto du GPU : servitudes d'utilité publique disponibles.",
      "Géorisques : risques recensés.",
    ],
    note: "Le règlement de la zone N de la commune fixe les conditions précises : il prime sur toute lecture générale.",
  },

  limits: {
    title: "Limites",
    intro: "Une lecture automatique ne remplace pas l'examen du règlement.",
    items: [
      "Les possibilités liées au bâti existant ne sont pas évaluées par l'outil.",
      "L'absence de risque dans les bases consultées ne prouve pas son absence sur le terrain.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une zone N dans un PLU ?",
      a: "Une zone naturelle et forestière : un secteur, équipé ou non, protégé pour la qualité de ses sites et paysages, une exploitation forestière, son caractère naturel, la préservation des ressources naturelles ou la prévention des risques (article R151-24 du code de l'urbanisme).",
    },
    {
      q: "Peut-on construire en zone N ?",
      a: "Seulement ce que prévoit l'article R151-25 : les constructions nécessaires à l'exploitation agricole et forestière ou aux CUMA agréées, et, dans les conditions des articles L151-11 à L151-13, des extensions, annexes, changements de destination et aménagements. Le règlement de la commune précise ces conditions.",
    },
    {
      q: "Quelle différence entre zone A et zone N ?",
      a: "La zone A protège le potentiel des terres agricoles ; la zone N protège des espaces naturels, forestiers, des paysages, des ressources ou des secteurs à risque. Dans les deux cas, les constructions admises sont limitativement énumérées par le code de l'urbanisme.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain à la limite d'une zone naturelle",
    body: "Apportez une adresse : nous vous montrerons comment Fonciable lit la zone, les risques et ce qui reste à vérifier.",
    label: "Prendre rendez-vous",
  },
};
