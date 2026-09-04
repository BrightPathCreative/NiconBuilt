import { CallButton } from "@/components/CallButton";
import styles from "./landing.module.css";

/** Anchor target for every "get a quote" action on a landing page. */
export const QUOTE_ANCHOR = "quote";

/**
 * Chrome for Google Ads landing pages.
 *
 * There is no nav and no footer at all — client's call. A visitor who arrived
 * on a paid click has exactly two useful next actions, fill in the form or
 * call, and anything else on the page is a third option that costs money. What
 * remains is the brand mark and those two actions, repeated where they're
 * needed.
 *
 * Note that this leaves no privacy policy link on the page. Google Ads expects
 * one on a page collecting personal data, and so does the Privacy Act — if ads
 * are ever disapproved for it, the fix is a small-print line in the closing CTA
 * band or under the form, not a footer.
 */

export function LandingHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* Intentionally not a link — there is nowhere on this page worth leaving for. */}
        <div className={styles.brand}>
          <span className={styles.brandText}>
            Nicon
            <br />
            Built
          </span>
          <span className={styles.brandBar} aria-hidden="true" />
        </div>

        {/* Both CTAs, no nav. The quote button is hidden on small phones —
            the fixed bottom bar already carries call and quote there, and
            three elements don't fit across a 360px header without cramping. */}
        <div className={styles.headerMeta}>
          <CallButton className="btn btn-outline" icon align="end" />
          <a href={`#${QUOTE_ANCHOR}`} className={`btn btn-accent ${styles.headerQuote}`}>
            Get a free quote
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Mobile-only fixed bar. Same idea as the site's StickyCallBar, except "get a
 * quote" scrolls to the form already on this page instead of sending the
 * visitor to /contact/ and starting again.
 */
export function LandingCallBar() {
  return (
    <div className={styles.callBar} role="region" aria-label="Quick contact">
      <div className={styles.callBarSlot}>
        <CallButton className={styles.callBarCall} icon label="Click to call" />
      </div>
      <a href={`#${QUOTE_ANCHOR}`} className={styles.callBarQuote}>
        Get a Free Quote
      </a>
    </div>
  );
}
