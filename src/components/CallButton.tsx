"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  siteConfig,
  phoneHref,
  formatPhoneDisplay,
  normalizePhoneDigits,
  callCtaLabel,
} from "@/lib/site";
import styles from "./CallButton.module.css";

type Props = {
  className?: string;
  /** Optional prefix text — number is never appended to the label. */
  prefix?: string;
  /** Only set true if you explicitly need the number visible in the button label. */
  showNumber?: boolean;
  icon?: boolean;
  label?: string;
  /** Popover alignment when revealed on desktop. */
  align?: "center" | "end";
};

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** True for mouse/trackpad desktops — these get the OS “pick an app for tel:” dialog. */
function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Click-to-call CTA.
 * - Mobile / touch: dials via tel: (opens the phone app).
 * - Desktop: reveals the number in a popover so the user can tap-to-call or copy,
 *   instead of immediately triggering the OS tel: handler (Windows app picker, etc.).
 * - Falls back to /contact/ when no phone is configured.
 */
export function CallButton({
  className = "btn btn-outline",
  prefix,
  showNumber = false,
  icon = false,
  label: explicitLabel,
  align = "center",
}: Props) {
  const phone = siteConfig.phone;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  const display = phone ? formatPhoneDisplay(phone) : "";
  const href = phone ? phoneHref(phone) : "/contact/";

  const label =
    explicitLabel ??
    (phone
      ? showNumber
        ? prefix
          ? `${prefix} ${display}`
          : display
        : (prefix ?? callCtaLabel)
      : (prefix ?? "Call us"));

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!phone) return;
    // Phones / tablets: let the tel: link open the dialer.
    if (!isDesktopPointer()) return;
    event.preventDefault();
    setOpen((value) => !value);
  }

  async function copyNumber() {
    if (!phone) return;
    const value = normalizePhoneDigits(phone) || display;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard can fail without permission — number is still clickable above.
    }
  }

  const linkStyle = icon
    ? ({ display: "inline-flex", alignItems: "center", gap: "7px" } as const)
    : undefined;

  if (!phone) {
    return (
      <a href="/contact/" className={className} style={linkStyle}>
        {icon ? <PhoneIcon /> : null}
        {label}
      </a>
    );
  }

  return (
    <span
      ref={rootRef}
      className={styles.wrap}
      data-align={align}
      data-open={open || undefined}
    >
      <a
        href={href}
        className={className}
        style={linkStyle}
        onClick={handleClick}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-haspopup="dialog"
      >
        {icon ? <PhoneIcon /> : null}
        {label}
      </a>

      {open ? (
        <div
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-label="Phone number"
        >
          <p className={styles.hint}>Call us on</p>
          <a href={href} className={styles.number}>
            {display}
          </a>
          <button type="button" className={styles.copy} onClick={copyNumber}>
            {copied ? "Copied" : "Copy number"}
          </button>
        </div>
      ) : null}
    </span>
  );
}
