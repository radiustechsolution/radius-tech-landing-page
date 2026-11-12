"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
} from "@react-three/drei";
import { Robot } from "./Robot";

function Orbits() {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (a.current) a.current.rotation.z += delta * 0.25;
    if (b.current) b.current.rotation.z -= delta * 0.18;
  });

  return (
    <group position={[0, -0.2, 0]}>
      <group rotation={[Math.PI / 2.35, 0.15, 0]}>
        <group ref={a}>
          <mesh>
            <torusGeometry args={[2.15, 0.006, 8, 200]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
          </mesh>
          <mesh position={[2.15, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={1}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>

      <group rotation={[Math.PI / 2.1, -0.35, 0.2]}>
        <group ref={b}>
          <mesh>
            <torusGeometry args={[2.5, 0.004, 8, 200]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
          </mesh>
          <mesh position={[-2.5, 0, 0]}>
            <octahedronGeometry args={[0.08]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={1}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function FloatingShapes() {
  const wire = (
    <meshBasicMaterial color="#c8ccd4" wireframe transparent opacity={0.35} />
  );

  return (
    <>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[-2.05, 1.55, -1]}>
          <icosahedronGeometry args={[0.28, 0]} />
          {wire}
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[2.1, 1.25, -0.5]}>
          <octahedronGeometry args={[0.24, 0]} />
          {wire}
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
        <mesh position={[1.95, -1.55, 0.4]}>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          {wire}
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1.3} floatIntensity={1}>
        <mesh position={[-2.0, -1.2, 0.6]}>
          <torusGeometry args={[0.16, 0.055, 12, 32]} />
          <meshStandardMaterial
            color="#d9dde4"
            metalness={1}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function RobotScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, -0.05, 8], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.7}
        color="#dfe4ee"
      />

      <Robot />
      <Orbits />
      <FloatingShapes />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.55}
        scale={8}
        blur={2.6}
        far={4}
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
