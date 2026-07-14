import Image from "next/image";
import Link from "next/link";
import { getRelatedServicePages } from "@/lib/service-page-config";
import { images } from "@/lib/images";
import { Breadcrumbs } from "./Breadcrumbs";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { FaqSection } from "./FaqSection";
import { QuoteCTA } from "./QuoteCTA";
import { QuickEnquiry } from "./QuickEnquiry";
import type { BreadcrumbItem } from "@/lib/schema";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/copy";
import type { CarouselSlide } from "@/lib/service-carousel";
import { ServiceHeroCarousel } from "./ServiceImageCarousel";
import { ServiceMarqueeCarousel } from "./ServiceMarquee";
import styles from "./ServicePageLayout.module.css";

type Props = {
  breadcrumbs: BreadcrumbItem[];
  headline: string;
  subheadline?: string;
  paragraphs?: string[];
  bullets?: string[];
  bulletsTitle?: string;
  image?: string;
  imageAlt?: string;
  carouselSlides?: CarouselSlide[];
  faqs?: FaqItem[];
  children?: React.ReactNode;
  /**
   * Where the embedded quick-enquiry form sits on the page:
   * - "top" (default): embedded directly in the hero itself (one image,
   *   headline and form together, like the homepage) — best for
   *   trade/maintenance pages, where searches tend to be higher-intent and
   *   lower-consideration. The full photo gallery still runs lower down.
   * - "bottom": hero stays photo-gallery-first (headline + carousel, no
   *   form), with the form appearing after the "what's included" content —
   *   for bigger professional-service project pages (heritage, new builds,
   *   home renovations/extensions) where the work should sell itself first.
   * - "none": skip the embedded form (falls back to the QuoteCTA band only).
   */
  enquiryFormPlacement?: "top" | "bottom" | "none";
  /** Service page path for JSON-LD (e.g. /plumbing-melbourne/). */
  serviceUrl?: string;
  /** Meta description used in Service schema. */
  serviceDescription?: string;
};

