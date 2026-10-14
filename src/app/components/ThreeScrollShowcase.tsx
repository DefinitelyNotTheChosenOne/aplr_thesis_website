"use client";

import React, { useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { getLenis } from "../lib/lenis";
import { SceneCanvas, type StageIndex } from "./SceneCanvas";
import styles from "./ThreeScrollShowcase.module.css";
import {
  Scan,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Eye,
  CheckCircle2,
  Cpu,
  Sparkles,
  Download,
  ArrowRight,
  Compass,
} from "lucide-react";

const STAGE_HOLD_OFFSETS: Record<StageIndex, number> = {
  0: 0.0,  // 00 Hero (Centered 3D Screen + Side Wings)
  1: 0.36, // 01 User App (Right 3D Screen + Left Description)
  2: 0.65, // 02 Admin Side (Right 3D Screen + Left Description)
  3: 0.93, // 03 YOLOv11 AI (Right 3D Screen + Left Description)
};

export function ThreeScrollShowcase(): React.JSX.Element {
  const [activeStage, setActiveStage] = useState<StageIndex>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 400vh parent runway tracked by Framer Motion useScroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Stage 0 (Hero) Left & Right Wing Refs
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroScrollHintRef = useRef<HTMLDivElement>(null);

  // Stages 1, 2, 3 Left-Column Card Refs
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  // Top HUD Bar Pill Refs (0..3)
  const hudStagePillsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleStageChange = useCallback((stage: StageIndex) => {
    setActiveStage(stage);
  }, []);

  const scrollToStage = (stageIndex: StageIndex) => {
    if (!containerRef.current) return;
    const lenis = getLenis();
    const rect = containerRef.current.getBoundingClientRect();
    const runwayTop = window.scrollY + rect.top;
    const scrollableDistance =
      containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll =
      runwayTop + STAGE_HOLD_OFFSETS[stageIndex] * scrollableDistance;

    if (lenis) {
      lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <section
      ref={containerRef}
      className={styles.showcaseRunway}
      id="three-scroll-showcase"
    >
      <div className={styles.stickyViewport}>
        {/* =================================================================
            1. FULL-BLEED 3D WEBGL CANVAS (Allows Center Hero -> Right Glide)
            ================================================================= */}
        <div className={styles.canvasWrapper}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <SceneCanvas
              progress={scrollYProgress}
              heroLeftRef={heroLeftRef}
              heroRightRef={heroRightRef}
              heroScrollHintRef={heroScrollHintRef}
              textRef1={textRef1}
              textRef2={textRef2}
              textRef3={textRef3}
              hudStagePillsRef={hudStagePillsRef}
              onStageChange={handleStageChange}
            />
          </Canvas>
        </div>

        {/* =================================================================
            2. TOP HUD BAR (Brand Beacon & 4 Stage Navigation Pills)
            ================================================================= */}
        <header className={styles.hudTopBar}>
          <div className={styles.hudBrandBadge}>
            <span className={styles.pulseBeacon} />
            <span>INTELLIGATE 3D ENGINE</span>
          </div>

          <nav className={styles.hudStagePill} aria-label="3D Scrollytelling Stages">
            <button
              type="button"
              ref={(el) => {
                hudStagePillsRef.current[0] = el;
              }}
              className={`${styles.hudStageItem} ${
                activeStage === 0 ? styles.hudStageItemActive : ""
              }`}
              onClick={() => scrollToStage(0)}
              aria-label="Navigate to 00 Hero"
            >
              <Compass size={13} />
              <span>00 Hero</span>
            </button>
            <button
              type="button"
              ref={(el) => {
                hudStagePillsRef.current[1] = el;
              }}
              className={`${styles.hudStageItem} ${
                activeStage === 1 ? styles.hudStageItemActive : ""
              }`}
              onClick={() => scrollToStage(1)}
              aria-label="Navigate to 01 User App"
            >
              <Smartphone size={13} />
              <span>01 User App</span>
            </button>
            <button
              type="button"
              ref={(el) => {
                hudStagePillsRef.current[2] = el;
              }}
              className={`${styles.hudStageItem} ${
                activeStage === 2 ? styles.hudStageItemActive : ""
              }`}
              onClick={() => scrollToStage(2)}
              aria-label="Navigate to 02 Admin Side"
            >
              <ShieldCheck size={13} />
              <span>02 Admin Side</span>
            </button>
            <button
              type="button"
              ref={(el) => {
                hudStagePillsRef.current[3] = el;
              }}
              className={`${styles.hudStageItem} ${
                activeStage === 3 ? styles.hudStageItemActive : ""
              }`}
              onClick={() => scrollToStage(3)}
              aria-label="Navigate to 03 YOLOv11 AI"
            >
              <Cpu size={13} />
              <span>03 YOLOv11 AI</span>
            </button>
          </nav>
        </header>

        {/* =================================================================
            3. STAGE 0: HERO SPLIT WINGS (Flanking the Centered 3D Screen)
            ================================================================= */}
        <div className={styles.heroWingsOverlay}>
          {/* Left Hero Wing: Capstone Badge & Main Title */}
          <div ref={heroLeftRef} className={styles.heroWingLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              <span>Dr. Yanga&apos;s Colleges Inc. • BSCPE 4A</span>
            </div>

            <h1 className={styles.heroSplitTitle}>
              Campus Access <br />
              Has Never Been <br />
              <span className={styles.heroTitleGradient}>Smoother</span>
            </h1>

            <p className={styles.heroCaption}>
              Edge-AI Automatic License Plate Recognition &amp; Smart Gate
              Verification System.
            </p>
          </div>

          {/* Center Gap (~44% width) reserved for the floating 3D Monitor */}
          <div className={styles.heroCenterSpacer} aria-hidden="true" />

          {/* Right Hero Wing: Thesis Overview & Action CTAs */}
          <div ref={heroRightRef} className={styles.heroWingRight}>
            <div className={styles.heroRightCard}>
              <div className={styles.heroRightLabel}>
                <Sparkles size={14} color="#f5a623" />
                <span>REAL-TIME ALPR ECOSYSTEM</span>
              </div>

              <p className={styles.heroRightDesc}>
                Experience seamless university gate clearance powered by
                real-time Flutter mobile passes, guard station telemetry, and
                sub-second YOLOv11s computer vision.
              </p>

              <div className={styles.heroRightActions}>
                <button
                  type="button"
                  className={styles.btnHeroGold}
                  onClick={() => scrollToStage(1)}
                >
                  <span>Explore System</span>
                  <ArrowRight size={17} />
                </button>

                <a
                  href="https://drive.google.com/drive/folders/119sLWwebH6a5DMppAmZeSClt8jMkla7V?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnHeroSecondary}
                >
                  <span>Download App</span>
                  <Download size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            4. STAGES 1–3: LEFT-COLUMN DESCRIPTIONS (As 3D Screen Glides Right)
            ================================================================= */}
        <div className={styles.twoColumnLayout}>
          <div className={styles.leftTextColumn}>
            {/* Stage 1 (0.28 – 0.46): 01 User App */}
            <div className={styles.textSectionSlot}>
              <div
                ref={textRef1}
                className={styles.textSectionMotion}
                style={{
                  opacity: 0,
                  transform: "translate3d(0, 36px, 0)",
                  pointerEvents: "none",
                }}
              >
                <div className={styles.glassCard}>
                  <div className={styles.stepHeaderRow}>
                    <span className={styles.stepBadge}>01</span>
                    <span className={styles.stepCategory}>
                      User Experience • Flutter Pass
                    </span>
                  </div>

                  <h2 className={styles.stageTitle}>
                    Student &amp; Faculty <br />
                    <span className={styles.gradientTextPurple}>
                      Mobile Portal
                    </span>
                  </h2>

                  <p className={styles.stageDescription}>
                    A responsive cross-platform Flutter application putting
                    students and faculty in control. Register vehicles via
                    document OCR, view real-time gate entry logs, and carry an
                    authenticated digital campus pass.
                  </p>

                  <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconPurple}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Document OCR scanner for rapid vehicle registration
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconPurple}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Active vehicle credential pairing (Plate LGJ 910 • 4W)
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconPurple}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Verified student digital badge authentication (BSCPE 4A)
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconPurple}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Real-time campus barrier clearance notifications
                      </span>
                    </div>
                  </div>

                  <div className={styles.techTagRow}>
                    <span className={styles.techTag}>Flutter</span>
                    <span className={styles.techTag}>Dart</span>
                    <span className={styles.techTag}>Supabase</span>
                    <span className={styles.techTag}>Android</span>
                    <span className={styles.techTag}>iOS</span>
                  </div>

                  <div className={styles.actionButtonRow}>
                    <button
                      type="button"
                      className={styles.btnPrimary}
                      onClick={() =>
                        showToast(
                          "OCR Vehicle Registration: Plate LGJ 910 verified!"
                        )
                      }
                    >
                      <Scan size={15} />
                      <span>Simulate OCR Scan</span>
                    </button>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() =>
                        showToast("Digital Student Pass: Active & Verified")
                      }
                    >
                      <Smartphone size={14} />
                      <span>Verify Student ID</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2 (0.58 – 0.74): 02 Admin Side */}
            <div className={styles.textSectionSlot}>
              <div
                ref={textRef2}
                className={styles.textSectionMotion}
                style={{
                  opacity: 0,
                  transform: "translate3d(0, 36px, 0)",
                  pointerEvents: "none",
                }}
              >
                <div className={styles.glassCard}>
                  <div className={styles.stepHeaderRow}>
                    <span
                      className={`${styles.stepBadge} ${styles.stepBadgeGreen}`}
                    >
                      02
                    </span>
                    <span className={styles.stepCategory}>
                      Guard Station • Realtime Control
                    </span>
                  </div>

                  <h2 className={styles.stageTitle}>
                    Live Monitoring &amp; <br />
                    <span className={styles.gradientTextGreen}>
                      Admin Console
                    </span>
                  </h2>

                  <p className={styles.stageDescription}>
                    Full operational oversight for university gate security
                    guards. Monitors campus occupancy, logs live plate scans
                    with microsecond timestamps, and provides instant manual
                    servo barrier overrides.
                  </p>

                  <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGreen}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Live campus capacity metrics (Registered: 3 | Inside: 1)
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGreen}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Automated plate match log with exact TIME IN (18:10)
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGreen}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        One-click servo barrier manual override via WebSocket
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGreen}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Searchable student ownership registry &amp; audit log
                      </span>
                    </div>
                  </div>

                  <div className={styles.techTagRow}>
                    <span className={styles.techTag}>Next.js</span>
                    <span className={styles.techTag}>WebSocket</span>
                    <span className={styles.techTag}>ESP32 Relay</span>
                    <span className={styles.techTag}>FreeRTOS</span>
                  </div>

                  <div className={styles.actionButtonRow}>
                    <button
                      type="button"
                      className={`${styles.btnPrimary} ${styles.btnPrimaryGreen}`}
                      onClick={() =>
                        showToast("MG996R Servo Barrier Override Executed!")
                      }
                    >
                      <ShieldCheck size={15} />
                      <span>Toggle Servo Barrier</span>
                    </button>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() =>
                        showToast("Occupancy Synchronized: 1 Inside")
                      }
                    >
                      <RefreshCw size={14} />
                      <span>Sync Occupancy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3 (0.86 – 1.00): 03 YOLOv11 AI */}
            <div className={styles.textSectionSlot}>
              <div
                ref={textRef3}
                className={styles.textSectionMotion}
                style={{
                  opacity: 0,
                  transform: "translate3d(0, 36px, 0)",
                  pointerEvents: "none",
                }}
              >
                <div className={styles.glassCard}>
                  <div className={styles.stepHeaderRow}>
                    <span
                      className={`${styles.stepBadge} ${styles.stepBadgeGold}`}
                    >
                      03
                    </span>
                    <span className={styles.stepCategory}>
                      Edge-AI Vision • YOLOv11s
                    </span>
                  </div>

                  <h2 className={styles.stageTitle}>
                    Python YOLOv11s <br />
                    <span className={styles.gradientTextGold}>
                      Plate Recognition
                    </span>
                  </h2>

                  <p className={styles.stageDescription}>
                    State-of-the-art computer vision pipeline specifically
                    trained on Philippine standard license plates. Delivers
                    high-confidence localization, character extraction, and
                    microsecond barrier relay triggering.
                  </p>

                  <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGold}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        86.0% YOLOv11s detection confidence under glare &amp;
                        angles
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGold}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Automated optical character recognition (Plate LGJ 910)
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGold}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Sub-800ms end-to-end latency from CCTV to servo sweep
                      </span>
                    </div>
                    <div className={styles.featureItem}>
                      <div
                        className={`${styles.featureIcon} ${styles.featureIconGold}`}
                      >
                        <CheckCircle2 size={13} />
                      </div>
                      <span>
                        Edge-optimized ONNX runtime with real-time OpenCV stream
                      </span>
                    </div>
                  </div>

                  <div className={styles.techTagRow}>
                    <span className={styles.techTag}>Python</span>
                    <span className={styles.techTag}>YOLOv11s</span>
                    <span className={styles.techTag}>OCR Pipeline</span>
                    <span className={styles.techTag}>OpenCV</span>
                    <span className={styles.techTag}>PyTorch</span>
                  </div>

                  <div className={styles.actionButtonRow}>
                    <button
                      type="button"
                      className={`${styles.btnPrimary} ${styles.btnPrimaryGold}`}
                      onClick={() =>
                        showToast(
                          "YOLOv11s Inference: 86.0% Conf • Plate LGJ 910 Verified!"
                        )
                      }
                    >
                      <Eye size={15} />
                      <span>Trigger YOLO Inference</span>
                    </button>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() =>
                        showToast("Laser Target Sweep: Active & Synchronized")
                      }
                    >
                      <RefreshCw size={14} />
                      <span>Toggle Target Laser</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Spacer (3D Monitor glides into this space on Stages 1-3) */}
          <div className={styles.rightCanvasColumn} aria-hidden="true" />
        </div>

        {/* =================================================================
            5. BOTTOM HUD BAR (Scroll Hint & Hardware Acceleration Badge)
            ================================================================= */}
        <footer className={styles.hudBottomBar}>
          <div ref={heroScrollHintRef} className={styles.scrollHint}>
            <span className={styles.scrollHintDot} />
            <span>Scroll down — 3D screen glides &amp; morphs through stages</span>
          </div>

          <div className={styles.hardwarePill}>
            <Sparkles size={12} />
            <span>WebGL 2.0 • Hardware Accelerated</span>
          </div>
        </footer>

        {/* Toast Alert Feedback */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(245, 166, 35, 0.5)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
              padding: "10px 20px",
              borderRadius: "9999px",
              color: "#f8fafc",
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 9999,
            }}
            role="status"
          >
            <CheckCircle2 size={16} color="#4ade80" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default ThreeScrollShowcase;