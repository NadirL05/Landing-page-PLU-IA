"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import { HousePhotoStack } from "@/components/HousePhotoStack";
import { useReducedMotionSafe, useWebgl } from "@/hooks/useSceneCapabilities";
import type { SceneStore } from "@/components/PageHouseScene";

const PageHouseScene = dynamic(
  () => import("@/components/PageHouseScene").then((mod) => mod.PageHouseScene),
  { ssr: false }
);

/** Progression montrée en mode statique (reduced-motion) : la maison est livrée. */
const STATIC_PROGRESS = 0.95;
/** Progression de la scène en haut de page : voisinage levé, parcelle tracée. */
const TOP_PROGRESS = 0.1;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

type Anchors = { ys: number[]; ss: number[] };

/**
 * La progression de la scène n'est pas proportionnelle au scroll brut : elle
 * est ancrée sur les « pauses » `[data-scene-beat="0.3"]` de la page. Quand
 * une pause est au centre de l'écran, la scène est exactement dans l'état
 * prévu pour elle, quelle que soit la hauteur du contenu entre deux pauses.
 */
function readAnchors(): Anchors {
  const viewport = window.innerHeight;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
  const ys = [0];
  const ss = [TOP_PROGRESS];
  document.querySelectorAll<HTMLElement>("[data-scene-beat]").forEach((node) => {
    const rect = node.getBoundingClientRect();
    const y = Math.min(maxScroll - 1, rect.top + window.scrollY + rect.height / 2 - viewport / 2);
    if (y > ys[ys.length - 1] + 1) {
      ys.push(y);
      ss.push(Number(node.dataset.sceneBeat));
    }
  });
  ys.push(maxScroll);
  ss.push(1);
  return { ys, ss };
}

function progressAt(scrollY: number, { ys, ss }: Anchors): number {
  if (scrollY <= ys[0]) return ss[0];
  for (let i = 1; i < ys.length; i += 1) {
    if (scrollY <= ys[i]) {
      const t = (scrollY - ys[i - 1]) / (ys[i] - ys[i - 1]);
      return ss[i - 1] + (ss[i] - ss[i - 1]) * t;
    }
  }
  return ss[ss.length - 1];
}

export function PageScene() {
  const reduced = useReducedMotionSafe();
  const webglOk = useWebgl();
  const canvasLayer = useRef<HTMLDivElement>(null);
  const store = useRef<SceneStore>({ progress: STATIC_PROGRESS });
  const listeners = useRef(new Set<() => void>());

  const subscribe = useCallback((listener: () => void) => {
    listeners.current.add(listener);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const apply = useCallback((progress: number) => {
    store.current.progress = progress;
    if (canvasLayer.current) {
      // Le canvas 3D (acte 1) s'estompe quand les photos (acte 2) prennent le relais.
      const fade = 1 - clamp01((progress - 0.31) / 0.12);
      canvasLayer.current.style.opacity = String(fade);
      canvasLayer.current.style.visibility = fade > 0.001 ? "visible" : "hidden";
    }
    listeners.current.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    if (reduced) {
      store.current.focus = 1;
      apply(STATIC_PROGRESS);
      return undefined;
    }

    let anchors = readAnchors();
    let frame = 0;
    const update = () => {
      frame = 0;
      // Pastilles visibles seulement à proximité d'une pause (pas sous le voile du contenu).
      const centres = anchors.ys.slice(1, -1);
      const distance = centres.length ? Math.min(...centres.map((y) => Math.abs(window.scrollY - y))) : 0;
      const viewport = window.innerHeight;
      store.current.focus = 1 - clamp01((distance - 0.35 * viewport) / (0.45 * viewport));
      apply(progressAt(window.scrollY, anchors));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const remeasure = () => {
      anchors = readAnchors();
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    // La hauteur de la page change quand les polices, images et sections se chargent.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, apply]);

  return (
    <>
      {webglOk ? (
        <div ref={canvasLayer} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
          <div className="h-full w-full max-md:opacity-70">
            <PageHouseScene store={store} subscribe={subscribe} />
          </div>
        </div>
      ) : null}
      <HousePhotoStack store={store} subscribe={subscribe} />
    </>
  );
}
