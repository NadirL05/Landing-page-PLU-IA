"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import { useReducedMotionSafe, useWebgl } from "@/hooks/useSceneCapabilities";
import type { SceneStore } from "@/components/PageHouseScene";

const PageHouseScene = dynamic(
  () => import("@/components/PageHouseScene").then((mod) => mod.PageHouseScene),
  { ssr: false }
);

/** Progression montrée en mode statique (reduced-motion) : la maison est terminée. */
const STATIC_PROGRESS = 0.95;
/** Progression de la scène en haut de page : voisinage levé, parcelle tracée. */
const TOP_PROGRESS = 0.1;

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
    listeners.current.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    if (!webglOk) return undefined;
    if (reduced) {
      apply(STATIC_PROGRESS);
      return undefined;
    }

    let anchors = readAnchors();
    let frame = 0;
    const update = () => {
      frame = 0;
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
  }, [webglOk, reduced, apply]);

  if (!webglOk) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-60 md:opacity-100" aria-hidden="true">
      <PageHouseScene store={store} subscribe={subscribe} />
    </div>
  );
}
