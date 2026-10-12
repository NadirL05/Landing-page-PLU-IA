"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { SceneStore } from "@/components/PageHouseScene";

/**
 * Deuxième acte : la maison se construit dans une vidéo photoréaliste
 * (terrain nu → fondations → gros œuvre → toiture → aménagement → livraison)
 * dont la tête de lecture suit le scroll (« video scrub »). Le clip a été
 * généré à partir de deux images alignées (début et fin), caméra fixe.
 *
 * Mécanique : une seule valeur normalisée (la progression de scène) donne le
 * `currentTime` visé ; les positionnements sont regroupés dans un
 * requestAnimationFrame, et rien ne tourne une fois la position atteinte. Le
 * scroll reste natif et réversible. Aucun état React par image.
 *
 * `reduced` (prefers-reduced-motion) : une seule image, la maison livrée.
 */

type Chapter = { label: string; from: number };

/* Début de chaque chapitre, en fraction de la durée de la vidéo (relevés sur le clip). */
const CHAPTERS: Chapter[] = [
  { label: "Terrain", from: 0 },
  { label: "Fondations", from: 0.12 },
  { label: "Gros œuvre", from: 0.25 },
  { label: "Toiture", from: 0.5 },
  { label: "Aménagement", from: 0.62 },
  { label: "Livraison", from: 0.82 },
];

/* Plage de progression de scène pendant laquelle la vidéo avance. */
const VIDEO_FROM = 0.4;
const VIDEO_TO = 0.93;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function HousePhotoStack({
  store,
  subscribe,
  reduced,
}: {
  store: { current: SceneStore };
  subscribe: (listener: () => void) => () => void;
  reduced: boolean;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const dollyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const chapterRef = useRef(-1);

  useEffect(() => {
    const video = videoRef.current;
    let targetTime = 0;
    let frame = 0;

    // Un seul `currentTime` à la fois : on ne re-seek pas pendant qu'un seek est en cours.
    const seek = () => {
      frame = 0;
      if (!video || !Number.isFinite(video.duration)) return;
      if (Math.abs(video.currentTime - targetTime) < 1 / 48) return;
      if (video.seeking) {
        frame = window.requestAnimationFrame(seek);
        return;
      }
      video.currentTime = targetTime;
    };

    const update = () => {
      const p = store.current.progress;

      if (layerRef.current) {
        const visible = ease(clamp01((p - 0.33) / 0.1));
        layerRef.current.style.opacity = String(visible);
        layerRef.current.style.visibility = visible > 0.001 ? "visible" : "hidden";
      }

      // Progression de la vidéo : quasi linéaire pour que la construction avance au rythme du scroll.
      const t = clamp01((p - VIDEO_FROM) / (VIDEO_TO - VIDEO_FROM));

      if (video && Number.isFinite(video.duration)) {
        targetTime = t * video.duration;
        if (!frame) frame = window.requestAnimationFrame(seek);
      }

      if (dollyRef.current) {
        // Travelling avant lent sur toute la construction.
        const d = ease(t);
        dollyRef.current.style.transform = `translate3d(0, ${(-2.5 * d).toFixed(2)}%, 0) scale(${(1 + 0.08 * d).toFixed(4)})`;
      }

      if (pillRef.current) pillRef.current.style.opacity = String(store.current.focus ?? 1);

      let chapter = 0;
      CHAPTERS.forEach((entry, index) => {
        if (t >= entry.from) chapter = index;
      });
      if (chapter !== chapterRef.current) {
        chapterRef.current = chapter;
        if (labelRef.current) labelRef.current.textContent = CHAPTERS[chapter].label;
        if (counterRef.current) counterRef.current.textContent = `0${chapter + 1} / 0${CHAPTERS.length}`;
      }
    };

    // Les métadonnées arrivent après le montage : on recalcule à ce moment-là.
    video?.addEventListener("loadedmetadata", update);
    update();
    const unsubscribe = subscribe(update);
    return () => {
      unsubscribe();
      video?.removeEventListener("loadedmetadata", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [store, subscribe]);

  return (
    <div
      ref={layerRef}
      className="house-photo pointer-events-none fixed z-[1] aspect-video w-[58vw] max-w-[1100px] opacity-0 max-md:left-1/2 max-md:top-[8vh] max-md:w-[135vw] max-md:-translate-x-1/2 md:right-[1vw] md:top-[15vh]"
      style={{ visibility: "hidden" }}
      aria-hidden="true"
    >
      <div ref={dollyRef} className="house-photo-mask absolute inset-0 will-change-transform">
        {reduced ? (
          <Image src="/house/stage-5.webp" alt="" fill sizes="(max-width: 768px) 135vw, 58vw" unoptimized className="object-contain" />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            src="/house/construction.mp4"
            poster="/house/stage-1.webp"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            tabIndex={-1}
          />
        )}
      </div>

      {/* Pastille de chapitre : même vocabulaire que le sélecteur d'état d'un configurateur. */}
      <div
        ref={pillRef}
        className="absolute left-1/2 top-[2%] flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2 text-[12px] font-medium text-white"
        style={{ background: "rgba(10, 14, 28, 0.92)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--terracotta)" }} />
        <span ref={labelRef}>Terrain</span>
        <span ref={counterRef} className="tabular-nums opacity-60">01 / 06</span>
      </div>
    </div>
  );
}
