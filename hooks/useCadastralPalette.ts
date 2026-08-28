"use client";

import { useEffect, useState } from "react";

export interface CadastralPalette {
  brand: string;
  terracotta: string;
  grid: string;
  line: string;
  /** Socle de parcelle : surface mate légèrement plus froide que le fond. */
  surface: string;
  /** Volumes bâtis "clay" : quasi-blanc satiné qui prend la lumière. */
  volume: string;
  /** Teinte des ombres de contact (plans dégradés sous les volumes). */
  shadow: string;
}

const LIGHT_PALETTE: CadastralPalette = {
  brand: "#1d3a6e",
  terracotta: "#b5502e",
  grid: "#c7d0dc",
  line: "#8fa0b5",
  surface: "#e9edf4",
  volume: "#fbfcfe",
  shadow: "#25324a",
};

const DARK_PALETTE: CadastralPalette = {
  brand: "#85a6e8",
  terracotta: "#e08a5c",
  grid: "#3a4658",
  line: "#4a5568",
  surface: "#2b3549",
  volume: "#48566f",
  shadow: "#05070d",
};

/**
 * Palette encre-cadastre approximée pour le rendu three.js (Color.setStyle
 * ne comprend pas oklch()). Suit le même arbitrage clair/sombre que
 * app/globals.css : attribut data-theme explicite en priorité, sinon
 * prefers-color-scheme système.
 */
function resolveIsDark(): boolean {
  if (typeof document === "undefined") return false;
  const root = document.documentElement;
  const explicit = root.getAttribute("data-theme");
  if (explicit === "dark") return true;
  if (explicit === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useCadastralPalette(): CadastralPalette {
  const [isDark, setIsDark] = useState(resolveIsDark);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setIsDark(resolveIsDark());

    media.addEventListener("change", update);
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return isDark ? DARK_PALETTE : LIGHT_PALETTE;
}
