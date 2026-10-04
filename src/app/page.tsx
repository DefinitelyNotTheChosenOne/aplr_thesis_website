import React from "react";
import styles from "./page.module.css";
import ShowcaseTabs from "./components/ShowcaseTabs";
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
  role: string;
  department: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "[Member 1: Full Name]",
    role: "Lead Researcher / Project Lead",
    department: "Computer Studies & Engineering",
    bio: "System architecture design, thesis documentation lead, and end-to-end integration coordinator.",
  },
  {
    id: 2,
    name: "[Member 2: Full Name]",
    role: "AI & Computer Vision Engineer",
    department: "Computer Studies & Engineering",
    bio: "Dataset annotation, YOLOv11s model training, and PaddleOCR pipeline optimization for Philippine vehicle plates.",
  },
  {
    id: 3,
    name: "[Member 3: Full Name]",
    role: "Mobile App Developer (Flutter)",
    department: "Computer Studies & Engineering",
    bio: "Flutter UI/UX engineering for User & Admin apps, state management, and real-time push alerts.",
  },
  {
    id: 4,
    name: "[Member 4: Full Name]",
    role: "IoT & Hardware Systems Engineer",
    department: "Computer Studies & Engineering",
    bio: "Microcontroller circuit design, barrier servo motor integration, and proximity sensor safety fail-safes.",
  },
  {
    id: 5,
    name: "[Member 5: Full Name]",
    role: "Backend & Database Architect",
    department: "Computer Studies & Engineering",
    bio: "Supabase database schema, REST API backend, secure role-based access control, and telemetry logging.",
  },
];

export default function Home(): React.JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "IntelliGate - Smart Campus Access Control System",
    description:
      "Automated License Plate and Vehicle Recognition System for Smart Campus Access Control with real-time YOLOv11s AI detection and automated barrier mechanisms.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Android, iOS, Web",
    author: {
      "@type": "Organization",
      name: "IntelliGate Thesis Research Team",
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
        <div className={styles.ambientOrb1} />
        <div className={styles.ambientRing} />
        <div className={styles.ambientRing2} />

        {/* Top Floating Glass Navigation Bar */}
        <header className={styles.navbar}>
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

        {/* Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className="badge-pill">
              <Sparkles size={14} color="#F5A623" />
              <span>AI-Powered Campus Vehicle Access</span>
            </div>

            <h1 className={styles.heroTitle}>
              Campus Access <br />
              Has Never <span className={styles.heroTitleAccent}>Been</span> <br />
              Smoother
            </h1>

            <p className={styles.heroSubtitle}>
              Experience seamless university gate clearance powered by real-time
              automated license plate recognition (ALPR), micro-second vehicle
              verification, and cross-platform mobile connectivity.
            </p>

            <div className={styles.heroActions}>
              <a href="#system-showcase" className="btn-gold" aria-label="Explore IntelliGate System">
                <span>Explore System</span>
                <ArrowRight size={18} />
              </a>
              <a href="#thesis-spotlight" className="btn-secondary" aria-label="View Thesis Details">
                <span>Download App / Specs</span>
                <Download size={18} />
              </a>
            </div>

            <div className={styles.heroThesisLink}>
              <span>Learn more about our thesis research and defense documentation</span>
              <ArrowRight size={14} color="#F5A623" />
            </div>
          </div>

          {/* Right Side: Floating Visual Cards with Glassmorphism */}
          <div className={styles.heroVisual}>
            {/* Primary Access Pass Card */}
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

            {/* Secondary Floating Monitor Card */}
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
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    background: "rgba(34, 197, 94, 0.15)",
                    color: "#4ADE80",
                    fontWeight: 700,
                  }}
                >
                  LIVE 60 FPS
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

        {/* Soft, Continuous Gradient Transition at Bottom of Hero */}
        <div className={styles.heroTransitionGradient} />
      </section>

      {/* Thesis Spotlight Section */}
      <section className={styles.thesisSection} id="thesis-spotlight" aria-label="Thesis Title and Abstract">
        <div className={styles.thesisCard}>
          <div className={styles.thesisWatermark}>THESIS</div>

          <div className={styles.thesisTag}>
            <BookOpen size={18} />
            <span>Academic Research & Capstone Defense</span>
          </div>

          <h2 className={styles.thesisTitleText}>
            [THESIS TITLE PLACEHOLDER: &quot;INTELLIGATE: AI-Powered Automated License Plate and Vehicle Recognition System for Smart Campus Access Control&quot;]
          </h2>

          <p className={styles.thesisSubtitleText}>
            A comprehensive hardware-software study presenting an automated, secure,
            and real-time access management solution designed for modern educational
            institutions. Utilizing cutting-edge edge AI computer vision, IoT microcontrollers,
            and reactive mobile interfaces to eliminate congestion and enhance campus security.
          </p>

          <div className={styles.thesisMetaRow}>
            <div className={styles.thesisMetaBlock}>
              <span className={styles.thesisMetaHeader}>Institution / University</span>
              <span className={styles.thesisMetaBody}>
                [University / College Name Placeholder]
              </span>
            </div>
            <div className={styles.thesisMetaBlock}>
              <span className={styles.thesisMetaHeader}>Degree & Department</span>
              <span className={styles.thesisMetaBody}>
                Bachelor of Science in Information Technology / Computer Science
              </span>
            </div>
            <div className={styles.thesisMetaBlock}>
              <span className={styles.thesisMetaHeader}>Thesis Adviser</span>
              <span className={styles.thesisMetaBody}>[Adviser Name, Degree Title Placeholder]</span>
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
        </div>
      </section>

      {/* App & System Showcase Interactive Section */}
      <ShowcaseTabs />

      {/* 5 Group Members Team Section */}
      <section className={styles.teamSection} id="team-members" aria-label="Research Group Members">
        <div className={styles.sectionHeader}>
          <span className="badge-pill">The Authors & Developers</span>
          <h2 className={styles.sectionTitle}>5 Group Members</h2>
          <p className={styles.sectionSubtitle}>
            Meet the multidisciplinary research and development group behind
            the IntelliGate smart campus access system.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <article key={member.id} className={styles.memberCard}>
              <div className={styles.memberAvatarPlaceholder}>
                <Users size={38} color="#FFFFFF" />
                <div className={styles.avatarBadge}>0{member.id}</div>
              </div>

              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>

              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                  width: "100%",
                }}
              >
                {member.department}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* System Technical Highlights Grid */}
      <section className={styles.architectureSection} id="architecture" aria-label="Technical Highlights">
        <div className={styles.sectionHeader}>
          <span className="badge-pill">Engineering Foundation</span>
          <h2 className={styles.sectionTitle}>High-Performance Architecture</h2>
          <p className={styles.sectionSubtitle}>
            Engineered with modern protocols to achieve high reliability, robust
            security, and near-zero latency.
          </p>
        </div>

        <div className={styles.architectureGrid}>
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
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerSection} role="contentinfo">
        <div className={styles.footerContainer}>
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
                College of Computer Studies
              </span>
              <span style={{ fontSize: "0.85rem", color: "#F5A623" }}>
                A.Y. 2025 - 2026
              </span>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} IntelliGate Research Team. All rights reserved.</p>
            <p>Built with Next.js, Royal Blue & Gold Palette</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
