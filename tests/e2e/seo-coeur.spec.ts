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

test.describe("E4 — /division-parcellaire", () => {
  test("H1, canonical, JSON-LD, textes officiels", async ({ page }) => {
    await checkGuide(page, "/division-parcellaire", "Division parcellaire : règles, autorisations et étapes", [
      "/prospection-fonciere",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000025019439",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720609",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F37932",
    ]);
    await expect(page.getByText("Exemple fictif, calcul de principe")).toBeVisible();
  });
});

test.describe("E5 — /zonage-plu et pages de zone", () => {
  test("/zonage-plu : H1, articles R151-18 à R151-24, liens vers chaque zone", async ({ page }) => {
    await checkGuide(page, "/zonage-plu", "Zonage PLU : les zones U, AU, A et N expliquées", [
      "/zonage-plu/zone-u",
      "/zonage-plu/zone-au",
      "/zonage-plu/zone-a",
      "/zonage-plu/zone-n",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720611",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720607",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720603",
    ]);
  });

  const zones = [
    { path: "/zonage-plu/zone-u", h1: "Zone U du PLU : la zone urbaine et ses secteurs UA, UB", article: "LEGIARTI000031720615" },
    { path: "/zonage-plu/zone-au", h1: "Zone AU du PLU : zone à urbaniser, ouverte ou fermée", article: "LEGIARTI000031720611" },
    { path: "/zonage-plu/zone-a", h1: "Zone A du PLU : la zone agricole et ce qui peut y être autorisé", article: "LEGIARTI000031720607" },
    { path: "/zonage-plu/zone-n", h1: "Zone N du PLU : la zone naturelle et forestière", article: "LEGIARTI000031720603" },
  ];
  for (const zone of zones) {
    test(`${zone.path} : article Légifrance, fil d'Ariane à 3 niveaux, liens vers les autres zones`, async ({ page }) => {
      const others = zones.filter((z) => z.path !== zone.path).map((z) => z.path);
      const blocks = await checkGuide(page, zone.path, zone.h1, [
        "/zonage-plu",
        `https://www.legifrance.gouv.fr/codes/article_lc/${zone.article}`,
        ...others,
      ]);
      const breadcrumb = blocks.find((b) => (b as Record<string, unknown>)["@type"] === "BreadcrumbList") as {
        itemListElement: { position: number; item: string }[];
      };
      expect(breadcrumb.itemListElement.map((i) => i.item)).toEqual([
        `${BRAND_URL}/`,
        `${BRAND_URL}/zonage-plu`,
        `${BRAND_URL}${zone.path}`,
      ]);
    });
  }
});
