import Script from "next/script";

/**
 * Loads gtag.js only when an ID is actually configured — safe to ship
 * before the GA4 property / Google Ads account exist. Once created, set
 * NEXT_PUBLIC_GA_MEASUREMENT_ID (GA4, "G-XXXXXXX") and/or
 * NEXT_PUBLIC_GOOGLE_ADS_ID ("AW-XXXXXXXXX") in Vercel env vars —
 * no code change needed.
 *
 * .trim() is load-bearing, not defensive dressing: a Vercel env var
 * pasted with a trailing newline (happened on NEXT_PUBLIC_GA_MEASUREMENT_ID,
 * 21/08) lands verbatim inside the single-quoted `gtag('config', '...')`
 * string below — an unescaped newline inside a JS string literal is a
 * SyntaxError, which broke this component's <Script> tag on every page
 * load in prod (silently: no CSP violation, no network error, gtag.js
 * loaded fine, only `window.gtag` staying undefined gave it away).
 */
export function GoogleTag() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  const targets = [gaId, adsId].filter((id): id is string => Boolean(id));

  if (targets.length === 0) return null;

  const primary = targets[0];

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primary}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${targets.map((id) => `gtag('config', '${id}');`).join("\n          ")}
        `}
      </Script>
    </>
  );
}
