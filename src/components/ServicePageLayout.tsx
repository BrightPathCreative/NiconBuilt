import Image from "next/image";
import Link from "next/link";
import { buildingServices } from "@/lib/navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { FaqSection } from "./FaqSection";
import { QuoteCTA } from "./QuoteCTA";
import type { BreadcrumbItem } from "@/lib/schema";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/copy";
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
  faqs?: FaqItem[];
  children?: React.ReactNode;
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
  faqs = [],
  children,
}: Props) {
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

      <section className={`section ${styles.pageHero}`}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <h1>{headline}</h1>
              {subheadline ? <p className={styles.subheadline}>{subheadline}</p> : null}
              {paragraphs.slice(0, 2).map((p, i) => (
                <p key={i} className={styles.lead}>
                  {p}
                </p>
              ))}
            </div>
            {image ? (
              <div className={styles.heroImage}>
                <Image src={image} alt={imageAlt || headline} width={640} height={420} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {paragraphs.length > 2 ? (
        <section className="section section--surface">
          <div className="container prose">
            {paragraphs.slice(2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}

      {bullets.length ? (
        <section className="section">
          <div className="container">
            <h2>{bulletsTitle}</h2>
            <ul className={styles.bulletList}>
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {children}

      {faqs.length ? <FaqSection faqs={faqs} /> : null}

      <QuoteCTA />
    </>
  );
}

export function ServiceLinks({ currentSlug }: { currentSlug: string }) {
  const others = buildingServices.filter((s) => s.slug !== currentSlug).slice(0, 3);

  return (
    <section className="section section--tone">
      <div className="container">
        <p className="eyebrow">Related services</p>
        <h2>Explore our other services</h2>
        <div className={styles.relatedGrid}>
          {others.map((s) => (
            <Link key={s.slug} href={s.slug} className={`card ${styles.relatedCard}`}>
              <span>{s.title}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link href="/our-work/" className={`card ${styles.relatedCard}`}>
            <span>Our Work</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact/" className={`card ${styles.relatedCard}`}>
            <span>Contact</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
