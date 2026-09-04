import Image from "next/image";
import { CallButton } from "@/components/CallButton";
import { FaqSection } from "@/components/FaqSection";
import { GhlEmbedForm } from "@/components/GhlEmbedForm";
import { ServiceMarqueeCarousel } from "@/components/ServiceMarquee";
import { formatReviewMeta } from "@/lib/copy";
import type { ResolvedLandingPage } from "@/lib/landing-pages";
import { siteConfig } from "@/lib/site";
import { QUOTE_ANCHOR } from "./LandingChrome";
import styles from "./landing.module.css";

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 7.2L5.4 10.1L11.5 3.9" />
    </svg>
  );
}

/**
 * One Google Ads landing page, rendered from a `landing-pages.ts` config.
 *
 * Section order is the conversion path, not the site's editorial order:
 * offer and form → proof → how it works → scope → recent work → reviews →
 * objection handling → one last ask. The form sits in the hero rather than
 * behind a toggle (as it does on the site's own heroes) because paid traffic
 * shouldn't have to click to find out there's a form at all.
 */
export function LandingPage({ page }: { page: ResolvedLandingPage }) {
  const { slides } = page;
  const approachImage = slides[1] ?? slides[0];
  const includedImage = slides[2] ?? slides[0];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={page.heroImage}
            alt={page.heroImageAlt}
            fill
            priority
            quality={72}
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <p className="eyebrow eyebrow--dark">{page.campaign} · Melbourne</p>
            <h1>{page.headline}</h1>
            <p className={styles.heroSub}>{page.subheadline}</p>
            <ul className={styles.heroChips}>
              <li>{siteConfig.stats.years} years</li>
              <li>VBA licensed</li>
              <li>Fully insured</li>
              <li>
                {siteConfig.stats.rating}★ Google ({siteConfig.stats.reviewCount})
              </li>
            </ul>
            <div className={styles.heroCtas}>
              <a href={`#${QUOTE_ANCHOR}`} className="btn btn-accent">
                Get my free quote
              </a>
              <CallButton className={`btn btn-outline ${styles.onDark}`} />
            </div>
          </div>

          <div className={styles.panel} id={QUOTE_ANCHOR}>
            <h2 className={styles.panelTitle}>Get a free quote</h2>
            <p className={styles.panelLead}>
              Tell us about the job. No obligation, and we usually get back to you the
              same day.
            </p>
            <ul className={styles.panelBenefits}>
              {page.heroBenefits.map((benefit) => (
                <li key={benefit}>
                  <span className={styles.check} aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <GhlEmbedForm
              compact
              variant="hero"
              showTitle={false}
              className={styles.panelForm}
            />
          </div>
        </div>
      </section>

      <div className={styles.trustBar}>
        <div className={`container ${styles.trustInner}`}>
          <div className={styles.trustItem}>
            <span className={styles.trustValue}>{siteConfig.stats.years}</span>
            <span className={styles.trustLabel}>Years experience</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustValue}>{siteConfig.stats.rating}★</span>
            <span className={styles.trustLabel}>Google rating</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustValue}>{siteConfig.stats.projects}</span>
            <span className={styles.trustLabel}>Projects completed</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustValue}>VBA</span>
            <span className={styles.trustLabel}>Licensed &amp; insured</span>
          </div>
        </div>
      </div>

      {page.leadParagraph || page.paragraphs.length ? (
        <section className="section section--surface">
          <div className={`container ${styles.approachGrid}`}>
            <div>
              <p className="eyebrow">Our approach</p>
              <h2>{page.approachTitle}</h2>
              {page.leadParagraph ? (
                <p className={styles.leadParagraph}>{page.leadParagraph}</p>
              ) : null}
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            {approachImage ? (
              <div className={styles.approachImage}>
                <Image
                  src={approachImage.src}
                  alt={approachImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.approachImageEl}
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2>Three steps, one point of contact</h2>
          <div className={styles.steps}>
            {page.steps.map((step, index) => (
              <div key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.resolvedBullets.length ? (
        <section className="section section--tone">
          <div className={`container ${styles.includedGrid}`}>
            {includedImage ? (
              <div className={styles.includedImage}>
                <Image
                  src={includedImage.src}
                  alt={includedImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.includedImageEl}
                />
              </div>
            ) : null}
            <div>
              <h2>{page.bulletsTitle}</h2>
              <ul className={styles.bulletList}>
                {page.resolvedBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {slides.length > 1 ? (
        <ServiceMarqueeCarousel slides={slides} label={`${page.campaign} project work`} />
      ) : null}

      {page.reviews.length ? (
        <section className="section section--surface">
          <div className="container">
            <div className={styles.reviewsHead}>
              <div>
                <p className="eyebrow">Reviews</p>
                <h2>What clients say</h2>
              </div>
              <p className={styles.reviewsRating}>
                {siteConfig.stats.rating}★ from {siteConfig.stats.reviewCount} Google
                reviews
              </p>
            </div>
            <div className={styles.reviewGrid}>
              {page.reviews.map((review) => (
                <blockquote key={review.author} className={styles.review}>
                  <p className={styles.reviewStars}>{formatReviewMeta(review.meta)}</p>
                  <p className={styles.reviewQuote}>&ldquo;{review.quote}&rdquo;</p>
                  <footer className={styles.reviewAuthor}>{review.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.faqs.length ? <FaqSection faqs={page.faqs} /> : null}

      <section className={styles.closing}>
        <div className="container">
          <h2>{page.closingTitle}</h2>
          <p className={styles.closingBody}>{page.closingBody}</p>
          <div className={styles.closingActions}>
            <a href={`#${QUOTE_ANCHOR}`} className="btn btn-accent">
              Get my free quote
            </a>
            <CallButton className={`btn btn-outline ${styles.onDark}`} />
          </div>
          {/* Not a footer — the client asked for none. This is the legal minimum
              a page collecting personal data needs: who is collecting it, and a
              reachable privacy policy. New tab, so it doesn't cost the lead. */}
          <p className={styles.legal}>
            {siteConfig.legalName} · ABN {siteConfig.abn}
            {siteConfig.vbaLicence ? ` · VBA Licence ${siteConfig.vbaLicence}` : ""} ·{" "}
            <a href="/privacy-policy/" target="_blank" rel="noopener">
              Privacy Policy
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
