"use client";

import Link from "next/link";
import { useState } from "react";
import { CallButton } from "@/components/CallButton";
import { HomeLink } from "@/components/HomeLink";
import { headerNav, homeServices, projectServices } from "@/lib/navigation";
import styles from "./Header.module.css";

/** Nav menu only — homepage tiles keep priority order (kitchen/bathroom first). */
const homeServicesNav = [...homeServices].sort((a, b) =>
  a.shortTitle.localeCompare(b.shortTitle, "en-AU")
);

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={open ? styles.chevronOpen : undefined}
    >
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className={`${styles.plusIcon} ${open ? styles.plusOpen : ""}`} aria-hidden="true">
      +
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [homeServicesOpen, setHomeServicesOpen] = useState(false);
  const [projectServicesOpen, setProjectServicesOpen] = useState(false);

  const homeMid = Math.ceil(homeServicesNav.length / 2);
  const homeCol1 = homeServicesNav.slice(0, homeMid);
  const homeCol2 = homeServicesNav.slice(homeMid);

  const closeNav = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setHomeServicesOpen(false);
    setProjectServicesOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <HomeLink className={styles.logo} onNavigate={closeNav}>
          <span className={styles.logoText}>
            Nicon
            <br />
            Built
          </span>
          <span className={styles.logoBar} aria-hidden="true" />
        </HomeLink>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="primary-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          {/* Desktop: grouped mega menu */}
          <div
            className={`${styles.dropdown} ${styles.desktopServices}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className={styles.dropdownHead}>
              <Link href="/services/" className={styles.servicesLink} onClick={closeNav}>
                Services
                <ChevronIcon open={servicesOpen} />
              </Link>
            </div>
            <div
              className={`${styles.megaMenu} ${servicesOpen ? styles.megaMenuOpen : ""}`}
              role="region"
              aria-label="Services menu"
            >
              <div className={styles.megaColumn}>
                <p className={styles.megaLabel}>Home Services</p>
                <div className={styles.megaSplit}>
                  <ul className={styles.megaList}>
                    {homeCol1.map((s) => (
                      <li key={s.slug}>
                        <Link href={s.slug} onClick={closeNav}>
                          {s.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className={styles.megaList}>
                    {homeCol2.map((s) => (
                      <li key={s.slug}>
                        <Link href={s.slug} onClick={closeNav}>
                          {s.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.megaColumn}>
                <p className={styles.megaLabel}>Renovations &amp; Builds</p>
                <ul className={styles.megaList}>
                  {projectServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={s.slug} onClick={closeNav}>
                        {s.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/services/" className={styles.megaFooter} onClick={closeNav}>
                View all services →
              </Link>
            </div>
          </div>

          {/* Mobile / tablet: two expandable service groups */}
          <div className={styles.mobileServices}>
            <Link href="/services/" className={styles.mobileServicesOverview} onClick={closeNav}>
              All services
            </Link>

            <div className={styles.mobileAccordion}>
              <button
                type="button"
                className={styles.mobileAccordionHead}
                aria-expanded={homeServicesOpen}
                onClick={() => setHomeServicesOpen(!homeServicesOpen)}
              >
                Home Services
                <PlusIcon open={homeServicesOpen} />
              </button>
              <ul
                className={`${styles.mobileAccordionPanel} ${homeServicesOpen ? styles.mobileAccordionPanelOpen : ""}`}
              >
                {homeServicesNav.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.slug} onClick={closeNav}>
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mobileAccordion}>
              <button
                type="button"
                className={styles.mobileAccordionHead}
                aria-expanded={projectServicesOpen}
                onClick={() => setProjectServicesOpen(!projectServicesOpen)}
              >
                Renovations &amp; Builds
                <PlusIcon open={projectServicesOpen} />
              </button>
              <ul
                className={`${styles.mobileAccordionPanel} ${projectServicesOpen ? styles.mobileAccordionPanelOpen : ""}`}
              >
                {projectServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.slug} onClick={closeNav}>
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {headerNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeNav}>
              {item.label}
            </Link>
          ))}

          <div className={styles.actions}>
            <CallButton className={`btn btn-outline ${styles.callBtn}`} icon label="Click to call" align="end" />
            <Link href="/contact/" className="btn btn-accent" onClick={closeNav}>
              Get a free quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
