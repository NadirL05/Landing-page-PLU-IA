"use client";

import { useSyncExternalStore } from "react";
import { isWebglAvailable } from "@/lib/webgl";

const noopSubscribe = () => () => {};

/* WebGL ne change pas pendant la vie de la page : on le mesure une fois.
   useSyncExternalStore avec un snapshot serveur évite tout écart
   d'hydratation (le serveur suppose « disponible », le client corrige
   ensuite si besoin). */
let webglCache: boolean | null = null;
function readWebgl(): boolean {
  if (webglCache === null) webglCache = isWebglAvailable();
  return webglCache;
}

export function useWebgl(): boolean {
  return useSyncExternalStore(noopSubscribe, readWebgl, () => true);
}

function subscribeReducedMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

/** Variante sans écart d'hydratation de useReducedMotion (snapshot serveur = false). */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
