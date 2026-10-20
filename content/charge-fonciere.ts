import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /charge-fonciere.
 *
 * Requêtes cibles (IMPLEMENTATION_PLAN § E2) : « charge foncière », « calcul
 * à rebours », « charge foncière admissible ».
 *
 * Affirmations sur l'outil vérifiées dans le dépôt produit sas-plu-3d
 * (clone en lecture, commit 1e2ba0a du 2026-10-20) :
 *  - mode « Compte à rebours » : la marge cible fixe l'offre d'achat
 *    maximale, le prix du terrain n'est plus saisi :
 *    components/dashboard/study-financial-panel.tsx:205-221 ;
 *  - prix maximal du terrain en formule fermée, qui tient compte des frais
 *    proportionnels au prix du terrain (notaire, frais financiers) :
 *    `computePrixMaxTerrainEur`, src/lib/finance/costs.ts:137-200 (coefficient
 *    α = kN + (1 + kN) × kFin), appelée par src/lib/finance/scenario.ts:437-447 ;
 *    libellé « Charge foncière maximale » : src/lib/committee-dossier.ts:164 ;
 *  - surface de plancher potentielle = surface × emprise au sol maximale ×
 *    niveaux permis par la hauteur : src/lib/finance/scenario.ts:161-175 ;
 *  - rien n'est chiffré si les règles de la parcelle ne sont pas vérifiées :
 *    src/lib/finance/scenario.ts:139-145 et src/lib/study-diagnosis.ts:323
 *    (« surface de plancher et charge foncière non chiffrables sans règles
 *    vérifiées ») ; aucun bilan en zone A ou N : scenario.ts:146-147 ;
 *  - prix de sortie appuyé sur les mutations DVF ou, à défaut, une valeur de
 *    repli signalée : `MarketEvidence`, src/lib/feasibility-finance.ts:147-155 ;
 *  - acquisition maximale recalculée sous variations (prix de vente et
 *    travaux ±10 %, durée et taux si financement mensuel) :
 *    src/lib/finance/sensitivity.ts, components/dashboard/study-operation-finance.tsx:148-163.
 *
 * Partie « guide » : méthode générale, sans chiffre de marché. L'exemple
 * chiffré est celui du modèle fictif public/modeles/bilan-promoteur-exemple-fictif.xlsx.
 */
