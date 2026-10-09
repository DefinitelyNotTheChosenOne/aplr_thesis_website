"use client";

import React, { forwardRef } from "react";

export const ScreenYolo = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenYolo({ isVisible = true }, ref) {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Real YOLOv11s ALPR Inference Detection Feed */}
        <img
          src="/yolov11s.png"
          alt="YOLOv11s Real-Time ALPR Inference"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            imageRendering: "-webkit-optimize-contrast",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* Top CCTV Overlay Bar */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#f8fafc",
            background: "rgba(5, 7, 17, 0.85)",
            backdropFilter: "blur(12px)",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "1.5px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
            zIndex: 5,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 12px #ef4444",
              }}
            />
            CAM_LANE_01 • 1920x1080@30FPS
          </span>
          <span style={{ color: "#f5a623", letterSpacing: "1px" }}>
            ONNX_CUDA • YOLOv11s ALPR
          </span>
        </div>

        {/* Animated Sweeping Laser Scan Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #f5a623 30%, #ff4444 50%, #f5a623 70%, transparent)",
            boxShadow: "0 0 20px #f5a623, 0 0 40px rgba(245, 166, 35, 0.6)",
            zIndex: 4,
            animation: "laserSweep 2.5s ease-in-out infinite alternate",
          }}
        />

        {/* Bottom Live Telemetry HUD Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#e2e8f0",
            background: "rgba(5, 7, 17, 0.85)",
            backdropFilter: "blur(12px)",
            padding: "10px 24px",
            borderRadius: "12px",
            border: "1.5px solid rgba(245, 166, 35, 0.4)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
            zIndex: 5,
          }}
        >
          <span
            style={{
              color: "#4ade80",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>MATCH: LGJ 910</span>
            <span
              style={{
                background: "rgba(34, 197, 94, 0.2)",
                border: "1.5px solid #22c55e",
                padding: "2px 10px",
                borderRadius: "6px",
                fontSize: "1.1rem",
              }}
            >
              OLD_SERIES_4W
            </span>
          </span>
          <span style={{ color: "#f5a623" }}>CONF: 86.0% • LATENCY: 42ms</span>
        </div>
      </div>
    );
  }
);

export default ScreenYolo;
