import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /dent-creuse.
 *
 * Requête cible (brief SEO 15, sujet 3, validé par Nadir le 26/10/2026) :
 * « dent creuse ». Plan : IMPLEMENTATION_PLAN § J3.
 *
 * Sources citées (consultées le 2026-10-26) :
 *  - Géoconfluences (ENS de Lyon), glossaire « Dent creuse », publié le
 *    25/11/2025 : « expression imagée désignant une parcelle non bâtie ou de
 *    faible hauteur » « dans un alignement de constructions plus hautes » ;
 *  - art. L101-2-1 du code de l'urbanisme (créé par la loi n° 2021-1104 du
 *    22 août 2021, art. 192), LEGIARTI000043967077, en vigueur depuis le
 *    25/08/2021 : équilibre entre maîtrise de l'étalement urbain,
 *    renouvellement urbain, optimisation de la densité des espaces urbanisés,
 *    etc. ; définition de l'artificialisation ;
 *  - art. R151-17 (familles de zones U, AU, A, N), LEGIARTI000031720617,
 *    déjà cité par /zonage-plu.
 *  - Aucune définition de la dent creuse n'est attribuée au code : la page
 *    dit seulement que ce n'est pas une catégorie de zone.
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit d4f460d du
 * 2026-10-26) :
 *  - potentiel = max(0, SDP autorisée par le PLU − SDP existante estimée via
 *    le RNB) : src/lib/gisement-engine.ts:1-10, :221-243 ;
 *  - bâti absent du RNB = risque n° 1, fiabilité dégradée et alerte :
 *    gisement-engine.ts:12-17 ;
 *  - zones A et N exclues des candidats : gisement-engine.ts:19-24 ;
 *  - typologie occupation_inconnue / densification_batie / grand_site (seuil
 *    20 000 m²) ; SDP existante nulle = « occupation inconnue », jamais
 *    « terrain nu » : src/types/gisement.ts:46-73 ;
 *  - indicateur communal de consommation d'espaces (ENAF 2021-2025), donnée
 *    absente = « non disponible », jamais 0 : src/lib/plu-engine.ts:333-345,
 *    components/gisement/zan-card.tsx:1-4 (affiché dans la fiche candidat,
 *    components/gisement/candidat-fiche.tsx).
 *  - NE FAIT PAS : qualifier une parcelle de « dent creuse » ; le mot n'est
 *    pas une catégorie du moteur. La page le dit.
 */
