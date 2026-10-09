"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureStage } from "./components/FeatureStage";
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

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToStage = () => {
    if (lenisRef.current) {
      const el = document.getElementById("feature-stage");
      if (el) lenisRef.current.scrollTo(el);
    } else {
      document.getElementById("feature-stage")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
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
          2. PINNED SCROLLYTELLING FEATURE STAGE (ONE Continuous Piece)
          ONE window card & ONE text block morphing through three stories:
          01 User App -> 02 Admin Side -> 03 YOLOv11 AI
          =================================================================== */}
      <FeatureStage />

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
