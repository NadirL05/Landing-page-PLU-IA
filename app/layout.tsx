import type { Metadata } from "next";
import { Instrument_Sans, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
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
      <body>
        {/* Sans JS, la choréographie de scroll (composants Reveal) ne
            s'active jamais : on force le contenu visible pour ne pas le
            masquer indéfiniment. */}
        <noscript>
          <style>{`.reveal, .reveal-scale { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
