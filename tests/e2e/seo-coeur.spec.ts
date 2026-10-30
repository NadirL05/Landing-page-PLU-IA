import { ALL_EDITORIAL_PAGES, GUIDE_PAGES, ZONE_PAGES } from "../../config/solutions";
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
    await expect(page.locator("h1")).toHaveText("Bilan promoteur en ligne : la méthode, les postes et un modèle Excel");
    await expect(page).toHaveTitle("Bilan promoteur Excel gratuit et bilan en ligne | Fonciable");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${BRAND_URL}/bilan-promoteur`);
    const link = page.locator('main a[href="/modeles/bilan-promoteur-exemple-fictif.xlsx"]');
    await expect(link).toHaveCount(1);
    await expect(page.getByText("Exemple fictif, modèle Excel")).toBeVisible();
    // Section dédiée au téléchargement (requête « bilan promoteur excel ») :
    // H2 visible, lien dans la section, renvoi vers l'application.
    const section = page.locator("section#modele-excel");
    await expect(section.getByRole("heading", { level: 2, name: "Télécharger le modèle de bilan promoteur Excel" })).toBeVisible();
    await expect(section.locator('a[href="/modeles/bilan-promoteur-exemple-fictif.xlsx"]')).toHaveAttribute("download", "");
    await expect(section.locator('a[href="https://app.fonciable.fr"]')).toHaveCount(1);
    await expect(page.locator("#faq").getByText("Comment utiliser le modèle de bilan promoteur Excel ?")).toBeVisible();

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

/**
 * Secteurs UA, UB, UC (30/10/2026) : conventions locales, pas des catégories
 * du code. Chaque page cite R151-18 sur Légifrance, renvoie au Géoportail de
 * l'Urbanisme et le dit explicitement ; fil d'Ariane accueil → Zonage PLU →
 * secteur ; liens vers /zonage-plu/zone-u et les deux autres secteurs ; et
 * /zonage-plu/zone-u relie les trois.
 */
test.describe("Zones UA, UB, UC — secteurs locaux de la zone U", () => {
  const sectors = [
    { path: "/zonage-plu/zone-ua", h1: "Zone UA du PLU : un secteur local, souvent le centre ancien" },
    { path: "/zonage-plu/zone-ub", h1: "Zone UB du PLU : définition, exemples réels et règles à lire" },
    { path: "/zonage-plu/zone-uc", h1: "Zone UC du PLU : un nom, des tissus urbains très différents" },
  ];
  for (const sector of sectors) {
    test(`${sector.path} : R151-18, Géoportail, fil d'Ariane, liens entre secteurs, exemples réels`, async ({ page }) => {
      const others = sectors.filter((s) => s.path !== sector.path).map((s) => s.path);
      const blocks = await checkGuide(page, sector.path, sector.h1, [
        "/zonage-plu",
        "/zonage-plu/zone-u",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720615",
        "https://www.geoportail-urbanisme.gouv.fr/",
        ...others,
      ]);
      const breadcrumb = blocks.find((b) => (b as Record<string, unknown>)["@type"] === "BreadcrumbList") as {
        itemListElement: { position: number; item: string }[];
      };
      expect(breadcrumb.itemListElement.map((i) => i.item)).toEqual([
        `${BRAND_URL}/`,
        `${BRAND_URL}/zonage-plu`,
        `${BRAND_URL}${sector.path}`,
      ]);
      const main = page.locator("main");
      // Le caractère local du secteur est dit en toutes lettres.
      await expect(main.getByText(/(ne figure nulle part dans le code|ne la définit pas|n'est donc ni une catégorie nationale)/).first()).toBeVisible();
      await expect(main.getByText("Exemples réels · Géoportail de l'Urbanisme · relevé du 30/10/2026")).toBeVisible();
      const words = (await main.innerText()).split(/\s+/).filter(Boolean).length;
      expect(words, `${sector.path} mots dans <main>`).toBeGreaterThan(1200);
    });
  }

  test("/zonage-plu/zone-u et /zonage-plu relient les trois secteurs", async ({ page }) => {
    for (const source of ["/zonage-plu/zone-u", "/zonage-plu"]) {
      await page.goto(source);
      for (const sector of sectors) {
        expect(await page.locator(`main a[href="${sector.path}"]`).count(), `${source} → ${sector.path}`).toBeGreaterThan(0);
      }
    }
  });
});

test.describe("E6 — maillage et découverte", () => {
  test("l'accueil et le pied de page relient chaque guide", async ({ page }) => {
    await page.goto("/");
    for (const guide of GUIDE_PAGES) {
      expect(await page.locator(`main a[href="${guide.slug}"]`).count(), guide.slug).toBeGreaterThan(0);
      expect(await page.locator(`footer a[href="${guide.slug}"]`).count(), guide.slug).toBeGreaterThan(0);
    }
  });

  test("chaque page de zone est reliée depuis /zonage-plu, chaque guide depuis au moins une autre page éditoriale", async ({ page }) => {
    await page.goto("/zonage-plu");
    for (const zone of ZONE_PAGES) {
      expect(await page.locator(`main a[href="${zone.slug}"]`).count(), zone.slug).toBeGreaterThan(0);
    }
    const inbound = new Map<string, number>();
    for (const source of ALL_EDITORIAL_PAGES) {
      await page.goto(source.slug);
      const hrefs = await page.locator("main a[href^='/']").evaluateAll((els) => els.map((el) => el.getAttribute("href")));
      for (const href of hrefs) if (href && href !== source.slug) inbound.set(href, (inbound.get(href) ?? 0) + 1);
    }
    for (const target of ALL_EDITORIAL_PAGES) {
      expect(inbound.get(target.slug) ?? 0, target.slug).toBeGreaterThan(0);
    }
  });

  test("llms.txt liste chaque page éditoriale et le modèle XLSX", async ({ request }) => {
    const text = await (await request.get("/llms.txt")).text();
    for (const p of ALL_EDITORIAL_PAGES) expect(text, p.slug).toContain(`(${BRAND_URL}${p.slug})`);
    expect(text).toContain(`${BRAND_URL}/modeles/bilan-promoteur-exemple-fictif.xlsx`);
  });

  test("agent-skills : identifiant fonciable-context, plus d'ancien nom", async ({ request }) => {
    const response = await request.get("/.well-known/agent-skills/index.json");
    expect(response.status()).toBe(200);
    const body = await response.text();
    const index = JSON.parse(body) as { skills: { name: string; url: string }[] };
    expect(index.skills.map((s) => s.name)).toEqual(["fonciable-context"]);
    expect(index.skills[0].url).toBe(`${BRAND_URL}/llms.txt`);
    expect(body).not.toMatch(/plu[- ]ia/i);
  });

  test("aucun contenu principal ne mentionne l'ancien nom ; pas de tiret cadratin sur les pages § E", async ({ page }) => {
    for (const p of ALL_EDITORIAL_PAGES) {
      await page.goto(p.slug);
      const text = await page.locator("main").innerText();
      expect(text, p.slug).not.toMatch(/PLU[- ]IA/i);
    }
    // Pages rédigées ou réécrites en § E : aucun tiret cadratin.
    for (const slug of ["/bilan-promoteur", ...GUIDE_PAGES.map((g) => g.slug), ...ZONE_PAGES.map((z) => z.slug)]) {
      await page.goto(slug);
      expect(await page.locator("main").innerText(), slug).not.toContain("—");
    }
  });
});

test.describe("E7 — IndexNow", () => {
  test("la clé publique est servie à la racine", async ({ request }) => {
    const key = "beffcce7030c7b5a8ce480cf8bf02f16";
    const response = await request.get(`/${key}.txt`);
    expect(response.status()).toBe(200);
    expect((await response.text()).trim()).toBe(key);
  });
});

/**
 * § J — articles de fond (décision de Nadir du 26/10/2026). En plus des
 * contrôles d'un guide : JSON-LD Article (headline = H1, dates), lien vers
 * /analyse-plu-parcelle, et au moins deux pages existantes qui pointent vers
 * l'article dans leur <main>.
 */
