"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCadastralPalette, type CadastralPalette } from "@/hooks/useCadastralPalette";

/**
 * Scène fixe derrière toute la page : une parcelle se dessine, sa zone se
 * colore, l'enveloppe constructible apparaît, puis une maison se construit
 * (plinthe, murs, toit, ouvertures, abords). Toute l'animation est une
 * fonction pure de `store.progress` (0 → 1) : aucune horloge, donc rejouable
 * à la demande (scroll, capture vidéo image par image, reduced-motion).
 *
 * `frameloop="demand"` : une image n'est calculée que lorsque le scroll le
 * demande (subscribe → invalidate).
 */

export type SceneStore = { progress: number };
type Subscribe = (listener: () => void) => () => void;

/* Parcelle : coordonnées de plan (x, y). Dans le monde, z = -y, donc la
   façade de la maison (+z) regarde le bord « bas » du plan. */
const PARCEL: Array<[number, number]> = [
  [-4.2, -3.0],
  [3.6, -3.5],
  [4.6, 1.6],
  [0.8, 3.6],
  [-4.4, 2.2],
];

/* Dimensions de la maison (unités de scène ≈ mètres). */
const PLINTH = 0.22;
const WALL_H = 2.3;
const BODY = { w: 4.2, d: 3.0, x: 0.6 };
const GARAGE = { w: 2.0, d: 2.6, h: 1.7, x: -2.6, z: -0.2 };
const ROOF_RISE = 1.25;
const ENVELOPE_HEIGHT = 4.3;

