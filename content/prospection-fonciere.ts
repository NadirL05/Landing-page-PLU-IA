import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /prospection-fonciere.
 *
 * Affirmations vérifiées dans le dépôt produit (sas-plu-3d) :
 *  - moteur de gisement et formule du potentiel résiduel
 *    (SDP autorisée − SDP existante) : src/lib/gisement-engine.ts ;
 *  - quatre composantes du score (potentiel, valorisation, fiabilité,
 *    opportunité foncière) : SCORE_WEIGHT_* dans src/config/gisement-params.ts.
 *    Les pondérations et les références de normalisation NE SONT PAS publiées :
 *    ce sont des paramètres de calibrage internes ;
 *  - bâti existant issu du Référentiel National des Bâtiments (RNB), qui
 *    n'expose aucune hauteur : src/lib/gisement-sources.ts + rnb-engine ;
 *  - sources d'opportunité : Cartofriches (friches-engine) et FUSAC
 *    (fusac-engine), importées par src/lib/gisement-sources.ts ;
 *  - Sitadel et ZAN : signaux COMMUNAUX, explicitement exclus du score par
 *    candidat (commentaire de SCORE_WEIGHT_OPPORTUNITE, et avertissement
 *    « jamais présenter comme permis sur cette parcelle » sur SitadelSummary
 *    dans src/lib/plu-engine.ts) ;
 *  - zones A et N écartées : src/lib/gisement-engine.ts (constructible false).
 */
