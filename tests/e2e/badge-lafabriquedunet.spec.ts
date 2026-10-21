import { expect, LFDN_BADGE_HREF, test } from "./fixtures";

/**
 * Badge La Fabrique du Net (IMPLEMENTATION_PLAN § I) : présent une seule fois
 * dans le pied de page, y compris après navigation client, cible cliquable
 * ≥ 24 px (WCAG 2.2, 2.5.8), et origine autorisée en script-src uniquement.
 * Le script tiers est simulé dans fixtures.ts (aucun appel réel).
 */

const ORIGIN = "https://www.lafabriquedunet.fr";

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

test("badge présent une seule fois dans le pied de page, cible ≥ 24 px", async ({ page, stubbed }) => {
  await page.goto("/");
  const badge = page.locator(`footer [data-lfdn-badge-container] a[href="${LFDN_BADGE_HREF}"]`);
  await expect(badge).toHaveCount(1);
  await expect(badge).toHaveAttribute("target", "_blank");
  await expect(page.locator(`a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  expect(stubbed.some((url) => url.startsWith(`${ORIGIN}/badge/software/fonciable/badge.js`))).toBe(true);

  const box = await badge.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(24);
  expect(box!.width).toBeGreaterThanOrEqual(24);
  const container = await page.locator("footer [data-lfdn-badge-container]").boundingBox();
  expect(container!.height).toBe(54);
});

test("pas de doublon après une navigation client", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  await page.locator('footer a[href="/mentions-legales"]').click();
  await expect(page).toHaveURL(/\/mentions-legales$/);
  await expect(page.locator(`footer a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(`a[href="${LFDN_BADGE_HREF}"]`)).toHaveCount(1);
  await expect(page.locator("script[data-lfdn-badge]")).toHaveCount(1);
});
