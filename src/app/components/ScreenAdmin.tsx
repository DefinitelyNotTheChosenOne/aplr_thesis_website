"use client";

import React, { forwardRef } from "react";

export const ScreenAdmin = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenAdmin(_props, ref) {
    return (
      <div
        ref={ref}
        data-screen="admin"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#080c1d",
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
            objectPosition: "top center",
            display: "block",
            imageRendering: "-webkit-optimize-contrast",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </div>
    );
  }
);

export default ScreenAdmin;