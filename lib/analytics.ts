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

/**
 * Appends the current page's query string (gclid, utm_*, fbclid…) to an
 * outbound URL so ad-click identifiers survive the hop from this landing
 * domain to app-plu-ia.agentimpact.fr — otherwise every campaign click
 * loses its attribution the moment the visitor clicks "Lancer une analyse".
 */
export function withCurrentQuery(url: string): string {
  if (typeof window === "undefined") return url;
  const search = window.location.search;
  if (!search) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${search.slice(1)}`;
}
