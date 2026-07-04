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

const galleryAlts = [
  "Heritage weatherboard cottage renovation — Melbourne, completed by Nicon Built",
  "Open plan kitchen and dining renovation — Melbourne, completed by Nicon Built",
  "Modern bathroom renovation — Melbourne, completed by Nicon Built",
  "Navy kitchen with marble benchtop — Melbourne, completed by Nicon Built",
  "Two storey extension with outdoor dining — Melbourne, completed by Nicon Built",
  "Heritage brick home courtyard — Melbourne, completed by Nicon Built",
  "Modern extension with pool — Melbourne, completed by Nicon Built",
  "White galley kitchen renovation — Melbourne, completed by Nicon Built",
  "Luxury kitchen with pool view — Melbourne, completed by Nicon Built",
  "Indoor outdoor entertaining space — Melbourne, completed by Nicon Built",
  "Victorian terrace verandah restoration — Melbourne, completed by Nicon Built",
  "Heritage cottage facade restoration — Melbourne, completed by Nicon Built",
];

export default function OurWorkPage() {
  const copy = loadCopy("our-work");
  const introBlock = getSection(copy, "Intro") ?? "";
  const introLines = introBlock.split("\n").map((l) => l.trim()).filter(Boolean);
  const h1 = introLines[0] ?? copy.headline ?? "";
  const intro = introLines.slice(1).join(" ");

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
          <h1>{h1}</h1>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <div className={styles.gallery}>
            {images.gallery.map((src, i) => (
              <div key={src} className={styles.galleryItem}>
                <Image
                  src={src}
                  alt={galleryAlts[i] || `Project gallery ${i + 1} — completed by Nicon Built`}
                  width={600}
                  height={400}
                />
              </div>
            ))}
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
