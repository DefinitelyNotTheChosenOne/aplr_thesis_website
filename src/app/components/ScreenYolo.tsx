"use client";

import React, { forwardRef } from "react";
import styles from "./FeatureStage.module.css";

export const ScreenYolo = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenYolo({ isVisible = false }, ref) {
    return (
      <div
        ref={ref}
        className={styles.screenLayer}
        style={{
          visibility: isVisible ? "visible" : "hidden",
          zIndex: 4,
        }}
        data-screen="yolo"
      >
        {/* CCTV Camera Feed Viewport */}
        <div className={styles.yoloViewport}>
          <div className={styles.cctvGrid} />

          <div className={styles.cctvHeader}>
            <span>CAM_LANE_01 • 1920x1080@30FPS</span>
            <span style={{ color: "#f5a623" }}>ONNX_CUDA • ACTIVE</span>
          </div>

          {/* Sweeping Laser Line (animates top to bottom) */}
          <div id="yolo-laser-line" className={styles.laserScanLine} style={{ top: "0%" }} />

          {/* Person Detection Bounding Box */}
          <div className={`${styles.bboxPerson} yolo-box yolo-box-person`}>
            <span className={styles.bboxLabelBlue}>person 97%</span>
          </div>

          {/* Plate Expanded Target Slot (where LGJ 910 expands to) */}
          <div
            id="yolo-plate-anchor"
            style={{
              position: "absolute",
              top: "60px",
              left: "145px",
              width: "155px",
              height: "46px",
              pointerEvents: "none",
            }}
          />

          {/* Plate Secondary Crop Bounding Box */}
          <div className={`${styles.bboxPlateCrop} yolo-box yolo-box-plate`}>
            <span className={styles.bboxLabelPurple}>plate 86%</span>
          </div>
        </div>

        {/* Live Python Inference Terminal Output */}
        <div className={styles.yoloTerminal}>
          <div className={`${styles.terminalLine} yolo-term-1`}>
            <span style={{ color: "#64748b" }}># YOLOv11s Edge-AI ALPR Inference Pipeline</span>
          </div>
          <div className={`${styles.terminalLine} yolo-term-2`}>
            <span style={{ color: "#c084fc" }}>from</span> ultralytics{" "}
            <span style={{ color: "#c084fc" }}>import</span> YOLO
          </div>
          <div className={`${styles.terminalLine} yolo-term-3`}>
            model = YOLO(<span style={{ color: "#fbbf24" }}>&apos;yolov11s_plate.pt&apos;</span>)
          </div>
          <div className={`${styles.terminalLine} yolo-term-4`}>
            results = model.predict(source=<span style={{ color: "#fbbf24" }}>&apos;lane_1&apos;</span>, conf=0.85)
          </div>
          <div className={`${styles.terminalLine} yolo-term-5`} style={{ color: "#4ade80", fontWeight: 700 }}>
            &gt;&gt;&gt; DETECTED: LGJ 910 | CONF: 86.0% | SERVO_ARM: RAISE
            <span className={styles.typingCursor} />
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenYolo;
