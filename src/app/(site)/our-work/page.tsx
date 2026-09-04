import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy, getSection } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta["our-work"], path: "/our-work/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Our Work", href: "/our-work/" },
];

const galleryProjects = [
  {
    alt: "Heritage weatherboard cottage renovation — Port Melbourne, completed by Nicon Built",
    caption: "Heritage weatherboard cottage, Port Melbourne — 8 weeks",
  },
  {
    alt: "Open plan kitchen and dining renovation — Albert Park, completed by Nicon Built",
    caption: "Open-plan kitchen and dining, Albert Park — 6 weeks",
  },
  {
    alt: "Modern bathroom renovation — Brighton, completed by Nicon Built",
    caption: "Bathroom renovation, Brighton — 5 weeks",
  },
  {
    alt: "Edwardian kitchen with marble benchtop — Albert Park, completed by Nicon Built",
    caption: "Edwardian kitchen, Albert Park — 6 weeks",
  },
  {
    alt: "Two storey extension with outdoor dining — Sandringham, completed by Nicon Built",
    caption: "Two-storey extension, Sandringham — 12 weeks",
  },
  {
    alt: "Heritage brick home courtyard — Middle Park, completed by Nicon Built",
    caption: "Heritage brick home, Middle Park — 10 weeks",
  },
  {
    alt: "Modern extension with pool — Brighton, completed by Nicon Built",
    caption: "Pool-side extension, Brighton — 14 weeks",
  },
  {
    alt: "White galley kitchen renovation — Elwood, completed by Nicon Built",
    caption: "Galley kitchen, Elwood — 5 weeks",
  },
  {
    alt: "Luxury kitchen with pool view — Hampton, completed by Nicon Built",
    caption: "Kitchen renovation, Hampton — 7 weeks",
  },
  {
    alt: "Indoor outdoor entertaining space — St Kilda, completed by Nicon Built",
    caption: "Indoor-outdoor living, St Kilda — 8 weeks",
  },
  {
    alt: "Victorian terrace verandah restoration — South Melbourne, completed by Nicon Built",
    caption: "Victorian terrace verandah, South Melbourne — 6 weeks",
  },
  {
    alt: "Heritage cottage facade restoration — Williamstown, completed by Nicon Built",
    caption: "Heritage facade restoration, Williamstown — 10 weeks",
  },
];

export default function OurWorkPage() {
  const copy = loadCopy("our-work");
  const intro = getSection(copy, "Intro")?.trim() ?? "";

  const midReview = getSection(copy, "Mid-gallery review") ?? "";
  const midQuoteMatch = midReview.match(/:\s*"(.+)"\s*$/);
  const midQuote = midQuoteMatch?.[1] ?? midReview;

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <h1>{copy.headline}</h1>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <div className={styles.gallery}>
            {images.gallery.map((src, i) => {
              const project = galleryProjects[i];
              return (
                <figure key={src} className={styles.galleryItem}>
                  <Image
                    src={src}
                    alt={project?.alt ?? `Project gallery ${i + 1} — completed by Nicon Built`}
                    width={600}
                    height={400}
                  />
                  {project?.caption ? (
                    <figcaption className={styles.galleryCaption}>{project.caption}</figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {midReview ? (
        <section className="section">
          <div className="container">
            <blockquote className={styles.quote}>
              <p>&ldquo;{midQuote}&rdquo;</p>
              <footer>— Renee Moore, hockingstuart Yarraville</footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      <QuoteCTA />
    </>
  );
}
