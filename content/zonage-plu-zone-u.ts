import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-u.
 *
 * Requêtes cibles (IMPLEMENTATION_PLAN § E5) : « zone u », « zone ua »,
 * « zone ub ». Aucune règle chiffrée générale : UA et UB sont des
 * sous-secteurs propres à chaque PLU.
 *
 * Textes : R151-18 (LEGIARTI000031720615) et R151-19 (LEGIARTI000031720613),
 * Légifrance, consultés le 2026-10-20, en vigueur depuis le 01/01/2016.
 *
 * Affirmations sur l'outil (sas-plu-3d, commit 1e2ba0a) : zone lue dans le
 * GPU et rattachée au document en vigueur (src/lib/plu-gpu-link.ts:1-16) ;
 * tous les secteurs de la parcelle relevés (src/lib/parcel-plu-proof.ts:1-21) ;
 * règlement lu, règles avec provenance (src/lib/plu-engine.ts `PluRagSnippet`,
 * src/lib/feasibility-finance.ts `ConstraintSourceKind`) ; servitudes
 * bloquantes (src/config/plu-definitions.ts:60-80, src/lib/plu-engine.ts:2738-2745).
 *
 * Exemple réel : docs/PREUVES-page-analyse-plu.md §1 (relevé du 2026-10-20).
 *
 * 2026-10-30 : liens vers les pages filles /zonage-plu/zone-ua, zone-ub et
 * zone-uc (bloc « Zone UA, zone UB » et `related`).
 */
