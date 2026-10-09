"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStageStore } from "../store/useStageStore";

// Preallocated color helpers to avoid per-frame allocations
const tempColor = new THREE.Color();
const targetColor = new THREE.Color();

function BackgroundElements() {
  const { camera } = useThree();
  const particlesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const gridMatRef = useRef<THREE.LineBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Particle count: halved on mobile for optimal performance
  const particleCount = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 450;
    }
    return 900;
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 60;
      pos[i3 + 1] = (Math.random() - 0.5) * 45;
      pos[i3 + 2] = (Math.random() - 0.5) * 35;

      col[i3] = 0.6 + Math.random() * 0.4;
      col[i3 + 1] = 0.6 + Math.random() * 0.4;
      col[i3 + 2] = 1.0;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((_, delta) => {
    const store = useStageStore.getState();
    const { overallProgress, activeColor, peakMorph } = store;

    // 1. Slow camera dolly forward driven by overall scroll
    const targetZ = THREE.MathUtils.lerp(22, 14, overallProgress);
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    // 2. Color lerping for grid, light, and particles
    targetColor.set(activeColor);

    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, 0.08);
    }

    if (particlesRef.current) {
      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.lerp(targetColor, 0.08);
      // Very slow starfield drift (only independent idle motion)
      particlesRef.current.rotation.y += delta * 0.012;
      particlesRef.current.rotation.x += delta * 0.004;
    }

    if (gridMatRef.current) {
      gridMatRef.current.color.lerp(targetColor, 0.08);
    }

    // 3. Expanding ring behind window at peak morph
    if (ringRef.current && ringMatRef.current) {
      if (peakMorph > 0.005) {
        ringRef.current.visible = true;
        const scale = 1.6 + peakMorph * 2.8;
        ringRef.current.scale.set(scale, scale, 1);
        ringMatRef.current.color.copy(targetColor);
        ringMatRef.current.opacity = peakMorph * 0.38;
      } else {
        ringRef.current.visible = false;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#05060D"]} />
      <fog attach="fog" args={["#05060D", 10, 36]} />

      <ambientLight intensity={0.4} />
      <pointLight ref={lightRef} position={[3.5, 0, 4]} intensity={2.2} distance={30} />

      {/* Sparse Starfield */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Faint perspective floor grid fading into fog */}
      <gridHelper
        args={[80, 40, "#5B5BF0", "#182042"]}
        position={[0, -5.2, 0]}
      >
        <lineBasicMaterial
          ref={gridMatRef}
          attach="material"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </gridHelper>

      {/* Expanding ring effect placed behind the right-side window card */}
      <mesh ref={ringRef} position={[3.5, 0, -2]} visible={false}>
        <ringGeometry args={[2.0, 2.05, 64]} />
        <meshBasicMaterial
          ref={ringMatRef}
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export function SceneCanvas(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#05060D",
      }}
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 20], fov: 58 }}
      >
        <BackgroundElements />
      </Canvas>
    </div>
  );
}

export default SceneCanvas;