const COLORS = {
  wall: "#f3eee3",
  plinth: "#c8c1b2",
  roof: "#b5502e",
  roofDark: "#8c3d22",
  chimney: "#9a5238",
  glass: "#2a4a80",
  frame: "#fbf9f4",
  door: "#13213d",
  garageDoor: "#a7b1c0",
  groove: "#7f8a9b",
  wood: "#d3b68a",
  lawn: "#c9d8bd",
  leaf: "#8fa987",
  leafDark: "#7a9673",
  trunk: "#8a6a4e",
  road: "#d9d5cb",
  hedge: "#86a07f",
  brass: "#c9a24a",
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
/** Progression locale d'un segment [from, to], adoucie. */
const segment = (p: number, from: number, to: number) => easeInOut(clamp01((p - from) / (to - from)));
const linear = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

type Timed = { obj: THREE.Object3D; from: number; to: number; kind: "pop" | "rise" | "slab" };

type Rig = {
  root: THREE.Group;
  neighbours: THREE.Group[];
  edges: THREE.Mesh[];
  zone: THREE.Mesh;
  lawn: THREE.Mesh;
  envelope: THREE.Group;
  envelopeMaterials: THREE.Material[];
  roofGroup: THREE.Group;
  timed: Timed[];
  dispose: () => void;
};

function buildRig(palette: CadastralPalette): Rig {
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };
  const mats = new Map<string, THREE.MeshStandardMaterial>();
  const mat = (color: string, roughness = 0.85, metalness = 0) => {
    const key = `${color}-${roughness}-${metalness}`;
    let m = mats.get(key);
    if (!m) {
      m = track(new THREE.MeshStandardMaterial({ color, roughness, metalness }));
      mats.set(key, m);
    }
    return m;
  };
  const shadowed = (mesh: THREE.Mesh, cast = true) => {
    mesh.castShadow = cast;
    mesh.receiveShadow = true;
    return mesh;
  };
  /** Boîte dont le pivot est au centre de sa base : `scale.y` la fait « pousser ». */
  const box = (w: number, h: number, d: number, material: THREE.Material, x = 0, y = 0, z = 0) => {
    const geo = track(new THREE.BoxGeometry(w, h, d));
    geo.translate(0, h / 2, 0);
    const mesh = shadowed(new THREE.Mesh(geo, material));
    mesh.position.set(x, y, z);
    return mesh;
  };
  /** Boîte centrée sur son pivot. */
  const cbox = (w: number, h: number, d: number, material: THREE.Material, x = 0, y = 0, z = 0) => {
    const mesh = shadowed(new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), material));
    mesh.position.set(x, y, z);
    return mesh;
  };

  const root = new THREE.Group();
  const timed: Timed[] = [];

  // ---------- Voisinage : petites maisons d'argile qui montent ----------
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

  // ---------- Limites de la parcelle ----------
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

  const parcelShape = new THREE.Shape(PARCEL.map(([x, y]) => new THREE.Vector2(x, y)));
  const zone = new THREE.Mesh(
    track(new THREE.ShapeGeometry(parcelShape)),
    track(new THREE.MeshBasicMaterial({ color: palette.terracotta, transparent: true, opacity: 0, side: THREE.DoubleSide }))
  );
  zone.rotation.x = -Math.PI / 2;
  zone.position.y = 0.012;
  root.add(zone);

  const lawn = shadowed(
    new THREE.Mesh(
      track(new THREE.ShapeGeometry(parcelShape)),
      track(new THREE.MeshStandardMaterial({ color: COLORS.lawn, roughness: 1, transparent: true, opacity: 0, side: THREE.DoubleSide }))
    ),
    false
  );
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.y = 0.02;
  root.add(lawn);

  // ---------- Enveloppe constructible : volume translucide + arêtes ----------
  const envelope = new THREE.Group();
  const insetShape = new THREE.Shape(PARCEL.map(([x, y]) => new THREE.Vector2(x * 0.88, y * 0.88)));
  const envGeo = track(new THREE.ExtrudeGeometry(insetShape, { depth: 1, bevelEnabled: false }));
  const envFill = new THREE.Mesh(
    envGeo,
    track(new THREE.MeshBasicMaterial({ color: palette.brand, transparent: true, opacity: 0.1, depthWrite: false }))
  );
  const envEdgesGeo = track(new THREE.EdgesGeometry(envGeo));
  const envLines = new THREE.LineSegments(
    envEdgesGeo,
    track(new THREE.LineBasicMaterial({ color: palette.brand, transparent: true, opacity: 0.6 }))
  );
  envelope.add(envFill, envLines);
  envelope.rotation.x = -Math.PI / 2;
  envelope.scale.z = 0.001;
  envelope.visible = false;
  root.add(envelope);
  const envelopeMaterials = [envFill.material as THREE.Material, envLines.material as THREE.Material];

  // ---------- La maison ----------
  const house = new THREE.Group();
  house.position.set(0, 0, -0.2);
  root.add(house);

  const plinth = box(BODY.w + 0.5, PLINTH, BODY.d + 0.5, mat(COLORS.plinth, 0.95), BODY.x, 0, 0);
  plinth.scale.y = 0.001;
  house.add(plinth);
  timed.push({ obj: plinth, from: 0.26, to: 0.34, kind: "rise" });

  const body = box(BODY.w, WALL_H, BODY.d, mat(COLORS.wall, 0.9), BODY.x, PLINTH, 0);
  body.scale.y = 0.001;
  house.add(body);
  timed.push({ obj: body, from: 0.32, to: 0.5, kind: "rise" });

  const garage = box(GARAGE.w, GARAGE.h, GARAGE.d, mat(COLORS.wall, 0.9), GARAGE.x, PLINTH, GARAGE.z);
  garage.scale.y = 0.001;
  house.add(garage);
  timed.push({ obj: garage, from: 0.36, to: 0.5, kind: "rise" });

  // Toit à deux pans (débord de 0,35), faîtage le long de x.
  const roofGroup = new THREE.Group();
  const halfD = BODY.d / 2;
  const slope = Math.atan2(ROOF_RISE, halfD);
  const overhang = 0.35;
  const slabLength = (halfD + overhang) / Math.cos(slope);
  const slabWidth = BODY.w + 0.6;
  const ridgeY = PLINTH + WALL_H + ROOF_RISE;
  const roofMat = mat(COLORS.roof, 0.7);
  for (const side of [1, -1]) {
    const slab = cbox(slabWidth, 0.14, slabLength, roofMat);
    slab.rotation.x = side * slope;
    slab.position.set(
      BODY.x,
      ridgeY - (slabLength / 2) * Math.sin(slope) + 0.07 - 0.02,
      side * (slabLength / 2) * Math.cos(slope)
    );
    roofGroup.add(slab);
  }
  roofGroup.add(cbox(slabWidth + 0.04, 0.14, 0.2, mat(COLORS.roofDark, 0.6), BODY.x, ridgeY + 0.1, 0));

  // Pignons triangulaires aux deux extrémités.
  const gableShape = new THREE.Shape([
    new THREE.Vector2(-halfD, 0),
    new THREE.Vector2(halfD, 0),
    new THREE.Vector2(0, ROOF_RISE),
  ]);
  const gableGeo = track(new THREE.ExtrudeGeometry(gableShape, { depth: 0.1, bevelEnabled: false }));
  gableGeo.rotateY(Math.PI / 2);
  for (const side of [1, -1]) {
    const gable = shadowed(new THREE.Mesh(gableGeo, mat(COLORS.wall, 0.9)));
    gable.position.set(BODY.x + side * (BODY.w / 2) - (side === 1 ? 0.1 : 0), PLINTH + WALL_H, 0);
    roofGroup.add(gable);
  }

  // Cheminée.
  const chimneyX = BODY.x + BODY.w / 4;
  const chimney = box(0.4, 1.35, 0.4, mat(COLORS.chimney, 0.95), chimneyX, PLINTH + WALL_H + 0.45, -0.5);
  roofGroup.add(chimney);
  roofGroup.add(cbox(0.52, 0.08, 0.52, mat(COLORS.roofDark, 0.8), chimneyX, PLINTH + WALL_H + 1.83, -0.5));

  // Toit plat du garage.
  roofGroup.add(cbox(GARAGE.w + 0.3, 0.12, GARAGE.d + 0.3, mat(COLORS.roofDark, 0.8), GARAGE.x, PLINTH + GARAGE.h + 0.06, GARAGE.z));
  roofGroup.visible = false;
  house.add(roofGroup);

  // Fenêtre : cadre, vitrage, croisillons, appui.
  const addWindow = (x: number, y: number, z: number, w: number, h: number, ry: number, from: number) => {
    const win = new THREE.Group();
    win.add(cbox(w + 0.14, h + 0.14, 0.07, mat(COLORS.frame, 0.6), 0, 0, 0.035));
    win.add(cbox(w, h, 0.05, mat(COLORS.glass, 0.12, 0.35), 0, 0, 0.07));
    win.add(cbox(0.04, h, 0.04, mat(COLORS.frame, 0.6), 0, 0, 0.1));
    win.add(cbox(w, 0.04, 0.04, mat(COLORS.frame, 0.6), 0, 0, 0.1));
    win.add(cbox(w + 0.26, 0.05, 0.14, mat(COLORS.plinth, 0.9), 0, -h / 2 - 0.1, 0.1));
    win.position.set(x, y, z);
    win.rotation.y = ry;
    win.scale.setScalar(0.001);
    house.add(win);
    timed.push({ obj: win, from, to: from + 0.07, kind: "pop" });
  };
  const frontZ = BODY.d / 2;
  addWindow(BODY.x + 0.5, PLINTH + 1.45, frontZ, 0.8, 0.9, 0, 0.62);
  addWindow(BODY.x + 1.65, PLINTH + 1.45, frontZ, 0.8, 0.9, 0, 0.65);
  addWindow(BODY.x + BODY.w / 2, PLINTH + 1.45, 0.2, 0.8, 0.9, Math.PI / 2, 0.67);

  // Porte, auvent, marche.
  const door = new THREE.Group();
  door.add(box(0.8, 1.42, 0.07, mat(COLORS.frame, 0.6), 0, 0, 0.035));
  door.add(box(0.62, 1.3, 0.06, mat(COLORS.door, 0.5), 0, 0, 0.075));
  const handle = cbox(0.04, 0.16, 0.05, mat(COLORS.brass, 0.3, 0.8), 0.2, 0.7, 0.12);
  door.add(handle);
  door.position.set(BODY.x - 1.3, PLINTH, frontZ);
  door.scale.setScalar(0.001);
  house.add(door);
  timed.push({ obj: door, from: 0.6, to: 0.67, kind: "pop" });

  const porch = new THREE.Group();
  porch.add(cbox(1.2, 0.08, 0.75, mat(COLORS.roofDark, 0.8), 0, 1.65, 0.38));
  for (const px of [-0.55, 0.55]) porch.add(box(0.06, 1.62, 0.06, mat(COLORS.frame, 0.6), px, 0, 0.7));
  porch.add(box(1.3, 0.12, 0.65, mat(COLORS.plinth, 0.95), 0, 0, 0.5));
  porch.position.set(BODY.x - 1.3, PLINTH, frontZ);
  porch.scale.setScalar(0.001);
  house.add(porch);
  timed.push({ obj: porch, from: 0.63, to: 0.7, kind: "pop" });

  // Porte de garage à lames horizontales.
  const garageDoor = new THREE.Group();
  garageDoor.add(box(1.5, 1.28, 0.05, mat(COLORS.garageDoor, 0.7), 0, 0, 0.025));
  for (let i = 1; i < 4; i += 1) garageDoor.add(cbox(1.5, 0.025, 0.06, mat(COLORS.groove, 0.8), 0, (1.28 / 4) * i, 0.05));
  garageDoor.position.set(GARAGE.x, PLINTH, GARAGE.z + GARAGE.d / 2);
  garageDoor.scale.setScalar(0.001);
  house.add(garageDoor);
  timed.push({ obj: garageDoor, from: 0.62, to: 0.69, kind: "pop" });

  // Abords : allée, chemin, terrasse.
  const driveway = box(1.8, 0.03, 2.1, mat(COLORS.road, 1), GARAGE.x, 0.02, GARAGE.z + GARAGE.d / 2 + 1.05);
  driveway.scale.set(0.001, 1, 0.001);
  house.add(driveway);
  timed.push({ obj: driveway, from: 0.68, to: 0.76, kind: "slab" });

  const walkway = box(0.7, 0.03, 1.5, mat(COLORS.road, 1), BODY.x - 1.3, 0.02, frontZ + 1.15);
  walkway.scale.set(0.001, 1, 0.001);
  house.add(walkway);
  timed.push({ obj: walkway, from: 0.7, to: 0.78, kind: "slab" });

  const deck = box(1.35, 0.1, 2.0, mat(COLORS.wood, 0.9), BODY.x + BODY.w / 2 + 0.68, 0, 0.1);
  deck.scale.set(0.001, 1, 0.001);
  house.add(deck);
  timed.push({ obj: deck, from: 0.72, to: 0.8, kind: "slab" });

  // Haies au fond de la parcelle.
  const hedgeMat = mat(COLORS.hedge, 1);
  for (const [hx, hz, from] of [
    [-3.2, -2.1, 0.78],
    [-1.3, -2.6, 0.8],
    [0.6, -3.1, 0.82],
  ] as const) {
    const hedge = box(1.9, 0.6, 0.45, hedgeMat, hx, 0, hz);
    hedge.rotation.y = 0.263;
    hedge.scale.setScalar(0.001);
    root.add(hedge);
    timed.push({ obj: hedge, from, to: from + 0.07, kind: "rise" });
  }

  // Arbres : tronc + deux houppiers facettés.
  const trunkMat = mat(COLORS.trunk, 1);
  const leafMat = track(new THREE.MeshStandardMaterial({ color: COLORS.leaf, roughness: 1, flatShading: true }));
  const leafDarkMat = track(new THREE.MeshStandardMaterial({ color: COLORS.leafDark, roughness: 1, flatShading: true }));
  const crownGeo = track(new THREE.IcosahedronGeometry(0.85, 1));
  const crownSmall = track(new THREE.IcosahedronGeometry(0.58, 1));
  const trunkGeo = track(new THREE.CylinderGeometry(0.08, 0.12, 0.9, 8));
  trunkGeo.translate(0, 0.45, 0);
  for (const [tx, tz, scale, from] of [
    [3.7, -1.9, 1.15, 0.8],
    [-3.5, -1.9, 1, 0.83],
    [3.1, 2.5, 0.85, 0.86],
    [-0.6, 2.9, 0.7, 0.88],
  ] as const) {
    const tree = new THREE.Group();
    tree.add(shadowed(new THREE.Mesh(trunkGeo, trunkMat)));
    const crown = shadowed(new THREE.Mesh(crownGeo, leafMat));
    crown.position.y = 1.5;
    const top = shadowed(new THREE.Mesh(crownSmall, leafDarkMat));
    top.position.set(0.15, 2.15, 0.1);
    tree.add(crown, top);
    tree.position.set(tx, 0, tz);
    tree.scale.setScalar(0.001 * scale);
    tree.userData.base = scale;
    root.add(tree);
    timed.push({ obj: tree, from, to: from + 0.09, kind: "pop" });
  }

  return {
    root,
    neighbours,
    edges,
    zone,
    lawn,
    envelope,
    envelopeMaterials,
    roofGroup,
    timed,
    dispose: () => disposables.forEach((item) => item.dispose()),
  };
}

