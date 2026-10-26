import { ALL_EDITORIAL_PAGES, otherSolutionPages, SOLUTION_PAGES } from "../../config/solutions";
import { BRAND_URL, expect, readJsonLd, schemaTypes, test } from "./fixtures";

/**
 * Pages indexables, données structurées, maillage interne, 404 et
 * redirections (TESTING §3 « scénarios complémentaires », §4 A4-A6).
 */

/** Chemin local d'une URL absolue du sitemap. */
const toPath = (loc: string) => new URL(loc).pathname;
/** « https://fonciable.fr » et « https://fonciable.fr/ » désignent la même ressource. */
const normalize = (url: string) => (new URL(url).pathname === "/" ? `${new URL(url).origin}/` : url);

/** Contenu du sitemap, lu une fois par worker. */
async function sitemapLocs(request: import("@playwright/test").APIRequestContext): Promise<string[]> {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

test.describe("Sitemap", () => {
  test("contient l'accueil, chaque page éditoriale (Solutions, guides, zones) et les pages légales, sans doublon", async ({ request }) => {
    const locs = await sitemapLocs(request);
    expect(new Set(locs).size).toBe(locs.length);
    // Accueil sans slash final, aligné sur sa canonical (audit SEO du 26/10/2026).
    expect(locs).toContain(BRAND_URL);
    for (const page of ALL_EDITORIAL_PAGES) expect(locs).toContain(`${BRAND_URL}${page.slug}`);
    expect(locs).toContain(`${BRAND_URL}/mentions-legales`);
    expect(locs).toContain(`${BRAND_URL}/confidentialite`);
    expect(locs).toHaveLength(ALL_EDITORIAL_PAGES.length + 3);
    for (const loc of locs) expect(loc === BRAND_URL || loc.startsWith(`${BRAND_URL}/`)).toBe(true);
  });

  test("chaque URL du sitemap : 200, H1 unique, canonical auto-référent, indexable, JSON-LD valide", async ({ page, request }) => {
    const locs = await sitemapLocs(request);
    for (const loc of locs) {
      await test.step(loc, async () => {
        const response = await page.goto(toPath(loc));
        expect(response?.status(), loc).toBe(200);
        await expect(page.locator("h1"), loc).toHaveCount(1);
        await expect(page.locator("h1"), loc).not.toBeEmpty();
        await expect(page.locator("main"), loc).toHaveCount(1);
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical, loc).toHaveCount(1);
        expect(normalize((await canonical.getAttribute("href"))!), loc).toBe(normalize(loc));
        const robots = await page.locator('meta[name="robots"]').getAttribute("content");
        expect(robots ?? "", loc).not.toContain("noindex");
        // Longueurs SEO (rapport du 21/10/2026, §9.8) : title ≤ 60 caractères,
        // suffixe « | Fonciable » compris ; meta description ≤ 155.
        expect((await page.title()).length, `${loc} title`).toBeLessThanOrEqual(60);
        const description = await page.locator('meta[name="description"]').getAttribute("content");
        expect(description?.length ?? 0, `${loc} description`).toBeGreaterThan(0);
        expect(description!.length, `${loc} description`).toBeLessThanOrEqual(155);
        // Chaque bloc JSON-LD doit se parser (readJsonLd lève sinon).
        const blocks = await readJsonLd(page);
        for (const block of blocks) {
          expect((block as Record<string, unknown>)["@context"], loc).toBe("https://schema.org");
        }
      });
    }
  });
});

