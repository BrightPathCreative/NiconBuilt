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

export default function AboutPage() {
  const copy = loadCopy("about");
  const promiseItems = getSectionParagraphs(copy, "Our Promise").flatMap((block) =>
    block.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.replace(/^-\s*/, ""))
  );

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
            <Image
              src={images.nickPortrait}
              alt="Nick Kafkalas, founder of Nicon Built"
              width={400}
              height={500}
              className={styles.portrait}
            />
          </div>
        </div>
      </section>

      {sectionTitles.map((title, index) => {
        const paragraphs = getSectionParagraphs(copy, title);
        if (!paragraphs.length) return null;
        return (
          <section
            key={title}
            className={`section ${index === 0 ? "section--tone" : ""}`}
          >
            <div className="container prose">
              <h2>{title}</h2>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        );
      })}

      <section className="section section--surface">
        <div className="container">
          <h2>Our Promise</h2>
          <ul className={styles.promiseList}>
            {promiseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
