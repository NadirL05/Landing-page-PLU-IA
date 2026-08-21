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
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="text/javascript"
          data-cmp-ab="1"
          src="https://cdn.consentmanager.net/delivery/autoblocking/a9d3fcbcd2398.js"
          data-cmp-host="a.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="16"
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
