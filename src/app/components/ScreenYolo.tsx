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
          }}
        />

        {/* Top CCTV Overlay Bar */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            right: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#f8fafc",
            background: "rgba(5, 7, 17, 0.82)",
            backdropFilter: "blur(12px)",
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.6)",
            zIndex: 5,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 8px #ef4444",
              }}
            />
            CAM_LANE_01 • 1920x1080@30FPS
          </span>
          <span style={{ color: "#f5a623", letterSpacing: "0.5px" }}>
            ONNX_CUDA • YOLOv11s ALPR
          </span>
        </div>

        {/* Animated Sweeping Laser Scan Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #f5a623 30%, #ff4444 50%, #f5a623 70%, transparent)",
            boxShadow: "0 0 14px #f5a623, 0 0 28px rgba(245, 166, 35, 0.5)",
            zIndex: 4,
            animation: "laserSweep 2.5s ease-in-out infinite alternate",
          }}
        />

        {/* Bottom Live Telemetry HUD Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            right: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#e2e8f0",
            background: "rgba(5, 7, 17, 0.82)",
            backdropFilter: "blur(12px)",
            padding: "5px 14px",
            borderRadius: "6px",
            border: "1px solid rgba(245, 166, 35, 0.35)",
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.6)",
            zIndex: 5,
          }}
        >
          <span
            style={{
              color: "#4ade80",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>MATCH: LGJ 910</span>
            <span
              style={{
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid #22c55e",
                padding: "1px 6px",
                borderRadius: "3px",
                fontSize: "0.62rem",
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
