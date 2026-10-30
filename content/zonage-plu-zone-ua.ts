import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-ua.
 *
 * Requêtes cibles : « zone ua », « zone ua définition », « zone ua plu ».
 * Point de doctrine : UA n'est PAS une catégorie du code de l'urbanisme. Le
 * code ne connaît que les zones U, AU, A et N (art. R151-17 à R151-25) ; UA
 * est un nom de secteur choisi par chaque PLU. Aucune règle chiffrée
 * (hauteur, emprise, recul) n'est présentée comme générale.
 *
 * Textes (Légifrance, consultés le 2026-10-30, en vigueur depuis le
 * 01/01/2016) : R151-17 (LEGIARTI000031720617), R151-18 (…615), R151-19
 * (…613), R151-39 (…561).
 *
 * Exemples réels : libellés longs des secteurs relevés le 2026-10-30 dans la
 * couche des zones d'urbanisme du Géoportail de l'Urbanisme (API Carto IGN,
 * https://apicarto.ign.fr/api/gpu/zone-urba, requête par emprise autour du
 * centre de chaque commune). Documents : 84031_PLU_20250916 (Carpentras),
 * 84087_PLU_20250320 (Orange), 84035_PLU_20250324 (Cavaillon),
 * 26198_PLU_20250611 (Montélimar), 200054807_PLUI_20260306_B (PLUi de la
 * Métropole Aix-Marseille-Provence, relevé à Pertuis), 34301_PLU_20251215
 * (Sète), 04112_PLU_20260722 (Manosque), 13001_PSMV_20260728 (Aix-en-Provence).
 * Ce sont les descriptions publiées par les collectivités, pas leurs règles.
 *
 * Affirmations sur l'outil : les mêmes que /zonage-plu/zone-u et /zonage-plu
 * (sas-plu-3d, commit 1e2ba0a) : secteur lu dans le GPU et rattaché au
 * document en vigueur (src/lib/plu-gpu-link.ts:1-16) ; tous les secteurs de
 * la parcelle relevés (src/lib/parcel-plu-proof.ts:1-21) ; type de zone avant
 * libellé (src/config/plu-definitions.ts:86-97) ; règles avec provenance
 * (src/lib/plu-engine.ts `PluRagSnippet`, src/lib/feasibility-finance.ts
 * `ConstraintSourceKind`) ; servitudes bloquantes (src/config/plu-definitions.ts:60-80).
 */
