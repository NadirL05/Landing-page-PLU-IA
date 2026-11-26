import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { sentry } from "../../config/sentry-public.mjs";

const manifest = JSON.parse(await readFile(".next/routes-manifest.json", "utf8"));
function headersFor(source) {
  const group = manifest.headers.find((entry) => entry.source === source);
  if (!group) throw new Error(`Missing Next.js header rule: ${source}`);
  return Object.fromEntries(group.headers.map(({ key, value }) => [key, value]));
}

async function listHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(join("out", directory), { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

const pages = {};
const exportedHtml = await listHtmlFiles("");
for (const file of exportedHtml) {
  if (["404.html", "500.html", "_not-found.html", "_global-error.html"].includes(file)) continue;
  try {
    await readFile(join("public", file));
    continue; // e.g. demonstration.html is a literal public URL.
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const route = file === "index.html" ? "/" : "/" + file.slice(0, -5);
  pages[route] = "/" + file;
}
if (!pages["/"] || !pages["/analyse-plu-parcelle"] || !exportedHtml.includes("404.html")) {
  throw new Error("Incomplete public page export");
}

await writeFile(new URL("./generated.json", import.meta.url), JSON.stringify({
  pages, globalHeaders: headersFor("/:path*"), homeHeaders: headersFor("/"),
  sentry,
}, null, 2) + "\n");
console.log(`Prepared ${Object.keys(pages).length} routes for Cloudflare.`);
