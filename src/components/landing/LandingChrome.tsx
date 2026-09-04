import { CallButton } from "@/components/CallButton";
import { siteConfig } from "@/lib/site";
import styles from "./landing.module.css";

/** Anchor target for every "get a quote" action on a landing page. */
export const QUOTE_ANCHOR = "quote";

/**
 * Chrome for Google Ads landing pages.
 *
 * The site header and footer are deliberately absent. A visitor who arrived on
 * a paid click has exactly two useful next actions — fill in the form or call —
 * and every nav link, service tile and footer column is a third option that
 * costs money. What stays is the brand mark, the phone number, and the legal
 * disclosures Google Ads expects to find: who you are, and a reachable privacy
 * policy.
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

        <div className={styles.headerMeta}>
          <p className={styles.headerTrust}>
            VBA Licensed Builder · {siteConfig.stats.years} Years · Fully Insured
          </p>
          <CallButton className="btn btn-primary" icon align="end" />
        </div>
      </div>
    </header>
  );
}

export function LandingFooter() {
  const licence = siteConfig.vbaLicence;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <p>
          © {new Date().getFullYear()} {siteConfig.legalName}. ABN {siteConfig.abn}.
          {licence ? ` VBA Licence ${licence}.` : " VBA licensed builder."}{" "}
          {siteConfig.address.full}.
        </p>
        {/* The only outbound links on the page. Google Ads requires the privacy
            policy to be reachable; opening it in a new tab keeps the lead here. */}
        <ul className={styles.footerLinks}>
          <li>
            <a href="/privacy-policy/" target="_blank" rel="noopener">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/cookie-policy/" target="_blank" rel="noopener">
              Cookie Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
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
