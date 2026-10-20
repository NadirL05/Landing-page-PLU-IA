import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /division-parcellaire.
 *
 * Requête cible (IMPLEMENTATION_PLAN § E4) : « division parcellaire ».
 *
 * Textes officiels cités (consultés sur Légifrance le 2026-10-20) :
 *  - L442-1 (définition du lotissement), LEGIARTI000025019439, en vigueur
 *    depuis le 01/03/2012 ;
 *  - R*421-19 (permis d'aménager), LEGIARTI000034355339, modifié par le
 *    décret n° 2026-674 du 27/07/2026 (demandes déposées à compter du
 *    28/09/2026) : le a) vise les lotissements qui prévoient la création ou
 *    l'aménagement de voies, d'espaces ou d'équipements communs à plusieurs
 *    lots. La page ne détaille volontairement pas les autres cas du nouvel
 *    article, non relus intégralement ;
 *  - R*421-23 a) (déclaration préalable pour les autres lotissements) et b)
 *    (divisions dans les zones de l'art. L115-3), LEGIARTI000031764703 ;
 *  - R151-21 alinéa 3 (appréciation des règles du PLU sur l'ensemble du
 *    projet, sauf si le règlement s'y oppose), LEGIARTI000031720609 ;
 *  - fiche service-public.gouv.fr F37932 (vérifiée le 21/07/2026) : rôle du
 *    géomètre-expert (bornage, document modificatif du parcellaire
 *    cadastral), publication par le notaire en cas de vente.
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit 1e2ba0a) :
 *  - analyse d'une unité foncière formée de parcelles contiguës, fusion
 *    refusée si elles ne se touchent pas : src/lib/parcel-merge.ts:1-10 et
 *    :174-215, components/dashboard/parcel-picker-modal.tsx:580-600 ;
 *  - unité foncière à cheval sur plusieurs zones signalée, zonage de la plus
 *    grande parcelle retenu : src/lib/parcel-merge.ts:240-257,
 *    src/lib/plu-engine.ts:2575-2578 (UNITE_FONCIERE_ZONE_MIXTE) ;
 *  - tous les secteurs de zone qui touchent une parcelle relevés :
 *    src/lib/parcel-plu-proof.ts:1-21 ;
 *  - règles de zone avec leur provenance : src/lib/feasibility-finance.ts
 *    (`ConstraintSourceKind`), src/lib/plu-engine.ts (`PluRagSnippet`) ;
 *  - potentiel résiduel = surface de plancher autorisée − surface de plancher
 *    existante estimée à partir du RNB, bâti inconnu signalé :
 *    src/lib/gisement-engine.ts:162-172, :381-424.
 *
 * Fonciable NE découpe PAS de lots, ne trace aucune limite et ne dépose
 * aucune demande : la page le dit explicitement. L'exemple chiffré est un
 * calcul de principe fictif, pas une restitution de l'outil.
 */
export const DIVISION_PARCELLAIRE: MetierPageContent = {
  slug: "/division-parcellaire",
  navLabel: "Division parcellaire",
  related: ["/terrain-constructible", "/zonage-plu", "/prospection-fonciere", "/analyse-plu-parcelle", "/faisabilite-fonciere"],

  metaTitle: "Division parcellaire : règles, autorisations et étapes",
  metaDescription:
    "Division parcellaire : déclaration préalable ou permis d'aménager, application du PLU aux lots, rôle du géomètre-expert, étapes et limites.",
  dateModified: "2026-10-20",

  eyebrow: "Lotissement · déclaration préalable · unité foncière",
  h1: "Division parcellaire : règles, autorisations et étapes",
  lede:
    "Diviser un terrain pour en détacher un ou plusieurs lots à bâtir est encadré par le code de l'urbanisme : selon le projet, il faut une déclaration préalable ou un permis d'aménager, et les règles du PLU doivent rester respectées. Cette page explique les textes, les étapes, l'effet du PLU sur les lots, et ce que Fonciable aide à vérifier avant de lancer une division.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain que vous envisagez de diviser.",

  guide: {
    kicker: "Ce que dit le code",
    title: "Diviser un terrain : les règles à connaître",
    intro:
      "La division parcellaire n'est pas une simple formalité cadastrale. Dès qu'un lot est destiné à être bâti, l'opération entre dans le régime du lotissement, avec ses autorisations.",
    blocks: [
      {
        title: "Division et lotissement",
        paragraphs: [
          "Le code de l'urbanisme définit le lotissement comme la division en propriété ou en jouissance d'une unité foncière, ou de plusieurs unités foncières contiguës, ayant pour objet de créer un ou plusieurs lots destinés à être bâtis. Détacher un seul lot à bâtir d'un jardin suffit donc à constituer un lotissement.",
          "L'unité foncière désigne l'ensemble des parcelles contiguës qui appartiennent au même propriétaire : c'est elle, et non chaque parcelle cadastrale isolée, qui sert de base au raisonnement.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. L442-1 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000025019439" }],
      },
      {
        title: "Déclaration préalable ou permis d'aménager",
        paragraphs: [
          "Un lotissement qui prévoit la création ou l'aménagement de voies, d'espaces ou d'équipements communs à plusieurs lots relève du permis d'aménager. Les autres lotissements relèvent de la déclaration préalable : c'est le cas courant du détachement d'un lot desservi directement par la voie publique.",
          "Une division sans projet de construction peut aussi être soumise à déclaration préalable dans les zones que la commune a délimitées pour protéger certains paysages ou milieux. L'article qui fixe les cas de permis d'aménager a été modifié en 2026 pour les demandes déposées depuis le 28 septembre 2026 : vérifiez la version en vigueur à la date de votre demande, et interrogez le service urbanisme en cas de doute.",
        ],
        sources: [
          { label: "art. R*421-19 (permis d'aménager)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000034355339" },
          { label: "art. R*421-23 (déclaration préalable)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031764703" },
          { label: "Diviser un terrain (service-public.gouv.fr)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37932" },
        ],
      },
      {
        title: "Comment le PLU s'applique aux lots",
        paragraphs: [
          "Par défaut, dans un lotissement, l'ensemble du projet est apprécié au regard de la totalité des règles du PLU, comme si le terrain n'était pas divisé. Mais le règlement du PLU peut s'y opposer et exiger que chaque lot respecte les règles à lui seul : emprise au sol, retraits par rapport aux nouvelles limites, espaces verts.",
          "C'est souvent ce point qui décide de la faisabilité : une division qui passe à l'échelle du terrain entier peut échouer lot par lot, notamment pour le lot qui conserve la construction existante.",
        ],
        sources: [{ label: "Code de l'urbanisme, art. R151-21 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720609" }],
      },
      {
        title: "Les étapes d'une division parcellaire",
        paragraphs: ["L'ordre exact se fixe avec votre géomètre-expert et votre notaire ; les étapes ci-dessous sont celles que l'on retrouve dans la plupart des divisions."],
        list: [
          "1. Vérifier la zone et le règlement du PLU, et la façon dont il s'applique aux lots.",
          "2. Faire intervenir un géomètre-expert : plan de division, bornage, puis document modificatif du parcellaire cadastral pour mettre le cadastre à jour.",
          "3. Déposer la déclaration préalable ou le permis d'aménager en mairie.",
          "4. En cas de vente, signer l'acte chez le notaire, qui publie la division au service de la publicité foncière.",
        ],
        link: {
          text: "Pour la première étape, la méthode de vérification de la zone et des règles est détaillée sur",
          href: "/terrain-constructible",
          label: "la page Savoir si un terrain est constructible",
        },
      },
    ],
  },

  problem: {
    title: "Une division se gagne ou se perd sur les règles du lot",
    body: [
      "Sur le papier, beaucoup de grands terrains bâtis semblent pouvoir accueillir une construction de plus. En pratique, la division doit laisser au lot conservé et au lot créé de quoi respecter le règlement de zone, avec un accès et des réseaux.",
      "Avant de payer un géomètre, il faut donc savoir quelle zone couvre le terrain, si elle est homogène, ce que le règlement autorise et ce qui est déjà construit.",
    ],
    points: [
      {
        title: "Le terrain peut être à cheval sur deux zones",
        body: "Une limite de zone qui traverse l'unité foncière change les règles d'une partie du terrain, et parfois la faisabilité du lot à détacher.",
      },
      {
        title: "Le bâti existant consomme une partie des droits",
        body: "L'emprise et la surface de plancher déjà construites réduisent ce qu'il reste à bâtir, surtout si le PLU s'applique lot par lot.",
      },
      {
        title: "L'accès conditionne tout",
        body: "Un lot sans accès à une voie, ou qui en exige la création, change à la fois le projet et l'autorisation à demander.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable aide à vérifier avant une division",
    intro:
      "Fonciable ne dessine pas de lots et ne dépose aucune demande. Il rassemble les éléments à vérifier en amont, avec leur source.",
    items: [
      {
        ref: "DV.01",
        title: "Analyse à l'échelle de l'unité foncière",
        body: "Plusieurs parcelles contiguës peuvent être analysées ensemble comme une unité foncière. Si elles ne se touchent pas, la fusion est refusée : leurs surfaces ne s'additionnent pas au sens du PLU.",
      },
      {
        ref: "DV.02",
        title: "Zones multiples signalées",
        body: "Tous les secteurs de zone qui touchent la parcelle sont relevés. Une unité foncière à cheval sur plusieurs zones fait l'objet d'un avertissement : l'analyse retient la zone de la plus grande parcelle et le reste est à vérifier en mairie.",
      },
      {
        ref: "DV.03",
        title: "Règles de zone avec leur provenance",
        body: "Emprise au sol, hauteur, retraits et espaces verts sont extraits du règlement de zone ; chaque règle indique si elle vient de la base de zones, de la lecture du règlement, d'un profil de repli ou d'une estimation.",
      },
      {
        ref: "DV.04",
        title: "Bâti existant et potentiel résiduel",
        body: "En prospection, le potentiel résiduel d'une parcelle est la surface de plancher autorisée moins la surface déjà bâtie, estimée à partir du Référentiel national des bâtiments. Quand le bâti n'est pas connu, l'outil le signale au lieu de supposer un terrain vide.",
      },
    ],
    contextLink: {
      text: "Pour repérer à l'échelle d'une commune les terrains dont le potentiel n'est pas consommé, voir",
      href: "/prospection-fonciere",
      label: "la page Prospection foncière",
    },
  },

  steps: {
    title: "Préparer une division avec Fonciable",
    items: [
      {
        n: "01",
        title: "Sélectionner le terrain",
        body: "Une parcelle, ou plusieurs parcelles contiguës réunies en unité foncière, choisies par adresse ou sur la carte.",
      },
      {
        n: "02",
        title: "Lire la zone et ses règles",
        body: "Zonage du Géoportail de l'Urbanisme, secteurs multiples signalés, règles de zone avec leur provenance.",
      },
      {
        n: "03",
        title: "Situer le bâti existant",
        body: "Le bâti référencé et le potentiel résiduel donnent un premier ordre de grandeur de ce qu'il reste à construire.",
      },
      {
        n: "04",
        title: "Passer au géomètre et à la mairie",
        body: "Le plan de division, le bornage et l'autorisation restent l'affaire du géomètre-expert, du service urbanisme et du notaire.",
      },
    ],
  },

  sources: {
    title: "Les données publiques mobilisées",
    intro: "Les sources réellement interrogées par le produit pour cette première lecture.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface des parcelles.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement, quand la commune y publie son document.",
      "Référentiel national des bâtiments (RNB) : bâti existant, en prospection.",
      "API Carto du GPU : servitudes d'utilité publique disponibles.",
    ],
    note: "Le contour cadastral n'est pas une limite de propriété : seul un bornage par un géomètre-expert l'établit.",
  },

  proof: {
    title: "Pourquoi la règle « lot par lot » change tout",
    intro:
      "Un calcul de principe, sur des valeurs inventées, pour montrer l'effet de l'article R151-21 quand le PLU exige que chaque lot respecte les règles. Ce n'est pas une restitution de l'outil.",
    tag: "Exemple fictif, calcul de principe",
    rows: [
      { label: "Unité foncière (fictive)", value: "1 200 m²" },
      { label: "Emprise au sol maximale du règlement (hypothèse fictive)", value: "30 %" },
      { label: "Emprise déjà bâtie", value: "150 m²" },
      { label: "Emprise encore possible, terrain apprécié en entier", value: "210 m²" },
      { label: "Lot détaché (hypothèse)", value: "450 m²" },
      { label: "Emprise possible sur ce lot, règle appliquée lot par lot", value: "135 m²" },
      { label: "Lot conservé : 750 m² dont 150 m² bâtis", value: "20 % d'emprise" },
    ],
    caption:
      "Exemple entièrement fictif : ni terrain réel, ni règlement réel. Le taux de 30 % est une hypothèse de calcul, pas une règle générale ; chaque PLU fixe ses propres règles, zone par zone. Les retraits par rapport à la nouvelle limite, l'accès et les espaces verts peuvent encore réduire ces surfaces.",
  },

  limits: {
    title: "Ce que Fonciable ne fait pas pour une division",
    intro: "Une division engage des droits de propriété : elle se prépare avec des professionnels habilités.",
    items: [
      "Fonciable ne propose aucun découpage de lots, ne trace aucune limite et ne vérifie pas l'accès ni les réseaux d'un futur lot.",
      "La façon dont le PLU s'applique aux lots (R151-21) se lit dans le règlement de la commune et se confirme auprès du service urbanisme.",
      "Le choix entre déclaration préalable et permis d'aménager dépend du projet et des textes en vigueur à la date de la demande.",
      "La surface et le contour cadastraux ne remplacent pas un bornage par un géomètre-expert.",
      "Le bâti existant issu du Référentiel national des bâtiments peut être incomplet ; il ne donne pas la hauteur des bâtiments.",
      "Fonciable fournit une estimation d'aide à la décision : ce n'est ni un certificat d'urbanisme, ni une autorisation.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'une division parcellaire ?",
      a: "C'est le fait de découper une unité foncière en plusieurs terrains distincts. Lorsqu'au moins un des lots est destiné à être bâti, la division constitue un lotissement au sens de l'article L442-1 du code de l'urbanisme et doit être autorisée.",
    },
    {
      q: "Faut-il une autorisation pour diviser un terrain ?",
      a: "Pour créer un lot à bâtir, oui : une déclaration préalable dans le cas courant, un permis d'aménager si le lotissement prévoit la création ou l'aménagement de voies, d'espaces ou d'équipements communs à plusieurs lots. Une division sans projet de construction peut aussi nécessiter une déclaration préalable dans certaines zones protégées délimitées par la commune.",
    },
    {
      q: "Le PLU s'applique-t-il à chaque lot ou au terrain entier ?",
      a: "Par défaut, au projet dans son ensemble (article R151-21 du code de l'urbanisme). Mais le règlement du PLU peut s'y opposer et exiger que chaque lot respecte les règles à lui seul. Il faut donc lire le règlement de la zone avant de dessiner la division.",
    },
    {
      q: "Quel est le rôle du géomètre-expert ?",
      a: "Il établit le plan de division et le bornage, puis le document modificatif du parcellaire cadastral qui met le cadastre à jour. En cas de vente d'un lot, le notaire publie ensuite la division au service de la publicité foncière.",
    },
    {
      q: "Fonciable peut-il dire si mon terrain est divisible ?",
      a: "Pas directement. Fonciable lit la zone et les règles qui s'appliquent au terrain, signale une unité foncière à cheval sur plusieurs zones et, en prospection, estime le potentiel résiduel par rapport au bâti existant. Le découpage, l'accès des lots et l'autorisation relèvent du géomètre-expert et de la mairie.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain que vous voulez diviser",
    body: "Apportez une adresse : nous vous montrerons comment Fonciable lit sa zone, ses règles et son bâti avant que vous engagiez un géomètre.",
    label: "Prendre rendez-vous",
  },
};
