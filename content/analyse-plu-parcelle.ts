import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /analyse-plu-parcelle.
 *
 * Affirmations vérifiées dans le dépôt produit (sas-plu-3d, commit 62959d2 du
 * 2026-10-20) ; détail et preuves dans docs/PREUVES-page-analyse-plu.md :
 *  - parcelle et surface via l'API Carto Cadastre de l'IGN
 *    (src/lib/gisement-sources.ts et src/lib/plu-engine.ts, CADASTRE_API_URL) ;
 *  - zonage lu dans la couche `zone_urba` du Géoportail de l'Urbanisme et
 *    rattaché au document en vigueur (src/lib/plu-gpu-link.ts) ; secteurs
 *    intersectant toute la parcelle, couche indisponible = statut inconnu et
 *    jamais une absence (src/lib/parcel-plu-proof.ts) ;
 *  - zones A et N inconstructibles : NON_CONSTRUCTIBLE_ZONE_FAMILIES
 *    (src/config/plu-definitions.ts, appliqué dans src/lib/plu-engine.ts) ;
 *  - règlement téléchargé depuis le GPU puis lu (src/lib/plu-pdf-extract.ts) ;
 *    emprise, retrait, hauteur, espaces verts avec citations page + extrait
 *    quand elles existent (PluRagSnippet, src/lib/plu-engine.ts) ; provenance
 *    de chaque règle : ConstraintSourceKind (src/lib/feasibility-finance.ts) ;
 *  - fourchette de surface de plancher calculée seulement si emprise et
 *    hauteur sont des valeurs simples (previewEnvelopeFromRules,
 *    src/lib/parcel-preview-awareness.ts) ; vue 3D :
 *    components/three/ParcelScene.tsx ;
 *  - servitudes d'utilité publique : couches assiette-sup-p/l/s de l'API Carto
 *    GPU (src/lib/plu-engine.ts, fetchAssietteSupLayer) ;
 *  - refus publiés Paris, Nantes Métropole et Anglet, PC et DP, sans données
 *    de demandeur (src/lib/permit-refusal/open-data.ts,
 *    components/gisement/published-refusals-panel.tsx).
 *
 * Exemple de la section `proof` : RÉEL, choisi par Nadir le 2026-10-20, et
 * revérifié le 2026-10-20 à la source (cadastre IGN, GPU, data.nantesmetropole.fr).
 * Aucun nom de demandeur ni d'architecte n'est affiché.
 */
