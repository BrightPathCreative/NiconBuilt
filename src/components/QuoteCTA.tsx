import Link from "next/link";
import { CallButton } from "@/components/CallButton";
import { loadCopy } from "@/lib/copy";
import styles from "./QuoteCTA.module.css";

export function QuoteCTA() {
  const copy = loadCopy("contact");
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
          <CallButton className={`btn btn-outline ${styles.callOnDark}`} />
        </div>
      </div>
    </section>
  );
}
