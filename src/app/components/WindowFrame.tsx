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
  "/f06fc00e-c7f5-49c9-98db-1e298508c365.jpg", // Step 0: User App
  "/d0375754-58f3-43e0-b816-377fd0b9132f.jpg", // Step 1: Admin Guard Station
  "/yolov11s.png",                             // Step 2: YOLOv11 Vision Feed
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

            {/* Real Screenshot vs Interactive HTML Toggle */}
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

          {/* Screens Container: 3 HTML Screens Stacked In Place */}
          <div className={styles.screensContainer}>
            {/* The single traveling plate chip that morphs across all 3 screens */}
            <div
              ref={plateRef}
              id="traveling-plate-chip"
              className={styles.travelingPlateChip}
              style={{
                top: "105px",
                left: "30px",
                width: "128px",
                height: "36px",
                fontSize: "1.1rem",
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

            {showRealScreenshot ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "380px",
                  borderRadius: "12px",
                  overflow: "hidden",
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
            ) : (
              <>
                <ScreenUser ref={userScreenRef} isVisible={true} />
                <ScreenAdmin ref={adminScreenRef} isVisible={false} />
                <ScreenYolo ref={yoloScreenRef} isVisible={false} />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default WindowFrame;
