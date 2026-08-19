import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