export const ANALYSE_PLU_PARCELLE: MetierPageContent = {
  slug: "/analyse-plu-parcelle",
  navLabel: "Analyse PLU",
  related: ["/bilan-promoteur", "/faisabilite-fonciere", "/prospection-fonciere", "/zonage-plu", "/terrain-constructible", "/surface-de-plancher", "/emprise-au-sol"],

  metaTitle: "Analyse PLU d'une parcelle : zonage et règles",
  metaDescription:
    "Lire le PLU d'une parcelle : zone du Géoportail de l'Urbanisme, règles du règlement avec leur source, enveloppe constructible théorique et refus publiés.",
  dateModified: "2026-10-20",

  eyebrow: "Zonage · règlement · constructibilité",
  h1: "Analyse PLU d'une parcelle : zonage, règles et constructibilité, sources à l'appui",
  lede:
    "Analyser le PLU d'une parcelle, c'est retrouver la zone qui la couvre, extraire du règlement les quelques règles qui fixent le volume constructible, et savoir d'où vient chacune. Cette page détaille la méthode, les données publiques réellement interrogées par Fonciable, et ce qu'elles ne permettent pas de conclure.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle et de la lecture de son PLU.",

  problem: {
    title: "Le PLU répond, mais il faut savoir où chercher et quoi citer",
    body: [
      "Pour un promoteur, un marchand de biens ou un architecte, la première lecture du PLU conditionne tout le reste : une zone mal identifiée ou une règle de hauteur mal lue, et l'étude part sur une base fausse.",
      "Le travail est pourtant répétitif : localiser la parcelle au cadastre, trouver le document d'urbanisme en vigueur sur la commune, identifier le secteur exact, ouvrir un règlement de plusieurs centaines de pages, puis relever les articles utiles en notant leur page pour pouvoir les justifier.",
    ],
    points: [
      {
        title: "Une zone, plusieurs secteurs",
        body: "Un PLU ou un PLUi découpe ses zones en secteurs aux règles différentes, et une même parcelle peut en chevaucher plusieurs. Connaître seulement la lettre de la zone ne suffit pas.",
      },
      {
        title: "Des règles dispersées dans le règlement",
        body: "Emprise au sol, hauteur maximale, retraits, espaces verts de pleine terre, stationnement : ces articles se lisent zone par zone, parfois avec des renvois vers les dispositions générales.",
      },
      {
        title: "Une règle sans source ne vaut rien",
        body: "Une valeur relevée sans référence au document et à la page ne peut ni être vérifiée par un associé, ni être défendue face à un vendeur ou à un service instructeur.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit pour vous dans le PLU",
    intro:
      "Chaque élément ci-dessous est produit par l'application à partir des données publiques. Chaque règle indique sa provenance, et une donnée manquante est signalée comme telle, jamais présentée comme une absence de contrainte.",
    items: [
      {
        ref: "AP.01",
        title: "Parcelle et surface cadastrale",
        body: "Recherche par adresse, référence cadastrale ou clic sur la carte. Le contour et la surface de la parcelle proviennent de l'API Carto Cadastre de l'IGN.",
      },
      {
        ref: "AP.02",
        title: "Zone et secteur du document en vigueur",
        body: "La zone est lue dans le Géoportail de l'Urbanisme et rattachée au document d'urbanisme en vigueur sur la commune. Tous les secteurs qui touchent la parcelle sont relevés ; les zones agricoles et naturelles sont identifiées comme inconstructibles.",
      },
      {
        ref: "AP.03",
        title: "Règles de la zone, avec leur source",
        body: "Le règlement publié est téléchargé puis lu pour en extraire emprise au sol, hauteur maximale, retraits et espaces verts. Chaque règle indique d'où elle vient (base de zones, lecture du règlement, profil de repli ou estimation), avec la page et l'extrait cités quand ils sont disponibles.",
      },
      {
        ref: "AP.04",
        title: "Enveloppe constructible théorique",
        body: "Quand l'emprise et la hauteur se traduisent en valeurs simples, une fourchette de surface de plancher est calculée et le volume est visualisé en 3D. Sinon, aucune enveloppe n'est affichée plutôt qu'un chiffre inventé.",
      },
      {
        ref: "AP.05",
        title: "Servitudes d'utilité publique recensées",
        body: "Les servitudes publiées via l'API Carto du Géoportail de l'Urbanisme sont interrogées à la position de la parcelle. L'absence de résultat ne prouve pas l'absence de servitude.",
      },
      {
        ref: "AP.06",
        title: "Refus d'urbanisme publiés",
        body: "Dans l'espace de prospection, Fonciable liste les refus de permis de construire et les décisions défavorables sur déclaration préalable publiés en données ouvertes par Paris, Nantes Métropole et Anglet, avec un lien vers la décision à la source et sans aucune donnée sur le demandeur.",
      },
    ],
    contextLink: {
      text: "Pour la suite de l'étude (risques, comparables DVF, enveloppe et passage au bilan), voir",
      href: "/faisabilite-fonciere",
      label: "la page Faisabilité foncière",
    },
  },

  steps: {
    title: "Comment se déroule une analyse PLU",
    items: [
      {
        n: "01",
        title: "Identifier la parcelle",
        body: "Une adresse, une référence cadastrale ou un point sur la carte suffisent à récupérer le contour, la référence et la surface cadastrale du terrain.",
      },
      {
        n: "02",
        title: "Rattacher la parcelle à sa zone",
        body: "La géométrie de la parcelle est croisée avec le zonage du document en vigueur publié sur le Géoportail de l'Urbanisme, secteur par secteur.",
      },
      {
        n: "03",
        title: "Lire et citer le règlement",
        body: "Le règlement de la zone est dépouillé pour relever les règles qui déterminent le volume constructible, chacune accompagnée de sa provenance.",
      },
      {
        n: "04",
        title: "Situer le terrain et décider de la suite",
        body: "Enveloppe théorique, servitudes recensées et refus publiés alentour donnent les éléments pour décider d'une étude de faisabilité complète ou d'un passage en mairie.",
      },
    ],
  },

  sources: {
    title: "Les sources interrogées pour lire un PLU",
    intro:
      "Une analyse PLU ne vaut que par la traçabilité de ses sources. Voici celles que l'application interroge réellement pour cette lecture.",
    items: [
      "Base Adresse Nationale : résolution de l'adresse saisie.",
      "Cadastre, API Carto de l'IGN : contour, référence et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et document d'urbanisme en vigueur, quand la commune y publie son document.",
      "Règlement écrit publié sur le GPU : lecture des règles de la zone.",
      "API Carto du GPU : servitudes d'utilité publique publiées.",
      "Données ouvertes de Paris, Nantes Métropole et Anglet : refus d'urbanisme publiés.",
    ],
    note:
      "Chaque règle affichée porte l'indication de sa provenance, pour distinguer ce qui est lu dans le règlement de ce qui reste une estimation à confirmer.",
  },

  proof: {
    title: "Un exemple réel : une parcelle de Nantes avec un refus publié",
    intro:
      "Cette parcelle figure dans les refus de permis de construire publiés par Nantes Métropole. Nous avons revérifié chaque valeur ci-dessous à sa source publique, sans utiliser aucune donnée sur le demandeur.",
    tag: "Exemple réel · parcelle 44109000BZ0070 · Nantes",
    rows: [
      { label: "Adresse du terrain", value: "5 Avenue de l'Aumônerie, Nantes" },
      { label: "Parcelle cadastrale", value: "44109000BZ0070" },
      { label: "Surface cadastrale", value: "538 m²" },
      { label: "Zone du PLUm de Nantes Métropole", value: "UMap (zone urbaine U)" },
      { label: "Libellé du secteur", value: "Secteur de développement des centralités actuelles ou en devenir" },
      { label: "Décision publiée", value: "Refus d'un permis de construire, 8 octobre 2026" },
    ],
    caption:
      "Valeurs relevées le 20 octobre 2026 : surface et référence à l'API Carto Cadastre de l'IGN, zone au Géoportail de l'Urbanisme, décision au jeu de données « Demandes d'autorisation et décisions d'urbanisme de Nantes Métropole » (data.nantesmetropole.fr, Licence Ouverte). Ce refus concerne un projet précis : il ne dit rien de ce qu'un autre projet pourrait obtenir sur ce terrain. Fonciable n'autorise rien ; seule la mairie instruit et décide.",
  },

  limits: {
    title: "Ce qu'une analyse PLU automatisée ne permet pas de conclure",
    intro:
      "Lire un zonage n'est pas obtenir une autorisation. Les points ci-dessous doivent être vérifiés avant tout engagement.",
    items: [
      "Un zonage indique les règles applicables, pas ce qui sera accordé : seule l'instruction d'une demande par la mairie vaut décision.",
      "Si la commune ne publie pas son document d'urbanisme sur le Géoportail de l'Urbanisme, le zonage n'est pas garanti : la mairie reste la source de référence.",
      "Une modification, une révision en cours ou une orientation d'aménagement peuvent changer les règles applicables sans être encore reflétées dans les données publiques.",
      "L'enveloppe affichée est un maximum théorique : prospects, gabarit, règles d'aspect, avis de l'architecte des Bâtiments de France ou prescriptions particulières la réduisent souvent.",
      "L'absence de servitude ou de refus dans les bases consultées ne prouve pas leur absence : la vérification en mairie est indispensable.",
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation, ni aucun acte opposable : c'est une aide à la décision, à confronter aux services compétents.",
    ],
  },

  faq: [
    {
      q: "Comment connaître le zonage PLU d'une parcelle ?",
      a: "Le zonage figure dans le PLU ou le PLUi de la commune. Quand la commune publie son document sur le Géoportail de l'Urbanisme, Fonciable le lit automatiquement à partir de la géométrie de la parcelle. Dans tous les cas, le service urbanisme de la mairie reste la source de référence.",
    },
    {
      q: "Quelles règles du PLU déterminent la constructibilité d'un terrain ?",
      a: "Principalement l'emprise au sol, la hauteur maximale, les retraits par rapport aux voies et aux limites séparatives, la part d'espaces verts de pleine terre et les obligations de stationnement. S'y ajoutent les servitudes d'utilité publique et les éventuelles orientations d'aménagement.",
    },
    {
      q: "Une parcelle en zone U est-elle forcément constructible ?",
      a: "Non. La zone urbaine indique que des constructions sont admises sous conditions, mais le secteur, les règles de la zone, les servitudes et le projet lui-même déterminent ce qui peut être accordé. L'exemple de Nantes présenté sur cette page, en zone U, a fait l'objet d'un refus publié.",
    },
    {
      q: "D'où viennent les règles affichées par Fonciable ?",
      a: "Chaque règle indique sa provenance : base de zones, lecture du règlement publié, profil de repli par famille de zone, ou estimation. Quand la règle est lue dans le règlement, la page et l'extrait sont cités lorsqu'ils sont disponibles.",
    },
    {
      q: "L'analyse PLU remplace-t-elle un certificat d'urbanisme ?",
      a: "Non. Le certificat d'urbanisme est délivré par l'administration et lui seul fige les règles applicables pour une durée donnée. L'analyse de Fonciable sert à trier et préparer un dossier, pas à le valider.",
    },
  ],

  finalCta: {
    title: "Échangeons sur la lecture du PLU d'une de vos parcelles",
    body: "Apportez un terrain dont vous connaissez déjà le dossier : nous vous montrerons comment Fonciable en restitue le zonage, les règles et leurs sources.",
    label: "Prendre rendez-vous",
  },
};