export const CHARGE_FONCIERE: MetierPageContent = {
  slug: "/charge-fonciere",
  navLabel: "Charge foncière",
  related: ["/bilan-promoteur", "/faisabilite-fonciere", "/analyse-plu-parcelle", "/prospection-fonciere"],

  metaTitle: "Charge foncière : définition, calcul à rebours et exemple",
  metaDescription:
    "Charge foncière : définition, calcul à rebours de la charge foncière admissible, incidence foncière au m² de surface de plancher, exemple fictif et limites.",
  dateModified: "2026-10-20",

  eyebrow: "Foncier · compte à rebours · incidence foncière",
  h1: "Charge foncière : définition et calcul à rebours",
  lede:
    "La charge foncière est ce que coûte un terrain à l'opération qui va s'y construire. Pour un promoteur, elle ne se constate pas : elle se calcule, à partir de ce que l'opération rapportera. Cette page explique la définition, le calcul à rebours de la charge foncière admissible, l'incidence foncière, et ce que Fonciable en chiffre à partir des données publiques d'une parcelle.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain et du prix que votre opération peut supporter.",

  guide: {
    kicker: "Définition et calcul",
    title: "Ce que recouvre la charge foncière",
    blocks: [
      {
        title: "Qu'est-ce que la charge foncière ?",
        paragraphs: [
          "Dans un bilan promoteur, la charge foncière est le coût total du terrain pour l'opération : le prix payé au vendeur, les frais d'acquisition (notaire, droits) et, selon les cas, les dépenses nécessaires pour rendre le terrain disponible, comme une démolition ou la libération des lieux.",
          "Le terme sert aussi, rapporté à la surface de plancher que le terrain permet de construire, à exprimer un coût du foncier « par mètre carré construit ». On parle alors plutôt d'incidence foncière : c'est cette valeur qui permet de comparer deux terrains.",
        ],
      },
      {
        title: "Le calcul à rebours de la charge foncière admissible",
        paragraphs: [
          "Un promoteur ne part pas du prix demandé par le vendeur. Il part de ce que l'opération peut rapporter et remonte jusqu'au terrain : c'est le compte à rebours. Le résultat est la charge foncière admissible, le montant maximal que l'opération peut consacrer au foncier tout en dégageant la marge visée.",
        ],
        list: [
          "1. Estimer la surface de plancher réalisable à partir des règles du PLU (emprise au sol, hauteur, retraits, espaces verts).",
          "2. En déduire le chiffre d'affaires hors taxes : surface vendable × prix de vente, plus les autres recettes.",
          "3. Retirer la marge cible, exprimée en pourcentage du chiffre d'affaires.",
          "4. Retirer toutes les dépenses hors foncier : travaux, honoraires, taxes et participations, assurances, aléas, commercialisation, frais financiers.",
          "5. Le solde est la charge foncière admissible, frais d'acquisition compris. Divisée par (1 + taux des frais d'acquisition), elle donne le prix maximal à proposer au propriétaire.",
        ],
        link: {
          text: "Les postes de dépenses sont détaillés un par un sur",
          href: "/bilan-promoteur",
          label: "la page Bilan promoteur, avec un modèle Excel",
        },
      },
      {
        title: "Incidence foncière : comparer des terrains entre eux",
        paragraphs: [
          "Deux terrains au même prix n'ont pas la même valeur pour un promoteur si l'un permet de construire deux fois plus que l'autre. L'incidence foncière, charge foncière divisée par la surface de plancher, ramène les terrains à une base comparable : le coût du foncier par mètre carré construit.",
          "C'est aussi le premier indicateur à confronter aux opérations récentes du secteur. Une incidence très supérieure à ce que le marché local permet de revendre signale un terrain trop cher pour une opération neuve.",
        ],
      },
      {
        title: "Ce qui fait varier la charge foncière admissible",
        paragraphs: ["Le calcul à rebours amplifie chaque hypothèse : quelques pourcents d'écart sur une recette ou une dépense se retrouvent entièrement sur le prix du terrain."],
        list: [
          "La surface de plancher réalisable, donc la lecture du règlement de zone : c'est l'hypothèse la plus sensible.",
          "Le prix de sortie et la part de surface réellement vendable.",
          "Le coût des travaux : sous-sols, pente, fondations, démolitions.",
          "Les obligations du PLU qui pèsent sur le programme, comme une part de logements sociaux ou des places de stationnement à créer.",
          "La taxe d'aménagement et les participations, la durée de l'opération et son financement.",
          "La marge visée, qui dépend du risque que l'opérateur accepte.",
        ],
      },
      {
        title: "Quand le prix demandé dépasse la charge foncière admissible",
        paragraphs: [
          "L'écart entre le prix demandé par le vendeur et la charge foncière admissible est le cœur de la négociation. S'il persiste, trois voies restent : revoir le programme (densité, typologies, part vendue), ajuster des hypothèses à partir d'éléments plus précis (devis, étude de sol, échange avec la mairie), ou renoncer au terrain. Augmenter le prix sans changer les hypothèses revient à accepter une marge plus faible.",
        ],
      },
    ],
  },

  problem: {
    title: "Le prix d'un terrain se déduit de l'opération, pas l'inverse",
    body: [
      "Le prix affiché par un vendeur reflète souvent ce que le voisinage a vendu, pas ce qu'une opération neuve peut payer. Pour un opérateur, la seule question utile est : combien ce terrain vaut-il compte tenu de ce que je pourrai y construire et revendre ?",
      "Y répondre suppose de réunir, avant même une visite, les règles d'urbanisme de la parcelle, un prix de sortie crédible et un ordre de grandeur des coûts. C'est ce travail de collecte qui ralentit la première offre.",
    ],
    points: [
      {
        title: "Une offre trop haute ampute la marge",
        body: "Tout euro payé au-delà de la charge foncière admissible est retiré de la marge de l'opération, à hypothèses inchangées.",
      },
      {
        title: "Une offre trop basse fait perdre le terrain",
        body: "Sur un marché disputé, une offre sous-évaluée par prudence laisse le terrain à un concurrent qui a mieux lu les règles ou le marché.",
      },
      {
        title: "La surface constructible décide de tout",
        body: "Une erreur sur l'emprise au sol ou la hauteur se reporte sur le chiffre d'affaires, puis entièrement sur le prix du terrain.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable chiffre pour la charge foncière",
    intro:
      "Le calcul se fait dans l'application, à partir de la parcelle choisie et de vos hypothèses. Chaque valeur indique son origine ; rien n'est calculé sur cette page publique.",
    items: [
      {
        ref: "CF.01",
        title: "Surface de plancher potentielle",
        body: "Surface de la parcelle × emprise au sol maximale × nombre de niveaux permis par la hauteur maximale. Le calcul n'est fait qu'en zone constructible et seulement lorsque l'application des règles à toute la parcelle est vérifiée.",
      },
      {
        ref: "CF.02",
        title: "Prix de sortie sourcé",
        body: "Le prix de vente au m² s'appuie sur les mutations DVF relevées autour de la parcelle. Sans mutation exploitable, une valeur de repli est utilisée et signalée comme telle.",
      },
      {
        ref: "CF.03",
        title: "Mode compte à rebours",
        body: "La marge cible pilote directement l'offre d'achat maximale : le prix du terrain n'est plus une saisie, il est calculé pour que l'opération atteigne la marge visée.",
      },
      {
        ref: "CF.04",
        title: "Frais liés au prix du terrain",
        body: "Les frais de notaire sur le terrain et les frais financiers dépendent eux-mêmes du prix du terrain : le calcul en tient compte au lieu de les figer, pour que la marge obtenue en achetant au prix maximal soit bien la marge visée.",
      },
      {
        ref: "CF.05",
        title: "Acquisition maximale sous variations",
        body: "L'acquisition maximale est recalculée avec un prix de vente et un coût de travaux à plus ou moins 10 %, et, si le financement mois par mois est activé, avec une durée allongée et un taux relevé.",
      },
      {
        ref: "CF.06",
        title: "Pas de chiffre sans règles vérifiées",
        body: "Si les règles applicables à la parcelle ne sont pas vérifiées, l'outil indique que la surface de plancher et la charge foncière ne sont pas chiffrables plutôt que d'afficher un montant. En zone agricole ou naturelle, aucun bilan n'est produit.",
      },
    ],
  },

  steps: {
    title: "De la parcelle au prix maximal du terrain",
    items: [
      {
        n: "01",
        title: "Choisir la parcelle",
        body: "Par son adresse ou sur la carte : contour et surface viennent de l'API Carto Cadastre de l'IGN.",
      },
      {
        n: "02",
        title: "Lire la zone et ses règles",
        body: "Le zonage est lu dans le Géoportail de l'Urbanisme et le règlement de zone analysé pour l'emprise au sol, la hauteur, les retraits et les espaces verts, chaque règle avec sa provenance.",
      },
      {
        n: "03",
        title: "Poser les hypothèses du bilan",
        body: "Prix de sortie, coût de construction, frais et marge cible : vous remplacez les valeurs de départ par vos références.",
      },
      {
        n: "04",
        title: "Lire la charge foncière maximale",
        body: "En mode compte à rebours, l'outil affiche le prix maximal du terrain compatible avec la marge visée, et sa sensibilité aux principales hypothèses.",
      },
    ],
  },

  sources: {
    title: "Les sources derrière le calcul",
    intro: "Les données publiques réellement interrogées par le produit pour estimer la surface constructible et le prix de sortie.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de zone, quand la commune y publie son document.",
      "DVF (Etalab) : mutations autour de la parcelle, prix au m² de référence.",
      "RGE Alti (IGN) : altimétrie, à l'origine de la provision liée à la pente.",
      "Zonage fiscal A / B / C (data.gouv) : contexte de marché de la commune.",
    ],
    note:
      "Les hypothèses financières par défaut sont des ordres de grandeur de calibrage, pas des références de marché : remplacez-les par vos chiffres avant toute offre.",
  },

  proof: {
    title: "Une charge foncière admissible, calculée pas à pas",
    intro:
      "Le même exemple que le modèle Excel de la page Bilan promoteur, lu côté foncier.",
    tag: "Exemple fictif, modèle Excel",
    rows: [
      { label: "Chiffre d'affaires HT (1 116 m² vendables à 4 200 €/m²)", value: "4 687 200 €" },
      { label: "Marge cible, 12 % du chiffre d'affaires", value: "− 562 464 €" },
      { label: "Dépenses hors foncier", value: "− 2 737 568 €" },
      { label: "Charge foncière admissible, frais d'acquisition inclus", value: "1 387 168 €" },
      { label: "Prix maximal du terrain hors frais (frais de 7,5 %)", value: "≈ 1 290 389 €" },
      { label: "Incidence foncière (1 240 m² de surface de plancher)", value: "≈ 1 119 €/m²" },
      { label: "Part du foncier dans le chiffre d'affaires", value: "≈ 29,6 %" },
    ],
    caption:
      "Exemple entièrement fictif : ni parcelle réelle, ni opération réelle, ni chiffres de client. Les taux et prix sont des hypothèses inventées pour illustrer la mécanique du calcul, pas des références de marché.",
  },

  download: {
    href: "/modeles/bilan-promoteur-exemple-fictif.xlsx",
    label: "Télécharger le modèle de calcul à rebours",
    format: "Excel .xlsx, 3 onglets",
    note: "Gratuit, sans inscription. L'onglet « Compte à rebours » calcule la charge foncière admissible, le prix maximal du terrain et l'incidence foncière. Exemple fictif, hypothèses en bleu à remplacer par les vôtres.",
  },

  limits: {
    title: "Ce qu'un calcul à rebours ne garantit pas",
    intro: "La charge foncière admissible est un plafond de négociation, pas une valeur d'expertise.",
    items: [
      "La surface de plancher retenue est un maximum théorique déduit des règles lues : prospects, gabarit, servitudes et prescriptions particulières peuvent la réduire. Elle se confirme auprès du service urbanisme.",
      "Les mutations DVF décrivent des ventes passées, pas le prix auquel votre programme se vendra.",
      "Les coûts de travaux réels dépendent du sol, du programme et des entreprises consultées : seuls des devis les engagent.",
      "Les frais d'acquisition, la fiscalité de l'opération et le régime de TVA du terrain sont à confirmer avec votre notaire et votre conseil.",
      "Une évaluation de terrain opposable (expertise, succession, contentieux) relève d'un expert en évaluation immobilière, pas d'un outil d'aide à la décision.",
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation : c'est une estimation à confronter aux services compétents.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce que la charge foncière ?",
      a: "C'est le coût total du terrain pour une opération immobilière : prix payé au vendeur, frais d'acquisition et, le cas échéant, dépenses de libération du terrain (démolition, départ des occupants). Rapportée à la surface de plancher constructible, elle donne l'incidence foncière, qui sert à comparer des terrains.",
    },
    {
      q: "Comment calculer la charge foncière admissible ?",
      a: "Par le compte à rebours : chiffre d'affaires hors taxes de l'opération, moins la marge cible, moins toutes les dépenses hors foncier (travaux, honoraires, taxes, assurances, aléas, commercialisation, frais financiers). Le solde est la charge foncière admissible, frais d'acquisition compris. Divisée par (1 + taux des frais d'acquisition), elle donne le prix maximal du terrain.",
    },
    {
      q: "Quelle différence entre charge foncière et prix du terrain ?",
      a: "Le prix du terrain est ce que reçoit le vendeur. La charge foncière ajoute les frais d'acquisition et les dépenses nécessaires pour disposer du terrain. Dans un bilan, c'est la charge foncière qui compte, car c'est elle que l'opération finance.",
    },
    {
      q: "Qu'est-ce que l'incidence foncière ?",
      a: "C'est la charge foncière divisée par la surface de plancher que le terrain permet de construire, exprimée en euros par mètre carré. Elle permet de comparer des terrains de tailles et de règles différentes, et de confronter le prix du foncier aux prix de sortie du secteur.",
    },
    {
      q: "Pourquoi la charge foncière admissible varie-t-elle autant ?",
      a: "Parce qu'elle est un solde : toute variation du chiffre d'affaires ou des coûts s'y reporte entièrement. Une surface de plancher surestimée, un prix de sortie optimiste ou un coût de travaux sous-évalué gonflent mécaniquement le prix que l'on croit pouvoir payer.",
    },
    {
      q: "Fonciable calcule-t-il la charge foncière d'un terrain ?",
      a: "Oui, à titre indicatif. En mode compte à rebours, l'application calcule le prix maximal du terrain compatible avec votre marge cible, à partir de la surface de plancher potentielle déduite des règles lues, d'un prix de sortie appuyé sur les mutations DVF et de vos hypothèses de coûts. Si les règles de la parcelle ne sont pas vérifiées, aucun montant n'est affiché.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain dont le prix vous interroge",
    body: "Apportez une parcelle et le prix demandé : nous vous montrerons comment Fonciable calcule la charge foncière admissible et signale ce qui reste à vérifier.",
    label: "Prendre rendez-vous",
  },
};
