"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage en ms — sert à composer une entrée en cascade réelle
   * (chaque enfant révélé un peu après le précédent) plutôt qu'un
   * fade-in uniforme appliqué section par section. */
  delay?: number;
  variant?: "up" | "scale";
};

/**
 * Révélation au scroll basée sur IntersectionObserver. Le contenu reste
 * dans le DOM et l'arbre d'accessibilité dès le rendu serveur (seule
 * l'opacité/transform changent, jamais le layout) : pas de CLS, pas de
 * dépendance JS pour que le contenu existe.
 */
export function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const baseClass = variant === "scale" ? "reveal-scale" : "reveal";
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <div ref={ref} className={[baseClass, isVisible ? "is-visible" : "", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}
