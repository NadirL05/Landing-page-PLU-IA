import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /bilan-promoteur.
 *
 * Chaque affirmation technique est vérifiée dans le code du produit
 * (dépôt sas-plu-3d) :
 *  - postes d'hypothèses ajustables : `FeasibilityFinanceInputs`
 *    (src/lib/feasibility-finance.ts) ;
 *  - décomposition des frais annexes en 7 postes : `FraisAnnexesBreakdown`
 *    (même fichier) ;
 *  - bilan conduit en HT, TVA informative : `VatImpact` (même fichier) ;
 *  - prix de sortie appuyé sur les mutations DVF locales : `MarketEvidence`
 *    (même fichier, source "dvf_local" / repli "fallback_sale_price").
 * Les valeurs par défaut du moteur (coût de construction, prix de vente…)
 * ne sont volontairement PAS publiées : ce sont des paramètres de calibrage
 * interne, pas une promesse de marché.
 */
export const BILAN_PROMOTEUR: MetierPageContent = {
  slug: "/bilan-promoteur",
  navLabel: "Bilan promoteur",

  metaTitle: "Bilan promoteur : méthode, hypothèses et calcul de faisabilité",
  metaDescription:
    "Comprendre un bilan promoteur : charge foncière, coûts de construction, prix de sortie, frais annexes et marge. Méthode, hypothèses à poser et limites.",
  dateModified: "2026-08-29",

  eyebrow: "Faisabilité financière · charge foncière · marge",
  h1: "Le bilan promoteur, poste par poste",
  lede:
    "Le bilan promoteur est le calcul qui décide si une opération se fait ou non : ce qu'on vendra, ce que ça coûtera, ce qu'il reste. Cette page explique comment il se construit, quelles hypothèses il faut poser, et ce que PLU IA calcule à partir des données publiques d'une parcelle.",
  ctaPrimaryLabel: "Établir un bilan promoteur",
  ctaSecondaryLabel: "Voir une démonstration",
  ctaNote: "Sans carte bancaire · 2 analyses / 30 jours",

  problem: {
    title: "Un bilan se joue sur les hypothèses, pas sur la formule",
    body: [
      "La structure d'un bilan promoteur ne fait pas débat : chiffre d'affaires prévisionnel, moins la charge foncière, moins le coût de construction, moins les frais annexes — le solde est la marge. Ce qui fait diverger deux bilans sur le même terrain, ce sont les hypothèses posées en amont et la surface de plancher qu'on estime pouvoir construire.",
      "En amont d'une offre, la difficulté n'est donc pas de calculer : c'est de rassembler assez d'éléments fiables pour que le calcul veuille dire quelque chose, et de savoir lesquels restent à confirmer.",
    ],
    points: [
      {
        title: "Il intervient tôt, sur peu d'informations",
        body: "Le bilan sert à décider s'il faut engager une offre, une promesse ou une étude payante. À ce stade, on n'a ni relevé de géomètre, ni plan d'architecte, ni devis d'entreprise : uniquement des documents publics et des ordres de grandeur de marché.",
      },
      {
        title: "La surface constructible conditionne tout le reste",
        body: "Le chiffre d'affaires découle de la surface de plancher réalisable, elle-même issue des règles du document d'urbanisme (emprise au sol, hauteur, retraits, espaces verts). Une erreur de lecture du règlement se propage à l'ensemble du bilan.",
      },
      {
        title: "La charge foncière est une variable, pas une donnée",
        body: "En pratique, on inverse souvent le calcul : à partir d'une marge cible, on cherche le prix maximum que le terrain peut supporter. C'est ce montant qui sert de base à la négociation avec le propriétaire.",
      },
    ],
  },

  capabilities: {
    title: "Ce que PLU IA calcule, et à partir de quoi",
    intro:
      "L'outil relie trois choses : les données de la parcelle, le potentiel constructible déduit des règles applicables, et les hypothèses financières que vous ajustez. Le calcul lui-même se fait dans l'application, jamais sur cette page.",
    items: [
      {
        ref: "BP.01",
        title: "Surface de plancher potentielle",
        body: "L'enveloppe constructible maximale théorique est déduite du zonage et des règles lues dans le document d'urbanisme, puis convertie en surface de plancher. C'est un maximum théorique, hors prospects, gabarit et servitudes non modélisés.",
      },
      {
        ref: "BP.02",
        title: "Prix de sortie appuyé sur les mutations locales",
        body: "Le prix de vente au m² s'appuie sur les mutations DVF relevées autour de la parcelle (rayon de 500 m par défaut). Quand aucune mutation exploitable n'est trouvée, l'outil bascule sur une valeur de repli et l'indique explicitement.",
      },
      {
        ref: "BP.03",
        title: "Hypothèses ajustables",
        body: "Prix du terrain, coût de construction au m², prix de vente au m², loyer annuel et taux de capitalisation, marge cible, prix de vente d'une place de parking, mode constructif : chaque poste est modifiable et le bilan est recalculé.",
      },
      {
        ref: "BP.04",
        title: "Frais annexes décomposés",
        body: "Sept postes distincts plutôt qu'un forfait : frais de notaire sur le terrain, honoraires de maîtrise d'œuvre, frais financiers, commercialisation, assurances, aléas et taxe d'aménagement.",
      },
      {
        ref: "BP.05",
        title: "Contraintes qui pèsent sur le coût",
        body: "Stationnement exigé par le règlement, niveaux de sous-sol nécessaires, provision liée à la pente du terrain, espaces verts de pleine terre à préserver : ces contraintes sont chiffrées dans le bilan, pas seulement signalées.",
      },
      {
        ref: "BP.06",
        title: "Bilan en HT, TVA exposée à part",
        body: "Le bilan est conduit hors taxes — la TVA collectée sur les ventes et la TVA déductible sur les travaux se neutralisent. Les montants TTC sont affichés à titre informatif, pour situer le prix payé par l'acquéreur.",
      },
    ],
  },

  steps: {
    title: "Du terrain au solde de l'opération",
    items: [
      {
        n: "01",
        title: "Identifier la parcelle",
        body: "Adresse, référence cadastrale ou clic sur la carte : le contour et la surface de la parcelle sont récupérés auprès de l'API Carto Cadastre de l'IGN.",
      },
      {
        n: "02",
        title: "Déduire le potentiel constructible",
        body: "Le zonage est lu dans le Géoportail de l'Urbanisme et le règlement de zone analysé pour en extraire emprise au sol, hauteur, retraits et espaces verts. On en tire une enveloppe constructible maximale théorique, puis une surface de plancher.",
      },
      {
        n: "03",
        title: "Poser les hypothèses financières",
        body: "Prix de sortie, coût de construction, frais, marge cible : l'outil propose des valeurs de départ, vous les remplacez par les vôtres dès que vous disposez de références plus proches de votre marché.",
      },
      {
        n: "04",
        title: "Lire le solde et le prix de terrain admissible",
        body: "Chiffre d'affaires, coûts, frais annexes, marge, et prix maximum du terrain compatible avec la marge visée. Le rapport s'exporte en PDF et peut être partagé par un lien que vous activez.",
      },
    ],
  },

  sources: {
    title: "Les sources qui alimentent le bilan",
    intro:
      "Aucun chiffre n'apparaît sans son origine. Les sources ci-dessous sont celles réellement interrogées par le produit pour construire un bilan.",
    items: [
      "Cadastre — API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de la zone, quand la commune y publie son document.",
      "DVF — Etalab : mutations immobilières autour de la parcelle, prix au m² de référence.",
      "Géorisques (GASPAR, aléa retrait-gonflement des argiles) : risques recensés susceptibles de peser sur le coût.",
      "RGE Alti — IGN : altimétrie du terrain, à l'origine de la provision liée à la pente.",
      "Zonage fiscal A / B / C — data.gouv : contexte de marché de la commune.",
    ],
    note:
      "Les hypothèses financières par défaut sont des ordres de grandeur de calibrage, pas des références de marché opposables : elles doivent être remplacées par vos propres chiffres avant tout engagement.",
  },

  proof: {
    title: "À quoi ressemble la lecture d'un bilan",
    intro:
      "Voici la forme que prend la restitution dans l'application : des postes lisibles un par un, chacun rattaché à une hypothèse que vous pouvez changer.",
    tag: "Exemple fictif — parcelle AB0142",
    rows: [
      { label: "Surface de plancher retenue", value: "1 240 m²" },
      { label: "Prix de sortie retenu (hypothèse)", value: "4 200 €/m²" },
      { label: "Chiffre d'affaires prévisionnel HT", value: "5 208 000 €" },
      { label: "Coût de construction (hypothèse)", value: "1 750 000 €" },
      { label: "Frais annexes (7 postes)", value: "1 090 000 €" },
      { label: "Charge foncière admissible, marge cible 15 %", value: "1 587 000 €" },
    ],
    bar: { label: "Emprise au sol mobilisée sur le maximum autorisé", pct: 68 },
    caption:
      "Exemple entièrement fictif, produit pour illustrer la mise en page : ni parcelle réelle, ni opération réelle, ni chiffres de client. Les montants d'un bilan dépendent de la parcelle, du marché local et des hypothèses que vous retenez.",
  },

  limits: {
    title: "Ce qu'un bilan issu de données publiques ne remplace pas",
    intro:
      "Un bilan calculé automatiquement sert à trier et à cadrer une négociation. Il ne se substitue à aucune vérification professionnelle.",
    items: [
      "Le coût de construction réel dépend du programme, du terrain et des entreprises consultées : seuls des devis engagent un chiffre.",
      "Le prix de sortie dépend de la qualité du produit livré et du moment du marché ; les mutations DVF décrivent le passé, pas votre commercialisation.",
      "La fiscalité de l'opération (taxe d'aménagement, régime de TVA applicable) doit être confirmée avec votre conseil : l'outil applique des hypothèses de travail.",
      "Les honoraires, frais financiers et assurances varient selon votre structure et votre financement.",
      "Les contraintes non modélisées — prospects, gabarit, servitudes d'utilité publique, prescriptions architecturales — peuvent réduire la surface constructible et donc le chiffre d'affaires.",
      "Le potentiel constructible affiché est un maximum théorique : à confirmer auprès des services d'urbanisme compétents avant tout engagement.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce qu'un bilan promoteur ?",
      a: "C'est le calcul de faisabilité financière d'une opération immobilière : on estime le chiffre d'affaires attendu de la vente, on en retire la charge foncière, le coût de construction et les frais annexes, et le solde donne la marge prévisionnelle. Il sert à décider d'engager ou non une opération, et à fixer le prix maximum que le terrain peut supporter.",
    },
    {
      q: "À quel moment établit-on un bilan promoteur ?",
      a: "Le plus tôt possible, dès qu'un terrain est repéré et avant toute offre. Un premier bilan se fait sur les seules données publiques (cadastre, document d'urbanisme, mutations DVF alentour). Il est ensuite affiné à mesure que des éléments réels arrivent : relevé de géomètre, esquisse d'architecte, devis d'entreprises.",
    },
    {
      q: "Quelles hypothèses faut-il poser pour un bilan ?",
      a: "Quatre familles : les recettes (prix de vente au m², prix des parkings, ou loyer et taux de capitalisation en locatif), les coûts de travaux (coût de construction au m², mode constructif, sous-sols, provision liée à la pente), les frais annexes (notaire, maîtrise d'œuvre, frais financiers, commercialisation, assurances, aléas, taxe d'aménagement) et l'objectif de marge.",
    },
    {
      q: "PLU IA calcule-t-il un bilan à ma place ?",
      a: "PLU IA produit un bilan à partir des données publiques de la parcelle et d'hypothèses de départ que vous ajustez ensuite. C'est une aide à la décision : les coûts, les prix de sortie, les taxes, les honoraires et les contraintes du terrain doivent être confirmés par les professionnels de l'opération avant tout engagement.",
    },
    {
      q: "Le bilan tient-il compte de la TVA ?",
      a: "Le bilan est conduit en hors taxes : la TVA collectée sur les ventes est reversée et la TVA sur les travaux est déductible, les deux flux se neutralisent. Les montants TTC sont affichés séparément à titre informatif. Le régime de TVA applicable à votre acquisition foncière reste à confirmer avec votre conseil.",
    },
  ],

  finalCta: {
    title: "Testez la méthode sur un terrain que vous connaissez",
    body: "Le meilleur moyen de juger un bilan automatisé est de le confronter à une opération dont vous connaissez déjà l'issue. Le plan Découverte inclut deux analyses par période de 30 jours, sans carte bancaire.",
    label: "Établir un bilan promoteur",
  },
};
