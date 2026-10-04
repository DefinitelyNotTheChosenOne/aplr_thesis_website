"use client";

import React, { useState } from "react";
import styles from "../page.module.css";
import ScrollReveal from "./ScrollReveal";
import {
  Smartphone,
  ShieldCheck,
  Cpu,
  Radio,
  CheckCircle2,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

interface ShowcaseFeature {
  id: string;
  tabLabel: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  mockupTitle: string;
  mockupSubtitle: string;
  mockupType: "phone" | "console";
}

const SHOWCASE_DATA: ShowcaseFeature[] = [
  {
    id: "user-app",
    tabLabel: "User Mobile App",
    icon: <Smartphone size={18} />,
    tag: "Mobile Experience (Flutter)",
    title: "Instant Vehicle Registration & Live Pass",
    description:
      "Cross-platform Flutter application tailored for students, faculty, and campus staff. Users register vehicles, view real-time entry logs, receive barrier clearance alerts, and generate digital gate credentials.",
    bullets: [
      "White & Royal Blue clean interface with gold accent highlights",
      "Instant push notification on barrier detection & entry/exit logs",
      "Multi-vehicle management (cars, motorcycles, institutional shuttles)",
      "Secure biometric authentication & profile management",
    ],
    mockupTitle: "[APP SCREENSHOT PLACEHOLDER]",
    mockupSubtitle: "intelligate_users / Mobile Client Screen",
    mockupType: "phone",
  },
  {
    id: "admin-app",
    tabLabel: "Security & Admin App",
    icon: <ShieldCheck size={18} />,
    tag: "Admin & Guard Station",
    title: "Live Campus Monitoring & Gate Override",
    description:
      "Dedicated portal for security personnel and campus administrators. Provides real-time stream inspection, manual barrier open/close triggers, blacklist flagging, and visitor clearance.",
    bullets: [
      "One-tap manual servo barrier override during emergencies",
      "Real-time plate recognition logs with high-resolution vehicle snapshot",
      "Instant query by plate number, student/employee ID, or owner name",
      "Real-time audio alert for unauthorized or unregistered vehicles",
    ],
    mockupTitle: "[ADMIN SCREENSHOT PLACEHOLDER]",
    mockupSubtitle: "intelligate_admin / Security Guard Console",
    mockupType: "phone",
  },
  {
    id: "alpr-engine",
    tabLabel: "AI ALPR Vision Engine",
    icon: <Cpu size={18} />,
    tag: "Deep Learning Pipeline",
    title: "YOLOv11s + PaddleOCR License Detection",
    description:
      "Trained on Philippine standard vehicle plates and specialized campus tags. Operates locally with ultra-low latency, running bounding box detection, color classification, and character transcription.",
    bullets: [
      "Custom YOLOv11s model trained for high accuracy in diverse daylight & night conditions",
      "Secondary PaddleOCR pipeline for alphanumeric character segmentation",
      "Sub-second (<800ms) detection-to-decision inference cycle",
      "Automated edge caching and Supabase synchronization",
    ],
    mockupTitle: "[AI VISION SCREENSHOT PLACEHOLDER]",
    mockupSubtitle: "YOLOv11s Bounding Box & OCR Inference Feed",
    mockupType: "console",
  },
  {
    id: "hardware-gate",
    tabLabel: "IoT Barrier Hardware",
    icon: <Radio size={18} />,
    tag: "Embedded Controller",
    title: "Microcontroller & Automated Servo Gate",
    description:
      "Hardware gate barrier controller interfaced via ESP32 / Arduino and serial/WebSocket communication. Ensures fail-safe barrier operation with proximity sensor validation.",
    bullets: [
      "Instant servo motor actuation upon valid database handshake",
      "Ultrasonic & infrared safety sensor to prevent accidental arm descent",
      "Status LED indicator (Green = Access Granted, Red = Access Denied)",
      "Manual emergency mechanical override switch",
    ],
    mockupTitle: "[HARDWARE SETUP PLACEHOLDER]",
    mockupSubtitle: "Gate Barrier Mechanism & ESP32 Controller Board",
    mockupType: "console",
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
          <span className="badge-pill">Interactive Showcase</span>
          <h2 className={styles.sectionTitle}>
            Integrated App & Hardware System
          </h2>
          <p className={styles.sectionSubtitle}>
            From mobile client apps to edge AI vision and IoT gate barriers, explore
            the complete IntelliGate ecosystem.
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
          {currentItem.mockupType === "phone" ? (
            <div className={styles.phoneMockupFrame}>
              <div className={styles.phoneSpeaker} />
              <div className={styles.phoneScreenContent}>
                <div className={styles.phonePlaceholderBox}>
                  <ImageIcon size={44} color="#1A2BA6" />
                  <p className={styles.phonePlaceholderText}>
                    {currentItem.mockupTitle}
                  </p>
                  <p className={styles.phonePlaceholderSub}>
                    {currentItem.mockupSubtitle}
                  </p>
                  <span
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.7rem",
                      color: "#94A3B8",
                      padding: "0.25rem 0.6rem",
                      background: "#FFFFFF",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <ExternalLink size={12} /> Replace with actual screenshot
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                maxWidth: "460px",
                height: "360px",
                background: "rgba(10, 15, 36, 0.9)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  height: "36px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1rem",
                  gap: "0.5rem",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.75rem",
                    color: "#94A3B8",
                    fontFamily: "monospace",
                  }}
                >
                  system_stream.py
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "0.75rem",
                }}
              >
                <ImageIcon size={48} color="#F5A623" />
                <h4 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 700 }}>
                  {currentItem.mockupTitle}
                </h4>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", maxWidth: "300px" }}>
                  {currentItem.mockupSubtitle}
                </p>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#F5A623",
                    padding: "0.3rem 0.75rem",
                    background: "rgba(245, 166, 35, 0.1)",
                    borderRadius: "9999px",
                    border: "1px solid rgba(245, 166, 35, 0.3)",
                  }}
                >
                  High-Resolution Stream / Diagram Placeholder
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
}
