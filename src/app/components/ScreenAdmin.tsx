"use client";

import React, { forwardRef } from "react";

export const ScreenAdmin = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenAdmin({ isVisible = true }, ref) {
    return (
      <div
        ref={ref}
        data-screen="admin"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(circle at center, rgba(34, 197, 94, 0.18) 0%, rgba(5, 7, 17, 0.95) 75%)",
          overflow: "hidden",
          padding: "20px 32px",
          boxSizing: "border-box",
        }}
      >
        {/* Ambient Left Badges */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              background: "rgba(10, 14, 30, 0.85)",
              border: "1.5px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "16px",
              padding: "16px 22px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "1.1rem", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "1px" }}>
              GUARD STATION
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#4ade80", marginTop: "4px" }}>
              Live Dashboard
            </div>
          </div>
          <div
            style={{
              background: "rgba(10, 14, 30, 0.85)",
              border: "1.5px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "16px",
              padding: "16px 22px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "1.1rem", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "1px" }}>
              CAMPUS OCCUPANCY
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", marginTop: "4px" }}>
              1 Vehicle Inside
            </div>
          </div>
        </div>

        {/* Centered Smartphone Device Frame with admin.jpg */}
        <div
          style={{
            position: "relative",
            height: "100%",
            maxHeight: "690px",
            aspectRatio: "9 / 19.5",
            borderRadius: "32px",
            overflow: "hidden",
            border: "4px solid rgba(34, 197, 94, 0.45)",
            boxShadow:
              "0 30px 60px rgba(0, 0, 0, 0.85), 0 0 50px rgba(34, 197, 94, 0.35)",
            background: "#080c1d",
            zIndex: 3,
            transform: "translateZ(0)",
          }}
        >
          <img
            src="/admin.jpg"
            alt="IntelliGate Admin Dashboard"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        </div>

        {/* Ambient Right Badges */}
        <div
          style={{
            position: "absolute",
            right: "44px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              background: "rgba(10, 14, 30, 0.85)",
              border: "1.5px solid rgba(245, 166, 35, 0.45)",
              borderRadius: "16px",
              padding: "16px 22px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "1.1rem", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "1px" }}>
              LATEST SCAN
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#fbbf24",
                letterSpacing: "1px",
                marginTop: "4px",
              }}
            >
              TIME IN (18:10)
            </div>
          </div>
          <div
            style={{
              background: "rgba(10, 14, 30, 0.85)",
              border: "1.5px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "16px",
              padding: "16px 22px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "1.1rem", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "1px" }}>
              SERVO BARRIER
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#4ade80", marginTop: "4px" }}>
              NORMAL (AUTO)
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenAdmin;
