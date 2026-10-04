"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import ScrollReveal from "./ScrollReveal";
import {
  Smartphone,
  ShieldCheck,
  Cpu,
  Radio,
  CheckCircle2,
  Zap,
  Wrench,
  Clock,
  Sparkles,
} from "lucide-react";

interface ShowcaseFeature {
  id: string;
  tabLabel: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  mockupType: "phone" | "ai-feed" | "hardware-dev";
  imageSrc?: string;
  badgeText?: string;
}

const SHOWCASE_DATA: ShowcaseFeature[] = [
  {
    id: "user-app",
    tabLabel: "User Mobile App",
    icon: <Smartphone size={18} />,
    tag: "Flutter Mobile Client (Dart)",
    title: "Student & Faculty Vehicle Registration Portal",
    description:
      "Dedicated cross-platform Flutter mobile client allowing university students, faculty, and campus staff to register vehicles, view real-time gate entry logs, and manage registered credentials. Built with a clean interface and instant cloud synchronization.",
    bullets: [
      "Document OCR scanner button for rapid vehicle registration ('Scan Document')",
      "Active vehicle registry & management (e.g., Plate LGJ910 • 4W White)",
      "Instant student credential authentication (test123 · STUDENT)",
      "Real-time barrier detection alerts and entry/exit history logs",
    ],
    mockupType: "phone",
    imageSrc: "/f06fc00e-c7f5-49c9-98db-1e298508c365.jpg",
    badgeText: "Flutter Mobile Client • Student Portal",
  },
  {
    id: "admin-app",
    tabLabel: "Security & Admin App",
    icon: <ShieldCheck size={18} />,
    tag: "Security Guard Station & Live Pass Log",
    title: "Live Campus Monitoring & Gate Status Dashboard",
    description:
      "Real-time administrative console for university security personnel and gate operators. Monitors campus occupancy, logs live plate scans with microsecond timestamps, and provides immediate vehicle owner lookup.",
    bullets: [
      "Live campus occupancy metrics (Total Registered: 3 | Currently Inside: 1)",
      "Latest gate scan status card: TIME IN with exact timestamp (2026-10-02 18:10:11)",
      "Direct vehicle owner pairing (Plate LGJ910 matched to owner test123)",
      "Dedicated operator console: Dashboard, Vehicles, History, and User Registry",
    ],
    mockupType: "phone",
    imageSrc: "/d0375754-58f3-43e0-b816-377fd0b9132f.jpg",
    badgeText: "Admin Dashboard • Live Guard Station",
  },
  {
    id: "alpr-engine",
    tabLabel: "AI ALPR Vision Engine",
    icon: <Cpu size={18} />,
    tag: "Deep Learning Edge Vision (YOLOv11s)",
    title: "YOLOv11s + PaddleOCR License Detection",
    description:
      "Custom-trained deep learning vision pipeline trained on Philippine vehicle plate standards. Operates on the edge with low latency, performing bounding box localization, color classification, and character transcription.",
    bullets: [
      "Custom YOLOv11s model trained for Philippine standard vehicle plates",
      "High-confidence bounding box detection (86.0% YOLO confidence on LGJ910)",
      "Automated vehicle categorization: OLD_SERIES_4W (Light 4-Wheel Vehicle)",
      "Sub-second (<800ms) detection-to-decision inference cycle",
    ],
    mockupType: "ai-feed",
    imageSrc: "/yolov11s.png",
    badgeText: "Live YOLOv11s Edge Inference",
  },
  {
    id: "hardware-gate",
    tabLabel: "IoT Barrier Hardware",
    icon: <Radio size={18} />,
    tag: "Embedded Hardware Prototyping",
    title: "Automated Servo Gate Barrier & ESP32",
    description:
      "The physical automated barrier gate controller is interfaced via ESP32 microcontroller and WebSocket relay. Currently under active development, prototyping, and bench calibration by the BSCPE 4A engineering proponents for the final capstone demonstration.",
    bullets: [
      "ESP32-WROOM-32D Dual-Core microcontroller running real-time FreeRTOS firmware",
      "High-Torque MG996R Metal Gear Servo motor with rapid 90° barrier arm sweep",
      "Dual Ultrasonic & IR anti-collision proximity sensors for vehicle safety",
      "Current Stage: Hardware bench testing & sensor calibration in active progress",
    ],
    mockupType: "hardware-dev",
    badgeText: "Currently Prototyping & Assembling",
  },
];

