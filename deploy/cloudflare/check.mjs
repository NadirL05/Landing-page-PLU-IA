import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const origin = new URL(process.argv[2] || "http://127.0.0.1:8787");
const build = JSON.parse(await readFile(new URL("./generated.json", import.meta.url), "utf8"));

async function get(path, init = {}) {
  return fetch(new URL(path, origin), { redirect: "manual", ...init });
}
function assertHeaders(response) {
  for (const [name, value] of Object.entries(build.globalHeaders)) {
    assert.equal(response.headers.get(name), value, `${response.url} ${name}`);
  }
}

for (const path of Object.keys(build.pages)) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  assertHeaders(response);
  const html = await response.text();
  assert.match(html, /<h1\b/, path);
  assert.match(html, /href="https:\/\/fonciable\.fr/, path);
  if (path === "/") {
    assert.match(html, /https:\/\/app\.fonciable\.fr/);
    const statics = [...new Set([...html.matchAll(/(?:href|src)="(\/_next\/static\/[^"]+)"/g)].map(m => m[1]))];
    assert(statics.length > 0);
    for (const asset of statics) {
      const assetResponse = await get(asset, { method: "HEAD" });
      assert.equal(assetResponse.status, 200, asset);
      assertHeaders(assetResponse);
    }
    assert.equal(response.headers.get("link"), build.homeHeaders.Link);
  }
}
for (const [path, mime] of [
  ["/robots.txt", "text/plain"], ["/sitemap.xml", "xml"], ["/llms.txt", "text/plain"],
  ["/.well-known/mcp/server-card.json", "application/json"],
  ["/.well-known/agent-skills/index.json", "application/json"],
  ["/opengraph-image", "image/png"], ["/demonstration.html", "text/html"],
]) {
  const response = await get(path, { method: "HEAD" });
  assert.equal(response.status, 200, path);
  assert(response.headers.get("content-type")?.includes(mime), path);
}
for (const path of ["/tarif", "/tarifs"]) {
  const response = await get(path + "?utm_source=recette");
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "/?utm_source=recette#tarifs");
}
const range = await get("/demonstration/video.mp4", { headers: { Range: "bytes=0-31" } });
assert.equal(range.status, 206);
assert.equal((await range.arrayBuffer()).byteLength, 32);
const missing = await get("/page-inconnue-nadir76");
assert.equal(missing.status, 404);
assertHeaders(missing);
assert.match(await missing.text(), /404|introuvable/i);
assert.equal((await get("/monitoring")).status, 404);
console.log(`Worker OK: ${Object.keys(build.pages).length} pages, homepage assets, all six headers, metadata, tariff redirects, MP4 range, 404.`);
