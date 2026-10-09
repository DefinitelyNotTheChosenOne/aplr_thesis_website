"use client";

import React from "react";
import { CheckCircle2, Scan, Smartphone, ShieldCheck, Eye, RefreshCw, Lock, Unlock } from "lucide-react";
import styles from "./FeatureStage.module.css";

export function FeatureText(): React.JSX.Element {
  return (
    <div className={styles.textColumn}>
      {/* 1. Step Number & Rolling Category Label */}
      <div className={styles.labelRow}>
        <div className={styles.counterMask}>
          <div id="counter-roll" className={styles.counterRoll}>
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </div>
        <div className={styles.labelDivider} />
        <div className={styles.labelTextMask}>
          <span id="label-name-1" className={styles.labelLine}>USER EXPERIENCE</span>
          <span id="label-name-2" className={styles.labelLine} style={{ opacity: 0, position: "absolute", top: 0, left: 0 }}>
            ADMIN CONTROL
          </span>
          <span id="label-name-3" className={styles.labelLine} style={{ opacity: 0, position: "absolute", top: 0, left: 0 }}>
            AI VISION ENGINE
          </span>
        </div>
      </div>

      {/* 2. Headline with Masked Word Reveals (Gradient on Suffix) */}
      <h2 className={styles.headlineWrap}>
        <div className={styles.wordMask}>
          <span id="headline-prefix-1" style={{ display: "inline-block" }}>Student &amp; Faculty&nbsp;</span>
          <span id="headline-prefix-2" style={{ display: "none" }}>Security &amp; Guard&nbsp;</span>
          <span id="headline-prefix-3" style={{ display: "none" }}>Python YOLOv11s&nbsp;</span>
        </div>
        <div className={styles.wordMask}>
          <span className={styles.gradientWord}>
            <span id="headline-suffix-1" style={{ display: "inline-block" }}>Mobile Portal</span>
            <span id="headline-suffix-2" style={{ display: "none" }}>Admin Console</span>
            <span id="headline-suffix-3" style={{ display: "none" }}>Plate Recognition</span>
          </span>
        </div>
      </h2>

      {/* 3. Description (Old slides up out of mask, new comes in from below) */}
      <div className={styles.descMask}>
        <p id="desc-1" className={styles.descLine}>
          A responsive cross-platform Flutter application putting students and faculty in control. Register vehicles via document OCR, view real-time gate entry logs, and carry an authenticated digital campus pass.
        </p>
        <p id="desc-2" className={styles.descLine} style={{ opacity: 0, transform: "translateY(100%)" }}>
          Full operational oversight for university gate security guards. Monitors campus occupancy, logs live plate scans with microsecond timestamps, and provides instant manual servo barrier overrides.
        </p>
        <p id="desc-3" className={styles.descLine} style={{ opacity: 0, transform: "translateY(100%)" }}>
          State-of-the-art computer vision pipeline specifically trained on Philippine standard license plates. Delivers high-confidence localization, robust character transcription via PaddleOCR, and microsecond barrier relay trigger.
        </p>
      </div>

      {/* 4. Checklist: 4 Items Staggered Exit & Enter with Checkmark Draw */}
      <div className={styles.checklistWrap}>
        {/* Item 1 */}
        <div className={styles.checklistItem} id="check-row-1">
          <div className={styles.checkIconBox}>
            <CheckCircle2 size={15} />
          </div>
          <div style={{ position: "relative", flex: 1, minHeight: 22, overflow: "hidden" }}>
            <span id="check-text-1-s1" style={{ position: "absolute", top: 0, left: 0 }}>Document OCR scanner for rapid vehicle registration</span>
            <span id="check-text-1-s2" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>Live campus capacity metrics (Total: 3 | Inside: 1)</span>
            <span id="check-text-1-s3" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>86.0% YOLOv11s detection confidence under harsh glare</span>
          </div>
        </div>

        {/* Item 2 */}
        <div className={styles.checklistItem} id="check-row-2">
          <div className={styles.checkIconBox}>
            <CheckCircle2 size={15} />
          </div>
          <div style={{ position: "relative", flex: 1, minHeight: 22, overflow: "hidden" }}>
            <span id="check-text-2-s1" style={{ position: "absolute", top: 0, left: 0 }}>Active vehicle credential pairing (Plate LGJ 910 • 4W)</span>
            <span id="check-text-2-s2" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>Automated plate match log with exact TIME IN (18:10)</span>
            <span id="check-text-2-s3" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>PaddleOCR automated plate character transcription (LGJ 910)</span>
          </div>
        </div>

        {/* Item 3 */}
        <div className={styles.checklistItem} id="check-row-3">
          <div className={styles.checkIconBox}>
            <CheckCircle2 size={15} />
          </div>
          <div style={{ position: "relative", flex: 1, minHeight: 22, overflow: "hidden" }}>
            <span id="check-text-3-s1" style={{ position: "absolute", top: 0, left: 0 }}>Instant student digital badge authentication (test123)</span>
            <span id="check-text-3-s2" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>One-click servo barrier manual override via WebSocket</span>
            <span id="check-text-3-s3" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>Sub-800ms end-to-end latency from CCTV to servo sweep</span>
          </div>
        </div>

        {/* Item 4 */}
        <div className={styles.checklistItem} id="check-row-4">
          <div className={styles.checkIconBox}>
            <CheckCircle2 size={15} />
          </div>
          <div style={{ position: "relative", flex: 1, minHeight: 22, overflow: "hidden" }}>
            <span id="check-text-4-s1" style={{ position: "absolute", top: 0, left: 0 }}>Real-time campus barrier clearance notifications</span>
            <span id="check-text-4-s2" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>Searchable student ownership registry &amp; audit log</span>
            <span id="check-text-4-s3" style={{ position: "absolute", top: 0, left: 0, opacity: 0, transform: "translateY(100%)" }}>Edge-optimized ONNX runtime with real-time OpenCV stream</span>
          </div>
        </div>
      </div>

      {/* 5. Tech Tags Cross-Swap */}
      <div className={styles.techTagsContainer}>
        {/* Step 1 Tags */}
        <div id="tech-tags-1" className={styles.techTagRow}>
          <span className={styles.techTag}>Flutter</span>
          <span className={styles.techTag}>Dart</span>
          <span className={styles.techTag}>Supabase</span>
          <span className={styles.techTag}>Android</span>
          <span className={styles.techTag}>iOS</span>
        </div>

        {/* Step 2 Tags */}
        <div id="tech-tags-2" className={styles.techTagRow} style={{ opacity: 0, pointerEvents: "none" }}>
          <span className={`${styles.techTag} ${styles.techTagGreen}`}>Next.js</span>
          <span className={`${styles.techTag} ${styles.techTagGreen}`}>WebSocket</span>
          <span className={`${styles.techTag} ${styles.techTagGreen}`}>ESP32 Relay</span>
          <span className={styles.techTag}>FreeRTOS</span>
        </div>

        {/* Step 3 Tags */}
        <div id="tech-tags-3" className={styles.techTagRow} style={{ opacity: 0, pointerEvents: "none" }}>
          <span className={`${styles.techTag} ${styles.techTagGold}`}>Python</span>
          <span className={`${styles.techTag} ${styles.techTagGold}`}>YOLOv11s</span>
          <span className={`${styles.techTag} ${styles.techTagGold}`}>PaddleOCR</span>
          <span className={styles.techTag}>OpenCV</span>
          <span className={styles.techTag}>PyTorch</span>
        </div>
      </div>

      {/* 6. Action Buttons Cross-Swap */}
      <div className={styles.actionsContainer}>
        {/* Step 1 Actions */}
        <div id="action-row-1" className={styles.actionRow}>
          <button type="button" className={styles.btnPrimary} onClick={() => alert("Simulated OCR: Plate LGJ 910 verified!")}>
            <Scan size={16} />
            <span>Simulate OCR Scan</span>
          </button>
          <button type="button" className={styles.btnSecondary} onClick={() => alert("Student Pass: Active Credential")}>
            <Smartphone size={15} />
            <span>Verify Student ID</span>
          </button>
        </div>

        {/* Step 2 Actions */}
        <div id="action-row-2" className={styles.actionRow} style={{ opacity: 0, pointerEvents: "none" }}>
          <button
            type="button"
            className={styles.btnPrimary}
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", borderColor: "rgba(16, 185, 129, 0.4)" }}
            onClick={() => alert("Servo Barrier Override Executed!")}
          >
            <ShieldCheck size={16} />
            <span>Toggle Servo Barrier</span>
          </button>
          <button type="button" className={styles.btnSecondary} onClick={() => alert("Occupancy Synchronized: 1 Inside")}>
            <RefreshCw size={14} />
            <span>Sync Occupancy</span>
          </button>
        </div>

        {/* Step 3 Actions */}
        <div id="action-row-3" className={styles.actionRow} style={{ opacity: 0, pointerEvents: "none" }}>
          <button
            type="button"
            className={styles.btnPrimary}
            style={{ background: "linear-gradient(135deg, #f5a623, #d97706)", borderColor: "rgba(245, 166, 35, 0.5)", color: "#000000" }}
            onClick={() => alert("YOLOv11s Inference: 86.0% Conf")}
          >
            <Eye size={16} />
            <span>Trigger YOLO Inference</span>
          </button>
          <button type="button" className={styles.btnSecondary} onClick={() => alert("Laser Sweep: Active")}>
            <RefreshCw size={14} />
            <span>Toggle Target Laser</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeatureText;
