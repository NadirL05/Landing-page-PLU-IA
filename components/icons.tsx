/**
 * Jeu d'icônes partagé entre l'accueil, l'en-tête/pied de page et les pages
 * métier. Extrait de `app/page.tsx` (où ces quatre icônes étaient définies en
 * local) pour éviter d'en recopier une définition par page : le contour
 * "trait 2px, bouts arrondis" fait partie de l'identité de la landing, il ne
 * doit avoir qu'une seule source.
 */

export function IconArrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function IconCheck({ color = "var(--brand)" }: { color?: string }) {
  return (
    <svg className="h-4 w-4 shrink-0" style={{ color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconX() {
  return (
    <svg className="h-4 w-4 shrink-0" style={{ color: "var(--ink-soft)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function IconPlay() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function IconCrosshair() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}
