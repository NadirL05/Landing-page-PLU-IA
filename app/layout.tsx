import type { Metadata } from "next";
import { Instrument_Sans, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { ConsentGate } from "@/components/analytics/consent-gate";
import { GoogleTag } from "@/components/analytics/google-tag";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import "./globals.css";

const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-instrument" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jakarta" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

const SITE_URL = "https://plu-ia.agentimpact.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PLU IA — Analyse de parcelle, urbanisme et bilan promoteur",
    template: "%s | PLU IA",
  },
  description:
    "PLU IA croise cadastre IGN, documents d'urbanisme (GPU), transactions DVF et risques Géorisques pour produire une estimation d'aide à la décision : zonage, enveloppe constructible, comparables et bilan promoteur.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "PLU IA",
    title: "PLU IA — Analyse de parcelle, urbanisme et bilan promoteur",
    description:
      "Cadastre IGN, GPU, DVF et Géorisques croisés pour une enveloppe constructible et un bilan promoteur, à la parcelle.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "PLU IA — Analyse de parcelle, urbanisme et bilan promoteur",
    description: "Zonage, risques, comparables DVF et bilan promoteur, sources à l'appui.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${instrument.variable} ${jakarta.variable} ${spaceMono.variable}`}>
      <head>
        {/*
         * consentmanager.net (CMP) : leur doc exige que ce script soit le
         * tout premier <script> du document pour que leur mode "automatic
         * blocking" puisse intercepter les scripts tiers chargés ensuite.
         * Vérifié le 21/08 : dans Next.js App Router, les chunks runtime
         * de Next (React, hydration) se placent AVANT tout <head> JSX
         * écrit à la main, quel que soit l'ordre source — ce prérequis
         * n'est donc pas atteignable ici. Sans conséquence : on ne compte
         * pas sur leur "automatic blocking" pour bloquer GoogleTag/
         * MetaPixel — ConsentGate (TCF v2, __tcfapi) fait ce travail
         * indépendamment du positionnement de ce script, qui sert
         * seulement à charger la bannière et exposer l'API TCF.
         */}
        {/* Switched 21/08 from /delivery/autoblocking/... to
         * /delivery/js/semiautomatic.min.js. Root cause found live via
         * DOM inspection: the autoblocking loader's DOM interceptor
         * caught the dynamically-created <script> that Meta Pixel's own
         * snippet inserts (document.createElement inside the IIFE) —
         * marked it class="cmplazyload" with data-cmp-src pointing at
         * fbevents.js, and NEVER released it, even after consent was
         * fully granted (cmp_s1/cmp_purpose_c5x all "granted" in
         * dataLayer). Confirmed not a propagation delay: same dead
         * dataLayer payload across 4 dashboard fix attempts over hours.
         * Semi-automatic mode just shows the banner + exposes __tcfapi,
         * no DOM script interception — we already gate GoogleTag/
         * MetaPixel ourselves via ConsentGate, so we don't need or want
         * their blocker anyway. codesrc=0 (was 16) matches this mode. */}
        {/*
         * cmp_setlang="FR" : force le français côté bannière au lieu de
         * suivre la langue du navigateur (fallback EN sinon — paramètre
         * officiel `cmp_setlang`, doc consentmanager.net "client-side
         * configuration options"). Contenu statique, pas d'input externe.
         * `async` : audit SEO 2026-08-21, le script synchrone faisait de la
         * bannière elle-même l'élément LCP (render-blocking). Mode
         * semi-automatique (pas d'interception DOM, cf. plus haut) : async
         * n'affecte pas le fix Meta Pixel du 21/08.
         */}
        <script>{'window.cmp_setlang="FR";'}</script>
        <script
          async
          type="text/javascript"
          data-cmp-ab="1"
          src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js"
          data-cmp-cdid="a9d3fcbcd2398"
          data-cmp-host="a.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="0"
        />
      </head>
      <body>
        {/* Sans JS, la choréographie de scroll (composants Reveal) ne
            s'active jamais : on force le contenu visible pour ne pas le
            masquer indéfiniment. */}
        <noscript>
          <style>{`.reveal, .reveal-scale { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {/*
         * GoogleTag/MetaPixel ne se montent qu'après consentement (Google
         * Consent Mode v2, lu depuis dataLayer — voir consent-gate.tsx).
         * Catégories distinctes : GA4 = analytics, Meta Pixel = marketing.
         */}
        <ConsentGate category="analytics">
          <GoogleTag />
        </ConsentGate>
        <ConsentGate category="marketing">
          <MetaPixel />
        </ConsentGate>
        {children}
      </body>
    </html>
  );
}
