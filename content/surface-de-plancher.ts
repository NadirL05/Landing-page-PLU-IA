import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /surface-de-plancher.
 *
 * Requête cible (brief SEO 15, sujet 1, validé par Nadir le 26/10/2026) :
 * « calcul surface de plancher ». Plan : IMPLEMENTATION_PLAN § J1.
 *
 * Textes officiels cités (consultés le 2026-10-26) :
 *  - art. L111-14 du code de l'urbanisme (définition légale, hauteur sous
 *    plafond supérieure à 1,80 m, nu intérieur des façades),
 *    LEGIARTI000031210207 ;
 *  - art. R111-22 (les huit déductions), LEGIARTI000031721274, en vigueur
 *    depuis le 01/01/2016 (décret n° 2015-1783) ;
 *  - service-public.gouv.fr F2868 « Surface de plancher, emprise au sol et
 *    surface taxable » (vérifiée le 27/11/2024 selon la page).
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit d4f460d du
 * 2026-10-26) :
 *  - surface de plancher maximale théorique = emprise effective × niveaux :
 *    src/lib/plu-engine.ts:2723 (définition), :2957-2963 (calcul,
 *    niveaux = partie entière de hauteur max / hauteur d'étage) ;
 *  - hauteur d'étage par défaut 3 m : src/config/plu-definitions.ts:100 ;
 *    lecture de « R+2 » ou « 12 m » : src/lib/plu-engine.ts:2792 ;
 *  - emprise effective plafonnée par la part d'espaces verts :
 *    plu-engine.ts:2938-2940 ; règles contradictoires signalées :
 *    :2926-2936 ; avertissement REGLEMENT_ABSENT seulement si l'emprise ou la hauteur vient
 *    du profil statistique (pas pour la base de zones) : :2904-2924 ;
 *  - passage de la surface de plancher à la surface vendable (0,88 collectif,
 *    0,92 individuel groupé, 0,90 bureaux) : src/config/promoter-fiscal.ts:184-211.
 *  - NE FAIT PAS : le calcul légal de l'article R111-22 (aucune déduction de
 *    trémies, d'embrasures, de stationnement ou de surfaces sous 1,80 m dans
 *    le moteur d'enveloppe). La page le dit.
 *
 * L'exemple chiffré est entièrement fictif et étiqueté comme tel.
 */
export const SURFACE_DE_PLANCHER: MetierPageContent = {
  slug: "/surface-de-plancher",
  navLabel: "Surface de plancher",
  related: ["/emprise-au-sol", "/charge-fonciere", "/bilan-promoteur", "/analyse-plu-parcelle", "/faisabilite-fonciere"],

  metaTitle: "Calcul de la surface de plancher et exemple",
  metaDescription:
    "Surface de plancher : définition de l'article R111-22, les huit déductions, différence avec l'emprise au sol, exemple de calcul fictif pas à pas.",
  dateModified: "2026-10-26",
  article: { datePublished: "2026-10-26" },

  eyebrow: "Surface de plancher · R111-22 · enveloppe constructible",
  h1: "Calcul de la surface de plancher : méthode et exemple",
  lede:
    "La surface de plancher est la somme des surfaces closes et couvertes d'une construction dont la hauteur sous plafond dépasse 1,80 m, mesurées au nu intérieur des façades, après huit déductions fixées par le code de l'urbanisme. Voici la méthode, un exemple fictif, et la différence avec l'enveloppe théorique qu'autorise un PLU.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'une parcelle et de la surface que ses règles permettent.",

  guide: {
    kicker: "Définition et calcul",
    title: "Ce que dit le code de l'urbanisme",
    intro:
      "Textes consultés sur Légifrance et service-public.gouv.fr le 26 octobre 2026. Vérifiez la version en vigueur à la date de votre projet.",
    blocks: [
      {
        title: "Qu'est-ce que la surface de plancher ?",
        paragraphs: [
          "L'article L111-14 du code de l'urbanisme définit la surface de plancher comme la somme des surfaces de plancher closes et couvertes, sous une hauteur de plafond supérieure à 1,80 m, calculée à partir du nu intérieur des façades du bâtiment. Le même article renvoie à un décret le soin de fixer ce qui en est déduit.",
          "L'article R111-22 fixe ces déductions. La surface de plancher sert à déterminer l'autorisation d'urbanisme à demander et à vérifier les règles du PLU ; elle est distincte de la surface habitable et de la surface taxable, base de la taxe d'aménagement.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. L111-14 (Légifrance, consulté le 26/10/2026)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031210207" },
          { label: "Surface de plancher, emprise au sol et surface taxable (service-public.gouv.fr, F2868)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2868" },
        ],
      },
      {
        title: "Les huit déductions de l'article R111-22",
        paragraphs: [
          "On part de la somme des surfaces de chaque niveau clos et couvert, mesurées au nu intérieur des façades, puis on retire, dans l'ordre de l'article :",
        ],
        list: [
          "1° l'épaisseur des murs qui entourent les embrasures des portes et fenêtres donnant sur l'extérieur ;",
          "2° les vides et trémies des escaliers et ascenseurs ;",
          "3° les surfaces dont la hauteur sous plafond est inférieure ou égale à 1,80 m ;",
          "4° les surfaces de stationnement des véhicules, rampes d'accès et aires de manœuvre comprises ;",
          "5° les combles non aménageables pour l'habitation ou une activité ;",
          "6° les locaux techniques d'un immeuble ou d'un groupe de bâtiments (hors maison individuelle), y compris les locaux de stockage des déchets ;",
          "7° les caves et celliers annexes à des logements, lorsqu'ils ne sont desservis que par une partie commune ;",
          "8° une surface égale à 10 % des surfaces affectées à l'habitation, après les déductions précédentes, lorsque les logements sont desservis par des parties communes intérieures.",
        ],
        sources: [
          { label: "Code de l'urbanisme, art. R111-22 (Légifrance, en vigueur depuis le 01/01/2016, consulté le 26/10/2026)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031721274" },
        ],
      },
      {
        title: "Comment calculer la surface de plancher, pas à pas",
        paragraphs: [
          "Le calcul se fait niveau par niveau, sur plans : mesurez chaque niveau clos et couvert au nu intérieur des murs de façade, additionnez, puis appliquez les déductions qui concernent la construction. Une maison individuelle n'est pas concernée par les déductions 6° à 8°.",
          "Un balcon ouvert ou une terrasse non couverte ne sont pas clos et couverts : ils n'entrent pas dans le total. Un garage intégré y entre, puis il est retiré au titre du stationnement. Un exemple fictif figure plus bas.",
        ],
      },
      {
        title: "De la règle du PLU à la surface de plancher réalisable",
        paragraphs: [
          "Avant tout plan, un opérateur veut savoir combien de mètres carrés une parcelle peut porter. Le règlement de zone fixe des limites (emprise au sol, hauteur, retraits, espaces verts) dont on déduit une enveloppe théorique : surface de la parcelle × emprise au sol autorisée × nombre de niveaux que la hauteur permet.",
          "Illustration fictive : sur 600 m² de terrain, avec une emprise au sol de 40 % et une hauteur de 9 m, on obtient 240 m² d'emprise et trois niveaux de 3 m, soit une enveloppe de 720 m². Ce chiffre est un plafond : retraits, prospects, stationnement à créer, gabarit et déductions de l'article R111-22 le réduisent, parfois fortement.",
        ],
        link: {
          text: "La définition de l'emprise au sol et le rôle du coefficient d'emprise au sol sont détaillés sur",
          href: "/emprise-au-sol",
          label: "la page Emprise au sol et CES",
        },
      },
      {
        title: "Pourquoi l'enveloppe théorique n'est pas la surface de plancher du permis",
        paragraphs: [
          "L'enveloppe multiplie une emprise par un nombre de niveaux : elle compte murs de façade, escaliers, parkings intégrés et combles bas. La surface de plancher du permis est mesurée au nu intérieur, après déductions. L'une dit ce que la règle autorise au maximum, l'autre ce qu'un projet précis développe. Dans un bilan, la surface vendable est encore inférieure : parties communes et circulations ne se vendent pas.",
        ],
        link: {
          text: "Le passage de la surface constructible au prix de terrain admissible est expliqué sur",
          href: "/charge-fonciere",
          label: "la page Charge foncière",
        },
      },
    ],
  },

  problem: {
    title: "Une surface mal estimée fausse tout le reste",
    body: [
      "Chiffre d'affaires, coûts et prix du terrain dépendent de la surface réalisable. Or deux chiffres circulent sous le même nom : l'enveloppe théorique tirée du règlement et la surface de plancher de l'article R111-22. Les confondre surestime ce qu'une parcelle permet.",
    ],
    points: [
      {
        title: "Le règlement ne donne pas la surface",
        body: "Il fixe des limites qu'il faut combiner soi-même.",
      },
      {
        title: "Les déductions changent le résultat",
        body: "Stationnement intégré, trémies, combles bas : la surface d'un projet est inférieure à sa surface brute.",
      },
      {
        title: "Les règles se contredisent parfois",
        body: "Emprise élevée et forte part d'espaces verts ne s'appliquent pas ensemble au maximum.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable calcule, et ce qu'il ne calcule pas",
    intro:
      "Fonciable calcule une enveloppe théorique à partir des règles lues. Il n'applique aucune des déductions de l'article R111-22 : la surface de plancher d'un projet se mesure sur plans.",
    items: [
      {
        ref: "SP.01",
        title: "Surface de plancher maximale théorique",
        body: "Emprise effective × niveaux, soit la partie entière de la hauteur maximale divisée par 3 m par défaut.",
      },
      {
        ref: "SP.02",
        title: "Hauteur lue en mètres ou en niveaux",
        body: "Une hauteur écrite « 12 m » ou « R+2 » dans le règlement est convertie en nombre de niveaux.",
      },
      {
        ref: "SP.03",
        title: "Emprise plafonnée par les espaces verts",
        body: "L'emprise retenue ne dépasse pas ce que laisse la part d'espaces verts ; un total supérieur à 100 % est signalé comme contradiction.",
      },
      {
        ref: "SP.04",
        title: "Origine de chaque limite",
        body: "Une emprise ou une hauteur issue d'un profil statistique, faute de règlement, déclenche un avertissement ; la source de chaque limite est indiquée.",
      },
      {
        ref: "SP.05",
        title: "Surface vendable pour le bilan",
        body: "Dans le bilan, la surface de plancher devient surface vendable par un coefficient par défaut : 0,88 en collectif, 0,92 en individuel groupé, 0,90 en bureaux.",
      },
    ],
    contextLink: {
      text: "Pour voir l'enveloppe calculée sur une parcelle réelle, avec la source de chaque règle :",
      href: "/analyse-plu-parcelle",
      label: "analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "De la parcelle à l'enveloppe constructible",
    items: [
      {
        n: "01",
        title: "Choisir la parcelle",
        body: "Par son adresse ou sur la carte : contour et surface viennent du cadastre de l'IGN.",
      },
      {
        n: "02",
        title: "Lire la zone et ses limites",
        body: "Zonage du Géoportail de l'Urbanisme, puis emprise, hauteur et espaces verts du règlement, avec leur provenance.",
      },
      {
        n: "03",
        title: "Calculer l'enveloppe",
        body: "Emprise effective, niveaux, surface maximale théorique, avertissements éventuels.",
      },
      {
        n: "04",
        title: "Confronter au projet",
        body: "L'architecte mesure ensuite la surface de plancher du projet sur plans.",
      },
    ],
  },

  sources: {
    title: "Les sources derrière l'enveloppe",
    intro: "Les données publiques interrogées par le produit pour estimer la surface constructible d'une parcelle.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de zone, quand la commune y publie son document.",
      "Règlement de zone analysé : emprise au sol, hauteur, espaces verts, avec l'extrait cité quand il est disponible.",
    ],
    note:
      "Une limite absente du règlement disponible est remplacée par une valeur de repli signalée.",
  },

  proof: {
    title: "Exemple de calcul de surface de plancher",
    intro: "Une maison individuelle sur deux niveaux, mesurée sur plans.",
    tag: "Exemple fictif, calcul de principe",
    rows: [
      { label: "Rez-de-chaussée, au nu intérieur des façades (garage intégré compris)", value: "128 m²" },
      { label: "Étage, au nu intérieur des façades", value: "90 m²" },
      { label: "Garage intégré, stationnement (4°)", value: "− 18 m²" },
      { label: "Parties de l'étage sous 1,80 m de hauteur (3°)", value: "− 12 m²" },
      { label: "Trémie de l'escalier à l'étage (2°)", value: "− 4 m²" },
      { label: "Embrasures des portes et fenêtres (1°)", value: "− 3 m²" },
      { label: "Surface de plancher", value: "181 m²" },
    ],
    caption:
      "Exemple entièrement fictif : ni maison réelle, ni client, ni plans réels. Les surfaces sont inventées pour illustrer l'ordre des déductions de l'article R111-22. Pour un dossier de permis, la surface de plancher est calculée par le maître d'œuvre sur les plans du projet.",
  },

  limits: {
    title: "Ce qu'il faut vérifier ailleurs",
    intro: "L'enveloppe théorique aide à trier les terrains ; elle ne remplace ni les plans ni l'instruction.",
    items: [
      "L'enveloppe ne tient pas compte des retraits, prospects, gabarits, règles graphiques ou servitudes qui peuvent réduire la surface réalisable.",
      "La hauteur d'étage de 3 m est une hypothèse par défaut : un rez-de-chaussée commercial ou des niveaux plus bas changent le nombre de niveaux.",
      "Un règlement incomplet donne une enveloppe incertaine : l'avertissement le signale, la lecture du règlement en vigueur reste nécessaire.",
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation : la conformité d'un projet se confirme auprès du service urbanisme de la commune.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce que la surface de plancher ?",
      a: "C'est la somme des surfaces closes et couvertes d'une construction dont la hauteur sous plafond dépasse 1,80 m, mesurées au nu intérieur des façades (art. L111-14 du code de l'urbanisme), après les huit déductions de l'article R111-22.",
    },
    {
      q: "Le garage compte-t-il dans la surface de plancher ?",
      a: "Non. Les surfaces aménagées pour le stationnement des véhicules, y compris les rampes d'accès et les aires de manœuvre, sont déduites (art. R111-22, 4°). Un garage intégré est mesuré avec le reste du niveau, puis retiré.",
    },
    {
      q: "Quelle différence entre surface de plancher et emprise au sol ?",
      a: "La surface de plancher additionne les surfaces de tous les niveaux, mesurées à l'intérieur. L'emprise au sol est la projection verticale du volume de la construction sur le terrain, débords et surplombs inclus, sans notion de niveaux.",
    },
    {
      q: "Fonciable calcule-t-il la surface de plancher d'un projet ?",
      a: "Non. Il calcule une surface de plancher maximale théorique à partir de l'emprise au sol, de la hauteur et des espaces verts du règlement de zone, sans les déductions de l'article R111-22.",
    },
  ],

  finalCta: {
    title: "Parlons d'une parcelle et de ce qu'elle permet",
    body: "Apportez une adresse : nous vous montrerons l'enveloppe constructible que Fonciable calcule, la source de chaque règle et ce qui reste à vérifier.",
    label: "Prendre rendez-vous",
  },
};
