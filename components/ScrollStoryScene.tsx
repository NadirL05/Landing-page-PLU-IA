"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCadastralPalette, type CadastralPalette } from "@/hooks/useCadastralPalette";

/**
 * Scène de l'« histoire au scroll » : une parcelle se dessine, sa zone
 * se colore, puis l'enveloppe constructible monte. Toute l'animation
 * est une fonction pure de `store.progress` (0 → 1) : aucune horloge,
 * aucune timeline — c'est ce qui rend le rendu rejouable à la
 * demande (scroll, capture vidéo image par image, reduced-motion).
 *
 * `frameloop="demand"` : une image n'est calculée que lorsque le scroll
 * le demande (subscribe → invalidate).
 */

export type StoryStore = {
  progress: number;
};

type Subscribe = (listener: () => void) => () => void;

const PARCEL: Array<[number, number]> = [
  [-3.0, -2.2],
  [2.6, -2.6],
  [3.4, 1.2],
  [0.6, 2.7],
  [-3.2, 1.6],
];

const ENVELOPE_HEIGHT = 2.4;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Progression locale d'un segment [from, to] du scroll, adoucie. */
const segment = (p: number, from: number, to: number) => easeInOutCubic(clamp01((p - from) / (to - from)));

/** Générateur pseudo-aléatoire déterministe : le voisinage ne bouge pas d'un rendu à l'autre. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

type StoryObjects = {
  root: THREE.Group;
  neighbours: THREE.Mesh[];
  edges: THREE.Mesh[];
  zone: THREE.Mesh;
  envelope: THREE.Mesh;
  roof: THREE.Mesh;
  dispose: () => void;
};

function buildObjects(palette: CadastralPalette): StoryObjects {
  const root = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  // Voisinage : volumes clairs qui montent en premier, pour que la
  // parcelle se lise comme un vide dans le tissu bâti.
  const neighbourMaterial = track(new THREE.MeshStandardMaterial({ color: palette.volume, roughness: 0.92 }));
  const random = seeded(7);
  const neighbours: THREE.Mesh[] = [];
  for (let i = 0; i < 46; i += 1) {
    const x = (random() - 0.5) * 34;
    const z = (random() - 0.5) * 26;
    const w = 1 + random() * 2.2;
    const d = 1 + random() * 2.2;
    const h = 0.5 + random() * 2.4;
    if (Math.abs(x) < 6.4 && Math.abs(z) < 5.4) continue;
    const mesh = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), neighbourMaterial);
    mesh.position.set(x, h / 2, z);
    mesh.userData.height = h;
    neighbours.push(mesh);
    root.add(mesh);
  }

  // Limites de la parcelle : une arête = une boîte fine qui s'étire.
  const edgeMaterial = track(new THREE.MeshBasicMaterial({ color: palette.brand }));
  const points = PARCEL.map(([x, y]) => new THREE.Vector3(x, 0.03, -y));
  const edges: THREE.Mesh[] = [];
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const length = a.distanceTo(b);
    const edge = new THREE.Mesh(track(new THREE.BoxGeometry(length, 0.06, 0.09)), edgeMaterial);
    edge.position.copy(a).add(b).multiplyScalar(0.5);
    edge.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x);
    edge.scale.x = 0.001;
    edges.push(edge);
    root.add(edge);
  }

  // Zone réglementaire : aplat terre-cuite qui apparaît sous les limites.
  const shape = new THREE.Shape(PARCEL.map(([x, y]) => new THREE.Vector2(x, y)));
  const zone = new THREE.Mesh(
    track(new THREE.ShapeGeometry(shape)),
    track(new THREE.MeshBasicMaterial({ color: palette.terracotta, transparent: true, opacity: 0, side: THREE.DoubleSide }))
  );
  zone.rotation.x = -Math.PI / 2;
  zone.position.y = 0.01;
  root.add(zone);

  // Enveloppe constructible : la parcelle réduite (retraits), extrudée.
  const inset = new THREE.Shape(PARCEL.map(([x, y]) => new THREE.Vector2(x * 0.74, y * 0.74)));
  const envelope = new THREE.Mesh(
    track(new THREE.ExtrudeGeometry(inset, { depth: 1, bevelEnabled: false })),
    track(new THREE.MeshStandardMaterial({ color: palette.brand, roughness: 0.55, metalness: 0.05 }))
  );
  envelope.rotation.x = -Math.PI / 2;
  envelope.scale.z = 0.001;
  envelope.visible = false;
  root.add(envelope);

  const roof = new THREE.Mesh(
    track(new THREE.ShapeGeometry(inset)),
    track(new THREE.MeshBasicMaterial({ color: palette.terracotta, side: THREE.DoubleSide }))
  );
  roof.rotation.x = -Math.PI / 2;
  roof.visible = false;
  root.add(roof);

  return {
    root,
    neighbours,
    edges,
    zone,
    envelope,
    roof,
    dispose: () => disposables.forEach((item) => item.dispose()),
  };
}

/** Pose la scène pour une progression donnée. Hors composant : ces mutations
 * d'objets three.js sont le fonctionnement normal de R3F dans useFrame. */
