import Link from "next/link";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./StickyCallBar.module.css";

/**
 * Mobile-only fixed bar (hidden on desktop via CSS). Plain server component —
 * no state or handlers, just two links — so it adds zero client JS/hydration
 * cost. ~80% of traffic is mobile, and this keeps a call/quote action within
 * thumb's reach no matter how far down a long service page someone scrolls.
 */
export function StickyCallBar() {
  const phone = siteConfig.phone;
  if (!phone) return null;

  return (
    <div className={styles.bar} role="region" aria-label="Quick contact">
      <a href={phoneHref(phone)} className={styles.call}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
        </svg>
        Call {formatPhoneDisplay(phone)}
      </a>
      <Link href="/contact/" className={styles.quote}>
        Get a Free Quote
      </Link>
    </div>
  );
}