test.describe("Pages métier", () => {
  for (const solution of SOLUTION_PAGES) {
    test(`${solution.slug} : WebPage + BreadcrumbList + FAQPage, fil d'Ariane, maillage`, async ({ page }) => {
      await page.goto(solution.slug);
      const url = `${BRAND_URL}${solution.slug}`;
      const blocks = await readJsonLd(page);
      const types = schemaTypes(blocks);
      expect(types).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage"]));

      const webPage = blocks.find((b) => (b as Record<string, unknown>)["@type"] === "WebPage") as { url: string };
      expect(webPage.url).toBe(url);

      const breadcrumb = blocks.find((b) => (b as Record<string, unknown>)["@type"] === "BreadcrumbList") as {
        itemListElement: { position: number; item: string; name: string }[];
      };
      const items = breadcrumb.itemListElement;
      expect(items[0].item).toBe(`${BRAND_URL}/`);
      expect(items.at(-1)!.item).toBe(url);
      items.forEach((item, i) => expect(item.position).toBe(i + 1));

      const faq = blocks.find((b) => (b as Record<string, unknown>)["@type"] === "FAQPage") as {
        mainEntity: { name: string; acceptedAnswer: { text: string } }[];
      };
      expect(faq.mainEntity.length).toBeGreaterThan(0);
      for (const q of faq.mainEntity) {
        expect(q.name.trim()).not.toBe("");
        expect(q.acceptedAnswer.text.trim()).not.toBe("");
      }

      // Maillage : un lien vers chaque autre page métier et vers l'accueil.
      for (const other of otherSolutionPages(solution.slug)) {
        expect(await page.locator(`main a[href="${other.slug}"]`).count(), other.slug).toBeGreaterThan(0);
      }
      expect(await page.locator('a[href="/"]').count()).toBeGreaterThan(0);
    });
  }

  test("/analyse-plu-parcelle : H1 validé et exemple réel 44109000BZ0070", async ({ page }) => {
    const response = await page.goto("/analyse-plu-parcelle");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(
      "Analyse PLU d'une parcelle : zonage, règles et constructibilité, sources à l'appui"
    );
    await expect(page.getByText("44109000BZ0070").first()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${BRAND_URL}/analyse-plu-parcelle`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  });

  test("l'accueil et /faisabilite-fonciere renvoient vers /analyse-plu-parcelle", async ({ page }) => {
    await page.goto("/");
    for (const solution of SOLUTION_PAGES) {
      expect(await page.locator(`main a[href="${solution.slug}"]`).count(), solution.slug).toBeGreaterThan(0);
    }
    await page.goto("/faisabilite-fonciere");
    expect(await page.locator('main a[href="/analyse-plu-parcelle"]').count()).toBeGreaterThan(0);
  });
});

test.describe("404 et redirections", () => {
  test("page inconnue → 404, page not-found, noindex", async ({ page }) => {
    const response = await page.goto("/page-inexistante-e2e");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("Cette parcelle du site n’existe pas.");
    const robots = await page.locator('meta[name="robots"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute("content") ?? "")
    );
    expect(robots.length).toBeGreaterThan(0);
    for (const content of robots) expect(content).toContain("noindex");
    await expect(page.getByRole("link", { name: "Retour à l’accueil" })).toHaveAttribute("href", "/");
  });

  test("/tarifs et /tarif → 308 vers /#tarifs", async ({ request }) => {
    for (const path of ["/tarifs", "/tarif"]) {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), path).toBe(308);
      expect(response.headers()["location"], path).toBe("/#tarifs");
    }
  });

  test("démo Fonciable : page et médias accessibles, lecteur et sous-titres chargés", async ({ page, request }) => {
    const response = await page.goto("/demonstration.html");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("De la parcelle au dossier, avec Fonciable");
    await expect(page.locator("body")).not.toContainText(/PLU[- ]IA/i);
    const video = page.locator("video");
    await expect(video).toHaveAttribute("src", "/demonstration/video.mp4");
    await expect(page.locator("video track")).toHaveAttribute("src", "/demonstration/captions.vtt");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.readyState)).toBeGreaterThanOrEqual(1);
    const duration = await video.evaluate((el: HTMLVideoElement) => el.duration);
    expect(duration).toBeGreaterThan(41);
    expect(duration).toBeLessThan(43);
    const partial = await request.get("/demonstration/video.mp4", { headers: { Range: "bytes=0-31" }, maxRedirects: 0 });
    expect(partial.status()).toBe(206);
    expect(partial.headers()["content-type"]).toContain("video/mp4");
    expect((await partial.body()).subarray(4, 8).toString()).toBe("ftyp");
    const captions = await request.get("/demonstration/captions.vtt", { maxRedirects: 0 });
    expect(captions.status()).toBe(200);
    expect(await captions.text()).toContain("WEBVTT");
    expect(await captions.text()).not.toMatch(/PLU[- ]IA/i);
    for (const path of ["vignette.jpg", "icone.png", "fonts/syne.woff2", "fonts/outfit.ttf"]) {
      const asset = await request.get(`/demonstration/${path}`, { maxRedirects: 0 });
      expect(asset.status(), path).toBe(200);
    }
  });
});