export const ZONE_U: MetierPageContent = {
  slug: "/zonage-plu/zone-u",
  navLabel: "Zone U",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/zonage-plu/zone-ua", "/zonage-plu/zone-ub", "/zonage-plu/zone-uc", "/analyse-plu-parcelle", "/zonage-plu/zone-au", "/zonage-plu/zone-a", "/zonage-plu/zone-n", "/terrain-constructible", "/emprise-au-sol"],

  metaTitle: "Zone U du PLU : définition, zones UA et UB",
  metaDescription:
    "Zone U du PLU : définition de l'article R151-18, ce que recouvrent les secteurs UA ou UB, et ce qu'il faut vérifier avant de construire en zone urbaine.",
  dateModified: "2026-10-30",

  eyebrow: "Zonage PLU · zone urbaine · UA · UB",
  h1: "Zone U du PLU : la zone urbaine et ses secteurs UA, UB",
  lede:
    "La zone U est la zone urbaine du plan local d'urbanisme. Le code de l'urbanisme la définit en une phrase ; chaque commune la découpe ensuite en secteurs (UA, UB, UC…) aux règles différentes. Voici la définition exacte, la façon de lire ces secteurs, et ce qu'il reste à vérifier avant de construire.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle en zone urbaine.",

  guide: {
    kicker: "Définition",
    title: "Ce que dit le code de l'urbanisme",
    blocks: [
      {
        title: "La définition de la zone U",
        paragraphs: [
          "« Les zones urbaines sont dites \"zones U\". Peuvent être classés en zone urbaine, les secteurs déjà urbanisés et les secteurs où les équipements publics existants ou en cours de réalisation ont une capacité suffisante pour desservir les constructions à implanter. »",
          "Deux critères, alternatifs : un secteur déjà urbanisé, ou un secteur suffisamment desservi par les équipements publics. Le classement en zone U est un choix de la collectivité dans son PLU, encadré par ces critères.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-18 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615" }],
      },
      {
        title: "Une variante possible dans les PLU intercommunaux",
        paragraphs: [
          "Un PLU intercommunal peut réglementer une ou plusieurs zones urbaines en y appliquant uniquement une liste d'articles du règlement national d'urbanisme, sans y ajouter d'autres règles. Le règlement de la zone renvoie alors à ces articles.",
        ],
        sources: [{ label: "art. R151-19 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720613" }],
      },
      {
        title: "Zone UA, zone UB : ce que disent ces lettres",
        paragraphs: [
          "UA, UB, UC ou UMap ne sont pas des catégories du code : ce sont des secteurs de la zone U que chaque PLU crée et nomme. Dans beaucoup de communes, UA désigne le tissu ancien et dense du centre et UB des extensions plus récentes, mais c'est une habitude, pas une règle. La hauteur, l'emprise au sol ou l'implantation d'une zone UB se lisent dans le règlement de la commune concernée, et nulle part ailleurs.",
          "Chaque secteur a sa page, avec des exemples réels relevés au Géoportail de l'Urbanisme : la zone UA, souvent le centre ancien ; la zone UB, souvent ses premières extensions ; la zone UC, pavillonnaire dans certains PLU, collective ou mixte dans d'autres.",
        ],
        link: {
          text: "Définition et exemples réels d'une zone UB sur",
          href: "/zonage-plu/zone-ub",
          label: "la page Zone UB du PLU",
        },
      },
      {
        title: "Ce qu'il faut vérifier en zone U",
        paragraphs: ["Le classement en zone U indique que la construction y est en principe admise. Il ne garantit pas qu'un projet donné sera autorisé."],
        list: [
          "Le règlement du secteur : destinations admises, emprise au sol, hauteur, implantation, espaces verts, stationnement.",
          "Une éventuelle orientation d'aménagement et de programmation sur le secteur.",
          "Les servitudes d'utilité publique : abords de monument historique, plan de prévention des risques, etc.",
          "La desserte : un permis peut être refusé si les réseaux sont insuffisants.",
          "Les secteurs qui touchent la parcelle : une limite de zone peut la couper.",
        ],
        link: {
          text: "La méthode complète est détaillée sur",
          href: "/terrain-constructible",
          label: "la page Savoir si un terrain est constructible",
        },
      },
    ],
  },

  problem: {
    title: "« Zone U » ne dit pas ce qu'on peut construire",
    body: [
      "Entre deux secteurs U d'une même commune, les hauteurs et emprises admises peuvent varier fortement. Et un secteur U peut porter une servitude qui interdit tout projet sur une partie du terrain.",
    ],
    points: [
      { title: "Le secteur compte plus que la zone", body: "Les règles utiles sont celles du secteur (UA, UB, UMap…), dans le règlement de la commune." },
      { title: "Les servitudes se superposent", body: "Une servitude d'utilité publique s'ajoute aux règles de zone, et peut être plus contraignante." },
      { title: "La desserte reste à vérifier", body: "Voirie et réseaux conditionnent la délivrance d'un permis, même en zone urbaine." },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit pour une parcelle en zone U",
    intro: "L'outil relève le secteur exact et les règles qui en découlent, chacune avec sa source.",
    items: [
      { ref: "ZU.01", title: "Secteur exact et document en vigueur", body: "Le secteur (par exemple UMap) est lu dans le Géoportail de l'Urbanisme et rattaché au document en vigueur ; tous les secteurs qui touchent la parcelle sont relevés." },
      { ref: "ZU.02", title: "Règles du secteur avec leur provenance", body: "Emprise au sol, hauteur, retraits et espaces verts : chaque règle indique si elle vient de la base de zones, de la lecture du règlement, d'un profil de repli ou d'une estimation." },
      { ref: "ZU.03", title: "Servitudes bloquantes", body: "Site classé, espace boisé classé et canalisation de matières dangereuses sont traités comme bloquants ; un plan de prévention des risques l'est en zone rouge." },
    ],
  },

  steps: {
    title: "Lire une parcelle en zone U",
    items: [
      { n: "01", title: "Identifier le secteur", body: "Libellé et type de zone, depuis le Géoportail de l'Urbanisme." },
      { n: "02", title: "Lire le règlement du secteur", body: "Les règles qui déterminent le volume constructible, avec leur source." },
      { n: "03", title: "Ajouter servitudes et risques", body: "Servitudes d'utilité publique disponibles et risques recensés." },
    ],
  },

  sources: {
    title: "Les données publiques consultées",
    intro: "Les sources réellement interrogées par le produit pour une parcelle en zone urbaine.",
    items: [
      "Géoportail de l'Urbanisme (GPU) : secteur, document en vigueur et règlement.",
      "API Carto du GPU : servitudes d'utilité publique disponibles.",
      "Géorisques : risques recensés.",
    ],
    note: "Si la commune ne publie pas son document sur le Géoportail de l'Urbanisme, le secteur n'est pas garanti : la mairie fait foi.",
  },

  proof: {
    title: "Un secteur U réel, et un permis refusé",
    intro: "La zone U n'est pas une garantie : sur cette parcelle nantaise en secteur urbain, un permis de construire a été refusé.",
    tag: "Exemple réel · parcelle 44109000BZ0070 · Nantes",
    rows: [
      { label: "Secteur (PLUm de Nantes Métropole)", value: "UMap, type U" },
      { label: "Surface cadastrale", value: "538 m²" },
      { label: "Décision publiée", value: "Refus d'un permis de construire, 8 octobre 2026" },
    ],
    caption:
      "Valeurs relevées le 20 octobre 2026 : zone au Géoportail de l'Urbanisme, surface à l'API Carto Cadastre de l'IGN, décision au jeu de données ouvert de Nantes Métropole (Licence Ouverte). Le motif du refus n'est pas publié ; ce refus ne préjuge pas d'un autre projet.",
  },

  limits: {
    title: "Limites",
    intro: "La lecture du zonage cadre une étude, elle ne vaut pas autorisation.",
    items: [
      "Les règles d'un secteur UA ou UB n'ont pas de valeur générale : seul le règlement de la commune fait foi.",
      "Une modification ou une révision en cours peut changer le secteur ou ses règles.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une zone U dans un PLU ?",
      a: "C'est une zone urbaine. Selon l'article R151-18 du code de l'urbanisme, peuvent y être classés les secteurs déjà urbanisés et ceux où les équipements publics existants ou en cours de réalisation ont une capacité suffisante pour desservir les constructions à implanter.",
    },
    {
      q: "Qu'est-ce qu'une zone UA ?",
      a: "Un secteur de la zone urbaine créé par le PLU d'une commune. Il correspond souvent au centre ancien, mais ses règles (hauteur, emprise, implantation) sont propres à chaque PLU et se lisent dans son règlement.",
    },
    {
      q: "Qu'est-ce qu'une zone UB ?",
      a: "Un autre secteur de la zone urbaine, défini par chaque PLU, souvent pour des quartiers d'extension. Il n'existe aucune règle nationale pour une zone UB : il faut lire le règlement de la commune.",
    },
    {
      q: "Peut-on construire en zone U ?",
      a: "En principe oui, dans le respect du règlement du secteur, des servitudes et des conditions de desserte. Seule l'instruction d'une demande par la mairie dit si un projet précis est autorisé ; un certificat d'urbanisme fige les règles pendant dix-huit mois.",
    },
  ],

  finalCta: {
    title: "Parlons d'une parcelle en zone urbaine",
    body: "Apportez une adresse : nous vous montrerons le secteur exact, ses règles et leurs sources dans Fonciable.",
    label: "Prendre rendez-vous",
  },
};