export function ServicePageLayout({
  breadcrumbs,
  headline,
  subheadline,
  paragraphs = [],
  bullets = [],
  bulletsTitle = "What's included",
  image,
  imageAlt,
  carouselSlides = [],
  faqs = [],
  children,
  enquiryFormPlacement = "top",
  serviceUrl,
  serviceDescription,
}: Props) {
  const slides =
    carouselSlides.length > 0
      ? carouselSlides
      : image
        ? [{ src: image, alt: imageAlt || headline }]
        : [];
  // Reuse a different project photo than the hero for visual variety, falling back to the hero image if only one exists.
  const includedImage = slides.length > 1 ? slides[1] : slides[0];
  const isFormHero = enquiryFormPlacement === "top";
  // Editorial copy layout: the first paragraph becomes a large lead
  // statement, and the rest are paired with project photos in alternating
  // rows — instead of one long unbroken prose chunk.
  const [leadParagraph, ...restParagraphs] = paragraphs;
  // Photos for the story rows: skip the hero (0) and "what's included" (1)
  // slides, and hold the last slide back for the enquiry-band background.
  const storyPool =
    slides.length > 3 ? slides.slice(2, -1) : slides.length > 1 ? slides.slice(1) : slides;
  const storyRows = buildStoryRows(restParagraphs, storyPool);
  const enquiryImage = slides.length ? slides[slides.length - 1] : undefined;
  // Hero carries the H1 and one short supporting line only — the fuller
  // explanatory paragraphs get more room in the dedicated content section
  // below instead of being squeezed into the hero column.
  const heroDescription = subheadline ? [subheadline] : [];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          ...(serviceUrl && serviceDescription
            ? [
                serviceSchema({
                  name: headline,
                  description: serviceDescription,
                  url: serviceUrl,
                  image: slides[0]?.src,
                }),
              ]
            : []),
          ...(faqs.length ? [faqSchema(faqs)] : []),
        ]}
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {isFormHero ? (
        // Trade/maintenance pages: one hero image, headline and the
        // quick-enquiry form together, same as the homepage — both visible
        // without scrolling. The full multi-photo gallery still runs further
        // down (marquee below), it's just not competing for space up top.
        <Hero
          title={headline}
          description={heroDescription}
          image={slides[0]?.src}
          imageAlt={slides[0]?.alt || headline}
          showForm
          priority
        />
      ) : (
        <section className={`section ${styles.pageHero}`}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <h1>{headline}</h1>
                {subheadline ? <p className={styles.subheadline}>{subheadline}</p> : null}
              </div>
              {slides.length ? (
                <ServiceHeroCarousel slides={slides} label={`${headline} gallery`} />
              ) : null}
            </div>
          </div>
        </section>
      )}

      {leadParagraph || storyRows.length ? (
        <section className="section section--surface">
          <div className="container">
            {leadParagraph ? (
              <div className={styles.lead}>
                <p className="eyebrow">Our approach</p>
                <p className={styles.leadParagraph}>{leadParagraph}</p>
              </div>
            ) : null}
            {storyRows.map((row, rowIndex) => (
              <div
                key={row.paragraphs[0]?.slice(0, 40) ?? rowIndex}
                className={`${styles.storyRow} ${rowIndex % 2 === 1 ? styles.storyRowReverse : ""}`}
              >
                {row.image ? (
                  <div className={styles.storyImage}>
                    <Image
                      src={row.image.src}
                      alt={row.image.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className={styles.storyImageEl}
                    />
                  </div>
                ) : null}
                <div className={styles.storyText}>
                  {row.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {slides.length > 1 ? (
        <ServiceMarqueeCarousel slides={slides} label={`${headline} project work`} />
      ) : null}

      {bullets.length ? (
        <section className="section">
          <div className="container">
            <div className={includedImage ? styles.includedGrid : undefined}>
              {includedImage ? (
                <div className={styles.includedImage}>
                  <Image
                    src={includedImage.src}
                    alt={includedImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.includedImageEl}
                  />
                </div>
              ) : null}
              <div>
                <h2>{bulletsTitle}</h2>
                <ul className={styles.bulletList}>
                  {bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {enquiryFormPlacement === "bottom" ? (
        <QuickEnquiry image={enquiryImage?.src} imageAlt={enquiryImage?.alt} />
      ) : null}

      {children}

      {faqs.length ? <FaqSection faqs={faqs} /> : null}

      <QuoteCTA />
    </>
  );
}

type StoryRow = {
  paragraphs: string[];
  image?: CarouselSlide;
};

/**
 * Pair the remaining copy paragraphs with project photos in alternating
 * image/text rows. Paragraphs are grouped (max two per row) so each row has
 * enough text to balance its photo, and rows never exceed the photos
 * available — leftover paragraphs flow into the final row.
 */
function buildStoryRows(paragraphs: string[], pool: CarouselSlide[]): StoryRow[] {
  if (!paragraphs.length) return [];
  if (!pool.length) return [{ paragraphs }];

  const rowCount = Math.min(Math.ceil(paragraphs.length / 2), pool.length);
  const rows: StoryRow[] = [];
  let cursor = 0;
  for (let i = 0; i < rowCount; i++) {
    const remainingRows = rowCount - i;
    const remainingParagraphs = paragraphs.length - cursor;
    const take = Math.ceil(remainingParagraphs / remainingRows);
    rows.push({
      paragraphs: paragraphs.slice(cursor, cursor + take),
      image: pool[i % pool.length],
    });
    cursor += take;
  }
  return rows;
}

export function ServiceLinks({ currentSlug }: { currentSlug: string }) {
  const cards = getRelatedServicePages(currentSlug).map((s) => ({
    slug: s.slug,
    label: s.shortTitle,
    image: images[s.imageKey],
    imageAlt: s.imageAlt,
  }));

  return (
    <section className="section section--tone">
      <div className="container">
        <p className="eyebrow">Related services</p>
        <h2>Explore our other services</h2>
        <div className={styles.relatedGrid}>
          {cards.map((c) => (
            <Link key={c.slug} href={c.slug} prefetch={false} className={`card ${styles.relatedCard}`}>
              <div className={styles.relatedImage}>
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  className={styles.relatedImageEl}
                />
              </div>
              <div className={styles.relatedBody}>
                <span>{c.label}</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
