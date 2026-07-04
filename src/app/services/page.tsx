import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy, getSectionParagraphs, serviceTileSlugs, serviceImageKeys } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.services, path: "/services/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
];

const summaryTitles = [
  "Heritage Renovations and Restorations",
  "Heritage Home Extensions",
  "Kitchen Renovations",
  "Bathroom Renovations",
  "Home Renovations and Extensions",
  "Trades and Maintenance",
  "New Builds",
];

export default function ServicesPage() {
  const copy = loadCopy("services-overview");
  const introParagraphs = getSectionParagraphs(copy, "Intro");

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <h1>{copy.headline}</h1>
          {copy.subheadline ? <p className={styles.subheadline}>{copy.subheadline}</p> : null}
          {introParagraphs.map((p) => (
            <p key={p.slice(0, 40)} className={styles.intro}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <div className={styles.grid}>
            {summaryTitles.map((title, i) => {
              const paragraphs = getSectionParagraphs(copy, title);
              const slug = serviceTileSlugs[title];
              const imageKey = serviceImageKeys[i];

              return (
                <Link key={title} href={slug} className={`card ${styles.card}`}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={images[imageKey]}
                      alt={`${title} Melbourne by Nicon Built`}
                      width={400}
                      height={180}
                    />
                  </div>
                  <div className={styles.body}>
                    <h2>{title}</h2>
                    {paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                    <span className={styles.link}>Learn more →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
