"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { ScreenUser } from "./ScreenUser";
import { ScreenAdmin } from "./ScreenAdmin";
import { ScreenYolo } from "./ScreenYolo";
import styles from "./ThreeScrollShowcase.module.css";

// ---------------------------------------------------------------------------
// Preallocated color helpers to avoid garbage collection overhead in useFrame
// ---------------------------------------------------------------------------
const currentColor = new THREE.Color("#5b5bf0");
const tempColor = new THREE.Color();

export interface ScrollStageState {
  op1: number;
  op2: number;
  op3: number;
  textY1: number;
  textY2: number;
  textY3: number;
  activeStage: 0 | 1 | 2;
  targetColorHex: string;
  titleText: string;
}

/**
 * Shared interpolation logic for synchronized HTML text state and WebGL object state.
 * Transition 1 -> 2: centered at 0.33, crossfade window [0.25, 0.41]
 * Transition 2 -> 3: centered at 0.66, crossfade window [0.58, 0.74]
 */
export function calcScrollStageState(offset: number): ScrollStageState {
  const clamped = Math.max(0, Math.min(1, offset));
  const PARALLAX_DIST = 36; // px vertical displacement for fluid entry/exit

  const t1Start = 0.25;
  const t1End = 0.41;
  const t2Start = 0.58;
  const t2End = 0.74;

  let op1 = 0;
  let op2 = 0;
  let op3 = 0;
  let textY1 = 0;
  let textY2 = 0;
  let textY3 = 0;
  let activeStage: 0 | 1 | 2 = 0;
  let targetColorHex = "#5b5bf0";
  let titleText = "intelligate_user.app";

  if (clamped <= t1Start) {
    // Pure Stage 1: Student & Faculty Mobile Portal
    op1 = 1;
    op2 = 0;
    op3 = 0;
    textY1 = 0;
    textY2 = PARALLAX_DIST;
    textY3 = PARALLAX_DIST;
    activeStage = 0;
    targetColorHex = "#5b5bf0";
    titleText = "intelligate_user.app";
  } else if (clamped < t1End) {
    // Crossfade 1 -> 2: User screen fades out as Admin screen swings in
    const progress = (clamped - t1Start) / (t1End - t1Start);
    const s = progress * progress * (3 - 2 * progress); // smoothstep
    op1 = 1 - s;
    op2 = s;
    op3 = 0;
    textY1 = -PARALLAX_DIST * s; // slides up out of view
    textY2 = PARALLAX_DIST * (1 - s); // slides up into focus
    textY3 = PARALLAX_DIST;
    activeStage = progress < 0.5 ? 0 : 1;
    targetColorHex = progress < 0.5 ? "#5b5bf0" : "#22c55e";
    titleText = progress < 0.5 ? "intelligate_user.app" : "admin.guard_station";
  } else if (clamped <= t2Start) {
    // Pure Stage 2: Security & Guard Admin Console
    op1 = 0;
    op2 = 1;
    op3 = 0;
    textY1 = -PARALLAX_DIST;
    textY2 = 0;
    textY3 = PARALLAX_DIST;
    activeStage = 1;
    targetColorHex = "#22c55e";
    titleText = "admin.guard_station";
  } else if (clamped < t2End) {
    // Crossfade 2 -> 3: Admin screen fades out as YOLOv11 screen tilts in
    const progress = (clamped - t2Start) / (t2End - t2Start);
    const s = progress * progress * (3 - 2 * progress);
    op1 = 0;
    op2 = 1 - s;
    op3 = s;
    textY1 = -PARALLAX_DIST;
    textY2 = -PARALLAX_DIST * s;
    textY3 = PARALLAX_DIST * (1 - s);
    activeStage = progress < 0.5 ? 1 : 2;
    targetColorHex = progress < 0.5 ? "#22c55e" : "#f5a623";
    titleText = progress < 0.5 ? "admin.guard_station" : "yolov11_alpr_detect.py";
  } else {
    // Pure Stage 3: YOLOv11s Edge-AI Plate Recognition
    op1 = 0;
    op2 = 0;
    op3 = 1;
    textY1 = -PARALLAX_DIST;
    textY2 = -PARALLAX_DIST;
    textY3 = 0;
    activeStage = 2;
    targetColorHex = "#f5a623";
    titleText = "yolov11_alpr_detect.py";
  }

  return {
    op1,
    op2,
    op3,
    textY1,
    textY2,
    textY3,
    activeStage,
    targetColorHex,
    titleText,
  };
}

