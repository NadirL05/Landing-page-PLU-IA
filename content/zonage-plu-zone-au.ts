import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-au.
 *
 * Requêtes cibles (IMPLEMENTATION_PLAN § E5) : « zone au », « zone aua »,
 * « zone 1au », « zone 2au ». Aucune règle chiffrée générale : AUa, 1AU, 2AU
 * sont des appellations propres à chaque PLU.
 *
 * Texte : R151-20 (LEGIARTI000031720611), Légifrance, consulté le
 * 2026-10-20, en vigueur depuis le 01/01/2016. L'article R151-20-1
 * (dérogation propre aux opérations d'intérêt national pour une installation
 * nucléaire de base, en vigueur depuis le 01/07/2021) n'est pas détaillé.
 *
 * Affirmations sur l'outil (sas-plu-3d, commit 1e2ba0a) :
 *  - zone AU fermée (typezone CNIG « AUs », libellé 2AU / IIAU) détectée,
 *    typezone prioritaire sur le libellé : src/config/plu-definitions.ts:86-97 ;
 *  - contrainte bloquante « ZONE_AU_FERMEE » : src/lib/plu-engine.ts:2913-2925 ;
 *    aucune surface constructible en zone AU fermée :
 *    src/lib/plu/constraints-snapshot.ts:106-111 ;
 *  - zones AU jamais confondues avec les zones A : src/lib/gisement-sources.ts:2004-2006,
 *    src/lib/plu-zone-feed.ts:50-52.
 */
