"use client";

import { useEffect, useRef } from "react";

/**
 * Badge « Testé par La Fabrique du Net » (fiche https://www.lafabriquedunet.fr/logiciel/fonciable).
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
 *   cliquable bien au-dessus des 24 px de WCAG 2.2 (2.5.8). Hauteur du
 *   conteneur réservée à 54 px (taille maximale du badge) : aucun décalage de
 *   mise en page à l'arrivée du script.
 * - CSP : l'origine est autorisée dans `script-src` uniquement (next.config.ts) ;
 *   le SVG est inline, aucune image, police ni requête supplémentaire.
 * - RGPD : le chargement transmet l'adresse IP du visiteur à La Fabrique du Net
 *   (déclaré dans /confidentialite).
 */
export const LFDN_ORIGIN = "https://www.lafabriquedunet.fr";
export const LFDN_BADGE_SRC = `${LFDN_ORIGIN}/badge/software/fonciable/badge.js?color=outline&size=md`;

export function LaFabriqueDuNetBadge() {
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
