import Link from "next/link";
import { IconCrosshair } from "@/components/icons";
import { BRAND_NAME, APP_URL } from "@/config/brand";
import { SOLUTION_PAGES } from "@/config/solutions";
import { CALENDLY_URL, DATA_ATTRIBUTION, DISCLAIMER_SHORT } from "@/config/site-content";

/**
 * Pied de page commun à l'accueil et aux pages métier. Extrait de
 * `app/page.tsx`. Deux corrections au passage :
 *  - les ancres d'accueil sont écrites en absolu (« /#tarifs »), sinon elles
 *    ne résolvent rien depuis une page métier ;
 *  - une colonne « Solutions » expose les trois pages métier avec un intitulé
 *    descriptif (jamais « en savoir plus »), condition d'un maillage interne
 *    lisible autant pour un lecteur d'écran que pour un crawler.
 */

const FOOTER_COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "/#fonctionnalites" },
      { label: "Périmètre & limites", href: "/#perimetre" },
      { label: "Tarifs", href: "/#tarifs" },
      { label: "Démo", href: CALENDLY_URL },
    ],
  },
  {
    title: "Données",
    links: [
      { label: "Sources & attributions", href: `${APP_URL}/sources` },
      { label: "Sources interrogées", href: "/#sources" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: `${APP_URL}/mentions-legales` },
      { label: "CGV / CGU", href: `${APP_URL}/cgv` },
      { label: "Confidentialité (RGPD)", href: `${APP_URL}/confidentialite` },
      { label: "Contact", href: CALENDLY_URL },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t py-12" style={{ borderColor: "var(--line-strong)" }}>
      <div className="mx-auto max-w-[1180px] px-6">
        {/* 12 colonnes et non 6 : la colonne Solutions ajoutée porte le total
            à 7 pistes (2 + 2 + 1 + 1 + 1), ce qui faisait passer « Légal » à
            la ligne sur desktop. Le gabarit en 12 rétablit un compte exact
            (3 + 3 + 2 + 2 + 2) et laisse respirer les intitulés descriptifs
            des pages métier. En mobile, `grid-cols-2` est inchangé. */}
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-12">
          <div className="col-span-2 md:col-span-3">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center border" style={{ borderColor: "var(--brand)", color: "var(--brand)" }}>
                <IconCrosshair />
              </div>
              <span className="font-display text-[15px] font-normal" style={{ color: "var(--ink)" }}>{BRAND_NAME}</span>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              L&apos;analyse d&apos;urbanisme et de faisabilité foncière à partir des données publiques françaises.
            </p>
            <p className="mt-4 max-w-sm text-[11px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{DATA_ATTRIBUTION}</p>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>Solutions</h2>
            <ul className="space-y-2 text-[13px]" style={{ color: "var(--ink-soft)" }}>
              {SOLUTION_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link href={page.slug} className="transition hover:opacity-70">{page.linkLabel}</Link>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>{col.title}</h2>
              <ul className="space-y-2 text-[13px]" style={{ color: "var(--ink-soft)" }}>
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">{link.label}</a>
                      ) : (
                        <Link href={link.href} className="transition hover:opacity-70">{link.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mb-6 border-t pt-6 text-[11px] leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>{DISCLAIMER_SHORT}</p>
        <div className="flex items-center justify-between border-t pt-6 text-[11px]" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
          <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">Nous contacter</a>
        </div>
      </div>
    </footer>
  );
}
