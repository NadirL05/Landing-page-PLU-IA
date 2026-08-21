import Script from "next/script";

/**
 * Meta Pixel — même pattern que GoogleTag : no-op tant que
 * NEXT_PUBLIC_META_PIXEL_ID n'est pas configuré côté Vercel. PageView se
 * déclenche automatiquement à chaque chargement ; les events custom
 * (start_free_analysis, start_checkout…) sont relayés par trackEvent()
 * dans lib/analytics.ts, qui pousse déjà vers gtag — fbq est ajouté au
 * même endroit pour ne pas dupliquer l'instrumentation sur chaque CTA.
 *
 * data-cmp-ab="1" : exclut ce script du "automatic blocking" de
 * consentmanager.net (leur doc : "add data-cmp-ab=1 to the script to
 * prevent it from being blocked" — même pattern que pour un tag GTM).
 * Sans ça, leur bloqueur DOM continue d'intercepter et de tuer le
 * <script src="connect.facebook.net/.../fbevents.js"> créé dynamiquement
 * par le snippet ci-dessous, MÊME après consentement — confirmé en prod le
 * 21/08 (fbq.callMethod restait undefined indéfiniment malgré ConsentGate
 * qui autorisait correctement le montage). On gère déjà nous-mêmes le
 * consentement via ConsentGate (Google Consent Mode v2 / dataLayer), donc
 * leur double-blocage est redondant et cassé ici — pas nécessaire.
 */
export function MetaPixel() {
  // .trim() : voir google-tag.tsx — un env var Vercel collé avec un
  // retour à la ligne casse la string JS inline en dur, silencieusement.
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive" data-cmp-ab="1">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