export default function ShowcaseTabs(): React.JSX.Element {
  const [activeTabId, setActiveTabId] = useState<string>("user-app");

  const currentItem =
    SHOWCASE_DATA.find((item) => item.id === activeTabId) ?? SHOWCASE_DATA[0];

  return (
    <div className={styles.showcaseSection} id="system-showcase">
      <ScrollReveal direction="up" delay={50} duration={800}>
        <div className={styles.sectionHeader}>
          <span className="badge-pill">
            <Sparkles size={14} color="#F5A623" />
            <span>Interactive System Showcase</span>
          </span>
          <h2 className={styles.sectionTitle}>
            Integrated App & Hardware Ecosystem
          </h2>
          <p className={styles.sectionSubtitle}>
            From mobile Flutter clients to edge AI vision and IoT gate barriers, explore
            the complete IntelliGate thesis research architecture.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={180} duration={800}>
        <div className={styles.showcaseTabs} role="tablist" aria-label="System Showcase Navigation">
          {SHOWCASE_DATA.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`${styles.showcaseTabBtn} ${
                  isActive ? styles.showcaseTabBtnActive : ""
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.icon}
                <span>{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={260} duration={850}>
        <div
          key={currentItem.id}
          className={`${styles.showcaseDisplay} tab-content-enter`}
          role="tabpanel"
          id={`panel-${currentItem.id}`}
          aria-labelledby={`tab-${currentItem.id}`}
        >
          <div className={styles.showcaseDetails}>
            <span className={styles.showcaseTag}>{currentItem.tag}</span>
            <h3 className={styles.showcaseHeading}>{currentItem.title}</h3>
            <p className={styles.showcaseDescription}>
              {currentItem.description}
            </p>

            <ul className={styles.featureList}>
              {currentItem.bullets.map((bullet, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.mockupFrameWrapper}>
            {currentItem.mockupType === "phone" && currentItem.imageSrc && (
              <div className={styles.phoneMockupFrame}>
                <div className={styles.phoneSpeaker} />
                <div className={styles.phoneScreenContent}>
                  <Image
                    src={currentItem.imageSrc}
                    alt={currentItem.title}
                    fill
                    sizes="(max-width: 768px) 260px, 300px"
                    className={styles.phoneScreenImage}
                    priority
                  />
                  <div className={styles.phoneGlareOverlay} />
                  <div className={styles.phoneBadgeOverlay}>
                    <span className="live-beacon-dot" />
                    <span>{currentItem.badgeText}</span>
                  </div>
                </div>
              </div>
            )}

            {currentItem.mockupType === "ai-feed" && currentItem.imageSrc && (
              <div className={styles.aiVisionMonitor}>
                <div className={styles.aiVisionHeader}>
                  <div className={styles.windowDotRed} />
                  <div className={styles.windowDotYellow} />
                  <div className={styles.windowDotGreen} />
                  <span className={styles.aiVisionTitle}>
                    yolov11s_inference.py — Realtime Detection
                  </span>
                  <span className={styles.aiVisionLiveBadge}>
                    <span className="live-beacon-dot" />
                    60 FPS
                  </span>
                </div>

                <div className={styles.aiVisionScreenWrapper}>
                  <Image
                    src={currentItem.imageSrc}
                    alt="YOLOv11s ALPR Detection Inference"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className={styles.aiVisionScreenImage}
                    priority
                  />
                  <div className={styles.aiVisionHudOverlay}>
                    <span className={styles.aiHudTag}>CONFIDENCE: 86.0%</span>
                    <span className={styles.aiHudTagGold}>TARGET: LGJ910</span>
                  </div>
                </div>

                <div className={styles.aiVisionTelemetry}>
                  <div className={styles.aiTelemetryItem}>
                    <span className={styles.aiTelemetryLabel}>Detected Plate</span>
                    <span
                      className={styles.aiTelemetryValue}
                      style={{ color: "#F5A623" }}
                    >
                      LGJ910
                    </span>
                  </div>
                  <div className={styles.aiTelemetryItem}>
                    <span className={styles.aiTelemetryLabel}>Classification</span>
                    <span className={styles.aiTelemetryValue}>OLD_SERIES_4W</span>
                  </div>
                  <div className={styles.aiTelemetryItem}>
                    <span className={styles.aiTelemetryLabel}>Barrier Status</span>
                    <span
                      className={styles.aiTelemetryValue}
                      style={{ color: "#4ADE80" }}
                    >
                      AUTHORIZED
                    </span>
                  </div>
                </div>
              </div>
            )}

            {currentItem.mockupType === "hardware-dev" && (
              <div className={styles.hardwareDevCard}>
                <div className={styles.hardwareHeader}>
                  <div className={styles.windowDotRed} />
                  <div className={styles.windowDotYellow} />
                  <div className={styles.windowDotGreen} />
                  <span className={styles.hardwareTitle}>
                    esp32_barrier_firmware.ino
                  </span>
                  <span className={styles.hardwareActiveBadge}>
                    <span className="live-beacon-dot" />
                    ACTIVE PROTOTYPING
                  </span>
                </div>

                <div className={styles.hardwareBody}>
                  <div className={styles.hardwareHeroBox}>
                    <div className={styles.hardwareIconRing}>
                      <Cpu size={26} color="#F5A623" />
                    </div>
                    <div className={styles.hardwareHeroText}>
                      <h4 className={styles.hardwareHeroHeading}>
                        Hardware Barrier Under Construction
                      </h4>
                      <p className={styles.hardwareHeroSub}>
                        Active bench assembly, wiring, and sensor calibration by the BSCPE 4A proponents.
                      </p>
                    </div>
                  </div>

                  <div className={styles.hardwareProgressSection}>
                    <div className={styles.hardwareProgressHeader}>
                      <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                        Hardware Readiness
                      </span>
                      <span
                        style={{
                          color: "#F5A623",
                          fontWeight: 700,
                          fontFamily: "monospace",
                        }}
                      >
                        75% Completed
                      </span>
                    </div>
                    <div className={styles.hardwareProgressTrack}>
                      <div className={styles.hardwareProgressBar} />
                    </div>
                  </div>

                  <div className={styles.hardwarePhaseList}>
                    <div className={styles.hardwarePhaseItem}>
                      <div className={styles.hardwarePhaseLabel}>
                        <CheckCircle2 size={16} color="#4ADE80" />
                        <span>ESP32 Core & WebSocket Relay</span>
                      </div>
                      <span className={styles.hardwareStatusTagDone}>Completed</span>
                    </div>

                    <div className={styles.hardwarePhaseItem}>
                      <div className={styles.hardwarePhaseLabel}>
                        <CheckCircle2 size={16} color="#4ADE80" />
                        <span>High-Torque Servo Arm Sweep (0°–90°)</span>
                      </div>
                      <span className={styles.hardwareStatusTagDone}>Completed</span>
                    </div>

                    <div className={styles.hardwarePhaseItem}>
                      <div className={styles.hardwarePhaseLabel}>
                        <Zap size={16} color="#F5A623" />
                        <span>Dual Ultrasonic & IR Safety Sensors</span>
                      </div>
                      <span className={styles.hardwareStatusTagDoing}>Currently Doing</span>
                    </div>

                    <div className={styles.hardwarePhaseItem}>
                      <div className={styles.hardwarePhaseLabel}>
                        <Wrench size={16} color="#F5A623" />
                        <span>Custom Enclosure 3D Print & Wiring</span>
                      </div>
                      <span className={styles.hardwareStatusTagDoing}>Currently Doing</span>
                    </div>

                    <div className={styles.hardwarePhaseItem}>
                      <div className={styles.hardwarePhaseLabel}>
                        <Clock size={16} color="#94A3B8" />
                        <span>Final Gate Mount & Defense Live Demo</span>
                      </div>
                      <span className={styles.hardwareStatusTagNext}>Coming Soon</span>
                    </div>
                  </div>

                  <div className={styles.hardwareSpecsRow}>
                    <span className={styles.hardwareSpecChip}>ESP32-WROOM</span>
                    <span className={styles.hardwareSpecChip}>MG996R Metal Gear</span>
                    <span className={styles.hardwareSpecChip}>HC-SR04 Proximity</span>
                    <span className={styles.hardwareSpecChip}>&lt;800ms Sweep</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
