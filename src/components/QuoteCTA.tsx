import Link from "next/link";
import { loadCopy } from "@/lib/copy";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./QuoteCTA.module.css";

export function QuoteCTA() {
  const copy = loadCopy("contact");
  const phone = siteConfig.phone;
  const headlineContent = copy.sections.find((s) => s.title === "Headline")?.content ?? "";
  const introLines = headlineContent
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(1);
  const heading = copy.headline?.split("|")[0].trim() ?? "Get a free quote";
  const body = introLines[0] ?? "No obligation. Nick usually gets back to you the same day.";

  return (
    <section className={styles.cta} aria-labelledby="quote-cta-heading">
      <div className={`container ${styles.inner}`}>
        <h2 id="quote-cta-heading">{heading}</h2>
        <p>{body}</p>
        <div className={styles.actions}>
          <Link href="/contact/" className="btn btn-accent">
            Get a free quote
          </Link>
          {phone ? (
            <a href={phoneHref(phone)} className="btn btn-outline">
              Call {formatPhoneDisplay(phone)}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
