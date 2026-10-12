"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { SceneStore } from "@/components/sceneStore";

/**
 * Scène photoréaliste fixe derrière la page, en deux actes :
 *
 * 1. Une parcelle réelle vue du ciel. Son contour se trace à l'arrivée sur la
 *    page, puis la zone se teinte au scroll (le zonage du PLU).
 * 2. La construction de la maison (vidéo photoréaliste, caméra fixe, parcelle
 *    nue → maison livrée) dont la tête de lecture suit le scroll (« video
 *    scrub »).
 *
 * Mécanique : une seule valeur normalisée (la progression de scène) pilote
 * tout ; les positionnements vidéo sont regroupés dans un requestAnimationFrame
 * et rien ne tourne une fois la position atteinte. Le scroll reste natif et
 * réversible. Aucun état React par image.
 *
 * `reduced` (prefers-reduced-motion) : le contour est tracé d'emblée, et la
 * vidéo est remplacée par une image fixe de la maison livrée.
 */

/* Contour de la parcelle, dans le repère de l'image (2688 × 1520). */
const PARCEL_POINTS = "1351,544 1664,607 1374,1043 974,915";

type Chapter = { label: string; from: number };

/* Début de chaque chapitre vidéo, en fraction de la durée du clip (relevés sur le clip). */
const CHAPTERS: Chapter[] = [
  { label: "Terrain", from: 0 },
  { label: "Fondations", from: 0.12 },
  { label: "Gros œuvre", from: 0.25 },
  { label: "Toiture", from: 0.5 },
  { label: "Aménagement", from: 0.62 },
  { label: "Livraison", from: 0.82 },
];
const TOTAL_CHAPTERS = CHAPTERS.length + 1; // + « Parcelle » (acte 1)

/* Passage de l'acte 1 (photo aérienne) à l'acte 2 (vidéo), en progression de scène. */
const HANDOFF_FROM = 0.33;
const HANDOFF_TO = 0.43;
/* Plage de progression pendant laquelle la vidéo avance. */
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
  const dollyRef = useRef<HTMLDivElement>(null);
  const aerialRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<SVGPolygonElement>(null);
  const outlineRef = useRef<SVGPolygonElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const chapterRef = useRef(-1);

  // Tracé du contour à l'arrivée : une courte animation, puis il reste en place.
  useEffect(() => {
    const outline = outlineRef.current;
    if (!outline) return undefined;
    if (reduced) {
      outline.style.strokeDashoffset = "0";
      return undefined;
    }
    outline.style.strokeDashoffset = "1";
    const frame = window.requestAnimationFrame(() => {
      outline.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s";
      outline.style.strokeDashoffset = "0";
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reduced]);

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

      // Acte 1 → acte 2.
      const handoff = ease(clamp01((p - HANDOFF_FROM) / (HANDOFF_TO - HANDOFF_FROM)));
      if (aerialRef.current) {
        aerialRef.current.style.opacity = String(1 - handoff);
        aerialRef.current.style.visibility = handoff < 0.999 ? "visible" : "hidden";
      }
      if (videoLayerRef.current) {
        videoLayerRef.current.style.opacity = String(handoff);
        videoLayerRef.current.style.visibility = handoff > 0.001 ? "visible" : "hidden";
      }

      // Zone du PLU : teinte terracotta qui monte avec le scroll.
      if (zoneRef.current) zoneRef.current.style.opacity = String(0.34 * ease(clamp01((p - 0.1) / 0.18)));

      // Progression de la vidéo : quasi linéaire pour que la construction avance au rythme du scroll.
      const t = clamp01((p - VIDEO_FROM) / (VIDEO_TO - VIDEO_FROM));
      if (video && Number.isFinite(video.duration)) {
        targetTime = t * video.duration;
        if (!frame) frame = window.requestAnimationFrame(seek);
      }

      if (dollyRef.current) {
        // Lent travelling avant sur toute la page.
        const d = ease(clamp01((p - 0.1) / 0.83));
        dollyRef.current.style.transform = `translate3d(0, ${(-2.5 * d).toFixed(2)}%, 0) scale(${(1 + 0.08 * d).toFixed(4)})`;
      }

      if (pillRef.current) pillRef.current.style.opacity = String(store.current.focus ?? 1);

      let chapter = 0;
      if (handoff > 0.5) {
        chapter = 1;
        CHAPTERS.forEach((entry, index) => {
          if (t >= entry.from) chapter = index + 1;
        });
      }
      if (chapter !== chapterRef.current) {
        chapterRef.current = chapter;
        if (labelRef.current) labelRef.current.textContent = chapter === 0 ? "Parcelle" : CHAPTERS[chapter - 1].label;
        if (counterRef.current) counterRef.current.textContent = `0${chapter + 1} / 0${TOTAL_CHAPTERS}`;
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
      className="house-photo pointer-events-none fixed z-[1] aspect-video w-[58vw] max-w-[1100px] max-md:left-1/2 max-md:top-[8vh] max-md:w-[135vw] max-md:-translate-x-1/2 md:right-[1vw] md:top-[15vh]"
      aria-hidden="true"
    >
      <div ref={dollyRef} className="house-photo-mask absolute inset-0 will-change-transform">
        {/* Acte 1 : parcelle réelle vue du ciel, contour tracé par-dessus. */}
        <div ref={aerialRef} className="absolute inset-0">
          <Image
            src="/house/parcelle.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 135vw, 58vw"
            unoptimized
            className="object-cover"
            priority
          />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 2688 1520"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <polygon ref={zoneRef} points={PARCEL_POINTS} fill="#C2562F" stroke="none" style={{ opacity: 0 }} />
            <polygon points={PARCEL_POINTS} stroke="rgba(255,255,255,0.55)" strokeWidth={13} />
            <polygon
              ref={outlineRef}
              points={PARCEL_POINTS}
              pathLength={1}
              stroke="#13213D"
              strokeWidth={7}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          </svg>
        </div>

        {/* Acte 2 : construction de la maison, tête de lecture pilotée par le scroll. */}
        <div ref={videoLayerRef} className="absolute inset-0" style={{ opacity: 0, visibility: "hidden" }}>
          {reduced ? (
            <Image src="/house/stage-5.webp" alt="" fill sizes="(max-width: 768px) 135vw, 58vw" unoptimized className="object-cover" />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
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
      </div>

      {/* Pastille de chapitre : même vocabulaire que le sélecteur d'état d'un configurateur. */}
      <div
        ref={pillRef}
        className="absolute left-1/2 top-[2%] flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2 text-[12px] font-medium text-white"
        style={{ background: "rgba(10, 14, 28, 0.92)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--terracotta)" }} />
        <span ref={labelRef}>Parcelle</span>
        <span ref={counterRef} className="tabular-nums opacity-60">01 / 07</span>
      </div>
    </div>
  );
}
