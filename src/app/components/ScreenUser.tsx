"use client";

import React, { forwardRef } from "react";

const BADGE_SURFACE_INDIGO: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(13, 18, 40, 0.96), rgba(8, 11, 26, 0.96))",
  border: "1.5px solid rgba(91, 91, 240, 0.45)",
  borderRadius: "16px",
  padding: "16px 22px",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.55)",
};

const BADGE_SURFACE_GREEN: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(13, 18, 40, 0.96), rgba(8, 11, 26, 0.96))",
  border: "1.5px solid rgba(34, 197, 94, 0.45)",
  borderRadius: "16px",
  padding: "16px 22px",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.55)",
};

export const ScreenUser = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenUser(_props, ref) {
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
          padding: "20px 32px",
          boxSizing: "border-box",
        }}
      >
        {/* Left Info Badges */}
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
          <div style={BADGE_SURFACE_INDIGO}>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#94a3b8",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              PORTAL APP
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#818cf8",
                marginTop: "4px",
              }}
            >
              Flutter UI
            </div>
          </div>

          <div style={BADGE_SURFACE_INDIGO}>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#94a3b8",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              USER CREDENTIAL
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#f8fafc",
                marginTop: "4px",
              }}
            >
              BSCPE 4A • Student
            </div>
          </div>
        </div>

        {/* Centered Smartphone Device Frame with user.jpg */}
        <div
          style={{
            position: "relative",
            height: "100%",
            maxHeight: "690px",
            aspectRatio: "9 / 19.5",
            borderRadius: "32px",
            overflow: "hidden",
            border: "4px solid rgba(255, 255, 255, 0.25)",
            boxShadow:
              "0 30px 60px rgba(0, 0, 0, 0.85), 0 0 50px rgba(91, 91, 240, 0.35)",
            background: "#ffffff",
            zIndex: 3,
            transform: "translateZ(0)",
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
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        </div>

        {/* Right Info Badges */}
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
          <div style={BADGE_SURFACE_INDIGO}>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#94a3b8",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              PAIRED VEHICLE
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#a5b4fc",
                letterSpacing: "2px",
                marginTop: "4px",
              }}
            >
              LGJ 910
            </div>
          </div>

          <div style={BADGE_SURFACE_GREEN}>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#94a3b8",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              CLEARANCE
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#4ade80",
                marginTop: "4px",
              }}
            >
              Active Pass
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenUser;