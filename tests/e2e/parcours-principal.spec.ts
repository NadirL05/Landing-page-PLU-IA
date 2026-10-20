import { SOLUTION_PAGES } from "../../config/solutions";
import { APP_URL, CALENDLY_URL, expect, readJsonLd, schemaTypes, test } from "./fixtures";

/**
 * Parcours principal (APP_FLOW §2, TESTING §3) :
 * arrivée sur « / » → compréhension (tarifs) → action (RDV Calendly,
 * souscription, ouverture de l'app). Les sorties externes sont simulées.
 */

test.describe("Parcours principal — accueil", () => {
  test("§3.1 / répond 200, H1 visible, titre contenant Fonciable", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/Fonciable/);
  });

  test("§3.2 en-têtes de sécurité présents", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response!.headers();
    expect(headers["content-security-policy"]).toBeTruthy();
    expect(headers["strict-transport-security"]).toContain("max-age=");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("§3.3 JSON-LD : SoftwareApplication avec Starter 199 et Pro 599", async ({ page }) => {
    await page.goto("/");
    const blocks = await readJsonLd(page);
    expect(schemaTypes(blocks)).toContain("SoftwareApplication");
    const app = blocks.find(
      (b) => (b as Record<string, unknown>)["@type"] === "SoftwareApplication"
    ) as { offers: { name: string; price?: string }[] };
    const prices = Object.fromEntries(app.offers.map((o) => [o.name, o.price]));
    expect(prices.Starter).toBe("199");
    expect(prices.Pro).toBe("599");
  });

  test("§3.4 sans consentement : aucun traceur GA ni Meta dans le DOM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
    await expect(page.locator('script[src*="connect.facebook.net"]')).toHaveCount(0);
  });

  test("§3.5 ancre Tarifs : section visible, 3 offres, pas de Découverte", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Navigation principale", exact: true })
      .getByRole("link", { name: "Tarifs" })
      .click();
    await expect(page).toHaveURL(/#tarifs$/);
    const tarifs = page.locator("#tarifs");
    await expect(tarifs).toBeInViewport();
    for (const name of ["Starter", "Pro", "Entreprise"]) {
      await expect(tarifs.getByText(name, { exact: true })).toHaveCount(1);
    }
    await expect(tarifs.getByText("Découverte", { exact: true })).toHaveCount(0);
    // Deux souscriptions (Starter, Pro) + un contact (Entreprise).
    const subscribe = tarifs.getByRole("link", { name: "Souscrire" });
    await expect(subscribe).toHaveCount(2);
    await expect(subscribe.nth(0)).toHaveAttribute("href", `${APP_URL}/checkout/starter`);
    await expect(subscribe.nth(1)).toHaveAttribute("href", `${APP_URL}/checkout/pro`);
    await expect(tarifs.getByRole("link", { name: "Nous contacter" })).toHaveAttribute("href", CALENDLY_URL);
  });

  test("§3.6 CTA hero « Prendre rendez-vous » ouvre Calendly dans un nouvel onglet", async ({ page, context, stubbed }) => {
    await page.goto("/");
    const cta = page.getByRole("main").getByRole("link", { name: /Prendre rendez-vous/ }).first();
    await expect(cta).toHaveAttribute("href", CALENDLY_URL);
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);
    const [popup] = await Promise.all([context.waitForEvent("page"), cta.click()]);
    await popup.waitForLoadState();
    expect(popup.url()).toBe(CALENDLY_URL);
    expect(stubbed).toContain(CALENDLY_URL);
    // L'onglet d'origine reste sur la landing.
    expect(new URL(page.url()).pathname).toBe("/");
  });

  test("§3.7 « Souscrire » Pro mène à app.fonciable.fr/checkout/pro", async ({ page, stubbed }) => {
    await page.goto("/#tarifs");
    const proCard = page
      .locator("#tarifs")
      .locator("div.relative.flex.h-full.flex-col")
      .filter({ has: page.getByText("Pro", { exact: true }) });
    await expect(proCard).toHaveCount(1);
    await proCard.getByRole("link", { name: "Souscrire" }).click();
    await expect(page).toHaveURL(`${APP_URL}/checkout/pro`);
    expect(stubbed).toContain(`${APP_URL}/checkout/pro`);
  });

  test("§3.8 « Ouvrir l'application » (en-tête) mène au tableau de bord", async ({ page, stubbed }) => {
    await page.goto("/");
    await page.getByRole("banner").getByRole("link", { name: /Ouvrir l.application/ }).click();
    await expect(page).toHaveURL(`${APP_URL}/dashboard`);
    expect(stubbed).toContain(`${APP_URL}/dashboard`);
  });
});

test.describe("Parcours principal — mobile 390×844", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("§3.9 menu mobile : liens Solutions et application", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const panel = page.locator("#mobile-nav-panel");
    await expect(panel).toBeVisible();
    for (const solution of SOLUTION_PAGES) {
      await expect(panel.getByRole("link", { name: solution.navLabel, exact: true })).toHaveAttribute("href", solution.slug);
    }
    await expect(panel.getByRole("link", { name: /Ouvrir l.application/ })).toHaveAttribute("href", `${APP_URL}/dashboard`);
    await page.getByRole("button", { name: "Fermer le menu" }).click();
    await expect(panel).toHaveCount(0);
  });
});

test.describe("Parcours principal — prefers-reduced-motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("§3.10 aucune erreur JS, contenu visible", async ({ page, pageErrors }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      // Les échecs de chargement viennent des requêtes tierces bloquées par la fixture.
      if (msg.type() === "error" && !/Failed to load resource/.test(msg.text())) {
        consoleErrors.push(msg.text());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
    await page.locator("#tarifs").scrollIntoViewIfNeeded();
    await expect(page.locator("#tarifs").getByText("Starter", { exact: true })).toBeVisible();
    expect(pageErrors.map((e) => e.message)).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
