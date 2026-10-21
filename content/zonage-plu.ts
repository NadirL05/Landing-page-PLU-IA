import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /zonage-plu (page mère des pages de zone).
 *
 * Requêtes cibles (IMPLEMENTATION_PLAN § E5) : « zonage plu », « zone plu ».
 * Les requêtes « zone ua », « zone ub », « zone aua » sont traitées sur
 * /zonage-plu/zone-u et /zonage-plu/zone-au, sans aucune règle chiffrée
 * générale : UA, UB, AUa sont des sous-secteurs propres à chaque PLU.
 *
 * Textes officiels (Légifrance, consultés le 2026-10-20, tous en vigueur
 * depuis le 01/01/2016) : R151-17 (LEGIARTI000031720617), R151-18 (…615),
 * R151-20 (…611), R151-22 (…607), R151-24 (…603).
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit 1e2ba0a) :
 *  - zone lue dans le GPU (`zone_urba`) et rattachée au document en vigueur :
 *    src/lib/plu-gpu-link.ts:1-16 ;
 *  - tous les secteurs qui touchent la parcelle relevés, couche indisponible
 *    = statut inconnu : src/lib/parcel-plu-proof.ts:1-21 ;
 *  - le type de zone normalisé (typezone) fait foi avant le libellé libre :
 *    src/config/plu-definitions.ts:86-97 (`isClosedAuZone`) ;
 *  - zones A et N bloquantes, zones AU fermées bloquantes :
 *    src/lib/plu-engine.ts:2901-2925 ;
 *  - zone inconnue signalée (« ZONE_INCONNUE ») : src/lib/plu-engine.ts:2794-2800 ;
 *  - règlement téléchargé depuis le GPU puis lu (emprise, retrait, hauteur,
 *    espaces verts) : src/lib/plu-pdf-extract.ts (en-tête), src/lib/plu-engine.ts
 *    (`PluRagSnippet`).
 *
 * Exemple réel : parcelle 44109000BZ0070, libellé « UMap », typezone « U »,
 * relevés le 2026-10-20 (docs/PREUVES-page-analyse-plu.md §1).
 */
