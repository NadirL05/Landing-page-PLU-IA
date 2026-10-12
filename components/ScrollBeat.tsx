import type { ReactNode } from "react";

/**
 * Pause de scène : une zone sans contenu produit où la scène 3D fixe se lit
 * seule, avec une légende. `progress` est l'état de la scène quand cette
 * pause est au centre de l'écran (voir components/PageScene.tsx).
 *
 * Le texte reprend uniquement des capacités déjà annoncées sur la page ; il
 * reste dans le DOM et l'arbre d'accessibilité même sans WebGL.
 */
export function ScrollBeat({
  progress,
  kicker,
  title,
  body,
  source,
  children,
}: {
  progress: number;
  kicker: string;
  title: string;
  body: string;
  source: string;
  children?: ReactNode;
}) {
  return (
    <section
      data-scene-beat={progress}
      aria-label={title}
      className="relative flex min-h-[88svh] items-end pb-16 md:items-center md:pb-0"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--paper) 92%, transparent) 0%, color-mix(in srgb, var(--paper) 55%, transparent) 38%, transparent 62%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1320px] px-6">
        <div className="max-w-[34rem]">
          <div className="kicker mb-3">{kicker}</div>
          <h2
            className="font-display text-[clamp(2.2rem,1.2rem+4vw,4.6rem)] font-normal leading-[1] tracking-[-0.025em]"
            style={{ color: "var(--ink)" }}
          >
            {title}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed md:text-[17px]" style={{ color: "var(--ink-soft)" }}>
            {body}
          </p>
          <p className="mono-label mt-4" style={{ color: "var(--terracotta)" }}>{source}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
