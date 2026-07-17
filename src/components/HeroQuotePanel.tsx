"use client";

import { useEffect, useId, useState } from "react";
import { GhlEmbedForm } from "./GhlEmbedForm";
import { siteConfig } from "@/lib/site";
import styles from "./HeroQuotePanel.module.css";

const BENEFITS = [
  "Free, no-obligation quote",
  "Covering all your home service and maintenance needs",
  `VBA licensed - Fully insured - ${siteConfig.stats.years} years experience`,
] as const;

export function HeroQuotePanel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  // Warm the GHL iframe in the background so "Start my free quote" feels instant.
  // Avoid the HTML `hidden` attribute while preloading — browsers defer iframes inside it.
  useEffect(() => {
    let cancelled = false;
    const warm = () => {
      if (!cancelled) setMounted(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(warm, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  function toggle() {
    setOpen((value) => {
      const next = !value;
      if (next) setMounted(true);
      return next;
    });
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Get a free quote</h2>
      <p className={styles.lead}>Tell us about your project. No obligation.</p>

      <ul className={styles.benefits}>
        {BENEFITS.map((item) => (
          <li key={item}>
            <span className={styles.check} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7.2L5.4 10.1L11.5 3.9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span>{open ? "Hide quote form" : "Start my free quote"}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.5 6L8 10.5L12.5 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={panelId}
        className={`${styles.formSlot} ${open ? styles.formSlotOpen : styles.formSlotPreload}`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        {mounted ? (
          <GhlEmbedForm
            compact
            variant="hero"
            showTitle={false}
            className={styles.embeddedForm}
          />
        ) : null}
      </div>
    </div>
  );
}
