"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCadastralPalette, type CadastralPalette } from "@/hooks/useCadastralPalette";

/**
 * Premier acte de la page : une parcelle se dessine au milieu du tissu bâti,
 * sa zone se colore, puis l'enveloppe constructible apparaît. La maison
 * photoréaliste prend ensuite le relais (components/HousePhotoStack.tsx), le
 * canvas étant alors estompé par PageScene.
 *
 * Toute l'animation est une fonction pure de `store.progress` (0 → 1) :
 * aucune horloge, donc rejouable à la demande (scroll, capture vidéo image
 * par image, reduced-motion). `frameloop="demand"` : une image n'est calculée
 * que lorsque le scroll le demande (subscribe → invalidate).
 */

/** `focus` (0 → 1) : proximité d'une pause de scène, pour n'afficher les pastilles qu'à ce moment-là. */
export type SceneStore = { progress: number; focus?: number };
type Subscribe = (listener: () => void) => () => void;

/* Parcelle : coordonnées de plan (x, y). Dans le monde, z = -y. */
const PARCEL: Array<[number, number]> = [
  [-4.2, -3.0],
  [3.6, -3.5],
  [4.6, 1.6],
  [0.8, 3.6],
  [-4.4, 2.2],
];

const ENVELOPE_HEIGHT = 3.2;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Progression locale d'un segment [from, to], adoucie. */
const segment = (p: number, from: number, to: number) => easeInOut(clamp01((p - from) / (to - from)));

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

type Rig = {
  root: THREE.Group;
  neighbours: THREE.Group[];
  edges: THREE.Mesh[];
  zone: THREE.Mesh;
  envelope: THREE.Group;
  dispose: () => void;
};

function buildRig(palette: CadastralPalette): Rig {
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };
  const shadowed = (mesh: THREE.Mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };
  const box = (w: number, h: number, d: number, material: THREE.Material) => {
    const geo = track(new THREE.BoxGeometry(w, h, d));
    geo.translate(0, h / 2, 0);
    return shadowed(new THREE.Mesh(geo, material));
  };

  const root = new THREE.Group();

  // Voisinage : petites maisons d'argile qui montent.
  const clay = track(new THREE.MeshStandardMaterial({ color: palette.volume, roughness: 0.95 }));
  const clayRoof = track(new THREE.MeshStandardMaterial({ color: palette.surface, roughness: 0.95 }));
  const random = seeded(7);
  const neighbours: THREE.Group[] = [];
  for (let i = 0; i < 40; i += 1) {
    const x = (random() - 0.5) * 38;
    const z = (random() - 0.5) * 30;
    const w = 1.4 + random() * 1.8;
    const d = 1.4 + random() * 1.6;
    const h = 0.9 + random() * 1.0;
    if (Math.abs(x) < 7.4 && Math.abs(z) < 6.2) continue;
    const group = new THREE.Group();
    group.add(box(w, h, d, clay));
    const roofShape = new THREE.Shape([new THREE.Vector2(-d / 2, 0), new THREE.Vector2(d / 2, 0), new THREE.Vector2(0, h * 0.55)]);
    const roofGeo = track(new THREE.ExtrudeGeometry(roofShape, { depth: w + 0.2, bevelEnabled: false }));
    roofGeo.translate(0, 0, -(w + 0.2) / 2);
    roofGeo.rotateY(Math.PI / 2);
    const roof = shadowed(new THREE.Mesh(roofGeo, clayRoof));
    roof.position.y = h;
    group.add(roof);
    group.position.set(x, 0, z);
    group.rotation.y = random() > 0.5 ? 0 : Math.PI / 2;
    group.userData.delay = Math.min(0.05, Math.hypot(x, z) / 600);
    group.scale.y = 0.001;
    neighbours.push(group);
    root.add(group);
  }

  // Limites de la parcelle : une arête = une boîte fine qui s'étire.
  const edgeMaterial = track(new THREE.MeshBasicMaterial({ color: palette.brand }));
  const points = PARCEL.map(([x, y]) => new THREE.Vector3(x, 0.04, -y));
  const edges: THREE.Mesh[] = [];
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const edge = new THREE.Mesh(track(new THREE.BoxGeometry(a.distanceTo(b), 0.05, 0.1)), edgeMaterial);
    edge.position.copy(a).add(b).multiplyScalar(0.5);
    edge.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x);
    edge.scale.x = 0.001;
    edges.push(edge);
    root.add(edge);
  }

  // Zone réglementaire : aplat terre-cuite sous les limites.
  const parcelShape = new THREE.Shape(PARCEL.map(([x, y]) => new THREE.Vector2(x, y)));
  const zone = new THREE.Mesh(
    track(new THREE.ShapeGeometry(parcelShape)),
    track(new THREE.MeshBasicMaterial({ color: palette.terracotta, transparent: true, opacity: 0, side: THREE.DoubleSide }))
  );
  zone.rotation.x = -Math.PI / 2;
  zone.position.y = 0.012;
  root.add(zone);

  // Enveloppe constructible : volume translucide + arêtes.
  const envelope = new THREE.Group();
  const insetShape = new THREE.Shape(PARCEL.map(([x, y]) => new THREE.Vector2(x * 0.88, y * 0.88)));
  const envGeo = track(new THREE.ExtrudeGeometry(insetShape, { depth: 1, bevelEnabled: false }));
  const envFill = new THREE.Mesh(
    envGeo,
    track(new THREE.MeshBasicMaterial({ color: palette.brand, transparent: true, opacity: 0.1, depthWrite: false }))
  );
  const envLines = new THREE.LineSegments(
    track(new THREE.EdgesGeometry(envGeo)),
    track(new THREE.LineBasicMaterial({ color: palette.brand, transparent: true, opacity: 0.6 }))
  );
  envelope.add(envFill, envLines);
  envelope.rotation.x = -Math.PI / 2;
  envelope.scale.z = 0.001;
  envelope.visible = false;
  root.add(envelope);

  return {
    root,
    neighbours,
    edges,
    zone,
    envelope,
    dispose: () => disposables.forEach((item) => item.dispose()),
  };
}

