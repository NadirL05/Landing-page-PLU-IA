import type { NextConfig } from "next";

// Landing statique (App Router) + scène 3D React Three Fiber en page d'accueil.
// - script-src: 'unsafe-inline' requis par le bootstrap/streaming inline de Next.js
//   (self.__next_f.push(...)) — pas de nonce ici (pas de middleware sur ce repo).
//   'unsafe-eval' NON nécessaire : three.js/R3F compilent leurs shaders côté GPU
//   (WebGL), pas via l'eval JS. Vérifié : next dev utilise des sourcemaps eval
//   (violations attendues en dev), mais next build/start (prod) n'en a pas besoin.
// - worker-src blob:: aucun Worker/WASM détecté dans ce repo à ce jour, gardé par
//   précaution pour R3F/three.js (inerte si inutilisé).
// - style-src 'unsafe-inline': next/font injecte du CSS inline, + <style> inline
//   dans app/layout.tsx (fallback noscript).
// - connect-src/img-src 'self' + analytics uniquement : Stripe/Calendly sont de
//   simples liens <a> (navigation, pas de requête interceptée par CSP), donc
//   pas besoin de les allowlister. GoogleTag et MetaPixel chargent un script
//   externe (gtag.js / fbevents.js) — sans ces domaines en script-src, la CSP
//   les bloquait silencieusement (GoogleTag n'ayant encore jamais eu d'ID
//   configuré, ce trou n'avait encore jamais été exercé en prod).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://cdn.consentmanager.net https://*.delivery.consentmanager.net",
  "style-src 'self' 'unsafe-inline'",
  // *.delivery.consentmanager.net : pixel de preuve de consentement
  // (/delivery/info/) — bloqué silencieusement sans ce wildcard, sur chaque
  // page vue, avant toute interaction (trouvé via audit SEO cross-repo le
  // 21/08, confirmé en navigateur réel sur hector.agentimpact.fr — même CSP
  // copiée sur les 3 repos, même bug partout).
  "img-src 'self' data: https://www.facebook.com https://cdn.consentmanager.net https://*.delivery.consentmanager.net",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://www.facebook.com https://cdn.consentmanager.net https://*.delivery.consentmanager.net https://consentmanager.mgr.consensu.org",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/mcp/server-card.json>; rel="service-desc"',
              '</sitemap.xml>; rel="sitemap"',
            ].join(", "),
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
