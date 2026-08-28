"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCadastralPalette, type CadastralPalette } from "@/hooks/useCadastralPalette";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Maquette volumétrique satinée : un socle de parcelle et quatre
 * volumes bâtis aux arêtes adoucies (chanfrein d'extrusion), en
 * matériaux MeshStandardMaterial éclairés par une lumière douce —
 * un objet produit "clay render" posé sur fond clair, pas une
 * planche technique en fil de fer.
 *
 * Trois partis pris tiennent l'écart avec la version précédente :
 * 1. La caméra n'est plus verrouillée sur l'isométrie vraie (angles
 *    à 120°, symétrie parfaite). Une élévation plus basse et un
 *    azimut désaxé donnent une lecture d'objet, pas d'axonométrie.
 * 2. Les ombres sont des plans dégradés (texture radiale générée en
 *    canvas), pas des shadow maps : plus douces à peu de frais, et
 *    aucun frustum d'ombre à recadrer sur un volume qui grandit.
 * 3. Le rendu est en `frameloop="demand"` : plus aucune image n'est
 *    calculée en continu. Seuls le scroll et l'entrée initiale
 *    demandent des frames, et `prefers-reduced-motion` ramène la
 *    scène à un unique rendu statique.
 *
 * La projection reste orthographique et le cadrage dérivé de la
 * taille du canvas (cf. FittedScene) : c'est ce qui garantit qu'une
 * fenêtre monde constante reste visible de 320px à 1920px sans
 * rogner le volume.
 */

/* Fenêtre monde visible, en unités de scène. Dimensionnée sur la
   diagonale du socle (7.6 × 5.6) plus la marge nécessaire à la
   rotation au scroll : sur-dimensionner ne coûte qu'un objet un peu
   plus petit, sous-dimensionner rogne le volume sur mobile. */
const WORLD_WIDTH = 11.2;
const WORLD_HEIGHT = 8.4;
const BASE_ZOOM = 60;

const ENTRANCE_MS = 1100;
/* Le hero occupe le haut de page : la course de scroll utile est
   inférieure à une hauteur d'écran. */
const SCROLL_RANGE_RATIO = 0.85;

const SLAB = { w: 7.6, d: 5.6, h: 0.36, radius: 0.5 };

type BlockTone = "volume" | "brand" | "terracotta";

type Block = {
  /** Empreinte au sol et hauteur du volume. */
  w: number;
  d: number;
  h: number;
  /** Position du centre de l'empreinte sur le socle. */
  x: number;
  z: number;
  /** Base du volume, mesurée depuis le dessus du socle. */
  base: number;
  /** Index du volume porteur : la base suit alors sa croissance. */
  ridesOn?: number;
  radius: number;
  tone: BlockTone;
  /** Départ de l'animation d'extrusion, en fraction de l'entrée. */
  delay: number;
  /** Glissement latéral au scroll (fraction de la position). */
  drift: number;
};

/* Composition volontairement asymétrique : un corps principal en
   navy, deux ailes en clay quasi-blanc, une casquette terre-cuite
   fine en unique accent chaud. Le ratio (1 navy + 1 filet
   terre-cuite pour 3 surfaces claires) est ce qui fait lire un
   rendu matière plutôt qu'un schéma colorié. */
const BLOCKS: Block[] = [
  { w: 3.3, d: 2.5, h: 1.15, x: -1.5, z: 0.7, base: 0, radius: 0.12, tone: "volume", delay: 0.1, drift: 0.09 },
  { w: 2.25, d: 2.15, h: 3.05, x: 0.7, z: -0.45, base: 0, radius: 0.14, tone: "brand", delay: 0, drift: 0.03 },
  { w: 1.85, d: 1.45, h: 0.72, x: 2.05, z: 1.5, base: 0, radius: 0.1, tone: "volume", delay: 0.22, drift: 0.14 },
  { w: 2.45, d: 2.35, h: 0.17, x: 0.7, z: -0.45, base: 3.05, ridesOn: 1, radius: 0.06, tone: "terracotta", delay: 0.42, drift: 0.03 },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function toneColor(tone: BlockTone, palette: CadastralPalette): string {
  if (tone === "brand") return palette.brand;
  if (tone === "terracotta") return palette.terracotta;
  return palette.volume;
}

/**
 * Boîte à arêtes adoucies sans dépendance supplémentaire : une
 * silhouette rectangulaire à coins arrondis, extrudée avec chanfrein.
 * ExtrudeGeometry n'est pas centrée (l'extrusion part de z = 0 et le
 * chanfrein déborde de `bevel`) — on la recale pour que la base du
 * volume tombe exactement sur y = 0, sinon chaque bloc doit être
 * repositionné à la main.
 */
function createRoundedBoxGeometry(w: number, d: number, h: number, radius: number): THREE.BufferGeometry {
  const bevel = Math.min(0.05, h / 4);
  const r = Math.min(radius, w / 2 - 0.01, d / 2 - 0.01);
  const shape = new THREE.Shape();
  const x0 = -w / 2;
  const y0 = -d / 2;

  shape.moveTo(x0 + r, y0);
  shape.lineTo(x0 + w - r, y0);
  shape.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r);
  shape.lineTo(x0 + w, y0 + d - r);
  shape.quadraticCurveTo(x0 + w, y0 + d, x0 + w - r, y0 + d);
  shape.lineTo(x0 + r, y0 + d);
  shape.quadraticCurveTo(x0, y0 + d, x0, y0 + d - r);
  shape.lineTo(x0, y0 + r);
  shape.quadraticCurveTo(x0, y0, x0 + r, y0);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(h - 2 * bevel, 0.01),
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    // Plafonné : quatre volumes arrondis à segments élevés feraient
    // exploser le nombre de sommets pour un gain invisible à l'écran.
    bevelSegments: 2,
    curveSegments: 8,
  });

  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, bevel, 0);
  geometry.computeVertexNormals();
  return geometry;
}

