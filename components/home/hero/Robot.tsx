"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

const EYE_COLOR = "#f2f5ff";
const { damp, clamp } = THREE.MathUtils;

function Silver() {
  return (
    <meshStandardMaterial
      color="#d9dde4"
      metalness={1}
      roughness={0.24}
      envMapIntensity={1.15}
    />
  );
}

function DarkMetal() {
  return (
    <meshStandardMaterial color="#17191d" metalness={0.9} roughness={0.35} />
  );
}

function BlackGlass() {
  return (
    <meshPhysicalMaterial
      color="#030304"
      metalness={0.3}
      roughness={0.08}
      clearcoat={1}
      clearcoatRoughness={0.04}
    />
  );
}

export function Robot() {
  const gl = useThree((s) => s.gl);

  const pointer = useRef({ x: 0, y: 0, lastMove: -10000 });
  const blink = useRef({ next: 2.5, start: -10 });

  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const handL = useRef<THREE.Mesh>(null);
  const handR = useRef<THREE.Mesh>(null);
  const bars = useRef<THREE.Group>(null);
  const antenna = useRef<THREE.MeshStandardMaterial>(null);

  // Track the mouse anywhere on the page, relative to the robot
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = gl.domElement.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.38;
      pointer.current.x = clamp(
        (e.clientX - cx) / (window.innerWidth * 0.5),
        -1,
        1,
      );
      pointer.current.y = clamp(
        -(e.clientY - cy) / (window.innerHeight * 0.5),
        -1,
        1,
      );
      pointer.current.lastMove = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const idle = performance.now() - pointer.current.lastMove > 2500;

    // Where to look: the mouse, or wander around when idle
    const tx = idle ? Math.sin(t * 0.45) * 0.55 : pointer.current.x;
    const ty = idle ? Math.sin(t * 0.7) * 0.25 : pointer.current.y;

    if (head.current) {
      head.current.rotation.y = damp(
        head.current.rotation.y,
        tx * 0.75,
        5,
        delta,
      );
      head.current.rotation.x = damp(
        head.current.rotation.x,
        -ty * 0.45,
        5,
        delta,
      );
      head.current.rotation.z = damp(
        head.current.rotation.z,
        -tx * 0.08,
        4,
        delta,
      );
    }

    if (body.current) {
      body.current.rotation.y = damp(
        body.current.rotation.y,
        tx * 0.3,
        3.5,
        delta,
      );
      body.current.rotation.x = damp(
        body.current.rotation.x,
        -ty * 0.08,
        3.5,
        delta,
      );
    }

    if (eyes.current) {
      eyes.current.position.x = damp(
        eyes.current.position.x,
        tx * 0.12,
        8,
        delta,
      );
      eyes.current.position.y = damp(
        eyes.current.position.y,
        0.02 + ty * 0.07,
        8,
        delta,
      );
    }

    // Floating
    if (root.current) root.current.position.y = Math.sin(t * 1.1) * 0.07;

    // Hands bobbing
    if (handL.current) handL.current.position.y = Math.sin(t * 1.6) * 0.08;
    if (handR.current)
      handR.current.position.y = Math.sin(t * 1.6 + 1.2) * 0.08;

    // Blinking
    if (t > blink.current.next) {
      blink.current.start = t;
      blink.current.next = t + 2 + Math.random() * 3.5;
    }
    const phase = (t - blink.current.start) / 0.16;
    const eyeScale =
      phase >= 0 && phase < 1 ? 1 - Math.sin(phase * Math.PI) * 0.9 : 1;
    eyeL.current?.scale.set(1, eyeScale, 0.45);
    eyeR.current?.scale.set(1, eyeScale, 0.45);

    // Antenna pulse
    if (antenna.current)
      antenna.current.emissiveIntensity = 1.6 + Math.sin(t * 3) * 1;

    // Chest "processing" bars
    bars.current?.children.forEach((bar, i) => {
      bar.scale.y = 0.3 + Math.abs(Math.sin(t * 4 + i * 0.9)) * 0.7;
    });
  });

  return (
    <group ref={root} position={[0, 0.25, 0]}>
      {/* ---------- HEAD ---------- */}
      <group ref={head} position={[0, 0.55, 0]}>
        <RoundedBox args={[1.7, 1.3, 1.35]} radius={0.22} smoothness={6}>
          <Silver />
        </RoundedBox>

        {/* Visor */}
        <RoundedBox
          args={[1.24, 0.72, 0.12]}
          radius={0.12}
          smoothness={6}
          position={[0, -0.02, 0.655]}
        >
          <BlackGlass />
        </RoundedBox>

        {/* Eyes */}
        <group ref={eyes} position={[0, 0.02, 0.71]}>
          <mesh ref={eyeL} position={[-0.28, 0, 0]}>
            <capsuleGeometry args={[0.075, 0.14, 8, 16]} />
            <meshBasicMaterial color={EYE_COLOR} toneMapped={false} />
          </mesh>
          <mesh ref={eyeR} position={[0.28, 0, 0]}>
            <capsuleGeometry args={[0.075, 0.14, 8, 16]} />
            <meshBasicMaterial color={EYE_COLOR} toneMapped={false} />
          </mesh>
        </group>

        {/* Ears */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.9, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh>
              <cylinderGeometry args={[0.24, 0.24, 0.14, 40]} />
              <DarkMetal />
            </mesh>
            <mesh position={[0, side * 0.06, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.12, 40]} />
              <Silver />
            </mesh>
          </group>
        ))}

        {/* Antenna */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.42, 16]} />
          <DarkMetal />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.085, 32, 32]} />
          <meshStandardMaterial
            ref={antenna}
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ---------- NECK ---------- */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.2, 0.26, 0.32, 32]} />
        <DarkMetal />
      </mesh>

      {/* ---------- BODY ---------- */}
      <group ref={body} position={[0, -1.05, 0]}>
        <RoundedBox args={[1.9, 1.3, 1.15]} radius={0.38} smoothness={6}>
          <Silver />
        </RoundedBox>

        {/* Chest screen */}
        <RoundedBox
          args={[0.95, 0.5, 0.08]}
          radius={0.08}
          smoothness={4}
          position={[0, 0.05, 0.56]}
        >
          <BlackGlass />
        </RoundedBox>

        {/* Processing bars */}
        <group ref={bars} position={[0, 0.05, 0.61]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i} position={[(i - 2) * 0.14, 0, 0]}>
              <boxGeometry args={[0.07, 0.3, 0.02]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={1.2}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        {/* Floating hands */}
        <group position={[-1.32, -0.05, 0.15]}>
          <mesh ref={handL}>
            <sphereGeometry args={[0.22, 40, 40]} />
            <Silver />
          </mesh>
        </group>
        <group position={[1.32, -0.05, 0.15]}>
          <mesh ref={handR}>
            <sphereGeometry args={[0.22, 40, 40]} />
            <Silver />
          </mesh>
        </group>
      </group>
    </group>
  );
}
