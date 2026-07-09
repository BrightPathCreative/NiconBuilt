import Link from "next/link";
import { CallButton } from "@/components/CallButton";
import { homeServices, projectServices, footerNav, locationPages } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const licence = siteConfig.vbaLicence;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brandLink} aria-label="Nicon Built home">
            <span className={styles.logoText}>
              Nicon
              <br />
              Built
            </span>
            <span className={styles.logoBar} aria-hidden="true" />
          </Link>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <p className={styles.rating}>
            {siteConfig.stats.rating} ★ · Google Reviews
          </p>
        </div>

        <div>
          <h2 className={styles.colTitle}>Home Services</h2>
          <ul className={`${styles.links} ${styles.linksSplit}`}>
            {homeServices.map((s) => (
              <li key={s.slug}>
                <Link href={s.slug}>{s.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Renovations &amp; Builds</h2>
          <ul className={styles.links}>
            {projectServices.map((s) => (
              <li key={s.slug}>
                <Link href={s.slug}>{s.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Company</h2>
          <ul className={styles.links}>
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Service areas</h2>
          <ul className={styles.links}>
            {locationPages.map((loc) => (
              <li key={loc.slug}>
                <Link href={loc.slug}>{loc.suburb}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.ctaGroup}>
            <Link href="/contact/" className={`btn btn-accent ${styles.cta}`}>
              Get a free quote
            </Link>
            <CallButton className={styles.callLink} />
          </div>
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
        <p>
          © {new Date().getFullYear()} {siteConfig.legalName}. ABN {siteConfig.abn}.
          {licence ? ` VBA Licence ${licence}.` : " VBA licensed builder."}
        </p>
        <p className={styles.affiliations}>
          MBAV · AIB · HIA · Building Ethics Australia
        </p>
        <p className={styles.credit}>
          Website by{" "}
          <a
            href="https://brightpathcreative.com.au"
            target="_blank"
            rel="noopener"
          >
            Bright Path Creative
          </a>
        </p>
      </div>
    </footer>
  );
}
