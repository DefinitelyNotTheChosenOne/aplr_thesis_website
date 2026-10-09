"use client";

import React, { forwardRef } from "react";
import styles from "./FeatureStage.module.css";

export const ScreenUser = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenUser({ isVisible = true }, ref) {
    return (
      <div
        ref={ref}
        className={styles.screenLayer}
        style={{
          visibility: isVisible ? "visible" : "hidden",
          zIndex: 2,
        }}
        data-screen="user"
      >
        {/* Student Mobile Credential Header */}
        <div className={styles.userHeader}>
          <div className={styles.userAvatar}>LR</div>
          <div className={styles.userGreeting}>
            <div className={styles.userName}>Lawrence Matthew (test123)</div>
            <div className={styles.userSubtitle}>BSCPE 4A • Verified Student Pass</div>
          </div>
          <div style={{ fontSize: "1.1rem" }}>🔔</div>
        </div>

        {/* Stats Grid: Registered Plate & Barrier Status */}
        <div className={styles.userStatsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Registered Plate</div>
            {/* Target anchor slot for traveling plate chip */}
            <div
              id="user-plate-anchor"
              style={{
                width: 130,
                height: 38,
                position: "relative",
              }}
            />
            <div className={styles.statSubtext}>OLD_SERIES_4W • ACTIVE</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Barrier Clearance</div>
            <div id="user-status-anchor" style={{ marginTop: 4 }}>
              <span className={styles.statusPill}>CLEAR</span>
            </div>
            <div className={styles.statSubtext}>&lt; 0.8s SERVO SWEEP</div>
          </div>
        </div>

        {/* Weekly Campus Clearance Log Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Weekly Campus Gate Clearance Log</div>
          <div className={styles.chartBars}>
            <div className={`${styles.bar} user-chart-bar`} style={{ height: "45%" }} />
            <div className={`${styles.bar} user-chart-bar`} style={{ height: "65%" }} />
            <div className={`${styles.bar} user-chart-bar`} style={{ height: "40%" }} />
            <div className={`${styles.bar} ${styles.barActive} user-chart-bar`} style={{ height: "92%" }} />
            <div className={`${styles.bar} user-chart-bar`} style={{ height: "70%" }} />
            <div className={`${styles.bar} user-chart-bar`} style={{ height: "55%" }} />
            <div className={`${styles.bar} ${styles.barActive} user-chart-bar`} style={{ height: "86%" }} />
            <div className={`${styles.bar} user-chart-bar`} style={{ height: "60%" }} />
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenUser;
