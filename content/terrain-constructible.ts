import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /terrain-constructible.
 *
 * Requêtes cibles (IMPLEMENTATION_PLAN § E3) : « savoir si un terrain est
 * constructible », « constructibilité terrain », « terrain constructible ».
 *
 * Textes officiels cités (consultés le 2026-10-20) :
 *  - art. R151-18, R151-20, R151-22, R151-24 du code de l'urbanisme
 *    (familles de zones), en vigueur depuis le 01/01/2016, Légifrance ;
 *  - art. L111-3 (règle de constructibilité limitée sans PLU ni carte
 *    communale), LEGIARTI000031210179, en vigueur depuis le 01/01/2016 ;
 *  - art. L410-1 (certificat d'urbanisme) via la section Légifrance
 *    LEGISCTA000006143348 ; délais (1 et 2 mois), validité de 18 mois et
 *    gratuité : fiche service-public.gouv.fr F1633 (vérifiée le 02/07/2025).
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit 1e2ba0a) :
 *  - zone lue dans le GPU et rattachée au document en vigueur (zonage,
 *    commune, document courant) : src/lib/plu-gpu-link.ts:1-16 ; commune au
 *    RNU ou sans zonage : aucun lien, src/lib/plu-gpu-link.ts:379 ;
 *  - tous les secteurs qui touchent la parcelle sont relevés ; couche
 *    indisponible = statut inconnu, jamais une absence :
 *    src/lib/parcel-plu-proof.ts:1-21 ;
 *  - zones A et N : contrainte bloquante « ZONE_NON_CONSTRUCTIBLE » :
 *    src/lib/plu-engine.ts:2901-2910, src/config/plu-definitions.ts:84 ;
 *  - zone AU fermée (2AU, AUs) : contrainte bloquante « ZONE_AU_FERMEE » :
 *    src/lib/plu-engine.ts:2913-2925, src/config/plu-definitions.ts:86-97 ;
 *    AU distincte de A : src/lib/gisement-sources.ts:2004-2006 ;
 *  - servitudes d'utilité publique via l'API Carto du GPU :
 *    src/lib/plu-engine.ts:2393-2480 ; site classé, espace boisé classé et
 *    canalisation de transport de matières dangereuses toujours bloquants,
 *    PPRI/PPRT bloquants en zone rouge : src/config/plu-definitions.ts:60-80,
 *    src/lib/plu-engine.ts:2738-2745 ;
 *  - risques Géorisques et aléa argiles : src/lib/plu-engine.ts:685-700, 739 ;
 *  - refus publiés (Paris, Nantes Métropole, Anglet) :
 *    src/lib/permit-refusal/open-data.ts,
 *    components/gisement/published-refusals-panel.tsx:117,138,160.
 *
 * Exemple réel : valeurs revérifiées le 2026-10-20, détail des requêtes
 * dans docs/PREUVES-page-analyse-plu.md §1. Aucune donnée de demandeur.
 */
