"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { getLenis } from "../lib/lenis";
import styles from "./ProposalScrollySection.module.css";

const TOTAL_SLIDES = 16;

export function ProposalScrollySection(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Track parent runway scroll progress (0.0 to 1.0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
      const index = Math.min(
        TOTAL_SLIDES - 1,
        Math.max(0, Math.floor(latest * TOTAL_SLIDES))
      );
      setActiveSlideIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Smooth scroll directly to a specific slide in the runway
  const goToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    setActiveSlideIndex(clamped);

    const lenis = getLenis();
    const rect = containerRef.current.getBoundingClientRect();
    const runwayTop = window.scrollY + rect.top;
    const scrollableDistance =
      containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll =
      runwayTop + (clamped / (TOTAL_SLIDES - 1)) * scrollableDistance;

    if (lenis) {
      lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  // Smooth scroll directly to the 3D showcase
  const scrollTo3DShowcase = useCallback(() => {
    const target = document.getElementById("three-scroll-showcase");
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Up/Down keyboard listener for PowerPoint next/previous slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inPresentationSection =
        rect.top <= 100 && rect.bottom >= window.innerHeight * 0.4;

      if (!inPresentationSection) return;

      // Next Slide: ArrowDown, ArrowRight, PageDown, Space
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowRight" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {
        e.preventDefault();
        if (activeSlideIndex < TOTAL_SLIDES - 1) {
          goToSlide(activeSlideIndex + 1);
        } else {
          scrollTo3DShowcase();
        }
      }
      // Previous Slide: ArrowUp, ArrowLeft, PageUp
      else if (
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
        if (activeSlideIndex > 0) {
          goToSlide(activeSlideIndex - 1);
        } else {
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideIndex, goToSlide, scrollTo3DShowcase]);

  /**
   * Calculate each slide's opacity and translateY based on scrollProgress
   * Full-screen cinematic dissolve
   */
  const getSlideStyle = (index: number) => {
    const step = 1 / TOTAL_SLIDES;
    const slideStart = index * step;
    const slideEnd = (index + 1) * step;
    const trans = step * 0.22; // 22% transition threshold between slides

    // Before this slide
    if (scrollProgress < slideStart) {
      if (index === 0 && scrollProgress <= 0.01) {
        return { opacity: 1, transform: "translate3d(0, 0px, 0)" };
      }
      return { opacity: 0, transform: "translate3d(0, 30px, 0)" };
    }

    // After this slide
    if (scrollProgress > slideEnd) {
      if (index === TOTAL_SLIDES - 1 && scrollProgress >= 0.99) {
        return { opacity: 1, transform: "translate3d(0, 0px, 0)" };
      }
      return { opacity: 0, transform: "translate3d(0, -30px, 0)" };
    }

    // Entering phase
    if (index > 0 && scrollProgress < slideStart + trans) {
      const t = (scrollProgress - slideStart) / trans;
      const smooth = t * t * (3 - 2 * t);
      return {
        opacity: smooth,
        transform: `translate3d(0, ${(30 * (1 - smooth)).toFixed(1)}px, 0)`,
      };
    }

    // Exiting phase
    if (index < TOTAL_SLIDES - 1 && scrollProgress > slideEnd - trans) {
      const t = (scrollProgress - (slideEnd - trans)) / trans;
      const smooth = t * t * (3 - 2 * t);
      return {
        opacity: 1 - smooth,
        transform: `translate3d(0, ${(-30 * smooth).toFixed(1)}px, 0)`,
      };
    }

    // Steady in view
    return { opacity: 1, transform: "translate3d(0, 0px, 0)" };
  };

  return (
    <section
      ref={containerRef}
      className={styles.scrollyRunway}
      id="proposal-defense-section"
      aria-label="IntelliGate Proposal Defense Presentation Fullscreen Scrollytelling"
    >
      <div className={styles.stickyViewport}>
        {/* Soft Ambient Backdrop Glow */}
        <div className={styles.ambientBackdrop} aria-hidden="true" />

        {/* -----------------------------------------------------------------
            CENTER PRESENTATION STAGE: 100vw x 100vh Pure Full-Screen Slides
            ----------------------------------------------------------------- */}
        <div className={styles.stageWrapper}>
          <div className={styles.slideStage}>
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => {
              const style = getSlideStyle(idx);
              const isCurrent = activeSlideIndex === idx;

              return (
                <div
                  key={idx}
                  className={`${styles.slideLayer} ${
                    isCurrent ? styles.slideLayerActive : ""
                  }`}
                  style={{
                    opacity: style.opacity,
                    transform: style.transform,
                  }}
                  aria-hidden={!isCurrent}
                >
                  <div className={styles.slideCard}>
                    <Image
                      src={`/presentation/slide_${idx + 1}.webp`}
                      alt={`IntelliGate Proposal Defense Slide ${idx + 1}`}
                      fill
                      sizes="100vw"
                      priority={idx === 0 || idx === 1}
                      className={styles.slideImage}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProposalScrollySection;
