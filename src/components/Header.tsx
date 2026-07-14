"use client";

import Link from "next/link";
import { useState } from "react";
import { CallButton } from "@/components/CallButton";
import { HomeLink } from "@/components/HomeLink";
import { headerNav, services } from "@/lib/navigation";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeServicesMenu = () => {
    setServicesOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <HomeLink className={styles.logo} onNavigate={() => setMenuOpen(false)}>
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
          <div
            className={styles.dropdown}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className={styles.dropdownHead}>
              <Link
                href="/services/"
                className={styles.servicesLink}
                onClick={() => setMenuOpen(false)}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
              <button
                type="button"
                className={styles.dropdownToggle}
                aria-expanded={servicesOpen}
                aria-label={servicesOpen ? "Hide services menu" : "Show services menu"}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <ul className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownOpen : ""}`}>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug} onClick={closeServicesMenu}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {headerNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}

          <div className={styles.actions}>
            <CallButton className={`btn btn-outline ${styles.callBtn}`} icon label="Click to call" />
            <Link href="/contact/" className="btn btn-accent" onClick={() => setMenuOpen(false)}>
              Get a free quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
