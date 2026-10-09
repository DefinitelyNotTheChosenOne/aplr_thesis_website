"use client";

import React, { forwardRef } from "react";
import styles from "./FeatureStage.module.css";

export const ScreenAdmin = forwardRef<HTMLDivElement, { isVisible?: boolean }>(
  function ScreenAdmin({ isVisible = false }, ref) {
    return (
      <div
        ref={ref}
        className={styles.screenLayer}
        style={{
          visibility: isVisible ? "visible" : "hidden",
          zIndex: 3,
        }}
        data-screen="admin"
      >
        <div className={styles.adminLayout}>
          {/* Tactical Left Sidebar */}
          <div className={styles.adminSidebar}>
            <div className={`${styles.navIcon} ${styles.navIconActive}`}>🏠</div>
            <div className={styles.navIcon}>🚗</div>
            <div className={styles.navIcon}>📜</div>
            <div className={styles.navIcon}>⚙️</div>
          </div>

          {/* Main Table Area */}
          <div className={styles.adminMain}>
            <div className={styles.adminHeader}>
              <span className={styles.adminTitle}>Live Campus Gate Pass Log</span>
              <span id="admin-barrier-badge" className={styles.barrierBadge}>
                BARRIER NORMAL
              </span>
            </div>
            <div className={styles.adminSub}>
              Campus Capacity: 1 Inside • 3 Registered Total
            </div>

            <div className={styles.adminTable}>
              <div className={styles.tableHeader}>
                <div>Plate</div>
                <div>Owner</div>
                <div>Status</div>
              </div>

              {/* Row 1: Target slot where the LGJ 910 plate chip lands */}
              <div className={`${styles.tableRow} admin-row-1`}>
                <div id="admin-plate-anchor" className={styles.cellPlatePlaceholder} />
                <div className={styles.cellOwner}>test123</div>
                <div>
                  <span className={styles.badgeInside}>INSIDE (18:10)</span>
                </div>
              </div>

              {/* Row 2: Staggered reveal in Morph 1->2 */}
              <div className={`${styles.tableRow} admin-table-row admin-row-2`}>
                <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#e2e8f0" }}>
                  ABC 1234
                </div>
                <div className={styles.cellOwner}>faculty01</div>
                <div>
                  <span className={styles.badgeCleared}>CLEARED OUT</span>
                </div>
              </div>

              {/* Row 3: Staggered reveal in Morph 1->2 */}
              <div className={`${styles.tableRow} admin-table-row admin-row-3`}>
                <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#e2e8f0" }}>
                  XYZ 5678
                </div>
                <div className={styles.cellOwner}>student44</div>
                <div>
                  <span className={styles.badgePending}>REGISTERED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ScreenAdmin;
