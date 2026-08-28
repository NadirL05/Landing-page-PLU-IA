/**
 * Copie d'affichage des plans commerciaux. SOURCE DE VÉRITÉ RÉELLE (Stripe,
 * quotas appliqués) : sas-plu-3d/src/config/plans.ts. Ce fichier n'a aucune
 * connexion Stripe — mettre à jour les deux repos ensemble sur tout
 * changement de prix/quota.
 *
 * ⚠️ Historique : ce fichier n'affichait plus que FREE/ENTERPRISE
 * (commit "fix: remove pro plan from landing") pendant que la source de
 * vérité (sas-plu-3d) avait 4 plans avec Starter à 199 €/mois et Pro à
 * 599 €/mois — la page tarifs de la landing et la page CGV de l'app
 * (qui lit PLAN_LIST dynamiquement, elle) affichaient donc deux
 * structures différentes. Réharmonisé le 2026-08-28 sur les 4 plans
 * réels.
 */

export interface PlanFeature {
  label: string;
  included: boolean;
  note?: string;
}

export interface Plan {
  id: "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
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
    id: "STARTER",
    name: "Starter",
    tagline: "Pour un promoteur local qui étudie quelques terrains par mois.",
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
    tagline: "Pour un promoteur actif, plusieurs programmes en parallèle.",
    priceLabel: "599 € / mois",
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
