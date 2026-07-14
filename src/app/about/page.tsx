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
  const experienceParagraphs = getSectionParagraphs(copy, "Built on Experience. Driven by Quality.");
  const workParagraphs = getSectionParagraphs(copy, "How We Work");
  const relationshipsParagraphs = getSectionParagraphs(copy, "A Business Built on Relationships");
  const processParagraphs = getSectionParagraphs(copy, "Our Process");
  const audienceParagraphs = getSectionParagraphs(copy, "Who We Work With");
  const credentialItems = getSectionParagraphs(copy, "Credentials")
    .join("\n")
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((l) => l.replace(/^-\s*/, ""));

  const processSteps = [
    {
      title: "Start with a proper conversation",
      body: processParagraphs[0],
    },
    {
      title: "Assess the site before quoting",
      body: processParagraphs[1],
    },
    {
      title: "Communicate before changes happen",
      body: processParagraphs[2],
    },
    {
      title: "Solve issues without losing momentum",
      body: `${processParagraphs[3]} ${processParagraphs[4] ?? ""}`.trim(),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className={styles.heroSection}>
        <div className={styles.heroMedia}>
          <Image
            src={images.gallery[6]}
            alt="Modern home extension with pool, Brighton — completed by Nicon Built"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow eyebrow--dark">About Nicon Built</p>
            <h1>{copy.headline}</h1>
            {introParagraphs.map((p) => (
              <p key={p.slice(0, 40)} className={styles.heroLead}>
                {p}
              </p>
            ))}
          </div>
          <aside className={styles.founderCard} aria-label="About Nick Kafkalas">
            <div className={styles.founderPortrait}>
              <Image
                src={images.nickPortrait}
                alt="Nick Kafkalas, founder of Nicon Built, on site"
                fill
                sizes="80px"
                className={styles.founderPortraitImage}
              />
            </div>
            <div>
              <p className={styles.founderLabel}>Founder-led from first quote to handover</p>
              <p className={styles.founderName}>Nick Kafkalas</p>
              <p className={styles.founderMeta}>
                Founder of Nicon Built. Licensed builder. Every job managed personally since 1990.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tone">
        <div className="container prose">
          <h2>Built on Experience. Driven by Quality.</h2>
          {experienceParagraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.workGrid}>
            <div className={styles.workImage}>
              <Image
                src={images.gallery[0]}
                alt="Heritage weatherboard cottage renovation completed for a returning Nicon Built client"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className={styles.sectionImageEl}
              />
            </div>
            <div className={styles.workStack}>
              <div className="prose">
                <h2>How We Work</h2>
                {workParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <div className={styles.relationshipCard}>
                <h3>A Business Built on Relationships</h3>
                {relationshipsParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.bandSection}`}>
        <div className={styles.bandMedia}>
          <Image
            src={images.gallery[4]}
            alt="Two-storey extension underway, managed start to finish by Nicon Built"
            fill
            sizes="100vw"
            className={styles.bandImage}
          />
          <div className={styles.bandOverlay} aria-hidden="true" />
        </div>
        <div className={`container ${styles.bandContent}`}>
          <div className={styles.bandIntro}>
            <p className="eyebrow eyebrow--dark">Our process</p>
            <h2>Clear from the first conversation. Solid through the handover.</h2>
            <p>
              The process matters almost as much as the workmanship. This is how jobs stay
              organised, honest, and predictable.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <div key={step.title} className={styles.processCard}>
                <span className={styles.processIndex}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.audienceGrid}>
            <div className="prose">
              <h2>Who We Work With</h2>
              {audienceParagraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className={styles.audienceImage}>
              <Image
                src={images.gallery[10]}
                alt="Victorian terrace verandah restoration, South Melbourne — completed by Nicon Built"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={styles.sectionImageEl}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.promisePanel}>
              <p className="eyebrow">Our promise</p>
              <h2>What you can count on</h2>
              <ul className={styles.promiseList}>
                {promiseItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.credentialsPanel}>
              <p className="eyebrow">Credentials</p>
              <h2>Licensed, insured, and accountable</h2>
              <ul className={styles.credentials}>
                {credentialItems.map((item) => (
                  <li key={item}>
                    {item}
                    {item.includes("VBA Licensed") && siteConfig.vbaLicence
                      ? ` — ${siteConfig.vbaLicence}`
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