export const ZONE_AU: MetierPageContent = {
  slug: "/zonage-plu/zone-au",
  navLabel: "Zone AU",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/zonage-plu/zone-u", "/zonage-plu/zone-a", "/zonage-plu/zone-n", "/prospection-fonciere"],

  metaTitle: "Zone AU du PLU : 1AU, 2AU, AUa, ce qui change",
  metaDescription:
    "Zone AU du PLU : définition (art. R151-20), zone à urbaniser ouverte ou fermée (1AU, 2AU), ce que signifie une zone AUa, et ce qu'il faut vérifier.",
  dateModified: "2026-10-20",

  eyebrow: "Zonage PLU · zone à urbaniser · 1AU · 2AU · AUa",
  h1: "Zone AU du PLU : zone à urbaniser, ouverte ou fermée",
  lede:
    "La zone AU accueille l'urbanisation future de la commune. Le code de l'urbanisme distingue deux situations : la zone ouverte, où l'on peut construire selon des conditions d'aménagement, et la zone fermée, qui attend une évolution du PLU. Voici la définition exacte, la lecture des appellations 1AU, 2AU ou AUa, et ce que Fonciable signale.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain en zone à urbaniser.",

  guide: {
    kicker: "Définition",
    title: "Ce que dit le code de l'urbanisme",
    blocks: [
      {
        title: "La définition de la zone AU",
        paragraphs: [
          "Les zones à urbaniser sont dites « zones AU ». Peuvent y être classés les secteurs destinés à être ouverts à l'urbanisation. Tout dépend ensuite des voies ouvertes au public et des réseaux d'eau, d'électricité et, le cas échéant, d'assainissement existant à la périphérie immédiate de la zone.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-20 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720611" }],
      },
      {
        title: "Zone AU ouverte : construire selon les conditions d'aménagement",
        paragraphs: [
          "Si ces voies et réseaux ont une capacité suffisante pour toute la zone, et que des orientations d'aménagement et de programmation (et, le cas échéant, le règlement) ont défini les conditions d'aménagement et d'équipement, les constructions sont autorisées : soit lors d'une opération d'aménagement d'ensemble, soit au fur et à mesure de la réalisation des équipements internes prévus.",
          "Lire l'OAP du secteur est donc indispensable : c'est souvent elle qui fixe l'organisation, les accès et le phasage.",
        ],
      },
      {
        title: "Zone AU fermée : attendre une évolution du PLU",
        paragraphs: [
          "Si ces voies et réseaux sont insuffisants, l'ouverture de la zone à l'urbanisation est subordonnée à une modification ou à une révision du PLU, comportant notamment les orientations d'aménagement et de programmation de la zone. Tant que cette évolution n'a pas eu lieu, la zone n'est pas ouverte aux constructions auxquelles elle est destinée.",
        ],
      },
      {
        title: "1AU, 2AU, AUa : des appellations locales",
        paragraphs: [
          "Le code ne connaît que la zone AU. Beaucoup de PLU notent « 1AU » les zones ouvertes et « 2AU » les zones fermées, et ajoutent des lettres pour des secteurs particuliers : une zone AUa ou 1AUa est un secteur de la zone à urbaniser propre au PLU de la commune, avec ses règles et souvent son OAP. Aucune règle générale ne s'attache à ces noms : il faut lire le règlement et l'OAP de la commune.",
          "Dans les données du Géoportail de l'Urbanisme, le type de zone normalisé distingue la zone AU ouverte de la zone AU fermée, quel que soit le libellé choisi par la commune.",
        ],
      },
    ],
  },

  problem: {
    title: "Une zone AU n'est pas une zone constructible comme les autres",
    body: [
      "Pour un opérateur, une zone AU est souvent l'endroit où se trouvent les grands terrains. Encore faut-il savoir si elle est ouverte, à quelles conditions d'aménagement, et si un projet isolé y est possible ou s'il faut une opération d'ensemble.",
    ],
    points: [
      { title: "Ouverte ou fermée", body: "La différence change tout : dans un cas un projet peut être instruit, dans l'autre il faut attendre une évolution du PLU." },
      { title: "L'OAP organise le secteur", body: "Accès, programme, phasage : l'orientation d'aménagement s'impose aux projets du secteur." },
      { title: "AU n'est pas A", body: "Une confusion entre zone à urbaniser (AU) et zone agricole (A) fausse une prospection entière." },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable signale pour une zone AU",
    intro: "L'outil distingue les zones à urbaniser ouvertes et fermées, et ne les confond jamais avec les zones agricoles.",
    items: [
      { ref: "ZAU.01", title: "Zone AU fermée détectée", body: "Une zone AU fermée (type normalisé AUs, ou libellé 2AU) reçoit une contrainte bloquante : ouverture à l'urbanisation conditionnée à une modification du PLU. Aucune surface constructible n'y est calculée." },
      { ref: "ZAU.02", title: "Type normalisé avant libellé", body: "Les libellés étant libres, le type de zone normalisé fait foi en priorité pour savoir si la zone est ouverte ou fermée." },
      { ref: "ZAU.03", title: "AU distinguée de A", body: "Les zones à urbaniser ne sont jamais rangées parmi les zones agricoles inconstructibles, y compris en prospection foncière." },
    ],
  },

  steps: {
    title: "Lire une parcelle en zone AU",
    items: [
      { n: "01", title: "Identifier le secteur et son type", body: "Libellé local et type normalisé, lus dans le Géoportail de l'Urbanisme." },
      { n: "02", title: "Savoir si la zone est ouverte", body: "Une zone fermée est signalée comme bloquante tant que le PLU n'a pas évolué." },
      { n: "03", title: "Lire règlement et OAP", body: "Les conditions d'aménagement de la zone ouverte se lisent dans l'OAP et le règlement de la commune." },
    ],
  },

  sources: {
    title: "Les données publiques consultées",
    intro: "Les sources réellement interrogées par le produit pour une parcelle en zone à urbaniser.",
    items: [
      "Géoportail de l'Urbanisme (GPU) : secteur, type de zone, document en vigueur et règlement.",
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
    ],
    note: "Les orientations d'aménagement et de programmation se lisent dans le dossier du PLU : vérifiez-les auprès de la collectivité.",
  },

  limits: {
    title: "Limites",
    intro: "Le statut d'une zone AU évolue avec le PLU.",
    items: [
      "Une modification ou une révision en cours peut ouvrir ou fermer une zone avant d'apparaître dans les données publiques.",
      "Les conditions d'aménagement d'une zone ouverte (OAP, opération d'ensemble) ne sont pas évaluées automatiquement : elles se lisent dans le dossier du PLU.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une zone AU ?",
      a: "Une zone à urbaniser : un secteur destiné à être ouvert à l'urbanisation (article R151-20 du code de l'urbanisme). On peut y construire selon les conditions d'aménagement fixées par le PLU si les voies et réseaux en périphérie sont suffisants ; sinon, son ouverture passe par une modification ou une révision du PLU.",
    },
    {
      q: "Qu'est-ce qu'une zone AUa ?",
      a: "Un secteur de la zone à urbaniser créé par le PLU d'une commune, souvent associé à une orientation d'aménagement particulière. Ses règles sont propres à ce PLU : il n'existe pas de définition nationale de la zone AUa.",
    },
    {
      q: "Quelle différence entre 1AU et 2AU ?",
      a: "Dans beaucoup de PLU, 1AU désigne une zone à urbaniser ouverte, constructible selon les conditions d'aménagement prévues, et 2AU une zone fermée, dont l'ouverture suppose une modification ou une révision du PLU. Ce n'est qu'une convention : le règlement de la commune fait foi.",
    },
    {
      q: "Peut-on construire en zone 2AU ?",
      a: "En règle générale, pas de construction neuve tant que la zone n'a pas été ouverte à l'urbanisation par une modification ou une révision du PLU. Le règlement de la zone et le service urbanisme précisent ce qui reste possible.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain en zone à urbaniser",
    body: "Apportez une adresse : nous vous montrerons comment Fonciable lit son secteur et signale une zone fermée.",
    label: "Prendre rendez-vous",
  },
};
