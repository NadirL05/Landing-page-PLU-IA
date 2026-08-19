"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { isWebglAvailable } from "@/lib/webgl";

const ParcelMassingScene = dynamic(
  () => import("@/components/ParcelMassingScene").then((mod) => mod.ParcelMassingScene),
  { ssr: false }
);

/**
 * Monte le canvas three.js uniquement quand il entre dans le viewport
 * (budget perf landing) et seulement si WebGL est disponible — sinon
 * la grille de fond (.grid-paper, déjà posée par le parent) sert de
 * repli silencieux, sans bloquer le LCP ni casser la mise en page.
 */
export function ParcelVolumeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [webglOk] = useState(() => isWebglAvailable());

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldMount) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldMount && webglOk ? <ParcelMassingScene /> : null}
    </div>
  );
}
