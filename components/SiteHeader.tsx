import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { APP_URL, BRAND_NAME } from "@/config/brand";
import { APP_ENTRY_PATH } from "@/config/site-content";

/**
 * Bandeau de navigation commun à l'accueil et aux pages métier. Extrait de
 * `app/page.tsx` — les ancres y étaient écrites en fragments nus (`#tarifs`),
 * ce qui ne résout rien depuis une autre route : elles sont ici préfixées par
 * `/` pour rester valides depuis n'importe quelle page.
 *
 * Surface `.glass` : justifiée ici, le contenu de la page défile réellement
 * dessous (bandeau `sticky`).
 */

/** Ancres de l'accueil, écrites en absolu pour rester valides hors de « / ». */
export const HOME_ANCHORS = [
  { label: "Produit", href: "/#produit" },
  { label: "Fonctionnalités", href: "/#fonctionnalites" },
  { label: "Sources", href: "/#sources" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "FAQ", href: "/#faq" },
] as const;

/** Entrée de navigation vers les pages métier. */
export const SOLUTIONS_ANCHOR = { label: "Solutions", href: "/#solutions" } as const;

export function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-50 border-b" style={{ borderColor: "var(--line-strong)" }}>
      <div className="relative mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-7">
        <div className="flex min-w-0 items-center gap-10">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image src="/brand/fonciable-logo.png" alt="" width={32} height={32} unoptimized className="h-8 w-8 shrink-0 rounded-md" priority />
            <span className="font-display whitespace-nowrap text-[15px] font-normal tracking-tight" style={{ color: "var(--ink)" }}>{BRAND_NAME}</span>
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-[13px] font-medium md:flex" style={{ color: "var(--ink-soft)" }}>
            <Link href={SOLUTIONS_ANCHOR.href} className="transition hover:opacity-70">{SOLUTIONS_ANCHOR.label}</Link>
            {HOME_ANCHORS.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:opacity-70">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`${APP_URL}${APP_ENTRY_PATH}`}
            className="btn-brand hidden h-10 items-center px-4 text-[12px] font-semibold md:inline-flex"
          >
            Ouvrir l’application
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
