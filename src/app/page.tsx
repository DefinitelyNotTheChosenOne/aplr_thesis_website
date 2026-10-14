"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeScrollShowcase } from "./components/ThreeScrollShowcase";
import { setLenis, getLenis } from "./lib/lenis";
import styles from "./page.module.css";
import { Download, ArrowUp } from "lucide-react";

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

    // Drive top progress bar directly via DOM ref (0 React/Zustand re-renders)
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
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      pageTrigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className={styles.mainWrapper}>
      {/* Top Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className={styles.progressBar}
        style={{ width: "0%" }}
        aria-hidden="true"
      />

      {/* ===================================================================
          1. UNIFIED 4-STAGE 3D WEBGL SHOWCASE (400vh)
          Stage 00: Hero (3D Screen in Middle + Left/Right Hero Wings)
          Stage 01: User App (3D Glides Right + Left User Description)
          Stage 02: Admin Side (3D Rotates + Left Admin Description)
          Stage 03: YOLOv11 AI (3D Tilts + Left YOLO Description)
          =================================================================== */}
      <ThreeScrollShowcase />

      {/* ===================================================================
          2. FINAL CTA SECTION
          "Experience the Future of Campus Security"
          =================================================================== */}
      <section className={styles.finalCtaSection} id="section-final">
        <div className={styles.finalCtaWrapper}>
          <h2 className={styles.finalCtaTitle}>
            Experience the Future <br />
            of Campus{" "}
            <span className={styles.finalCtaSecurityGradient}>Security</span>
          </h2>

          <p className={styles.finalCtaSubtitle}>
            IntelliGate eliminates gate queues, prevents unauthorized vehicle
            entry, and streamlines university vehicular flow with AI automation.
          </p>

          <div className={styles.finalCtaActions}>
            <a
              href="https://drive.google.com/drive/folders/119sLWwebH6a5DMppAmZeSClt8jMkla7V?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnDownloadPill}
              aria-label="Download Mobile App"
            >
              <span>Download Mobile App</span>
              <Download size={20} />
            </a>

            <button
              type="button"
              className={styles.btnBackToTop}
              onClick={scrollToTop}
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}