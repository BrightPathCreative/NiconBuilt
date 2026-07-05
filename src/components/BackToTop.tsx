"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./BackToTop.module.css";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const nextProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    setVisible(scrollY > window.innerHeight);
    setProgress(nextProgress);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg className={styles.ring} viewBox="0 0 48 48" aria-hidden="true">
        <circle
          className={styles.track}
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
        />
        <circle
          className={styles.progress}
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <svg
        className={styles.arrow}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          d="M8 12V4M4 8l4-4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
