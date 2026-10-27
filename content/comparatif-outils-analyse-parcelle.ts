import type { MetierPageContent } from "@/components/metier/types";

/**
 * Contenu de la page publique /comparatif-outils-analyse-parcelle.
 *
 * Requête cible : intention comparative (« outil analyse PLU », « comparatif
 * logiciel analyse parcelle »), mission SEO/GEO validée par Nadir le
 * 27/10/2026. La requête « analyse plu parcelle » reste portée par
 * /analyse-plu-parcelle (page principale, pas de cannibalisation) ; ses
 * résultats Google (terranota.fr, france-cadastre.fr, landup.fr) ont servi
 * à choisir les outils comparés. Plan : IMPLEMENTATION_PLAN § K1.
 *
 * Page publiée par l'éditeur de Fonciable : cela est dit dans le chapeau, en
 * tête du comparatif et dans les limites. Outils classés par ordre
 * alphabétique. Aucun dénigrement ; une information absente du site officiel
 * de l'outil est écrite « non indiqué sur son site ».
 *
 * Pages officielles lues le 2026-10-27 (texte brut récupéré sans JavaScript) :
 *  - geoportail-urbanisme.gouv.fr (/info-general/ : services offerts ;
 *    /infos-legales/ : éditeur MCT + IGN, « accès gratuit et illimité pour
 *    tous les usages privés comme professionnels ») ;
 *  - france-cadastre.fr (accueil : « 100 % gratuit », « Sans inscription pour
 *    consulter », « n'est affilié à aucune organisation publique », PLU,
 *    permis de construire, extraits de matrice, sources listées) ;
 *  - kelfoncier.com (accueil : publics, PLU à jour, plus de 50 critères,
 *    préfaisabilité, propriétaires, CRM, « 200 appels quotidiens aux mairies »,
 *    « 30 cartographes dédiés au contrôle qualité », « essai gratuit illimité pendant
 *    48h », aucun prix ; /tarifs/ répond 404) ;
 *  - landup.fr (accueil et /tester-mon-terrain/ : propriétaires vendeurs,
 *    simulateur gratuit, accompagnement de la vente (sélection des promoteurs
 *    et négociation), prix du m² SDP de la commune, « Prix du terrain et
 *    charge foncière : communiqués sur demande », rémunération à la signature
 *    de l'acte authentique payée par l'acquéreur,
 *    observatoire de quelques centaines de communes, seuil 1 500 m² SDP,
 *    cadastre DGFiP / Etalab, « données PLU officielles ») ;
 *  - terranota.fr (accueil et /nos-offres/ : cabinet d'urbanisme
 *    réglementaire, notaires / avocats / constructeurs, grille HT / TTC
 *    affichée sans symbole monétaire, note de renseignements d'urbanisme 55 HT
 *    / 66 TTC dans le département, étude préalable 500 HT / 600 TTC).
 *  Écartés : cityscan.fr (HTTP 500 le 27/10/2026, rien de vérifiable).
 *
 * Affirmations sur Fonciable : uniquement ce qui est déjà publié sur
 * fonciable.fr (content/analyse-plu-parcelle.ts et ses preuves
 * docs/PREUVES-page-analyse-plu.md, public/llms.txt) et config/plans.ts
 * (Starter 79 €/mois, Pro 199 €/mois, Entreprise sur mesure, PRICE_TAX_NOTICE).
 */
