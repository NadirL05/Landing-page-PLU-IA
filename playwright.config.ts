import { defineConfig, devices } from "@playwright/test";

/**
 * E2E Playwright — parcours principal de la landing (docs/TESTING.md §3).
 *
 * - Serveur : build de production puis `next start` sur un port dédié (3107),
 *   pour ne jamais réutiliser par erreur un `next dev` lancé sur 3000.
 *   `npm test` construit déjà le site juste avant : il pose
 *   PW_SKIP_BUILD=1 pour ne pas reconstruire une seconde fois.
 * - Analytics : IDs GA4 / Google Ads / Meta vidés, aucun traceur monté.
 * - Réseau : tout appel hors du serveur local est bloqué ou simulé dans
 *   tests/e2e/fixtures.ts (Calendly, app.fonciable.fr, CMP, Sentry…).
 * - Navigateur : Chromium seul (headless shell), contrainte disque du poste.
 */
const PORT = 3107;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const START = `npx next start -p ${PORT} -H 127.0.0.1`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    locale: "fr-FR",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: process.env.PW_SKIP_BUILD ? START : `npm run build && ${START}`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "",
      NEXT_PUBLIC_GOOGLE_ADS_ID: "",
      NEXT_PUBLIC_META_PIXEL_ID: "",
    },
  },
});