export const TERRAIN_CONSTRUCTIBLE: MetierPageContent = {
  slug: "/terrain-constructible",
  navLabel: "Terrain constructible",
  related: ["/zonage-plu", "/faisabilite-fonciere", "/analyse-plu-parcelle", "/division-parcellaire", "/charge-fonciere"],

  metaTitle: "Savoir si un terrain est constructible : méthode",
  metaDescription:
    "Terrain constructible : document d'urbanisme, zone du PLU, règles, servitudes et risques, réseaux, certificat d'urbanisme. Méthode et limites.",
  dateModified: "2026-10-20",

  eyebrow: "Constructibilité · zonage · certificat d'urbanisme",
  h1: "Comment savoir si un terrain est constructible ?",
  lede:
    "Un terrain est constructible si le document d'urbanisme de la commune l'autorise, si aucune servitude ou aucun risque ne l'interdit, et s'il peut être desservi. Cette page donne la méthode en six vérifications, les textes qui la fondent, et ce que Fonciable vérifie automatiquement à partir des données publiques.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain dont vous voulez connaître la constructibilité.",

  guide: {
    kicker: "Méthode",
    title: "Six vérifications pour la constructibilité d'un terrain",
    intro:
      "La constructibilité se lit d'abord dans le droit de l'urbanisme, puis sur le terrain. Aucune de ces vérifications ne suffit seule ; seule la mairie, en instruisant une demande, dit ce qui sera autorisé.",
    blocks: [
      {
        title: "1. Identifier le document d'urbanisme applicable",
        paragraphs: [
          "La commune peut être couverte par un plan local d'urbanisme (PLU), un PLU intercommunal (PLUi) ou une carte communale. Sans aucun de ces documents, c'est le règlement national d'urbanisme qui s'applique, avec une règle de constructibilité limitée : les constructions ne peuvent en principe être autorisées que dans les parties urbanisées de la commune, sauf exceptions prévues par la loi.",
          "Le Géoportail de l'Urbanisme publie les documents de nombreuses communes ; pour les autres, le service urbanisme de la mairie reste la source.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. L111-3 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031210179" },
        ],
      },
      {
        title: "2. Trouver la zone de la parcelle",
        paragraphs: [
          "Le règlement du PLU découpe la commune en quatre familles de zones. Les zones urbaines (U) et à urbaniser (AU) sont celles où l'on construit ; les zones agricoles (A) et naturelles et forestières (N) sont protégées, et n'y sont autorisées que des constructions limitativement énumérées, comme celles nécessaires à l'exploitation agricole.",
          "Une zone AU n'est pas toujours ouverte : si les voies et réseaux en périphérie sont insuffisants, son ouverture à l'urbanisation passe par une modification ou une révision du PLU. Ces zones sont souvent signalées « 2AU ».",
        ],
        sources: [
          { label: "art. R151-18 (zones U)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615" },
          { label: "art. R151-20 (zones AU)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720611" },
          { label: "art. R151-22 (zones A)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720607" },
          { label: "art. R151-24 (zones N)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720603" },
        ],
        link: {
          text: "Chaque famille de zones, et les sous-secteurs comme UA, UB ou AUa, sont détaillés sur",
          href: "/zonage-plu",
          label: "la page Zonage PLU",
        },
      },
      {
        title: "3. Lire le règlement de la zone",
        paragraphs: [
          "Être en zone U ne dit pas ce que l'on peut construire. Le règlement de zone fixe les destinations admises, l'emprise au sol, la hauteur, l'implantation par rapport aux voies et aux limites, la part d'espaces verts et le stationnement. Une orientation d'aménagement et de programmation (OAP) peut aussi s'imposer au secteur.",
        ],
      },
      {
        title: "4. Vérifier servitudes et risques",
        paragraphs: [
          "Les servitudes d'utilité publique, annexées au PLU, peuvent limiter ou interdire une construction : abords de monument historique, site classé, plan de prévention des risques, canalisations. Les risques naturels et technologiques se consultent sur Géorisques. Un terrain en zone constructible peut être inconstructible en pratique à cause d'une seule de ces contraintes.",
        ],
      },
      {
        title: "5. Vérifier l'accès et les réseaux",
        paragraphs: [
          "Un terrain doit être accessible et desservi : voirie, eau, électricité, assainissement. Le code de l'urbanisme lie le classement en zone urbaine à la capacité des équipements publics à desservir les constructions. Un permis peut être refusé si ces réseaux sont insuffisants, même en zone U.",
        ],
      },
      {
        title: "6. Demander un certificat d'urbanisme",
        paragraphs: [
          "Le certificat d'urbanisme permet de figer les règles applicables au terrain pendant 18 mois, sauf celles qui touchent à la sécurité ou à la salubrité publique, et sa durée peut être prorogée d'un an. Le certificat d'information indique les règles applicables, les servitudes et les taxes ; le certificat opérationnel dit en plus si un projet précis est réalisable. La demande se fait en mairie, gratuitement ; l'instruction prend un mois pour le premier et deux mois pour le second.",
          "Pendant dix-huit mois après sa délivrance, une demande d'autorisation est examinée au regard des règles en vigueur à la date du certificat. Le certificat n'est pas pour autant une autorisation de construire.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. L410-1 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006143348" },
          { label: "Certificat d'urbanisme (service-public.gouv.fr)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1633" },
        ],
      },
    ],
  },

  problem: {
    title: "« Constructible » se décide à plusieurs endroits à la fois",
    body: [
      "La question paraît binaire ; elle ne l'est pas. Un terrain peut être en zone urbaine et rester inconstructible à cause d'une servitude, d'un risque ou d'un réseau insuffisant. À l'inverse, un terrain en zone agricole n'est pas toujours vierge de droits pour un bâtiment existant.",
      "Pour un professionnel, l'enjeu est de trier vite : écarter les terrains bloqués avant d'y consacrer une visite, une étude ou une offre, et savoir ce qui reste à confirmer en mairie pour les autres.",
    ],
    points: [
      {
        title: "Le zonage est la première réponse, pas la dernière",
        body: "La zone indique la famille de règles applicable. La constructibilité réelle dépend du règlement de cette zone et des contraintes qui s'y superposent.",
      },
      {
        title: "Les contraintes vivent dans des bases séparées",
        body: "Document d'urbanisme, servitudes, risques, décisions passées : chaque information se cherche dans une source différente, avec ses propres trous.",
      },
      {
        title: "Une absence de donnée n'est pas une absence de contrainte",
        body: "Une base muette sur une parcelle ne prouve rien. Une méthode fiable distingue « rien trouvé » de « rien à trouver ».",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable vérifie sur la constructibilité d'une parcelle",
    intro:
      "L'outil rassemble les premières vérifications et dit, pour chacune, ce qu'il a trouvé et d'où cela vient. Rien n'est calculé sur cette page publique.",
    items: [
      {
        ref: "TC.01",
        title: "Zone rattachée au document en vigueur",
        body: "La zone est lue dans le Géoportail de l'Urbanisme et rattachée au document en vigueur de la commune. Tous les secteurs qui touchent la parcelle sont relevés. Pour une commune au règlement national d'urbanisme ou sans zonage rattaché, aucune règle de zone n'est déduite.",
      },
      {
        ref: "TC.02",
        title: "Zones agricoles et naturelles signalées bloquantes",
        body: "Une parcelle en zone A ou N reçoit une contrainte bloquante « zone inconstructible » : aucune surface constructible ni aucun bilan ne sont calculés.",
      },
      {
        ref: "TC.03",
        title: "Zones AU fermées repérées",
        body: "Une zone à urbaniser fermée (2AU, AUs) est signalée comme bloquante tant qu'une modification du PLU ne l'a pas ouverte. Les zones AU ne sont jamais confondues avec les zones agricoles.",
      },
      {
        ref: "TC.04",
        title: "Servitudes d'utilité publique",
        body: "Les servitudes disponibles via l'API Carto du Géoportail de l'Urbanisme sont relevées. Site classé, espace boisé classé et canalisation de matières dangereuses sont traités comme bloquants ; un plan de prévention des risques l'est en zone rouge.",
      },
      {
        ref: "TC.05",
        title: "Risques recensés",
        body: "Risques déclarés sur la commune (Géorisques) et exposition au retrait-gonflement des argiles autour de la parcelle.",
      },
      {
        ref: "TC.06",
        title: "Refus de permis publiés",
        body: "Dans l'espace de prospection, les refus publiés en open data par Paris, Nantes Métropole et Anglet sont affichés avec un lien vers leur source, sans aucune donnée sur le demandeur.",
      },
    ],
    contextLink: {
      text: "La lecture détaillée du zonage et des règles de zone, avec leur source, est présentée sur",
      href: "/analyse-plu-parcelle",
      label: "la page Analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "De l'adresse au premier verdict",
    items: [
      {
        n: "01",
        title: "Choisir la parcelle",
        body: "Par son adresse ou sur la carte : contour et surface viennent de l'API Carto Cadastre de l'IGN.",
      },
      {
        n: "02",
        title: "Lire la zone et le document",
        body: "Le zonage du Géoportail de l'Urbanisme est rattaché au document en vigueur ; les zones bloquantes sont signalées.",
      },
      {
        n: "03",
        title: "Croiser servitudes et risques",
        body: "Servitudes d'utilité publique et risques recensés sont ajoutés, avec la distinction entre « aucun résultat » et « source indisponible ».",
      },
      {
        n: "04",
        title: "Confirmer en mairie",
        body: "Les points restés ouverts se vérifient auprès du service urbanisme, idéalement par un certificat d'urbanisme.",
      },
    ],
  },

  sources: {
    title: "Les données publiques consultées",
    intro: "Les sources réellement interrogées par le produit pour une première lecture de constructibilité.",
    items: [
      "Base Adresse Nationale : résolution de l'adresse saisie.",
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement, quand la commune y publie son document.",
      "API Carto du GPU : servitudes d'utilité publique disponibles.",
      "Géorisques : risques recensés et aléa retrait-gonflement des argiles.",
      "Jeux de données ouverts de Paris, Nantes Métropole et Anglet : refus de permis publiés.",
    ],
    note:
      "Chaque résultat indique sa source. Une source indisponible est affichée comme telle, jamais comme une absence de contrainte.",
  },

  proof: {
    title: "Zone constructible ne veut pas dire permis accordé",
    intro:
      "Un exemple réel, relevé aux sources publiques : la parcelle est en zone urbaine, et un permis de construire y a pourtant été refusé.",
    tag: "Exemple réel · parcelle 44109000BZ0070 · Nantes",
    rows: [
      { label: "Parcelle cadastrale", value: "44109000BZ0070" },
      { label: "Surface cadastrale", value: "538 m²" },
      { label: "Zone du PLUm de Nantes Métropole", value: "UMap (zone urbaine U)" },
      { label: "Décision publiée", value: "Refus d'un permis de construire, 8 octobre 2026" },
    ],
    caption:
      "Valeurs relevées le 20 octobre 2026 : référence et surface à l'API Carto Cadastre de l'IGN, zone au Géoportail de l'Urbanisme, décision au jeu de données « Demandes d'autorisation et décisions d'urbanisme de Nantes Métropole » (data.nantesmetropole.fr, Licence Ouverte). Ce refus concerne un projet précis et ne dit rien de ce qu'un autre projet pourrait obtenir. Le motif du refus n'est pas publié dans ce jeu de données.",
  },

  limits: {
    title: "Ce qu'une vérification automatisée ne tranche pas",
    intro: "Une première lecture trie les terrains. Elle ne remplace ni le certificat d'urbanisme, ni l'instruction d'une demande.",
    items: [
      "Si la commune ne publie pas son document d'urbanisme sur le Géoportail de l'Urbanisme, le zonage n'est pas garanti : la mairie reste la source de référence.",
      "Une modification ou une révision en cours peut changer les règles avant d'apparaître dans les données publiques.",
      "L'absence de servitude ou de risque dans les bases consultées ne prouve pas leur absence sur le terrain.",
      "L'accès, la capacité des réseaux, la nature du sol et les servitudes de droit privé ne se lisent pas dans ces bases.",
      "La surface cadastrale ne remplace pas un bornage par un géomètre-expert.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation, ni un acte opposable.",
    ],
  },

  faq: [
    {
      q: "Comment savoir si un terrain est constructible ?",
      a: "Il faut identifier le document d'urbanisme de la commune (PLU, PLUi, carte communale ou règlement national d'urbanisme), trouver la zone de la parcelle, lire le règlement de cette zone, vérifier les servitudes et les risques, puis l'accès et les réseaux. Pour figer les règles, on demande un certificat d'urbanisme en mairie.",
    },
    {
      q: "Le cadastre indique-t-il si un terrain est constructible ?",
      a: "Non. Le cadastre décrit les parcelles (contour, surface, référence), pas les droits à construire. La constructibilité se lit dans le document d'urbanisme et se confirme par un certificat d'urbanisme.",
    },
    {
      q: "Quelles zones du PLU sont constructibles ?",
      a: "Les zones urbaines (U) et, sous conditions, les zones à urbaniser (AU). Une zone AU dont les réseaux en périphérie sont insuffisants ne s'ouvre qu'après modification ou révision du PLU. En zone agricole (A) ou naturelle (N), seules des constructions limitativement prévues par le code de l'urbanisme peuvent être autorisées.",
    },
    {
      q: "Un terrain en zone U est-il forcément constructible ?",
      a: "Non. Le règlement de zone, une servitude d'utilité publique, un risque, l'insuffisance des réseaux ou la configuration du terrain peuvent empêcher ou limiter un projet. Le classement en zone U indique seulement que la construction y est en principe admise.",
    },
    {
      q: "Combien de temps est valable un certificat d'urbanisme ?",
      a: "Dix-huit mois à compter de sa délivrance. Pendant cette période, une demande d'autorisation est examinée au regard des règles en vigueur à la date du certificat. La demande est gratuite et se dépose en mairie.",
    },
    {
      q: "Que vérifie Fonciable sur la constructibilité ?",
      a: "Fonciable lit la zone de la parcelle dans le Géoportail de l'Urbanisme et la rattache au document en vigueur, signale comme bloquantes les zones A et N et les zones AU fermées, relève les servitudes disponibles et les risques recensés, et indique quand une source est indisponible. C'est une estimation : la mairie reste seule compétente pour confirmer la constructibilité.",
    },
  ],

  finalCta: {
    title: "Vérifions ensemble un terrain que vous étudiez",
    body: "Apportez une adresse : nous vous montrerons ce que Fonciable trouve sur sa constructibilité, et ce qui reste à confirmer en mairie.",
    label: "Prendre rendez-vous",
  },
};
