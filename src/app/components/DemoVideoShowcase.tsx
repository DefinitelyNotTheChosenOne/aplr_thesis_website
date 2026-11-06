"use client";

import React, { useRef, useState } from "react";
import styles from "./DemoVideoShowcase.module.css";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Eye,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  timestamp: number;
  timeLabel: string;
  description: string;
  icon: React.ReactNode;
}

const CHAPTERS: Chapter[] = [
  {
    id: "chap-1",
    title: "Mobile Student Pass Login",
    timestamp: 0,
    timeLabel: "00:00",
    description: "Student authentication & active vehicle credentials (Plate LGJ 910 • 4W white).",
    icon: <Smartphone size={16} color="#818cf8" />,
  },
  {
    id: "chap-2",
    title: "Guard Station Telemetry Sync",
    timestamp: 22,
    timeLabel: "00:22",
    description: "Real-time dashboard metrics (Registered: 3 | Inside: 0) & servo barrier override test.",
    icon: <ShieldCheck size={16} color="#4ade80" />,
  },
  {
    id: "chap-3",
    title: "YOLOv11s Detection & Barrier Sweep",
    timestamp: 46,
    timeLabel: "00:46",
    description: "CCTV frames processed at 86.0% confidence, FastAPI returns 200 OK, barrier clears.",
    icon: <Eye size={16} color="#f5a623" />,
  },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function DemoVideoShowcase(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(73);
  const [buffered, setBuffered] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeChapterId, setActiveChapterId] = useState<string>("chap-1");

  // Track playback time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Update active chapter based on timestamp
    if (cur < 22) {
      setActiveChapterId("chap-1");
    } else if (cur < 46) {
      setActiveChapterId("chap-2");
    } else {
      setActiveChapterId("chap-3");
    }

    // Update buffer progress
    if (videoRef.current.buffered.length > 0) {
      const buffEnd = videoRef.current.buffered.end(
        videoRef.current.buffered.length - 1
      );
      setBuffered(buffEnd);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 73);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play interrupted:", err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackRate(nextSpeed);
  };

  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log("Restart playback interrupted:", err));
  };

  const jumpToChapter = (chapter: Chapter) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = chapter.timestamp;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log("Chapter playback interrupted:", err));
    setActiveChapterId(chapter.id);
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!timelineRef.current || !videoRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percentage * (duration || 73);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <section
      className={styles.videoSection}
      id="section-demo-video"
      aria-label="IntelliGate Live System Demonstration Video"
    >
      <div className={styles.bgGlow} aria-hidden="true" />

      {/* Header */}
      <div className={styles.headerWrapper}>
        <div className={styles.badgeLiveDemo}>
          <span className={styles.liveDot} />
          <span>REAL-WORLD TRIAL • SYSTEM DEMONSTRATION</span>
        </div>

        <h2 className={styles.sectionTitle}>
          See IntelliGate <br />
          <span className={styles.titleGradient}>In Live Action</span>
        </h2>

        <p className={styles.sectionSubtitle}>
          Watch our end-to-end edge AI verification test: from mobile student
          vehicle pass authentication to real-time YOLOv11s plate detection and
          instant boom barrier clearance.
        </p>
      </div>

      {/* Grid: Vertical Mobile Player + Companion Telemetry Walkthrough */}
      <div className={styles.showcaseGrid}>
        {/* Left: Mobile Inspection Video Player */}
        <div className={styles.playerChassisWrapper}>
          <div
            ref={containerRef}
            className={styles.playerChassis}
            onClick={togglePlay}
            role="region"
            aria-label="Interactive video player"
          >
            <div className={styles.screenInner}>
              {/* Top Camera Hardware Header Overlay */}
              <div className={styles.videoTopOverlay}>
                <div className={styles.camBadge}>
                  <span className={styles.camBadgeDot} />
                  <span>CAM-01 • IP WEBCAM STREAM</span>
                </div>
                <div className={styles.fpsBadge}>
                  <span>60.5 FPS • 720p</span>
                </div>
              </div>

              {/* The Video Element */}
              <video
                ref={videoRef}
                src="/91eb9641-ab6a-4afe-9856-1d0b517557cd.mp4"
                className={styles.videoElement}
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div className={styles.centerPlayOverlay}>
                  <button
                    type="button"
                    className={styles.centerPlayBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    aria-label="Play video"
                  >
                    <Play size={32} fill="#05060d" color="#05060d" />
                  </button>
                </div>
              )}

              {/* Floating Bottom Custom Player Controls */}
              <div
                className={styles.controlsOverlay}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Timeline Scrubber */}
                <div
                  ref={timelineRef}
                  className={styles.timelineWrapper}
                  onClick={handleScrubberClick}
                  role="slider"
                  aria-label="Video timeline scrubber"
                  aria-valuenow={currentTime}
                  aria-valuemin={0}
                  aria-valuemax={duration}
                >
                  <div className={styles.timelineTrack}>
                    <div
                      className={styles.timelineBuffered}
                      style={{ width: `${bufferedPercent}%` }}
                    />
                    <div
                      className={styles.timelineProgress}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div
                    className={styles.timelineThumb}
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>

                {/* Buttons Row */}
                <div className={styles.controlsRow}>
                  <div className={styles.leftControls}>
                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause size={18} fill="#e2e8f0" />
                      ) : (
                        <Play size={18} fill="#e2e8f0" />
                      )}
                    </button>

                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={restartVideo}
                      aria-label="Restart video"
                    >
                      <RotateCcw size={16} />
                    </button>

                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    <span className={styles.timeDisplay}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className={styles.rightControls}>
                    <button
                      type="button"
                      className={styles.speedBadge}
                      onClick={cycleSpeed}
                      aria-label="Cycle playback speed"
                    >
                      {playbackRate}x
                    </button>

                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={toggleFullscreen}
                      aria-label={
                        isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <Minimize2 size={16} />
                      ) : (
                        <Maximize2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Chapters & System Telemetry */}
        <div className={styles.telemetryColumn}>
          {/* Interactive Chapters Box */}
          <div className={styles.chaptersBox}>
            <div className={styles.chaptersHeader}>
              <div className={styles.chaptersTitle}>
                <Sparkles size={15} color="#f5a623" />
                <span>VIDEO CHAPTER BREAKDOWN</span>
              </div>
              <span className={styles.statusToast}>
                {isPlaying ? "Playing • Click to pause" : "Paused • Click to resume"}
              </span>
            </div>

            <div className={styles.chaptersList}>
              {CHAPTERS.map((chap) => {
                const isActive = activeChapterId === chap.id;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    className={`${styles.chapterItem} ${
                      isActive ? styles.chapterItemActive : ""
                    }`}
                    onClick={() => jumpToChapter(chap)}
                  >
                    <span className={styles.chapterTimePill}>
                      {chap.timeLabel}
                    </span>
                    <div className={styles.chapterDetails}>
                      <h4>{chap.title}</h4>
                      <p>{chap.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>VERIFICATION SPEED</span>
              <span className={`${styles.metricValue} ${styles.metricValueGold}`}>
                &lt; 800 ms
              </span>
              <span className={styles.metricSub}>CCTV frame to servo sweep</span>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>YOLOv11s CONFIDENCE</span>
              <span className={`${styles.metricValue} ${styles.metricValueGreen}`}>
                86.0 %
              </span>
              <span className={styles.metricSub}>Philippine plate model</span>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>BACKEND TELEMETRY</span>
              <span className={styles.metricValue}>FastAPI</span>
              <span className={styles.metricSub}>WebSocket real-time relay</span>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>BARRIER CONTROLLER</span>
              <span className={styles.metricValue}>ESP32</span>
              <span className={styles.metricSub}>MG996R servo + RF override</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoVideoShowcase;
