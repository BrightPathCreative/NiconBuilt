"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { captureTrackingParams } from "@/lib/tracking";
import styles from "./GhlEmbedForm.module.css";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = {
  /** GHL form ID (data-form-id). Defaults to the site-wide "Contact Us" form. */
  formId?: string;
  /** Full iframe src for the GHL form widget. Defaults to the site-wide "Contact Us" form. */
  src?: string;
  /** Starting iframe height in px — GHL may resize via postMessage after load. */
  height?: number;
  formName?: string;
  compact?: boolean;
  showTitle?: boolean;
  title?: string;
  /** Optional line under the title (e.g. privacy note). */
  subtitle?: ReactNode;
  className?: string;
  /**
   * Path to send visitors to after a detected submission (fires after GA4 event).
   * Set to `false` to leave visitors on the GHL form's own confirmation state.
   */
  redirectOnSubmit?: string | false;
};

function isLikelyGhlOrigin(origin: string) {
  return (
    origin.includes("brightpathcreative.com.au") ||
    origin.includes("gohighlevel.com") ||
    origin.includes("msgsndr.com") ||
    origin.includes("leadconnectorhq.com")
  );
}

/** Best-effort detection of GHL's form-submitted postMessage payload.
 * GHL doesn't publicly document a single stable shape, so this checks the
 * handful of formats seen in the wild. Verify against a real submission
 * (browser console → Network/Messages) after go-live and adjust if needed. */
function extractSubmittedFormId(data: unknown): string | null | undefined {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const record = data as Record<string, unknown>;
    const type = String(record.type ?? "").toLowerCase();
    if (type.includes("submit")) {
      return typeof record.formId === "string" ? record.formId : null;
    }
    return undefined;
  }

  if (Array.isArray(data)) {
    if (data[0] === "msgsndr-booking-complete") return null;
    const payload = data[2];
    if (
      typeof payload === "string" &&
      payload.includes("email") &&
      (payload.includes("full_name") || payload.includes("customer_id"))
    ) {
      return null;
    }
  }

  return undefined;
}

/** Pull a height value from common GHL / LeadConnector resize messages. */
function extractResizeHeight(data: unknown): number | null {
  if (typeof data === "number" && data > 100 && data < 5000) return Math.ceil(data);

  if (typeof data === "string") {
    const asNumber = Number(data);
    if (Number.isFinite(asNumber) && asNumber > 100 && asNumber < 5000) {
      return Math.ceil(asNumber);
    }
  }

  if (Array.isArray(data)) {
    for (const item of data) {
      const nested = extractResizeHeight(item);
      if (nested) return nested;
    }
    return null;
  }

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const type = String(record.type ?? record.event ?? record.action ?? "").toLowerCase();
    const looksLikeResize =
      !type ||
      type.includes("height") ||
      type.includes("resize") ||
      type.includes("frame");

    if (looksLikeResize) {
      for (const key of ["height", "scrollHeight", "offsetHeight", "value", "h"]) {
        const nested = extractResizeHeight(record[key]);
        if (nested) return nested;
      }
    }
  }

  return null;
}

function buildIframeSrc(src: string) {
  const tracking = captureTrackingParams();
  const query = new URLSearchParams();
  Object.entries(tracking).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const queryString = query.toString();
  return queryString ? `${src}?${queryString}` : src;
}

export function GhlEmbedForm({
  formId = siteConfig.ghlContactForm.id,
  src = siteConfig.ghlContactForm.src,
  height = siteConfig.ghlContactForm.height,
  formName = siteConfig.ghlContactForm.name,
  compact = false,
  showTitle = true,
  title = "Get in Touch",
  subtitle,
  className,
  redirectOnSubmit = "/thank-you/",
}: Props) {
  const router = useRouter();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [frameHeight, setFrameHeight] = useState(height);
  const [loaded, setLoaded] = useState(false);
  const hasFired = useRef(false);
  const iframeId = `inline-${formId}`;

  useEffect(() => {
    setIframeSrc(buildIframeSrc(src));
    setLoaded(false);
    setFrameHeight(height);
  }, [src, height]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin && !isLikelyGhlOrigin(event.origin)) return;

      const nextHeight = extractResizeHeight(event.data);
      if (nextHeight) {
        setFrameHeight((current) =>
          Math.abs(nextHeight - current) > 8 ? nextHeight : current
        );
      }

      const submittedFormId = extractSubmittedFormId(event.data);
      if (submittedFormId === undefined) return;
      if (submittedFormId && submittedFormId !== formId) return;
      if (hasFired.current) return;
      hasFired.current = true;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "ghl_form_submit",
        formId,
        formName,
        page: window.location.pathname,
      });

      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_id: formId,
          form_name: formName,
        });
      }

      if (redirectOnSubmit) {
        window.setTimeout(() => router.push(redirectOnSubmit), 800);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formId, formName, redirectOnSubmit, router]);

  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""} ${className ?? ""}`}>
      <Script
        src={siteConfig.ghlContactForm.embedScriptSrc}
        strategy="afterInteractive"
        id="ghl-form-embed-script"
      />
      {showTitle ? <h2 className={styles.title}>{title}</h2> : null}
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      <div className={styles.frameWrap} style={{ minHeight: frameHeight }}>
        {!loaded ? (
          <div className={styles.loading} aria-hidden="true">
            <span className={styles.loadingBar} />
            <span className={styles.loadingBar} />
            <span className={styles.loadingBar} />
            <span className={styles.loadingBarShort} />
          </div>
        ) : null}
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            className={`${styles.frame} ${loaded ? styles.frameVisible : ""}`}
            style={{ height: frameHeight }}
            id={iframeId}
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name={formName}
            data-height={String(frameHeight)}
            data-layout-iframe-id={iframeId}
            data-form-id={formId}
            title={formName}
            onLoad={() => setLoaded(true)}
          />
        ) : null}
      </div>
    </div>
  );
}
