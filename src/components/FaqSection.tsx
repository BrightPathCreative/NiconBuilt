import type { FaqItem } from "@/lib/copy";
import styles from "./FaqSection.module.css";

export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  return (
    <section className="section section--tone" aria-labelledby="faq-heading">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading">{title}</h2>
        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <details key={faq.question} className={styles.item} open={index === 0}>
              <summary className={styles.question}>
                <span>{faq.question}</span>
                <svg
                  className={styles.chevron}
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
