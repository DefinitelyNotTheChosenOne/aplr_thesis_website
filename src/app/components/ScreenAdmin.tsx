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
          padding: "10px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* Ambient Left Badges */}
        <div
          style={{
            position: "absolute",
            left: "22px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              background: "rgba(10, 14, 30, 0.82)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              GUARD STATION
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4ade80" }}>
              Live Dashboard
            </div>
          </div>
          <div
            style={{
              background: "rgba(10, 14, 30, 0.82)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              CAMPUS OCCUPANCY
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc" }}>
              1 Vehicle Inside
            </div>
          </div>
        </div>

        {/* Centered Smartphone Device Frame with admin.jpg */}
        <div
          style={{
            position: "relative",
            height: "100%",
            maxHeight: "348px",
            aspectRatio: "9 / 19.5",
            borderRadius: "18px",
            overflow: "hidden",
            border: "2.5px solid rgba(34, 197, 94, 0.4)",
            boxShadow:
              "0 20px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(34, 197, 94, 0.35)",
            background: "#080c1d",
            zIndex: 3,
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
            }}
          />
        </div>

        {/* Ambient Right Badges */}
        <div
          style={{
            position: "absolute",
            right: "22px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              background: "rgba(10, 14, 30, 0.82)",
              border: "1px solid rgba(245, 166, 35, 0.45)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              LATEST SCAN
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "#fbbf24",
                letterSpacing: "1px",
              }}
            >
              TIME IN (18:10)
            </div>
          </div>
          <div
            style={{
              background: "rgba(10, 14, 30, 0.82)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              SERVO BARRIER
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#4ade80" }}>
              NORMAL (AUTO)
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenAdmin;
