import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /prix-terrain-constructible.
 *
 * Requête cible (brief SEO 15, sujet 5, validé par Nadir le 26/10/2026) :
 * « prix terrain constructible ». Plan : IMPLEMENTATION_PLAN § J5.
 * Angle imposé : « comment estimer le prix de marché », nettement distinct de
 * /charge-fonciere (prix admissible par compte à rebours), avec lien croisé.
 *
 * Sources citées (consultées le 2026-10-26) :
 *  - service-public.gouv.fr F16832 « Comment connaître le prix d'un logement
 *    ou d'un terrain ? » (vérifiée le 03/10/2025 selon la page) : base DVF
 *    gratuite (5 dernières années, ventes de biens bâtis et non bâtis, issue
 *    des actes notariés et du cadastre), Patrim dans l'espace particulier
 *    impots.gouv.fr, notaires, Haut-Rhin, Bas-Rhin, Moselle et Mayotte non
 *    couverts ;
 *  - data.gouv.fr, jeu « Demandes de valeurs foncières » : producteur DGFiP,
 *    mise à jour semestrielle (avril et octobre), Licence Ouverte 2.0,
 *    réutilisation sans ré-identification des personnes.
 *
 * Affirmations sur l'outil vérifiées dans sas-plu-3d (commit d4f460d du
 * 2026-10-26) :
 *  - comparables DVF = ventes de maisons et d'appartements avec surface bâtie
 *    (prix de sortie), pas de terrains : src/lib/dvf-engine.ts:7, :120-121
 *    (mutation sans type écartée), :131-137 (surface bâtie requise),
 *    :139-155 (filtre de plausibilité contre les mutations multi-lots) ;
 *  - résumé DVF : prix médian au m² bâti, portée rayon 500 m / section /
 *    commune, estimation régionale en Alsace-Moselle avec avertissement :
 *    src/lib/plu-engine.ts:297-329 ;
 *  - le prix de terrain produit est la charge foncière admissible par compte
 *    à rebours (voir l'en-tête de content/charge-fonciere.ts).
 *  - NE FAIT PAS : estimer un prix de marché de terrain à bâtir. La page le dit.
 *
 * Aucun prix de marché, aucune fourchette au m² : un chiffre national
 * n'aurait pas de sens et ne serait pas sourcé.
 */
export const PRIX_TERRAIN_CONSTRUCTIBLE: MetierPageContent = {
  slug: "/prix-terrain-constructible",
  navLabel: "Prix d'un terrain constructible",
  related: ["/charge-fonciere", "/bilan-promoteur", "/terrain-constructible", "/surface-de-plancher", "/analyse-plu-parcelle"],

  metaTitle: "Prix terrain constructible : comment l'estimer",
  metaDescription:
    "Prix d'un terrain constructible : trouver les ventes réelles (DVF, Patrim), ce qui fait varier le prix, prix du marché ou prix admissible d'un promoteur.",
  dateModified: "2026-10-26",
  article: { datePublished: "2026-10-26" },

  eyebrow: "Prix du terrain · DVF · prix de marché",
  h1: "Prix d'un terrain constructible : comment l'estimer",
  lede:
    "Il n'existe pas de prix de référence d'un terrain constructible : il s'estime à partir des ventes de terrains comparables, puis s'ajuste à ce que le terrain permet réellement de construire. Cette page indique où trouver les ventes réelles, ce qui fait varier le prix, comment comparer deux terrains, et la différence entre le prix du marché et le prix qu'un promoteur peut payer.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons d'un terrain et du prix qu'on vous en demande.",

  guide: {
    kicker: "Méthode d'estimation",
    title: "Estimer le prix de marché d'un terrain à bâtir",
    intro: "Sources publiques consultées le 26 octobre 2026.",
    blocks: [
      {
        title: "De quoi dépend le prix d'un terrain constructible",
        paragraphs: [
          "Deux terrains de même surface dans la même commune peuvent se vendre à des prix très différents. Le prix dépend d'abord de ce que l'on peut y construire : zone du PLU, emprise au sol, hauteur, et donc surface de plancher possible. Il dépend ensuite du terrain lui-même et de son environnement.",
        ],
        list: [
          "La constructibilité : zone, règlement, servitudes et risques qui limitent ou interdisent la construction.",
          "La surface réellement utile : forme de la parcelle, pente, accès, retraits imposés.",
          "La viabilisation : raccordement aux réseaux d'eau, d'électricité, d'assainissement, déjà fait ou à financer.",
          "La localisation : commune, quartier, desserte, services, et niveau des prix de l'immobilier neuf ou ancien du secteur.",
          "Les contraintes de sol et de démolition : un terrain à dépolluer ou à libérer de constructions coûte davantage à l'acquéreur.",
        ],
        link: {
          text: "Pour vérifier d'abord qu'un terrain est bien constructible, voir",
          href: "/terrain-constructible",
          label: "la méthode en six vérifications",
        },
      },
      {
        title: "Trouver les ventes réelles : la base DVF",
        paragraphs: [
          "La base « Demandes de valeurs foncières » (DVF), publiée par la direction générale des finances publiques, recense les ventes immobilières des cinq dernières années à partir des actes notariés et des informations cadastrales, y compris des ventes de biens non bâtis comme des terrains. Elle est consultable gratuitement, par adresse ou sur carte jusqu'à la section cadastrale, et mise à jour deux fois par an, en avril et en octobre.",
          "Elle ne couvre pas le Haut-Rhin, le Bas-Rhin, la Moselle ni Mayotte. Ses données sont publiées sous Licence Ouverte, avec une condition : leur réutilisation ne doit pas permettre de ré-identifier les personnes.",
        ],
        sources: [
          { label: "Comment connaître le prix d'un logement ou d'un terrain ? (service-public.gouv.fr, F16832)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16832" },
          { label: "Demandes de valeurs foncières (data.gouv.fr, consulté le 26/10/2026)", href: "https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/" },
        ],
      },
      {
        title: "Les autres sources de prix",
        paragraphs: [
          "Service-public.gouv.fr cite aussi le service Patrim, accessible depuis l'espace particulier sur impots.gouv.fr, qui permet de rechercher des transactions pour aider à estimer un bien, avec les mêmes territoires non couverts. Les notaires, par l'intermédiaire de la chambre départementale, et les professionnels de l'immobilier peuvent aussi aider à estimer un terrain.",
        ],
      },
      {
        title: "Lire une vente de terrain avec prudence",
        paragraphs: [
          "Une vente enregistrée donne un prix et une surface, pas les conditions de la vente. Avant de retenir une mutation comme référence, vérifiez qu'elle porte bien sur un seul terrain et pas sur plusieurs lots vendus ensemble, que le terrain était constructible et viabilisé comme le vôtre, et que la date reste pertinente au regard de l'évolution du marché local.",
          "Le prix au mètre carré de terrain compare mal des parcelles qui n'ont pas les mêmes droits à construire. Un terrain deux fois plus grand ne permet pas forcément de construire deux fois plus. Entre professionnels, on raisonne plutôt en prix par mètre carré de surface de plancher constructible : c'est l'incidence foncière.",
        ],
        link: {
          text: "La méthode pour estimer la surface constructible d'une parcelle est détaillée sur",
          href: "/surface-de-plancher",
          label: "la page Calcul de la surface de plancher",
        },
      },
      {
        title: "Prix du marché ou prix admissible : l'approche du promoteur",
        paragraphs: [
          "Un particulier qui achète un terrain pour y faire construire sa maison raisonne en prix de marché : ce que des terrains comparables se sont vendus. Un promoteur raisonne à l'envers : il part du chiffre d'affaires que l'opération dégagera, retire ses coûts et sa marge, et en déduit le prix maximal qu'il peut payer pour le terrain. C'est la charge foncière admissible.",
          "Les deux prix ne coïncident pas forcément. Quand le prix demandé dépasse ce qu'une opération peut supporter, la négociation porte sur cet écart.",
        ],
        link: {
          text: "Le calcul à rebours, l'incidence foncière et un exemple chiffré fictif sont détaillés sur",
          href: "/charge-fonciere",
          label: "la page Charge foncière",
        },
      },
    ],
  },

  problem: {
    title: "Un prix demandé n'est pas un prix de marché",
    body: [
      "Le prix d'un terrain se fonde souvent sur ce que le voisinage a vendu, sans tenir compte de ce que chaque terrain permettait de construire. Comparer des prix au mètre carré de terrain entre parcelles aux règles différentes fausse l'estimation.",
      "Pour un acheteur professionnel, la question est double : ce terrain se vend-il au prix du marché, et ce prix est-il compatible avec une opération rentable ?",
    ],
    points: [
      {
        title: "Les comparables sont rares",
        body: "Dans un secteur donné, les ventes de terrains à bâtir vraiment comparables peuvent être peu nombreuses.",
      },
      {
        title: "Les droits à construire diffèrent",
        body: "Deux parcelles voisines peuvent relever de zones ou de règles différentes.",
      },
      {
        title: "Les ventes groupées trompent",
        body: "Une mutation qui regroupe plusieurs biens donne un prix au mètre carré sans signification pour un terrain isolé.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable utilise réellement",
    intro:
      "Fonciable n'estime pas le prix de marché d'un terrain à bâtir. Il utilise DVF pour le prix de vente des logements, c'est-à-dire la recette d'une opération, et calcule le prix qu'une opération peut payer pour le terrain.",
    items: [
      {
        ref: "PT.01",
        title: "Comparables de logements, pas de terrains",
        body: "Les ventes DVF retenues sont des ventes de maisons et d'appartements avec une surface bâtie : elles servent à estimer un prix de sortie au m², pas un prix de terrain.",
      },
      {
        ref: "PT.02",
        title: "Ventes douteuses écartées",
        body: "Une vente sans type de bien fiable ou sans surface bâtie est écartée, et un filtre de plausibilité du prix au m² limite l'effet des ventes de plusieurs lots.",
      },
      {
        ref: "PT.03",
        title: "Portée indiquée",
        body: "Le prix médian au m² bâti est calculé dans un rayon d'environ 500 m, sur la section cadastrale ou sur la commune, et la portée retenue est indiquée.",
      },
      {
        ref: "PT.04",
        title: "Alsace-Moselle signalée",
        body: "DVF ne couvrant pas ces départements, une estimation régionale est affichée avec un avertissement, jamais comme une vente réelle.",
      },
      {
        ref: "PT.05",
        title: "Prix admissible du terrain",
        body: "En mode compte à rebours, l'application calcule le prix maximal du terrain compatible avec votre marge cible : c'est la charge foncière admissible, pas un prix de marché.",
      },
    ],
    contextLink: {
      text: "Pour voir ces données sur une parcelle réelle, avec la source de chaque valeur :",
      href: "/analyse-plu-parcelle",
      label: "analyse PLU d'une parcelle",
    },
  },

  steps: {
    title: "Estimer un terrain en quatre temps",
    items: [
      {
        n: "01",
        title: "Vérifier la constructibilité",
        body: "Zone, règlement, servitudes, risques, réseaux : un terrain inconstructible ne se compare pas à un terrain à bâtir.",
      },
      {
        n: "02",
        title: "Estimer ce qu'il permet",
        body: "Emprise au sol et hauteur donnent un ordre de grandeur de la surface de plancher possible.",
      },
      {
        n: "03",
        title: "Relever les ventes comparables",
        body: "Ventes de terrains proches dans DVF ou Patrim, vérifiées une par une.",
      },
      {
        n: "04",
        title: "Confronter au prix admissible",
        body: "Pour une opération, comparer le prix de marché à la charge foncière admissible issue du bilan.",
      },
    ],
  },

  sources: {
    title: "Les sources utilisées par Fonciable",
    intro: "Les données publiques réellement interrogées par le produit pour le volet prix.",
    items: [
      "DVF (Etalab) : ventes de maisons et d'appartements autour de la parcelle, prix de sortie au m² bâti.",
      "Cadastre, API Carto de l'IGN : contour et surface de la parcelle.",
      "Géoportail de l'Urbanisme (GPU) : zonage et règles qui déterminent la surface constructible.",
      "Zonage fiscal A / B / C (data.gouv) : contexte de marché de la commune.",
    ],
    note:
      "Les ventes de terrains à bâtir ne sont pas analysées par le produit : pour un prix de marché de terrain, consultez directement DVF ou Patrim.",
  },

  limits: {
    title: "Ce qu'une estimation ne garantit pas",
    intro: "Une estimation de prix reste une aide à la négociation, pas une valeur opposable.",
    items: [
      "Fonciable ne donne pas de prix de marché pour un terrain à bâtir ; le prix qu'il calcule est le prix qu'une opération peut payer, selon vos hypothèses.",
      "Les ventes DVF décrivent des transactions passées, sans les conditions de la vente ni l'état du bien.",
      "Le Haut-Rhin, le Bas-Rhin, la Moselle et Mayotte ne sont pas couverts par DVF.",
      "Une évaluation opposable (succession, expropriation, contentieux) relève d'un expert en évaluation immobilière ou d'un notaire.",
      "Fonciable ne délivre ni certificat d'urbanisme, ni autorisation : la constructibilité qui fonde le prix se confirme en mairie.",
    ],
  },

  faq: [
    {
      q: "Comment connaître le prix d'un terrain constructible ?",
      a: "En consultant les ventes de terrains comparables : la base DVF, gratuite, recense les ventes des cinq dernières années, y compris de biens non bâtis ; le service Patrim de l'espace particulier impots.gouv.fr permet aussi de rechercher des transactions. Un notaire ou un professionnel de l'immobilier peut affiner l'estimation.",
    },
    {
      q: "Pourquoi le prix au m² d'un terrain varie-t-il autant ?",
      a: "Parce que le mètre carré de terrain ne permet pas partout de construire la même chose. Zone du PLU, emprise au sol, hauteur, viabilisation, forme et localisation changent la valeur d'un terrain de même surface.",
    },
    {
      q: "Quelle différence entre prix du marché et charge foncière ?",
      a: "Le prix du marché se déduit des ventes comparables. La charge foncière admissible se calcule à rebours, à partir de ce qu'une opération rapportera, moins ses coûts et sa marge : c'est le prix maximal qu'un promoteur peut payer.",
    },
    {
      q: "Fonciable estime-t-il le prix d'un terrain ?",
      a: "Pas le prix de marché. Fonciable utilise les ventes DVF de logements pour estimer le prix de sortie d'une opération, puis calcule en mode compte à rebours le prix maximal du terrain compatible avec votre marge cible.",
    },
  ],

  finalCta: {
    title: "Parlons d'un terrain et de son prix",
    body: "Apportez une parcelle et le prix demandé : nous vous montrerons ce que Fonciable calcule côté opération, et ce qui reste à vérifier côté marché.",
    label: "Prendre rendez-vous",
  },
};
