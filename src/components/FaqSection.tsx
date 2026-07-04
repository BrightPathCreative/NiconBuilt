import type { FaqItem } from "@/lib/copy";
import styles from "./FaqSection.module.css";

export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  return (
    <section className="section section--tone" aria-labelledby="faq-heading">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading">{title}</h2>
        <dl className={styles.list}>
          {faqs.map((faq) => (
            <div key={faq.question} className={styles.item}>
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
