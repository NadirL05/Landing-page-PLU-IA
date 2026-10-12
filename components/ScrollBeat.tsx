"use client";

import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Pause de scène : une zone sans contenu produit où la scène fixe se lit
 * seule, avec une légende. `progress` est l'état de la scène quand cette
 * pause est au centre de l'écran (voir components/PageScene.tsx).
 *
 * La légende entre en cascade (Framer Motion, `m` + LazyMotion pour ne
 * charger que le sous-ensemble d'animation DOM). `reducedMotion="user"` :
 * avec prefers-reduced-motion, les déplacements sont supprimés et seul le
 * fondu reste. Le texte est dans le DOM dès le rendu serveur.
 */

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

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
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <m.div
              className="max-w-[34rem]"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <m.div variants={item} className="kicker mb-3">{kicker}</m.div>
              <m.h2
                variants={item}
                className="font-display text-[clamp(2.2rem,1.2rem+4vw,4.6rem)] font-normal leading-[1] tracking-[-0.025em]"
                style={{ color: "var(--ink)" }}
              >
                {title}
              </m.h2>
              <m.p variants={item} className="mt-4 max-w-md text-[15px] leading-relaxed md:text-[17px]" style={{ color: "var(--ink-soft)" }}>
                {body}
              </m.p>
              <m.p variants={item} className="mono-label mt-4" style={{ color: "var(--terracotta)" }}>{source}</m.p>
              {children ? (
                <m.div variants={item} className="mt-8 inline-block" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {children}
                </m.div>
              ) : null}
            </m.div>
          </MotionConfig>
        </LazyMotion>
      </div>
    </section>
  );
}
