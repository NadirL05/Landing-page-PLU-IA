"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Produit", href: "#produit" },
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Sources", href: "#sources" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="btn-ghost flex h-10 w-10 items-center justify-center"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
          <nav className="flex flex-col gap-1 text-[15px] font-display" style={{ color: "var(--ink)" }}>
            {NAV_LINKS.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="px-2 py-2.5 transition hover:opacity-70">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
