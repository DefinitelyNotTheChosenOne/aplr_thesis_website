"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { ScreenUser } from "./ScreenUser";
import { ScreenAdmin } from "./ScreenAdmin";
import { ScreenYolo } from "./ScreenYolo";

// Preallocated color helpers to avoid garbage collection overhead in useFrame
const currentColor = new THREE.Color("#5b5bf0");
const tempColor = new THREE.Color();

export type StageIndex = 0 | 1 | 2 | 3;

export interface ScrollStageState {
  // Hero wings (Stage 0)
  heroOp: number;
  heroShiftX: number;
  // Left-column feature cards (Stages 1, 2, 3)
  op1: number;
  op2: number;
  op3: number;
  textY1: number;
  textY2: number;
  textY3: number;
  // 3D embedded screens (User, Admin, YOLO)
  screenOp1: number;
  screenOp2: number;
  screenOp3: number;
  // 0 = Portrait Smartphone (Stages 0, 1, 2), 1 = Landscape Vision Screen (Stage 3)
  yoloMorph: number;
  activeStage: StageIndex;
  targetColorHex: string;
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Unified 4-Stage Scroll Choreography:
 * - Stage 0 (0.00 - 0.16): Hero (Floating Phone Screen Centered, Left & Right Hero Wings visible)
 * - Trans 0->1 (0.16 - 0.28): Hero Wings part outward; Phone Screen glides Center -> Right
 * - Stage 1 (0.28 - 0.46): 01 User App (Right Floating Phone + Left User Description)
 * - Trans 1->2 (0.46 - 0.58): Crossfade 01 User -> 02 Admin
 * - Stage 2 (0.58 - 0.74): 02 Admin Side (Right Floating Phone + Left Admin Description)
 * - Trans 2->3 (0.74 - 0.86): Morph Phone -> Landscape Vision Screen (03 YOLOv11 AI)
 * - Stage 3 (0.86 - 1.00): 03 YOLOv11 AI (Right Vision Screen + Left YOLO Description)
 */
export function calcScrollStageState(offset: number): ScrollStageState {
  const clamped = Math.max(0, Math.min(1, offset));
  const PARALLAX_DIST = 36;
  const WING_SHIFT = 64;

  const t0Start = 0.16;
  const t0End = 0.28;
  const t1Start = 0.46;
  const t1End = 0.58;
  const t2Start = 0.74;
  const t2End = 0.86;

  let heroOp = 0;
  let heroShiftX = WING_SHIFT;
  let op1 = 0;
  let op2 = 0;
  let op3 = 0;
  let textY1 = PARALLAX_DIST;
  let textY2 = PARALLAX_DIST;
  let textY3 = PARALLAX_DIST;
  let screenOp1 = 1;
  let screenOp2 = 0;
  let screenOp3 = 0;
  let yoloMorph = 0;
  let activeStage: StageIndex = 0;
  let targetColorHex = "#5b5bf0";

  if (clamped <= t0Start) {
    heroOp = 1;
    heroShiftX = 0;
    op1 = 0;
    textY1 = PARALLAX_DIST;
    screenOp1 = 1;
    activeStage = 0;
    targetColorHex = "#5b5bf0";
  } else if (clamped < t0End) {
    const s = smoothstep(t0Start, t0End, clamped);
    heroOp = 1 - s;
    heroShiftX = WING_SHIFT * s;
    op1 = s;
    textY1 = PARALLAX_DIST * (1 - s);
    screenOp1 = 1;
    activeStage = s < 0.5 ? 0 : 1;
    targetColorHex = "#5b5bf0";
  } else if (clamped <= t1Start) {
    op1 = 1;
    textY1 = 0;
    screenOp1 = 1;
    activeStage = 1;
    targetColorHex = "#5b5bf0";
  } else if (clamped < t1End) {
    const s = smoothstep(t1Start, t1End, clamped);
    op1 = 1 - s;
    op2 = s;
    textY1 = -PARALLAX_DIST * s;
    textY2 = PARALLAX_DIST * (1 - s);
    screenOp1 = 1 - s;
    screenOp2 = s;
    activeStage = s < 0.5 ? 1 : 2;
    targetColorHex = s < 0.5 ? "#5b5bf0" : "#22c55e";
  } else if (clamped <= t2Start) {
    op2 = 1;
    textY1 = -PARALLAX_DIST;
    textY2 = 0;
    screenOp1 = 0;
    screenOp2 = 1;
    activeStage = 2;
    targetColorHex = "#22c55e";
  } else if (clamped < t2End) {
    const s = smoothstep(t2Start, t2End, clamped);
    op2 = 1 - s;
    op3 = s;
    textY1 = -PARALLAX_DIST;
    textY2 = -PARALLAX_DIST * s;
    textY3 = PARALLAX_DIST * (1 - s);
    screenOp1 = 0;
    screenOp2 = 1 - s;
    screenOp3 = s;
    yoloMorph = s;
    activeStage = s < 0.5 ? 2 : 3;
    targetColorHex = s < 0.5 ? "#22c55e" : "#f5a623";
  } else {
    op3 = 1;
    textY1 = -PARALLAX_DIST;
    textY2 = -PARALLAX_DIST;
    textY3 = 0;
    screenOp1 = 0;
    screenOp2 = 0;
    screenOp3 = 1;
    yoloMorph = 1;
    activeStage = 3;
    targetColorHex = "#f5a623";
  }

  return {
    heroOp,
    heroShiftX,
    op1,
    op2,
    op3,
    textY1,
    textY2,
    textY3,
    screenOp1,
    screenOp2,
    screenOp3,
    yoloMorph,
    activeStage,
    targetColorHex,
  };
}

export interface SceneCanvasProps {
  progress?: MotionValue<number>;
  progressRef?: React.RefObject<number>;
  heroLeftRef?: React.RefObject<HTMLDivElement | null>;
  heroRightRef?: React.RefObject<HTMLDivElement | null>;
  heroScrollHintRef?: React.RefObject<HTMLDivElement | null>;
  textRef1?: React.RefObject<HTMLDivElement | null>;
  textRef2?: React.RefObject<HTMLDivElement | null>;
  textRef3?: React.RefObject<HTMLDivElement | null>;
  onStageChange?: (stage: StageIndex) => void;
}

export const SceneCanvas = React.memo(function SceneCanvas({
  progress,
  progressRef,
  heroLeftRef,
  heroRightRef,
  heroScrollHintRef,
  textRef1,
  textRef2,
  textRef3,
  onStageChange,
}: SceneCanvasProps): React.JSX.Element {
  const { viewport, size, gl } = useThree();
  const portalRef = useRef<HTMLElement>(null!);
  if (
    !portalRef.current &&
    typeof document !== "undefined" &&
    gl.domElement?.parentElement
  ) {
    portalRef.current = gl.domElement.parentElement;
  }

  const currentOffsetRef = useRef<number>(0);

  // 3D Objects and Materials Refs
  const groupRef = useRef<THREE.Group>(null);
  const chassisMeshRef = useRef<THREE.Mesh>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const gridMatRef = useRef<THREE.LineBasicMaterial>(null);
  const accentLightRef = useRef<THREE.PointLight>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // DOM Screen Refs for pure floating screen
  const screenShellRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const yoloRef = useRef<HTMLDivElement>(null);

  const prevStageRef = useRef<StageIndex>(0);

  // Sleek Smartphone Unibody Chassis (Matches 380x800px screen at 1/400 world scale)
  const chassisGeometry = useMemo(() => {
    const width = 1.02;
    const height = 2.07;
    const depth = 0.1;
    const radius = 0.11;
    const bevelSize = 0.015;
    const smoothness = 8;

    const shape = new THREE.Shape();
    const innerW = width - bevelSize * 2;
    const innerH = height - bevelSize * 2;
    const r = radius - bevelSize;
    const x = -innerW / 2;
    const y = -innerH / 2;

    shape.moveTo(x + r, y);
    shape.lineTo(x + innerW - r, y);
    shape.quadraticCurveTo(x + innerW, y, x + innerW, y + r);
    shape.lineTo(x + innerW, y + innerH - r);
    shape.quadraticCurveTo(x + innerW, y + innerH, x + innerW - r, y + innerH);
    shape.lineTo(x + r, y + innerH);
    shape.quadraticCurveTo(x, y + innerH, x, y + innerH - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      depth: depth - bevelSize * 2,
      bevelEnabled: true,
      bevelSegments: smoothness,
      steps: 1,
      bevelSize: bevelSize,
      bevelThickness: bevelSize,
      curveSegments: smoothness * 2,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.translate(0, 0, -depth / 2 + bevelSize);
    geom.computeVertexNormals();
    return geom;
  }, []);

  useEffect(() => {
    return () => {
      chassisGeometry.dispose();
    };
  }, [chassisGeometry]);

  // Ambient starfield particles
  const particleCount = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return 400;
    return 750;
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 45;
      pos[i3 + 1] = (Math.random() - 0.5) * 35;
      pos[i3 + 2] = (Math.random() - 0.5) * 25 - 4;

      col[i3] = 0.6 + Math.random() * 0.4;
      col[i3 + 1] = 0.6 + Math.random() * 0.4;
      col[i3 + 2] = 1.0;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state, delta) => {
    const rawProgress = progress ? progress.get() : (progressRef?.current ?? 0);
    currentOffsetRef.current = THREE.MathUtils.damp(
      currentOffsetRef.current,
      rawProgress,
      9.0,
      delta
    );
    const offset = Math.max(0, Math.min(1, currentOffsetRef.current));

    const {
      heroOp,
      heroShiftX,
      op1,
      op2,
      op3,
      textY1,
      textY2,
      textY3,
      screenOp1,
      screenOp2,
      screenOp3,
      yoloMorph,
      activeStage,
      targetColorHex,
    } = calcScrollStageState(offset);

    const isMobile = size.width < 968;
    const effectiveColumnWidth = isMobile
      ? viewport.width
      : viewport.width * 0.54;
    const baseScale = isMobile
      ? Math.min(0.82, Math.max(0.62, viewport.width / 4.2))
      : Math.min(1.22, Math.max(0.95, effectiveColumnWidth / 3.4));

    const heroScale = isMobile ? baseScale * 0.96 : baseScale * 1.02;
    const rightColX = isMobile ? 0 : viewport.width * 0.21;
    const mobileY = 0.62;

    // Gentle floating breathing motion
    const idleFloatY = Math.sin(state.clock.elapsedTime * 1.6) * 0.04;
    const idleFloatRotZ = Math.cos(state.clock.elapsedTime * 1.2) * 0.01;

    let targetX = 0;
    let targetY = isMobile ? mobileY : 0;
    let targetZ = 0.0;
    let targetRotX = 0.1;
    let targetRotY = -0.18;
    let targetRotZ = 0.015;
    let targetScale = heroScale;

    if (offset <= 0.16) {
      // Stage 0 (Hero): Floating phone screen centered between Left & Right wings
      targetX = 0;
      targetY = (isMobile ? mobileY : 0.0) + idleFloatY;
      targetZ = 0.05;
      targetRotX = 0.1;
      targetRotY = -0.18 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      targetRotZ = 0.015 + idleFloatRotZ;
      targetScale = heroScale;
    } else if (offset <= 0.28) {
      // Transition 0 -> 1: Glide from Center to Right Column
      const s = smoothstep(0.16, 0.28, offset);
      targetX = THREE.MathUtils.lerp(0, rightColX, s);
      targetY = (isMobile ? mobileY : 0.0) + idleFloatY;
      targetZ = THREE.MathUtils.lerp(0.05, 0.12, s);
      targetRotX = THREE.MathUtils.lerp(0.1, 0.14, s);
      targetRotY = THREE.MathUtils.lerp(-0.18, -0.28, s);
      targetRotZ = THREE.MathUtils.lerp(0.015, 0.02, s);
      targetScale = THREE.MathUtils.lerp(heroScale, baseScale, s);
    } else if (offset <= 0.46) {
      // Stage 1 (01 User App): Hold in Right Column
      targetX = rightColX;
      targetY = (isMobile ? mobileY : 0.0) + idleFloatY;
      targetZ = 0.12;
      targetRotX = 0.14;
      targetRotY = -0.28;
      targetRotZ = 0.02 + idleFloatRotZ;
      targetScale = baseScale;
    } else if (offset <= 0.58) {
      // Transition 1 -> 2 (User App -> Admin Side): Flip tilt angle
      const s = smoothstep(0.46, 0.58, offset);
      targetX = THREE.MathUtils.lerp(rightColX, rightColX - 0.03, s);
      targetY =
        THREE.MathUtils.lerp(
          isMobile ? mobileY : 0.0,
          isMobile ? mobileY : -0.04,
          s
        ) + idleFloatY;
      targetZ = THREE.MathUtils.lerp(0.12, 0.25, s);
      targetRotX = THREE.MathUtils.lerp(0.14, -0.04, s);
      targetRotY = THREE.MathUtils.lerp(-0.28, 0.24, s);
      targetRotZ = THREE.MathUtils.lerp(0.02, -0.015, s);
      targetScale = THREE.MathUtils.lerp(baseScale, baseScale * 1.04, s);
    } else if (offset <= 0.74) {
      // Stage 2 (02 Admin Side): Hold in Right Column
      targetX = rightColX - 0.03;
      targetY = (isMobile ? mobileY : -0.04) + idleFloatY;
      targetZ = 0.25;
      targetRotX = -0.04;
      targetRotY = 0.24;
      targetRotZ = -0.015 + idleFloatRotZ;
      targetScale = baseScale * 1.04;
    } else if (offset <= 0.86) {
      // Transition 2 -> 3 (Admin Phone -> Landscape YOLOv11 Vision Screen)
      const s = smoothstep(0.74, 0.86, offset);
      targetX = THREE.MathUtils.lerp(rightColX - 0.03, rightColX, s);
      targetY =
        THREE.MathUtils.lerp(
          isMobile ? mobileY : -0.04,
          isMobile ? mobileY : 0.0,
          s
        ) + idleFloatY;
      targetZ = THREE.MathUtils.lerp(0.25, 0.05, s);
      targetRotX = THREE.MathUtils.lerp(-0.04, -0.08, s);
      targetRotY = THREE.MathUtils.lerp(0.24, -0.16, s);
      targetRotZ = THREE.MathUtils.lerp(-0.015, 0.01, s);
      targetScale = THREE.MathUtils.lerp(baseScale * 1.04, baseScale * 0.92, s);
    } else {
      // Stage 3 (03 YOLOv11 AI): Hold in Right Column
      targetX = rightColX;
      targetY = (isMobile ? mobileY : 0.0) + idleFloatY;
      targetZ = 0.05;
      targetRotX = -0.08;
      targetRotY = -0.16;
      targetRotZ = 0.01 + idleFloatRotZ;
      targetScale = baseScale * 0.92;
    }

    if (groupRef.current) {
      groupRef.current.position.set(targetX, targetY, targetZ);
      groupRef.current.rotation.set(targetRotX, targetRotY, targetRotZ);
      groupRef.current.scale.setScalar(targetScale);
      groupRef.current.updateMatrixWorld(true);
    }

    // Morph 3D Chassis & HTML Screen Shell between Portrait Phone (380x800) and Landscape YOLO (960x680)
    const chassisScaleX = THREE.MathUtils.lerp(1.0, 2.42, yoloMorph);
    const chassisScaleY = THREE.MathUtils.lerp(1.0, 0.85, yoloMorph);
    if (chassisMeshRef.current) {
      chassisMeshRef.current.scale.set(chassisScaleX, chassisScaleY, 1.0);
    }
    if (glowMeshRef.current) {
      glowMeshRef.current.scale.set(chassisScaleX, chassisScaleY, 1.0);
    }
    if (screenShellRef.current) {
      const shellW = THREE.MathUtils.lerp(380, 960, yoloMorph);
      const shellH = THREE.MathUtils.lerp(800, 680, yoloMorph);
      const shellRadius = THREE.MathUtils.lerp(42, 24, yoloMorph);
      screenShellRef.current.style.width = `${shellW.toFixed(1)}px`;
      screenShellRef.current.style.height = `${shellH.toFixed(1)}px`;
      screenShellRef.current.style.borderRadius = `${shellRadius.toFixed(1)}px`;
    }

    // Update 3D Embedded Screen Opacities
    if (userRef.current) {
      userRef.current.style.opacity = screenOp1.toFixed(3);
      userRef.current.style.pointerEvents = screenOp1 > 0.5 ? "auto" : "none";
    }
    if (adminRef.current) {
      adminRef.current.style.opacity = screenOp2.toFixed(3);
      adminRef.current.style.pointerEvents = screenOp2 > 0.5 ? "auto" : "none";
    }
    if (yoloRef.current) {
      yoloRef.current.style.opacity = screenOp3.toFixed(3);
      yoloRef.current.style.pointerEvents = screenOp3 > 0.5 ? "auto" : "none";
    }

    // Synchronize Hero Wings (Stage 0)
    if (heroLeftRef?.current) {
      heroLeftRef.current.style.opacity = heroOp.toFixed(3);
      heroLeftRef.current.style.transform = `translate3d(${-heroShiftX.toFixed(1)}px, 0, 0)`;
      heroLeftRef.current.style.pointerEvents = heroOp > 0.5 ? "auto" : "none";
    }
    if (heroRightRef?.current) {
      heroRightRef.current.style.opacity = heroOp.toFixed(3);
      heroRightRef.current.style.transform = `translate3d(${heroShiftX.toFixed(1)}px, 0, 0)`;
      heroRightRef.current.style.pointerEvents = heroOp > 0.5 ? "auto" : "none";
    }
    if (heroScrollHintRef?.current) {
      heroScrollHintRef.current.style.opacity = heroOp.toFixed(3);
    }

    // Synchronize Left-Column Feature Cards (Stages 1, 2, 3)
    if (textRef1?.current) {
      textRef1.current.style.opacity = op1.toFixed(3);
      textRef1.current.style.transform = `translate3d(0, ${textY1.toFixed(1)}px, 0)`;
      textRef1.current.style.pointerEvents = op1 > 0.5 ? "auto" : "none";
    }
    if (textRef2?.current) {
      textRef2.current.style.opacity = op2.toFixed(3);
      textRef2.current.style.transform = `translate3d(0, ${textY2.toFixed(1)}px, 0)`;
      textRef2.current.style.pointerEvents = op2 > 0.5 ? "auto" : "none";
    }
    if (textRef3?.current) {
      textRef3.current.style.opacity = op3.toFixed(3);
      textRef3.current.style.transform = `translate3d(0, ${textY3.toFixed(1)}px, 0)`;
      textRef3.current.style.pointerEvents = op3 > 0.5 ? "auto" : "none";
    }

    if (prevStageRef.current !== activeStage) {
      prevStageRef.current = activeStage;
      if (onStageChange) {
        onStageChange(activeStage);
      }
    }

    // Dynamic Thematic Lighting & Floor Grid Drift
    currentColor.lerp(tempColor.set(targetColorHex), 0.08);

    if (accentLightRef.current) {
      accentLightRef.current.color.copy(currentColor);
    }
    if (glowMatRef.current) {
      glowMatRef.current.color.copy(currentColor);
    }
    if (gridMatRef.current) {
      gridMatRef.current.color.copy(currentColor);
    }

    if (gridRef.current) {
      gridRef.current.position.z = (offset * 60) % 2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <>
      <color attach="background" args={["#05060D"]} />
      <fog attach="fog" args={["#05060D", 8, 26]} />

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} />
      <pointLight
        ref={accentLightRef}
        position={[2, 1, 3]}
        intensity={2.8}
        distance={20}
      />
      <pointLight position={[-3.5, -2, -2]} intensity={1.2} color="#8da2fb" />

      {/* Cyberpunk Ambient Starfield */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3D Perspective Grid Helper on the Floor */}
      <gridHelper
        ref={gridRef}
        args={[70, 36, "#5b5bf0", "#182042"]}
        position={[0, -3.2, 0]}
      >
        <lineBasicMaterial
          ref={gridMatRef}
          attach="material"
          color="#5b5bf0"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </gridHelper>

      {/* ROTATING & GLIDING 3D SCREEN GROUP */}
      <group ref={groupRef} position={[0, 0, 0.05]}>
        {/* 1. Soft Diffuse Aura Glow Behind the Screen */}
        <mesh ref={glowMeshRef} position={[0, 0, -0.06]}>
          <planeGeometry args={[1.18, 2.22]} />
          <meshBasicMaterial
            ref={glowMatRef}
            color="#5b5bf0"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* 2. Sleek Metallic Smartphone / Vision Bevel Behind the Screen */}
        <mesh
          ref={chassisMeshRef}
          geometry={chassisGeometry}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#0c101d"
            metalness={0.65}
            roughness={0.18}
            clearcoat={0.85}
            clearcoatRoughness={0.12}
            reflectivity={0.9}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* 3. Pure Floating Screen (No macOS Topbar or Outer Window Wrapper) */}
        <Html
          transform
          center
          portal={portalRef}
          distanceFactor={1.0}
          position={[0, 0, 0.052]}
          style={{
            userSelect: "none",
          }}
        >
          <div
            ref={screenShellRef}
            style={{
              width: "380px",
              height: "800px",
              borderRadius: "42px",
              border: "3px solid rgba(255, 255, 255, 0.22)",
              boxShadow:
                "0 36px 90px rgba(0, 0, 0, 0.85), 0 0 60px rgba(91, 91, 240, 0.28)",
              position: "relative",
              overflow: "hidden",
              background: "#050711",
              boxSizing: "border-box",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            {/* Screen 1: User Mobile App (Hero & Stage 1) */}
            <div
              ref={userRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 1,
                pointerEvents: "auto",
              }}
            >
              <ScreenUser />
            </div>

            {/* Screen 2: Admin Guard Station (Stage 2) */}
            <div
              ref={adminRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <ScreenAdmin />
            </div>

            {/* Screen 3: YOLOv11 Edge-AI Feed (Stage 3) */}
            <div
              ref={yoloRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <ScreenYolo />
            </div>
          </div>
        </Html>
      </group>
    </>
  );
});

export default SceneCanvas;