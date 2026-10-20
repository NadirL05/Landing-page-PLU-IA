#!/usr/bin/env node
/**
 * Soumet les URL du sitemap de fonciable.fr à IndexNow (Bing, Yandex, Seznam,
 * Naver… ; Google n'utilise pas IndexNow : pour lui, Search Console).
 *
 * À LANCER PAR NADIR, UNE FOIS LA PRODUCTION À JOUR (IMPLEMENTATION_PLAN E7) :
 *   node scripts/indexnow.mjs --dry-run   # affiche ce qui serait envoyé, aucun envoi
 *   node scripts/indexnow.mjs             # envoie réellement
 *
 * Options :
 *   --sitemap=<URL ou chemin>  source des URL (défaut : https://fonciable.fr/sitemap.xml) ;
 *                              un chemin local (ex. .next/server/app/sitemap.xml.body)
 *                              permet un essai sans aucun appel réseau avec --dry-run.
 *   --dry-run                  n'envoie rien à IndexNow.
 *
 * La clé est PUBLIQUE par conception (protocole IndexNow) : elle doit être
 * servie telle quelle à https://fonciable.fr/<clé>.txt (fichier public/<clé>.txt).
 * Ce n'est pas un secret ; aucune variable d'environnement n'est lue.
 * Aucune dépendance : Node 18+ (fetch natif).
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HOST = "fonciable.fr";
const ORIGIN = `https://${HOST}`;
const KEY = "beffcce7030c7b5a8ce480cf8bf02f16";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
/** Limite du protocole : 10 000 URL par requête. */
const MAX_URLS = 10_000;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sitemapArg = args.find((a) => a.startsWith("--sitemap="))?.slice("--sitemap=".length);
const sitemapSource = sitemapArg ?? `${ORIGIN}/sitemap.xml`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readSitemap(source) {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source, { headers: { "user-agent": "fonciable-indexnow-script" } });
    if (!response.ok) throw new Error(`Sitemap illisible (${response.status}) : ${source}`);
    return response.text();
  }
  return readFile(path.resolve(root, source), "utf8");
}

async function main() {
  // La clé servie doit être exactement celle du script, sinon IndexNow rejette (403).
  const keyFile = (await readFile(path.join(root, "public", `${KEY}.txt`), "utf8")).trim();
  if (keyFile !== KEY) throw new Error(`public/${KEY}.txt ne contient pas la clé attendue.`);

  const xml = await readSitemap(sitemapSource);
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) throw new Error("Aucune URL <loc> trouvée dans le sitemap.");
  const foreign = urls.filter((u) => new URL(u).host !== HOST);
  if (foreign.length) throw new Error(`URL hors de ${HOST} : ${foreign.join(", ")}`);
  if (urls.length > MAX_URLS) throw new Error(`Plus de ${MAX_URLS} URL : découper l'envoi.`);

  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  console.log(`${urls.length} URL lues depuis ${sitemapSource}`);
  for (const u of urls) console.log(`  ${u}`);

  if (dryRun) {
    console.log("--dry-run : rien n'a été envoyé. Charge utile :");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  // 200 : reçu ; 202 : reçu, clé en cours de vérification ; 4xx : voir la doc IndexNow.
  console.log(`IndexNow a répondu ${response.status} ${response.statusText}`);
  if (response.status >= 400) {
    console.error(await response.text());
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
