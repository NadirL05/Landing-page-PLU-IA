/**
 * Textes transverses partagés par l'accueil, le pied de page et les pages
 * métier. Ils étaient définis en local dans `app/page.tsx` ; les pages métier
 * doivent porter exactement le même avertissement et la même attribution de
 * données, sous peine de laisser diverger une mention à valeur juridique.
 */

/** Stripe Payment Link mode LIVE — compte "Agentimpact-Plu-IA", basculé le 21/08/2026. */
export const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";

export const DISCLAIMER_SHORT =
  "Estimations d'aide à la décision issues de sources publiques — ni certificat d'urbanisme, ni conseil juridique ou financier. Vérifications en mairie indispensables.";

export const DATA_ATTRIBUTION =
  "Données : © les contributeurs OpenStreetMap (ODbL) · IGN / Géoplateforme · DVF – Etalab (Licence Ouverte 2.0) · Géorisques – MTE · GPU · INSEE · ADEME · PVGIS – Commission européenne, Joint Research Centre.";

/** Route d'entrée réelle de l'application (app/dashboard/page.tsx côté sas-plu-3d). */
export const APP_ENTRY_PATH = "/dashboard";