export const PROSPECTION_FONCIERE: MetierPageContent = {
  slug: "/prospection-fonciere",
  navLabel: "Prospection foncière",

  metaTitle: "Prospection foncière : repérer les parcelles à potentiel constructible",
  metaDescription:
    "Balayer un territoire pour identifier les parcelles au potentiel constructible résiduel : méthode de scoring, sources publiques utilisées et limites connues.",
  dateModified: "2026-08-29",

  eyebrow: "Balayage de territoire · potentiel résiduel · fiabilité",
  h1: "Repérer les parcelles qui méritent un appel",
  lede:
    "La prospection foncière consiste à faire remonter, sur un territoire donné, les terrains dont le potentiel constructible n'est pas encore consommé. Cette page explique la méthode, les données qu'elle mobilise et — surtout — les faux positifs qu'elle peut produire.",
  ctaPrimaryLabel: "Repérer des opportunités foncières",
  ctaSecondaryLabel: "Voir une démonstration",
  ctaNote: "Sans carte bancaire · 1 scan de prospection inclus dans l'offre Découverte",

  problem: {
    title: "Le gisement n'est pas rare, il est difficile à voir",
    body: [
      "Sur la plupart des communes urbaines, une part significative des parcelles bâties est en deçà de ce que le document d'urbanisme autoriserait : une maison sur un grand terrain en zone dense, un hangar au milieu d'un tissu à quatre niveaux, une friche déjà repérée par l'État. Le potentiel existe, mais il n'est visible qu'en croisant le zonage avec le bâti réellement présent.",
      "Fait à la main, ce croisement ne passe pas à l'échelle : il faudrait ouvrir le règlement de chaque zone, mesurer le bâti de chaque parcelle, puis vérifier que l'opération tiendrait financièrement. La difficulté n'est pas de trouver des candidats, c'est d'en produire une liste assez courte et assez fiable pour justifier des appels.",
    ],
    points: [
      {
        title: "Le potentiel se mesure en écart, pas en surface",
        body: "Ce qui compte n'est ni la taille de la parcelle ni celle du bâtiment, mais la différence entre ce que la zone autorise et ce qui est déjà construit. C'est cet écart — la surface de plancher résiduelle — qui décide s'il y a une opération à faire.",
      },
      {
        title: "Un candidat non vérifiable n'est pas un candidat",
        body: "Si le bâti existant est mal connu, l'écart calculé n'a aucune valeur. Une liste de prospection utile doit donc porter, pour chaque ligne, le niveau de confiance qu'on peut lui accorder.",
      },
      {
        title: "Un déplacement inutile coûte plus cher qu'un candidat manqué",
        body: "Un faux positif consomme un appel, parfois une visite, et entame la confiance dans l'outil. La méthode est donc volontairement conservatrice : elle préfère sous-estimer un potentiel que d'en inventer un.",
      },
    ],
  },

  capabilities: {
    title: "Comment le moteur de gisement classe les parcelles",
    intro:
      "Le scan compare, parcelle par parcelle, ce que le document d'urbanisme autorise et ce qui est déjà bâti, puis classe les candidats sur un score composite. Le calcul s'exécute dans l'application ; cette page en décrit seulement la logique.",
    items: [
      {
        ref: "PF.01",
        title: "Emprise de scan",
        body: "Le balayage porte sur un territoire délimité — une commune ou une zone tracée sur la carte — et sur les types de zones que vous retenez.",
      },
      {
        ref: "PF.02",
        title: "Potentiel de surface de plancher résiduelle",
        body: "Pour chaque parcelle : la surface de plancher autorisée par les règles de la zone, moins la surface de plancher déjà bâtie estimée à partir des bâtiments référencés. L'écart, s'il est positif, constitue le potentiel.",
      },
      {
        ref: "PF.03",
        title: "Valorisation issue du bilan promoteur",
        body: "Le même moteur de bilan que celui des études individuelles est appliqué au potentiel de chaque candidat, pour vérifier qu'un écart de surface se traduit bien par une opération finançable.",
      },
      {
        ref: "PF.04",
        title: "Fiabilité des données",
        body: "Chaque candidat porte un indicateur de fiabilité dépendant de la qualité des données disponibles : couverture du bâti, origine de la règle d'urbanisme retenue, présence de mutations exploitables à proximité.",
      },
      {
        ref: "PF.05",
        title: "Opportunité foncière recensée",
        body: "La proximité d'une friche recensée par Cartofriches (Cerema) ou d'un site foncier d'activités référencé par FUSAC (Cerema) constitue un signal indépendant du calcul d'urbanisme, pris en compte dans le classement lorsque ces référentiels sont disponibles sur le territoire scanné.",
      },
      {
        ref: "PF.06",
        title: "Zones inconstructibles écartées d'emblée",
        body: "Les parcelles situées en zone agricole ou naturelle sont exclues du scan : y calculer un potentiel n'aurait aucun sens et produirait des candidats systématiquement faux.",
      },
    ],
  },

  steps: {
    title: "D'un territoire à une liste d'appels",
    items: [
      {
        n: "01",
        title: "Délimiter le territoire",
        body: "Vous choisissez la commune ou l'emprise à balayer, ainsi que les types de zones à inclure. Les zones inconstructibles sont écartées automatiquement.",
      },
      {
        n: "02",
        title: "Croiser règles d'urbanisme et bâti existant",
        body: "Les zones du document d'urbanisme et les bâtiments référencés sont rapprochés du contour cadastral de chaque parcelle pour estimer, d'un côté, la surface autorisée et, de l'autre, la surface déjà construite.",
      },
      {
        n: "03",
        title: "Classer les candidats",
        body: "Le score combine quatre composantes : le potentiel de surface de plancher résiduelle, la valorisation estimée par le bilan promoteur, la fiabilité des données disponibles et la proximité d'une opportunité foncière déjà recensée par l'État.",
      },
      {
        n: "04",
        title: "Ouvrir une étude détaillée",
        body: "Un candidat retenu bascule vers une étude de faisabilité complète : règles de la zone, contraintes et risques, enveloppe constructible en 3D, comparables DVF et bilan promoteur ajustable.",
      },
    ],
  },

  sources: {
    title: "Les données mobilisées par un scan",
    intro:
      "Un classement ne vaut que par la qualité de ses entrées. Voici les sources réellement interrogées par le moteur de prospection.",
    items: [
      "Cadastre — API Carto de l'IGN : contour et surface de chaque parcelle balayée.",
      "Zonage d'urbanisme issu du Géoportail de l'Urbanisme : règles applicables par zone.",
      "Référentiel National des Bâtiments (RNB) : bâtiments existants sur la parcelle, pour estimer la surface déjà construite.",
      "DVF — Etalab : mutations locales, qui alimentent la valorisation estimée.",
      "Cartofriches — Cerema : friches recensées à proximité, signal d'opportunité foncière.",
      "FUSAC — Cerema : sites fonciers à usage d'activités (industriel, logistique, commercial, tertiaire) recensés à proximité.",
      "Sitadel (permis de construire) et consommation d'espaces naturels, agricoles et forestiers (période de référence ZAN, Cerema) : contexte de la commune, jamais rattaché à une parcelle.",
    ],
    note:
      "Sitadel et les indicateurs d'artificialisation sont des agrégats communaux : ils décrivent la dynamique d'un territoire et ne sont pas utilisés pour départager deux parcelles d'une même commune. Un permis relevé dans Sitadel ne peut pas être présenté comme un permis « sur cette parcelle ».",
  },

  proof: {
    title: "À quoi ressemble un candidat de la liste",
    intro:
      "Chaque ligne du résultat porte son potentiel, sa valorisation estimée et son niveau de fiabilité : de quoi décider d'un appel en connaissance de cause.",
    tag: "Exemple fictif — parcelle AB0142",
    rows: [
      { label: "Surface de plancher autorisée (maximum théorique)", value: "1 240 m²" },
      { label: "Surface de plancher existante estimée", value: "310 m²" },
      { label: "Potentiel résiduel", value: "930 m²" },
      { label: "Fiabilité des données", value: "Élevée" },
      { label: "Opportunité recensée à proximité", value: "Friche Cartofriches à 180 m" },
      { label: "Contexte communal (indicatif)", value: "Dynamique de permis soutenue" },
    ],
    bar: { label: "Part du potentiel autorisé encore disponible", pct: 75 },
    caption:
      "Exemple entièrement fictif, produit pour illustrer la mise en page : ni parcelle réelle, ni résultat de scan réel. Les pondérations internes du score ne sont pas publiées ; elles font partie du fonctionnement du produit.",
  },

  limits: {
    title: "Les faux positifs que la méthode peut produire",
    intro:
      "Ces limites ne sont pas des réserves d'usage : ce sont les cas où un candidat bien classé peut se révéler sans intérêt. Elles sont signalées dans l'outil, elles le sont aussi ici.",
    items: [
      "Une parcelle déjà construite mais absente du Référentiel National des Bâtiments apparaît comme libre : c'est le principal risque de la méthode, et la raison pour laquelle chaque candidat porte un indicateur de fiabilité.",
      "Le référentiel du bâti n'expose pas la hauteur des bâtiments : la surface existante est estimée avec une hypothèse conservatrice, qui sous-estime le bâti haut et peut faire apparaître un potentiel là où il n'y en a pas.",
      "Quand la commune ne publie pas son document d'urbanisme, les règles retenues proviennent d'un profil de repli par famille de zone : le potentiel calculé devient indicatif.",
      "Le classement ignore ce qui ne figure dans aucune base : intention du propriétaire, indivision, bail en cours, projet déjà déposé, état réel du bâtiment.",
      "Servitudes, prospects, gabarit et prescriptions particulières peuvent annuler un potentiel théorique : la vérification en mairie reste indispensable avant toute démarche.",
      "Une liste de prospection est une aide à la décision commerciale, jamais une garantie de constructibilité ni un acte d'instruction.",
    ],
  },

  faq: [
    {
      q: "Qu'est-ce que la prospection foncière ?",
      a: "C'est la recherche méthodique de terrains susceptibles d'accueillir une opération : repérage de parcelles sous-densifiées ou mutables sur un territoire, qualification de leur potentiel, puis prise de contact avec les propriétaires. Elle précède l'étude de faisabilité et la négociation.",
    },
    {
      q: "Comment identifier une parcelle à potentiel ?",
      a: "En comparant ce que le document d'urbanisme autorise sur la parcelle et ce qui y est déjà bâti. Un écart positif entre surface de plancher autorisée et surface de plancher existante signale un potentiel constructible résiduel ; encore faut-il que les données sur le bâti existant soient fiables.",
    },
    {
      q: "Sur quoi repose le classement des candidats ?",
      a: "Sur quatre composantes : le potentiel de surface de plancher résiduelle, la valorisation estimée par le bilan promoteur, la fiabilité des données mobilisées et la proximité d'une opportunité foncière déjà recensée (friche Cartofriches ou site d'activités FUSAC, deux référentiels du Cerema). Les pondérations internes ne sont pas publiées.",
    },
    {
      q: "Les données Sitadel et l'artificialisation entrent-elles dans le score ?",
      a: "Non. Ce sont des agrégats communaux : ils sont identiques pour toutes les parcelles d'une même commune et n'ont donc aucun pouvoir de discrimination entre candidats. Ils servent uniquement de contexte territorial, et un permis Sitadel n'est jamais présenté comme un permis déposé sur une parcelle donnée.",
    },
    {
      q: "Un candidat bien classé est-il constructible ?",
      a: "Non. Le classement signale un potentiel théorique méritant une vérification, pas une constructibilité établie. Servitudes, prospects, gabarit, prescriptions particulières et situation réelle du bien peuvent l'annuler. Les vérifications auprès des services compétents restent indispensables.",
    },
  ],

  finalCta: {
    title: "Balayez un territoire que vous connaissez déjà",
    body: "Lancez un scan sur une commune dont vous connaissez le tissu : c'est le moyen le plus rapide de juger la pertinence des candidats remontés — et de mesurer les faux positifs annoncés plus haut.",
    label: "Repérer des opportunités foncières",
  },
};
