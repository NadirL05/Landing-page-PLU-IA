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