function applyProgress(objects: StoryObjects, camera: THREE.Camera, progress: number) {
  const p = clamp01(progress);

  // Caméra : survol aérien → orbite oblique plus basse.
  const orbit = -0.55 + p * 1.15;
  const distance = 26 - segment(p, 0.55, 1) * 6;
  const height = 22 - segment(p, 0, 0.4) * 9 - segment(p, 0.4, 1);
  camera.position.set(Math.sin(orbit) * distance, height, Math.cos(orbit) * distance);
  camera.lookAt(0, segment(p, 0.5, 0.9) * 0.8, 0);

  const rise = Math.max(0.001, segment(p, 0, 0.25));
  objects.neighbours.forEach((mesh) => {
    mesh.scale.y = rise;
    mesh.position.y = (mesh.userData.height as number) * 0.5 * rise;
  });

  const draw = segment(p, 0.04, 0.3);
  objects.edges.forEach((edge, index) => {
    edge.scale.x = Math.max(0.001, clamp01(draw * objects.edges.length - index));
  });

  (objects.zone.material as THREE.MeshBasicMaterial).opacity = 0.32 * segment(p, 0.32, 0.5);

  const extrusion = segment(p, 0.52, 0.8);
  objects.envelope.visible = extrusion > 0.01;
  objects.envelope.scale.z = Math.max(0.001, extrusion * ENVELOPE_HEIGHT);
  objects.roof.visible = extrusion > 0.01;
  objects.roof.position.y = extrusion * ENVELOPE_HEIGHT + 0.02;
}

function Story({ store, subscribe }: { store: { current: StoryStore }; subscribe: Subscribe }) {
  const palette = useCadastralPalette();
  const objects = useMemo(() => buildObjects(palette), [palette]);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => () => objects.dispose(), [objects]);
  useEffect(() => subscribe(() => invalidate()), [subscribe, invalidate]);
  useEffect(() => invalidate(), [objects, invalidate]);

  useFrame(({ camera }) => applyProgress(objects, camera, store.current.progress));

  return (
    <>
      <color attach="background" args={[palette.volume]} />
      <ambientLight intensity={1.7} />
      <directionalLight position={[-6, 12, 8]} intensity={1.3} />
      <gridHelper args={[60, 60, palette.line, palette.grid]} position={[0, 0, 0]} />
      <primitive object={objects.root} />
    </>
  );
}

export function ScrollStoryScene({ store, subscribe }: { store: { current: StoryStore }; subscribe: Subscribe }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ fov: 32, near: 0.1, far: 200, position: [0, 22, 26] }}
      gl={{ antialias: true }}
    >
      <Story store={store} subscribe={subscribe} />
    </Canvas>
  );
}
