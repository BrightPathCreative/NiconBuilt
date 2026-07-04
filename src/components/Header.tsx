"use client";

import Link from "next/link";
import { useState } from "react";
import { buildingServices, tradeServices, mainNav } from "@/lib/navigation";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const phone = siteConfig.phone;

  const closeServicesMenu = () => {
    setServicesOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Nicon Built home">
          <span className={styles.logoText}>
            Nicon
            <br />
            Built
          </span>
          <span className={styles.logoBar} aria-hidden="true" />
        </Link>

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

        <nav
          id="primary-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          {mainNav.map((item) =>
            item.label === "Home" ? (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ) : null
          )}

          <div
            className={styles.dropdown}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={styles.dropdownTrigger}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <ul className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownOpen : ""}`}>
              <li>
                <Link href="/services/" onClick={closeServicesMenu}>
                  All Services
                </Link>
              </li>
              <li className={styles.dropdownLabel} aria-hidden="true">
                Building Services
              </li>
              {buildingServices.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug} onClick={closeServicesMenu}>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className={styles.dropdownLabel} aria-hidden="true">
                Trade Services
              </li>
              {tradeServices.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug} onClick={closeServicesMenu}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {mainNav
            .filter((item) => item.label !== "Home")
            .map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}

          <div className={styles.actions}>
            {phone ? (
              <a href={phoneHref(phone)} className={styles.callLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
                </svg>
                {formatPhoneDisplay(phone)}
              </a>
            ) : null}
            <Link href="/contact/" className="btn btn-accent" onClick={() => setMenuOpen(false)}>
              Get a free quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
