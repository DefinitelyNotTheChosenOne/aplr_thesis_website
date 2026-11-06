"use client";

import React from "react";
import styles from "./DownloadMobileAppSection.module.css";
import { getLenis } from "../lib/lenis";
import { Download, ArrowUp, CheckCircle2 } from "lucide-react";

const GOOGLE_DRIVE_DOWNLOAD_URL =
  "https://drive.google.com/drive/folders/119sLWwebH6a5DMppAmZeSClt8jMkla7V?usp=sharing";

export function DownloadMobileAppSection(): React.JSX.Element {
  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      className={styles.downloadSection}
      id="section-download-app"
      aria-label="Download IntelliGate Mobile Application"
    >
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.contentWrapper}>
        {/* Badge */}
        <div className={styles.appBadge}>
          <span className={styles.appBadgeDot} />
          <span>CROSS-PLATFORM FLUTTER MOBILE PASS</span>
        </div>

        {/* Header */}
        <h2 className={styles.sectionTitle}>
          Download the <br />
          <span className={styles.titleGradient}>IntelliGate App</span>
        </h2>

        <p className={styles.sectionSubtitle}>
          Experience seamless, queue-free campus gate clearance. Register your
          vehicle via document OCR, carry your authenticated student QR pass,
          and receive instant barrier access logs on your phone.
        </p>

        {/* 2-Card Grid: Left Download Specs + Right QR Code Scanner */}
        <div className={styles.downloadGrid}>
          {/* Left Card: Direct APK Download & Feature Highlights */}
          <div className={styles.downloadCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardVersionRow}>
                <span className={styles.versionBadge}>v1.0.4 Release</span>
                <span className={styles.sizeBadge}>Android APK • ~32.4 MB</span>
              </div>
              <h3>IntelliGate Mobile Portal</h3>
              <p>
                Official build for Dr. Yanga&apos;s Colleges Inc. students,
                faculty, and administrative staff. Compatible with Android 8.0+
                and modern iOS devices.
              </p>
            </div>

            <div className={styles.featuresMiniList}>
              <div className={styles.featureMiniItem}>
                <div className={styles.featureCheckIcon}>
                  <CheckCircle2 size={13} />
                </div>
                <span>Optical Character Recognition (OCR) for Vehicle OR/CR</span>
              </div>
              <div className={styles.featureMiniItem}>
                <div className={styles.featureCheckIcon}>
                  <CheckCircle2 size={13} />
                </div>
                <span>BSCPE Student digital QR access pass badge</span>
              </div>
              <div className={styles.featureMiniItem}>
                <div className={styles.featureCheckIcon}>
                  <CheckCircle2 size={13} />
                </div>
                <span>Real-time gate telemetry &amp; barrier clearance alerts</span>
              </div>
              <div className={styles.featureMiniItem}>
                <div className={styles.featureCheckIcon}>
                  <CheckCircle2 size={13} />
                </div>
                <span>Fast Supabase authentication with offline caching</span>
              </div>
            </div>

            <a
              href={GOOGLE_DRIVE_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnDownloadPill}
              aria-label="Download IntelliGate Mobile APK from Google Drive"
            >
              <span>Download Mobile App (APK)</span>
              <Download size={20} />
            </a>
          </div>

          {/* Right Card: Scan with Mobile Device */}
          <div className={styles.qrCard}>
            <div className={styles.qrContainer}>
              {/* Clean high-contrast QR code SVG linking to Google Drive APK */}
              <svg
                width="168"
                height="168"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="crispEdges"
                aria-label="QR Code linking to Mobile APK Download"
              >
                {/* Background */}
                <rect width="29" height="29" fill="#ffffff" />
                {/* Top-Left Position Detection Marker */}
                <rect x="2" y="2" width="7" height="7" fill="#000000" />
                <rect x="3" y="3" width="5" height="5" fill="#ffffff" />
                <rect x="4" y="4" width="3" height="3" fill="#000000" />
                {/* Top-Right Position Detection Marker */}
                <rect x="20" y="2" width="7" height="7" fill="#000000" />
                <rect x="21" y="3" width="5" height="5" fill="#ffffff" />
                <rect x="22" y="4" width="3" height="3" fill="#000000" />
                {/* Bottom-Left Position Detection Marker */}
                <rect x="2" y="20" width="7" height="7" fill="#000000" />
                <rect x="3" y="21" width="5" height="5" fill="#ffffff" />
                <rect x="4" y="22" width="3" height="3" fill="#000000" />
                {/* Alignment Patterns & Data Matrix Bits */}
                <rect x="10" y="3" width="2" height="1" fill="#000000" />
                <rect x="13" y="2" width="1" height="2" fill="#000000" />
                <rect x="15" y="4" width="3" height="1" fill="#000000" />
                <rect x="11" y="6" width="1" height="3" fill="#000000" />
                <rect x="14" y="7" width="2" height="2" fill="#000000" />
                <rect x="17" y="6" width="1" height="1" fill="#000000" />
                <rect x="3" y="10" width="1" height="2" fill="#000000" />
                <rect x="6" y="11" width="2" height="1" fill="#000000" />
                <rect x="9" y="10" width="3" height="2" fill="#000000" />
                <rect x="13" y="11" width="2" height="3" fill="#000000" />
                <rect x="16" y="10" width="1" height="2" fill="#000000" />
                <rect x="19" y="10" width="3" height="1" fill="#000000" />
                <rect x="24" y="11" width="2" height="2" fill="#000000" />
                <rect x="10" y="15" width="2" height="2" fill="#000000" />
                <rect x="13" y="16" width="3" height="1" fill="#000000" />
                <rect x="17" y="14" width="2" height="2" fill="#000000" />
                <rect x="20" y="15" width="1" height="3" fill="#000000" />
                <rect x="23" y="14" width="3" height="1" fill="#000000" />
                <rect x="10" y="19" width="3" height="2" fill="#000000" />
                <rect x="14" y="20" width="2" height="1" fill="#000000" />
                <rect x="18" y="19" width="1" height="3" fill="#000000" />
                <rect x="21" y="20" width="2" height="2" fill="#000000" />
                <rect x="25" y="19" width="2" height="1" fill="#000000" />
                <rect x="11" y="23" width="2" height="2" fill="#000000" />
                <rect x="15" y="22" width="2" height="3" fill="#000000" />
                <rect x="19" y="24" width="3" height="2" fill="#000000" />
                <rect x="24" y="23" width="1" height="2" fill="#000000" />
              </svg>
            </div>

            <div className={styles.qrTitle}>Scan with Phone</div>
            <p className={styles.qrDescription}>
              Point your smartphone camera at this QR code to download the APK
              directly to your device.
            </p>
          </div>
        </div>

        {/* Bottom Actions: Back to Top */}
        <div className={styles.bottomActions}>
          <button
            type="button"
            className={styles.btnBackToTop}
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DownloadMobileAppSection;
