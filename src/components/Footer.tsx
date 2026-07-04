import Link from "next/link";
import { buildingServices, tradeServices, footerNav, locationPages } from "@/lib/navigation";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const phone = siteConfig.phone;
  const licence = siteConfig.vbaLicence;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>
            <span className={styles.logoText}>
              Nicon
              <br />
              Built
            </span>
            <span className={styles.logoBar} aria-hidden="true" />
          </div>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <p className={styles.rating}>
            {siteConfig.stats.rating} ★ · Google Reviews
          </p>
        </div>

        <div>
          <h2 className={styles.colTitle}>Building Services</h2>
          <ul className={styles.links}>
            {buildingServices.map((s) => (
              <li key={s.slug}>
                <Link href={s.slug}>{s.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Trade Services</h2>
          <ul className={styles.links}>
            {tradeServices.map((s) => (
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
          <h3 className={styles.subTitle}>Contact</h3>
          <address className={styles.contact}>
            {phone ? (
              <a href={phoneHref(phone)}>{formatPhoneDisplay(phone)}</a>
            ) : null}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span>{siteConfig.address.full}</span>
          </address>
          <h3 className={styles.subTitle}>Service areas</h3>
          <ul className={styles.links}>
            {locationPages.map((loc) => (
              <li key={loc.slug}>
                <Link href={loc.slug}>{loc.suburb}</Link>
              </li>
            ))}
          </ul>
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
      </div>
    </footer>
  );
}
