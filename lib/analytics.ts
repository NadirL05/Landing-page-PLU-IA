"use client";

/**
 * Thin wrapper around gtag.js — no-ops safely when GA4/Google Ads aren't
 * configured yet (NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_GOOGLE_ADS_ID
 * unset), so this can ship before the ad accounts exist.
 */

type GtagArgs = [command: string, ...rest: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
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