/** Tache radiale douce servant d'ombre portée, générée une fois en 2D. */
function createShadowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function ContactShadow({
  color,
  width,
  depth,
  y,
  x = 0,
  z = 0,
  opacity,
}: {
  color: string;
  width: number;
  depth: number;
  y: number;
  x?: number;
  z?: number;
  opacity: number;
}) {
  const texture = useMemo(() => createShadowTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial
        map={texture}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/* Homothétie plutôt que `camera.zoom` : muter un objet renvoyé par un
   hook est refusé par react-hooks/immutability (React Compiler), et
   sous projection orthographique une mise à l'échelle uniforme donne
   exactement le même résultat à l'écran. */
function FittedScene({ children }: { children: ReactNode }) {
  const size = useThree((state) => state.size);
  const scale = Math.min(size.width / WORLD_WIDTH, size.height / WORLD_HEIGHT) / BASE_ZOOM;

  return <group scale={scale}>{children}</group>;
}

/**
 * Progression de lecture du hero, bornée à [0,1]. Basée sur le scroll
 * document plutôt que sur un IntersectionObserver : la maquette est
 * au-dessus de la ligne de flottaison, donc ce qu'on veut n'est pas
 * "est-elle visible" (elle l'est dès le chargement) mais "où en est
 * l'utilisateur dans la traversée du hero".
 */
function readScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  const range = Math.max(window.innerHeight * SCROLL_RANGE_RATIO, 1);
  return clamp01(window.scrollY / range);
}

function Massing({ palette, reducedMotion }: { palette: CadastralPalette; reducedMotion: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  const groupRef = useRef<THREE.Group>(null);
  const blockRefs = useRef<(THREE.Mesh | null)[]>([]);
  const entrance = useRef(reducedMotion ? 1 : 0);
  const scroll = useRef(0);

  const slabGeometry = useMemo(
    () => createRoundedBoxGeometry(SLAB.w, SLAB.d, SLAB.h, SLAB.radius),
    []
  );
  const blockGeometries = useMemo(
    () => BLOCKS.map((block) => createRoundedBoxGeometry(block.w, block.d, block.h, block.radius)),
    []
  );

  useEffect(() => {
    const geometries = [slabGeometry, ...blockGeometries];
    return () => geometries.forEach((geometry) => geometry.dispose());
  }, [slabGeometry, blockGeometries]);

  // Entrée : extrusion progressive des volumes depuis le socle.
  useEffect(() => {
    if (reducedMotion) {
      entrance.current = 1;
      invalidate();
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const tick = () => {
      const t = clamp01((performance.now() - start) / ENTRANCE_MS);
      entrance.current = t;
      invalidate();
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, invalidate]);

  // Mouvement piloté par le scroll — aucune rotation automatique.
  useEffect(() => {
    if (reducedMotion) {
      scroll.current = 0;
      invalidate();
      return undefined;
    }

    /* La page est longue : une fois la progression saturée à 1, plus
       rien ne bouge dans la scène. On ne redemande donc une image que
       si la valeur a réellement changé, sinon on paierait un rendu
       WebGL par événement de scroll jusqu'au footer. */
    const update = () => {
      const next = readScrollProgress();
      if (next === scroll.current) return;
      scroll.current = next;
      invalidate();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion, invalidate]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const p = scroll.current;
    const e = easeOutCubic(entrance.current);

    /* Le scroll fait pivoter et redresser légèrement l'ensemble : la
       maquette se lit sous un angle qui évolue à mesure qu'on
       traverse le hero, au lieu de tourner toute seule en boucle. */
    group.rotation.y = -0.12 + p * 0.34;
    group.position.y = -1.55 + p * 0.22 + (1 - e) * -0.25;
    const settle = 0.94 + 0.06 * e;
    group.scale.setScalar(settle);

    /* Facteur d'extrusion de chaque volume, calculé d'abord : la
       casquette terre-cuite repose sur le corps principal et doit
       suivre SA croissance, pas la sienne — sinon elle traverse le
       volume porteur pendant l'entrée. */
    const grow = BLOCKS.map((block) => {
      const local = easeOutCubic(clamp01((entrance.current - block.delay) / (1 - block.delay)));
      // scaleY = 0 produirait des normales dégénérées : on part de 2%.
      return 0.02 + 0.98 * local;
    });

    BLOCKS.forEach((block, index) => {
      const mesh = blockRefs.current[index];
      if (!mesh) return;

      const carrier = block.ridesOn;
      const base =
        carrier === undefined ? block.base * grow[index] : BLOCKS[carrier].h * grow[carrier];

      mesh.scale.y = grow[index];
      // Les volumes glissent légèrement vers l'extérieur au scroll.
      mesh.position.x = block.x * (1 + p * block.drift);
      mesh.position.z = block.z * (1 + p * block.drift);
      mesh.position.y = SLAB.h + base;
    });
  });

  return (
    <group ref={groupRef}>
      <ContactShadow
        color={palette.shadow}
        width={SLAB.w * 1.45}
        depth={SLAB.d * 1.45}
        y={-0.02}
        z={0.35}
        opacity={0.16}
      />

      <mesh geometry={slabGeometry}>
        <meshStandardMaterial color={palette.surface} roughness={0.72} metalness={0.02} />
      </mesh>

      <ContactShadow
        color={palette.shadow}
        width={5.6}
        depth={4.4}
        y={SLAB.h + 0.006}
        x={0.35}
        z={0.6}
        opacity={0.22}
      />

      {BLOCKS.map((block, index) => (
        <mesh
          key={`${block.tone}-${index}`}
          ref={(mesh) => {
            blockRefs.current[index] = mesh;
          }}
          geometry={blockGeometries[index]}
          position={[block.x, SLAB.h + block.base, block.z]}
        >
          <meshStandardMaterial
            color={toneColor(block.tone, palette)}
            roughness={block.tone === "volume" ? 0.55 : 0.42}
            metalness={0.03}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Un rendu est demandé au montage : en mode `demand`, rien ne peint sans lui. */
function InitialFrame() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => invalidate(), [invalidate]);
  return null;
}

export function ParcelMassingScene() {
  const palette = useCadastralPalette();
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      orthographic
      frameloop="demand"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      /* Élévation ~30° et azimut ~37° : volontairement à côté de
         l'isométrie vraie (35.26° / 45°, angles égaux à 120° à
         l'écran). C'est cette symétrie parfaite, plus que les
         matériaux, qui faisait lire une planche technique — un point
         de vue désaxé lit comme un objet photographié. */
      camera={{ position: [9, 8.5, 12], zoom: BASE_ZOOM, near: -80, far: 200 }}
    >
      <hemisphereLight args={[palette.volume, palette.surface, 1.15]} />
      <directionalLight position={[-6, 9, 7]} intensity={1.5} />
      <directionalLight position={[7, 4, -5]} intensity={0.35} />

      <FittedScene>
        <Massing palette={palette} reducedMotion={reducedMotion} />
      </FittedScene>
      <InitialFrame />
    </Canvas>
  );
}
