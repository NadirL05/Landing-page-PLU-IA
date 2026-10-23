/**
 * Copie d'affichage des plans commerciaux. SOURCE DE VÉRITÉ RÉELLE (Stripe,
 * quotas appliqués) : sas-plu-3d/src/config/plans.ts. Ce fichier n'a aucune
 * connexion Stripe — mettre à jour les deux repos ensemble sur tout
 * changement de prix/quota.
 *
 * ⚠️ Historique : ce fichier n'affichait plus que l'offre gratuite et Entreprise
 * (commit "fix: remove pro plan from landing") pendant que la source de
 * vérité (sas-plu-3d) avait 4 plans avec Starter à 199 €/mois et Pro à
 * 599 €/mois — la page tarifs de la landing et la page CGV de l'app
 * (qui lit PLAN_LIST dynamiquement, elle) affichaient donc deux
 * structures différentes. Réharmonisé le 2026-08-28 sur les 4 plans
 * réels.
 *
 * 2026-10-21 : l'offre gratuite a été retirée (décision de Nadir). Seules
 * restent Starter (199 €/mois), Pro (599 €/mois) et Entreprise (sur devis).
 */

export interface PlanFeature {
  label: string;
  included: boolean;
  note?: string;
}

export interface Plan {
  id: "STARTER" | "PRO" | "ENTERPRISE";
  name: string;
  tagline: string;
  priceLabel: string;
  quotaLabel: string;
  retentionLabel: string;
  /** Offre précédente reprise en entier (« Tout Starter, plus : »), puis seules les capacités en plus. */
  includes?: string;
  features: PlanFeature[];
}

/** Nadir Lahyani EI est assujetti à la TVA (confirmé le 21/10/2026) : prix affichés HT. */
export const PRICE_TAX_NOTICE = "Prix hors taxes (HT), TVA 20 % en sus.";

const CORE_FEATURES: PlanFeature[] = [
  { label: "Analyse automatisée du PLU (zonage, règles, contraintes)", included: true },
  { label: "Bilan promoteur et étude de faisabilité financière", included: true },
  { label: "Références de prix issues des données DVF", included: true },
  { label: "Visualisation 3D du terrain et de l'enveloppe constructible", included: true },
  { label: "Simulation de division d'un terrain", included: true },
  { label: "Export PDF du rapport d'analyse", included: true },
  { label: "Historique des projets et des analyses", included: true },
];

/**
 * 2026-10-23 : Starter et Pro ne se distinguent plus seulement par les volumes
 * (décision de Nadir). Pro ajoute le lotissement et l'espace d'équipe, réservés
 * côté application (sas-plu-3d, hasProCapabilities).
 */
export const PLAN_LIST: readonly Plan[] = [
  {
    id: "STARTER",
    name: "Starter",
    tagline: "Pour étudier un terrain : règles, faisabilité, division.",
    priceLabel: "199 € / mois",
    quotaLabel: "15 analyses / 30 jours",
    retentionLabel: "Conservation de vos analyses sans limite de durée",
    features: [
      ...CORE_FEATURES,
      { label: "Prospection foncière (scan de gisement)", included: true, note: "2 scans / mois" },
      { label: "Veille territoriale", included: true, note: "2 territoires surveillés" },
      { label: "Support par e-mail", included: true },
    ],
  },
  {
    id: "PRO",
    name: "Pro",
    tagline: "Pour trouver des terrains et monter des opérations, en équipe.",
    priceLabel: "599 € / mois",
    quotaLabel: "100 analyses / 30 jours",
    retentionLabel: "Conservation de vos analyses sans limite de durée",
    includes: "Tout Starter, plus :",
    features: [
      { label: "Étude de lotissement : lots à bâtir, voie nouvelle, variantes", included: true },
      { label: "Espace d'équipe partagé avec vos collaborateurs", included: true },
      { label: "Prospection foncière (scan de gisement)", included: true, note: "10 scans / mois" },
      { label: "Veille territoriale", included: true, note: "5 territoires surveillés" },
      { label: "Support par e-mail prioritaire", included: true },
    ],
  },
  {
    id: "ENTERPRISE",
    name: "Entreprise",
    tagline: "Volumes et besoins spécifiques.",
    priceLabel: "Sur mesure",
    quotaLabel: "Volume d'analyses sur mesure",
    retentionLabel: "Conservation de vos analyses sans limite de durée",
    includes: "Tout Pro, plus :",
    features: [
      { label: "Volume d'analyses adapté", included: true, note: "sur demande" },
      { label: "Prospection et veille à la mesure de vos territoires", included: true, note: "sur demande" },
      { label: "Accompagnement à la prise en main", included: true, note: "sur demande" },
    ],
  },
];

/** Offres présentées sur le site commercial (bloc tarifs, FAQ, JSON-LD offers). */
export const PUBLIC_PLAN_LIST = PLAN_LIST;
