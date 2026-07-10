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
  /** Rendered iframe height in px — should match the height set in the GHL form builder. */
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
  const [iframeSrc, setIframeSrc] = useState(src);
  const hasFired = useRef(false);
  const iframeId = `inline-${formId}`;

  useEffect(() => {
    const tracking = captureTrackingParams();
    const query = new URLSearchParams();
    Object.entries(tracking).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    const queryString = query.toString();
    setIframeSrc(queryString ? `${src}?${queryString}` : src);
  }, [src]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin && !isLikelyGhlOrigin(event.origin)) return;

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
      <div className={styles.frameWrap} style={{ height }}>
        <iframe
          src={iframeSrc}
          className={styles.frame}
          style={{ height }}
          id={iframeId}
          data-layout='{"id":"INLINE"}'
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={formName}
          data-height={String(height)}
          data-layout-iframe-id={iframeId}
          data-form-id={formId}
          title={formName}
        />
      </div>
    </div>
  );
}
