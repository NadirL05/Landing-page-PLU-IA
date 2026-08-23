/**
 * Copie d'affichage des plans commerciaux. SOURCE DE VÉRITÉ RÉELLE (Stripe,
 * quotas appliqués) : sas-plu-3d/src/config/plans.ts. Ce fichier n'a aucune
 * connexion Stripe — mettre à jour les deux repos ensemble sur tout
 * changement de prix/quota.
 */

export interface PlanFeature {
  label: string;
  included: boolean;
  note?: string;
}

export interface Plan {
  id: "FREE" | "PRO" | "ENTERPRISE";
  name: string;
  tagline: string;
  priceLabel: string;
  quotaLabel: string;
  retentionLabel: string;
  features: PlanFeature[];
}

export const PRICE_TAX_NOTICE =
  "Prix nets — TVA non applicable, article 293 B du CGI (franchise en base).";

const CORE_FEATURES: PlanFeature[] = [
  { label: "Analyse automatisée du PLU (zonage, règles, contraintes)", included: true },
  { label: "Bilan promoteur et étude de faisabilité financière", included: true },
  { label: "Références de prix issues des données DVF", included: true },
  { label: "Visualisation 3D du terrain et de l'enveloppe constructible", included: true },
  { label: "Export PDF du rapport d'analyse", included: true },
  { label: "Historique des projets et des analyses", included: true },
];

export const PLAN_LIST: readonly Plan[] = [
  {
    id: "FREE",
    name: "Découverte",
    tagline: "Tester l'outil sur vos premiers terrains.",
    priceLabel: "Gratuit",
    quotaLabel: "2 analyses / 30 jours",
    retentionLabel: "Conservation de vos analyses sans limite de durée",
    features: [
      ...CORE_FEATURES,
      { label: "Prospection foncière (scan de gisement)", included: true, note: "1 scan / mois" },
      { label: "Veille territoriale", included: true, note: "1 territoire surveillé" },
      { label: "Support par e-mail", included: false },
    ],
  },
  {
    id: "PRO",
    name: "Pro",
    tagline: "Pour un usage régulier en prospection foncière.",
    priceLabel: "99 € / mois",
    quotaLabel: "100 analyses / 30 jours",
    retentionLabel: "Conservation de vos analyses sans limite de durée",
    features: [
      ...CORE_FEATURES,
      { label: "Prospection foncière (scan de gisement)", included: true, note: "10 scans / mois" },
      { label: "Veille territoriale", included: true, note: "5 territoires surveillés" },
      { label: "Support par e-mail", included: true },
    ],
  },
  {
    id: "ENTERPRISE",
    name: "Entreprise",
    tagline: "Volumes et besoins spécifiques.",
    priceLabel: "Sur mesure",
    quotaLabel: "Volume d'analyses sur mesure",
    retentionLabel: "Conservation de vos analyses sans limite de durée",
    features: [
      ...CORE_FEATURES,
      { label: "Prospection foncière (scan de gisement)", included: true, note: "sur demande" },
      { label: "Veille territoriale", included: true, note: "sur demande" },
      { label: "Support par e-mail", included: true },
      { label: "Volume d'analyses adapté", included: true, note: "sur demande" },
      { label: "Accompagnement à la prise en main", included: true, note: "sur demande" },
    ],
  },
];
