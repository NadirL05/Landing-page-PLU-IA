import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /faisabilite-fonciere.
 *
 * Affirmations vérifiées dans le dépôt produit (sas-plu-3d) :
 *  - contour et surface de parcelle via l'API Carto Cadastre de l'IGN
 *    (src/lib/gisement-sources.ts, constante CADASTRE_API_URL) ;
 *  - règles de zone et leur provenance (base de zones, profil de repli,
 *    analyse du règlement PDF, estimation) : `PluConstraintSnapshot` et
 *    `ConstraintSourceKind` (src/lib/feasibility-finance.ts) ;
 *  - comparables DVF : `MarketEvidence` (même fichier) ;
 *  - zones A et N inconstructibles écartées : NON_CONSTRUCTIBLE_ZONE_FAMILIES
 *    (src/config/plu-definitions.ts, appliqué dans src/lib/gisement-sources.ts).
 */
export const FAISABILITE_FONCIERE: MetierPageContent = {
  slug: "/faisabilite-fonciere",
  navLabel: "Faisabilité foncière",

  metaTitle: "Faisabilité foncière : évaluer rapidement le potentiel d'une parcelle",
  metaDescription:
    "Première étude de faisabilité d'une parcelle : cadastre, zonage, règles applicables, enveloppe constructible théorique, risques connus et comparables DVF.",
  dateModified: "2026-08-29",

  eyebrow: "Cadastre · zonage · enveloppe constructible",
  h1: "Une parcelle mérite-t-elle une étude approfondie ?",
  lede:
    "L'étude de faisabilité foncière répond à une seule question, le plus tôt possible : ce terrain peut-il porter une opération ? Cette page explique quelles informations réunir, comment les lire, et ce que PLU IA rassemble automatiquement à partir des données publiques.",
  ctaPrimaryLabel: "Analyser une parcelle",
  ctaSecondaryLabel: "Voir une démonstration",
  ctaNote: "Sans carte bancaire · 2 analyses / 30 jours",

  problem: {
    title: "Le coût d'une étude, c'est surtout le temps passé sur les mauvaises parcelles",
    body: [
      "Une première étude de faisabilité n'a pas vocation à être exacte : elle a vocation à trier. Elle doit dire assez vite si un terrain est constructible, dans quelles limites, et si des contraintes connues suffisent à l'écarter — avant d'y consacrer une visite, un géomètre ou une offre.",
      "Le travail de collecte est pourtant toujours le même : trouver la parcelle au cadastre, identifier le document d'urbanisme applicable, retrouver la bonne zone, ouvrir le règlement, en extraire les quelques articles qui déterminent ce qu'on peut construire, puis vérifier les risques et servitudes recensés.",
    ],
    points: [
      {
        title: "Le document d'urbanisme n'est pas toujours au même endroit",
        body: "Selon la commune, le PLU ou le PLUi est publié sur le Géoportail de l'Urbanisme, disponible en mairie, ou en cours de révision. Quand il n'est pas publié en ligne, aucun outil ne peut en garantir le zonage.",
      },
      {
        title: "Les règles utiles sont dispersées dans le règlement",
        body: "Emprise au sol, hauteur maximale, retraits par rapport aux limites, part d'espaces verts de pleine terre, stationnement exigé : ces articles conditionnent l'essentiel du volume constructible, et se lisent zone par zone.",
      },
      {
        title: "Certaines contraintes sont invisibles sur un plan",
        body: "Risques recensés, aléa argiles, périmètres de protection, servitudes d'utilité publique : ces éléments ne se déduisent pas du terrain, ils se cherchent dans des bases séparées — et se confirment en mairie.",
      },
    ],
  },

  capabilities: {
    title: "Ce que l'outil rassemble pour une première étude",
    intro:
      "PLU IA reconstitue en une fois le dossier d'entrée d'une étude de faisabilité. Chaque élément indique sa source et son niveau de certitude ; rien n'est calculé sur cette page publique.",
    items: [
      {
        ref: "FF.01",
        title: "Identification de la parcelle",
        body: "Recherche par adresse (Base Adresse Nationale), par référence cadastrale ou par clic sur la carte. Le contour et la surface proviennent de l'API Carto Cadastre de l'IGN.",
      },
      {
        ref: "FF.02",
        title: "Zonage applicable",
        body: "La zone d'urbanisme couvrant la parcelle est lue dans le Géoportail de l'Urbanisme lorsque la commune y publie son document. Les zones agricoles et naturelles, inconstructibles, sont identifiées comme telles.",
      },
      {
        ref: "FF.03",
        title: "Lecture des règles de la zone",
        body: "Le règlement de la zone est analysé pour en extraire emprise au sol, hauteur maximale, retraits, espaces verts et règle de stationnement. Chaque règle indique d'où elle vient : base de zones, analyse du règlement, profil de repli par famille de zone, ou estimation.",
      },
      {
        ref: "FF.04",
        title: "Enveloppe constructible maximale théorique",
        body: "Le volume constructible est déduit des règles retenues et visualisé en 3D avec le terrain et le bâti environnant. C'est un maximum théorique, hors prospects, gabarit et prescriptions non modélisés.",
      },
      {
        ref: "FF.05",
        title: "Risques et servitudes recensés",
        body: "Risques déclarés sur la commune (Géorisques / GASPAR), aléa retrait-gonflement des argiles à la coordonnée, et servitudes d'utilité publique disponibles via l'API Carto du Géoportail de l'Urbanisme. L'absence de résultat ne garantit pas l'absence de servitude.",
      },
      {
        ref: "FF.06",
        title: "Comparables DVF",
        body: "Les mutations issues des Demandes de Valeurs Foncières autour de la parcelle (rayon de 500 m par défaut) donnent un prix au m² de référence, qui sert ensuite d'appui au bilan promoteur.",
      },
    ],
  },

  steps: {
    title: "Quatre étapes avant de décider d'aller plus loin",
    items: [
      {
        n: "01",
        title: "Localiser la parcelle",
        body: "Une adresse, une référence cadastrale ou un point sur la carte suffisent à récupérer le contour et la surface exacte du terrain.",
      },
      {
        n: "02",
        title: "Identifier la zone et ses règles",
        body: "Le zonage est rapproché du document d'urbanisme publié, puis le règlement de la zone est dépouillé pour en extraire les règles qui déterminent le volume constructible.",
      },
      {
        n: "03",
        title: "Estimer l'enveloppe constructible",
        body: "Les règles retenues sont converties en volume maximal théorique, visualisé en 3D, puis en surface de plancher potentielle.",
      },
      {
        n: "04",
        title: "Confronter au marché, puis au bilan",
        body: "Les mutations DVF alentour situent le prix de sortie plausible ; l'étude bascule alors vers un bilan promoteur pour vérifier que l'opération tient financièrement.",
      },
    ],
  },

  sources: {
    title: "Les données publiques mobilisées",
    intro:
      "Une première étude de faisabilité ne vaut que par la traçabilité de ses sources. Voici celles réellement interrogées par le produit.",
    items: [
      "Base Adresse Nationale : résolution de l'adresse saisie.",
      "Cadastre — API Carto de l'IGN : contour, surface et référence de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de zone, quand la commune y publie son document.",
      "API Carto du GPU : servitudes d'utilité publique disponibles (ABF, PPRI, PPRT, sites classés).",
      "Géorisques — GASPAR et aléa retrait-gonflement des argiles : risques recensés.",
      "DVF — Etalab : mutations autour de la parcelle, prix au m² de référence.",
      "RGE Alti — IGN : altimétrie, pour apprécier la pente du terrain.",
      "PVGIS — Commission européenne : irradiation solaire annuelle et orientation optimale.",
    ],
    note:
      "Chaque règle affichée porte l'indication de sa provenance — donnée de zone, analyse du règlement, profil de repli ou estimation — pour que vous sachiez ce qui est établi et ce qui reste à confirmer.",
  },

  proof: {
    title: "À quoi ressemble une première lecture de parcelle",
    intro:
      "La restitution regroupe en une page ce qu'on cherche habituellement dans quatre outils différents : la parcelle, sa zone, ses règles et le volume qu'elles autorisent.",
    tag: "Exemple fictif — parcelle AB0142",
    rows: [
      { label: "Surface de la parcelle", value: "1 820 m²" },
      { label: "Zone d'urbanisme", value: "UB — zone urbaine" },
      { label: "Emprise au sol maximale", value: "40 %" },
      { label: "Hauteur maximale autorisée", value: "12 m" },
      { label: "Surface de plancher potentielle (maximum théorique)", value: "≈ 1 240 m²" },
      { label: "Prix au m² de référence (mutations à 500 m)", value: "4 200 €/m²" },
    ],
    bar: { label: "Emprise au sol mobilisée sur le maximum autorisé", pct: 68 },
    caption:
      "Exemple entièrement fictif, produit pour illustrer la mise en page : ni parcelle réelle, ni dossier de client. Les valeurs réelles dépendent de la commune, de la zone et du règlement applicable.",
  },

  limits: {
    title: "Limites des données publiques et vérifications indispensables",
    intro:
      "Une étude automatisée cadre une décision, elle ne l'instruit pas. Les points ci-dessous doivent être vérifiés avant tout engagement.",
    items: [
      "Si la commune ne publie pas son document d'urbanisme sur le Géoportail de l'Urbanisme, le zonage n'est pas garanti : la mairie reste la source de référence.",
      "Un document en cours de révision, une modification récente ou une orientation d'aménagement peuvent changer les règles applicables sans être encore reflétés dans les données publiques.",
      "L'absence de servitude ou de risque dans les bases consultées ne prouve pas leur absence sur le terrain : la vérification en mairie est indispensable.",
      "L'enveloppe constructible affichée est un maximum théorique : prospects, gabarit, règles d'aspect, avis d'un architecte des Bâtiments de France ou prescriptions particulières la réduisent fréquemment.",
      "La surface et le contour cadastraux ne remplacent pas un bornage : seul un géomètre-expert établit les limites de propriété.",
      "PLU IA ne délivre ni certificat d'urbanisme, ni autorisation, ni aucun acte opposable : c'est une aide à la décision, à confronter aux services compétents.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une étude de faisabilité foncière ?",
      a: "C'est la première analyse d'un terrain, destinée à savoir s'il peut porter une opération et dans quelles limites. Elle réunit l'identification cadastrale de la parcelle, le zonage et les règles du document d'urbanisme applicable, les contraintes et risques recensés, puis une estimation du volume constructible et de sa valeur possible.",
    },
    {
      q: "Quelles informations faut-il réunir pour une première étude ?",
      a: "La référence et la surface cadastrales de la parcelle, la zone du document d'urbanisme qui la couvre, les règles de cette zone (emprise au sol, hauteur, retraits, espaces verts, stationnement), les risques et servitudes recensés, et des références de prix locales pour situer la valeur de sortie.",
    },
    {
      q: "Comment connaître le zonage d'une parcelle ?",
      a: "Le zonage figure dans le PLU ou le PLUi de la commune. Quand la commune publie son document sur le Géoportail de l'Urbanisme, PLU IA le lit automatiquement à partir de la position de la parcelle. Dans le cas contraire, il faut se rapprocher du service urbanisme de la mairie, qui reste dans tous les cas la source de référence.",
    },
    {
      q: "L'enveloppe constructible affichée est-elle constructible en pratique ?",
      a: "Non, il s'agit d'un maximum théorique déduit des règles lues. Les prospects, le gabarit, les règles d'aspect, les servitudes et les prescriptions particulières peuvent le réduire sensiblement. Cette valeur sert à trier des terrains, pas à dimensionner un projet.",
    },
    {
      q: "Après la faisabilité, quelle est l'étape suivante ?",
      a: "Le bilan promoteur : on convertit la surface de plancher potentielle en chiffre d'affaires prévisionnel, on y oppose les coûts de construction et les frais annexes, et on en déduit la marge et le prix maximum que le terrain peut supporter.",
    },
  ],

  finalCta: {
    title: "Vérifiez une parcelle avant d'y consacrer une visite",
    body: "Analysez un terrain dont vous connaissez déjà le dossier : c'est la façon la plus rapide de mesurer ce que l'outil apporte, et ce qu'il laisse à votre appréciation.",
    label: "Analyser une parcelle",
  },
};
