"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { SceneStore } from "@/components/PageHouseScene";

/**
 * Deuxième acte : la maison se construit en cinq états photoréalistes (même
 * cadrage, générés en chaîne à partir d'un seul rendu : terrain, fondations,
 * gros œuvre, toiture, livraison). Chaque état se fond dans le précédent au
 * fil du scroll, avec un lent travelling avant. Aucun état React par image :
 * tout passe par des refs, mises à jour depuis la progression de la page.
 */

type Stage = { src: string; label: string; from: number; to: number };

/* [début, fin] du fondu d'entrée de chaque état, en progression de scène.
   Les états se superposent : un état déjà entré reste sous le suivant. */
const STAGES: Stage[] = [
  { src: "/house/stage-1.webp", label: "Terrain", from: 0.33, to: 0.43 },
  { src: "/house/stage-2.webp", label: "Fondations", from: 0.45, to: 0.53 },
  { src: "/house/stage-3.webp", label: "Gros œuvre", from: 0.55, to: 0.62 },
  { src: "/house/stage-4.webp", label: "Toiture", from: 0.68, to: 0.78 },
  { src: "/house/stage-5.webp", label: "Livraison", from: 0.82, to: 0.92 },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function HousePhotoStack({
  store,
  subscribe,
}: {
  store: { current: SceneStore };
  subscribe: (listener: () => void) => () => void;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const dollyRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef(-1);

  useEffect(() => {
    const update = () => {
      const p = store.current.progress;

      if (layerRef.current) {
        const visible = ease(clamp01((p - 0.33) / 0.1));
        layerRef.current.style.opacity = String(visible);
        layerRef.current.style.visibility = visible > 0.001 ? "visible" : "hidden";
      }

      let current = 0;
      STAGES.forEach((stage, index) => {
        const node = imageRefs.current[index];
        if (!node) return;
        // L'état 1 apparaît avec la couche elle-même ; les suivants se fondent par-dessus.
        const opacity = index === 0 ? 1 : ease(clamp01((p - stage.from) / (stage.to - stage.from)));
        node.style.opacity = String(opacity);
        if (opacity > 0.5) current = index;
      });

      if (dollyRef.current) {
        // Travelling avant lent sur toute la construction.
        const t = ease(clamp01((p - 0.4) / 0.55));
        dollyRef.current.style.transform = `translate3d(0, ${(-2.5 * t).toFixed(2)}%, 0) scale(${(1 + 0.1 * t).toFixed(4)})`;
      }

      if (pillRef.current) pillRef.current.style.opacity = String(store.current.focus ?? 1);

      if (current !== stageRef.current) {
        stageRef.current = current;
        if (labelRef.current) labelRef.current.textContent = STAGES[current].label;
        if (counterRef.current) counterRef.current.textContent = `0${current + 1} / 0${STAGES.length}`;
      }
    };

    update();
    return subscribe(update);
  }, [store, subscribe]);

  return (
    <div
      ref={layerRef}
      className="house-photo pointer-events-none fixed z-[1] aspect-video w-[58vw] max-w-[1100px] opacity-0 max-md:left-1/2 max-md:top-[8vh] max-md:w-[135vw] max-md:-translate-x-1/2 md:right-[1vw] md:top-[15vh]"
      style={{ visibility: "hidden" }}
      aria-hidden="true"
    >
      <div ref={dollyRef} className="house-photo-mask absolute inset-0 will-change-transform">
        {STAGES.map((stage, index) => (
          <div
            key={stage.src}
            ref={(node) => {
              imageRefs.current[index] = node;
            }}
            className="absolute inset-0"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <Image src={stage.src} alt="" fill sizes="(max-width: 768px) 135vw, 58vw" unoptimized className="object-contain" priority={index === 0} />
          </div>
        ))}
      </div>

      {/* Pastille d'étape : même vocabulaire que le sélecteur d'état d'un configurateur. */}
      <div
        ref={pillRef}
        className="absolute left-1/2 top-[2%] flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2 text-[12px] font-medium text-white"
        style={{ background: "rgba(10, 14, 28, 0.92)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--terracotta)" }} />
        <span ref={labelRef}>Terrain</span>
        <span ref={counterRef} className="tabular-nums opacity-60">01 / 05</span>
      </div>
    </div>
  );
}
