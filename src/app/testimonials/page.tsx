import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.testimonials, path: "/testimonials/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Testimonials", href: "/testimonials/" },
];

export default function TestimonialsPage() {
  const copy = loadCopy("testimonials");

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <h1>{copy.headline}</h1>
          {copy.subheadline ? <p className={styles.intro}>{copy.subheadline}</p> : null}
          <p className={styles.rating}>5.0 ★ · 9 Google Reviews</p>
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <div className={styles.grid}>
            {copy.reviews.map((review) => (
              <blockquote key={`${review.author}-${review.quote.slice(0, 20)}`} className={`card ${styles.review}`}>
                <p className={styles.meta}>{review.meta}</p>
                <p>&ldquo;{review.quote}&rdquo;</p>
                <footer>— {review.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
