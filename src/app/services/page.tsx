import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy, getSectionParagraphs, getSection, serviceImageKeys } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SERVICE_PAGES } from "@/lib/service-page-config";
import { images } from "@/lib/images";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.services, path: "/services/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
];

const EMERGENCY_SECTION = "Emergency Make Safe and Insurance Work";

function getSectionBullets(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s*/, "").trim());
}

export default function ServicesPage() {
  const copy = loadCopy("services-overview");
  const introParagraphs = getSectionParagraphs(copy, "Intro");
  const emergencyParagraphs = getSectionParagraphs(copy, EMERGENCY_SECTION).filter(
    (p) => !p.trim().startsWith("- ")
  );
  const emergencyBullets = getSectionBullets(getSection(copy, EMERGENCY_SECTION) ?? "");

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
            {SERVICE_PAGES.map((service, i) => {
              const paragraphs = getSectionParagraphs(copy, service.tileTitle);
              const imageKey = serviceImageKeys[i];

              return (
                <Link key={service.slug} href={service.slug} className={`card ${styles.card}`}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={images[imageKey]}
                      alt={`${service.tileTitle} Melbourne by Nicon Built`}
                      width={400}
                      height={180}
                    />
                  </div>
                  <div className={styles.body}>
                    <h2>{service.tileTitle}</h2>
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

      {emergencyParagraphs.length > 0 ? (
        <section className="section">
          <div className="container">
            <div className={styles.emergencyCard}>
              <div className={styles.emergencyBody}>
                <p className="eyebrow">Urgent response</p>
                <h2>{EMERGENCY_SECTION}</h2>
                {emergencyParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {emergencyBullets.length > 0 ? (
                  <ul className={styles.emergencyList}>
                    {emergencyBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <div className={styles.emergencyActions}>
                  <CallButton className="btn btn-primary" prefix="Call for urgent help" />
                  <Link href="/property-maintenance-melbourne/" className="btn btn-outline">
                    Property maintenance →
                  </Link>
                </div>
              </div>
              <div className={styles.emergencyImage}>
                <Image
                  src={images.emergencyMakeSafe}
                  alt="Nicon Built tradesperson carrying out exterior repair work at a Melbourne weatherboard home"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <QuoteCTA />
    </>
  );
}
