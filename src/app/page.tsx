"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeScrollShowcase } from "./components/ThreeScrollShowcase";
import { setLenis, getLenis } from "./lib/lenis";
import { useStageStore } from "./store/useStageStore";
import styles from "./page.module.css";
import { Download, ArrowRight, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home(): React.JSX.Element {
  const lenisRef = useRef<Lenis | null>(null);

  // Wire Lenis smooth scroll to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

    // Document-level ScrollTrigger to continuously update pageProgress in Zustand store
    const pageTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => useStageStore.getState().setStageState({ pageProgress: s.progress }),
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

  const scrollToStage = () => {
    const lenis = getLenis();
    const el = document.getElementById("three-scroll-showcase") || document.getElementById("feature-stage");
    if (lenis && el) {
      lenis.scrollTo(el);
    } else {
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      {/* ===================================================================
          1. HERO SECTION (100vh)
          =================================================================== */}
      <section className={styles.heroSection} id="section-hero">
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          <span>Dr. Yanga&apos;s Colleges Inc. • BSCPE 4A Capstone</span>
        </div>

        <h1 className={styles.heroTitle}>
          Campus Access <br />
          <span className={styles.heroTitleGradient}>Has Never Been Smoother</span>
        </h1>

        <p className={styles.heroSubtitle}>
          An Edge-AI License Plate Recognition and Vehicle Registration Portal for
          Automated Campus Security. Featuring real-time Flutter mobile pass sync,
          security guard stations, and sub-second YOLOv11s computer vision.
        </p>

        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.btnGold}
            onClick={scrollToStage}
            aria-label="Explore System Stories"
          >
            <span>Explore System</span>
            <ArrowRight size={18} />
          </button>
          <a
            href="https://drive.google.com/drive/folders/119sLWwebH6a5DMppAmZeSClt8jMkla7V?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
            aria-label="Download App on Google Drive"
          >
            <span>Download App</span>
            <Download size={18} />
          </a>
        </div>

        <div
          className={styles.scrollIndicator}
          onClick={scrollToStage}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
        >
          <span className={styles.scrollIndicatorText}>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ===================================================================
          2. 3D WEBGL HARDWARE-ACCELERATED SCROLL SHOWCASE (Three.js + R3F + Drei)
          Hardware-accelerated 3D device card rotation & embedded screens:
          01 User App -> 02 Admin Side -> 03 YOLOv11 AI
          =================================================================== */}
      <ThreeScrollShowcase />

      {/* ===================================================================
          3. FINAL CTA SECTION (Exact Match to User Screenshot!)
          "Experience the Future of Campus Security"
          =================================================================== */}
      <section className={styles.finalCtaSection} id="section-final">
        <div className={styles.finalCtaWrapper}>
          <h2 className={styles.finalCtaTitle}>
            Experience the Future <br />
            of Campus <span className={styles.finalCtaSecurityGradient}>Security</span>
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
