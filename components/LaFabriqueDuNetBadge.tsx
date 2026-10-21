"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ConsentGate } from "@/components/analytics/consent-gate";

/**
 * Badge « Testé par La Fabrique du Net » (fiche https://www.lafabriquedunet.fr/logiciel/fonciable).
 *
 * Consentement (décision de Nadir du 21/10/2026) : le serveur du badge renvoie
 * ses propres cookies (`XSRF-TOKEN`, `la_fabrique_du_net_session`). Le script
 * n'est donc chargé qu'après le consentement « marketing » (ad_storage +
 * ad_user_data, comme Meta Pixel, voir consent-gate.tsx). Sans consentement :
 * aucun appel vers lafabriquedunet.fr, seulement un lien texte sans script.
 *
 * Le script fourni lit `document.currentScript` puis insère son lien juste
 * avant la balise <script> (`parentNode.insertBefore`). On l'ajoute donc
 * nous-mêmes dans le conteneur ci-dessous : `next/script` l'ajouterait à
 * `document.body` (node_modules/next/dist/client/script.js) et le badge
 * atterrirait en bas de page, hors du pied de page.
 *
 * - Une seule insertion par montage ; le nettoyage vide le conteneur, donc
 *   pas de doublon quand le pied de page est remonté en navigation client.
 * - Taille `md` : 230 × 41,4 px (SVG 300 × 54 mis à l'échelle), cible
 *   cliquable bien au-dessus des 24 px de WCAG 2.2 (2.5.8). Conteneur de
 *   54 px (taille maximale du badge) réservé seulement une fois le
 *   consentement donné : aucun espace vide sinon.
 * - CSP : l'origine est autorisée dans `script-src` uniquement (next.config.ts) ;
 *   le SVG est inline, aucune image, police ni requête supplémentaire.
 */
export const LFDN_ORIGIN = "https://www.lafabriquedunet.fr";
export const LFDN_PROFILE_URL = `${LFDN_ORIGIN}/logiciel/fonciable`;
export const LFDN_BADGE_SRC = `${LFDN_ORIGIN}/badge/software/fonciable/badge.js?color=outline&size=md`;

function LaFabriqueDuNetBadge() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script[data-lfdn-badge]")) return;

    const script = document.createElement("script");
    script.src = LFDN_BADGE_SRC;
    script.async = true;
    script.dataset.lfdnBadge = "";
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  // Aucun enfant rendu par React : le contenu est entièrement géré par le script tiers.
  return <div ref={containerRef} data-lfdn-badge-container="" className="mt-4 flex h-[54px] items-center" />;
}

/** Lien texte sans script, affiché sans consentement (et pendant l'hydratation). */
function LaFabriqueDuNetTextLink() {
  return (
    <p className="mt-2 text-[11px]" style={{ color: "var(--ink-soft)" }}>
      <a
        href={LFDN_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-lfdn-text-link=""
        className="inline-flex min-h-6 items-center underline transition hover:opacity-70"
      >
        Fonciable sur La Fabrique du Net
      </a>
    </p>
  );
}

const subscribeNoop = () => () => {};

/**
 * Le HTML pré-rendu ne connaît pas le consentement : le lien texte est rendu
 * jusqu'à la fin de l'hydratation (pas d'écart serveur/client), puis
 * ConsentGate décide.
 */
export function LaFabriqueDuNetBadgeSlot() {
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!hydrated) return <LaFabriqueDuNetTextLink />;
  return (
    <ConsentGate category="marketing" fallback={<LaFabriqueDuNetTextLink />}>
      <LaFabriqueDuNetBadge />
    </ConsentGate>
  );
}
