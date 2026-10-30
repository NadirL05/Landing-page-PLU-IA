import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-ub.
 *
 * Requêtes cibles : « zone ub », « ub définition », « zone ub définition »
 * (impressions Search Console du 19 au 27/10/2026 sur /zonage-plu/zone-u).
 * Point de doctrine : UB n'est PAS une catégorie du code de l'urbanisme ;
 * c'est un nom de secteur de la zone U choisi par chaque PLU. Aucune règle
 * chiffrée (hauteur, emprise, recul) n'est présentée comme générale.
 *
 * Textes (Légifrance, consultés le 2026-10-30, en vigueur depuis le
 * 01/01/2016) : R151-17 (LEGIARTI000031720617), R151-18 (…615), R151-19
 * (…613), R151-39 (…561).
 *
 * Exemples réels : libellés longs relevés le 2026-10-30 dans la couche des
 * zones d'urbanisme du Géoportail de l'Urbanisme (API Carto IGN,
 * https://apicarto.ign.fr/api/gpu/zone-urba). Documents : 84031_PLU_20250916
 * (Carpentras), 84087_PLU_20250320 (Orange), 84035_PLU_20250324 (Cavaillon :
 * UB, UBa, UBab, UBabf1), 26198_PLU_20250611 (Montélimar), 56260_PLU_20240408
 * (Vannes : UBa, UBc, UBp), 83050_PLU_20260916 (Draguignan : UBa, UBb),
 * 200054807_PLUI_20260306_B (PLUi de la Métropole Aix-Marseille-Provence,
 * relevé à Pertuis : faubourgs anciens en UAb, UBb). Ce sont les
 * descriptions publiées par les collectivités, pas leurs règles.
 *
 * Affirmations sur l'outil : les mêmes que /zonage-plu/zone-u (sas-plu-3d,
 * commit 1e2ba0a), voir l'en-tête de content/zonage-plu-zone-ua.ts.
 */
