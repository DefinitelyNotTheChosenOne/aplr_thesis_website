"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProposalScrollySection } from "./components/ProposalScrollySection";
import { ThreeScrollShowcase } from "./components/ThreeScrollShowcase";
import { DemoVideoShowcase } from "./components/DemoVideoShowcase";
import { DownloadMobileAppSection } from "./components/DownloadMobileAppSection";
import { setLenis } from "./lib/lenis";
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home(): React.JSX.Element {
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Wire Lenis smooth scroll to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Drive top progress bar directly via DOM ref
    const pageTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${(s.progress * 100).toFixed(2)}%`;
        }
      },
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      pageTrigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <main className={styles.mainWrapper}>
      {/* Top Global Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className={styles.progressBar}
        style={{ width: "0%" }}
        aria-hidden="true"
      />

      {/* ===================================================================
          1. PROPOSAL DEFENSE PRESENTATION (Page 1 + Scrollytelling)
          - Slide 1: Title Proposal Defense, IntelliGate, Proponents, Concentric Radar
          - Slide 2: Background of the Study & Campus Vulnerabilities
          - Slide 3: Statement of the Problem & System Objectives
          =================================================================== */}
      <ProposalScrollySection />

      {/* ===================================================================
          2. UNIFIED 4-STAGE 3D WEBGL SHOWCASE (User Screenshot)
          Stage 00: Hero (3D Screen in Middle + Left/Right Hero Wings)
          Stage 01: User App (3D Glides Right + Left User Description)
          Stage 02: Admin Side (3D Rotates + Left Admin Description)
          Stage 03: YOLOv11 AI (3D Tilts + Left YOLO Description)
          =================================================================== */}
      <ThreeScrollShowcase />

      {/* ===================================================================
          3. LIVE SYSTEM DEMONSTRATION VIDEO
          - Plays 91eb9641-ab6a-4afe-9856-1d0b517557cd.mp4
          - Play, pause, resume controls, timeline scrubber, and telemetry
          =================================================================== */}
      <DemoVideoShowcase />

      {/* ===================================================================
          4. DOWNLOAD MOBILE APP SECTION
          - Direct Google Drive APK link & Phone QR code scanner
          =================================================================== */}
      <DownloadMobileAppSection />
    </main>
  );
}
