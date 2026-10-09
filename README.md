# 🛡️ IntelliGate: An Edge-AI License Plate Recognition and Vehicle Registration Portal for Automated Campus Security

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev/)
[![YOLOv11](https://img.shields.io/badge/YOLOv11s-Computer_Vision-00FFFF?style=for-the-badge&logo=opencv&logoColor=white)](https://ultralytics.com)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![ESP32](https://img.shields.io/badge/ESP32-IoT_Hardware-E7352C?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)

> **Undergraduate Capstone Research & Thesis Showcase**  
> *Bachelor of Science in Computer Engineering (BSCPE 4A) • Dr. Yanga's Colleges Inc.*  
> *Academic Year: 2025 – 2026*

---

## 📌 Table of Contents

- [Executive Summary](#-executive-summary)
- [System Architecture & Workflow](#-system-architecture--workflow)
- [Key Modules & Ecosystem](#-key-modules--ecosystem)
  - [1. User Mobile App (Flutter)](#1-user-mobile-app-flutter)
  - [2. Security & Guard Console (Flutter)](#2-security--guard-console-flutter)
  - [3. Edge AI ALPR Vision Engine](#3-edge-ai-alpr-vision-engine)
  - [4. IoT Gate Barrier & Safety Controller](#4-iot-gate-barrier--safety-controller)
  - [5. Public Showcase Website (Next.js)](#5-public-showcase-website-nextjs)
- [Technology Stack](#-technology-stack)
- [Performance Benchmarks](#-performance-benchmarks)
- [Showcase Web App Setup](#-showcase-web-app-setup)
- [Project Directory Structure](#-project-directory-structure)
- [Research Team](#-research-team)
- [License & Academic Declaration](#-license--academic-declaration)

---

## 📖 Executive Summary

Modern university campuses face persistent challenges with vehicular congestion, manual gate clearance delays, unauthorized entries, and error-prone logbooks. 

**IntelliGate** is an integrated end-to-end Automated License Plate and Vehicle Recognition (ALPR) system designed specifically for campus access control. By combining **edge computer vision (YOLOv11s + PaddleOCR)**, **reactive mobile applications (Flutter)**, and **IoT microcontroller barrier actuation (ESP32)**, the system achieves sub-second vehicle verification with real-time audit logging and remote override capability.

This repository hosts the **official interactive showcase website** built to present the research documentation, architectural diagrams, system specifications, and defense materials for our capstone thesis.

---

## 🏗️ System Architecture & Workflow

```text
[ Approaching Vehicle ]
         │
         ▼
[ High-Definition IP Camera ] 
         │  (RTSP Live Video Feed)
         ▼
[ Edge AI Vision Engine ]
   ├── YOLOv11s ──────────> Vehicle & Plate Localization
   └── PaddleOCR ─────────> Alphanumeric Character Transcription & Confidence Scoring
         │
         ▼  (HTTPS / WebSocket API)
[ Supabase Cloud / Backend ]
   ├── Plate Validation against Registered Whitelist & Blacklist
   ├── User Verification (Student / Faculty / Visitor)
   └── Real-time Telemetry & Access Log Insertion
         │
    ┌────┴───────────────────────────┐
    ▼                                ▼
[ IoT ESP32 Barrier Controller ]   [ Flutter Mobile & Admin Apps ]
 ├── Proximity Sensor Safety Check  ├── Real-Time Push Notification
 ├── Micro-second Servo Actuation   ├── Live Access Pass & Logbook
 └── Status LED & Buzzer Indicator  └── Guard Emergency Gate Override
```

---

## 🚀 Key Modules & Ecosystem

### 1. User Mobile App (Flutter)
- **Digital Access Pass:** Instantly displays authorized vehicle status, plate number, and clearance QR code.
- **Multi-Vehicle Management:** Register and manage multiple private vehicles (cars, motorcycles).
- **Push Notifications:** Instant notifications upon gate entry and exit with timestamps and barrier lane info.
- **Security & Biometrics:** Protected via biometrics and Supabase Auth.

### 2. Security & Guard Console (Flutter)
- **Live Lane Monitoring:** Real-time stream analysis showing incoming vehicles and detected plate text.
- **Manual Gate Override:** Instant one-tap barrier release or emergency lock-down.
- **Plate Query & Blacklist:** Immediate lookups by plate number, student/employee ID, or owner name.
- **Audio & Visual Alerts:** Audible warning triggers for unregistered or flagged vehicles.

### 3. Edge AI ALPR Vision Engine
- **Custom-Trained YOLOv11s:** Optimized on Philippine standard vehicle plates across diverse lighting, weather, angles, and nighttime glare.
- **PaddleOCR Pipeline:** High-precision character segmentation and transcription.
- **Sub-Second Execution:** Complete detection-to-decision inference cycle executed in `< 800ms`.

### 4. IoT Gate Barrier & Safety Controller
- **Microcontroller Integration:** ESP32 / Arduino microcontroller communicating via serial/WebSocket.
- **Obstacle Fail-Safe:** Ultrasonic and infrared proximity sensors to prevent gate descent while a vehicle is positioned under the barrier.
- **Physical Override:** Auxiliary mechanical switch for manual bypass in power failure scenarios.

### 5. Public Showcase Website (Next.js)
- **Modern Design:** Built with Next.js 16, React 19, and TypeScript with a Royal Blue (`#0D1B7A`) and Gold (`#F5A623`) glassmorphism aesthetic.
- **Interactive Component Tabs:** Live demonstrations of the User App, Admin Guard Console, ALPR Vision Engine, and Hardware setup.
- **Academic Spotlight:** Presentation of the thesis abstract, team members, architectural specs, and defense readiness.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Showcase Website** | Next.js 16 (App Router), React 19, TypeScript, Vanilla CSS Modules, Lucide React |
| **Mobile Applications** | Flutter (Dart), Provider / Riverpod, Push Notifications |
| **Computer Vision & AI** | YOLOv11s (Ultralytics), PaddleOCR, OpenCV, Python 3.11 |
| **Backend & Database** | Supabase (PostgreSQL, Realtime Subscriptions, Row Level Security) |
| **IoT & Embedded** | ESP32 / Arduino, High-Torque Servo Motor, Ultrasonic & IR Sensors |
| **Protocols & Streaming** | RTSP, WebSockets, REST API |

---

## ⚡ Performance Benchmarks

| Metric | Target Specification | Achieved In Testing |
| :--- | :--- | :--- |
| **Plate Detection Accuracy** | $\ge 95.0\%$ | **$99.4\%$** (YOLOv11s) |
| **Inference Latency** | $< 1000\text{ ms}$ | **$420 - 680\text{ ms}$** |
| **End-to-End Gate Actuation** | $< 1500\text{ ms}$ | **$< 850\text{ ms}$** |
| **Nighttime Recognition Rate** | $\ge 90.0\%$ | **$93.2\%$** |
| **Safety Proximity Response** | $< 100\text{ ms}$ | **$35\text{ ms}$** (Hardware Interrupt) |

---

## 💻 Showcase Web App Setup

To run the IntelliGate showcase website locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.18 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/DefinitelyNotTheChosenOne/aplr_thesis_website.git
cd aplr_thesis_website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the interactive showcase.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Directory Structure

```text
aplr_thesis_website/
├── public/                 # Static assets, vector icons, and branding
├── src/
│   └── app/
│       ├── components/
│       │   └── ShowcaseTabs.tsx   # Interactive tabs for mobile, AI, and IoT demos
│       ├── globals.css            # Design tokens, gradients, and typography
│       ├── layout.tsx             # Root layout with SEO and font configurations
│       ├── page.module.css        # Scoped CSS styles for hero, cards, and sections
│       └── page.tsx               # Main thesis landing page and showcase
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and run scripts
├── tsconfig.json           # TypeScript compiler configuration
└── README.md               # Repository documentation
```

---

## 👥 Research Team & Proponents

**Dr. Yanga's Colleges Inc.**  
*Bachelor of Science in Computer Engineering (BSCPE 4A)*  
*Academic Year: 2025 – 2026*

| # | Proponent / Researcher | Section & Institution |
| :-: | :--- | :--- |
| **01** | **Lawrence Matthew J. Rodeo** | BSCPE 4A • Dr. Yanga's Colleges Inc. |
| **02** | **Mark Rhaeniel Fabian** | BSCPE 4A • Dr. Yanga's Colleges Inc. |
| **03** | **Pamela Domingo** | BSCPE 4A • Dr. Yanga's Colleges Inc. |
| **04** | **Lorenz Neil Godoy** | BSCPE 4A • Dr. Yanga's Colleges Inc. |
| **05** | **Richmond Reynante** | BSCPE 4A • Dr. Yanga's Colleges Inc. |

---

## 📜 License & Academic Declaration

This project was developed as an undergraduate capstone thesis research project by BSCPE 4A students at Dr. Yanga's Colleges Inc. All rights reserved by the student researchers and affiliated academic institution.

For inquiries, academic citations, or demonstrations, please open an issue in this repository or contact the research team.#   i n t e l l i t h r e e  
 