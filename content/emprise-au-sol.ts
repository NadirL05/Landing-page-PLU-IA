import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /emprise-au-sol.
 *
 * Requêtes cibles (brief SEO 15, sujet 2, validé par Nadir le 26/10/2026) :
 * « emprise au sol », « coefficient d'emprise au sol ». Plan :
 * IMPLEMENTATION_PLAN § J2.
 *
 * Textes officiels cités (consultés le 2026-10-26) :
 *  - art. R*420-1 du code de l'urbanisme (définition « au sens du présent
 *    livre », exclusions), LEGIARTI000028678466, version en vigueur depuis le
 *    01/04/2014 (décret n° 2014-253) ;
 *  - art. R151-39 (le règlement peut fixer emprise au sol et hauteur
 *    maximales), LEGIARTI000031720561, en vigueur depuis le 01/01/2016 ;
 *  - service-public.gouv.fr F2868 (éléments comptés et exclus de l'emprise
 *    au sol ; page vérifiée le 27/11/2024 selon la page).
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit d4f460d du
 * 2026-10-26) :
 *  - champ CES extrait du règlement : src/lib/plu-engine.ts:201-202 ;
 *    lecture de « 0,5 », « 50 % », « CES = 0.6 », « emprise au sol : 40% » :
 *    `parsePluRatio`, plu-engine.ts:2767-2786 ;
 *  - ordre de priorité de la source (règlement, base de zones, profil) et
 *    source affichée : plu-engine.ts:2904-2913 ; avertissement
 *    REGLEMENT_ABSENT : :2915-2924 ;
 *  - emprise effective = min(CES, 1 − part d'espaces verts) :
 *    plu-engine.ts:2938-2940 ; contradiction signalée : :2926-2936 ;
 *  - extrait cité avec page et article quand disponible : plu-engine.ts:253-264 ;
 *  - emprise minimale exploitable 20 m² : src/config/plu-definitions.ts:102-103,
 *    contrainte bloquante PARCELLE_NON_EXPLOITABLE : plu-engine.ts:3133-3144.
 *
 * L'exemple chiffré est entièrement fictif et étiqueté comme tel.
 */
export const EMPRISE_AU_SOL: MetierPageContent = {
  slug: "/emprise-au-sol",
  navLabel: "Emprise au sol",
  related: ["/surface-de-plancher", "/zonage-plu/zone-u", "/terrain-constructible", "/analyse-plu-parcelle", "/faisabilite-fonciere"],

  metaTitle: "Emprise au sol et CES : définition et calcul",
  metaDescription:
    "Emprise au sol : définition de l'article R420-1, ce qui est compté ou non, coefficient d'emprise au sol du PLU, conflit avec les espaces verts, exemple.",
  dateModified: "2026-10-26",
  article: { datePublished: "2026-10-26" },

  eyebrow: "Emprise au sol · CES · règlement de zone",
  h1: "Emprise au sol et coefficient d'emprise au sol (CES)",
  lede:
    "L'emprise au sol est la projection verticale du volume d'une construction sur le terrain, débords et surplombs inclus. Le coefficient d'emprise au sol, quand le PLU en fixe un, limite la part de la parcelle que les constructions peuvent couvrir. Voici la définition légale, ce qui est compté, la lecture du CES, un exemple fictif et ce que Fonciable en calcule.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle et de l'emprise que son règlement autorise.",

  guide: {
    kicker: "Définition et règles",
    title: "Ce que dit le code de l'urbanisme",
    intro:
      "Textes consultés sur Légifrance et service-public.gouv.fr le 26 octobre 2026. Vérifiez la version en vigueur et le règlement de votre commune.",
    blocks: [
      {
        title: "Qu'est-ce que l'emprise au sol ?",
        paragraphs: [
          "Selon l'article R*420-1 du code de l'urbanisme, l'emprise au sol est « la projection verticale du volume de la construction, tous débords et surplombs inclus ». Imaginez la construction vue d'avion, éclairée à la verticale : son ombre portée sur le terrain est son emprise au sol.",
          "Le même article exclut les ornements, comme les éléments de modénature et les marquises, ainsi que les débords de toiture lorsqu'ils ne sont pas soutenus par des poteaux ou des encorbellements. Cette définition vaut pour le livre IV du code, celui des autorisations d'urbanisme. Si le règlement de votre PLU définit l'emprise au sol dans son lexique, lisez cette définition avec la règle de zone.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. R*420-1 (Légifrance, version du 01/04/2014, consulté le 26/10/2026)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028678466" },
        ],
      },
      {
        title: "Ce qui entre dans l'emprise au sol, et ce qui en sort",
        paragraphs: [
          "Service-public.gouv.fr donne des exemples concrets, à rapprocher de l'article R*420-1 :",
        ],
        list: [
          "Comptés : le bâtiment principal et ses annexes, par exemple un abri de jardin, un carport ou une piscine.",
          "Comptés : les débords et surplombs, dont les débords de toiture soutenus par des poteaux ou des encorbellements.",
          "Exclus : les ornements, éléments de modénature et marquises.",
          "Exclus : les débords de toiture non soutenus par des poteaux ou des encorbellements.",
          "Exclus : les aires de stationnement extérieures non couvertes et les terrasses de plain-pied sans fondations profondes.",
        ],
        sources: [
          { label: "Surface de plancher, emprise au sol et surface taxable (service-public.gouv.fr, F2868)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2868" },
        ],
      },
      {
        title: "Le coefficient d'emprise au sol dans le PLU",
        paragraphs: [
          "L'article R151-39 permet au règlement du PLU de fixer, entre autres, une emprise au sol maximale et une hauteur maximale des constructions. C'est une faculté, pas une obligation : un règlement peut ne fixer aucun CES dans une zone, le fixer secteur par secteur, ou encadrer l'emprise autrement, par exemple par une règle graphique.",
          "Le CES s'exprime le plus souvent en pourcentage de la surface du terrain. On le trouve dans l'article du règlement de zone consacré à l'emprise au sol, et cet article peut prévoir des exceptions ou des valeurs différentes selon les secteurs. Lisez l'article entier, pas seulement le chiffre.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. R151-39 (Légifrance, consulté le 26/10/2026)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720561" },
        ],
        link: {
          text: "Pour trouver la zone d'une parcelle et le règlement qui s'y applique, voir",
          href: "/zonage-plu",
          label: "la page Zonage PLU",
        },
      },
      {
        title: "Calculer l'emprise au sol autorisée sur une parcelle",
        paragraphs: [
          "Le calcul de base est simple : surface du terrain × CES. Une parcelle de 500 m² avec un CES de 50 % peut accueillir 250 m² d'emprise au sol, constructions existantes comprises. Il faut ensuite retirer l'emprise des bâtiments déjà présents pour connaître l'emprise encore disponible.",
          "Le calcul se complique quand le règlement impose aussi une part d'espaces verts ou de pleine terre. Si le CES et la part d'espaces verts additionnés dépassent 100 % de la parcelle, les deux règles ne peuvent pas être atteintes ensemble : c'est la plus contraignante qui limite l'emprise réalisable. L'exemple fictif plus bas illustre ce cas.",
        ],
      },
      {
        title: "Emprise au sol et surface de plancher : la différence",
        paragraphs: [
          "L'emprise au sol mesure l'occupation du terrain, sans notion de niveaux. La surface de plancher additionne les surfaces de tous les niveaux, mesurées à l'intérieur. Une construction de 100 m² d'emprise sur trois niveaux développe une surface de plancher bien supérieure à 100 m². Les deux notions servent à déterminer l'autorisation d'urbanisme à demander et à vérifier les règles du PLU.",
        ],
        link: {
          text: "La méthode de calcul de la surface de plancher et ses huit déductions sont détaillées sur",
          href: "/surface-de-plancher",
          label: "la page Calcul de la surface de plancher",
        },
      },
    ],
  },

  problem: {
    title: "Un chiffre de CES ne suffit pas à connaître l'emprise réalisable",
    body: [
      "Le CES se combine avec d'autres règles : espaces verts, retraits, hauteur, implantation. Retenu seul, il peut surestimer ce qu'une parcelle permet, et l'erreur se reporte sur la surface de plancher puis sur le bilan.",
    ],
    points: [
      {
        title: "Le CES n'existe pas partout",
        body: "Une zone sans CES n'est pas une zone sans limite : retraits, hauteur et espaces verts encadrent alors l'implantation.",
      },
      {
        title: "Les règles peuvent se contredire",
        body: "Un CES élevé et une forte part d'espaces verts imposée ne s'appliquent pas ensemble au maximum sur la même parcelle.",
      },
      {
        title: "Les définitions varient",
        body: "Le lexique d'un PLU peut préciser ce qu'il compte dans l'emprise au sol : piscines, terrasses, sous-sols.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit et calcule",
    intro:
      "Fonciable lit le CES dans le règlement de zone quand il est disponible, le combine avec la part d'espaces verts et en déduit l'emprise retenue pour l'enveloppe constructible, avec la source de chaque valeur.",
    items: [
      {
        ref: "ES.01",
        title: "CES extrait du règlement",
        body: "Le coefficient est lu dans le règlement de zone, qu'il soit écrit « 0,5 », « 50 % », « CES = 0.6 » ou « emprise au sol : 40 % ».",
      },
      {
        ref: "ES.02",
        title: "Source affichée",
        body: "Le CES retenu vient d'abord du règlement, à défaut d'une base de zones, à défaut d'un profil statistique ; la source est indiquée et un avertissement s'affiche si le règlement manque.",
      },
      {
        ref: "ES.03",
        title: "Plafond par les espaces verts",
        body: "L'emprise retenue est la plus petite de deux valeurs : le CES, et la part de parcelle laissée libre par les espaces verts imposés.",
      },
      {
        ref: "ES.04",
        title: "Contradictions signalées",
        body: "Si CES et espaces verts additionnés dépassent 100 % de la parcelle, l'outil le signale comme règles contradictoires et plafonne l'emprise.",
      },
      {
        ref: "ES.05",
        title: "Extrait cité",
        body: "Quand l'extraction le permet, la règle s'accompagne de la page et de l'extrait du règlement d'où elle vient.",
      },
      {
        ref: "ES.06",
        title: "Seuil d'exploitation",
        body: "Si l'emprise constructible calculée est inférieure à 20 m², l'outil la signale comme non exploitable, par une contrainte bloquante.",
      },
    ],
    contextLink: {
      text: "Pour voir l'emprise et l'enveloppe calculées sur une parcelle réelle :",
      href: "/analyse-plu-parcelle",
      label: "analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "De la parcelle à l'emprise retenue",
    items: [
      {
        n: "01",
        title: "Choisir la parcelle",
        body: "Par son adresse ou sur la carte : contour et surface viennent du cadastre de l'IGN.",
      },
      {
        n: "02",
        title: "Identifier la zone",
        body: "Zonage lu dans le Géoportail de l'Urbanisme.",
      },
      {
        n: "03",
        title: "Lire CES et espaces verts",
        body: "Les deux règles sont extraites du règlement de zone, avec leur provenance.",
      },
      {
        n: "04",
        title: "Retenir l'emprise",
        body: "L'emprise effective alimente l'enveloppe constructible et le bilan.",
      },
    ],
  },

  sources: {
    title: "Les sources derrière le calcul",
    intro: "Les données publiques interrogées par le produit pour lire l'emprise au sol autorisée.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de zone, quand la commune y publie son document.",
      "Règlement de zone analysé : CES et part d'espaces verts, avec l'extrait cité quand il est disponible.",
    ],
    note:
      "Une règle graphique ou une emprise exprimée autrement qu'en ratio peut ne pas être lue : la lecture du règlement en vigueur reste nécessaire.",
  },

  proof: {
    title: "Quand CES et espaces verts se contredisent",
    intro: "Une parcelle, deux règles de zone, et l'emprise que l'on peut réellement retenir.",
    tag: "Exemple fictif, calcul de principe",
    rows: [
      { label: "Surface de la parcelle", value: "500 m²" },
      { label: "Coefficient d'emprise au sol du règlement", value: "50 %" },
      { label: "Part d'espaces verts imposée", value: "60 %" },
      { label: "CES + espaces verts", value: "110 %, règles contradictoires" },
      { label: "Emprise maximale par le CES seul", value: "250 m²" },
      { label: "Emprise retenue, plafonnée par les espaces verts (40 %)", value: "200 m²" },
    ],
    caption:
      "Exemple entièrement fictif : ni parcelle réelle, ni règlement réel. Selon la définition des espaces verts du PLU, une partie des surfaces non bâties (allées, stationnement) peut ne pas compter comme espace vert, ce qui réduit encore l'emprise réalisable.",
  },

  limits: {
    title: "Ce qu'il faut vérifier ailleurs",
    intro: "L'emprise retenue est un plafond issu des règles lues, pas un plan d'implantation.",
    items: [
      "Retraits par rapport aux voies et aux limites, implantation entre bâtiments et règles graphiques peuvent réduire l'emprise réalisable.",
      "Les constructions déjà présentes consomment une partie de l'emprise autorisée.",
      "Le lexique du PLU peut compter dans l'emprise des éléments que la définition générale exclut, ou l'inverse.",
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation : la conformité d'un projet se confirme auprès du service urbanisme.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce que l'emprise au sol ?",
      a: "C'est la projection verticale du volume de la construction, tous débords et surplombs inclus (art. R*420-1 du code de l'urbanisme). Les ornements, les marquises et les débords de toiture non soutenus par des poteaux ou des encorbellements en sont exclus.",
    },
    {
      q: "Qu'est-ce que le coefficient d'emprise au sol (CES) ?",
      a: "C'est la part maximale de la surface du terrain que les constructions peuvent couvrir, fixée par le règlement du PLU zone par zone. Le règlement n'est pas obligé d'en fixer un (art. R151-39).",
    },
    {
      q: "Une piscine compte-t-elle dans l'emprise au sol ?",
      a: "Service-public.gouv.fr cite la piscine parmi les annexes comptées dans l'emprise au sol, comme l'abri de jardin ou le carport. Vérifiez aussi le lexique de votre PLU, qui peut préciser la règle locale.",
    },
    {
      q: "Comment calculer l'emprise au sol autorisée sur un terrain ?",
      a: "Multipliez la surface du terrain par le CES de la zone, puis retirez l'emprise des constructions existantes. Si le règlement impose aussi une part d'espaces verts, l'emprise réalisable ne peut pas dépasser la part de terrain qu'il laisse libre.",
    },
    {
      q: "Fonciable calcule-t-il l'emprise au sol d'une parcelle ?",
      a: "Il calcule l'emprise maximale retenue pour l'enveloppe constructible (CES du règlement plafonné par les espaces verts, avec sa source). Il ne mesure pas l'emprise d'un projet.",
    },
  ],

  finalCta: {
    title: "Parlons d'une parcelle et de son règlement",
    body: "Apportez une adresse : nous vous montrerons comment Fonciable lit le CES et les espaces verts, et ce qui reste à vérifier.",
    label: "Prendre rendez-vous",
  },
};
