"use client";

import React, { forwardRef } from "react";

export const ScreenUser = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenUser(_props, ref) {
    return (
      <div
        ref={ref}
        data-screen="user"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#ffffff",
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

export default ScreenUser;