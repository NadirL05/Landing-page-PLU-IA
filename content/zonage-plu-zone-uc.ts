import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu/zone-uc.
 *
 * Requêtes cibles : « zone uc », « zone uc plu », « zone uc définition ».
 * Point de doctrine : UC n'est PAS une catégorie du code de l'urbanisme ;
 * c'est un nom de secteur de la zone U choisi par chaque PLU. C'est le nom
 * le plus variable des trois (UA, UB, UC) : pavillonnaire ici, collectif
 * dense ou mixte ailleurs. Aucune règle chiffrée n'est présentée comme
 * générale.
 *
 * Textes (Légifrance, consultés le 2026-10-30, en vigueur depuis le
 * 01/01/2016) : R151-17 (LEGIARTI000031720617), R151-18 (…615), R151-21
 * (…609), R151-39 (…561).
 *
 * Exemples réels : libellés longs relevés le 2026-10-30 dans la couche des
 * zones d'urbanisme du Géoportail de l'Urbanisme (API Carto IGN,
 * https://apicarto.ign.fr/api/gpu/zone-urba). Documents : 56260_PLU_20240408
 * (Vannes, UC), 83050_PLU_20260916 (Draguignan, UCa et UCb),
 * 84031_PLU_20250916 (Carpentras, UC), 84087_PLU_20250320 (Orange, UC et
 * UCf3), 84035_PLU_20250324 (Cavaillon, UC et UCa), 26198_PLU_20250611
 * (Montélimar, UC, UCa, UCc), 34301_PLU_20251215 (Sète, UC3, UC4a à UC4d),
 * 04112_PLU_20260722 (Manosque, UH1 à UH3, aucun UC relevé). Ce sont les
 * descriptions publiées par les collectivités, pas leurs règles.
 *
 * Affirmations sur l'outil : les mêmes que /zonage-plu/zone-u (sas-plu-3d,
 * commit 1e2ba0a), voir l'en-tête de content/zonage-plu-zone-ua.ts.
 */
