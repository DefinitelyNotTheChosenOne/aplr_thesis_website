import React from "react";
import styles from "./page.module.css";
import ShowcaseTabs from "./components/ShowcaseTabs";
import ScrollReveal from "./components/ScrollReveal";
import {
  Shield,
  Download,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Cpu,
  Layers,
  CheckCircle,
  Clock,
  Car,
  Camera,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "Lawrence Matthew J. Rodeo" },
  { id: 2, name: "Mark Rhaeniel Fabian" },
  { id: 3, name: "Pamela Domingo" },
  { id: 4, name: "Lorenz Neil Godoy" },
  { id: 5, name: "Richmond Reynante" },
];

export default function Home(): React.JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "IntelliGate: An Edge-AI License Plate Recognition and Vehicle Registration Portal for Automated Campus Security",
    description:
      "An Edge-AI License Plate Recognition and Vehicle Registration Portal for Automated Campus Security by BSCPE 4A at Dr. Yanga's Colleges Inc.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Android, iOS, Web",
    author: {
      "@type": "Organization",
      name: "BSCPE 4A Thesis Team - Dr. Yanga's Colleges Inc.",
    },
  };

  return (
    <div className={styles.pageContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Hero Section">
        {/* Subtle Ambient Ring & Glow (No Overglow) */}
        <div className={`${styles.ambientOrb1} anim-ambient-pulse`} />
        <div className={`${styles.ambientRing} anim-ring-rotate`} />
        <div className={styles.ambientRing2} />

        {/* Top Floating Glass Navigation Bar (Slide Down on Load) */}
        <header className={`${styles.navbar} anim-load-nav`}>
          <div className={styles.brandLogo}>
            <div className={styles.brandIconWrapper}>
              <Shield size={20} />
            </div>
            <div className={styles.brandText}>
              INTELLI<span>GATE</span>
            </div>
          </div>

          <nav aria-label="Main Navigation">
            <ul className={styles.navLinks}>
              <li>
                <a href="#thesis-spotlight" className={styles.navLink}>
                  Thesis Overview
                </a>
              </li>
              <li>
                <a href="#system-showcase" className={styles.navLink}>
                  App Showcase
                </a>
              </li>
              <li>
                <a href="#team-members" className={styles.navLink}>
                  Research Team
                </a>
              </li>
              <li>
                <a href="#architecture" className={styles.navLink}>
                  Architecture
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.navCta}>
            <a href="#system-showcase" className="btn-primary" aria-label="View System Demo">
              Live Demo
            </a>
          </div>
        </header>

        {/* Hero Content (Cascading Load Entrance) */}
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className="badge-pill anim-load-badge">
              <Sparkles size={14} color="#F5A623" />
              <span>AI-Powered Campus Vehicle Access</span>
            </div>

            <h1 className={`${styles.heroTitle} anim-load-title`}>
              Campus Access <br />
              Has Never <span className={styles.heroTitleAccent}>Been</span> <br />
              Smoother
            </h1>

            <p className={`${styles.heroSubtitle} anim-load-subtitle`}>
              Experience seamless university gate clearance powered by real-time
              automated license plate recognition (ALPR), micro-second vehicle
              verification, and cross-platform mobile connectivity.
            </p>

            <div className={`${styles.heroActions} anim-load-actions`}>
              <a href="#system-showcase" className="btn-gold" aria-label="Explore IntelliGate System">
                <span>Explore System</span>
                <ArrowRight size={18} />
              </a>
              <a href="#thesis-spotlight" className="btn-secondary" aria-label="View Thesis Details">
                <span>Download App / Specs</span>
                <Download size={18} />
              </a>
            </div>

            <div className={`${styles.heroThesisLink} anim-load-link`}>
              <span>Learn more about our thesis research and defense documentation</span>
              <ArrowRight size={14} color="#F5A623" />
            </div>
          </div>

          {/* Right Side: Floating Visual Cards (Cashfly-Style Clockwise Stepped Cascade) */}
          <div className={styles.heroVisual}>
            {/* Primary Access Pass Card Wrapper */}
            <div className={`${styles.cardPrimaryWrapper} anim-load-card-wrapper-1`}>
              <div className={`${styles.floatingCardPrimary} animate-float-1`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardChip}>
                    <Car size={18} color="#0D1B7A" />
                  </div>
                  <div className={styles.cardLogoText}>INTELLIGATE PASS</div>
                </div>

                <div className={styles.cardPlateDisplay}>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase" }}>
                      Detected Plate
                    </div>
                    <div className={styles.plateNumber}>NCS 8829</div>
                  </div>
                  <div className={styles.plateBadge}>
                    <CheckCircle size={14} />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className={styles.cardMetaGrid}>
                  <div className={styles.cardMetaItem}>
                    <span className={styles.cardMetaLabel}>Authorized Owner</span>
                    <span className={styles.cardMetaValue}>Dr. Sarah Jenkins</span>
                  </div>
                  <div className={styles.cardMetaItem}>
                    <span className={styles.cardMetaLabel}>Affiliation</span>
                    <span className={styles.cardMetaValue}>Faculty / CCS Dept</span>
                  </div>
                  <div className={styles.cardMetaItem}>
                    <span className={styles.cardMetaLabel}>Access Lane</span>
                    <span className={styles.cardMetaValue}>Gate 01 Inbound</span>
                  </div>
                  <div className={styles.cardMetaItem}>
                    <span className={styles.cardMetaLabel}>Barrier Clearance</span>
                    <span className={styles.cardMetaValue} style={{ color: "#F5A623" }}>
                      &lt; 0.8s Latency
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Floating Monitor Card Wrapper */}
            <div className={`${styles.cardSecondaryWrapper} anim-load-card-wrapper-2`}>
              <div className={`${styles.floatingCardSecondary} animate-float-2`}>
                <div className={styles.cardHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Camera size={18} color="#F5A623" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                      ALPR Vision Feed
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "9999px",
                      background: "rgba(34, 197, 94, 0.15)",
                      color: "#4ADE80",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span className="live-beacon-dot" />
                    <span>LIVE 60 FPS</span>
                  </span>
                </div>

                <div style={{ fontSize: "0.8rem", color: "#CBD5E1", marginBottom: "0.5rem" }}>
                  Vehicle Type: <strong>White Toyota Fortuner (SUV)</strong>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#CBD5E1", marginBottom: "0.75rem" }}>
                  Confidence Score: <strong style={{ color: "#F5A623" }}>99.4% YOLOv11s</strong>
                </div>

                <div
                  style={{
                    height: "6px",
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "99.4%",
                      height: "100%",
                      background: "linear-gradient(90deg, #1A2BA6, #F5A623)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soft, Continuous Gradient Transition at Bottom of Hero */}
        <div className={styles.heroTransitionGradient} />
      </section>

      {/* Thesis Spotlight Section (Scroll Reveal) */}
      <section className={styles.thesisSection} id="thesis-spotlight" aria-label="Thesis Title and Abstract">
        <ScrollReveal direction="up" delay={80} duration={850}>
          <div className={styles.thesisCard}>
            <div className={styles.thesisWatermark}>THESIS</div>

            <div className={styles.thesisTag}>
              <BookOpen size={18} />
              <span>Academic Research & Capstone Defense</span>
            </div>

            <h2 className={styles.thesisTitleText}>
              IntelliGate: An Edge-AI License Plate Recognition and Vehicle Registration Portal for Automated Campus Security
            </h2>

            <p className={styles.thesisSubtitleText}>
              A comprehensive hardware-software study presenting an automated, secure,
              and real-time access management solution designed for modern educational
              institutions. Utilizing cutting-edge edge AI computer vision, IoT microcontrollers,
              and reactive mobile interfaces to eliminate congestion and enhance campus security.
            </p>

            <ScrollReveal direction="up" delay={180} duration={750}>
              <div className={styles.thesisMetaRow}>
                <div className={styles.thesisMetaBlock}>
                  <span className={styles.thesisMetaHeader}>Institution / College</span>
                  <span className={styles.thesisMetaBody}>
                    Dr. Yanga&apos;s Colleges Inc.
                  </span>
                </div>
                <div className={styles.thesisMetaBlock}>
                  <span className={styles.thesisMetaHeader}>Degree & Program</span>
                  <span className={styles.thesisMetaBody}>
                    Bachelor of Science in Computer Engineering (BSCPE 4A)
                  </span>
                </div>
                <div className={styles.thesisMetaBlock}>
                  <span className={styles.thesisMetaHeader}>Academic Year</span>
                  <span className={styles.thesisMetaBody}>A.Y. 2025 - 2026</span>
                </div>
                <div className={styles.thesisMetaBlock}>
                  <span className={styles.thesisMetaHeader}>Defense Status</span>
                  <span className={styles.thesisMetaBody} style={{ color: "#F5A623" }}>
                    Final Capstone Defense Ready
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* App & System Showcase Interactive Section */}
      <ShowcaseTabs />

      {/* 5 Group Members Team Section (Scroll Reveal & Staggered Cards) */}
      <section className={styles.teamSection} id="team-members" aria-label="Research Group Members">
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill">The Authors & Developers</span>
            <h2 className={styles.sectionTitle}>5 Group Members</h2>
            <p className={styles.sectionSubtitle}>
              Meet the BSCPE 4A research proponents behind the IntelliGate edge-AI campus security system.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, index) => (
            <ScrollReveal
              key={member.id}
              direction="up"
              delay={index * 110}
              duration={750}
            >
              <article className={styles.memberCard}>
                <div className={styles.memberAvatarPlaceholder}>
                  <Users size={36} color="#FFFFFF" />
                  <div className={styles.avatarBadge}>0{member.id}</div>
                </div>

                <h3 className={styles.memberName}>{member.name}</h3>

                <div
                  style={{
                    marginTop: "0.85rem",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "9999px",
                    background: "rgba(245, 166, 35, 0.08)",
                    border: "1px solid rgba(245, 166, 35, 0.25)",
                    fontSize: "0.78rem",
                    color: "var(--color-gold-light)",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                  }}
                >
                  BSCPE 4A
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* System Technical Highlights Grid (Staggered Scroll Reveal) */}
      <section className={styles.architectureSection} id="architecture" aria-label="Technical Highlights">
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill">Engineering Foundation</span>
            <h2 className={styles.sectionTitle}>High-Performance Architecture</h2>
            <p className={styles.sectionSubtitle}>
              Engineered with modern protocols to achieve high reliability, robust
              security, and near-zero latency.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.architectureGrid}>
          <ScrollReveal direction="up" delay={0} duration={750}>
            <div className={styles.archCard}>
              <div className={styles.archIcon}>
                <Cpu size={24} />
              </div>
              <h3 className={styles.archTitle}>YOLOv11s Edge Inference</h3>
              <p className={styles.archText}>
                Custom-trained weights optimized for high-speed license plate
                localization with robust detection under harsh glare, shadows, and angle tilts.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} duration={750}>
            <div className={styles.archCard}>
              <div className={styles.archIcon}>
                <Layers size={24} />
              </div>
              <h3 className={styles.archTitle}>Supabase Realtime Sync</h3>
              <p className={styles.archText}>
                Instant bi-directional state synchronization between edge vision servers,
                mobile clients, and the campus administrative surveillance console.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} duration={750}>
            <div className={styles.archCard}>
              <div className={styles.archIcon}>
                <Clock size={24} />
              </div>
              <h3 className={styles.archTitle}>Sub-Second Latency</h3>
              <p className={styles.archText}>
                Optimized end-to-end execution pipeline from camera frame capture to
                servo barrier actuation in less than 850 milliseconds.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerSection} role="contentinfo">
        <div className={styles.footerContainer}>
          <ScrollReveal direction="up" delay={80} duration={800}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <div className={styles.brandLogo}>
                  <div className={styles.brandIconWrapper}>
                    <Shield size={20} />
                  </div>
                  <div className={styles.brandText}>
                    INTELLI<span>GATE</span>
                  </div>
                </div>
                <p className={styles.footerDescription}>
                  An automated smart vehicle access control and license plate
                  recognition thesis research project. Dedicated to elevating campus
                  security and operational efficiency.
                </p>
              </div>

              <div className={styles.footerLinksCol}>
                <span className={styles.footerHeading}>Quick Links</span>
                <a href="#thesis-spotlight" className={styles.navLink}>
                  Thesis Abstract
                </a>
                <a href="#system-showcase" className={styles.navLink}>
                  App Showcase
                </a>
                <a href="#team-members" className={styles.navLink}>
                  5 Group Members
                </a>
                <a href="#architecture" className={styles.navLink}>
                  System Specs
                </a>
              </div>

              <div className={styles.footerLinksCol}>
                <span className={styles.footerHeading}>Technologies</span>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>Flutter (Dart)</span>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>Next.js & TypeScript</span>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>YOLOv11 & PaddleOCR</span>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>ESP32 / Arduino IoT</span>
              </div>

              <div className={styles.footerLinksCol}>
                <span className={styles.footerHeading}>Academic Project</span>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                  Undergraduate Capstone Thesis
                </span>
                <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                  Dr. Yanga&apos;s Colleges Inc.
                </span>
                <span style={{ fontSize: "0.85rem", color: "#F5A623" }}>
                  BSCPE 4A • A.Y. 2025 - 2026
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={160} duration={800}>
            <div className={styles.footerBottom}>
              <p>© {new Date().getFullYear()} IntelliGate Research Team • Dr. Yanga&apos;s Colleges Inc. All rights reserved.</p>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
}