export const COMPARATIF_OUTILS_ANALYSE_PARCELLE: MetierPageContent = {
  slug: "/comparatif-outils-analyse-parcelle",
  navLabel: "Comparatif des outils",
  related: ["/analyse-plu-parcelle", "/terrain-constructible", "/zonage-plu", "/certificat-urbanisme", "/faisabilite-fonciere"],

  metaTitle: "Outils d'analyse PLU et parcelle : comparatif",
  metaDescription:
    "Géoportail de l'Urbanisme, France Cadastre, Kel Foncier, LandUp, Terranota, Fonciable : public, fonctions, données et prix, sites lus le 27/10/2026.",
  dateModified: "2026-10-27",
  article: { datePublished: "2026-10-27" },

  eyebrow: "Comparatif · analyse PLU · parcelle",
  h1: "Outils d'analyse de parcelle et de PLU : comparatif",
  lede:
    "Pour connaître les règles d'une parcelle, on peut passer par un service public gratuit, un site du cadastre, un logiciel de prospection foncière, un cabinet d'urbanisme ou un outil d'aide à la décision. Ce comparatif présente six outils : public, fonctions, données et prix public. Il est publié par l'éditeur de Fonciable, qui figure dans la liste : chaque information sur les autres outils vient de leur site officiel, lu le 27 octobre 2026.",
  ctaPrimaryLabel: "Prendre rendez-vous",
  ctaNote: "Parlons de votre besoin d'analyse de parcelle.",

  comparison: {
    kicker: "Tableau comparatif",
    title: "Six outils côte à côte",
    intro:
      "Ordre alphabétique. Chaque cellule reprend le site officiel de l'outil ; une information absente est notée comme telle. Fonciable est édité par AgentImpact, qui publie cette page.",
    columns: ["Pour qui", "Ce qu'il fait", "Données citées", "Prix public"],
    rows: [
      {
        tool: "Fonciable",
        href: "https://fonciable.fr/",
        cells: [
          "Promoteurs, marchands de biens, architectes et professionnels de l'immobilier",
          "Zone et règles du PLU avec leur source, enveloppe constructible théorique en 3D, servitudes publiées, risques, comparables DVF, bilan promoteur, export PDF",
          "Cadastre IGN (API Carto), Géoportail de l'Urbanisme, DVF, Géorisques, servitudes (API Carto GPU), Base Adresse Nationale",
          "Starter 79 € / mois, Pro 199 € / mois, Entreprise sur mesure ; prix nets, TVA non applicable (art. 293 B du CGI)",
        ],
      },
      {
        tool: "France Cadastre",
        href: "https://www.france-cadastre.fr/",
        cells: [
          "Tout public (particuliers et projets immobiliers)",
          "Consultation du plan cadastral et des parcelles, accès aux documents d'urbanisme, historique des permis de construire, demandes d'extraits de matrice cadastrale",
          "Plan cadastral informatisé, DVF, données ouvertes du cadastre, Géorisques, data.gouv.fr",
          "Gratuit selon son site (« 100 % gratuit », sans inscription pour consulter)",
        ],
      },
      {
        tool: "Géoportail de l'Urbanisme",
        href: "https://www.geoportail-urbanisme.gouv.fr/",
        cells: [
          "Citoyens et professionnels",
          "Zonage et prescriptions d'une parcelle, consultation et téléchargement des documents d'urbanisme, servitudes d'utilité publique",
          "Documents versés par les communes et intercommunalités compétentes",
          "Gratuit et illimité, usages privés comme professionnels (mentions légales)",
        ],
      },
      {
        tool: "Kel Foncier",
        href: "https://www.kelfoncier.com/",
        cells: [
          "Promoteurs, bailleurs sociaux, énergies renouvelables, aménageurs et lotisseurs, marchands de biens, immobilier d'entreprise",
          "PLU à jour par commune, recherche de fonciers sur plus de 50 critères, préfaisabilité, prix du foncier, taxe d'aménagement, données sur les propriétaires, CRM",
          "Selon son site : 200 appels quotidiens aux mairies et 30 cartographes pour le contrôle qualité ; bases de données non détaillées sur la page d'accueil",
          "Non indiqué sur son site ; essai gratuit de 48 h proposé",
        ],
      },
      {
        tool: "LandUp",
        href: "https://www.landup.fr/",
        cells: [
          "Propriétaires de terrains qui envisagent de vendre à un promoteur",
          "Simulateur de constructibilité, expertise manuelle gratuite, accompagnement de la vente (choix des promoteurs et négociation pour le propriétaire)",
          "Données PLU officielles, observatoire de parcelles analysées à la main, cadastre DGFiP / Etalab",
          "Gratuit pour le propriétaire ; rémunération à la signature de l'acte, payée par l'acquéreur, selon son site",
        ],
      },
      {
        tool: "Terranota",
        href: "https://terranota.fr/",
        cells: [
          "Notaires, avocats, constructeurs, promoteurs et particuliers",
          "Cabinet d'urbanisme réglementaire : notes de renseignements d'urbanisme, DIA, état des risques, certificats, études réglementaires",
          "Non indiqué sur son site",
          "Grille publique : note de renseignements d'urbanisme 55 HT / 66 TTC dans le département, étude préalable 500 HT / 600 TTC",
        ],
      },
    ],
    caption:
      "Sites officiels consultés le 27 octobre 2026. Les prix ne sont pas comparables directement (abonnement, acte à l'unité, rémunération à la vente) et peuvent changer, comme les fonctions : vérifiez sur le site de chaque outil. Terranota affiche ses montants en HT et TTC sans symbole monétaire.",
  },

  guide: {
    kicker: "Outil par outil",
    title: "Ce que chaque outil fait, et pour qui",
    intro:
      "Chaque fiche résume le site officiel de l'outil, lu le 27 octobre 2026 ; public, données et prix figurent dans le tableau ci-dessus. Les fiches décrivent, sans noter.",
    blocks: [
      {
        title: "Fonciable",
        paragraphs: [
          "Fonciable est un outil d'aide à la décision foncière, édité par AgentImpact, qui publie cette page. À partir d'une adresse, d'une référence cadastrale ou d'un clic sur la carte, il relève la zone du document d'urbanisme en vigueur, lit le règlement de la zone et indique la provenance de chaque règle (emprise au sol, hauteur, retraits, espaces verts). Quand les règles le permettent, il calcule une enveloppe constructible théorique visualisée en 3D, puis un bilan promoteur paramétrable.",
          "Ses résultats sont des estimations : ni certificat d'urbanisme, ni conseil juridique.",
        ],
        link: {
          text: "La méthode et un exemple réel à Nantes sont détaillés sur",
          href: "/analyse-plu-parcelle",
          label: "la page Analyse PLU d'une parcelle",
        },
      },
      {
        title: "France Cadastre",
        paragraphs: [
          "France Cadastre est un site de consultation du cadastre. Il se présente comme indépendant et précise qu'il n'est affilié à aucune organisation publique. On y consulte les plans et les parcelles, les documents d'urbanisme d'une commune et l'historique des permis de construire ; le site transmet aussi des demandes d'extraits de matrice cadastrale aux mairies et aux services des impôts.",
        ],
        sources: [{ label: "france-cadastre.fr, page d'accueil (consultée le 27/10/2026)", href: "https://www.france-cadastre.fr/" }],
      },
      {
        title: "Géoportail de l'Urbanisme",
        paragraphs: [
          "Le Géoportail de l'Urbanisme est le service public de consultation des documents d'urbanisme, édité, selon ses mentions légales, par le ministère de la Cohésion des territoires et géré avec l'IGN. Il permet de localiser un terrain, d'afficher et d'interroger le zonage et les prescriptions qui s'y appliquent, de consulter et télécharger le règlement, et de connaître les servitudes d'utilité publique. Les communes et intercommunalités y versent leurs documents ; à défaut, la mairie reste la source.",
        ],
        sources: [
          { label: "Présentation du GPU (consultée le 27/10/2026)", href: "https://www.geoportail-urbanisme.gouv.fr/info-general/" },
          { label: "Mentions légales du GPU (consultées le 27/10/2026)", href: "https://www.geoportail-urbanisme.gouv.fr/infos-legales/" },
        ],
      },
      {
        title: "Kel Foncier",
        paragraphs: [
          "Kel Foncier est un logiciel de développement foncier. Son site annonce la consultation du PLU à jour dans les communes, une recherche de fonciers sur plus de cinquante critères, une préfaisabilité, le prix du foncier, le calcul de la taxe d'aménagement, des informations sur les propriétaires et un CRM pour suivre parcelles, projets et courriers. Selon son site : 200 appels quotidiens aux mairies pour vérifier les règles et 30 cartographes pour le contrôle qualité.",
        ],
        sources: [{ label: "kelfoncier.com, page d'accueil (consultée le 27/10/2026)", href: "https://www.kelfoncier.com/" }],
      },
      {
        title: "LandUp",
        paragraphs: [
          "LandUp s'adresse aux propriétaires qui envisagent de vendre un terrain à un promoteur. Son simulateur indique, pour les parcelles déjà étudiées, une typologie de projet, un potentiel de surface de plancher et le prix de référence au m² de SDP de la commune ; le prix du terrain est communiqué sur demande, selon son site. Le site précise que ces parcelles ont été analysées à la main, sur quelques centaines de communes, à partir d'un seuil de 1 500 m² de surface de plancher ; sinon, une expertise manuelle gratuite est proposée.",
        ],
        sources: [
          { label: "landup.fr, page d'accueil (consultée le 27/10/2026)", href: "https://www.landup.fr/" },
          { label: "landup.fr, Tester mon terrain (consultée le 27/10/2026)", href: "https://www.landup.fr/tester-mon-terrain/" },
        ],
      },
      {
        title: "Terranota",
        paragraphs: [
          "Terranota se présente comme un cabinet d'urbanisme réglementaire. Ses offres portent sur les renseignements d'urbanisme (note et dossier), le zonage et les droits de préemption, la déclaration d'intention d'aliéner, l'état des risques, divers certificats et des études réglementaires. Les demandes se passent dans un espace en ligne.",
        ],
        sources: [
          { label: "terranota.fr, page d'accueil (consultée le 27/10/2026)", href: "https://terranota.fr/" },
          { label: "terranota.fr, Nos offres (consultée le 27/10/2026)", href: "https://terranota.fr/nos-offres/" },
        ],
      },
      {
        title: "Quel outil pour quel besoin ?",
        paragraphs: ["Ces outils ne répondent pas à la même question. Quelques repères selon la situation :"],
        list: [
          "Lire gratuitement la zone et le règlement d'une parcelle : le Géoportail de l'Urbanisme, source publique des documents versés par les communes.",
          "Retrouver une parcelle au cadastre ou un historique de permis, sans compte : France Cadastre.",
          "Obtenir un document de renseignements d'urbanisme pour une vente, ou une étude réglementaire avant un permis, avec un cabinet : Terranota.",
          "Savoir, en tant que propriétaire, ce qu'un promoteur pourrait payer pour son terrain : LandUp.",
          "Prospecter un territoire sur de nombreux critères et suivre ses dossiers dans un CRM : Kel Foncier.",
          "Lire le PLU d'une parcelle avec la source de chaque règle, en déduire une enveloppe théorique et un bilan promoteur : Fonciable.",
        ],
        link: {
          text: "Quel que soit l'outil, la méthode de vérification reste la même : voir",
          href: "/terrain-constructible",
          label: "la page Savoir si un terrain est constructible",
        },
      },
    ],
  },

  problem: {
    title: "Analyser le PLU d'une parcelle : plusieurs besoins, plusieurs outils",
    body: [
      "Derrière la même recherche, des besoins différents : un particulier qui veut connaître sa zone, un notaire qui prépare une vente, un propriétaire sollicité par un promoteur, un développeur foncier qui étudie des dizaines de terrains.",
    ],
    points: [
      {
        title: "Une donnée publique, des usages différents",
        body: "Zonage et règlement sont publics ; les outils diffèrent par ce qu'ils en font : consultation, document rédigé par un cabinet, estimation ou calcul.",
      },
      {
        title: "Des prix rarement comparables",
        body: "Gratuit, paiement à l'acte, abonnement ou rémunération à la vente : les modèles diffèrent.",
      },
      {
        title: "Aucun outil ne vaut décision",
        body: "Seule la mairie instruit une demande ; un certificat d'urbanisme fige les règles, un outil ne le fait pas.",
      },
    ],
  },

  capabilities: {
    title: "Ce que Fonciable fait, et ne fait pas",
    intro:
      "Puisque cette page est publiée par l'éditeur de Fonciable, voici son périmètre exact, tel que décrit sur fonciable.fr.",
    items: [
      {
        ref: "CO.01",
        title: "Règles sourcées",
        body: "Chaque règle lue indique sa provenance, avec la page du règlement quand elle est disponible.",
      },
      {
        ref: "CO.02",
        title: "Enveloppe théorique",
        body: "Une fourchette de surface de plancher n'est calculée que si l'emprise et la hauteur sont des valeurs simples.",
      },
      {
        ref: "CO.03",
        title: "Servitudes publiées seulement",
        body: "Les servitudes interrogées sont celles publiées sur le Géoportail de l'Urbanisme : leur absence de résultat ne prouve pas leur absence.",
      },
      {
        ref: "CO.04",
        title: "Pas d'acte",
        body: "Fonciable ne délivre aucun document de renseignements d'urbanisme, aucun certificat, aucun acte opposable.",
      },
    ],
    contextLink: {
      text: "Pour voir ce que donne une analyse sur une parcelle réelle :",
      href: "/analyse-plu-parcelle",
      label: "analyse PLU d'une parcelle à Nantes",
    },
  },

  steps: {
    title: "Comparer avant de choisir",
    items: [
      { n: "01", title: "Définir la question", body: "Connaître une zone, préparer une vente, estimer un terrain ou chiffrer une opération." },
      { n: "02", title: "Vérifier la couverture", body: "Le document de la commune est-il publié sur le Géoportail de l'Urbanisme ? L'outil couvre-t-il ce territoire ?" },
      { n: "03", title: "Regarder les sources", body: "Un résultat doit dire d'où vient chaque règle pour pouvoir être vérifié." },
      { n: "04", title: "Confirmer en mairie", body: "Avant tout engagement, le service urbanisme ou un certificat d'urbanisme confirme les règles." },
    ],
  },

  sources: {
    title: "Les données que Fonciable interroge",
    intro: "Les sources publiques que Fonciable cite sur son site.",
    items: [
      "Cadastre, API Carto de l'IGN.",
      "Géoportail de l'Urbanisme : zonage et règlement.",
      "Servitudes d'utilité publique, API Carto GPU.",
      "Géorisques : risques et aléa argiles.",
      "DVF (Etalab) : ventes dans un rayon de 500 m par défaut.",
      "Base Adresse Nationale.",
    ],
    note: "Toutes les communes ne publient pas leur document d'urbanisme sur le Géoportail de l'Urbanisme.",
  },

  limits: {
    title: "Les limites de ce comparatif",
    intro: "Ce comparatif est publié par AgentImpact, éditeur de Fonciable. Gardez-le en tête en le lisant.",
    items: [
      "Les autres outils sont décrits d'après leur site officiel, lu le 27 octobre 2026, pas d'après un test de leurs logiciels.",
      "Les prix et fonctions évoluent : vérifiez sur le site de chaque éditeur avant de choisir.",
      "Seuls figurent les outils dont les informations ont pu être vérifiées en ligne ; un outil absent n'est pas jugé.",
      "Aucun de ces outils ne remplace l'instruction par la mairie ; seul un certificat d'urbanisme délivré par l'administration fige les règles.",
    ],
  },

  faq: [
    {
      q: "Comment analyser gratuitement le PLU d'une parcelle ?",
      a: "Sur le Géoportail de l'Urbanisme, gratuitement : on y affiche la zone d'une parcelle et on y télécharge le règlement, si la commune y a publié son document. Sinon, la mairie reste la source.",
    },
    {
      q: "Quel est le prix d'un outil d'analyse de parcelle ?",
      a: "Selon leurs sites au 27 octobre 2026 : le Géoportail de l'Urbanisme et France Cadastre sont gratuits, LandUp est gratuit pour le propriétaire, Terranota affiche une grille à l'acte, Kel Foncier n'indique pas de prix, Fonciable est à 79 € ou 199 € par mois (prix nets, TVA non applicable).",
    },
    {
      q: "Qui publie ce comparatif ?",
      a: "AgentImpact, éditeur de Fonciable, qui figure dans la liste. Les autres outils sont décrits à partir de leur site officiel uniquement, avec la date de consultation.",
    },
    {
      q: "Un outil en ligne remplace-t-il un certificat d'urbanisme ?",
      a: "Non. Seul le certificat d'urbanisme, délivré par l'administration, fige les règles applicables pendant dix-huit mois.",
    },
  ],

  finalCta: {
    title: "Voir Fonciable sur une de vos parcelles",
    body: "Apportez un terrain : nous vous montrerons ce que Fonciable en lit et d'où vient chaque règle.",
    label: "Prendre rendez-vous",
  },
};
