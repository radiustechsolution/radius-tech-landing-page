"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "motion/react";

import {
  PIECES,
  SCREEN,
  createGlowTexture,
  createRingTexture,
  createScreenTexture,
  createSlotTexture,
  makeTexture,
  type PieceDef,
} from "./uiTextures";

const { damp, lerp, clamp } = THREE.MathUtils;
const clamp01 = (v: number) => clamp(v, 0, 1);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/* Draw order (higher = drawn later = on top) */
const ORDER = {
  glow: 0,
  rings: 1,
  screen: 5,
  slots: 6,
  pieces: 10,
  island: 30,
};

/* Timing: all pieces land by ~0.74, then the phone holds, then goes live */
const PIECE_START = 0.04;
const PIECE_STEP = 0.11;
const PIECE_DURATION = 0.15;

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/* ------------------------------------------------------------------ */

function Piece({
  def,
  index,
  texture,
  slotTexture,
  progress,
}: {
  def: PieceDef;
  index: number;
  texture: THREE.Texture;
  slotTexture: THREE.Texture;
  progress: MotionValue<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const slotMat = useRef<THREE.MeshBasicMaterial>(null);

  const start = PIECE_START + index * PIECE_STEP;
  const end = start + PIECE_DURATION;
  const restZ = SCREEN.z + 0.01 + index * 0.002;

  useFrame(() => {
    const m = mesh.current;
    if (!m || !mat.current) return;

    const p = clamp01((progress.get() - start) / (end - start));
    const eb = easeOutBack(p);
    const eo = easeOut(p);

    m.visible = p > 0.001;
    m.position.set(
      lerp(def.from[0], 0, eb),
      lerp(def.from[1], def.y, eb),
      Math.max(restZ, lerp(def.from[2], restZ, eo)),
    );
    m.rotation.set(
      lerp(def.rot[0], 0, eo),
      lerp(def.rot[1], 0, eo),
      lerp(def.rot[2], 0, eo),
    );
    const s = lerp(0.7, 1, eo);
    m.scale.set(s, s, 1);
    mat.current.opacity = clamp01(p * 4);

    // Dashed slot fades out as the piece lands
    if (slotMat.current) slotMat.current.opacity = 1 - clamp01((p - 0.7) / 0.3);
  });

  return (
    <>
      {/* Empty slot outline */}
      <mesh position={[0, def.y, SCREEN.z + 0.004]} renderOrder={ORDER.slots}>
        <planeGeometry args={[def.w, def.h]} />
        <meshBasicMaterial
          ref={slotMat}
          map={slotTexture}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* The UI piece */}
      <mesh ref={mesh} visible={false} renderOrder={ORDER.pieces + index}>
        <planeGeometry args={[def.w, def.h]} />
        <meshBasicMaterial
          ref={mat}
          map={texture}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Phone({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const textures = useMemo(
    () => ({
      screen: createScreenTexture(),
      ring: createRingTexture(1.8, 3.5),
      glow: createGlowTexture(),
      pieces: PIECES.map((p) => makeTexture(p.w, p.h, p.draw)),
      slots: PIECES.map((p) => createSlotTexture(p.w, p.h)),
    }),
    [],
  );

  const bodyGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRectShape(1.56, 3.26, 0.24), {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 8,
      curveSegments: 32,
    });
    g.center();
    return g;
  }, []);

  const bezelGeo = useMemo(
    () => new THREE.ShapeGeometry(roundedRectShape(1.52, 3.22, 0.21), 32),
    [],
  );
  const islandGeo = useMemo(
    () => new THREE.ShapeGeometry(roundedRectShape(0.4, 0.11, 0.055), 16),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const p = progress.get();
    const t = state.clock.elapsedTime;

    // Turn from angled to facing the user
    const turn = easeOut(clamp01(p / 0.75));
    const targetY =
      lerp(-0.6, 0, turn) + pointer.current.x * 0.15 + Math.sin(t * 0.6) * 0.03;
    const targetX = lerp(0.18, 0, turn) - pointer.current.y * 0.1;
    g.rotation.y = damp(g.rotation.y, targetY, 6, delta);
    g.rotation.x = damp(g.rotation.x, targetX, 6, delta);
    g.position.y = Math.sin(t * 1.1) * 0.05;

    // Live state at the end
    const live = clamp01((p - 0.84) / 0.1);
    g.scale.setScalar(1 + live * 0.05);
    if (glowMat.current) glowMat.current.opacity = live * 0.9;

    [ringA.current, ringB.current].forEach((ring, i) => {
      if (!ring) return;
      const r = (t * 0.5 + i * 0.5) % 1;
      ring.scale.set(1 + r * 0.45, 1 + r * 0.2, 1);
      (ring.material as THREE.MeshBasicMaterial).opacity = live * (1 - r) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {/* Glow behind */}
      <mesh position={[0, 0, -0.4]} renderOrder={ORDER.glow}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial
          ref={glowMat}
          map={textures.glow}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Signal rings */}
      {[ringA, ringB].map((ref, i) => (
        <mesh
          key={i}
          ref={ref}
          position={[0, 0, -0.1]}
          renderOrder={ORDER.rings}
        >
          <planeGeometry args={[1.8, 3.5]} />
          <meshBasicMaterial
            map={textures.ring}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Body */}
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial
          color="#d9dde4"
          metalness={1}
          roughness={0.22}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Side buttons */}
      <mesh position={[-0.815, 0.85, 0]}>
        <boxGeometry args={[0.03, 0.26, 0.06]} />
        <meshStandardMaterial color="#c8ccd4" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[-0.815, 0.5, 0]}>
        <boxGeometry args={[0.03, 0.26, 0.06]} />
        <meshStandardMaterial color="#c8ccd4" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0.815, 0.7, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.06]} />
        <meshStandardMaterial color="#c8ccd4" metalness={1} roughness={0.3} />
      </mesh>

      {/* Black glass front */}
      <mesh geometry={bezelGeo} position={[0, 0, 0.081]}>
        <meshPhysicalMaterial
          color="#020203"
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Screen base */}
      <mesh position={[0, 0, SCREEN.z]} renderOrder={ORDER.screen}>
        <planeGeometry args={[SCREEN.w, SCREEN.h]} />
        <meshBasicMaterial
          map={textures.screen}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Dynamic island */}
      <mesh
        geometry={islandGeo}
        position={[0, 1.49, SCREEN.z + 0.03]}
        renderOrder={ORDER.island}
      >
        <meshBasicMaterial color="#000000" transparent depthWrite={false} />
      </mesh>

      {/* Slots + flying UI pieces */}
      {PIECES.map((def, i) => (
        <Piece
          key={def.id}
          def={def}
          index={i}
          texture={textures.pieces[i]}
          slotTexture={textures.slots[i]}
          progress={progress}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */

export default function PhoneScene({
  progress,
  active = true,
}: {
  progress: MotionValue<number>;
  active?: boolean;
}) {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => alive && setFontsReady(true));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7.2], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.6}
        color="#dfe4ee"
      />

      {fontsReady && <Phone progress={progress} />}

      <ContactShadows
        position={[0, -2.05, 0]}
        opacity={0.5}
        scale={6}
        blur={2.6}
        far={3}
      />

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 4, 2]}
          scale={[8, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[6, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[5, 1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[6, 2, 1]}
        />
        <Lightformer
          form="ring"
          intensity={1.5}
          position={[0, 0, -5]}
          scale={4}
        />
      </Environment>
    </Canvas>
  );
}