export const ZONE_UC: MetierPageContent = {
  slug: "/zonage-plu/zone-uc",
  navLabel: "Zone UC",
  parent: { navLabel: "Zonage PLU", slug: "/zonage-plu" },
  related: ["/zonage-plu/zone-u", "/zonage-plu/zone-ua", "/zonage-plu/zone-ub", "/division-parcellaire", "/dent-creuse", "/emprise-au-sol"],

  metaTitle: "Zone UC du PLU : pavillonnaire ou collectif ?",
  metaDescription:
    "Zone UC : secteur urbain nommé par chaque PLU, pavillonnaire ici, collectif ou mixte ailleurs. Exemples réels et règles à lire avant un projet.",
  dateModified: "2026-10-30",

  eyebrow: "Zonage PLU · zone urbaine · secteur UC",
  h1: "Zone UC du PLU : un nom, des tissus urbains très différents",
  lede:
    "Dans de nombreux PLU, la zone UC désigne des quartiers résidentiels plus récents et moins denses que le centre, souvent pavillonnaires. Dans d'autres, le même nom couvre des immeubles collectifs denses ou des quartiers mixtes. Le code de l'urbanisme ne tranche pas : UC est un secteur que chaque PLU crée et réglemente. Voici comment l'identifier, ce qu'il recouvre dans des documents réels, et ce qu'il faut lire avant un projet de construction ou de division.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle en zone UC.",

  guide: {
    kicker: "Définition",
    title: "Ce qu'est juridiquement une zone UC",
    intro:
      "Une zone UC n'a pas d'autre existence juridique que celle que lui donne le PLU qui la crée. Le code définit la famille (zone U), le PLU définit le secteur.",
    blocks: [
      {
        title: "Une partie de la zone U, créée par le PLU",
        paragraphs: [
          "Le règlement du PLU délimite les zones urbaines, à urbaniser, agricoles, naturelles et forestières. Est urbain un secteur déjà urbanisé, ou un secteur où les équipements publics existants ou en cours de réalisation ont une capacité suffisante pour desservir les constructions à implanter. C'est tout ce que le code dit de la zone U.",
          "UC n'est donc ni une catégorie nationale, ni un niveau de densité défini par la loi. C'est le troisième nom d'une série que beaucoup de PLU utilisent pour leurs secteurs urbains, et que d'autres n'utilisent pas du tout : à Manosque, par exemple, les secteurs d'habitat sont nommés UH1, UH2 et UH3.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. R151-17 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720617" },
          { label: "Code de l'urbanisme, art. R151-18 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615" },
        ],
      },
      {
        title: "Pavillonnaire, collectif ou mixte : ce que disent les PLU",
        paragraphs: [
          "La lecture « UC = pavillonnaire » est fréquente, et elle est juste dans certains documents : à Vannes, la zone UC correspond aux secteurs urbains de densité moins élevée, à dominante pavillonnaire ; à Draguignan, UCa et UCb sont décrites comme des zones d'habitat pavillonnaire.",
          "Elle est fausse dans d'autres. À Orange, UC est une « zone à dominante résidentielle dense ». À Sète, les secteurs UC4c et UC4d correspondent à des secteurs collectifs de densité élevée. À Cavaillon, UC est une zone urbaine mixte regroupant l'ensemble des fonctions urbaines. À Carpentras, une zone d'extension récente mêlant collectifs peu denses et maisons individuelles en majorité groupées. Le nom ne permet donc pas de deviner la forme urbaine, encore moins les règles.",
        ],
      },
      {
        title: "Les suffixes : hauteur, densité, risque",
        paragraphs: [
          "Comme pour UA et UB, les PLU subdivisent souvent la zone UC. Le suffixe signale une règle ou une contrainte propre à une partie du secteur :",
        ],
        list: [
          "À Montélimar, UCa est un secteur « de moindre hauteur » et UCc un secteur « de grande hauteur » au sein des quartiers mixtes d'extension.",
          "À Orange, UCf3 est la zone résidentielle dense soumise à un aléa feu de forêt.",
          "À Sète, UC4a, UC4b, UC4c et UC4d distinguent petits collectifs, groupes d'habitations et collectifs denses, et un « v » final signale des espaces verts protégés.",
        ],
      },
      {
        title: "Densifier en zone UC : ce que le règlement décide",
        paragraphs: [
          "Dans les quartiers pavillonnaires, la question posée est souvent celle d'une maison supplémentaire en fond de jardin, d'une division de terrain ou d'un petit collectif à la place d'une maison. La sobriété foncière pousse à densifier les secteurs déjà urbanisés, mais c'est le règlement du secteur qui dit si et comment c'est possible. Les points qui bloquent le plus souvent :",
        ],
        list: [
          "Implantation par rapport aux limites séparatives : un recul imposé peut rendre une seconde construction impossible sur une parcelle étroite.",
          "Emprise au sol maximale et part d'espaces verts ou de pleine terre, qui se cumulent.",
          "Hauteur maximale, qui limite le passage d'une maison à un petit collectif.",
          "Accès et voirie : une parcelle en drapeau doit être desservie.",
          "Application des règles aux lots en cas de division : à l'échelle du terrain d'origine, sauf si le PLU exige que chaque lot les respecte seul.",
          "Stationnement exigé par logement, souvent décisif sur un petit terrain.",
        ],
        sources: [
          { label: "art. R151-21 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720609" },
          { label: "art. R151-39 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720561" },
        ],
        link: {
          text: "Les autorisations et les étapes d'une division sont détaillées sur",
          href: "/division-parcellaire",
          label: "la page Division parcellaire",
        },
      },
      {
        title: "Trouver le règlement de la zone UC d'une commune",
        paragraphs: [
          "Recherchez l'adresse sur le Géoportail de l'Urbanisme : la carte affiche le secteur de la parcelle et le règlement se télécharge depuis la fiche du document. Si la commune n'y publie pas son PLU, le plan de zonage et le règlement sont disponibles en mairie ou sur le site de la collectivité. Relevez le libellé complet (UC, UCa, UC4b…) et la date du document : c'est ce couple qui désigne des règles précises.",
        ],
        sources: [{ label: "Géoportail de l'Urbanisme (site officiel)", href: "https://www.geoportail-urbanisme.gouv.fr/" }],
        link: {
          text: "Repérer les terrains libres ou sous-occupés dans un tissu déjà bâti est expliqué sur",
          href: "/dent-creuse",
          label: "la page Dent creuse",
        },
      },
    ],
  },

  problem: {
    title: "Le piège de la « zone UC pavillonnaire »",
    body: [
      "Parce que la zone UC est souvent pavillonnaire, on lui prête vite des règles typiques : faible hauteur, forte part de jardin, recul sur les limites. Appliquées au mauvais PLU, ces suppositions sous-estiment ou surestiment le potentiel d'un terrain.",
      "Une parcelle classée UC peut porter un petit collectif dans une commune et à peine une extension dans la commune voisine. Seule la lecture du règlement en vigueur permet d'estimer ce qui est réellement constructible.",
    ],
    points: [
      { title: "Un nom, plusieurs formes urbaines", body: "Pavillonnaire à Vannes, résidentiel dense à Orange, mixte à Cavaillon : le libellé ne dit pas le tissu." },
      { title: "Les règles se cumulent", body: "Recul, emprise, espaces verts, hauteur et stationnement se combinent ; une seule suffit parfois à bloquer un projet." },
      { title: "La division change l'échelle", body: "Selon le PLU, les règles s'apprécient sur le terrain d'origine ou lot par lot." },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit pour une parcelle en zone UC",
    intro: "L'outil lit le secteur publié pour la parcelle et le règlement de son document, sans plaquer de règles « typiques » d'une zone UC.",
    items: [
      { ref: "UC.01", title: "Secteur exact et document en vigueur", body: "Le libellé (UC, UCa, UC4b…) et le type normalisé sont lus dans le Géoportail de l'Urbanisme et rattachés au document en vigueur de la commune." },
      { ref: "UC.02", title: "Règles avec leur provenance", body: "Emprise au sol, hauteur, retraits et espaces verts : chaque règle indique si elle vient de la base de zones, de la lecture du règlement, d'un profil de repli ou d'une estimation." },
      { ref: "UC.03", title: "Tous les secteurs de la parcelle", body: "Une parcelle à cheval sur deux secteurs est signalée ; chaque secteur qui la touche est relevé." },
      { ref: "UC.04", title: "Servitudes et risques", body: "Servitudes d'utilité publique disponibles et risques recensés sont ajoutés à la lecture de la zone." },
    ],
    contextLink: {
      text: "La lecture complète d'une parcelle, avec un exemple réel, est détaillée sur",
      href: "/analyse-plu-parcelle",
      label: "la page Analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "Étudier une parcelle en zone UC",
    items: [
      { n: "01", title: "Relever secteur et document", body: "Libellé complet, document en vigueur et date, depuis le Géoportail de l'Urbanisme ou la mairie." },
      { n: "02", title: "Lire les règles qui se cumulent", body: "Implantation, emprise, espaces verts, hauteur, stationnement, accès : dans le règlement du secteur." },
      { n: "03", title: "Vérifier la division si elle est envisagée", body: "Application des règles aux lots, procédure, accès des lots arrière." },
      { n: "04", title: "Confirmer en mairie", body: "Un certificat d'urbanisme ou un échange avec le service urbanisme avant tout engagement." },
    ],
  },

  sources: {
    title: "Les sources de cette page",
    intro: "Textes officiels et données publiques réellement consultés pour rédiger cette page.",
    items: [
      "Code de l'urbanisme, articles R151-17, R151-18, R151-21 et R151-39, sur Légifrance (consultés le 30 octobre 2026).",
      "Géoportail de l'Urbanisme, couche des zones d'urbanisme via l'API Carto de l'IGN : libellés et descriptions des secteurs cités en exemple (relevés le 30 octobre 2026).",
      "Pour une parcelle, Fonciable interroge en plus l'API Carto du GPU (servitudes d'utilité publique) et Géorisques (risques recensés).",
    ],
    note: "Si la commune ne publie pas son document sur le Géoportail de l'Urbanisme, le secteur n'est pas garanti : la mairie fait foi.",
  },

  proof: {
    title: "« UC » dans huit documents réels",
    intro:
      "Descriptions publiées par les collectivités pour leurs secteurs UC, telles qu'elles figurent au Géoportail de l'Urbanisme. Du pavillonnaire au collectif dense.",
    tag: "Exemples réels · Géoportail de l'Urbanisme · relevé du 30/10/2026",
    rows: [
      { label: "Vannes (PLU), UC", value: "Densité moins élevée, dominante pavillonnaire" },
      { label: "Draguignan (PLU), UCa et UCb", value: "Habitat pavillonnaire" },
      { label: "Carpentras (PLU), UC", value: "Extension récente, collectifs peu denses et maisons groupées" },
      { label: "Montélimar (PLU), UC", value: "Quartiers mixtes d'extension en continu" },
      { label: "Cavaillon (PLU), UC", value: "Zone urbaine mixte, ensemble des fonctions urbaines" },
      { label: "Orange (PLU), UC", value: "Dominante résidentielle dense" },
      { label: "Sète (PLU), UC4c", value: "Secteurs collectifs de densité élevée" },
      { label: "Manosque (PLU)", value: "Aucun secteur UC relevé : habitat en UH1 à UH3" },
    ],
    caption:
      "Libellés longs relevés le 30 octobre 2026 dans la couche des zones d'urbanisme du Géoportail de l'Urbanisme (API Carto IGN), autour du centre de chaque commune, résumés sans changer leur sens. Ce sont des descriptions, pas des règles : hauteurs, emprises et implantations se lisent dans le règlement de chaque document.",
  },

  limits: {
    title: "Limites",
    intro: "La lecture du secteur cadre une étude, elle ne vaut pas autorisation.",
    items: [
      "Aucune règle d'une zone UC n'a de valeur générale : seul le règlement du document applicable à la parcelle fait foi.",
      "Une modification ou une révision en cours peut changer le secteur ou ses règles avant d'apparaître dans les données publiques.",
      "Fonciable ne découpe pas de lots : le dessin d'une division et la desserte des lots relèvent du géomètre-expert et du service urbanisme.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une zone UC dans un PLU ?",
      a: "C'est un secteur de la zone urbaine (zone U) créé et nommé par le PLU d'une commune ou d'une intercommunalité. Le code de l'urbanisme ne définit pas de zone UC. Dans beaucoup de PLU, elle correspond à des quartiers résidentiels moins denses que le centre, souvent pavillonnaires, mais d'autres PLU l'utilisent pour des secteurs collectifs ou mixtes.",
    },
    {
      q: "La zone UC est-elle toujours pavillonnaire ?",
      a: "Non. Elle l'est à Vannes ou à Draguignan, d'après les descriptions publiées par ces communes, mais elle désigne une zone résidentielle dense à Orange, des collectifs de densité élevée dans certains sous-secteurs à Sète, ou une zone mixte à Cavaillon. Seul le PLU concerné le dit.",
    },
    {
      q: "Peut-on construire un immeuble en zone UC ?",
      a: "Cela dépend entièrement du règlement du secteur : destinations admises, hauteur, emprise au sol, espaces verts, stationnement. Dans certains PLU, la zone UC accueille déjà des collectifs ; dans d'autres, ses règles visent à préserver un tissu de maisons.",
    },
    {
      q: "Peut-on diviser un terrain en zone UC ?",
      a: "Souvent, si le règlement le permet : recul sur les limites, emprise, espaces verts, accès et stationnement doivent rester respectés. Par défaut, dans un lotissement, les règles s'apprécient sur le terrain d'origine, sauf si le PLU exige que chaque lot les respecte seul (article R151-21).",
    },
    {
      q: "Que signifient UCa, UCb ou UC1 ?",
      a: "Ce sont des sous-secteurs de la zone UC, créés par le PLU pour appliquer une règle différente sur une partie du secteur : une hauteur, une densité, un risque comme le feu de forêt, ou une protection d'espaces verts. Il faut lire les dispositions communes et celles du sous-secteur.",
    },
    {
      q: "Comment connaître les règles de la zone UC de ma commune ?",
      a: "Sur le Géoportail de l'Urbanisme, si la commune y publie son PLU : recherchez l'adresse et téléchargez le règlement. Sinon, en mairie ou sur le site de la collectivité. Un certificat d'urbanisme fige ensuite les règles pendant dix-huit mois.",
    },
  ],

  finalCta: {
    title: "Parlons d'une parcelle en zone UC",
    body: "Apportez une adresse : nous vous montrerons le secteur exact, ses règles et leurs sources dans Fonciable.",
    label: "Prendre rendez-vous",
  },
};