export const ZONE_UB: MetierPageContent = {
  slug: "/zonage-plu/zone-ub",
  navLabel: "Zone UB",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/zonage-plu/zone-u", "/zonage-plu/zone-ua", "/zonage-plu/zone-uc", "/analyse-plu-parcelle", "/surface-de-plancher", "/certificat-urbanisme"],

  metaTitle: "Zone UB du PLU : définition et exemples réels",
  metaDescription:
    "Zone UB, définition : un secteur de la zone urbaine nommé par chaque PLU, souvent les extensions du centre. Exemples réels et lecture du règlement local.",
  dateModified: "2026-10-30",

  eyebrow: "Zonage PLU · zone urbaine · secteur UB",
  h1: "Zone UB du PLU : définition, exemples réels et règles à lire",
  lede:
    "Une zone UB est un secteur de la zone urbaine d'un plan local d'urbanisme. Le code de l'urbanisme ne la définit pas : c'est chaque PLU qui la crée, la délimite et lui donne ses règles. Très souvent, UB désigne les quartiers qui prolongent le centre ancien, mais pas toujours. Voici la définition juste, ce que recouvre UB dans des PLU réels, et la méthode pour lire les règles d'une parcelle classée UB.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle en zone UB.",

  guide: {
    kicker: "Définition",
    title: "Zone UB : la définition en trois phrases",
    intro:
      "La zone UB est une partie de la zone U d'un PLU. Le code définit la zone U ; le PLU de la commune crée le secteur UB et en écrit les règles. Il n'existe donc pas de « règles de la zone UB » valables partout.",
    blocks: [
      {
        title: "Ce que dit le code de l'urbanisme",
        paragraphs: [
          "Le code fixe quatre familles de zones (urbaines, à urbaniser, agricoles, naturelles et forestières) et laisse au règlement de chaque PLU le soin de les délimiter et de les réglementer. Pour la zone urbaine, il pose deux critères alternatifs : un secteur déjà urbanisé, ou un secteur où les équipements publics existants ou en cours de réalisation ont une capacité suffisante pour desservir les constructions à implanter.",
          "Le texte s'arrête là. Les secteurs UA, UB, UC, et leurs déclinaisons, n'y figurent pas : ils naissent dans le PLU. Dans un PLU intercommunal, une zone urbaine peut même être réglementée uniquement par renvoi à certains articles du règlement national d'urbanisme.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. R151-17 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720617" },
          { label: "Code de l'urbanisme, art. R151-18 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615" },
          { label: "art. R151-19 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720613" },
        ],
      },
      {
        title: "Ce que UB désigne le plus souvent",
        paragraphs: [
          "Quand un PLU nomme ses secteurs urbains par lettres successives, UB vient juste après le centre ancien (UA) : ce sont alors les premiers faubourgs ou la première couronne d'extension, souvent plus aérés que le centre, avec des constructions implantées en continuité ou en retrait selon les quartiers. Les PLU de Carpentras (« première extension du centre-ville »), d'Orange (« faubourgs ») ou de Cavaillon (« première couronne d'extension urbaine du centre ancien ») suivent ce schéma.",
          "Mais le même nom couvre ailleurs des réalités très différentes : à Montélimar, UB est une « zone urbaine de densité élevée » ; à Vannes, le sous-secteur UBc regroupe des immeubles collectifs, des sites militaires et des équipements ; à Draguignan, UBa correspond à une ZAC. Et dans le PLU intercommunal de la Métropole Aix-Marseille-Provence, les faubourgs anciens sont classés en UAb, pas en UB.",
        ],
      },
      {
        title: "Lire les lettres qui suivent UB",
        paragraphs: [
          "Les sous-secteurs (UBa, UBc, UB1…) appliquent une règle particulière à une partie de la zone UB. Le suffixe n'a pas de sens universel, mais il signale presque toujours quelque chose à chercher dans le règlement : une hauteur ou une implantation différente, une orientation d'aménagement, un risque, une protection.",
        ],
        list: [
          "À Cavaillon, UBa signale un périmètre de sensibilité archéologique, UBab un secteur le long de l'avenue Clemenceau, et UBabf1 ajoute un risque de feu de forêt : trois informations cumulées dans un seul libellé.",
          "À Vannes, UBp désigne des secteurs de projets couverts par des orientations d'aménagement et de programmation, et UBpa la rive gauche du port.",
          "À Draguignan, UBb et UBc portent la même description (« extensions du centre-ville ») : seul le règlement dit ce qui les distingue.",
        ],
      },
      {
        title: "Les règles à chercher dans le règlement d'une zone UB",
        paragraphs: [
          "Le code permet au règlement de fixer des règles maximales d'emprise au sol et de hauteur, et des règles d'implantation par rapport aux voies, aux limites séparatives et aux autres constructions. En zone UB, c'est souvent la combinaison de ces règles, et non l'une d'elles seule, qui fixe le volume constructible d'une parcelle. Lisez le règlement dans cet ordre :",
        ],
        list: [
          "Destinations et sous-destinations interdites ou admises sous conditions.",
          "Implantation par rapport aux voies et emprises publiques, puis par rapport aux limites séparatives.",
          "Emprise au sol maximale et part minimale d'espaces verts ou de pleine terre, quand elles existent.",
          "Hauteur maximale, et la façon dont elle se mesure.",
          "Stationnement exigé selon la destination.",
          "Orientations d'aménagement et de programmation, servitudes et risques qui se superposent au secteur.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-39 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720561" }],
        link: {
          text: "Pour passer de ces règles à une surface de plancher réaliste, voir",
          href: "/surface-de-plancher",
          label: "la page Calcul de la surface de plancher",
        },
      },
      {
        title: "Trouver le règlement de la zone UB d'une commune",
        paragraphs: [
          "Sur le Géoportail de l'Urbanisme, recherchez l'adresse de la parcelle : la carte affiche son secteur (UB, UBa…), et le règlement se télécharge depuis la fiche du document. Si la commune n'y publie pas son PLU, le plan de zonage et le règlement sont consultables en mairie ou sur le site de la collectivité. Pour figer les règles applicables pendant dix-huit mois, le certificat d'urbanisme reste l'outil adapté.",
        ],
        sources: [{ label: "Géoportail de l'Urbanisme (site officiel)", href: "https://www.geoportail-urbanisme.gouv.fr/" }],
        link: {
          text: "Les deux types de certificat et leurs délais sont détaillés sur",
          href: "/certificat-urbanisme",
          label: "la page Certificat d'urbanisme",
        },
      },
    ],
  },

  problem: {
    title: "Pourquoi « zone UB » ne suffit pas pour chiffrer un projet",
    body: [
      "La zone UB est souvent le terrain des opérations de densification : quartiers déjà desservis, parcelles plus grandes qu'en centre ancien, constructions plus espacées. C'est aussi là que les règles varient le plus d'une commune à l'autre, et parfois d'un sous-secteur à l'autre dans la même commune.",
      "Raisonner à partir d'une « zone UB type » conduit à des surfaces constructibles fausses, donc à des bilans faux. La seule base fiable est le règlement du document en vigueur, pour le secteur exact de la parcelle.",
    ],
    points: [
      { title: "Pas de définition nationale", body: "Le code ne connaît que la zone U ; UB et ses règles sont écrites par chaque PLU." },
      { title: "Des réalités opposées sous le même nom", body: "Faubourgs à Orange, densité élevée à Montélimar, ZAC à Draguignan : le libellé ne dit pas le tissu." },
      { title: "Des informations cumulées dans le suffixe", body: "Un libellé comme UBabf1 peut porter à la fois un périmètre archéologique, un axe et un risque." },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit pour une parcelle en zone UB",
    intro: "L'outil part du secteur réellement publié pour la parcelle, pas d'une moyenne des zones UB.",
    items: [
      { ref: "UB.01", title: "Libellé complet et type de zone", body: "Le libellé exact (UB, UBa, UBabf1…) et le type normalisé (U) sont lus dans le Géoportail de l'Urbanisme ; le type fait foi en priorité pour ranger un libellé inhabituel." },
      { ref: "UB.02", title: "Document en vigueur", body: "Le secteur est rattaché au document en vigueur de la commune ; une zone non identifiée est signalée comme telle." },
      { ref: "UB.03", title: "Règles avec leur provenance", body: "Emprise au sol, hauteur, retraits et espaces verts : chaque règle indique si elle vient de la base de zones, de la lecture du règlement, d'un profil de repli ou d'une estimation." },
      { ref: "UB.04", title: "Secteurs multiples et servitudes", body: "Tous les secteurs qui touchent la parcelle sont relevés, ainsi que les servitudes d'utilité publique disponibles et les risques recensés." },
    ],
    contextLink: {
      text: "La lecture complète d'une parcelle, avec un exemple réel, est détaillée sur",
      href: "/analyse-plu-parcelle",
      label: "la page Analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "Lire une parcelle en zone UB",
    items: [
      { n: "01", title: "Relever le libellé complet", body: "UB, UBa, UBc ou UBabf1 : chaque lettre peut renvoyer à une règle propre." },
      { n: "02", title: "Lire le règlement du secteur", body: "Dispositions communes à la zone UB, puis celles du sous-secteur, dans le document en vigueur." },
      { n: "03", title: "Ajouter ce qui se superpose", body: "Orientations d'aménagement, servitudes, risques : ils peuvent réduire ce que le règlement permet." },
      { n: "04", title: "Traduire en volume, puis vérifier", body: "Emprise, hauteur et retraits donnent une enveloppe théorique, à confirmer auprès du service urbanisme." },
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
    title: "« UB » dans sept documents réels",
    intro:
      "Descriptions publiées par les collectivités pour leurs secteurs UB, telles qu'elles figurent au Géoportail de l'Urbanisme. Même nom, tissus différents.",
    tag: "Exemples réels · Géoportail de l'Urbanisme · relevé du 30/10/2026",
    rows: [
      { label: "Carpentras (PLU), UB", value: "Première extension du centre-ville" },
      { label: "Orange (PLU), UB", value: "Faubourgs" },
      { label: "Cavaillon (PLU), UB", value: "Première couronne d'extension du centre ancien" },
      { label: "Montélimar (PLU), UB", value: "Zone urbaine de densité élevée" },
      { label: "Vannes (PLU), UBc", value: "Immeubles collectifs, sites militaires, équipements" },
      { label: "Draguignan (PLU), UBa", value: "ZAC Chabran" },
      { label: "PLUi Aix-Marseille-Provence (relevé à Pertuis)", value: "Faubourgs anciens en UAb, pas en UB" },
    ],
    caption:
      "Libellés longs relevés le 30 octobre 2026 dans la couche des zones d'urbanisme du Géoportail de l'Urbanisme (API Carto IGN), résumés sans changer leur sens. Ce sont des descriptions, pas des règles : hauteurs, emprises et implantations se lisent dans le règlement de chaque document.",
  },

  limits: {
    title: "Limites",
    intro: "La lecture du secteur cadre une étude, elle ne vaut pas autorisation.",
    items: [
      "Aucune règle d'une zone UB n'a de valeur générale : seul le règlement du document applicable à la parcelle fait foi.",
      "Une modification ou une révision en cours peut changer le secteur ou ses règles avant d'apparaître dans les données publiques.",
      "Une orientation d'aménagement ou une servitude peut rendre un projet impossible même si le règlement de zone le permet.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Quelle est la définition d'une zone UB ?",
      a: "Une zone UB est un secteur de la zone urbaine (zone U) d'un plan local d'urbanisme, créé et nommé par ce PLU. Le code de l'urbanisme définit la zone U (article R151-18) mais pas la zone UB : ses limites et ses règles sont propres à chaque commune ou intercommunalité.",
    },
    {
      q: "Que veut dire UB en urbanisme ?",
      a: "U signifie zone urbaine ; la lettre B est un nom de secteur choisi par le PLU. Dans beaucoup de documents, elle désigne les quartiers qui prolongent le centre ancien (classé UA), mais d'autres PLU l'utilisent pour des secteurs denses, des ensembles collectifs ou des ZAC.",
    },
    {
      q: "Quelle hauteur et quelle emprise au sol en zone UB ?",
      a: "Aucune valeur nationale n'existe. Quand le règlement les fixe, la hauteur et l'emprise au sol se lisent dans le règlement du PLU de la commune, pour le secteur et le sous-secteur exacts de la parcelle.",
    },
    {
      q: "Peut-on diviser un terrain en zone UB ?",
      a: "Souvent, mais cela dépend du règlement du secteur (implantation, emprise, espaces verts, accès) et de la procédure de division applicable. Dans un lotissement, les règles s'apprécient à l'échelle du terrain d'origine sauf si le PLU s'y oppose (article R151-21) : c'est à vérifier dans le règlement.",
    },
    {
      q: "Quelle différence entre zone UB et zone UC ?",
      a: "Seul le PLU concerné le dit. Quand les secteurs sont nommés dans l'ordre, UB précède UC et correspond à un tissu plus proche du centre ; mais certains PLU n'ont pas de secteur UC, ou l'utilisent pour un tissu plus dense que leur UB.",
    },
    {
      q: "Comment savoir si ma parcelle est en zone UB ?",
      a: "Recherchez l'adresse sur le Géoportail de l'Urbanisme, quand la commune y publie son document, ou consultez le plan de zonage en mairie. Notez le libellé complet (UB, UBa…) et la date du document.",
    },
  ],

  finalCta: {
    title: "Parlons d'une parcelle en zone UB",
    body: "Apportez une adresse : nous vous montrerons le secteur exact, ses règles et leurs sources dans Fonciable.",
    label: "Prendre rendez-vous",
  },
};
