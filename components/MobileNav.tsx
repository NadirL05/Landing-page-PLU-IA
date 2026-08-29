"use client";

import { useState } from "react";
import Link from "next/link";
import { SOLUTION_PAGES } from "@/config/solutions";

/** Ancres de l'accueil, en absolu : depuis /bilan-promoteur, « #tarifs » ne
 *  résout rien. Même liste que le bandeau desktop (components/SiteHeader.tsx),
 *  recopiée ici parce que ce fichier est un composant client et ne doit pas
 *  importer un module serveur. */
const HOME_LINKS = [
  { label: "Produit", href: "/#produit" },
  { label: "Fonctionnalités", href: "/#fonctionnalites" },
  { label: "Sources", href: "/#sources" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "FAQ", href: "/#faq" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // md:hidden (et non sm:hidden) : le bandeau desktop est en `md:flex`.
    // Entre 640 et 768 px, l'ancien `sm:hidden` masquait ce bouton alors que
    // la nav desktop n'était pas encore affichée — aucune navigation
    // disponible sur toute cette plage de tablettes.
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="btn-ghost flex h-11 w-11 items-center justify-center"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {isOpen ? (
        // Surface pleine (.spec-card), volontairement pas .glass : ce panneau
        // est rendu à l'intérieur du bandeau, qui porte lui-même un
        // backdrop-filter. Un élément à backdrop-filter devient racine de
        // backdrop pour ses descendants — un panneau translucide ici ne
        // flouterait rien et se lirait en gris plat par-dessus la page.
        <div id="mobile-nav-panel" className="spec-card absolute inset-x-4 top-16 z-50 px-6 py-4">
          <nav aria-label="Navigation principale (mobile)" className="flex flex-col gap-1 text-[15px] font-display" style={{ color: "var(--ink)" }}>
            <span className="mono-label px-2 pb-1 pt-2" style={{ color: "var(--ink-soft)" }}>Solutions</span>
            {SOLUTION_PAGES.map((page) => (
              <Link key={page.slug} href={page.slug} onClick={() => setIsOpen(false)} className="px-2 py-2.5 transition hover:opacity-70">
                {page.navLabel}
              </Link>
            ))}
            <span className="mono-label mt-3 border-t px-2 pb-1 pt-4" style={{ color: "var(--ink-soft)", borderColor: "var(--line)" }}>Le produit</span>
            {HOME_LINKS.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="px-2 py-2.5 transition hover:opacity-70">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
