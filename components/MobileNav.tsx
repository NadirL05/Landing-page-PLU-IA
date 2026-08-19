"use client";

import { useState } from "react";
import { APP_URL } from "@/config/brand";

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
        className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full"
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
        <div id="mobile-nav-panel" className="glass-card absolute inset-x-4 top-16 z-50 rounded-3xl px-6 py-4">
          <nav className="flex flex-col gap-1 text-[15px] font-display" style={{ color: "var(--ink)" }}>
            {NAV_LINKS.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="rounded-xl px-2 py-2.5 transition hover:opacity-70">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t pt-3" style={{ borderColor: "var(--line)" }}>
            <a href={`${APP_URL}/sign-in`} className="rounded-xl px-2 py-2.5 text-left text-[14px]" style={{ color: "var(--ink-soft)" }}>
              Se connecter
            </a>
            <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-medium">
              Essayer gratuitement
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