async function checkArticle(
  page: import("@playwright/test").Page,
  path: string,
  h1: string,
  links: readonly string[],
  inboundFrom: readonly string[],
) {
  const blocks = await checkGuide(page, path, h1, ["/analyse-plu-parcelle", ...links]);
  expect(schemaTypes(blocks)).toContain("Article");
  const article = blocks.find((b) => (b as Record<string, unknown>)["@type"] === "Article") as {
    headline: string;
    datePublished: string;
    dateModified: string;
  };
  expect(article.headline).toBe(h1);
  expect(article.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(article.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(inboundFrom.length).toBeGreaterThanOrEqual(2);
  for (const source of inboundFrom) {
    await page.goto(source);
    expect(await page.locator(`main a[href="${path}"]`).count(), `${source} → ${path}`).toBeGreaterThan(0);
  }
  // Revient sur l'article pour les contrôles propres à chaque test.
  await page.goto(path);
}

test.describe("J1 — /surface-de-plancher", () => {
  test("H1, Article, articles L111-14 et R111-22, liens entrants", async ({ page }) => {
    await checkArticle(
      page,
      "/surface-de-plancher",
      "Calcul de la surface de plancher : méthode et exemple",
      [
        "/charge-fonciere",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031210207",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031721274",
        "https://www.service-public.gouv.fr/particuliers/vosdroits/F2868",
      ],
      ["/bilan-promoteur", "/charge-fonciere", "/faisabilite-fonciere"],
    );
    await expect(page.getByText("Exemple fictif, calcul de principe")).toBeVisible();
  });
});

test.describe("J2 — /emprise-au-sol", () => {
  test("H1, Article, articles R420-1 et R151-39, liens croisés avec la surface de plancher", async ({ page }) => {
    await checkArticle(
      page,
      "/emprise-au-sol",
      "Emprise au sol et coefficient d'emprise au sol (CES)",
      [
        "/surface-de-plancher",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028678466",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031720561",
        "https://www.service-public.gouv.fr/particuliers/vosdroits/F2868",
      ],
      ["/surface-de-plancher", "/zonage-plu/zone-u", "/terrain-constructible"],
    );
    await expect(page.getByText("Exemple fictif, calcul de principe")).toBeVisible();
  });
});

test.describe("J3 — /dent-creuse", () => {
  test("H1, Article, Géoconfluences et art. L101-2-1, lien vers la prospection", async ({ page }) => {
    await checkArticle(
      page,
      "/dent-creuse",
      "Dent creuse : définition, densification et repérage",
      [
        "/prospection-fonciere",
        "/division-parcellaire",
        "https://geoconfluences.ens-lyon.fr/glossaire/dent-creuse",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043967077",
      ],
      ["/prospection-fonciere", "/division-parcellaire", "/zonage-plu"],
    );
    // La limite produit est dite : le moteur ne qualifie pas une parcelle de « dent creuse ».
    await expect(page.locator("main").getByText(/ne qualifie pas une parcelle de « dent creuse »/)).toBeVisible();
  });
});

test.describe("J4 — /certificat-urbanisme", () => {
  test("H1, Article, art. L410-1 et R*410-x, service-public F1633, lien depuis la méthode terrain constructible", async ({ page }) => {
    await checkArticle(
      page,
      "/certificat-urbanisme",
      "Certificat d'urbanisme : CU d'information ou opérationnel",
      [
        "/terrain-constructible",
        "/division-parcellaire",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037667619",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006818970",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031764615",
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006818991",
        "https://www.service-public.gouv.fr/particuliers/vosdroits/F1633",
      ],
      ["/terrain-constructible", "/division-parcellaire", "/analyse-plu-parcelle"],
    );
    await expect(page.locator("main").getByText("Fonciable ne délivre ni certificat d'urbanisme, ni autorisation, et ses résultats ne figent aucune règle.")).toBeVisible();
  });
});

test.describe("J5 — /prix-terrain-constructible", () => {
  test("H1, Article, sources DVF, lien croisé avec la charge foncière", async ({ page }) => {
    await checkArticle(
      page,
      "/prix-terrain-constructible",
      "Prix d'un terrain constructible : comment l'estimer",
      [
        "/charge-fonciere",
        "/terrain-constructible",
        "https://www.service-public.gouv.fr/particuliers/vosdroits/F16832",
        "https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/",
      ],
      ["/charge-fonciere", "/bilan-promoteur", "/terrain-constructible"],
    );
    await expect(page.locator("main").getByText(/Fonciable n'estime pas le prix de marché d'un terrain à bâtir/)).toBeVisible();
    // Lien croisé dans le corps de /charge-fonciere, pas seulement dans « À lire aussi ».
    await page.goto("/charge-fonciere");
    expect(await page.locator('section[aria-labelledby="guide-heading"] a[href="/prix-terrain-constructible"]').count()).toBeGreaterThan(0);
  });
});

/**
 * § K — page comparative (mission SEO/GEO validée par Nadir le 27/10/2026).
 * Tableau HTML réel, lien officiel de chaque outil, transparence de
 * l'éditeur et dates de consultation visibles.
 */
test.describe("K1 — /comparatif-outils-analyse-parcelle", () => {
  test("H1, Article, tableau à 6 outils, liens officiels, éditeur déclaré", async ({ page }) => {
    const officialSites = [
      "https://fonciable.fr/",
      "https://www.france-cadastre.fr/",
      "https://www.geoportail-urbanisme.gouv.fr/",
      "https://www.kelfoncier.com/",
      "https://www.landup.fr/",
      "https://terranota.fr/",
    ];
    await checkArticle(
      page,
      "/comparatif-outils-analyse-parcelle",
      "Outils d'analyse de parcelle et de PLU : comparatif",
      ["/terrain-constructible", "https://www.geoportail-urbanisme.gouv.fr/infos-legales/", "https://terranota.fr/nos-offres/"],
      ["/analyse-plu-parcelle", "/terrain-constructible", "/zonage-plu"],
    );
    const table = page.locator('section[aria-labelledby="comparatif-heading"] table');
    await expect(table).toHaveCount(1);
    await expect(table.locator("thead th")).toHaveCount(5);
    await expect(table.locator("tbody tr")).toHaveCount(officialSites.length);
    for (const href of officialSites) {
      expect(await table.locator(`tbody th a[href="${href}"]`).count(), href).toBe(1);
    }
    // Transparence : l'éditeur de Fonciable publie la page, et les dates de consultation sont dites.
    await expect(page.locator("main").getByText(/publié par l'éditeur de Fonciable/).first()).toBeVisible();
    await expect(table.locator("caption")).toContainText("27 octobre 2026");
    await expect(page.locator("main").getByText("Non indiqué sur son site ; essai gratuit de 48 h proposé")).toBeVisible();
  });
});