export interface SceneCanvasProps {
  progress?: MotionValue<number>;
  progressRef?: React.RefObject<number>;
  textRef1?: React.RefObject<HTMLDivElement | null>;
  textRef2?: React.RefObject<HTMLDivElement | null>;
  textRef3?: React.RefObject<HTMLDivElement | null>;
  pinnedWrapRef?: React.RefObject<HTMLDivElement | null>;
  hudStagePillsRef?: React.RefObject<(HTMLButtonElement | null)[]>;
  onStageChange?: (stage: 0 | 1 | 2) => void;
  onScrollReady?: (el: HTMLElement) => void;
}

export const SceneCanvas = React.memo(function SceneCanvas({
  progress,
  progressRef,
  textRef1,
  textRef2,
  textRef3,
  pinnedWrapRef,
  hudStagePillsRef,
  onStageChange,
  onScrollReady,
}: SceneCanvasProps): React.JSX.Element {
  const { viewport, size, gl } = useThree();
  const portalRef = useRef<HTMLElement>(null!);
  if (!portalRef.current && typeof document !== "undefined" && gl.domElement?.parentElement) {
    portalRef.current = gl.domElement.parentElement;
  }
  const currentOffsetRef = useRef<number>(0);

  // 3D Objects and Materials Refs
  const groupRef = useRef<THREE.Group>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const gridMatRef = useRef<THREE.LineBasicMaterial>(null);
  const accentLightRef = useRef<THREE.PointLight>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // DOM Screen Refs for embedded 3D HTML layers
  const userRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const yoloRef = useRef<HTMLDivElement>(null);
  const titleFilenameRef = useRef<HTMLDivElement>(null);

  // Track previous active stage to notify parent callback only on changes
  const prevStageRef = useRef<0 | 1 | 2>(0);

  // Mathematically centered unibody chassis geometry (strictly centered at [0, 0, 0])
  // Guaranteed zero offset across all 3 axes, eliminating detachment and orbital swing
  const chassisGeometry = useMemo(() => {
    const width = 3.12;
    const height = 2.26;
    const depth = 0.14;
    const radius = 0.08;
    const bevelSize = 0.02;
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
    // Translate Z so that geometric center is at z = 0,
    // front face is at +depth / 2 (+0.07), back face is at -depth / 2 (-0.07)
    geom.translate(0, 0, -depth / 2 + bevelSize);
    geom.computeVertexNormals();
    return geom;
  }, []);

  useEffect(() => {
    return () => {
      chassisGeometry.dispose();
    };
  }, [chassisGeometry]);
  // Cyberpunk starfield particles
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

  useFrame((_, delta) => {
    // Read normalized scroll progress directly from Framer Motion MotionValue
    const rawProgress = progress ? progress.get() : (progressRef?.current ?? 0);
    currentOffsetRef.current = THREE.MathUtils.damp(
      currentOffsetRef.current,
      rawProgress,
      7.0,
      delta
    );
    const offset = Math.max(0, Math.min(1, currentOffsetRef.current));

    // -----------------------------------------------------------------------
    // 1. SHARED SYNCHRONIZATION MATH (Exact same logic for 3D & HTML state)
    // -----------------------------------------------------------------------
    const {
      op1,
      op2,
      op3,
      textY1,
      textY2,
      textY3,
      activeStage,
      targetColorHex,
      titleText,
    } = calcScrollStageState(offset);

    // -----------------------------------------------------------------------
    // 2. 3D UI CONTAINER & JOURNEY (Requirement 2)
    //    Canvas is mounted inside the right column (54% screen width).
    //    Center (x = 0) aligns with the right column center (~73vw).
    // -----------------------------------------------------------------------
    const isMobile = size.width < 560;
    const baseScale = isMobile
      ? 0.72
      : Math.min(1.02, Math.max(0.78, viewport.width / 4.1));

    let targetX = 0;
    let targetY = isMobile ? 0.35 : 0.0;
    let targetZ = -0.05;
    let targetRotX = 0.22;
    let targetRotY = -0.32;
    let targetRotZ = 0.02;
    let targetScale = baseScale;

    if (offset <= 0.33) {
      // Stage 1 (0.0 – 0.33): Centered in right column, tilted downward with gentle float
      const floatT = Math.sin((offset * Math.PI) / 0.33);
      targetX = 0;
      targetY = (isMobile ? 0.35 : 0.0) + floatT * 0.035;
      targetZ = -0.05 + floatT * 0.035;
      targetRotX = 0.22;
      targetRotY = -0.32;
      targetRotZ = 0.02;
      targetScale = baseScale;
    } else if (offset <= 0.66) {
      // Transition from Stage 1 to Stage 2:
      // Swings forward on Z, scales up, rotates on Y, shifts down on Y for weight
      const t = (offset - 0.33) / 0.33;
      const s = t * t * (3 - 2 * t); // smoothstep interpolation

      const kf1Y = isMobile ? 0.35 : 0.0;
      const kf2Y = isMobile ? 0.15 : -0.16;

      targetX = THREE.MathUtils.lerp(0, -0.04, s);
      targetY = THREE.MathUtils.lerp(kf1Y, kf2Y, s);
      targetZ = THREE.MathUtils.lerp(-0.05, 0.45, s);
      targetRotX = THREE.MathUtils.lerp(0.22, -0.04, s);
      targetRotY = THREE.MathUtils.lerp(-0.32, 0.32, s);
      targetRotZ = THREE.MathUtils.lerp(0.02, -0.02, s);
      targetScale = THREE.MathUtils.lerp(baseScale, baseScale * 1.12, s);
    } else {
      // Transition from Stage 2 to Stage 3:
      // Hero perspective - balanced cinematic tilt keeping UI flush and locked
      const t = Math.min(1, (offset - 0.66) / 0.34);
      const s = t * t * (3 - 2 * t);

      const kf2Y = isMobile ? 0.15 : -0.16;
      const kf3Y = isMobile ? 0.25 : 0.02;

      targetX = THREE.MathUtils.lerp(-0.04, 0, s);
      targetY = THREE.MathUtils.lerp(kf2Y, kf3Y, s);
      targetZ = THREE.MathUtils.lerp(0.45, 0.12, s);
      targetRotX = THREE.MathUtils.lerp(-0.04, -0.14, s);
      targetRotY = THREE.MathUtils.lerp(0.32, -0.12, s);
      targetRotZ = THREE.MathUtils.lerp(-0.02, 0.01, s);
      targetScale = THREE.MathUtils.lerp(baseScale * 1.12, baseScale * 1.04, s);
    }

    // -----------------------------------------------------------------------
    // Unified Physical Mass & Damping (Equal inertia across all axes prevents detachment)
    // -----------------------------------------------------------------------
    const dampLambda = 6.0;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        targetX,
        dampLambda,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetY,
        dampLambda,
        delta
      );
      groupRef.current.position.z = THREE.MathUtils.damp(
        groupRef.current.position.z,
        targetZ,
        dampLambda,
        delta
      );

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        dampLambda,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        dampLambda,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        targetRotZ,
        dampLambda,
        delta
      );

      const currentScale = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(currentScale, targetScale, dampLambda, delta)
      );

      // Immediately sync matrixWorld across group and all children
      groupRef.current.updateMatrixWorld(true);
    }

    // -----------------------------------------------------------------------
    // 3. UI EMBEDDING & SCREEN SWAPPING (Requirement 3)
    //    ScreenUser fades out exactly as Stage 2 swings in, allowing ScreenAdmin
    //    to crossfade in; then ScreenYolo fades in for Stage 3.
    // -----------------------------------------------------------------------
    if (userRef.current) {
      userRef.current.style.opacity = op1.toFixed(3);
      userRef.current.style.pointerEvents = op1 > 0.5 ? "auto" : "none";
    }
    if (adminRef.current) {
      adminRef.current.style.opacity = op2.toFixed(3);
      adminRef.current.style.pointerEvents = op2 > 0.5 ? "auto" : "none";
    }
    if (yoloRef.current) {
      yoloRef.current.style.opacity = op3.toFixed(3);
      yoloRef.current.style.pointerEvents = op3 > 0.5 ? "auto" : "none";
    }

    // Update window filename text in macOS topbar
    if (
      titleFilenameRef.current &&
      titleFilenameRef.current.textContent !== titleText
    ) {
      titleFilenameRef.current.textContent = titleText;
    }

    // -----------------------------------------------------------------------
    // 4. SYNCHRONIZE LEFT-COLUMN HTML TEXT DESCRIPTIONS (Requirement 1)
    //    Updated in the exact same useFrame tick at 0ms latency.
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // 5. PINNED 2-COLUMN OVERLAY LOCK (Fixed in place at 0, 0 via sticky viewport)
    // -----------------------------------------------------------------------

    // -----------------------------------------------------------------------
    // 6. TOP HUD BAR STAGE HIGHLIGHTS & EVENT NOTIFICATION
    // -----------------------------------------------------------------------
    if (hudStagePillsRef?.current) {
      hudStagePillsRef.current.forEach((pill, idx) => {
        if (pill) {
          if (idx === activeStage) {
            pill.classList.add(styles.hudStageItemActive);
          } else {
            pill.classList.remove(styles.hudStageItemActive);
          }
        }
      });
    }

    if (prevStageRef.current !== activeStage) {
      prevStageRef.current = activeStage;
      if (onStageChange) {
        onStageChange(activeStage);
      }
    }

    // -----------------------------------------------------------------------
    // 7. DYNAMIC THEMATIC LIGHTING & CYBERPUNK FLOOR GRID DRIFT
    // -----------------------------------------------------------------------
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

    // Floor grid moves smoothly as you scroll forward through space
    if (gridRef.current) {
      gridRef.current.position.z = (offset * 60) % 2;
    }

    // Ambient starfield drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <>
      <color attach="background" args={["#05060D"]} />
      <fog attach="fog" args={["#05060D", 8, 26]} />

      {/* Dynamic 3D Scene Lighting & HDRI Reflections */}
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
      {/* Rim light to highlight physical chamfer edges */}
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

      {/* ===================================================================
          ROTATING 3D GROUP (Parent container with 3D backdrop & HTML screens)
          =================================================================== */}
      <group ref={groupRef} position={[0, 0, -0.05]}>
        {/* 1. Soft Diffuse Aura Glow Behind the Device Chassis */}
        <mesh position={[0, 0, -0.075]}>
          <planeGeometry args={[3.35, 2.5]} />
          <meshBasicMaterial
            ref={glowMatRef}
            color="#5b5bf0"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* 2. Physical Precision Beveled Chassis (Oryzo-tier Chamfered & Beveled Container) */}
        <mesh
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

        {/* 3. Projected HTML UI Screens locked directly to the front face of the chassis */}
        <Html
          transform
          center
          portal={portalRef}
          distanceFactor={1.0}
          position={[0, 0, 0.072]}
          style={{
            width: "1160px",
            height: "820px",
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#080c1d",
              borderRadius: "32px",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 48px 120px rgba(0, 0, 0, 0.75), 0 0 100px rgba(91, 91, 240, 0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxSizing: "border-box",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            {/* macOS Window Topbar */}
            <div
              style={{
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 32px",
                background: "rgba(10, 14, 30, 0.95)",
                borderBottom: "2px solid rgba(255, 255, 255, 0.08)",
                flexShrink: 0,
              }}
            >
              {/* Traffic Lights */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#ff5f57",
                  }}
                />
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#febc2e",
                  }}
                />
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#28c840",
                  }}
                />
              </div>

              {/* Window Filename Header */}
              <div
                ref={titleFilenameRef}
                style={{
                  fontFamily: "monospace",
                  fontSize: "1.5rem",
                  color: "#94a3b8",
                  letterSpacing: "1px",
                  fontWeight: 600,
                }}
              >
                intelligate_user.app
              </div>

              {/* Live 3D Status Beacon */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "1.35rem",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#4ade80",
                  background: "rgba(34, 197, 94, 0.12)",
                  border: "2px solid rgba(34, 197, 94, 0.35)",
                  padding: "4px 16px",
                  borderRadius: "9999px",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#22c55e",
                  }}
                />
                <span>LIVE 3D</span>
              </div>
            </div>

            {/* Stacked Screen Layers Absolutely Positioned on Top of Each Other */}
            <div
              style={{
                flex: 1,
                position: "relative",
                width: "100%",
                height: "740px",
                overflow: "hidden",
                background: "#050711",
              }}
            >
              {/* Screen 1: User Mobile App (0.00 – 0.33) */}
              <div
                ref={userRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                  pointerEvents: "auto",
                  transition: "none",
                }}
              >
                <ScreenUser />
              </div>

              {/* Screen 2: Admin Guard Station (0.33 – 0.66) */}
              <div
                ref={adminRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "none",
                }}
              >
                <ScreenAdmin />
              </div>

              {/* Screen 3: YOLOv11 Edge-AI Feed (0.66 – 1.00) */}
              <div
                ref={yoloRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "none",
                }}
              >
                <ScreenYolo />
              </div>
            </div>
          </div>
        </Html>
      </group>
    </>
  );
});

export default SceneCanvas;
