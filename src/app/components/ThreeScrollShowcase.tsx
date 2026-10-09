"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import styles from "./ThreeScrollShowcase.module.css";
import {
  Smartphone,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Scan,
  CheckCircle2,
  Lock,
  Unlock,
  Eye,
  RefreshCw,
  Compass,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// Stage data structure
interface ShowcaseStage {
  id: string;
  stepNumber: string;
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  features: string[];
  techBadge: string;
  mockupPlaceholderTitle: string;
  actionPrimaryText: string;
  actionSecondaryText: string;
}

const STAGES: ShowcaseStage[] = [
  {
    id: "hero-intro",
    stepNumber: "OVERVIEW",
    tag: "3D Interactive System Explorer",
    title: "Experience IntelliGate in",
    titleHighlight: "Real-Time 3D",
    description:
      "Scroll down to explore the end-to-end hardware and software pipeline. Watch the 3D models animate through the User Mobile Portal, Security Admin Console, and the Python YOLOv11 Edge-AI Vision Engine.",
    features: [
      "Scroll-driven dynamic 3D camera transitions & rotations",
      "Interactive 360° drag-to-inspect on any 3D model",
      "Full live hardware-to-cloud ALPR simulation",
    ],
    techBadge: "Three.js • WebGL • React 19",
    mockupPlaceholderTitle: "System Gateway",
    actionPrimaryText: "Start 3D Tour",
    actionSecondaryText: "Toggle Wireframe",
  },
  {
    id: "user-portal",
    stepNumber: "01 / USER APP",
    tag: "Flutter Mobile Client (Dart)",
    title: "Student & Faculty",
    titleHighlight: "Registration Portal",
    description:
      "A responsive cross-platform Flutter application allowing university students, faculty, and campus staff to submit vehicle credentials, view real-time entry clearance history, and access their digital campus pass.",
    features: [
      "Rapid vehicle registration with document OCR scanner",
      "Active vehicle credential pairing (Plate LGJ910 • 4W White)",
      "Instant student digital badge authentication (test123 • STUDENT)",
      "Real-time campus barrier clearance notifications",
    ],
    techBadge: "Flutter • Dart • Supabase",
    mockupPlaceholderTitle: "Mobile Portal Placeholder",
    actionPrimaryText: "Simulate Document Scan",
    actionSecondaryText: "Inspect Digital Pass",
  },
  {
    id: "admin-console",
    stepNumber: "02 / ADMIN SIDE",
    tag: "Security Guard Station & Monitor",
    title: "Live Campus Monitoring &",
    titleHighlight: "Admin Console",
    description:
      "Real-time surveillance and access command terminal for campus gate guards and security administrators. Displays live campus occupancy, microsecond timestamp verification logs, and manual barrier overrides.",
    features: [
      "Live campus capacity metrics (Registered: 3 | Inside: 1)",
      "Automated plate match card with TIME IN timestamp",
      "One-click servo barrier manual override for gate operators",
      "Searchable student ownership registry & incident logging",
    ],
    techBadge: "Next.js • WebSocket • ESP32 Relay",
    mockupPlaceholderTitle: "Admin Console Placeholder",
    actionPrimaryText: "Toggle Barrier Gate",
    actionSecondaryText: "Refresh Occupancy",
  },
  {
    id: "yolo-engine",
    stepNumber: "03 / YOLOv11 AI",
    tag: "Edge-AI Computer Vision",
    title: "Python YOLOv11s",
    titleHighlight: "Vision Pipeline",
    description:
      "Custom-trained deep learning computer vision model optimized for Philippine vehicle license plates. Executes sub-second edge inference, bounding box extraction, and character transcription via PaddleOCR.",
    features: [
      "Custom YOLOv11s weights trained on Philippine standard plates",
      "High-confidence bounding box localization (86.0% confidence)",
      "Instant character transcription: LGJ 910 (OLD_SERIES_4W)",
      "Ultra-low latency (<800ms) from camera capture to barrier trigger",
    ],
    techBadge: "Python • YOLOv11s • PaddleOCR • OpenCV",
    mockupPlaceholderTitle: "YOLOv11 Inference Feed Placeholder",
    actionPrimaryText: "Fire Laser Plate Scan",
    actionSecondaryText: "Toggle Bounding Box",
  },
];

// Helper to generate dynamic 2D canvas textures for 3D screens
function createPlaceholderTexture(
  type: "user" | "admin" | "yolo" | "intro",
  theme: "standard" | "wireframe" = "standard",
  extraData?: { scanActive?: boolean; gateOpen?: boolean }
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  const isWire = theme === "wireframe";
  ctx.fillStyle = isWire ? "#030712" : "#080c1d";
  ctx.fillRect(0, 0, 1024, 1024);

  // Background grid
  ctx.strokeStyle = isWire ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y < 1024; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  if (type === "user") {
    // -------------------------------------------------------------
    // USER MOBILE APP PLACEHOLDER
    // -------------------------------------------------------------
    // Header
    ctx.fillStyle = "#1a2ba6";
    ctx.fillRect(40, 40, 944, 110);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("INTELLIGATE PASS", 70, 110);
    ctx.fillStyle = "#f5a623";
    ctx.font = "600 24px monospace";
    ctx.fillText("STUDENT PORTAL", 740, 108);

    // Profile Card
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(40, 180, 944, 200);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Lawrence M. Rodeo", 80, 245);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "24px sans-serif";
    ctx.fillText("Student ID: test123 • BSCPE 4A", 80, 290);
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("● ACTIVE REGISTERED USER", 80, 340);

    // Vehicle License Card
    ctx.fillStyle = "rgba(245, 166, 35, 0.12)";
    ctx.strokeStyle = "#f5a623";
    ctx.lineWidth = 3;
    ctx.fillRect(40, 410, 944, 280);
    ctx.strokeRect(40, 410, 944, 280);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 20px monospace";
    ctx.fillText("REGISTERED VEHICLE PLATE", 80, 460);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 84px monospace";
    ctx.fillText("LGJ 910", 80, 560);

    ctx.fillStyle = "#f5a623";
    ctx.font = "600 26px sans-serif";
    ctx.fillText("Light 4-Wheel • White SUV (OLD_SERIES_4W)", 80, 630);

    // Scan Document Button Mockup
    ctx.fillStyle = extraData?.scanActive ? "#22c55e" : "#1a2ba6";
    ctx.beginPath();
    ctx.roundRect(80, 720, 864, 110, 24);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      extraData?.scanActive ? "✓ DOCUMENT VERIFIED & PAIRED" : "📷 SCAN VEHICLE OR / CR DOCUMENT",
      512,
      785
    );
    ctx.textAlign = "left";

    // Footer Status
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.fillRect(40, 860, 944, 120);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "22px monospace";
    ctx.fillText("GATE STATUS: Automated Barcode / ALPR Ready", 80, 930);
  } else if (type === "admin") {
    // -------------------------------------------------------------
    // ADMIN CONSOLE PLACEHOLDER
    // -------------------------------------------------------------
    // Top Bar
    ctx.fillStyle = "#0d1b7a";
    ctx.fillRect(40, 40, 944, 100);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("INTELLIGATE GUARD STATION • MAIN GATE", 70, 105);

    // Live Metrics Grid
    // Card 1
    ctx.fillStyle = "rgba(26, 43, 166, 0.25)";
    ctx.fillRect(40, 170, 450, 170);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px monospace";
    ctx.fillText("CAMPUS OCCUPANCY", 70, 215);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 56px monospace";
    ctx.fillText("1 / 3 INSIDE", 70, 290);

    // Card 2 - Barrier Status
    ctx.fillStyle = extraData?.gateOpen ? "rgba(34, 197, 94, 0.25)" : "rgba(239, 68, 68, 0.25)";
    ctx.fillRect(530, 170, 450, 170);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px monospace";
    ctx.fillText("SERVO BARRIER RELAY", 560, 215);
    ctx.fillStyle = extraData?.gateOpen ? "#4ade80" : "#f87171";
    ctx.font = "bold 56px monospace";
    ctx.fillText(extraData?.gateOpen ? "BARRIER OPEN" : "BARRIER DOWN", 560, 290);

    // Latest Verified Entry Feed
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(40, 370, 944, 390);
    ctx.fillStyle = "#f5a623";
    ctx.font = "bold 24px monospace";
    ctx.fillText("LATEST VEHICLE MATCH • REAL-TIME FEED", 70, 420);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px monospace";
    ctx.fillText("PLATE: LGJ 910", 70, 510);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "26px sans-serif";
    ctx.fillText("Matched Owner: Lawrence M. Rodeo (test123)", 70, 575);
    ctx.fillText("Time In: 2026-10-02  18:10:11.849", 70, 625);
    ctx.fillStyle = "#22c55e";
    ctx.fillText("Access Status: AUTHORIZED ENTRY GRANTED", 70, 680);

    // Live Audit Log Bottom
    ctx.fillStyle = "rgba(10, 16, 42, 0.9)";
    ctx.fillRect(40, 790, 944, 190);
    ctx.fillStyle = "#64748b";
    ctx.font = "20px monospace";
    ctx.fillText("[18:10:11] YOLOv11: Plate LGJ 910 localized with 86.0% conf", 70, 840);
    ctx.fillText("[18:10:12] PaddleOCR: Transcribed string LGJ 910", 70, 885);
    ctx.fillText("[18:10:12] Supabase: Auth match confirmed • Servo triggered", 70, 930);
  } else if (type === "yolo") {
    // -------------------------------------------------------------
    // YOLOv11s EDGE-AI VISION PLACEHOLDER
    // -------------------------------------------------------------
    // Simulated Camera Feed Frame
    ctx.fillStyle = "#050914";
    ctx.fillRect(40, 40, 944, 944);

    // Reticle & HUD Corners
    ctx.strokeStyle = "#f5a623";
    ctx.lineWidth = 3;
    // Corners
    ctx.strokeRect(60, 60, 900, 900);

    // Header Info
    ctx.fillStyle = "#f5a623";
    ctx.font = "bold 26px monospace";
    ctx.fillText("YOLOv11s INFERENCE FEED • 60 FPS • EDGE RT", 90, 110);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "22px monospace";
    ctx.fillText("LATENCY: 24.8ms | RESOLUTION: 1920x1080 | ONNX RUNTIME", 90, 150);

    // Simulated Vehicle Bounding Box
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 4;
    ctx.strokeRect(180, 240, 660, 480);
    ctx.fillStyle = "rgba(34, 197, 94, 0.1)";
    ctx.fillRect(180, 240, 660, 480);

    // Bounding Box Label
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(180, 200, 360, 40);
    ctx.fillStyle = "#040711";
    ctx.font = "bold 22px monospace";
    ctx.fillText("OLD_SERIES_4W: 86.0%", 195, 230);

    // License Plate Focus Box
    ctx.strokeStyle = "#f5a623";
    ctx.lineWidth = 6;
    ctx.strokeRect(260, 450, 500, 190);
    ctx.fillStyle = "rgba(245, 166, 35, 0.25)";
    ctx.fillRect(260, 450, 500, 190);

    // Laser scan line
    ctx.fillStyle = "rgba(245, 166, 35, 0.8)";
    ctx.fillRect(260, 540, 500, 6);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px monospace";
    ctx.textAlign = "center";
    ctx.fillText("LGJ 910", 510, 565);
    ctx.textAlign = "left";

    // Bottom Stats
    ctx.fillStyle = "rgba(10, 16, 42, 0.85)";
    ctx.fillRect(60, 770, 900, 170);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px monospace";
    ctx.fillText("PaddleOCR Transcription: LGJ 910 (Exact Match)", 90, 830);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "22px monospace";
    ctx.fillText("Hardware Relay: ESP32 WebSocket Pulse OK", 90, 880);
    ctx.fillText("Inference Decision: PASS GRANTED (< 800ms)", 90, 920);
  } else {
    // INTRO / HERO PLACEHOLDER
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("INTELLIGATE 3D", 512, 480);
    ctx.fillStyle = "#f5a623";
    ctx.font = "600 30px monospace";
    ctx.fillText("SCROLL TO EXPLORE ARCHITECTURE", 512, 550);
    ctx.textAlign = "left";
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ThreeScrollShowcase(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active step & UI states
  const [activeStep, setActiveStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [renderMode, setRenderMode] = useState<"standard" | "wireframe">("standard");
  const [useRealScreenshots, setUseRealScreenshots] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive mock triggers
  const [scanSimulated, setScanSimulated] = useState<boolean>(false);
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [laserActive, setLaserActive] = useState<boolean>(true);

  // Three.js internal references
  const threeState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    phoneGroup: THREE.Group;
    adminGroup: THREE.Group;
    yoloGroup: THREE.Group;
    particles: THREE.Points;
    laserMesh?: THREE.Mesh;
    phoneScreenMesh?: THREE.Mesh;
    adminScreenMesh?: THREE.Mesh;
    yoloScreenMesh?: THREE.Mesh;
    phonePlaceholderTexture?: THREE.CanvasTexture;
    adminPlaceholderTexture?: THREE.CanvasTexture;
    yoloPlaceholderTexture?: THREE.CanvasTexture;
    phoneRealTexture?: THREE.Texture;
    adminRealTexture?: THREE.Texture;
    yoloRealTexture?: THREE.Texture;
    targetScroll: number;
    currentScroll: number;
    targetMouse: { x: number; y: number };
    currentMouse: { x: number; y: number };
    isDragging: boolean;
    dragPrevious: { x: number; y: number };
    userRotationOffset: { x: number; y: number };
    animId: number;
  } | null>(null);

  // Toast alert trigger
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Update canvas textures when states toggle
  const refreshTextures = useCallback(() => {
    if (!threeState.current) return;
    const {
      phoneScreenMesh,
      adminScreenMesh,
      yoloScreenMesh,
      phonePlaceholderTexture,
      adminPlaceholderTexture,
      yoloPlaceholderTexture,
      phoneRealTexture,
      adminRealTexture,
      yoloRealTexture,
    } = threeState.current;

    // Dispose old textures
    phonePlaceholderTexture?.dispose();
    adminPlaceholderTexture?.dispose();
    yoloPlaceholderTexture?.dispose();

    const newPhoneTex = createPlaceholderTexture("user", renderMode, { scanActive: scanSimulated });
    const newAdminTex = createPlaceholderTexture("admin", renderMode, { gateOpen });
    const newYoloTex = createPlaceholderTexture("yolo", renderMode);

    threeState.current.phonePlaceholderTexture = newPhoneTex;
    threeState.current.adminPlaceholderTexture = newAdminTex;
    threeState.current.yoloPlaceholderTexture = newYoloTex;

    if (phoneScreenMesh) {
      const mat = phoneScreenMesh.material as THREE.MeshStandardMaterial;
      mat.map = useRealScreenshots && phoneRealTexture ? phoneRealTexture : newPhoneTex;
      mat.wireframe = renderMode === "wireframe";
      mat.needsUpdate = true;
    }

    if (adminScreenMesh) {
      const mat = adminScreenMesh.material as THREE.MeshStandardMaterial;
      mat.map = useRealScreenshots && adminRealTexture ? adminRealTexture : newAdminTex;
      mat.wireframe = renderMode === "wireframe";
      mat.needsUpdate = true;
    }

    if (yoloScreenMesh) {
      const mat = yoloScreenMesh.material as THREE.MeshStandardMaterial;
      mat.map = useRealScreenshots && yoloRealTexture ? yoloRealTexture : newYoloTex;
      mat.wireframe = renderMode === "wireframe";
      mat.needsUpdate = true;
    }
  }, [renderMode, scanSimulated, gateOpen, useRealScreenshots]);

  // Primary Three.js setup effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040711, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const blueSpot = new THREE.PointLight(0x1a2ba6, 40, 20);
    blueSpot.position.set(-4, 3, 4);
    scene.add(blueSpot);

    const goldSpot = new THREE.PointLight(0xf5a623, 50, 20);
    goldSpot.position.set(4, -2, 4);
    scene.add(goldSpot);

    const frontDir = new THREE.DirectionalLight(0xffffff, 1.2);
    frontDir.position.set(0, 5, 8);
    scene.add(frontDir);

    // 4. Background Starfield / Floating Neural Particles
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colBlue = new THREE.Color(0x1a2ba6);
    const colGold = new THREE.Color(0xf5a623);
    const colCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const pick = Math.random();
      const c = pick < 0.45 ? colBlue : pick < 0.75 ? colGold : colCyan;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Build 3D Models
    // Texture loader for real screenshots fallback
    const texLoader = new THREE.TextureLoader();
    const phoneRealTexture = texLoader.load("/f06fc00e-c7f5-49c9-98db-1e298508c365.jpg");
    const adminRealTexture = texLoader.load("/d0375754-58f3-43e0-b816-377fd0b9132f.jpg");
    const yoloRealTexture = texLoader.load("/yolov11s.png");

    const phonePlaceholderTexture = createPlaceholderTexture("user", "standard");
    const adminPlaceholderTexture = createPlaceholderTexture("admin", "standard");
    const yoloPlaceholderTexture = createPlaceholderTexture("yolo", "standard");

    // -------------------------------------------------------------------
    // MODEL 1: Sleek Smartphone (User Mobile Portal)
    // -------------------------------------------------------------------
    const phoneGroup = new THREE.Group();
    // Phone Chassis
    const phoneBodyGeo = new THREE.BoxGeometry(1.8, 3.6, 0.16);
    const phoneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.25,
    });
    const phoneBodyMesh = new THREE.Mesh(phoneBodyGeo, phoneBodyMat);
    phoneGroup.add(phoneBodyMesh);

    // Metallic rim border
    const rimGeo = new THREE.BoxGeometry(1.84, 3.64, 0.14);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x374151,
      metalness: 0.95,
      roughness: 0.15,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    phoneGroup.add(rimMesh);

    // Front Screen
    const phoneScreenGeo = new THREE.PlaneGeometry(1.68, 3.44);
    const phoneScreenMat = new THREE.MeshStandardMaterial({
      map: phonePlaceholderTexture,
      roughness: 0.3,
      metalness: 0.1,
    });
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.z = 0.085;
    phoneGroup.add(phoneScreenMesh);

    // Dynamic Island camera notch
    const notchGeo = new THREE.BoxGeometry(0.35, 0.08, 0.02);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.position.set(0, 1.62, 0.09);
    phoneGroup.add(notchMesh);

    // Floating cyber hologram ring orbiting phone
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf5a623,
      transparent: true,
      opacity: 0.45,
    });
    const phoneHoloRing = new THREE.Mesh(ringGeo, ringMat);
    phoneHoloRing.rotation.x = Math.PI / 2.3;
    phoneGroup.add(phoneHoloRing);

    phoneGroup.position.set(1.5, 0, 0);
    scene.add(phoneGroup);

    // -------------------------------------------------------------------
    // MODEL 2: Admin Security Station (Wide Console & Dual Display)
    // -------------------------------------------------------------------
    const adminGroup = new THREE.Group();

    // Main Monitor Screen
    const adminMonitorGeo = new THREE.BoxGeometry(4.2, 2.6, 0.15);
    const adminMonitorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const adminMonitorMesh = new THREE.Mesh(adminMonitorGeo, adminMonitorMat);
    adminGroup.add(adminMonitorMesh);

    const adminScreenGeo = new THREE.PlaneGeometry(4.0, 2.4);
    const adminScreenMat = new THREE.MeshStandardMaterial({
      map: adminPlaceholderTexture,
      roughness: 0.3,
      metalness: 0.1,
    });
    const adminScreenMesh = new THREE.Mesh(adminScreenGeo, adminScreenMat);
    adminScreenMesh.position.z = 0.08;
    adminGroup.add(adminScreenMesh);

    // Aluminum Stand & Base
    const standGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 16);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.95,
      roughness: 0.2,
    });
    const standMesh = new THREE.Mesh(standGeo, standMat);
    standMesh.position.set(0, -1.8, -0.3);
    adminGroup.add(standMesh);

    const baseGeo = new THREE.BoxGeometry(1.6, 0.08, 1.0);
    const baseMesh = new THREE.Mesh(baseGeo, standMat);
    baseMesh.position.set(0, -2.4, -0.2);
    adminGroup.add(baseMesh);

    // Ambient backglow bar behind monitor
    const backLightGeo = new THREE.BoxGeometry(3.6, 0.05, 0.02);
    const backLightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const backLightMesh = new THREE.Mesh(backLightGeo, backLightMat);
    backLightMesh.position.set(0, 0, -0.09);
    adminGroup.add(backLightMesh);

    adminGroup.position.set(8, 0, -2); // initially offscreen
    scene.add(adminGroup);

    // -------------------------------------------------------------------
    // MODEL 3: YOLOv11 Edge-AI Scanner Unit & License Plate Target
    // -------------------------------------------------------------------
    const yoloGroup = new THREE.Group();

    // 3D Camera / Vision Sensor Housing
    const camHousingGeo = new THREE.BoxGeometry(1.4, 0.9, 1.8);
    const camHousingMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const camHousingMesh = new THREE.Mesh(camHousingGeo, camHousingMat);
    camHousingMesh.position.set(0, 1.8, -0.8);
    yoloGroup.add(camHousingMesh);

    // Camera Lens Cylinder
    const lensGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.9,
      roughness: 0.1,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.rotation.x = Math.PI / 2;
    lensMesh.position.set(0, 1.8, 0.2);
    yoloGroup.add(lensMesh);

    // Lens Glowing Aperture Ring
    const apertureGeo = new THREE.TorusGeometry(0.35, 0.03, 16, 32);
    const apertureMat = new THREE.MeshBasicMaterial({ color: 0xf5a623 });
    const apertureMesh = new THREE.Mesh(apertureGeo, apertureMat);
    apertureMesh.position.set(0, 1.8, 0.46);
    yoloGroup.add(apertureMesh);

    // License Plate Target Mesh
    const plateGeo = new THREE.BoxGeometry(3.2, 1.7, 0.08);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.25,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0, -0.2, 0.4);
    yoloGroup.add(plateMesh);

    const plateFaceGeo = new THREE.PlaneGeometry(3.1, 1.6);
    const plateFaceMat = new THREE.MeshStandardMaterial({
      map: yoloPlaceholderTexture,
      roughness: 0.3,
      metalness: 0.1,
    });
    const yoloScreenMesh = new THREE.Mesh(plateFaceGeo, plateFaceMat);
    yoloScreenMesh.position.set(0, -0.2, 0.45);
    yoloGroup.add(yoloScreenMesh);

    // Laser Beam Plane sweeping across plate
    const laserGeo = new THREE.PlaneGeometry(3.4, 0.08);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0xf5a623,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, -0.2, 0.48);
    yoloGroup.add(laserMesh);

    // 3D Bounding Box Wireframe Corners around plate
    const bboxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.3, 1.8, 0.2));
    const bboxLineMat = new THREE.LineBasicMaterial({
      color: 0x22c55e,
      linewidth: 2,
    });
    const bboxWire = new THREE.LineSegments(bboxEdges, bboxLineMat);
    bboxWire.position.set(0, -0.2, 0.4);
    yoloGroup.add(bboxWire);

    yoloGroup.position.set(8, 0, -2); // initially offscreen
    scene.add(yoloGroup);

    // Save state ref
    threeState.current = {
      scene,
      camera,
      renderer,
      phoneGroup,
      adminGroup,
      yoloGroup,
      particles,
      laserMesh,
      phoneScreenMesh,
      adminScreenMesh,
      yoloScreenMesh,
      phonePlaceholderTexture,
      adminPlaceholderTexture,
      yoloPlaceholderTexture,
      phoneRealTexture,
      adminRealTexture,
      yoloRealTexture,
      targetScroll: 0,
      currentScroll: 0,
      targetMouse: { x: 0, y: 0 },
      currentMouse: { x: 0, y: 0 },
      isDragging: false,
      dragPrevious: { x: 0, y: 0 },
      userRotationOffset: { x: 0, y: 0 },
      animId: 0,
    };

    // 6. Mouse & Touch Drag Interaction
    const onMouseDown = (e: MouseEvent) => {
      if (!threeState.current) return;
      threeState.current.isDragging = true;
      threeState.current.dragPrevious = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!threeState.current) return;
      const rect = canvas.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      threeState.current.targetMouse = { x: normX * 0.4, y: normY * 0.4 };

      if (threeState.current.isDragging) {
        const deltaX = e.clientX - threeState.current.dragPrevious.x;
        const deltaY = e.clientY - threeState.current.dragPrevious.y;
        threeState.current.userRotationOffset.y += deltaX * 0.008;
        threeState.current.userRotationOffset.x += deltaY * 0.008;
        threeState.current.dragPrevious = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      if (threeState.current) threeState.current.isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize handler
    const onResize = () => {
      if (!canvas || !threeState.current) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop with Smooth Interpolation (Lerp)
    let clock = new THREE.Clock();

    const animate = () => {
      const state = threeState.current;
      if (!state) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll lerp
      state.currentScroll += (state.targetScroll - state.currentScroll) * 0.08;
      const p = Math.max(0, Math.min(1, state.currentScroll));

      // Mouse parallax lerp
      state.currentMouse.x += (state.targetMouse.x - state.currentMouse.x) * 0.06;
      state.currentMouse.y += (state.targetMouse.y - state.currentMouse.y) * 0.06;

      // User drag inertia decay
      if (!state.isDragging) {
        state.userRotationOffset.x *= 0.96;
        state.userRotationOffset.y *= 0.96;
      }

      // Rotate background particles
      state.particles.rotation.y = elapsedTime * 0.02;
      state.particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      // Hologram ring spin
      phoneHoloRing.rotation.z = elapsedTime * 0.4;

      // Laser sweep animation on YOLO unit
      if (state.laserMesh) {
        state.laserMesh.position.y = -0.2 + Math.sin(elapsedTime * 3.5) * 0.65;
        state.laserMesh.visible = laserActive;
      }

      // ===============================================================
      // SCROLL STAGE CHOREOGRAPHY (p goes from 0.0 to 1.0)
      // ===============================================================
      // Segment 0 -> 0.33: Phone (User Portal)
      // Segment 0.33 -> 0.66: Admin Console
      // Segment 0.66 -> 1.0: YOLOv11 Edge-AI Scanner
      // ===============================================================

      if (p <= 0.33) {
        // --- STAGE 1: USER MOBILE APP ---
        const sub = p / 0.33; // 0 to 1

        // Phone is in the foreground
        state.phoneGroup.position.x = 1.6 + state.currentMouse.x * 0.5;
        state.phoneGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08 + state.currentMouse.y * 0.5;
        state.phoneGroup.position.z = 0.5 + sub * 0.4;

        state.phoneGroup.rotation.y =
          -0.28 + sub * 0.15 + state.currentMouse.x * 0.3 + state.userRotationOffset.y;
        state.phoneGroup.rotation.x =
          0.12 - sub * 0.06 - state.currentMouse.y * 0.3 + state.userRotationOffset.x;
        state.phoneGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02;

        // Admin & YOLO offscreen
        state.adminGroup.position.x = 8;
        state.adminGroup.position.z = -5;
        state.yoloGroup.position.x = 8;
      } else if (p <= 0.66) {
        // --- STAGE 2: ADMIN SECURITY CONSOLE ---
        const sub = (p - 0.33) / 0.33; // 0 to 1

        // Transition: Phone glides to the left and fades back
        state.phoneGroup.position.x = 1.6 - sub * 10;
        state.phoneGroup.position.z = 0.9 - sub * 4;

        // Admin console glides into center-right view
        state.adminGroup.position.x = 1.5 - (1 - sub) * 6 + state.currentMouse.x * 0.4;
        state.adminGroup.position.y =
          Math.sin(elapsedTime * 1.2) * 0.06 + state.currentMouse.y * 0.4;
        state.adminGroup.position.z = 0.2;

        state.adminGroup.rotation.y =
          -0.22 + state.currentMouse.x * 0.25 + state.userRotationOffset.y;
        state.adminGroup.rotation.x =
          0.08 - state.currentMouse.y * 0.25 + state.userRotationOffset.x;

        // YOLO unit offscreen
        state.yoloGroup.position.x = 8;
      } else {
        // --- STAGE 3: YOLOv11 EDGE-AI SCANNER ---
        const sub = (p - 0.66) / 0.34; // 0 to 1

        state.phoneGroup.position.x = -10;

        // Admin slides away
        state.adminGroup.position.x = 1.5 - sub * 10;
        state.adminGroup.position.z = 0.2 - sub * 4;

        // YOLO scanner glides in center stage
        state.yoloGroup.position.x = 1.5 - (1 - sub) * 6 + state.currentMouse.x * 0.4;
        state.yoloGroup.position.y =
          Math.sin(elapsedTime * 1.5) * 0.07 + state.currentMouse.y * 0.4;
        state.yoloGroup.position.z = 0.4;

        state.yoloGroup.rotation.y =
          -0.18 + state.currentMouse.x * 0.3 + state.userRotationOffset.y;
        state.yoloGroup.rotation.x =
          0.06 - state.currentMouse.y * 0.25 + state.userRotationOffset.x;
      }

      state.renderer.render(state.scene, state.camera);
      state.animId = requestAnimationFrame(animate);
    };

    threeState.current.animId = requestAnimationFrame(animate);

    return () => {
      if (threeState.current) {
        cancelAnimationFrame(threeState.current.animId);
      }
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [laserActive]);

  // Scroll listener tracking runway progression
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || !threeState.current) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      threeState.current.targetScroll = progress;
      setScrollProgress(progress);

      // Determine active step (0: Intro, 1: User App, 2: Admin Side, 3: YOLOv11)
      if (progress < 0.15) {
        setActiveStep(0);
      } else if (progress < 0.48) {
        setActiveStep(1);
      } else if (progress < 0.78) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update textures whenever interactive state changes
  useEffect(() => {
    refreshTextures();
  }, [refreshTextures]);

  // Programmatic scroll jump to a specific step
  const scrollToStep = (stepIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targets = [0, 0.28, 0.62, 0.95];
    const targetY = container.offsetTop + targets[stepIndex] * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Stage Action handlers
  const handlePrimaryAction = (stepIdx: number) => {
    if (stepIdx === 0) {
      scrollToStep(1);
    } else if (stepIdx === 1) {
      setScanSimulated(true);
      showToast("OCR Vehicle Document Verified: Plate LGJ 910 paired to user test123!");
    } else if (stepIdx === 2) {
      setGateOpen((prev) => !prev);
      showToast(
        !gateOpen
          ? "MG996R Servo Gate Raised: BARRIER OPEN (90° Sweep)"
          : "Servo Barrier Closed: Access Lane Locked"
      );
    } else if (stepIdx === 3) {
      setLaserActive(true);
      showToast("YOLOv11s Live Inference Executed: 86.0% Conf • Plate LGJ 910 Transcribed in 24.8ms");
    }
  };

  const handleSecondaryAction = (stepIdx: number) => {
    if (stepIdx === 0) {
      setRenderMode((prev) => (prev === "wireframe" ? "standard" : "wireframe"));
    } else if (stepIdx === 1) {
      showToast("Student Pass Verified: Lawrence M. Rodeo • BSCPE 4A • Active");
    } else if (stepIdx === 2) {
      showToast("Occupancy Synchronized: 1 Inside / 3 Registered Total");
    } else if (stepIdx === 3) {
      setLaserActive((prev) => !prev);
      showToast(`Laser Target Sweep: ${!laserActive ? "ENABLED" : "PAUSED"}`);
    }
  };

  const currentStage = STAGES[activeStep];

  return (
    <section className={styles.showcaseRoot} id="three-system-explorer">
      {/* Scroll Runway Section (400vh for 4 fluid milestones) */}
      <div ref={containerRef} className={styles.scrollSectionTrack}>
        {/* Sticky 3D WebGL Viewport */}
        <div className={styles.stickyViewport}>
          {/* Subtle Cyber Grids & Background Aura */}
          <div className={styles.ambientBackgroundGlow} />
          <div className={styles.gridOverlay} />

          {/* Interactive 3D Canvas */}
          <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.threeCanvas} />
          </div>

          {/* Top HUD: Step Indicators & Brand Badge */}
          <header className={styles.hudTopBar}>
            <div className={styles.hudBrandBadge}>
              <span className={styles.pulseBeacon} />
              <span>INTELLIGATE 3D ENGINE</span>
            </div>

            <nav className={styles.hudStepNav} aria-label="3D Stages">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`${styles.stepNavBtn} ${
                    activeStep === idx ? styles.stepNavBtnActive : ""
                  }`}
                  aria-label={`Jump to stage ${s.stepNumber}`}
                >
                  {idx === 0 ? "Intro" : s.stepNumber.split(" ")[0]}
                </button>
              ))}
            </nav>
          </header>

          {/* Dynamic Floating Glassmorphic Content Card (Left Side) */}
          <div className={styles.stageContentOverlay}>
            <div className={styles.stageCardWrapper}>
              <div className={styles.stageGlassCard}>
                <div className={styles.cardGlowBorder} />

                <div className={styles.stageTagRow}>
                  <div className={styles.stageIndexBadge}>
                    <Sparkles size={13} />
                    <span>{currentStage.stepNumber}</span>
                  </div>
                  <span className={styles.stageTechBadge}>{currentStage.techBadge}</span>
                </div>

                <h2 className={styles.stageTitle}>
                  {currentStage.title}{" "}
                  <span className={styles.stageTitleHighlight}>
                    {currentStage.titleHighlight}
                  </span>
                </h2>

                <p className={styles.stageDescription}>{currentStage.description}</p>

                <div className={styles.featureList}>
                  {currentStage.features.map((feat, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <div className={styles.featureIconWrap}>
                        <CheckCircle2 size={16} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Simulation Buttons */}
                <div className={styles.interactiveActionRow}>
                  <button
                    type="button"
                    className={styles.actionButtonPrimary}
                    onClick={() => handlePrimaryAction(activeStep)}
                  >
                    {activeStep === 0 && <Compass size={16} />}
                    {activeStep === 1 && <Scan size={16} />}
                    {activeStep === 2 && (gateOpen ? <Lock size={16} /> : <Unlock size={16} />)}
                    {activeStep === 3 && <Eye size={16} />}
                    <span>{currentStage.actionPrimaryText}</span>
                  </button>

                  <button
                    type="button"
                    className={styles.actionButtonSecondary}
                    onClick={() => handleSecondaryAction(activeStep)}
                  >
                    <RefreshCw size={14} />
                    <span>{currentStage.actionSecondaryText}</span>
                  </button>
                </div>

                {/* Simulated Toast Notification Alert */}
                {toastMessage && (
                  <div className={styles.simulatedToast} role="status">
                    <CheckCircle2 size={15} />
                    <span>{toastMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vertical Progress Rail (Right Side) */}
          <div className={styles.verticalProgressRail}>
            <div
              className={styles.verticalProgressBar}
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
            {STAGES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToStep(idx)}
                className={`${styles.railDot} ${
                  activeStep === idx ? styles.railDotActive : ""
                }`}
                title={`Jump to stage ${idx}`}
                aria-label={`Jump to stage ${idx}`}
              />
            ))}
          </div>

          {/* Bottom HUD: 3D Viewport Controls */}
          <footer className={styles.hudControlsBottom}>
            <div className={styles.dragTip}>
              <Compass size={14} />
              <span>Drag canvas to inspect in 360° • Scroll down to advance</span>
            </div>

            <div className={styles.hudControlGroup}>
              {/* Toggle Real Screenshots vs Placeholders */}
              <button
                type="button"
                className={`${styles.controlBtn} ${
                  useRealScreenshots ? styles.controlBtnActive : ""
                }`}
                onClick={() => {
                  setUseRealScreenshots((prev) => !prev);
                  showToast(
                    !useRealScreenshots
                      ? "Switched to Real Project Screenshots!"
                      : "Switched to Stylized 3D UI Placeholders!"
                  );
                }}
                title="Switch between project screenshots and generated UI placeholders"
              >
                <Layers size={14} />
                <span>{useRealScreenshots ? "Real Screenshots" : "UI Placeholders"}</span>
              </button>

              {/* Wireframe / Hologram Mode */}
              <button
                type="button"
                className={`${styles.controlBtn} ${
                  renderMode === "wireframe" ? styles.controlBtnActive : ""
                }`}
                onClick={() => {
                  setRenderMode((prev) => (prev === "wireframe" ? "standard" : "wireframe"));
                }}
                title="Toggle Wireframe Blueprint mode"
              >
                <Sparkles size={14} />
                <span>{renderMode === "wireframe" ? "Wireframe ON" : "Hologram"}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
