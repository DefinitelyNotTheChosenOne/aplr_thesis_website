"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeatureStage.module.css";
import { WindowFrame } from "./WindowFrame";
import { FeatureText } from "./FeatureText";
import { useStageStore } from "../store/useStageStore";
import { Smartphone, ShieldCheck, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Helper to scramble text cleanly in forward and reverse scrub
const SCRAMBLE_GLYPHS = "01_-.x/~*#";
function scrambleString(from: string, to: string, progress: number): string {
  if (progress <= 0) return from;
  if (progress >= 1) return to;
  const targetLen = Math.round(from.length + (to.length - from.length) * progress);
  let result = "";
  for (let i = 0; i < targetLen; i++) {
    if (i < to.length * progress) {
      result += to[i];
    } else {
      const idx = (i + Math.floor(progress * 13)) % SCRAMBLE_GLYPHS.length;
      result += SCRAMBLE_GLYPHS[idx];
    }
  }
  return result;
}

// Color interpolation utility
function interpolateHex(color1: string, color2: string, factor: number): string {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);
  const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
  const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function FeatureStage(): React.JSX.Element {
  const stageRef = useRef<HTMLDivElement>(null);
  const tabHighlightRef = useRef<HTMLDivElement>(null);
  const windowFrameRef = useRef<HTMLDivElement>(null);
  const userScreenRef = useRef<HTMLDivElement>(null);
  const adminScreenRef = useRef<HTMLDivElement>(null);
  const yoloScreenRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // -------------------------------------------------------------------------
  // MASTER TIMELINE SETUP (Single Source of Truth)
  //
  // TIMELINE MATH (total virtual duration = 100):
  // - 0 to 30:   Step 1 hold (User App) [with intro build-in at 0-6]
  // - 30 to 45:  Morph 1 to 2 (User App -> Admin Side)
  //              Text morph runs 28.5 to 43.5 (~10% ahead)
  //              Peak morph at 37.5 (max tilt, color midpoint, background ring peak)
  // - 45 to 65:  Step 2 hold (Admin Side)
  // - 65 to 80:  Morph 2 to 3 (Admin Side -> YOLOv11 AI)
  //              Text morph runs 63.5 to 78.5 (~10% ahead)
  //              Peak morph at 72.5 (max tilt, color midpoint, background ring peak)
  // - 80 to 100: Step 3 hold (YOLOv11 AI)
  //
  // Hold Points (for snapping & tab clicks):
  // - Step 1: 0.18
  // - Step 2: 0.55
  // - Step 3: 0.90
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (reducedMotion || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "feature-stage-trigger",
          trigger: stageRef.current,
          start: "top top",
          end: "+=3200", // Smooth ~3200px runway for scrollytelling
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1, // smooth scrub response
          snap: {
            snapTo: [0.18, 0.55, 0.90],
            duration: { min: 0.25, max: 0.55 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;

            // Compute current step, morph progress, and peak factor
            let step: 0 | 1 | 2 = 0;
            let morphProg = 0;
            let peak = 0;
            let color = "#5B5BF0";

            if (p < 0.30) {
              step = 0;
              color = "#5B5BF0";
            } else if (p < 0.45) {
              step = p < 0.375 ? 0 : 1;
              morphProg = (p - 0.30) / 0.15;
              peak = Math.sin(morphProg * Math.PI);
              color = interpolateHex("#5B5BF0", "#22C55E", morphProg);
            } else if (p < 0.65) {
              step = 1;
              color = "#22C55E";
            } else if (p < 0.80) {
              step = p < 0.725 ? 1 : 2;
              morphProg = (p - 0.65) / 0.15;
              peak = Math.sin(morphProg * Math.PI);
              color = interpolateHex("#22C55E", "#F5A623", morphProg);
            } else {
              step = 2;
              color = "#F5A623";
            }

            setActiveTab(step);

            // Update shared Zustand store for background canvas & UI
            useStageStore.getState().setStageState({
              currentStep: step,
              morphProgress: morphProg,
              overallProgress: p,
              activeColor: color,
              peakMorph: peak,
            });

            // Update top sliding highlight position smoothly with scroll
            if (tabHighlightRef.current) {
              const highlightTranslate = p <= 0.30
                ? 0
                : p < 0.45
                ? ((p - 0.30) / 0.15) * 100
                : p <= 0.65
                ? 100
                : p < 0.80
                ? 100 + ((p - 0.65) / 0.15) * 100
                : 200;
              tabHighlightRef.current.style.transform = `translateX(${highlightTranslate}%)`;
              tabHighlightRef.current.style.borderColor = color;
              tabHighlightRef.current.style.boxShadow = `0 0 16px ${color}66`;
            }
          },
        },
      });

      // =====================================================================
      // 1. INTRO BUILD-IN (0 to 6)
      // =====================================================================
      tl.fromTo(
        "#mac-window-frame",
        { opacity: 0.85, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 6, ease: "power1.out" },
        0
      );

      // =====================================================================
      // 2. MORPH 1 TO 2 (30 to 45) — Text leads by ~10% (starts at 28.5)
      // =====================================================================

      // --- TEXT MORPH 1 -> 2 (28.5 to 43.5) ---
      // Counter roll: 01 -> 02
      tl.to("#counter-roll", { y: "-33.333%", duration: 12, ease: "power2.inOut" }, 28.5);
      tl.to("#label-name-1", { opacity: 0, y: -16, duration: 6, ease: "power1.in" }, 28.5);
      tl.to("#label-name-2", { opacity: 1, y: 0, duration: 6, ease: "power1.out" }, 34.5);

      // Headline swap: Student & Faculty Mobile Portal -> Security & Guard Admin Console
      tl.to(["#headline-prefix-1", "#headline-suffix-1"], {
        opacity: 0,
        y: -24,
        stagger: 1.5,
        duration: 6,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(["#headline-prefix-1", "#headline-suffix-1"], { display: "none" });
          gsap.set(["#headline-prefix-2", "#headline-suffix-2"], { display: "inline-block" });
        },
        onReverseComplete: () => {
          gsap.set(["#headline-prefix-2", "#headline-suffix-2"], { display: "none" });
          gsap.set(["#headline-prefix-1", "#headline-suffix-1"], { display: "inline-block" });
        },
      }, 29);
      tl.fromTo(["#headline-prefix-2", "#headline-suffix-2"],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 1.5, duration: 6, ease: "power2.out" },
        35
      );

      // Description slide up & out, new slides in from below
      tl.to("#desc-1", { opacity: 0, y: "-100%", duration: 7, ease: "power2.in" }, 29);
      tl.to("#desc-2", { opacity: 1, y: "0%", duration: 7, ease: "power2.out" }, 36);

      // Checklist items exit & enter staggered
      for (let i = 1; i <= 4; i++) {
        tl.to(`#check-text-${i}-s1`, { opacity: 0, y: "-100%", duration: 5, ease: "power1.in" }, 29 + i * 1.2);
        tl.to(`#check-text-${i}-s2`, { opacity: 1, y: "0%", duration: 5, ease: "power1.out" }, 35 + i * 1.2);
      }

      // Tech tags & Action buttons cross-swap
      tl.to("#tech-tags-1", { opacity: 0, scale: 0.94, duration: 6, ease: "power1.in" }, 30);
      tl.to("#tech-tags-2", { opacity: 1, scale: 1, duration: 6, ease: "power1.out" }, 36);
      tl.to("#action-row-1", { opacity: 0, duration: 5, ease: "power1.in" }, 30);
      tl.to("#action-row-2", { opacity: 1, duration: 5, ease: "power1.out" }, 36);

      // --- WINDOW MORPH 1 -> 2 (30 to 45) ---
      // Frame 3D Tilt peaking at 37.5
      tl.to("#mac-window-frame", {
        rotateY: 5.5,
        rotateX: -2.5,
        duration: 7.5,
        ease: "power2.in",
      }, 30);
      tl.to("#mac-window-frame", {
        rotateY: 0,
        rotateX: 0,
        duration: 7.5,
        ease: "power2.out",
      }, 37.5);

      // Border glow lerp: Indigo (#5B5BF0) to Green (#22C55E)
      tl.to("#mac-window-frame", {
        borderColor: "rgba(34, 197, 94, 0.45)",
        boxShadow: "0 0 0 1px rgba(34, 197, 94, 0.2), 0 24px 64px rgba(0, 0, 0, 0.7), 0 0 80px rgba(34, 197, 94, 0.25)",
        duration: 15,
        ease: "none",
      }, 30);

      // Title-bar text scramble: intelligate_user.app -> admin.guard_station
      const filenameObj1 = { prog: 0 };
      tl.to(filenameObj1, {
        prog: 1,
        duration: 15,
        ease: "none",
        onUpdate: () => {
          const el = document.getElementById("window-filename");
          if (el) {
            el.textContent = scrambleString("intelligate_user.app", "admin.guard_station", filenameObj1.prog);
          }
        },
      }, 30);

      // Screen 1 (User) collapse & clip-path wipe
      tl.to(".user-chart-bar", { scaleY: 0, duration: 8, ease: "power2.in" }, 30);
      tl.to(userScreenRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 12,
        ease: "power2.inOut",
        onComplete: () => {
          if (userScreenRef.current) userScreenRef.current.style.visibility = "hidden";
        },
        onReverseComplete: () => {
          if (userScreenRef.current) userScreenRef.current.style.visibility = "visible";
        },
      }, 31);

      // Screen 2 (Admin) reveal
      tl.fromTo(
        adminScreenRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          visibility: "visible",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 12,
          ease: "power2.inOut",
        },
        33
      );

      // Stagger reveal of Admin table rows 2 and 3
      tl.fromTo(".admin-row-2", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 6, ease: "power1.out" }, 38);
      tl.fromTo(".admin-row-3", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 6, ease: "power1.out" }, 40);

      // SHARED ELEMENT MORPH: Traveling plate chip travels from User stat card to Admin row 1!
      tl.to(plateRef.current, {
        top: "114px",
        left: "68px",
        width: "92px",
        height: "26px",
        fontSize: "0.8rem",
        borderColor: "#4ade80",
        color: "#4ade80",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        boxShadow: "0 0 12px rgba(74, 222, 128, 0.35)",
        duration: 15,
        ease: "power2.inOut",
      }, 30);

      // =====================================================================
      // 3. MORPH 2 TO 3 (65 to 80) — Text leads by ~10% (starts at 63.5)
      // =====================================================================

      // --- TEXT MORPH 2 -> 3 (63.5 to 78.5) ---
      // Counter roll: 02 -> 03
      tl.to("#counter-roll", { y: "-66.666%", duration: 12, ease: "power2.inOut" }, 63.5);
      tl.to("#label-name-2", { opacity: 0, y: -16, duration: 6, ease: "power1.in" }, 63.5);
      tl.to("#label-name-3", { opacity: 1, y: 0, duration: 6, ease: "power1.out" }, 69.5);

      // Headline swap: Security & Guard Admin Console -> Python YOLOv11s Plate Recognition
      tl.to(["#headline-prefix-2", "#headline-suffix-2"], {
        opacity: 0,
        y: -24,
        stagger: 1.5,
        duration: 6,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(["#headline-prefix-2", "#headline-suffix-2"], { display: "none" });
          gsap.set(["#headline-prefix-3", "#headline-suffix-3"], { display: "inline-block" });
        },
        onReverseComplete: () => {
          gsap.set(["#headline-prefix-3", "#headline-suffix-3"], { display: "none" });
          gsap.set(["#headline-prefix-2", "#headline-suffix-2"], { display: "inline-block" });
        },
      }, 64);
      tl.fromTo(["#headline-prefix-3", "#headline-suffix-3"],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 1.5, duration: 6, ease: "power2.out" },
        70
      );

      // Description slide up & out, new slides in from below
      tl.to("#desc-2", { opacity: 0, y: "-100%", duration: 7, ease: "power2.in" }, 64);
      tl.to("#desc-3", { opacity: 1, y: "0%", duration: 7, ease: "power2.out" }, 71);

      // Checklist items exit & enter staggered
      for (let i = 1; i <= 4; i++) {
        tl.to(`#check-text-${i}-s2`, { opacity: 0, y: "-100%", duration: 5, ease: "power1.in" }, 64 + i * 1.2);
        tl.to(`#check-text-${i}-s3`, { opacity: 1, y: "0%", duration: 5, ease: "power1.out" }, 70 + i * 1.2);
      }

      // Tech tags & Action buttons cross-swap
      tl.to("#tech-tags-2", { opacity: 0, scale: 0.94, duration: 6, ease: "power1.in" }, 65);
      tl.to("#tech-tags-3", { opacity: 1, scale: 1, duration: 6, ease: "power1.out" }, 71);
      tl.to("#action-row-2", { opacity: 0, duration: 5, ease: "power1.in" }, 65);
      tl.to("#action-row-3", { opacity: 1, duration: 5, ease: "power1.out" }, 71);

      // --- WINDOW MORPH 2 -> 3 (65 to 80) ---
      // Frame 3D Tilt peaking at 72.5
      tl.to("#mac-window-frame", {
        rotateY: -5.5,
        rotateX: 2.5,
        duration: 7.5,
        ease: "power2.in",
      }, 65);
      tl.to("#mac-window-frame", {
        rotateY: 0,
        rotateX: 0,
        duration: 7.5,
        ease: "power2.out",
      }, 72.5);

      // Border glow lerp: Green (#22C55E) to Amber (#F5A623)
      tl.to("#mac-window-frame", {
        borderColor: "rgba(245, 166, 35, 0.45)",
        boxShadow: "0 0 0 1px rgba(245, 166, 35, 0.2), 0 24px 64px rgba(0, 0, 0, 0.7), 0 0 80px rgba(245, 166, 35, 0.25)",
        duration: 15,
        ease: "none",
      }, 65);

      // Title-bar text scramble: admin.guard_station -> yolov11_alpr_detect.py
      const filenameObj2 = { prog: 0 };
      tl.to(filenameObj2, {
        prog: 1,
        duration: 15,
        ease: "none",
        onUpdate: () => {
          const el = document.getElementById("window-filename");
          if (el) {
            el.textContent = scrambleString("admin.guard_station", "yolov11_alpr_detect.py", filenameObj2.prog);
          }
        },
      }, 65);

      // Screen 2 (Admin) table dissolve & wipe out
      tl.to(".admin-table-row", { opacity: 0, y: -10, duration: 6, ease: "power1.in" }, 65);
      tl.to(adminScreenRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 12,
        ease: "power2.inOut",
        onComplete: () => {
          if (adminScreenRef.current) adminScreenRef.current.style.visibility = "hidden";
        },
        onReverseComplete: () => {
          if (adminScreenRef.current) adminScreenRef.current.style.visibility = "visible";
        },
      }, 66);

      // Screen 3 (YOLO) reveal
      tl.fromTo(
        yoloScreenRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          visibility: "visible",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 12,
          ease: "power2.inOut",
        },
        68
      );

      // Laser scan line sweeps top to bottom
      tl.fromTo("#yolo-laser-line",
        { top: "0%" },
        { top: "100%", duration: 10, ease: "power1.inOut" },
        69
      );

      // Detection boxes draw in
      tl.fromTo(".yolo-box-person", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 6, ease: "power1.out" }, 70);
      tl.fromTo(".yolo-box-plate", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 6, ease: "power1.out" }, 72);

      // Terminal lines reveal line by line
      tl.fromTo(".yolo-term-1", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 2 }, 71);
      tl.fromTo(".yolo-term-2", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 2 }, 73);
      tl.fromTo(".yolo-term-3", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 2 }, 75);
      tl.fromTo(".yolo-term-4", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 2 }, 77);
      // "DETECTED: LGJ 910" is the last line to appear
      tl.fromTo(".yolo-term-5", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }, 78.5);

      // SHARED ELEMENT MORPH: Traveling plate chip expands into YOLO detection box!
      tl.to(plateRef.current, {
        top: "76px",
        left: "155px",
        width: "160px",
        height: "46px",
        fontSize: "0.95rem",
        borderColor: "#f5a623",
        color: "#f5a623",
        backgroundColor: "rgba(245, 166, 35, 0.18)",
        boxShadow: "0 0 18px rgba(245, 166, 35, 0.4)",
        duration: 15,
        ease: "power2.inOut",
      }, 65);

      // Reveal 91% tag on the plate bounding box
      tl.to("#plate-conf-tag", {
        display: "inline-block",
        opacity: 1,
        duration: 4,
      }, 74);

      // Refresh ScrollTrigger so pinning offsets are precisely calculated
      ScrollTrigger.refresh();
    }, stageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [reducedMotion]);

  // Click on tab scrolls smoothly to that step's hold point
  const handleTabClick = (stepIndex: number) => {
    const holdPoints = [0.18, 0.55, 0.90];
    const trigger = ScrollTrigger.getById("feature-stage-trigger");
    if (!trigger) return;

    const targetScroll = trigger.start + holdPoints[stepIndex] * (trigger.end - trigger.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // -------------------------------------------------------------------------
  // Fallback for prefers-reduced-motion
  // -------------------------------------------------------------------------
  if (reducedMotion) {
    return (
      <div className={styles.reducedMotionContainer} id="feature-stage-reduced">
        <div className={styles.reducedMotionStep}>
          <FeatureText />
          <WindowFrame
            userScreenRef={userScreenRef}
            adminScreenRef={adminScreenRef}
            yoloScreenRef={yoloScreenRef}
            plateRef={plateRef}
          />
        </div>
      </div>
    );
  }

  return (
    <section ref={stageRef} className={styles.stageRunway} id="feature-stage">
      <div className={styles.stickyViewport}>
        {/* Subtle dark gradient behind text column for crisp readability */}
        <div className={styles.textBackdropGlow} />

        {/* Top Center Pill Tab Bar with ONE Sliding Highlight */}
        <div className={styles.tabBarWrap}>
          <nav className={styles.tabBar} aria-label="Feature Stories">
            {/* The single sliding highlight tracking scroll position */}
            <div ref={tabHighlightRef} className={styles.tabHighlight} />

            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 0 ? styles.tabBtnActive : ""}`}
              onClick={() => handleTabClick(0)}
            >
              <Smartphone size={13} />
              <span>01 User App</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 1 ? styles.tabBtnActive : ""}`}
              onClick={() => handleTabClick(1)}
            >
              <ShieldCheck size={13} />
              <span>02 Admin Side</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 2 ? styles.tabBtnActive : ""}`}
              onClick={() => handleTabClick(2)}
            >
              <Cpu size={13} />
              <span>03 YOLOv11 AI</span>
            </button>
          </nav>
        </div>

        {/* Main Stage: Exactly ONE Text Block & ONE Window Card */}
        <div className={styles.stageGrid}>
          {/* Left Column: Persistent Text Block */}
          <FeatureText />

          {/* Right Column: Persistent macOS-Style Window Frame */}
          <WindowFrame
            ref={windowFrameRef}
            userScreenRef={userScreenRef}
            adminScreenRef={adminScreenRef}
            yoloScreenRef={yoloScreenRef}
            plateRef={plateRef}
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureStage;
