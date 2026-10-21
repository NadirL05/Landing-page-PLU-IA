import { expect, LFDN_BADGE_HREF, test } from "./fixtures";

/**
 * Badge La Fabrique du Net (IMPLEMENTATION_PLAN § I) : chargé seulement après
 * le consentement « marketing » (décision du 21/10/2026, cookies tiers du
 * serveur du badge). Sans consentement : aucun appel vers lafabriquedunet.fr,
 * lien texte sans script. Avec consentement : un seul badge dans le pied de
 * page, y compris après navigation client, cible ≥ 24 px (WCAG 2.2, 2.5.8).
 * Le script tiers est simulé dans fixtures.ts (aucun appel réel).
 */

const ORIGIN = "https://www.lafabriquedunet.fr";
const BADGE_LINK = `footer [data-lfdn-badge-container] a[href="${LFDN_BADGE_HREF}"]`;

/** Consentement simulé : entrée Google Consent Mode v2 telle que la pousse le CMP. */
async function grantMarketingConsent(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [
      ["consent", "update", { ad_storage: "granted", ad_user_data: "granted", analytics_storage: "denied" }],
    ];
  });
}

test("CSP : l'origine La Fabrique du Net est dans script-src et nulle part ailleurs", async ({ page }) => {
  const response = await page.goto("/");
  const csp = response!.headers()["content-security-policy"];
  const directives = Object.fromEntries(
    csp.split(";").map((d) => d.trim().split(/\s+/)).map(([name, ...values]) => [name, values]),
  );
  expect(directives["script-src"]).toContain(ORIGIN);
  for (const [name, values] of Object.entries(directives)) {
    if (name !== "script-src") expect(values, name).not.toContain(ORIGIN);
  }
});

test("sans consentement : aucun script ni appel vers lafabriquedunet.fr, lien texte seul", async ({
  page,
  stubbed,
  blocked,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator('script[src*="lafabriquedunet"]')).toHaveCount(0);
  await expect(page.locator("[data-lfdn-badge-container]")).toHaveCount(0);
  expect([...stubbed, ...blocked].filter((url) => url.includes("lafabriquedunet"))).toEqual([]);

  const textLink = page.locator(`footer a[data-lfdn-text-link][href="${LFDN_BADGE_HREF}"]`);
  await expect(textLink).toHaveCount(1);
  await expect(textLink).toHaveText("Fonciable sur La Fabrique du Net");
  expect((await textLink.boundingBox())!.height).toBeGreaterThanOrEqual(24);
});

test("avec consentement : badge unique dans le pied de page, cible ≥ 24 px", async ({ page, stubbed }) => {
  await grantMarketingConsent(page);
  await page.goto("/");
  const badge = page.locator(BADGE_LINK);
  await expect(badge).toHaveCount(1);
  await expect(badge).toHaveAttribute("target", "_blank");
  await expect(page.locator(`a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  await expect(page.locator("[data-lfdn-text-link]")).toHaveCount(0);
  expect(stubbed.some((url) => url.startsWith(`${ORIGIN}/badge/software/fonciable/badge.js`))).toBe(true);

  const box = await badge.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(24);
  expect(box!.width).toBeGreaterThanOrEqual(24);
  const container = await page.locator("footer [data-lfdn-badge-container]").boundingBox();
  expect(container!.height).toBe(54);
});

test("avec consentement : pas de doublon après une navigation client", async ({ page }) => {
  await grantMarketingConsent(page);
  await page.goto("/");
  await expect(page.locator(`a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  await page.locator('footer a[href="/mentions-legales"]').click();
  await expect(page).toHaveURL(/\/mentions-legales$/);
  await expect(page.locator(BADGE_LINK)).toHaveCount(1);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(BADGE_LINK)).toHaveCount(1);
  await expect(page.locator(`a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  await expect(page.locator("script[data-lfdn-badge]")).toHaveCount(1);
});
