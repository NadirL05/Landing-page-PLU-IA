import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { APP_URL } from "@/config/brand";
import { APP_ENTRY_PATH } from "@/config/site-content";

// Next.js émet déjà `<meta name="robots" content="noindex">` sur une 404 :
// `robots: null` évite une seconde balise (et coupe la directive googleBot
// du layout). `alternates: null` retire la canonical vers l'accueil héritée
// du layout, sans objet sur une page d'erreur (audit SEO du 26/10/2026).
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: null,
  alternates: null,
};

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="grid-paper border-b py-28" style={{ borderColor: "var(--line-strong)" }}>
        <div className="mx-auto max-w-[760px] px-6 text-center">
          <div className="kicker mx-auto mb-5">Erreur 404</div>
          <h1 className="font-display text-5xl font-normal tracking-tight md:text-6xl" style={{ color: "var(--ink)" }}>
            Cette parcelle du site n’existe pas.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            L’adresse a peut-être changé. Revenez à la présentation de Fonciable ou ouvrez directement l’application.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-ghost inline-flex h-12 items-center px-6 text-sm font-medium">Retour à l’accueil</Link>
            <a href={`${APP_URL}${APP_ENTRY_PATH}`} className="btn-brand inline-flex h-12 items-center px-6 text-sm font-semibold">Ouvrir l’application</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
