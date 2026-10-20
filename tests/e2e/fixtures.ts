import { test as base, expect } from "@playwright/test";

/**
 * Isolation réseau : seul le serveur local est joignable.
 *
 * - Calendly et app.fonciable.fr : réponse simulée (page vide 200) afin de
 *   vérifier la navigation sans prendre de vrai rendez-vous ni ouvrir de
 *   checkout réel. Chaque URL simulée est consignée dans `stubbed`.
 * - Tout le reste hors 127.0.0.1 (GA, Meta, CMP consentmanager, Sentry…) :
 *   requête annulée.
 * - `/monitoring` (tunnel Sentry, même origine) : annulé aussi, sinon le
 *   serveur relaierait l'événement vers Sentry.
 */
const STUBBED_HOSTS = new Set(["calendly.com", "app.fonciable.fr"]);
const LOCAL_HOSTS = new Set(["127.0.0.1", "localhost"]);

type Fixtures = {
  stubbed: string[];
  blocked: string[];
  pageErrors: Error[];
};

export const test = base.extend<Fixtures>({
  stubbed: async ({}, provide) => {
    await provide([]);
  },
  blocked: async ({}, provide) => {
    await provide([]);
  },
  pageErrors: async ({}, provide) => {
    await provide([]);
  },
  context: async ({ context, stubbed, blocked }, provide) => {
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (LOCAL_HOSTS.has(url.hostname)) {
        if (url.pathname.startsWith("/monitoring")) {
          blocked.push(url.href);
          return route.abort();
        }
        return route.continue();
      }
      if (STUBBED_HOSTS.has(url.hostname)) {
        stubbed.push(url.href);
        return route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<!doctype html><title>stub</title><p>stub</p>",
        });
      }
      blocked.push(url.href);
      return route.abort();
    });
    await provide(context);
  },
  page: async ({ page, pageErrors }, provide) => {
    page.on("pageerror", (error) => pageErrors.push(error));
    await provide(page);
  },
});

export { expect };

export const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";
export const APP_URL = "https://app.fonciable.fr";
export const BRAND_URL = "https://fonciable.fr";

/** Toutes les données JSON-LD d'une page, chaque bloc passé par JSON.parse. */
export async function readJsonLd(page: import("@playwright/test").Page): Promise<unknown[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.map((text) => JSON.parse(text));
}

/** Liste à plat des @type présents (y compris dans un éventuel @graph). */
export function schemaTypes(blocks: unknown[]): string[] {
  const types: string[] = [];
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const type = obj["@type"];
    if (typeof type === "string") types.push(type);
    if (Array.isArray(type)) types.push(...type.filter((t): t is string => typeof t === "string"));
    if (Array.isArray(obj["@graph"])) obj["@graph"].forEach(visit);
  };
  blocks.forEach(visit);
  return types;
}
