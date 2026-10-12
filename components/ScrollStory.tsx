"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { IconArrow } from "@/components/icons";
import { TrackedCta } from "@/components/analytics/tracked-cta";
import { isWebglAvailable } from "@/lib/webgl";
import type { StoryStore } from "@/components/ScrollStoryScene";

const ScrollStoryScene = dynamic(
  () => import("@/components/ScrollStoryScene").then((mod) => mod.ScrollStoryScene),
  { ssr: false }
);

/** Progression finale montrée en mode statique (reduced-motion) : tout est visible. */
const STATIC_PROGRESS = 0.86;

type Step = {
  kicker: string;
  title: string;
  body: string;
  source: string;
  /** Fenêtre de visibilité dans la progression : entrée, plein, sortie. */
  range: [number, number, number, number];
};

/* Contenu repris de la liste des capacités de la page (FIG.01 à FIG.04) :
   aucune valeur chiffrée ici, pour ne pas afficher un résultat que le
   produit ne calcule pas pour la parcelle montrée. */
const STEPS: Step[] = [
  {
    kicker: "01 · Adresse",
    title: "Une adresse. Une parcelle.",
    body: "Saisissez une adresse ou une référence cadastrale : la parcelle et son contour sont récupérés via l'API Carto Cadastre de l'IGN.",
    source: "Source : Base Adresse Nationale · Cadastre IGN",
    range: [0, 0.06, 0.26, 0.32],
  },
  {
    kicker: "02 · Règles",
    title: "Le PLU, lu pour vous.",
    body: "Le zonage est lu dans le Géoportail de l'Urbanisme, puis le règlement de la zone est analysé pour en extraire emprise, retraits et espaces verts.",
    source: "Source : Géoportail de l'Urbanisme",
    range: [0.32, 0.4, 0.5, 0.56],
  },
  {
    kicker: "03 · Potentiel",
    title: "Ce que le terrain permet de bâtir.",
    body: "L'enveloppe constructible maximale théorique se dessine. Elle ne remplace pas la vérification en mairie, et l'outil indique quand il ne sait pas.",
    source: "Enveloppe théorique · à confirmer en mairie",
    range: [0.58, 0.66, 0.84, 0.9],
  },
];

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
function useWebgl(): boolean {
  return useSyncExternalStore(noopSubscribe, readWebgl, () => true);
}

function subscribeReducedMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function stepOpacity(p: number, [inStart, inEnd, outStart, outEnd]: Step["range"]): number {
  const entering = clamp01((p - inStart) / (inEnd - inStart));
  const leaving = 1 - clamp01((p - outStart) / (outEnd - outStart));
  return Math.min(entering, leaving);
}

export function ScrollStory({ ctaHref }: { ctaHref: string }) {
  const reduced = useReducedMotionSafe();
  const webglOk = useWebgl();
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const store = useRef<StoryStore>({ progress: reduced ? STATIC_PROGRESS : 0 });
  const listeners = useRef(new Set<() => void>());

  const subscribe = useCallback((listener: () => void) => {
    listeners.current.add(listener);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const apply = useCallback((p: number) => {
    store.current.progress = p;
    STEPS.forEach((step, index) => {
      const node = stepRefs.current[index];
      if (!node) return;
      const opacity = stepOpacity(p, step.range);
      node.style.opacity = String(opacity);
      node.style.transform = `translateY(${(1 - opacity) * 24}px)`;
      node.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
    });
    if (ctaRef.current) {
      const opacity = clamp01((p - 0.78) / 0.1);
      ctaRef.current.style.opacity = String(opacity);
      ctaRef.current.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    listeners.current.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    if (reduced) {
      apply(STATIC_PROGRESS);
      return undefined;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      apply(travel > 0 ? clamp01(-rect.top / travel) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, apply]);

  /* Mode statique : pas de zone épinglée, les trois étapes se lisent
     comme du contenu ordinaire (reduced-motion, ou WebGL indisponible). */
  if (reduced || !webglOk) {
    return (
      <section id="parcours" aria-labelledby="parcours-title" className="border-t py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 id="parcours-title" className="font-display text-4xl font-normal leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
            De l&apos;adresse au potentiel constructible.
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.kicker} className="soft-card p-6">
                <div className="kicker mb-3">{step.kicker}</div>
                <h3 className="font-display text-2xl font-normal" style={{ color: "var(--ink)" }}>{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{step.body}</p>
                <p className="mt-4 text-[12px]" style={{ color: "var(--ink-soft)" }}>{step.source}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="parcours"
      aria-labelledby="parcours-title"
      className="relative h-[420vh] border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <h2 id="parcours-title" className="sr-only">
        De l&apos;adresse au potentiel constructible : parcelle, règles du PLU, enveloppe constructible
      </h2>

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden" style={{ background: "var(--paper-raised)" }}>
        <div className="absolute inset-0" aria-hidden="true">
          <ScrollStoryScene store={store} subscribe={subscribe} />
        </div>

        {/* Voile de lisibilité côté texte, sans masquer la scène. */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(90deg, color-mix(in oklch, var(--paper-raised) 88%, transparent) 0%, transparent 55%)" }}
        />

        <div className="absolute inset-x-0 bottom-0 top-0 mx-auto max-w-[1320px] px-6">
          {STEPS.map((step, index) => (
            <div
              key={step.kicker}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              className="absolute bottom-14 left-6 right-6 max-w-[34rem] opacity-0 will-change-transform md:bottom-20"
            >
              <div className="kicker mb-3">{step.kicker}</div>
              <h3
                className="font-display text-[clamp(2.1rem,1.2rem+4vw,4.6rem)] font-normal leading-[1] tracking-[-0.025em]"
                style={{ color: "var(--ink)" }}
              >
                {step.title}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed md:text-[17px]" style={{ color: "var(--ink-soft)" }}>
                {step.body}
              </p>
              <p className="mono-label mt-4" style={{ color: "var(--terracotta)" }}>{step.source}</p>
            </div>
          ))}

          <div ref={ctaRef} className="absolute bottom-14 right-6 opacity-0 md:bottom-20" style={{ pointerEvents: "none" }}>
            <TrackedCta
              href={ctaHref}
              eventName="start_free_analysis"
              eventParams={{ cta_location: "scroll_story" }}
              preserveQuery
              className="btn-brand inline-flex items-center gap-2 px-7 text-sm font-semibold"
              style={{ height: 52 }}
            >
              Lancer une analyse gratuite
              <IconArrow />
            </TrackedCta>
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-[3px] origin-left" style={{ background: "var(--terracotta)", transform: "scaleX(0)" }} ref={barRef} aria-hidden="true" />
      </div>
    </section>
  );
}
