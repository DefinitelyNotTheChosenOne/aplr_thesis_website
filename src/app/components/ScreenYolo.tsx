"use client";

import React, { forwardRef } from "react";
import styles from "./ThreeScrollShowcase.module.css";

export const ScreenYolo = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenYolo(_props, ref) {
    return (
      <div
        ref={ref}
        data-screen="yolo"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#050711",
          overflow: "hidden",
          transform: "translateZ(0)",
        }}
      >
        <img
          src="/yolov11s.png"
          alt="YOLOv11s Real-Time ALPR Inference"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            imageRendering: "-webkit-optimize-contrast",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* Animated Sweeping Laser Scan Line */}
        <div
          className={styles.laserSweepLine}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #f5a623 30%, #ff4444 50%, #f5a623 70%, transparent)",
            boxShadow: "0 0 20px #f5a623, 0 0 40px rgba(245, 166, 35, 0.6)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }
);

export default ScreenYolo;