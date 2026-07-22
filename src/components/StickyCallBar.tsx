import Link from "next/link";
import { CallButton } from "@/components/CallButton";
import styles from "./StickyCallBar.module.css";

/**
 * Mobile-only fixed bar (hidden on desktop via CSS). Plain server component —
 * no state or handlers, just two links — so it adds zero client JS/hydration
 * cost. ~80% of traffic is mobile, and this keeps a call/quote action within
 * thumb's reach no matter how far down a long service page someone scrolls.
 */
export function StickyCallBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Quick contact">
      <div className={styles.callSlot}>
        <CallButton className={styles.call} icon label="Click to call" />
      </div>
      <Link href="/contact/" className={styles.quote}>
        Get a Free Quote
      </Link>
    </div>
  );
}