export const DENT_CREUSE: MetierPageContent = {
  slug: "/dent-creuse",
  navLabel: "Dent creuse",
  related: ["/prospection-fonciere", "/division-parcellaire", "/zonage-plu", "/analyse-plu-parcelle", "/surface-de-plancher"],

  metaTitle: "Dent creuse : définition et densification",
  metaDescription:
    "Dent creuse : définition en urbanisme, place dans la densification et la sobriété foncière, comment repérer ces terrains et les pièges à éviter.",
  dateModified: "2026-10-26",
  article: { datePublished: "2026-10-26" },

  eyebrow: "Dent creuse · densification · gisement foncier",
  h1: "Dent creuse : définition, densification et repérage",
  lede:
    "Une dent creuse est un terrain non bâti, ou peu bâti, situé au milieu de constructions existantes. Ce n'est pas une catégorie juridique du code de l'urbanisme mais une expression d'usage, très employée depuis que la sobriété foncière pousse à construire dans l'enveloppe urbaine plutôt qu'en extension. Cette page explique la notion, son lien avec la densification, la façon de repérer ces terrains et ce que fait le moteur de gisement de Fonciable.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un territoire où vous cherchez du foncier.",

  guide: {
    kicker: "Définition et contexte",
    title: "Ce que recouvre l'expression",
    intro: "Sources consultées le 26 octobre 2026.",
    blocks: [
      {
        title: "Qu'est-ce qu'une dent creuse ?",
        paragraphs: [
          "Le glossaire de Géoconfluences (ENS de Lyon) la décrit comme « une expression imagée désignant une parcelle non bâtie ou de faible hauteur » située « dans un alignement de constructions plus hautes ». L'image est celle d'une dent manquante dans une rangée : un vide, ou un bâti bas, entouré de constructions.",
          "Ce n'est pas une zone du PLU. Le code de l'urbanisme classe les terrains en zones urbaines, à urbaniser, agricoles et naturelles ; une dent creuse peut se trouver dans n'importe quelle zone, même si l'expression vise le plus souvent des terrains en zone urbaine. Son sens exact peut varier d'un document à l'autre : si un PLU ou un SCoT l'emploie, lisez la définition qu'il en donne.",
        ],
        sources: [
          { label: "Dent creuse, glossaire Géoconfluences (ENS de Lyon, publié le 25/11/2025)", href: "https://geoconfluences.ens-lyon.fr/glossaire/dent-creuse" },
          { label: "Code de l'urbanisme, art. R151-17 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720617" },
        ],
      },
      {
        title: "Dent creuse, densification et sobriété foncière",
        paragraphs: [
          "La loi n° 2021-1104 du 22 août 2021, dite Climat et résilience, a inscrit dans le code de l'urbanisme la lutte contre l'artificialisation des sols. L'article L101-2-1 qu'elle a créé fait reposer cet objectif sur un équilibre entre plusieurs leviers, dont la maîtrise de l'étalement urbain, le renouvellement urbain et l'optimisation de la densité des espaces urbanisés.",
          "Construire dans une dent creuse répond directement à ce dernier levier : le terrain est déjà entouré de constructions et souvent desservi par les réseaux. C'est pourquoi les collectivités et les opérateurs recensent ces terrains quand ils évaluent le potentiel de densification d'une commune.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. L101-2-1 (Légifrance, en vigueur depuis le 25/08/2021, consulté le 26/10/2026)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043967077" },
        ],
      },
      {
        title: "Dent creuse, division, grand site : trois gisements différents",
        paragraphs: ["On range souvent sous le mot « gisement » des situations qui n'appellent pas la même démarche :"],
        list: [
          "La dent creuse : un terrain libre ou peu bâti entre des constructions, souvent de petite taille, qui peut accueillir une construction neuve.",
          "La division d'un terrain déjà bâti : un fond de jardin ou une partie de grande parcelle détachée pour construire, avec ses propres autorisations.",
          "Le grand site : une emprise étendue, en friche ou non, qui relève d'une opération d'aménagement plutôt que d'une construction isolée.",
        ],
        link: {
          text: "Les règles et autorisations propres à la division d'un terrain sont détaillées sur",
          href: "/division-parcellaire",
          label: "la page Division parcellaire",
        },
      },
      {
        title: "Comment repérer les dents creuses d'une commune",
        paragraphs: [
          "La méthode consiste à croiser deux informations : ce que les règles d'urbanisme autorisent sur chaque parcelle, et ce qui y est déjà construit. Une parcelle en zone constructible où le bâti existant est faible, ou absent, devient un candidat. Il faut ensuite écarter les zones agricoles et naturelles, et ne pas comparer une parcelle de centre-bourg à un site de plusieurs hectares.",
          "Le piège principal tient aux données sur le bâti : une parcelle sur laquelle aucune base ne recense de bâtiment n'est pas forcément vide. Un bâtiment récent, une construction non référencée ou un usage non bâti mais réel (stationnement, stockage, jardin d'agrément) ne se voient pas dans les fichiers. Une visite, une vue aérienne récente ou un échange avec la mairie restent indispensables avant d'appeler un propriétaire.",
        ],
      },
    ],
  },

  problem: {
    title: "Le terrain est là, mais il est difficile à voir",
    body: [
      "Les dents creuses sont dispersées, petites, et rarement en vente. Les repérer parcelle par parcelle, à la main, sur un territoire entier prend des journées de croisement entre cadastre, zonage et photos aériennes.",
      "Et une liste mal triée coûte cher : chaque fausse piste se paie en déplacements et en appels inutiles.",
    ],
    points: [
      {
        title: "Les bases du bâti sont incomplètes",
        body: "Une parcelle construite mais absente des fichiers ressemble à un terrain libre : c'est le faux positif le plus fréquent.",
      },
      {
        title: "Toutes les zones ne se valent pas",
        body: "Un terrain libre en zone agricole ou naturelle n'est pas une dent creuse constructible.",
      },
      {
        title: "La disponibilité ne se lit nulle part",
        body: "Aucune donnée publique ne dit si un propriétaire est prêt à vendre.",
      },
    ],
  },

  capabilities: {
    title: "Ce que fait le moteur de gisement de Fonciable",
    intro:
      "Le moteur de prospection de Fonciable ne qualifie pas une parcelle de « dent creuse » : ce mot n'est pas une catégorie de l'outil. Il calcule un potentiel de surface de plancher résiduelle et classe les candidats selon la fiabilité des données.",
    items: [
      {
        ref: "DC.01",
        title: "Potentiel résiduel",
        body: "Surface de plancher autorisée par le PLU, moins la surface de plancher existante estimée à partir du Référentiel national des bâtiments (RNB). Le potentiel ne descend jamais sous zéro.",
      },
      {
        ref: "DC.02",
        title: "Bâti absent signalé",
        body: "L'absence de bâtiment dans le RNB est traitée comme le risque principal : la fiabilité du candidat est dégradée et une alerte s'affiche.",
      },
      {
        ref: "DC.03",
        title: "« Occupation inconnue », jamais « terrain nu »",
        body: "Une parcelle sans bâtiment trouvé est classée en occupation inconnue, pas en terrain nu. Les autres catégories sont la densification d'un terrain bâti et le grand site.",
      },
      {
        ref: "DC.04",
        title: "Grands sites à part",
        body: "Au-delà de 20 000 m², une parcelle est classée en grand site pour ne pas être comparée à une parcelle urbaine ordinaire.",
      },
      {
        ref: "DC.05",
        title: "Zones A et N écartées",
        body: "Les parcelles en zone agricole ou naturelle sont exclues de la liste des candidats.",
      },
      {
        ref: "DC.06",
        title: "Consommation d'espaces de la commune",
        body: "La fiche d'un candidat affiche l'indicateur communal de consommation d'espaces naturels, agricoles et forestiers sur 2021-2025 ; une donnée absente est affichée « non disponible », jamais 0.",
      },
    ],
    contextLink: {
      text: "Le fonctionnement complet du moteur, ses composantes et ses faux positifs connus sont décrits sur",
      href: "/prospection-fonciere",
      label: "la page Prospection foncière",
    },
  },

  steps: {
    title: "D'un territoire à une liste de candidats",
    items: [
      {
        n: "01",
        title: "Délimiter le territoire",
        body: "Une commune ou une emprise à balayer.",
      },
      {
        n: "02",
        title: "Croiser règles et bâti",
        body: "Surface de plancher autorisée par le PLU d'un côté, surface existante estimée par le RNB de l'autre.",
      },
      {
        n: "03",
        title: "Classer par fiabilité",
        body: "Les candidats dont les données sont fragiles sont signalés comme à qualifier, pas présentés comme des certitudes.",
      },
      {
        n: "04",
        title: "Vérifier sur place",
        body: "Visite, vue aérienne récente, échange avec la mairie : puis étude détaillée de la parcelle retenue.",
      },
    ],
  },

  sources: {
    title: "Les données mobilisées",
    intro: "Les données publiques que le moteur croise pour repérer un potentiel résiduel.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface des parcelles.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de zone.",
      "Référentiel national des bâtiments (RNB) : bâtiments recensés sur chaque parcelle.",
      "Indicateur communal de consommation d'espaces naturels, agricoles et forestiers.",
    ],
    note:
      "La couverture du RNB est hétérogène selon les territoires : un bâtiment absent de la base n'est pas un bâtiment absent du terrain.",
  },

  limits: {
    title: "Ce que le repérage ne dit pas",
    intro: "Une liste de candidats est un point de départ, pas un inventaire de terrains disponibles.",
    items: [
      "Fonciable ne dit pas si une parcelle est une dent creuse au sens d'un PLU ou d'un SCoT : il calcule un potentiel résiduel à partir des règles lues et du bâti recensé.",
      "Un bâtiment absent du RNB peut exister : les parcelles « occupation inconnue » doivent être vérifiées sur place ou sur une vue aérienne récente.",
      "La volonté de vendre du propriétaire, les servitudes de droit privé et l'état du sol ne figurent dans aucune des données utilisées.",
      "Accès, réseaux et règles graphiques peuvent rendre inconstructible un terrain qui paraît libre.",
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation : la constructibilité se confirme auprès de la mairie.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une dent creuse en urbanisme ?",
      a: "C'est une expression imagée qui désigne une parcelle non bâtie ou de faible hauteur située au milieu de constructions plus hautes, comme une dent manquante dans une rangée. Ce n'est pas une zone du PLU : son sens exact dépend du document qui l'emploie.",
    },
    {
      q: "Une dent creuse est-elle toujours constructible ?",
      a: "Non. Tout dépend de la zone et du règlement du PLU, des servitudes, des risques, de l'accès et des réseaux. Un terrain libre entre deux maisons peut être inconstructible, par exemple s'il est classé en zone naturelle ou grevé d'une servitude.",
    },
    {
      q: "Pourquoi parle-t-on de dents creuses avec la loi Climat et résilience ?",
      a: "Parce que cette loi a inscrit dans le code de l'urbanisme la lutte contre l'artificialisation des sols, qui passe notamment par l'optimisation de la densité des espaces déjà urbanisés (art. L101-2-1). Construire dans une dent creuse densifie sans consommer d'espace naturel, agricole ou forestier.",
    },
    {
      q: "Fonciable détecte-t-il les dents creuses ?",
      a: "Pas en tant que telles. Son moteur de prospection repère les parcelles dont la surface de plancher autorisée dépasse nettement la surface existante estimée, et classe à part celles où aucun bâtiment n'est recensé, en « occupation inconnue ». Une partie de ces candidats peut correspondre à des dents creuses ; la vérification sur place reste nécessaire.",
    },
  ],

  finalCta: {
    title: "Parlons d'un territoire que vous connaissez",
    body: "Apportez une commune : nous vous montrerons comment Fonciable fait remonter un potentiel résiduel et signale les données fragiles.",
    label: "Prendre rendez-vous",
  },
};
