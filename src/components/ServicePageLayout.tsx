import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/navigation";
import { images } from "@/lib/images";
import { Breadcrumbs } from "./Breadcrumbs";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { FaqSection } from "./FaqSection";
import { QuoteCTA } from "./QuoteCTA";
import { QuickEnquiry } from "./QuickEnquiry";
import type { BreadcrumbItem } from "@/lib/schema";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
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
  // Hero carries the H1 and one short supporting line only — the fuller
  // explanatory paragraphs get more room in the dedicated content section
  // below instead of being squeezed into the hero column.
  const heroDescription = subheadline ? [subheadline] : [];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
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

      {slides.length > 1 ? (
        <ServiceMarqueeCarousel slides={slides} label={`${headline} project work`} />
      ) : null}

      {paragraphs.length ? (
        <section className="section section--surface">
          <div className="container prose">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
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

      {enquiryFormPlacement === "bottom" ? <QuickEnquiry /> : null}

      {children}

      {faqs.length ? <FaqSection faqs={faqs} /> : null}

      <QuoteCTA />
    </>
  );
}

export function ServiceLinks({ currentSlug }: { currentSlug: string }) {
  const others = services.filter((s) => s.slug !== currentSlug).slice(0, 3);

  const cards = [
    ...others.map((s) => ({
      slug: s.slug,
      label: s.shortTitle,
      image: images[s.imageKey],
      imageAlt: s.imageAlt,
    })),
    {
      slug: "/our-work/",
      label: "Our Work",
      image: images.gallery[0],
      imageAlt: "Recent renovation project by Nicon Built",
    },
    {
      slug: "/contact/",
      label: "Contact",
      image: images.nickPortrait,
      imageAlt: "Nick from Nicon Built",
    },
  ];

  return (
    <section className="section section--tone">
      <div className="container">
        <p className="eyebrow">Related services</p>
        <h2>Explore our other services</h2>
        <div className={styles.relatedGrid}>
          {cards.map((c) => (
            <Link key={c.slug} href={c.slug} className={`card ${styles.relatedCard}`}>
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
