#!/usr/bin/env node
/**
 * Contrôle SEO du site construit (audit SEO/GEO du 26/10/2026).
 *
 * Usage : `next start` lancé, puis
 *   node scripts/seo-check.mjs [--base=http://127.0.0.1:3108] [--origin=https://fonciable.fr]
 *
 * Lit /sitemap.xml sur --base, réécrit chaque <loc> de --origin vers --base,
 * puis échoue (code 1) si une règle est violée :
 *  - sitemap.xml en 200 et non vide ;
 *  - chaque URL du sitemap : 200 sans redirection, une seule canonical, égale
 *    à son <loc>, pas de noindex ;
 *  - exactement un H1 ;
 *  - <title> et meta description présents et uniques sur l'ensemble ;
 *  - chaque bloc JSON-LD parsable ;
 *  - aucun lien interne (relatif ou vers --origin) vers une 404, une erreur ou
 *    une redirection ;
 *  - une URL inexistante : 404, une seule balise robots noindex, sans canonical.
 *
 * Node 18+, sans dépendance. Analyse du HTML brut servi (pas de rendu JS).
 */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.join("=") || "true"];
  }),
);
const BASE = (args.base ?? "http://127.0.0.1:3108").replace(/\/$/, "");
const ORIGIN = (args.origin ?? "https://fonciable.fr").replace(/\/$/, "");
const WAIT_MS = Number(args.wait ?? 60_000);

const errors = [];
const fail = (where, msg) => errors.push(`${where} : ${msg}`);

const toBase = (url) => (url.startsWith(ORIGIN) ? BASE + url.slice(ORIGIN.length) : url);
const normalize = (url) => {
  const u = new URL(url);
  return u.pathname === "/" && !u.search ? u.origin : u.href;
};
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Attributs d'une balise (`<meta name="x" content="y"/>`). */
function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)) out[m[1].toLowerCase()] = decode(m[2]);
  return out;
}
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0]));

async function get(url) {
  return fetch(url, { redirect: "manual", headers: { "user-agent": "fonciable-seo-check" } });
}

async function waitForServer() {
  const start = Date.now();
  for (;;) {
    try {
      await get(`${BASE}/`);
      return;
    } catch {
      if (Date.now() - start > WAIT_MS) throw new Error(`Serveur injoignable sur ${BASE}`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

async function main() {
  await waitForServer();

  // 1. Sitemap
  const sm = await get(`${BASE}/sitemap.xml`);
  if (sm.status !== 200) {
    fail("/sitemap.xml", `statut ${sm.status}`);
    return;
  }
  const locs = [...(await sm.text()).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail("/sitemap.xml", "aucune <loc>");

  const titles = new Map();
  const descriptions = new Map();
  const internalLinks = new Map(); // URL (base) -> première page source

  // 2. Pages du sitemap
  for (const loc of locs) {
    const res = await get(toBase(loc));
    if (res.status !== 200) {
      fail(loc, `statut ${res.status}${res.headers.get("location") ? ` → ${res.headers.get("location")}` : ""}`);
      continue;
    }
    const html = await res.text();
    const head = html.split("</head>")[0];

    const canon = tags(head, "link").filter((t) => t.rel === "canonical");
    if (canon.length !== 1) fail(loc, `${canon.length} canonical`);
    else if (normalize(canon[0].href) !== normalize(loc)) fail(loc, `canonical ${canon[0].href} ≠ sitemap`);

    const robots = tags(head, "meta").filter((t) => t.name === "robots" || t.name === "googlebot");
    if (robots.some((t) => /noindex/i.test(t.content ?? ""))) fail(loc, "noindex sur une URL du sitemap");

    const h1 = (html.match(/<h1\b/gi) ?? []).length;
    if (h1 !== 1) fail(loc, `${h1} H1`);

    const title = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim());
    const desc = tags(head, "meta").find((t) => t.name === "description")?.content?.trim() ?? "";
    if (!title) fail(loc, "title absent");
    if (!desc) fail(loc, "meta description absente");
    if (title && titles.has(title)) fail(loc, `title identique à ${titles.get(title)}`);
    if (desc && descriptions.has(desc)) fail(loc, `meta description identique à ${descriptions.get(desc)}`);
    titles.set(title, loc);
    descriptions.set(desc, loc);

    for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(m[1]);
      } catch (e) {
        fail(loc, `JSON-LD non parsable (${e.message})`);
      }
    }

    for (const a of tags(html, "a")) {
      const href = a.href;
      if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
      let target;
      if (href.startsWith("/") && !href.startsWith("//")) target = BASE + href;
      else if (href.startsWith(ORIGIN + "/") || href === ORIGIN) target = toBase(href);
      else continue; // externe (dont app.fonciable.fr)
      target = target.split("#")[0];
      if (!internalLinks.has(target)) internalLinks.set(target, loc);
    }
  }

  // 3. Liens internes : ni 404, ni erreur, ni redirection
  for (const [target, from] of internalLinks) {
    const res = await get(target);
    if (res.status !== 200) {
      const loc = res.headers.get("location");
      fail(from, `lien interne ${target.replace(BASE, "") || "/"} → ${res.status}${loc ? ` (${loc})` : ""}`);
    }
    await res.body?.cancel();
  }

  // 4. Page 404
  const nf = await get(`${BASE}/seo-check-page-inexistante`);
  const nfHead = (await nf.text()).split("</head>")[0];
  if (nf.status !== 404) fail("404", `statut ${nf.status}`);
  const nfRobots = tags(nfHead, "meta").filter((t) => t.name === "robots");
  if (nfRobots.length !== 1 || !/noindex/i.test(nfRobots[0].content ?? ""))
    fail("404", `attendu une seule balise robots noindex, trouvé ${nfRobots.map((t) => t.content).join(" | ") || "aucune"}`);
  if (tags(nfHead, "link").some((t) => t.rel === "canonical")) fail("404", "canonical présente");

  console.log(`seo-check : ${locs.length} URL du sitemap, ${internalLinks.size} liens internes distincts vérifiés.`);
}

main()
  .catch((e) => fail("seo-check", e.message))
  .finally(() => {
    if (errors.length) {
      console.error(`seo-check : ${errors.length} erreur(s)`);
      for (const e of errors) console.error(`  ✗ ${e}`);
      process.exit(1);
    }
    console.log("seo-check : OK");
  });
