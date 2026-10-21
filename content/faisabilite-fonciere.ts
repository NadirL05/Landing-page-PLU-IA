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
 *
 * Ajouts « constructibilité / surface constructible » du 2026-10-20, vérifiés
 * au commit 62959d2 de sas-plu-3d (détail : docs/briefs/analyse-plu-parcelle.md §6) :
 *  - zone rattachée au document d'urbanisme en vigueur ; RNU ou zonage non
 *    rattaché = aucune règle de zone déduite : src/lib/plu-gpu-link.ts:1-14 et
 *    :379, src/lib/plu-engine.ts:1450-1452 ;
 *  - zones AU non confondues avec les zones A : src/lib/gisement-sources.ts:2004-2006 ;
 *  - aucun bilan en zone A ou N : src/lib/finance/scenario.ts:146-147 ;
 *  - surface de plancher potentielle = surface × emprise au sol maximale ×
 *    niveaux permis par la hauteur maximale : src/lib/finance/scenario.ts:161-175 ;
 *  - pas de calcul sur la parcelle entière tant que l'application des règles à
 *    toute la parcelle n'est pas vérifiée, et l'outil le signale :
 *    src/lib/finance/scenario.ts:139-145, src/lib/committee-dossier.ts:109-110.
 */
export const FAISABILITE_FONCIERE: MetierPageContent = {
  slug: "/faisabilite-fonciere",
  navLabel: "Faisabilité foncière",
  related: ["/bilan-promoteur", "/prospection-fonciere", "/analyse-plu-parcelle", "/terrain-constructible", "/charge-fonciere"],

  // Requête cible ajoutée le 2026-10-21 : « étude de faisabilité foncière ».
  metaTitle: "Étude de faisabilité foncière d'une parcelle",
  metaDescription:
    "Étude de faisabilité foncière d'une parcelle : cadastre, zonage, règles, enveloppe constructible théorique, risques, servitudes et comparables DVF.",
  dateModified: "2026-10-21",

  eyebrow: "Cadastre · zonage · enveloppe constructible",
  h1: "Étude de faisabilité foncière : cette parcelle mérite-t-elle d'aller plus loin ?",
  lede:
    "L'étude de faisabilité foncière répond à une seule question, le plus tôt possible : ce terrain peut-il porter une opération ? Cette page explique quelles informations réunir, comment les lire, et ce que Fonciable rassemble automatiquement à partir des données publiques.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle et de vos questions de faisabilité.",

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
    title: "Ce que l'outil rassemble pour une première étude de constructibilité",
    intro:
      "Fonciable reconstitue en une fois le dossier d'entrée d'une étude de faisabilité. Chaque élément indique sa source et son niveau de certitude ; rien n'est calculé sur cette page publique.",
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
    contextLink: {
      text: "La lecture du zonage et du règlement de zone, avec un exemple réel à Nantes, est détaillée sur",
      href: "/analyse-plu-parcelle",
      label: "la page Analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "Quatre étapes pour estimer la constructibilité d'une parcelle",
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
        title: "Estimer l'enveloppe et la surface constructibles",
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

  // TODO(NADIR): cas client réel, avec accord écrit du client. Aucun
  // témoignage ni nom de client n'est publié tant qu'il n'est pas fourni.
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
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation, ni aucun acte opposable : c'est une aide à la décision, à confronter aux services compétents.",
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
      q: "Comment savoir si un terrain est constructible ?",
      a: "Tout part de la zone du document d'urbanisme qui couvre la parcelle. Fonciable lit cette zone dans le Géoportail de l'Urbanisme et la rattache au document en vigueur. Les zones agricoles (A) et naturelles (N) sont identifiées comme inconstructibles et aucun bilan n'est produit pour elles ; les zones à urbaniser (AU) ne sont pas confondues avec les zones agricoles. Si la commune relève du règlement national d'urbanisme ou si aucun zonage n'est rattaché, aucune règle de zone n'en est déduite. Seule la mairie, par un certificat d'urbanisme, confirme la constructibilité.",
    },
    {
      q: "Comment connaître le zonage d'une parcelle ?",
      a: "Le zonage figure dans le PLU ou le PLUi de la commune. Quand la commune publie son document sur le Géoportail de l'Urbanisme, Fonciable le lit automatiquement à partir de la position de la parcelle. Dans le cas contraire, il faut se rapprocher du service urbanisme de la mairie, qui reste dans tous les cas la source de référence.",
    },
    {
      q: "Comment est estimée la surface constructible d'une parcelle ?",
      a: "Fonciable part de la surface cadastrale de la parcelle et de l'emprise au sol maximale autorisée par la zone, ce qui donne l'emprise bâtissable. Le nombre de niveaux est déduit de la hauteur maximale. La surface de plancher potentielle est l'emprise multipliée par ce nombre de niveaux. Ce calcul n'est fait qu'en zone constructible et seulement lorsque l'application des règles à toute la parcelle est vérifiée ; sinon, l'outil le signale au lieu d'afficher un chiffre.",
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
    title: "Échangeons sur une parcelle avant votre prochaine visite",
    body: "Apportez un terrain dont vous connaissez déjà le dossier : nous vous montrerons comment Fonciable aide à préparer sa qualification.",
    label: "Prendre rendez-vous",
  },
};
