import build from "./generated.json";

const pageFiles = new Set([...Object.values(build.pages), "/404.html", "/500.html", "/_not-found.html", "/_global-error.html"]);

function decorate(response, pathname) {
  const result = new Response(response.body, response);
  for (const [name, value] of Object.entries(build.globalHeaders)) result.headers.set(name, value);
  if (pathname === "/") {
    for (const [name, value] of Object.entries(build.homeHeaders)) result.headers.set(name, value);
  }
  return result;
}

async function sentryEnvelope(request, url) {
  const { organisation, region, project } = build.sentry;
  if (request.method !== "POST" || url.searchParams.get("o") !== organisation ||
      url.searchParams.get("p") !== project || (url.searchParams.get("r") || "") !== region) {
    return null;
  }
  const host = `o${organisation}.ingest${region ? "." + region : ""}.sentry.io`;
  const headers = new Headers();
  const type = request.headers.get("content-type");
  if (type) headers.set("content-type", type);
  // Do not forward site cookies, inbound credentials, or a caller-provided destination.
  return fetch(`https://${host}/api/${project}/envelope/?hsts=0`, {
    method: "POST", headers, body: request.body, redirect: "manual",
  });
}

// The local asset binding can return a full MP4 for a byte-range request.
// Both public videos fit in a single Workers asset. Preserve native browser seek.
async function videoRange(request, response) {
  const headers = new Headers(response.headers);
  headers.set("accept-ranges", "bytes");
  const value = request.headers.get("range");
  const range = value?.match(/^bytes=(\d*)-(\d*)$/);
  const validator = request.headers.get("if-range");
  if (request.method !== "GET" || response.status !== 200 || !range ||
      (!range[1] && !range[2]) || (validator && validator !== headers.get("etag") && validator !== headers.get("last-modified"))) {
    return new Response(response.body, { status: response.status, headers });
  }
  const bytes = await response.blob();
  const size = bytes.size;
  const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
  const end = range[1] && range[2] ? Math.min(size - 1, Number(range[2])) : size - 1;
  if (start > end || start >= size) {
    headers.set("content-range", `bytes */${size}`);
    headers.delete("content-length");
    return new Response(null, { status: 416, headers });
  }
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  headers.set("content-length", String(end - start + 1));
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

async function serve(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path.length > 1 && path.endsWith("/")) {
    url.pathname = path.replace(/\/+$/, "");
    return Response.redirect(url.href, 308);
  }
  // AWS currently preserves the request host on all three public aliases.
  if (path === "/tarif" || path === "/tarifs") {
    url.pathname = "/";
    url.hash = "tarifs";
    return new Response(null, { status: 308, headers: { Location: url.pathname + url.search + url.hash } });
  }
  if (path === "/monitoring") {
    const response = await sentryEnvelope(request, url);
    if (response) return response;
  }
  if (!["GET", "HEAD"].includes(request.method)) {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const originalMethod = request.method;
  const getAsset = (pathname) => {
    const target = new URL(request.url);
    target.pathname = pathname;
    return env.ASSETS.fetch(new Request(target.href, request));
  };
  if (!pageFiles.has(path)) {
    const page = Object.hasOwn(build.pages, path) ? build.pages[path] : path;
    const response = await getAsset(page);
    if (response.status !== 404) {
      const result = new Response(response.body, response);
      if (path === "/opengraph-image") result.headers.set("content-type", "image/png");
      if (path.startsWith("/_next/static/")) result.headers.set("cache-control", "public, max-age=31536000, immutable");
      if (path.endsWith(".mp4")) return videoRange(request, result);
      return result;
    }
  }
  const fallback = await getAsset("/404.html");
  return new Response(originalMethod === "HEAD" ? null : fallback.body, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
  });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = decorate(await serve(request, env), url.pathname);
    if (url.hostname.endsWith(".workers.dev")) response.headers.set("x-robots-tag", "noindex");
    return response;
  },
};

export default worker;
