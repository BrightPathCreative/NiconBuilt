import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy, getSectionParagraphs } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.about, path: "/about/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about/" },
];

const sectionTitles = [
  "Built on Experience. Driven by Quality.",
  "How We Work",
  "A Business Built on Relationships",
  "Our Process",
  "Who We Work With",
];

/** One relevant image per About section — Nick's portrait sits here (not in the hero) alongside "How We Work". */
const sectionMedia: Record<string, { src: string; alt: string; portrait?: boolean }> = {
  "Built on Experience. Driven by Quality.": {
    src: images.heritageRenovations,
    alt: "Heritage home renovation completed by Nicon Built, reflecting decades of craftsmanship",
  },
  "How We Work": {
    src: images.nickPortrait,
    alt: "Nick Kafkalas, founder of Nicon Built, on site",
    portrait: true,
  },
  "A Business Built on Relationships": {
    src: images.gallery[0],
    alt: "Heritage weatherboard cottage renovation completed for a returning Nicon Built client",
  },
  "Our Process": {
    src: images.gallery[4],
    alt: "Two-storey extension underway, managed start to finish by Nicon Built",
  },
  "Who We Work With": {
    src: images.gallery[10],
    alt: "Victorian terrace verandah restoration, South Melbourne — completed by Nicon Built",
  },
};

export default function AboutPage() {
  const copy = loadCopy("about");
  const promiseBlock = getSectionParagraphs(copy, "Our Promise").join("\n");
  const promiseItems = promiseBlock
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.endsWith(":") && !/here's what you can count on/i.test(l))
    .map((l) => l.replace(/^-\s*/, ""));

  const introParagraphs = getSectionParagraphs(copy, "Headline").slice(1);

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <h1>{copy.headline}</h1>
              {introParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className={styles.intro}>
                  {p}
                </p>
              ))}
            </div>
            <div className={styles.heroImage}>
              <Image
                src={images.gallery[6]}
                alt="Modern home extension with pool, Brighton — completed by Nicon Built"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.heroImageEl}
              />
            </div>
          </div>
        </div>
      </section>

      {sectionTitles.map((title, index) => {
        const paragraphs = getSectionParagraphs(copy, title);
        if (!paragraphs.length) return null;
        const media = sectionMedia[title];
        const imageFirst = index % 2 === 0;
        return (
          <section
            key={title}
            className={`section ${index === 0 ? "section--tone" : ""}`}
          >
            <div className="container">
              <div className={media ? styles.sectionGrid : undefined}>
                {media && imageFirst ? (
                  <div className={media.portrait ? styles.sectionImagePortrait : styles.sectionImage}>
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.sectionImageEl}
                    />
                  </div>
                ) : null}
                <div className="prose">
                  <h2>{title}</h2>
                  {paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {media && !imageFirst ? (
                  <div className={media.portrait ? styles.sectionImagePortrait : styles.sectionImage}>
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.sectionImageEl}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section section--surface">
        <div className="container">
          <div className={styles.sectionGrid}>
            <div className={styles.sectionImage}>
              <Image
                src={images.gallery[9]}
                alt="Indoor-outdoor entertaining space, St Kilda — completed by Nicon Built"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.sectionImageEl}
              />
            </div>
            <div>
              <h2>Our Promise</h2>
              <ul className={styles.promiseList}>
                {promiseItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Credentials</h2>
          <ul className={styles.credentials}>
            {getSectionParagraphs(copy, "Credentials")
              .join("\n")
              .split("\n")
              .filter((l) => l.startsWith("- "))
              .map((l) => l.replace(/^-\s*/, ""))
              .map((item) => (
                <li key={item}>
                  {item}
                  {item.includes("VBA Licensed") && siteConfig.vbaLicence
                    ? ` — ${siteConfig.vbaLicence}`
                    : ""}
                </li>
              ))}
          </ul>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
