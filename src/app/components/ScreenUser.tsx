"use client";

import React, { forwardRef } from "react";

export const ScreenUser = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenUser({ isVisible = true }, ref) {
    return (
      <div
        ref={ref}
        data-screen="user"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(circle at center, rgba(91, 91, 240, 0.18) 0%, rgba(5, 7, 17, 0.95) 75%)",
          overflow: "hidden",
          padding: "10px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Ambient Left Info Badges */}
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
              border: "1px solid rgba(91, 91, 240, 0.4)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              PORTAL APP
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#818cf8" }}>
              Flutter UI
            </div>
          </div>
          <div
            style={{
              background: "rgba(10, 14, 30, 0.82)",
              border: "1px solid rgba(91, 91, 240, 0.4)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              USER CREDENTIAL
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc" }}>
              test123 • Student
            </div>
          </div>
        </div>

        {/* Centered Smartphone Device Frame with user.jpg */}
        <div
          style={{
            position: "relative",
            height: "100%",
            maxHeight: "348px",
            aspectRatio: "9 / 19.5",
            borderRadius: "18px",
            overflow: "hidden",
            border: "2.5px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 20px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(91, 91, 240, 0.35)",
            background: "#ffffff",
            zIndex: 3,
          }}
        >
          <img
            src="/user.jpg"
            alt="IntelliGate Student Portal"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        </div>

        {/* Right Info Badges */}
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
              border: "1px solid rgba(91, 91, 240, 0.4)",
              borderRadius: "10px",
              padding: "8px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
              PAIRED VEHICLE
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#a5b4fc", letterSpacing: "1px" }}>
              LGJ 910
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
              CLEARANCE
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#4ade80" }}>
              Active Pass
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenUser;
