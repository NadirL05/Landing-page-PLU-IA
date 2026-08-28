"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isWebglAvailable } from "@/lib/webgl";

const ParcelMassingScene = dynamic(
  () => import("@/components/ParcelMassingScene").then((mod) => mod.ParcelMassingScene),
  { ssr: false }
);

/** requestIdleCallback n'existe pas sur Safari — repli sur un court setTimeout. */
function scheduleWhenIdle(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }

  const id = setTimeout(callback, 200);
  return () => clearTimeout(id);
}

/**
 * La maquette 3D est le visuel principal du hero : elle est censée
 * apparaître dès le chargement, pas à l'entrée dans le viewport (le
 * mouvement, lui, est piloté par le scroll — voir ParcelMassingScene).
 * Le gating ne porte donc pas sur la position dans la page (l'ancien
 * IntersectionObserver se déclenchait presque immédiatement avec un
 * rootMargin de 200px et n'apportait aucun bénéfice perf) mais sur le
 * *moment* où le thread principal est libre : on laisse le LCP (H1,
 * CTA) peindre d'abord, puis on monte la scène three.js pendant
 * l'idle post-LCP. Repli silencieux si WebGL est indisponible : le
 * panneau clair du parent reste seul visible, à hauteur inchangée.
 */
export function ParcelVolumeCanvas() {
  const [shouldMount, setShouldMount] = useState(false);
  const [webglOk] = useState(() => isWebglAvailable());

  useEffect(() => {
    if (!webglOk) return undefined;
    return scheduleWhenIdle(() => setShouldMount(true));
  }, [webglOk]);

  return (
    <div className="h-full w-full">
      {shouldMount && webglOk ? <ParcelMassingScene /> : null}
    </div>
  );
}
