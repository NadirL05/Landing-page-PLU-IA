import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /certificat-urbanisme.
 *
 * Requête cible (brief SEO 15, sujet 4, validé par Nadir le 26/10/2026) :
 * « certificat d'urbanisme ». Plan : IMPLEMENTATION_PLAN § J4.
 *
 * Textes officiels cités (consultés le 2026-10-26) :
 *  - art. L410-1 du code de l'urbanisme, LEGIARTI000037667619, version en
 *    vigueur depuis le 25/11/2018 (loi n° 2018-1021, art. 59) : contenu du
 *    CU a) et b), gel des règles pendant 18 mois sauf sécurité et salubrité
 *    publique, mention des avis de l'État et des cas de sursis à statuer ;
 *  - art. R*410-1 (contenu de la demande), LEGIARTI000031764607 ;
 *    R*410-3 (dépôt en mairie), LEGIARTI000048391082 ;
 *    R*410-9 (délai d'un mois, CU a), LEGIARTI000006818970 ;
 *    R*410-10 (deux mois, CU b), LEGIARTI000031764615 ;
 *    R*410-12 (CU tacite), LEGIARTI000006818978 ;
 *    R*410-17 (prorogation par périodes d'une année), LEGIARTI000006818991 ;
 *    R*410-17-1 (silence de deux mois = prorogation), LEGIARTI000025415341 ;
 *    liste et identifiants lus sur la section LEGISCTA000006143463 ;
 *  - service-public.gouv.fr F1633 (vérifiée le 02/07/2025 selon la page) :
 *    gratuité, validité de 18 mois, nombre d'exemplaires, CU tacite.
 *
 * Affirmations sur l'outil :
 *  - Fonciable ne délivre ni CU ni autorisation (déjà publié :
 *    content/analyse-plu-parcelle.ts, faisabilite-fonciere.ts, charge-fonciere.ts) ;
 *  - module division : le CU opérationnel est la première étape listée :
 *    sas-plu-3d src/lib/division-text.ts:53-62 (commit d4f460d) ;
 *  - vérifications amont : zonage GPU, servitudes via l'API Carto GPU
 *    (src/lib/plu-engine.ts:769), risques Géorisques (:763) ;
 *  - les CU sont écartés des données de dossiers publiées (Montpellier
 *    Méditerranée Métropole) : src/lib/metropole-permits.ts:7. La page ne
 *    laisse pas croire que Fonciable affiche des CU délivrés.
 */
export const CERTIFICAT_URBANISME: MetierPageContent = {
  slug: "/certificat-urbanisme",
  navLabel: "Certificat d'urbanisme",
  related: ["/terrain-constructible", "/division-parcellaire", "/analyse-plu-parcelle", "/zonage-plu", "/faisabilite-fonciere"],

  metaTitle: "Certificat d'urbanisme : CUa, CUb, délais",
  metaDescription:
    "Certificat d'urbanisme : CU d'information ou opérationnel, délais d'instruction, validité de 18 mois, prorogation, et ce qu'il faut vérifier avant.",
  dateModified: "2026-10-26",
  article: { datePublished: "2026-10-26" },

  eyebrow: "Certificat d'urbanisme · CUa · CUb",
  h1: "Certificat d'urbanisme : CU d'information ou opérationnel",
  lede:
    "Le certificat d'urbanisme est un document gratuit, délivré au nom de la commune ou de l'État, qui indique les règles d'urbanisme applicables à un terrain et, s'il est opérationnel, si un projet précis y est réalisable. Il fige ces règles pendant dix-huit mois. Cette page explique les deux types de certificat, les délais, la durée de validité, ce que le certificat garantit ou non, et ce qu'on peut vérifier avant de le demander.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain avant votre demande de certificat.",

  guide: {
    kicker: "Textes et démarche",
    title: "Ce que dit le code de l'urbanisme",
    intro:
      "Textes consultés sur Légifrance et service-public.gouv.fr le 26 octobre 2026. Les délais et conditions ci-dessous sont ceux des textes en vigueur à cette date.",
    blocks: [
      {
        title: "À quoi sert un certificat d'urbanisme ?",
        paragraphs: [
          "Le certificat d'urbanisme renseigne sur un terrain avant toute demande d'autorisation. Il n'autorise rien : ce n'est ni un permis, ni une déclaration préalable. Son intérêt principal est la stabilité qu'il donne : si une demande de permis ou une déclaration préalable est déposée dans les dix-huit mois qui suivent sa délivrance, les règles d'urbanisme, le régime des taxes et participations et les limitations administratives au droit de propriété en vigueur à la date du certificat ne peuvent pas être remis en cause, sauf les dispositions qui touchent à la sécurité ou à la salubrité publique.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. L410-1 (Légifrance, version du 25/11/2018, consulté le 26/10/2026)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037667619" },
        ],
      },
      {
        title: "CU d'information (CUa) ou CU opérationnel (CUb)",
        paragraphs: ["L'article L410-1 distingue deux contenus, selon la demande :"],
        list: [
          "CU d'information, dit CUa (article L410-1, a) : il indique les dispositions d'urbanisme, les limitations administratives au droit de propriété et la liste des taxes et participations d'urbanisme applicables au terrain. Il convient quand aucun projet précis n'est encore défini.",
          "CU opérationnel, dit CUb (article L410-1, b) : quand la demande précise la nature de l'opération, la localisation approximative et la destination des bâtiments, il indique en plus si le terrain peut être utilisé pour cette opération et l'état des équipements publics existants ou prévus qui le desservent.",
          "Dans les deux cas, le certificat mentionne si le projet nécessitera l'avis ou l'accord d'un service de l'État, et si un sursis à statuer pourrait être opposé à une demande ultérieure.",
        ],
        link: {
          text: "Avant une division, le CU opérationnel est souvent la première étape : voir",
          href: "/division-parcellaire",
          label: "la page Division parcellaire",
        },
      },
      {
        title: "Demande, délais et durée de validité",
        paragraphs: [
          "La demande est adressée au maire de la commune où se trouve le terrain, sur place, par courrier ou par voie électronique si la commune le propose. Elle précise l'identité du demandeur, la localisation, la superficie et les références cadastrales du terrain, avec un plan de situation ; pour un CU opérationnel, s'y ajoute une note décrivant succinctement l'opération. Service-public.gouv.fr indique que la demande est gratuite et qu'elle se fait en deux exemplaires pour un CU d'information, quatre pour un CU opérationnel, davantage dans certains périmètres protégés.",
        ],
        list: [
          "Délai d'instruction : un mois pour un CU d'information (art. R*410-9), deux mois pour un CU opérationnel (art. R*410-10).",
          "Silence de l'administration : à l'expiration du délai, il vaut certificat tacite, qui n'a que l'effet de gel des règles prévu par l'article L410-1 (art. R*410-12).",
          "Durée de validité : dix-huit mois (art. L410-1 ; service-public.gouv.fr).",
          "Prorogation : par périodes d'une année, sur demande présentée au moins deux mois avant l'expiration, si les règles, servitudes et taxes applicables n'ont pas changé (art. R*410-17) ; sans réponse dans les deux mois, la prorogation est acquise (art. R*410-17-1).",
        ],
        sources: [
          { label: "art. R*410-1 (contenu de la demande)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031764607" },
          { label: "art. R*410-3 (dépôt en mairie)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048391082" },
          { label: "art. R*410-9", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006818970" },
          { label: "art. R*410-10", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031764615" },
          { label: "art. R*410-12", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006818978" },
          { label: "art. R*410-17", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006818991" },
          { label: "art. R*410-17-1", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000025415341" },
          { label: "Certificat d'urbanisme (service-public.gouv.fr, F1633)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1633" },
        ],
      },
      {
        title: "Ce que le certificat fige, et ce qu'il ne garantit pas",
        paragraphs: [
          "Le certificat fige des règles, pas un projet. Un CU opérationnel positif dit que le terrain peut accueillir l'opération décrite à grands traits ; il ne vaut pas accord sur un projet détaillé, qui sera instruit au moment du permis au regard des règles gelées. Les règles de sécurité et de salubrité publique restent applicables même si elles changent pendant les dix-huit mois.",
          "Le certificat ne dit rien non plus de ce que les textes d'urbanisme ne couvrent pas : l'état du sol, les servitudes de droit privé, la volonté du propriétaire de vendre ou le prix du terrain.",
        ],
      },
      {
        title: "Préparer sa demande : ce qu'on peut vérifier avant",
        paragraphs: [
          "Beaucoup d'informations publiques permettent de savoir, avant de déposer, si la demande a des chances d'aboutir et comment la formuler : la zone du PLU et le document en vigueur sur le Géoportail de l'Urbanisme, les règles du règlement de zone, les servitudes d'utilité publique publiées, les risques recensés sur Géorisques. Cette lecture préalable aide à décrire l'opération d'un CU opérationnel de façon réaliste.",
        ],
        link: {
          text: "La méthode complète en six vérifications est décrite sur",
          href: "/terrain-constructible",
          label: "la page Savoir si un terrain est constructible",
        },
      },
    ],
  },

  problem: {
    title: "Deux mois d'instruction pour une question que l'on peut souvent trier avant",
    body: [
      "Le CU opérationnel prend deux mois d'instruction. Pour un opérateur qui étudie plusieurs terrains, en demander un pour chaque piste n'est pas réaliste : il faut d'abord trier.",
      "Ce tri repose sur des données publiques dispersées : zonage, règlement, servitudes, risques. Les réunir parcelle par parcelle prend du temps, et c'est ce temps que le certificat ne fait pas gagner.",
    ],
    points: [
      {
        title: "Un CU mal formulé apporte peu",
        body: "Un CU opérationnel répond à l'opération décrite : une description éloignée du projet réel donne une réponse peu utile.",
      },
      {
        title: "Les règles peuvent changer",
        body: "Une révision de PLU en cours peut modifier ce qui est permis : le certificat sert justement à figer les règles applicables.",
      },
      {
        title: "Le certificat ne remplace pas l'étude",
        body: "Il ne chiffre ni la surface constructible, ni le bilan, ni le prix que l'opération peut payer.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable fait, et ne fait pas",
    intro:
      "Fonciable ne délivre pas de certificat d'urbanisme et n'en remplace pas un : c'est un outil d'aide à la décision, pas un acte de l'administration. Il aide à préparer la demande en réunissant les vérifications amont.",
    items: [
      {
        ref: "CU.01",
        title: "Aucun acte opposable",
        body: "Les résultats sont des estimations issues de sources publiques : ni certificat d'urbanisme, ni autorisation, ni conseil juridique.",
      },
      {
        ref: "CU.02",
        title: "Zone et document en vigueur",
        body: "Le zonage de la parcelle est lu dans le Géoportail de l'Urbanisme, avec le règlement de zone quand la commune l'y publie.",
      },
      {
        ref: "CU.03",
        title: "Servitudes publiées",
        body: "Les servitudes d'utilité publique publiées sur le Géoportail de l'Urbanisme sont interrogées via l'API Carto ; leur absence de résultat ne prouve pas leur absence.",
      },
      {
        ref: "CU.04",
        title: "Risques recensés",
        body: "Les risques connus de Géorisques sont relevés pour la parcelle.",
      },
      {
        ref: "CU.05",
        title: "Le CUb dans les étapes d'une division",
        body: "Dans le module de division, le certificat d'urbanisme opérationnel est la première étape listée, avant le bornage et la déclaration préalable.",
      },
    ],
    contextLink: {
      text: "Pour réunir ces vérifications sur une parcelle réelle avant de déposer votre demande :",
      href: "/analyse-plu-parcelle",
      label: "analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "Avant de demander un certificat d'urbanisme",
    items: [
      {
        n: "01",
        title: "Identifier la parcelle",
        body: "Références cadastrales et superficie : la demande les exige.",
      },
      {
        n: "02",
        title: "Lire la zone et les règles",
        body: "Zonage, règlement de zone et document en vigueur sur le Géoportail de l'Urbanisme.",
      },
      {
        n: "03",
        title: "Relever servitudes et risques",
        body: "Servitudes publiées et risques recensés, à compléter en mairie.",
      },
      {
        n: "04",
        title: "Décrire l'opération",
        body: "Pour un CU opérationnel, une note succincte cohérente avec ce que les règles permettent, puis dépôt en mairie.",
      },
    ],
  },

  sources: {
    title: "Les sources interrogées en amont",
    intro: "Les données publiques que Fonciable réunit pour préparer une demande de certificat.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de zone.",
      "Servitudes d'utilité publique, API Carto GPU : servitudes publiées.",
      "Géorisques : risques recensés sur la commune et la parcelle.",
    ],
    note:
      "Toutes les communes ne publient pas leur document d'urbanisme ni toutes leurs servitudes sur le Géoportail de l'Urbanisme : le certificat reste la réponse officielle.",
  },

  limits: {
    title: "Ce qu'une analyse automatisée ne remplace pas",
    intro: "Seule l'administration délivre un certificat d'urbanisme.",
    items: [
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation, et ses résultats ne figent aucune règle.",
      "Fonciable n'affiche pas les certificats d'urbanisme délivrés sur une parcelle.",
      "Une révision de PLU en cours, un sursis à statuer possible ou un avis de service de l'État ne ressortent qu'à l'instruction du certificat.",
      "Les délais et conditions décrits ici sont ceux des textes consultés le 26 octobre 2026 : vérifiez la version en vigueur à la date de votre demande.",
    ],
  },

  faq: [
    {
      q: "Quelle différence entre CU d'information et CU opérationnel ?",
      a: "Le CU d'information (CUa) indique les règles d'urbanisme, les limitations administratives au droit de propriété et les taxes applicables au terrain. Le CU opérationnel (CUb) indique en plus si le terrain peut accueillir l'opération décrite dans la demande et l'état des équipements publics qui le desservent (art. L410-1).",
    },
    {
      q: "Quel est le délai pour obtenir un certificat d'urbanisme ?",
      a: "Un mois pour un CU d'information, deux mois pour un CU opérationnel (art. R*410-9 et R*410-10). Sans réponse à l'expiration du délai, un certificat tacite est acquis, avec le seul effet de gel des règles.",
    },
    {
      q: "Combien de temps un certificat d'urbanisme est-il valable ?",
      a: "Dix-huit mois. Il peut être prorogé par périodes d'une année si les règles, servitudes et taxes n'ont pas changé, sur demande présentée au moins deux mois avant l'expiration (art. R*410-17).",
    },
    {
      q: "Le certificat d'urbanisme vaut-il autorisation de construire ?",
      a: "Non. Il renseigne et fige des règles ; il n'autorise aucune construction. Un permis de construire ou une déclaration préalable reste nécessaire selon le projet.",
    },
    {
      q: "Fonciable remplace-t-il un certificat d'urbanisme ?",
      a: "Non. Fonciable ne délivre aucun acte et ne fige aucune règle. Il réunit les informations publiques utiles avant la demande (zone, règlement, servitudes publiées, risques) pour trier les terrains et formuler un CU opérationnel réaliste.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain avant votre demande",
    body: "Apportez une parcelle : nous vous montrerons ce que Fonciable relève en amont et ce que seul le certificat pourra confirmer.",
    label: "Prendre rendez-vous",
  },
};
