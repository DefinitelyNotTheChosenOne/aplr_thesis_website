"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { Layers } from "lucide-react";
import styles from "./FeatureStage.module.css";
import { ScreenUser } from "./ScreenUser";
import { ScreenAdmin } from "./ScreenAdmin";
import { ScreenYolo } from "./ScreenYolo";
import { useStageStore } from "../store/useStageStore";

const REAL_SCREENSHOTS = [
  "/user.jpg",     // Step 0: User App
  "/admin.jpg",    // Step 1: Admin Guard Station
  "/yolov11s.png", // Step 2: YOLOv11 Vision Feed
];

export interface WindowFrameProps {
  userScreenRef: React.RefObject<HTMLDivElement | null>;
  adminScreenRef: React.RefObject<HTMLDivElement | null>;
  yoloScreenRef: React.RefObject<HTMLDivElement | null>;
  plateRef: React.RefObject<HTMLDivElement | null>;
}

export const WindowFrame = forwardRef<HTMLDivElement, WindowFrameProps>(
  function WindowFrame(
    { userScreenRef, adminScreenRef, yoloScreenRef, plateRef },
    ref
  ) {
    const { currentStep, showRealScreenshot, setShowRealScreenshot } = useStageStore();

    return (
      <div className={styles.windowFrameWrap}>
        <div ref={ref} id="mac-window-frame" className={styles.windowFrame}>
          {/* Top Bar with Traffic Light Dots & Scrambled Filename */}
          <div className={styles.windowTopbar}>
            <div className={styles.trafficDots}>
              <div className={styles.dotRed} />
              <div className={styles.dotYellow} />
              <div className={styles.dotGreen} />
            </div>

            <div id="window-filename" className={styles.titleFilename}>
              intelligate_user.app
            </div>

            {/* Real Screenshot Toggle Badge */}
            <button
              type="button"
              className={styles.realScreenshotBadge}
              onClick={() => setShowRealScreenshot(!showRealScreenshot)}
              title="Toggle between interactive HTML mockup and real thesis capstone screenshot"
            >
              <Layers size={12} />
              <span>{showRealScreenshot ? "Interactive" : "Real Photo"}</span>
            </button>
          </div>

          {/* Screens Container with Overflow Hidden */}
          <div className={styles.screensContainer}>
            {/* Vertical Filmstrip Track: Screens never unmount */}
            <div id="screens-track" className={styles.screensTrack}>
              <div className={styles.screenSlide}>
                <ScreenUser ref={userScreenRef} />
              </div>
              <div className={styles.screenSlide}>
                <ScreenAdmin ref={adminScreenRef} />
              </div>
              <div className={styles.screenSlide}>
                <ScreenYolo ref={yoloScreenRef} />
              </div>
            </div>

            {/* The single persistent traveling plate chip (hidden only when Real Photo is overlaid) */}
            <div
              ref={plateRef}
              id="traveling-plate-chip"
              className={styles.travelingPlateChip}
              style={{
                display: showRealScreenshot ? "none" : "flex",
              }}
            >
              <span id="plate-text-inner">LGJ 910</span>
              <span
                id="plate-conf-tag"
                style={{
                  display: "none",
                  marginLeft: 6,
                  fontSize: "0.68rem",
                  color: "#ffffff",
                  background: "#f5a623",
                  padding: "1px 5px",
                  borderRadius: 3,
                }}
              >
                91%
              </span>
            </div>

            {/* Real Screenshot Overlay: Positioned absolutely on top so screens stay mounted */}
            <div
              className={styles.realScreenshotOverlay}
              style={{
                opacity: showRealScreenshot ? 1 : 0,
                pointerEvents: showRealScreenshot ? "auto" : "none",
              }}
            >
              <Image
                src={REAL_SCREENSHOTS[currentStep]}
                alt="Real Capstone Screenshot"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default WindowFrame;
