/** État partagé entre PageScene (qui le calcule au scroll) et les calques visuels (qui le lisent). */
export type SceneStore = {
  /** Progression de la scène, 0 → 1, ancrée sur les pauses de la page. */
  progress: number;
  /** 0 → 1 : proximité d'une pause, pour n'afficher les pastilles qu'à ce moment-là. */
  focus?: number;
};