export const ZONE_UA: MetierPageContent = {
  slug: "/zonage-plu/zone-ua",
  navLabel: "Zone UA",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/zonage-plu/zone-u", "/zonage-plu/zone-ub", "/zonage-plu/zone-uc", "/analyse-plu-parcelle", "/emprise-au-sol", "/terrain-constructible"],

  metaTitle: "Zone UA du PLU : définition et règles à lire",
  metaDescription:
    "Zone UA : secteur de la zone urbaine créé par chaque PLU, souvent le centre ancien. Ce que dit le code, exemples réels, où lire les règles de la commune.",
  dateModified: "2026-10-30",

  eyebrow: "Zonage PLU · zone urbaine · secteur UA",
  h1: "Zone UA du PLU : un secteur local, souvent le centre ancien",
  lede:
    "« Zone UA » ne figure nulle part dans le code de l'urbanisme. C'est le nom qu'un plan local d'urbanisme donne à l'un des secteurs de sa zone urbaine, très souvent le centre ancien. Ce que l'on peut y construire dépend donc du règlement de la commune, et de lui seul. Cette page explique d'où vient ce nom, ce qu'il recouvre en pratique, des exemples réels relevés au Géoportail de l'Urbanisme, et comment lire les règles d'un secteur UA.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle en centre ancien.",

  guide: {
    kicker: "Définition",
    title: "Ce que dit le code, et ce qu'il ne dit pas",
    intro:
      "Pour comprendre une zone UA, il faut séparer deux niveaux : la famille de zones, fixée par le code de l'urbanisme, et le secteur, créé par le PLU de la commune ou de l'intercommunalité.",
    blocks: [
      {
        title: "La zone U est définie par le code ; le secteur UA, non",
        paragraphs: [
          "Le règlement du PLU délimite des zones urbaines, à urbaniser, agricoles et naturelles, et fixe les règles applicables dans chacune. Pour les zones urbaines, le code dit seulement : « Les zones urbaines sont dites \"zones U\". Peuvent être classés en zone urbaine, les secteurs déjà urbanisés et les secteurs où les équipements publics existants ou en cours de réalisation ont une capacité suffisante pour desservir les constructions à implanter. »",
          "Le code ne crée ni zone UA, ni zone UB, ni zone UC. Ces lettres sont des conventions de nommage : chaque PLU découpe sa zone U en secteurs et les nomme comme il l'entend. Une zone UA est donc, juridiquement, une partie de la zone U d'un PLU donné, avec les règles que ce PLU lui attribue.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. R151-17 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720617" },
          { label: "Code de l'urbanisme, art. R151-18 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615" },
        ],
      },
      {
        title: "Pourquoi UA désigne si souvent le centre ancien",
        paragraphs: [
          "Beaucoup de PLU nomment leurs secteurs urbains dans l'ordre de leur formation : la lettre A pour le noyau historique, puis B, C et suivantes pour les extensions. D'où l'habitude, très répandue, d'appeler UA le centre ancien, bâti de façon continue, souvent à l'alignement des rues. C'est une habitude de rédaction, pas une obligation : rien n'empêche une commune d'appeler son centre UH1, UC ou UCV, ni de donner le nom UA à un tout autre tissu.",
          "Les exemples relevés plus bas le montrent : à Manosque, le centre historique est un secteur UH1 ; à Sète, des secteurs UA4 et UA5 désignent des villages de pêcheurs ; dans le PLU intercommunal de la Métropole Aix-Marseille-Provence, la zone UA regroupe des centres historiques et des hameaux.",
        ],
      },
      {
        title: "Les sous-secteurs UAa, UAb, UA1 : une règle propre à chaque document",
        paragraphs: [
          "La plupart des PLU subdivisent encore leur secteur UA. La lettre ou le chiffre ajouté signale une règle qui change à l'intérieur du centre : une hauteur différente, un alignement particulier, un périmètre de risque ou de protection. À Montélimar, par exemple, le PLU distingue un secteur UAa « de moindre hauteur », un secteur UAb « de grande hauteur » et un secteur UAd « de hauteur et d'alignement adaptés ». Les valeurs elles-mêmes ne sont que dans le règlement écrit et ses documents graphiques.",
          "Conséquence pratique : sur une parcelle en « UAb », il faut lire à la fois les dispositions communes à la zone UA et celles propres au sous-secteur UAb, qui les complètent ou les remplacent.",
        ],
      },
      {
        title: "Ce que le règlement d'un secteur UA fixe, et où le lire",
        paragraphs: [
          "Le code permet au règlement de fixer des règles maximales d'emprise au sol et de hauteur, et de les définir par rapport aux voies, aux limites séparatives et aux autres constructions, en recherchant une continuité visuelle, urbaine et paysagère. En centre ancien, ce sont ces règles d'implantation et de gabarit qui décident le plus souvent du volume constructible. Elles ne sont pas obligatoires : un PLU peut s'en passer, en fixer d'autres, ou renvoyer à des documents graphiques.",
        ],
        list: [
          "Destinations : quels usages sont admis, interdits ou soumis à conditions (logement, commerce, bureaux, artisanat…).",
          "Implantation : par rapport à la rue (alignement ou recul) et aux limites séparatives.",
          "Hauteur : en mètres, en niveaux, ou par rapport aux constructions voisines, selon la rédaction choisie.",
          "Emprise au sol et espaces de pleine terre, quand le règlement les fixe.",
          "Aspect extérieur : façades, toitures, matériaux, devantures.",
          "Stationnement : nombre de places exigé, et éventuelles dispenses.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-39 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720561" }],
        link: {
          text: "La notion d'emprise au sol et sa lecture dans un règlement sont détaillées sur",
          href: "/emprise-au-sol",
          label: "la page Emprise au sol et CES",
        },
      },
      {
        title: "Patrimoine : un autre document peut s'appliquer",
        paragraphs: [
          "Les centres anciens concentrent les protections patrimoniales. Un projet en secteur UA peut se trouver dans les abords d'un monument historique ou dans un site patrimonial remarquable, ce qui ajoute des prescriptions et l'avis de l'architecte des bâtiments de France. Certains centres sont même couverts par un plan de sauvegarde et de mise en valeur, document distinct du PLU : à Aix-en-Provence, la couche des zones du Géoportail de l'Urbanisme rattache le centre à un tel plan, et non à un secteur UA.",
          "Avant de raisonner sur le volume, il faut donc vérifier quel document s'applique à la parcelle, et quelles servitudes s'y superposent.",
        ],
        link: {
          text: "L'ensemble des vérifications avant un projet est détaillé sur",
          href: "/terrain-constructible",
          label: "la page Savoir si un terrain est constructible",
        },
      },
      {
        title: "Trouver le règlement de la zone UA de votre commune",
        paragraphs: [
          "Si la commune ou l'intercommunalité publie son document sur le Géoportail de l'Urbanisme, il suffit de rechercher l'adresse : la carte affiche le secteur de la parcelle, et le règlement se télécharge depuis la fiche du document. Sinon, le plan de zonage et le règlement sont consultables en mairie ou sur le site de la collectivité. Vérifiez la date du document : une modification ou une révision récente peut avoir changé le secteur ou ses règles.",
        ],
        sources: [{ label: "Géoportail de l'Urbanisme (site officiel)", href: "https://www.geoportail-urbanisme.gouv.fr/" }],
      },
    ],
  },

  problem: {
    title: "« Terrain en zone UA » : une information incomplète",
    body: [
      "Dans une annonce ou un échange avec un vendeur, « zone UA » sonne comme une catégorie connue. Ce n'en est pas une : sans le nom de la commune, la version du PLU et le sous-secteur exact, on ne sait rien des hauteurs, de l'implantation ou des destinations admises.",
      "En centre ancien s'ajoute une difficulté propre : les règles d'implantation, de gabarit et d'aspect, et les protections patrimoniales, pèsent souvent plus lourd que l'emprise au sol sur ce qu'il est possible de construire.",
    ],
    points: [
      { title: "Un même nom, des règles différentes", body: "Le secteur UA de deux communes voisines n'a aucune raison d'avoir les mêmes règles ; seul le règlement local fait foi." },
      { title: "Le sous-secteur change la règle", body: "UAa, UAb ou UA4 signalent une règle propre à l'intérieur du secteur, qu'il faut lire en plus des dispositions communes." },
      { title: "Le patrimoine se superpose", body: "Abords de monument historique, site patrimonial remarquable ou plan de sauvegarde ajoutent leurs propres prescriptions." },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit pour une parcelle en secteur UA",
    intro:
      "L'outil ne suppose rien à partir des lettres « UA » : il lit le secteur de la parcelle à la source, puis le règlement de ce document, et indique d'où vient chaque valeur.",
    items: [
      { ref: "UA.01", title: "Secteur exact et document en vigueur", body: "Le libellé du secteur (UA, UAb, UA4…) et son type normalisé sont lus dans le Géoportail de l'Urbanisme et rattachés au document en vigueur de la commune." },
      { ref: "UA.02", title: "Tous les secteurs de la parcelle", body: "Une limite entre UA et un autre secteur peut couper un terrain : chaque secteur qui touche la parcelle est relevé, et une couche indisponible donne un statut inconnu, jamais une absence." },
      { ref: "UA.03", title: "Règles avec leur provenance", body: "Emprise au sol, hauteur, retraits et espaces verts : chaque règle indique si elle vient de la base de zones, de la lecture du règlement, d'un profil de repli ou d'une estimation." },
      { ref: "UA.04", title: "Servitudes signalées", body: "Les servitudes d'utilité publique disponibles sont relevées ; site classé, espace boisé classé et canalisation de matières dangereuses sont traités comme bloquants." },
    ],
    contextLink: {
      text: "La lecture complète d'une parcelle, avec un exemple réel, est détaillée sur",
      href: "/analyse-plu-parcelle",
      label: "la page Analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "Lire une parcelle en zone UA, dans l'ordre",
    items: [
      { n: "01", title: "Identifier le secteur exact", body: "Libellé complet (UA, UAa, UA4…), document en vigueur et date d'approbation, depuis le Géoportail de l'Urbanisme ou la mairie." },
      { n: "02", title: "Vérifier le document applicable", body: "PLU, PLU intercommunal ou plan de sauvegarde, et servitudes patrimoniales qui se superposent." },
      { n: "03", title: "Lire le règlement du secteur", body: "Dispositions communes à la zone UA, puis celles du sous-secteur : destinations, implantation, hauteur, emprise, aspect, stationnement." },
      { n: "04", title: "Confirmer en mairie", body: "Un certificat d'urbanisme ou un échange avec le service urbanisme lève les doutes avant tout engagement." },
    ],
  },

  sources: {
    title: "Les sources de cette page",
    intro: "Textes officiels et données publiques réellement consultés pour rédiger cette page.",
    items: [
      "Code de l'urbanisme, articles R151-17, R151-18, R151-19 et R151-39, sur Légifrance (consultés le 30 octobre 2026).",
      "Géoportail de l'Urbanisme, couche des zones d'urbanisme via l'API Carto de l'IGN : libellés et descriptions des secteurs cités en exemple (relevés le 30 octobre 2026).",
      "Pour une parcelle, Fonciable interroge en plus l'API Carto du GPU (servitudes d'utilité publique) et Géorisques (risques recensés).",
    ],
    note: "Si la commune ne publie pas son document sur le Géoportail de l'Urbanisme, le secteur n'est pas garanti : la mairie fait foi.",
  },

  proof: {
    title: "Ce que recouvre « UA » dans huit documents réels",
    intro:
      "Descriptions publiées par les collectivités pour leurs secteurs, telles qu'elles figurent au Géoportail de l'Urbanisme. Elles montrent l'habitude du centre ancien, et ses exceptions.",
    tag: "Exemples réels · Géoportail de l'Urbanisme · relevé du 30/10/2026",
    rows: [
      { label: "Carpentras (PLU), UA", value: "Centre-ville ancien" },
      { label: "Orange (PLU), UA", value: "Centre historique" },
      { label: "Cavaillon (PLU), UA", value: "Centre ancien de la ville" },
      { label: "Montélimar (PLU), UAa / UAb", value: "Centre historique, moindre / grande hauteur" },
      { label: "PLUi Aix-Marseille-Provence (relevé à Pertuis), UA / UAb", value: "Centres historiques et hameaux / faubourgs anciens" },
      { label: "Sète (PLU), UA4 et UA5", value: "Villages de pêcheurs (la Plagette, la Pointe Courte)" },
      { label: "Manosque (PLU), centre historique", value: "Secteur UH1 : aucun secteur UA" },
      { label: "Aix-en-Provence, centre", value: "Plan de sauvegarde et de mise en valeur" },
    ],
    caption:
      "Libellés longs relevés le 30 octobre 2026 dans la couche des zones d'urbanisme du Géoportail de l'Urbanisme (API Carto IGN), résumés sans changer leur sens. Ce sont des descriptions, pas des règles : hauteurs, emprises et implantations se lisent dans le règlement de chaque document.",
  },

  limits: {
    title: "Limites",
    intro: "La lecture du secteur cadre une étude, elle ne vaut pas autorisation.",
    items: [
      "Aucune règle d'un secteur UA n'a de valeur générale : seul le règlement du document applicable à la parcelle fait foi.",
      "Une modification ou une révision en cours peut changer le secteur ou ses règles avant d'apparaître dans les données publiques.",
      "Les prescriptions patrimoniales et l'avis de l'architecte des bâtiments de France ne se déduisent pas du seul nom de secteur.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une zone UA dans un PLU ?",
      a: "C'est un secteur de la zone urbaine (zone U) créé et nommé par le PLU d'une commune ou d'une intercommunalité. Le code de l'urbanisme ne définit pas de zone UA : il ne connaît que les zones U, AU, A et N. Dans beaucoup de PLU, UA désigne le centre ancien, mais ce n'est pas une règle.",
    },
    {
      q: "Quelle hauteur peut-on construire en zone UA ?",
      a: "Il n'existe aucune hauteur nationale pour une zone UA. La hauteur, quand le règlement la fixe, se lit dans le règlement du PLU de la commune, pour le secteur et le sous-secteur exacts de la parcelle. Elle peut être exprimée en mètres, en niveaux ou par rapport aux constructions voisines.",
    },
    {
      q: "Quelle différence entre une zone UA et une zone UB ?",
      a: "Seul le PLU concerné le dit. Dans beaucoup de documents, UA correspond au centre ancien et UB à ses premières extensions, avec des règles d'implantation et de gabarit différentes. Mais certains PLU classent les faubourgs anciens en UA, ou n'ont pas de secteur UB.",
    },
    {
      q: "Que signifient UAa, UAb ou UA1 ?",
      a: "Ce sont des sous-secteurs de la zone UA, créés par le PLU pour appliquer une règle différente sur une partie du secteur : une hauteur, un alignement, un périmètre de risque ou de protection. Il faut lire les dispositions communes à la zone UA et celles du sous-secteur.",
    },
    {
      q: "Où trouver le règlement de la zone UA de ma commune ?",
      a: "Sur le Géoportail de l'Urbanisme, si la commune ou l'intercommunalité y publie son document : recherchez l'adresse, puis téléchargez le règlement depuis la fiche du document. Sinon, en mairie ou sur le site de la collectivité.",
    },
    {
      q: "Peut-on construire en zone UA ?",
      a: "En principe oui, puisqu'il s'agit d'un secteur de la zone urbaine, mais dans le respect du règlement du secteur, des protections patrimoniales et des servitudes. Seule l'instruction d'une demande dit si un projet précis est autorisé ; un certificat d'urbanisme fige les règles pendant dix-huit mois.",
    },
  ],

  finalCta: {
    title: "Parlons d'une parcelle en centre ancien",
    body: "Apportez une adresse : nous vous montrerons le secteur exact, le document en vigueur et les règles lues, chacune avec sa source.",
    label: "Prendre rendez-vous",
  },
};