/* Poses de caméra : [progression, azimut (rad), élévation (rad), distance, hauteur de visée]. */
const CAMERA_KEYS: Array<[number, number, number, number, number]> = [
  [0.1, -0.9, 0.96, 31, 0],
  [0.3, -0.72, 0.74, 25, 0.4],
  [1, -0.6, 0.6, 22, 0.6],
];

function cameraPose(p: number) {
  if (p <= CAMERA_KEYS[0][0]) return CAMERA_KEYS[0];
  for (let i = 1; i < CAMERA_KEYS.length; i += 1) {
    const [p1, ...b] = CAMERA_KEYS[i];
    const [p0, ...a] = CAMERA_KEYS[i - 1];
    if (p <= p1) {
      const t = easeInOut(clamp01((p - p0) / (p1 - p0)));
      return [p, ...a.map((value, index) => value + (b[index] - value) * t)] as [number, number, number, number, number];
    }
  }
  return CAMERA_KEYS[CAMERA_KEYS.length - 1];
}

/** Pose la scène pour une progression donnée. Hors composant : ces mutations
 * d'objets three.js sont le fonctionnement normal de R3F dans useFrame. */
function applyProgress(rig: Rig, camera: THREE.Camera, progress: number) {
  const p = clamp01(progress);

  const [, azimuth, elevation, distance, targetY] = cameraPose(p);
  camera.position.set(
    Math.sin(azimuth) * distance * Math.cos(elevation),
    Math.sin(elevation) * distance + targetY,
    Math.cos(azimuth) * distance * Math.cos(elevation)
  );
  camera.lookAt(0, targetY, 0);

  rig.neighbours.forEach((group) => {
    const delay = group.userData.delay as number;
    group.scale.y = Math.max(0.001, segment(p, delay, 0.1 + delay));
  });

  const draw = segment(p, 0.0, 0.1);
  rig.edges.forEach((edge, index) => {
    edge.scale.x = Math.max(0.001, clamp01(draw * rig.edges.length - index));
  });

  (rig.zone.material as THREE.MeshBasicMaterial).opacity = 0.34 * segment(p, 0.08, 0.2);

  const envelopeIn = segment(p, 0.18, 0.3);
  rig.envelope.visible = envelopeIn > 0.01;
  rig.envelope.scale.z = Math.max(0.001, envelopeIn * ENVELOPE_HEIGHT);
}

/** Cadrage selon l'écran : à droite du texte sur grand écran, dézoomé et
 * remonté sur mobile (les légendes sont ancrées en bas de l'écran). */
function shiftView(camera: THREE.Camera, width: number, height: number) {
  if (!(camera instanceof THREE.PerspectiveCamera)) return;
  const mobile = width < 768;
  camera.zoom = mobile ? 0.72 : 1;
  if (width >= 1024) camera.setViewOffset(width, height, -width * 0.13, 0, width, height);
  else if (mobile) camera.setViewOffset(width, height, 0, height * 0.16, width, height);
  else camera.clearViewOffset();
  camera.updateProjectionMatrix();
}

function Story({ store, subscribe }: { store: { current: SceneStore }; subscribe: Subscribe }) {
  const palette = useCadastralPalette();
  const rig = useMemo(() => buildRig(palette), [palette]);
  const invalidate = useThree((state) => state.invalidate);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => () => rig.dispose(), [rig]);
  useEffect(() => subscribe(() => invalidate()), [subscribe, invalidate]);
  useEffect(() => invalidate(), [rig, invalidate]);
  useEffect(() => {
    shiftView(camera, size.width, size.height);
    invalidate();
  }, [camera, size.width, size.height, invalidate]);

  useFrame(({ camera: activeCamera }) => applyProgress(rig, activeCamera, store.current.progress));

  return (
    <>
      <hemisphereLight args={["#ffffff", "#dcd5c6", 1.05]} />
      <directionalLight
        position={[-9, 15, 11]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0006}
      />
      <gridHelper args={[70, 70, palette.line, palette.grid]} />
      <mesh rotation-x={-Math.PI / 2} position-y={0.005} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      <primitive object={rig.root} />
    </>
  );
}

export function PageHouseScene({ store, subscribe }: { store: { current: SceneStore }; subscribe: Subscribe }) {
  return (
    <Canvas
      flat
      shadows="soft"
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ fov: 30, near: 0.1, far: 220, position: [0, 20, 26] }}
      gl={{ antialias: true, alpha: true }}
    >
      <Story store={store} subscribe={subscribe} />
    </Canvas>
  );
}
