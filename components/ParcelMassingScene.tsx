"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { useCadastralPalette } from "@/hooks/useCadastralPalette";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Étude de masse en fil de fer : volume constructible extrudé en
 * gradins (façon massing study BIM), posé sur une grille de
 * coordonnées coplanaire au contour de parcelle — un système 3D qui
 * prolonge le vocabulaire du plan cadastral plutôt qu'une maquette
 * "rendu architecte" qui le concurrencerait. Matériaux non éclairés
 * (MeshBasicMaterial) : pas d'ombres/PBR, juste de l'encre projetée
 * en volume. Projection orthographique et non perspective : les arêtes
 * parallèles du volume le restent à l'écran, ce qui est la signature
 * d'une axonométrie de planche technique — une caméra à fuite
 * perspective ramènerait le rendu vers la maquette d'architecte.
 * OrbitControls three.js branché à la main (pas de drei) pour garder
 * le chunk lazy le plus léger possible.
 */

extend({ OrbitControlsImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControlsImpl: ThreeElement<typeof OrbitControlsImpl>;
  }
}

const GRID_SIZE = 6;
const GRID_STEP = 0.4;

/* Élévation isométrique vraie : une caméra placée sur la diagonale
   (1,1,1) voit les trois axes sous 120°, soit un angle polaire de
   acos(1/√3) ≈ 54.74°. On verrouille cette élévation dans les
   contrôles (min = max) et on ne laisse libre que l'azimut : le
   volume tourne, mais la lecture reste axonométrique à tout instant. */
const ISO_POLAR = Math.acos(1 / Math.sqrt(3));

/* Cadrage de la planche : en projection orthographique, react-three-fiber
   dimensionne le frustum en pixels, donc un `zoom` fixe recadrerait le
   volume différemment selon la largeur du conteneur (et le rognerait sur
   mobile). On dérive le zoom de la taille du canvas pour garantir qu'une
   fenêtre monde constante reste visible, quel que soit le breakpoint. */
const WORLD_WIDTH = 9.2;
const WORLD_HEIGHT = 6.4;
const BASE_ZOOM = 60;

function CoordinateGrid({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const half = GRID_SIZE / 2;
    for (let i = -half; i <= half; i += GRID_STEP) {
      points.push(-half, 0, i, half, 0, i);
      points.push(i, 0, -half, i, 0, half);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.5} />
    </lineSegments>
  );
}

function ParcelFootprint({ color }: { color: string }) {
  // <line> JSX entre en conflit avec l'élément SVG global du DOM ;
  // on construit l'objet three.js directement, comme pour
  // HeightAnnotation ci-dessous.
  const line = useMemo(() => {
    const points = [
      new THREE.Vector3(-2.2, 0.004, -1.6),
      new THREE.Vector3(2.2, 0.004, -1.6),
      new THREE.Vector3(2.2, 0.004, 1.6),
      new THREE.Vector3(-2.2, 0.004, 1.6),
      new THREE.Vector3(-2.2, 0.004, -1.6),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }));
  }, [color]);

  return <primitive object={line} />;
}

type Volume = {
  size: [number, number, number];
  y: number;
};

function buildMassing(): Volume[] {
  const base: Volume = { size: [3.2, 1.6, 2.2], y: 0.8 };
  const mid: Volume = { size: [2.5, 1.4, 1.85], y: base.y + base.size[1] / 2 + 0.7 };
  const top: Volume = { size: [1.8, 1.05, 1.4], y: mid.y + mid.size[1] / 2 + 0.525 };
  return [base, mid, top];
}

function MassingVolume({ size, y, brand }: Volume & { brand: string }) {
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(...size), [size]);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(boxGeometry), [boxGeometry]);

  return (
    <group position={[0, y, 0]}>
      <mesh geometry={boxGeometry}>
        <meshBasicMaterial color={brand} transparent opacity={0.06} />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={brand} />
      </lineSegments>
    </group>
  );
}

function MassingVolumes({ brand }: { brand: string }) {
  const volumes = useMemo(() => buildMassing(), []);
  return (
    <group>
      {volumes.map((volume, i) => (
        <MassingVolume key={i} {...volume} brand={brand} />
      ))}
    </group>
  );
}

function HeightAnnotation({ color }: { color: string }) {
  // Ligne de rappel pointillée façon cote d'altitude ("H max"),
  // seule touche terre-cuite du volume — réservée à la mesure.
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(1.6, 0, 1.2),
      new THREE.Vector3(1.6, 4.075, 1.2),
    ]);
    const material = new THREE.LineDashedMaterial({ color, dashSize: 0.08, gapSize: 0.06 });
    const object = new THREE.Line(geometry, material);
    object.computeLineDistances();
    return object;
  }, [color]);

  return <primitive object={line} />;
}

/* Le cadrage est appliqué en mettant la scène à l'échelle, pas en
   écrivant `camera.zoom` : muter un objet renvoyé par un hook est
   refusé par react-hooks/immutability (React Compiler), et une
   homothétie uniforme sous projection orthographique donne exactement
   le même résultat à l'écran qu'un changement de zoom. */
function FittedScene({ children }: { children: ReactNode }) {
  const size = useThree((state) => state.size);
  const scale = Math.min(size.width / WORLD_WIDTH, size.height / WORLD_HEIGHT) / BASE_ZOOM;

  return <group scale={scale}>{children}</group>;
}

function AutoRotateRig({ enabled }: { enabled: boolean }) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, gl } = useThree();

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.autoRotate = enabled;
    controls.autoRotateSpeed = 1.1;
    controls.update();
  });

  return (
    <orbitControlsImpl
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={ISO_POLAR}
      maxPolarAngle={ISO_POLAR}
    />
  );
}

export function ParcelMassingScene() {
  const palette = useCadastralPalette();
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [7, 7, 7], zoom: BASE_ZOOM, near: -50, far: 200 }}
      style={{ touchAction: "none" }}
    >
      <FittedScene>
        <group position={[0, -1.9, 0]}>
          <CoordinateGrid color={palette.grid} />
          <ParcelFootprint color={palette.line} />
          <MassingVolumes brand={palette.brand} />
          <HeightAnnotation color={palette.terracotta} />
        </group>
      </FittedScene>
      <AutoRotateRig enabled={!reducedMotion} />
    </Canvas>
  );
}