/* Poses de caméra : [progression, azimut (rad), élévation (rad), distance, hauteur de visée]. */
const CAMERA_KEYS: Array<[number, number, number, number, number]> = [
  [0.1, -0.9, 0.96, 31, 0],
  [0.3, -0.72, 0.74, 25, 0.4],
  [0.62, -0.5, 0.5, 23, 1.0],
  [0.93, -0.32, 0.3, 20, 1.3],
  [1, -0.32, 0.3, 20, 1.3],
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

  const zoneIn = segment(p, 0.08, 0.2);
  const lawnIn = segment(p, 0.74, 0.86);
  (rig.zone.material as THREE.MeshBasicMaterial).opacity = 0.34 * zoneIn * (1 - lawnIn);
  (rig.lawn.material as THREE.MeshStandardMaterial).opacity = lawnIn;

  const envelopeIn = segment(p, 0.18, 0.3);
  const envelopeOut = segment(p, 0.84, 0.93);
  rig.envelope.visible = envelopeIn > 0.01 && envelopeOut < 0.99;
  rig.envelope.scale.z = Math.max(0.001, envelopeIn * ENVELOPE_HEIGHT);
  rig.envelopeMaterials[0].opacity = 0.1 * (1 - envelopeOut);
  rig.envelopeMaterials[1].opacity = 0.6 * (1 - envelopeOut);

  const roofT = linear(p, 0.5, 0.62);
  rig.roofGroup.visible = roofT > 0;
  rig.roofGroup.position.y = (1 - easeOutCubic(roofT)) * 7;

  rig.timed.forEach(({ obj, from, to, kind }) => {
    const t = linear(p, from, to);
    obj.visible = t > 0;
    if (!obj.visible) return;
    const base = (obj.userData.base as number | undefined) ?? 1;
    if (kind === "pop") obj.scale.setScalar(Math.max(0.001, easeOutBack(t)) * base);
    else if (kind === "rise") obj.scale.set(base, Math.max(0.001, easeInOut(t)) * base, base);
    else obj.scale.set(Math.max(0.001, easeInOut(t)), 1, Math.max(0.001, easeInOut(t)));
  });
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
