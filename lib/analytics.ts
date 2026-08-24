"use client";

/**
 * Thin wrapper around gtag.js — no-ops safely when GA4/Google Ads aren't
 * configured yet (NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_GOOGLE_ADS_ID
 * unset), so this can ship before the ad accounts exist.
 */

type GtagArgs = [command: string, ...rest: unknown[]];
type FbqArgs = [command: string, ...rest: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
    fbq?: (...args: FbqArgs) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  // Meta Pixel : événement custom (pas trackCustom réservé aux events
  // hors liste standard Meta) — permet de créer une conversion
  // personnalisée dans Ads Manager sur "start_free_analysis" sans
  // dupliquer l'instrumentation posée sur chaque CTA.
  if (typeof window.fbq === "function") window.fbq("trackCustom", name, params);
}

// Audit sécu 24/08 : n'autoriser que les paramètres d'attribution connus —
// forwarder `search.slice(1)` brut (toute la query string) faisait de cette
// fonction un passthrough non filtré vers app-plu-ia.agentimpact.fr :
// n'importe quel visiteur arrivant sur plu-ia.agentimpact.fr/?<n'importe_quoi>
// voyait ce paramètre recopié tel quel dans les liens CTA. Le lien affiché
// pointe vers le vrai domaine (donc passe les filtres anti-phishing basiques
// et rassure visuellement), mais relayait n'importe quel paramètre à l'app
// cible. Pas exploité aujourd'hui (aucun appel avec URL variable dans ce
// repo), mais withCurrentQuery est une fonction utilitaire réutilisable —
// correction par précaution.
const ALLOWED_QUERY_PARAMS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
];

/**
 * Appends allow-listed ad-click identifiers (gclid, utm_*, fbclid…) from the
 * current page's query string to an outbound URL so attribution survives the
 * hop from this landing domain to app-plu-ia.agentimpact.fr — otherwise every
 * campaign click loses its attribution the moment the visitor clicks "Lancer
 * une analyse".
 */
export function withCurrentQuery(url: string): string {
  if (typeof window === "undefined") return url;
  const params = new URLSearchParams(window.location.search);
  const filtered = new URLSearchParams();
  for (const key of ALLOWED_QUERY_PARAMS) {
    const value = params.get(key);
    if (value) filtered.set(key, value);
  }
  const qs = filtered.toString();
  if (!qs) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${qs}`;
}