export const ZONAGE_PLU: MetierPageContent = {
  slug: "/zonage-plu",
  navLabel: "Zonage PLU",
  related: ["/zonage-plu/zone-u", "/zonage-plu/zone-au", "/zonage-plu/zone-a", "/zonage-plu/zone-n", "/terrain-constructible", "/analyse-plu-parcelle"],

  metaTitle: "Zonage PLU : zones U, AU, A, N et sous-secteurs",
  metaDescription:
    "Zonage PLU : zones U, AU, A et N selon le code de l'urbanisme, pourquoi UA, UB ou AUa varient d'un PLU à l'autre, comment trouver la zone d'une parcelle.",
  dateModified: "2026-10-20",

  eyebrow: "Zones U · AU · A · N · sous-secteurs",
  h1: "Zonage PLU : les zones U, AU, A et N expliquées",
  lede:
    "Le zonage du plan local d'urbanisme découpe la commune en zones, chacune avec ses règles. Le code de l'urbanisme fixe quatre familles de zones ; chaque commune les subdivise ensuite à sa façon. Cette page explique ce que dit le code, comment lire le nom d'une zone, comment trouver celle d'une parcelle, et ce que Fonciable en lit automatiquement.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle et de sa zone.",

  guide: {
    kicker: "Ce que dit le code",
    title: "Quatre familles de zones, des centaines de sous-secteurs",
    blocks: [
      {
        title: "Le zonage, pièce du règlement du PLU",
        paragraphs: [
          "Le règlement du PLU délimite, sur ses documents graphiques, les zones urbaines, à urbaniser, agricoles, et naturelles et forestières, et fixe les règles applicables à l'intérieur de chacune. Le plan de zonage montre où passent les limites ; le règlement écrit dit ce qu'on peut y faire.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-17 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720617" }],
      },
      {
        title: "Les quatre familles fixées par le code de l'urbanisme",
        paragraphs: ["Chaque famille a une définition réglementaire. Le détail de chacune est sur sa page."],
        list: [
          "Zone U (urbaine) : secteurs déjà urbanisés, ou desservis par des équipements publics de capacité suffisante pour les constructions à implanter.",
          "Zone AU (à urbaniser) : secteurs destinés à être ouverts à l'urbanisation, immédiatement si les réseaux en périphérie suffisent, sinon après modification ou révision du PLU.",
          "Zone A (agricole) : secteurs à protéger en raison du potentiel agronomique, biologique ou économique des terres agricoles.",
          "Zone N (naturelle et forestière) : secteurs à protéger pour la qualité des sites et paysages, une exploitation forestière, leur caractère naturel, les ressources naturelles ou la prévention des risques.",
        ],
        sources: [
          { label: "art. R151-18", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615" },
          { label: "art. R151-20", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720611" },
          { label: "art. R151-22", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720607" },
          { label: "art. R151-24", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720603" },
        ],
      },
      {
        title: "UA, UB, 1AU, AUa : des noms propres à chaque PLU",
        paragraphs: [
          "Le code ne connaît que U, AU, A et N. Les lettres et chiffres qui suivent (UA, UB, UC, 1AU, 2AU, AUa, Nh…) sont des sous-secteurs que chaque commune ou intercommunalité crée et nomme librement dans son propre PLU. Une zone UB d'une commune n'a donc pas les mêmes règles qu'une zone UB de la commune voisine : hauteur, emprise au sol ou implantation se lisent dans le règlement de la commune concernée, jamais dans une grille nationale.",
          "Certaines habitudes reviennent souvent, comme UA pour un centre ancien ou 2AU pour une zone à urbaniser fermée, mais elles n'ont aucune valeur réglementaire.",
        ],
      },
      {
        title: "Trouver la zone d'une parcelle",
        paragraphs: [
          "Quand la commune publie son document sur le Géoportail de l'Urbanisme, la zone d'une parcelle s'y consulte sur la carte, avec le règlement téléchargeable. Sinon, le plan de zonage et le règlement sont disponibles en mairie ou sur le site de la collectivité.",
          "Dans les données du Géoportail, chaque secteur porte deux informations : un libellé choisi par la commune (par exemple « UMap ») et un type de zone normalisé (U, AU, A ou N, la zone AU distinguant ouverte et fermée). C'est le type qui dit à quelle famille appartient un libellé inhabituel.",
        ],
        link: {
          text: "Pour aller du zonage à la constructibilité réelle d'un terrain, voir",
          href: "/terrain-constructible",
          label: "la page Savoir si un terrain est constructible",
        },
      },
    ],
  },

  problem: {
    title: "Un nom de zone ne suffit pas à connaître les règles",
    body: [
      "« Terrain en zone UB » : l'information circule dans les annonces et les échanges, mais elle ne dit rien de précis tant qu'on n'a pas ouvert le règlement de la commune. Et une parcelle n'est pas toujours couverte par une seule zone.",
      "Lire un zonage correctement demande trois choses : le bon document, en vigueur ; tous les secteurs qui touchent la parcelle ; et le règlement de chacun.",
    ],
    points: [
      {
        title: "Le document doit être celui en vigueur",
        body: "Un PLU évolue par modifications et révisions. Une zone lue dans une version périmée peut ne plus exister.",
      },
      {
        title: "Une parcelle peut toucher plusieurs zones",
        body: "Une limite de zone peut couper une parcelle : les règles changent alors d'une partie du terrain à l'autre.",
      },
      {
        title: "Les libellés sont libres",
        body: "Deux communes peuvent donner le même nom à des zones très différentes ; seul le règlement local fait foi.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable lit dans le zonage d'une parcelle",
    intro: "Le zonage est lu à la source, et l'outil dit ce qu'il a trouvé, d'où cela vient, et ce qu'il n'a pas pu établir.",
    items: [
      {
        ref: "ZP.01",
        title: "Zone rattachée au document en vigueur",
        body: "La zone est lue dans le Géoportail de l'Urbanisme et rattachée au document en vigueur de la commune, à partir de la position de la parcelle.",
      },
      {
        ref: "ZP.02",
        title: "Tous les secteurs de la parcelle",
        body: "Chaque secteur qui touche la parcelle est relevé. Une couche indisponible donne un statut inconnu, jamais une absence.",
      },
      {
        ref: "ZP.03",
        title: "Type de zone avant libellé",
        body: "Le type de zone normalisé fait foi en priorité sur le libellé libre, pour ranger correctement un secteur au nom inhabituel. Une zone non identifiée est signalée comme telle.",
      },
      {
        ref: "ZP.04",
        title: "Zones bloquantes signalées",
        body: "Zones agricoles et naturelles, et zones à urbaniser fermées, reçoivent une contrainte bloquante : aucune surface constructible n'est calculée.",
      },
      {
        ref: "ZP.05",
        title: "Règlement de zone lu",
        body: "Le règlement est téléchargé depuis le Géoportail de l'Urbanisme puis lu pour l'emprise au sol, la hauteur, les retraits et les espaces verts, avec la page citée quand elle est disponible.",
      },
    ],
    contextLink: {
      text: "La lecture complète d'une parcelle, avec un exemple réel à Nantes, est détaillée sur",
      href: "/analyse-plu-parcelle",
      label: "la page Analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "De la parcelle à sa zone",
    items: [
      { n: "01", title: "Localiser la parcelle", body: "Par son adresse ou sur la carte ; contour et surface viennent de l'API Carto Cadastre de l'IGN." },
      { n: "02", title: "Lire les secteurs", body: "Les secteurs du Géoportail de l'Urbanisme qui touchent la parcelle sont relevés, avec leur libellé et leur type." },
      { n: "03", title: "Ouvrir le règlement", body: "Le règlement de la zone est lu pour en extraire les règles qui déterminent le volume constructible." },
      { n: "04", title: "Confirmer en mairie", body: "Les points non établis, ou un document en cours d'évolution, se vérifient auprès du service urbanisme." },
    ],
  },

  sources: {
    title: "Les données publiques consultées",
    intro: "Les sources réellement interrogées par le produit pour lire le zonage d'une parcelle.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : secteurs de zone, document en vigueur et règlement, quand la commune y publie son document.",
    ],
    note: "Si la commune ne publie pas son document sur le Géoportail de l'Urbanisme, aucune zone n'est garantie : la mairie reste la source de référence.",
  },

  proof: {
    title: "Libellé local, type national : un exemple réel",
    intro: "À Nantes, la parcelle ci-dessous est dans un secteur nommé « UMap » par le PLU métropolitain ; le Géoportail le range dans le type U.",
    tag: "Exemple réel · parcelle 44109000BZ0070 · Nantes",
    rows: [
      { label: "Parcelle cadastrale", value: "44109000BZ0070" },
      { label: "Libellé du secteur (PLUm de Nantes Métropole)", value: "UMap" },
      { label: "Type de zone normalisé", value: "U (zone urbaine)" },
      { label: "Libellé long", value: "Secteur de développement des centralités actuelles ou en devenir" },
    ],
    caption:
      "Valeurs relevées le 20 octobre 2026 au Géoportail de l'Urbanisme (API Carto, couche des zones d'urbanisme). Les règles de ce secteur se lisent dans le règlement du PLUm de Nantes Métropole ; elles ne valent pas pour un secteur portant un nom proche ailleurs.",
  },

  limits: {
    title: "Ce qu'une lecture du zonage ne dit pas",
    intro: "Le zonage est le point de départ, pas la conclusion.",
    items: [
      "Une zone constructible n'emporte pas un droit à construire : règlement, servitudes, risques et réseaux peuvent limiter ou empêcher un projet.",
      "Une modification ou une révision en cours peut changer le zonage avant d'apparaître dans les données publiques.",
      "Les règles d'un sous-secteur (UA, UB, AUa…) n'existent que dans le règlement de la commune : aucune valeur générale ne peut s'y substituer.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce que le zonage d'un PLU ?",
      a: "C'est le découpage du territoire de la commune en zones, délimitées sur les documents graphiques du règlement du PLU. Chaque zone a ses propres règles : destinations admises, emprise au sol, hauteur, implantation, espaces verts, stationnement.",
    },
    {
      q: "Quelles sont les zones d'un PLU ?",
      a: "Le code de l'urbanisme en fixe quatre familles : zones urbaines (U), zones à urbaniser (AU), zones agricoles (A) et zones naturelles et forestières (N). Chaque PLU les subdivise ensuite en sous-secteurs qu'il nomme librement.",
    },
    {
      q: "Que signifient UA, UB ou AUa ?",
      a: "Ce sont des sous-secteurs créés par chaque PLU : UA et UB sont des secteurs de la zone urbaine, AUa un secteur de la zone à urbaniser. Leurs règles varient d'une commune à l'autre et se lisent uniquement dans le règlement local.",
    },
    {
      q: "Comment connaître la zone PLU d'une parcelle ?",
      a: "Sur le Géoportail de l'Urbanisme, quand la commune y publie son document, ou en mairie. Fonciable lit automatiquement la zone à partir de la position de la parcelle et la rattache au document en vigueur, en signalant les cas où elle ne peut pas l'établir.",
    },
    {
      q: "Une parcelle peut-elle être dans deux zones ?",
      a: "Oui. Une limite de zone peut traverser une parcelle ; chaque partie suit alors les règles de sa zone. Fonciable relève tous les secteurs qui touchent la parcelle plutôt que d'en retenir un seul sans le dire.",
    },
  ],

  finalCta: {
    title: "Parlons du zonage d'une parcelle que vous étudiez",
    body: "Apportez une adresse : nous vous montrerons comment Fonciable lit sa zone, son document et son règlement.",
    label: "Prendre rendez-vous",
  },
};
