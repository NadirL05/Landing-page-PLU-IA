"use client";

import { useEffect, useState, type ReactNode } from "react";

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (tcData: TcData, success: boolean) => void
    ) => void;
  }
}

interface TcData {
  eventStatus?: string;
  purpose?: { consent?: Record<string, boolean> };
}

/**
 * Bloque le rendu de ses enfants (GoogleTag, MetaPixel) tant que le
 * visiteur n'a pas donné son consentement via consentmanager.net (TCF v2).
 * Écoute l'API standard __tcfapi plutôt que l'API propriétaire de
 * consentmanager (getCMPData) — leur doc ne documente pas la forme exacte
 * du payload propriétaire, alors que TCF v2 est un standard IAB stable.
 *
 * Purpose 1 = "Store and/or access information on a device" — le socle
 * minimal requis pour poser un cookie/tracker analytics ou publicitaire,
 * quel que soit le fournisseur (Google, Meta). Si le dashboard
 * consentmanager.net de ce compte a des purposes plus fins pour
 * Analytics vs Marketing et qu'un gating séparé est voulu, vérifier les ID
 * de purpose exacts dans le dashboard (Vendors & Purposes) et affiner ici.
 */
export function ConsentGate({ children }: { children: ReactNode }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (typeof window.__tcfapi !== "function") return undefined;

    function handleTcData(tcData: TcData, success: boolean) {
      if (!success) return;
      if (tcData.eventStatus !== "tcloaded" && tcData.eventStatus !== "useractioncomplete") return;
      const purpose1 = tcData.purpose?.consent?.["1"];
      if (purpose1) setConsented(true);
    }

    window.__tcfapi("addEventListener", 2, handleTcData);

    return () => {
      // __tcfapi n'expose pas removeEventListener avec la même signature
      // simple que addEventListener côté consentmanager — pas de cleanup
      // fiable documenté ; sans risque ici (composant monté une seule
      // fois, pour toute la durée de vie de la page).
    };
  }, []);

  if (!consented) return null;
  return <>{children}</>;
}
