import { BRAND_URL, expect, readJsonLd, schemaTypes, test } from "./fixtures";

/**
 * Contenus SEO cœur (IMPLEMENTATION_PLAN § E, TESTING §4 lignes E1 à E7).
 * Les contrôles génériques (200, H1 unique, canonical, JSON-LD parsable)
 * couvrent déjà chaque URL du sitemap dans seo.spec.ts ; ici on vérifie ce
 * qui est propre à chaque page.
 */

test.describe("E1 — /bilan-promoteur", () => {
  test("H1, title et modèle XLSX réellement servi", async ({ page, request }) => {
    await page.goto("/bilan-promoteur");
    await expect(page.locator("h1")).toHaveText("Bilan promoteur : la méthode, les postes et un modèle Excel");
    await expect(page).toHaveTitle("Bilan promoteur : méthode, postes et modèle Excel | Fonciable");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${BRAND_URL}/bilan-promoteur`);
    const link = page.locator('main a[href="/modeles/bilan-promoteur-exemple-fictif.xlsx"]');
    await expect(link).toHaveCount(1);
    await expect(page.getByText("Exemple fictif, modèle Excel")).toBeVisible();

    const file = await request.get("/modeles/bilan-promoteur-exemple-fictif.xlsx");
    expect(file.status()).toBe(200);
    expect(file.headers()["content-type"]).toContain("spreadsheetml");
    const body = await file.body();
    // Un .xlsx est une archive ZIP : signature « PK ».
    expect(body.subarray(0, 2).toString("latin1")).toBe("PK");

    const types = schemaTypes(await readJsonLd(page));
    expect(types).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage"]));
  });
});

/** Contrôles communs d'une page guide : H1, canonical, JSON-LD, liens attendus. */
async function checkGuide(
  page: import("@playwright/test").Page,
  path: string,
  h1: string,
  links: readonly string[],
) {
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText(h1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${BRAND_URL}${path}`);
  const blocks = await readJsonLd(page);
  expect(schemaTypes(blocks)).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage"]));
  for (const href of links) {
    expect(await page.locator(`main a[href="${href}"]`).count(), href).toBeGreaterThan(0);
  }
  // Le disclaimer « pas un certificat d'urbanisme » est présent sur chaque page.
  await expect(page.locator("main").getByText(/certificat d.urbanisme/).first()).toBeVisible();
  return blocks;
}

test.describe("E2 — /charge-fonciere", () => {
  test("H1, canonical, JSON-LD, lien vers le bilan promoteur et le modèle", async ({ page }) => {
    await checkGuide(page, "/charge-fonciere", "Charge foncière : définition et calcul à rebours", [
      "/bilan-promoteur",
      "/modeles/bilan-promoteur-exemple-fictif.xlsx",
    ]);
    await page.goto("/bilan-promoteur");
    expect(await page.locator('main a[href="/charge-fonciere"]').count()).toBeGreaterThan(0);
  });
});

test.describe("E3 — /terrain-constructible", () => {
  test("H1, canonical, JSON-LD, textes officiels et exemple réel", async ({ page }) => {
    await checkGuide(page, "/terrain-constructible", "Comment savoir si un terrain est constructible ?", [
      "/analyse-plu-parcelle",
      "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006143348",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031210179",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F1633",
    ]);
    await expect(page.getByText("44109000BZ0070").first()).toBeVisible();
  });
});
