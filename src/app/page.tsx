import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { QuoteCTA } from "@/components/QuoteCTA";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import {
  loadCopy,
  serviceTileSlugs,
  serviceImageKeys,
  formatReviewMeta,
} from "@/lib/copy";
import { images } from "@/lib/images";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  ...pageMeta.home,
  path: "/",
});

export default function HomePage() {
  const copy = loadCopy("home");
  const phone = siteConfig.phone;
  const heroParagraphs = copy.sections
    .find((s) => s.title === "Hero")
    ?.content.split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("**H1:**") && !l.startsWith("*")) ?? [];

  const aboutParagraphs = copy.sections
    .find((s) => s.title === "About snapshot")
    ?.content.split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean) ?? [];

  return (
    <>
      <link rel="preload" as="image" href={images.homeHero} />

      <Hero
        eyebrow="Building Quality, Maintaining Excellence"
        title={copy.headline ?? ""}
        description={heroParagraphs}
        image={images.homeHero}
        imageAlt="Home services and renovations in Melbourne by Nicon Built"
        showForm
        priority
      />

      <StatsStrip />

      <section className="section section--surface">
        <div className="container">
          <h2>{copy.tagline}</h2>
          <div className={styles.aboutGrid}>
            <div className="prose">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className={styles.portrait}>
              <Image
                src={images.nickPortrait}
                alt="Nick Kafkalas, founder of Nicon Built"
                width={400}
                height={500}
              />
            </div>
          </div>
          <div className={styles.inlineCta}>
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

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Our services</h2>
            </div>
            <Link href="/services/" className={styles.viewAll}>
              View all services →
            </Link>
          </div>
          <div className={styles.serviceGrid}>
            {copy.serviceTiles.map((tile, i) => {
              const slug = serviceTileSlugs[tile.title];
              const imageKey = serviceImageKeys[i];
              return (
                <Link
                  key={tile.title}
                  href={slug}
                  className={`card ${styles.serviceCard}`}
                >
                  <div className={styles.serviceImage}>
                    <Image
                      src={images[imageKey]}
                      alt={`${tile.title} Melbourne by Nicon Built`}
                      width={400}
                      height={132}
                    />
                  </div>
                  <div className={styles.serviceBody}>
                    <h3>{tile.title}</h3>
                    <p>{tile.description}</p>
                    {tile.sub ? <p className={styles.serviceSub}>{tile.sub}</p> : null}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.inlineCta}>
            <Link href="/contact/" className="btn btn-accent">
              Request a quote
            </Link>
            <Link href="/services/" className="btn btn-outline">
              Browse all services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <h2>Top Google reviews</h2>
          <div className={styles.reviewGrid}>
            {copy.reviews.map((review) => (
              <blockquote key={review.author} className={`card ${styles.review}`}>
                <p className={styles.reviewMeta}>{formatReviewMeta(review.meta)}</p>
                <p>&ldquo;{review.quote}&rdquo;</p>
                <footer>— {review.author}</footer>
              </blockquote>
            ))}
          </div>
          <Link href="/testimonials/" className={styles.viewAll}>
            Read all reviews →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Service areas</h2>
          <p className={styles.areas}>{copy.serviceAreas}</p>
          <div className={styles.inlineCta}>
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

      <QuoteCTA />
    </>
  );
}
