"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "none";
  delay?: number; // delay in milliseconds
  duration?: number; // duration in milliseconds
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 800,
  threshold = 0.12,
  rootMargin = "0px 0px -50px 0px",
  once = true,
  style = {},
  as: Component = "div",
}: ScrollRevealProps): React.JSX.Element {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      node.classList.add("scroll-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("scroll-revealed");
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          node.classList.remove("scroll-revealed");
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  const transitionStyle: React.CSSProperties = {
    ...style,
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  const directionClass = direction !== "none" ? `reveal-${direction}` : "";

  return (
    <Component
      ref={elementRef}
      className={`scroll-reveal ${directionClass} ${className}`.trim()}
      style={transitionStyle}
    >
      {children}
    </Component>
  );
}
