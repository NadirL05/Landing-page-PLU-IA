import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /bilan-promoteur.
 *
 * Requêtes cibles (IMPLEMENTATION_PLAN § E1) : « bilan promoteur »,
 * « bilan promoteur excel ».
 *
 * Chaque affirmation sur l'outil est vérifiée dans le dépôt produit
 * sas-plu-3d (clone en lecture, commit 1e2ba0a du 2026-10-20) :
 *  - postes d'hypothèses ajustables (prix du terrain, coût de construction,
 *    prix de vente, loyer et taux de capitalisation, marge cible, prix d'une
 *    place, mode constructif) : `FeasibilityFinanceInputs`,
 *    src/lib/feasibility-finance.ts:100-121 ;
 *  - frais annexes en 7 postes : `FraisAnnexesBreakdown`,
 *    src/lib/feasibility-finance.ts:205-216 ;
 *  - bilan en HT, TVA informative : `computeVatImpact`,
 *    src/lib/finance/costs.ts (bloc « Impact TVA — INFORMATIF ») ;
 *  - prix de sortie appuyé sur les mutations DVF locales : `MarketEvidence`
 *    (src/lib/feasibility-finance.ts, source "dvf_local" / repli) ;
 *  - mode « Compte à rebours » (la marge cible fixe l'offre d'achat
 *    maximale) : components/dashboard/study-financial-panel.tsx:205-221 ;
 *    formule du prix maximal du terrain : `computePrixMaxTerrainEur`,
 *    src/lib/finance/costs.ts:137-200, appelée par src/lib/finance/scenario.ts:437-447 ;
 *  - sensibilité (prix de vente ±10 %, travaux ±10 %, durée et taux si le
 *    financement mensuel est activé) : src/lib/finance/sensitivity.ts,
 *    affichée par `FinancialSensitivityPanel`
 *    (components/dashboard/study-operation-finance.tsx:148-163) ;
 *  - financement mois par mois optionnel et opération « achat, rénovation et
 *    revente » : components/dashboard/study-operation-finance.tsx:33-41 ;
 *  - niveaux de sous-sol liés au stationnement et provision de pente
 *    chiffrés dans les travaux : src/lib/finance/parking.ts (en-tête),
 *    src/lib/finance/costs.ts:28-64 ;
 *  - aucun bilan en zone A ou N : src/lib/finance/scenario.ts:146-147.
 *
 * Affirmations RETIRÉES le 2026-10-20 faute de preuve suffisante :
 * recherche par « référence cadastrale » saisie dans l'outil, et
 * « stationnement exigé par le règlement » extrait du PLU.
 *
 * Modèle téléchargeable : public/modeles/bilan-promoteur-exemple-fictif.xlsx,
 * généré par scripts/modele-bilan-promoteur.py (postes alignés sur le bloc
 * « Les postes d'un bilan promoteur » le 2026-10-30 : stationnement,
 * sous-sols et adaptation au terrain, archéologie préventive ajoutés à 0 ou
 * regroupés, totaux de l'exemple inchangés). Les valeurs de la section
 * « Exemple » sont celles de ce fichier (exemple fictif). Les valeurs par
 * défaut du moteur ne sont volontairement PAS publiées.
 */
export const BILAN_PROMOTEUR: MetierPageContent = {
  slug: "/bilan-promoteur",
  navLabel: "Bilan promoteur",
  related: ["/faisabilite-fonciere", "/prospection-fonciere", "/analyse-plu-parcelle", "/charge-fonciere", "/surface-de-plancher", "/prix-terrain-constructible"],

  // Requête cible ajoutée le 2026-10-21 : « bilan promoteur en ligne ».
  // Requête n° 1 du site en Search Console (19-27/10/2026) : « bilan
  // promoteur excel ». Title remanié le 2026-10-30 pour la placer en tête,
  // « en ligne » conservé.
  metaTitle: "Bilan promoteur Excel gratuit et bilan en ligne",
  metaDescription:
    "Modèle de bilan promoteur Excel gratuit, sans inscription : compte à rebours, charge foncière, marge. La méthode, les postes et le bilan en ligne.",
  dateModified: "2026-10-30",

  eyebrow: "Recettes · dépenses · marge · charge foncière",
  h1: "Bilan promoteur en ligne : la méthode, les postes et un modèle Excel",
  lede:
    "Le bilan promoteur dit si une opération immobilière tient debout : ce qu'elle rapportera, ce qu'elle coûtera, ce qu'il restera. Cette page détaille ses postes, la méthode du compte à rebours qui en tire le prix d'un terrain, propose un modèle Excel à télécharger, et explique ce que Fonciable calcule à partir des données publiques d'une parcelle.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Échangeons sur vos hypothèses et votre opération.",

  guide: {
    kicker: "Méthode",
    title: "Comment se construit un bilan promoteur",
    intro:
      "Un bilan promoteur est un compte de résultat prévisionnel d'opération. Sa structure est stable d'un opérateur à l'autre ; ce qui change, ce sont les hypothèses et le sens dans lequel on le lit.",
    blocks: [
      {
        title: "Recettes moins dépenses : la marge",
        paragraphs: [
          "Le chiffre d'affaires prévisionnel (les ventes, ou la valeur d'un immeuble loué) moins le prix de revient de l'opération (foncier, travaux, honoraires, taxes, frais) donne la marge. Rapportée au chiffre d'affaires, elle sert de critère de décision : en dessous de l'objectif de l'opérateur, l'opération ne se fait pas au prix demandé.",
          "On raisonne en hors taxes : dans une vente en l'état futur d'achèvement, la TVA collectée sur les ventes et la TVA déductible sur les travaux se compensent. Le régime de TVA de l'acquisition foncière reste à vérifier avec votre conseil.",
        ],
      },
      {
        title: "Les postes d'un bilan promoteur",
        paragraphs: ["La liste ci-dessous est celle du modèle à télécharger. Chaque opérateur la détaille plus ou moins finement."],
        list: [
          "Recettes : ventes de logements et de locaux, places de stationnement, ou valeur locative capitalisée pour un immeuble conservé.",
          "Charge foncière : prix du terrain et frais d'acquisition (notaire, droits), plus les éventuels frais de libération du terrain.",
          "Travaux : coût de construction, sous-sols, adaptation au terrain (pente, fondations).",
          "Honoraires techniques : architecte, bureaux d'études, géomètre, contrôle technique, coordination sécurité.",
          "Taxes et participations : taxe d'aménagement, redevance d'archéologie préventive le cas échéant, participations demandées par la commune.",
          "Assurances et aléas : assurance dommages-ouvrage, provision pour imprévus.",
          "Frais de commercialisation : honoraires de vente, publicité, bureau de vente.",
          "Frais financiers : intérêts du crédit d'opération et garanties.",
          "Marge : ce qui reste, à comparer à l'objectif de l'opérateur.",
        ],
      },
      {
        title: "La méthode du compte à rebours",
        paragraphs: [
          "En amont d'une offre, le prix du terrain n'est pas une donnée : c'est l'inconnue. On renverse donc le calcul. On part du chiffre d'affaires, on retire la marge visée et toutes les dépenses hors foncier : le solde est la charge foncière admissible, c'est-à-dire ce que l'opération peut payer pour le terrain, frais d'acquisition compris. En retirant ces frais, on obtient le prix maximal à proposer au propriétaire.",
        ],
        list: [
          "Charge foncière admissible = chiffre d'affaires HT − marge cible − dépenses hors foncier.",
          "Prix maximal du terrain = charge foncière admissible ÷ (1 + taux des frais d'acquisition).",
          "Incidence foncière = charge foncière ÷ surface de plancher, pour comparer des terrains entre eux.",
        ],
        link: {
          text: "La notion de charge foncière, son calcul et ce qui la fait varier sont détaillés sur",
          href: "/charge-fonciere",
          label: "la page Charge foncière",
        },
      },
      {
        title: "Bilan direct ou à rebours : deux lectures du même calcul",
        paragraphs: [
          "Le bilan direct part d'un prix de terrain négocié et en déduit la marge. Le bilan à rebours part de la marge visée et en déduit le prix de terrain acceptable. Les deux utilisent les mêmes postes : le modèle Excel propose un onglet pour chacun.",
          "Dans les deux cas, tout dépend de la surface de plancher réalisable, donc des règles du document d'urbanisme. Une erreur de lecture du PLU se propage à l'ensemble du bilan : c'est la première hypothèse à fiabiliser.",
        ],
      },
    ],
  },

  problem: {
    title: "Un bilan se joue sur les hypothèses, pas sur la formule",
    body: [
      "La structure d'un bilan promoteur ne fait pas débat : chiffre d'affaires prévisionnel, moins la charge foncière, moins le coût de construction, moins les frais annexes : le solde est la marge. Ce qui fait diverger deux bilans sur le même terrain, ce sont les hypothèses posées en amont et la surface de plancher qu'on estime pouvoir construire.",
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
    title: "Ce que Fonciable calcule, et à partir de quoi",
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
        body: "Les niveaux de sous-sol liés aux places de stationnement et la provision pour la pente du terrain sont chiffrés dans le coût des travaux, pas seulement signalés. En zone agricole ou naturelle, aucun bilan n'est produit.",
      },
      {
        ref: "BP.06",
        title: "Bilan en HT, TVA exposée à part",
        body: "Le bilan est conduit hors taxes : la TVA collectée sur les ventes et la TVA déductible sur les travaux se neutralisent. Les montants TTC sont affichés à titre informatif, pour situer le prix payé par l'acquéreur.",
      },
      {
        ref: "BP.07",
        title: "Mode compte à rebours",
        body: "En mode « Compte à rebours », la marge cible pilote directement l'offre d'achat maximale : le prix du terrain n'est plus saisi, il est calculé pour que l'opération atteigne la marge visée.",
      },
      {
        ref: "BP.08",
        title: "Sensibilité des hypothèses",
        body: "Le bilan est recalculé avec un prix de vente et un coût de travaux à plus ou moins 10 %, et, si vous activez le financement mois par mois, avec une durée allongée et un taux relevé : vous voyez l'effet sur la marge et sur l'acquisition maximale.",
      },
    ],
  },

  steps: {
    title: "Du terrain au solde de l'opération",
    items: [
      {
        n: "01",
        title: "Identifier la parcelle",
        body: "Par son adresse ou sur la carte : le contour et la surface de la parcelle sont récupérés auprès de l'API Carto Cadastre de l'IGN.",
      },
      {
        n: "02",
        title: "Déduire le potentiel constructible",
        body: "Le zonage est lu dans le Géoportail de l'Urbanisme et le règlement de zone analysé pour en extraire emprise au sol, hauteur, retraits et espaces verts. On en tire une enveloppe constructible maximale théorique, puis une surface de plancher.",
      },
      {
        n: "03",
        title: "Poser les hypothèses financières",
        body: "Prix de sortie, coût de construction, frais, marge cible : l'outil propose des valeurs de départ, vous les remplacez par les vôtres dès que vous disposez de références plus proches de votre marché. Le financement peut être calculé mois par mois.",
      },
      {
        n: "04",
        title: "Lire le solde et le prix de terrain admissible",
        body: "Chiffre d'affaires, coûts, frais annexes, marge, et prix maximum du terrain compatible avec la marge visée, avec la sensibilité aux principales hypothèses. Le rapport s'exporte en PDF et peut être partagé par un lien que vous activez.",
      },
    ],
  },

  sources: {
    title: "Les sources qui alimentent le bilan",
    intro:
      "Aucun chiffre n'apparaît sans son origine. Les sources ci-dessous sont celles réellement interrogées par le produit pour construire un bilan.",
    items: [
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règlement de la zone, quand la commune y publie son document.",
      "DVF (Etalab) : mutations immobilières autour de la parcelle, prix au m² de référence.",
      "Géorisques (GASPAR, aléa retrait-gonflement des argiles) : risques recensés susceptibles de peser sur le coût.",
      "RGE Alti (IGN) : altimétrie du terrain, à l'origine de la provision liée à la pente.",
      "Zonage fiscal A / B / C (data.gouv) : contexte de marché de la commune.",
    ],
    note:
      "Les hypothèses financières par défaut sont des ordres de grandeur de calibrage, pas des références de marché opposables : elles doivent être remplacées par vos propres chiffres avant tout engagement.",
  },

  // TODO(NADIR): cas client réel, avec accord écrit du client. Aucun
  // témoignage ni nom de client n'est publié tant qu'il n'est pas fourni.
  proof: {
    title: "Un bilan à rebours, chiffre par chiffre",
    intro:
      "Voici le calcul du modèle Excel, onglet « Compte à rebours ». Les mêmes postes se retrouvent dans l'application, où chacun est rattaché à une hypothèse que vous pouvez changer.",
    tag: "Exemple fictif, modèle Excel",
    rows: [
      { label: "Surface de plancher (hypothèse)", value: "1 240 m²" },
      { label: "Surface vendable (90 % de la surface de plancher)", value: "1 116 m²" },
      { label: "Chiffre d'affaires HT (4 200 €/m² vendable)", value: "4 687 200 €" },
      { label: "Dépenses hors foncier (travaux, honoraires, taxes, frais)", value: "2 737 568 €" },
      { label: "Marge cible, 12 % du chiffre d'affaires", value: "562 464 €" },
      { label: "Charge foncière admissible, frais d'acquisition inclus", value: "1 387 168 €" },
      { label: "Prix maximal du terrain hors frais (frais de 7,5 %)", value: "≈ 1 290 389 €" },
    ],
    caption:
      "Exemple entièrement fictif : ni parcelle réelle, ni opération réelle, ni chiffres de client. Les taux et prix sont des hypothèses inventées pour montrer la mécanique du calcul, pas des références de marché.",
  },

  download: {
    title: "Télécharger le modèle de bilan promoteur Excel",
    intro:
      "Le modèle reprend exactement les postes et la méthode décrits sur cette page. Les formules sont visibles et modifiables : vous pouvez vérifier chaque calcul, ajouter vos lignes, et l'ouvrir dans Excel, LibreOffice ou Numbers.",
    contents: [
      "Onglet « Compte à rebours » : surface de plancher, prix de vente, travaux, honoraires, taxes, assurances, aléas, commercialisation, frais financiers et marge cible donnent la charge foncière admissible et le prix maximal du terrain.",
      "Onglet « Bilan direct » : pour un prix de terrain négocié, la marge obtenue en euros et en pourcentage du chiffre d'affaires.",
      "Onglet « Lisez-moi » : mode d'emploi et simplifications assumées (montants hors taxes, frais financiers forfaitaires, sans échéancier).",
      "Valeurs d'exemple en bleu, toutes fictives : ce ne sont pas des références de marché, remplacez-les par vos propres hypothèses.",
    ],
    href: "/modeles/bilan-promoteur-exemple-fictif.xlsx",
    label: "Télécharger le modèle de bilan promoteur",
    format: "Excel .xlsx, 3 onglets",
    note: "Gratuit, sans inscription, sans adresse e-mail. Formules simples (sommes, produits, divisions). Exemple fictif ; ni certificat d'urbanisme, ni avis financier.",
    appCta: {
      text: "Le modèle se remplit à la main. Dans Fonciable, le bilan part de la parcelle : surface de plancher potentielle déduite des règles lues, prix de sortie appuyé sur les mutations DVF voisines, hypothèses de départ que vous remplacez par les vôtres. Les résultats restent à confirmer par les professionnels de l'opération.",
      label: "Ouvrir l'application Fonciable",
    },
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
      "Les contraintes non modélisées (prospects, gabarit, prescriptions architecturales) et les servitudes d'utilité publique peuvent réduire la surface constructible et donc le chiffre d'affaires.",
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
      q: "Qu'est-ce que la méthode du compte à rebours ?",
      a: "C'est la lecture inversée du bilan : on part du chiffre d'affaires prévisionnel, on retire la marge visée et toutes les dépenses hors foncier, et le solde donne la charge foncière admissible, c'est-à-dire le montant maximal que l'opération peut consacrer au terrain, frais d'acquisition compris. Elle sert à fixer le prix d'une offre.",
    },
    {
      q: "Existe-t-il un modèle de bilan promoteur sur Excel ?",
      a: "Oui, cette page propose un modèle .xlsx gratuit, sans inscription. Il contient un onglet « Compte à rebours » (charge foncière admissible à partir d'une marge cible) et un onglet « Bilan direct » (marge pour un prix de terrain donné). Les valeurs fournies sont un exemple fictif, à remplacer par vos hypothèses.",
    },
    {
      q: "Comment utiliser le modèle de bilan promoteur Excel ?",
      a: "Remplacez les valeurs en bleu de l'onglet « Compte à rebours » par vos hypothèses : surface de plancher, prix de vente, coût de construction, taux d'honoraires, d'assurances, d'aléas, de commercialisation et de frais financiers, taxes, marge cible et frais d'acquisition. Les cellules en noir se recalculent. L'onglet « Bilan direct » reprend ces montants et calcule la marge pour le prix de terrain que vous saisissez. Toutes les valeurs fournies sont fictives.",
    },
    {
      q: "Fonciable calcule-t-il un bilan à ma place ?",
      a: "Fonciable produit un bilan à partir des données publiques de la parcelle et d'hypothèses de départ que vous ajustez ensuite. C'est une aide à la décision : les coûts, les prix de sortie, les taxes, les honoraires et les contraintes du terrain doivent être confirmés par les professionnels de l'opération avant tout engagement.",
    },
    {
      q: "Le bilan tient-il compte de la TVA ?",
      a: "Le bilan est conduit en hors taxes : la TVA collectée sur les ventes est reversée et la TVA sur les travaux est déductible, les deux flux se neutralisent. Les montants TTC sont affichés séparément à titre informatif. Le régime de TVA applicable à votre acquisition foncière reste à confirmer avec votre conseil.",
    },
  ],

  finalCta: {
    title: "Parlons d'une opération que vous connaissez",
    body: "Apportez un terrain ou un bilan existant : nous vous montrerons comment Fonciable présente ses hypothèses et ses limites.",
    label: "Prendre rendez-vous",
  },
};
