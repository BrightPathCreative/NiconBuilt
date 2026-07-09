import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy, formatReviewMeta } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema, reviewsPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.testimonials, path: "/testimonials/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Testimonials", href: "/testimonials/" },
];

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

export default function TestimonialsPage() {
  const copy = loadCopy("testimonials");
  const [featured, ...rest] = copy.reviews;
  const structuredReviews = copy.reviews.map((review) => ({
    author: review.author,
    quote: review.quote,
  }));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), reviewsPageSchema(structuredReviews)]} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className="eyebrow eyebrow--dark">Client reviews</p>
            <h1>{copy.headline}</h1>
            {copy.subheadline ? <p className={styles.intro}>{copy.subheadline}</p> : null}
            <div className={styles.ratingBadge}>
              <Stars />
              <span className={styles.ratingValue}>{siteConfig.stats.rating}</span>
              <span className={styles.ratingDivider} aria-hidden="true" />
              <span className={styles.ratingLabel}>Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="section section--surface">
          <div className="container">
            <blockquote className={styles.featured}>
              <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
              <p className={styles.featuredQuote}>{featured.quote}</p>
              <footer className={styles.featuredFooter}>
                <span className={styles.featuredAuthor}>{featured.author}</span>
                <span className={styles.featuredMeta}>{formatReviewMeta(featured.meta)}</span>
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <p className="eyebrow">What clients say</p>
          <h2>More reviews from Nicon Built clients</h2>
          <div className={styles.grid}>
            {rest.map((review) => (
              <blockquote
                key={`${review.author}-${review.quote.slice(0, 20)}`}
                className={`card ${styles.review}`}
              >
                <Stars />
                <p className={styles.quote}>&ldquo;{review.quote}&rdquo;</p>
                <footer className={styles.reviewFooter}>
                  <span className={styles.author}>{review.author}</span>
                  <span className={styles.meta}>{formatReviewMeta(review.meta)}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
