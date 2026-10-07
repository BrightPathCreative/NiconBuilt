"use client";

import {
  siteConfig,
  phoneHref,
  formatPhoneDisplay,
  callCtaLabel,
} from "@/lib/site";
import { useForwardingNumber } from "@/lib/call-conversion";
import styles from "./CallButton.module.css";

type Props = {
  className?: string;
  /** Optional prefix text — the number follows it in the desktop label. */
  prefix?: string;
  /** Set true to show the number on touch devices too, not just desktop. */
  showNumber?: boolean;
  icon?: boolean;
  label?: string;
};

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/**
 * Click-to-call CTA. One tel: link, one click, everywhere.
 * - Mobile / touch: label reads "Click to call" and dials via tel:.
 * - Desktop: label shows the number itself, so visitors whose computer has no
 *   calling app can still read and dial it. Swapped in CSS rather than JS so
 *   there is no hydration mismatch and no flash of the wrong label.
 * - Falls back to /contact/ when no phone is configured.
 * - On the Google Ads landing pages, swaps to Google's forwarding number for
 *   the session when the visitor came from an ad (see lib/call-conversion.ts).
 *
 * Desktop used to open a popover revealing the number, which cost Google Ads a
 * call conversion: the conversion fires on the tel: click, so the first click
 * recorded nothing and only a second click inside the popover counted.
 */
export function CallButton({
  className = "btn btn-outline",
  prefix,
  showNumber = false,
  icon = false,
  label: explicitLabel,
}: Props) {
  const phone = siteConfig.phone;
  const forwarding = useForwardingNumber();

  const display = forwarding?.display ?? (phone ? formatPhoneDisplay(phone) : "");
  const href = forwarding?.href ?? (phone ? phoneHref(phone) : "/contact/");

  const numberLabel = prefix ? `${prefix} ${display}` : display;

  const label =
    explicitLabel ??
    (phone
      ? showNumber
        ? numberLabel
        : (prefix ?? callCtaLabel)
      : (prefix ?? "Call us"));

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

  // Identical labels (showNumber) need only one node.
  const sameLabel = label === numberLabel;

  return (
    <span className={styles.wrap}>
      <a href={href} className={className} style={linkStyle}>
        {icon ? <PhoneIcon /> : null}
        {sameLabel ? (
          label
        ) : (
          <>
            <span className={styles.labelTouch}>{label}</span>
            <span className={styles.labelDesktop}>{numberLabel}</span>
          </>
        )}
      </a>
    </span>
  );
}
