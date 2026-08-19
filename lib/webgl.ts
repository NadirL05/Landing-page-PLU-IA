/** Détection WebGL minimale — sert de garde avant de monter le canvas
 * three.js, pour dégrader proprement sur les navigateurs/GPU qui ne
 * le supportent pas plutôt que de planter le rendu de la landing. */
export function isWebglAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}
