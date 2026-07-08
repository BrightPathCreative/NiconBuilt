import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { loadCopy } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.contact, path: "/contact/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact/" },
];

const heroImage = images.gallery[0];

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactPage() {
  const copy = loadCopy("contact");
  const headlineContent = copy.sections.find((s) => s.title === "Headline")?.content ?? "";
  const introParagraphs = headlineContent
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(1);
  const areasParagraphs = (copy.serviceAreas ?? "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    // The suburb list renders as styled tags below, not as a raw paragraph.
    .filter((p) => !p.includes("·"));

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <link rel="preload" as="image" href={heroImage} />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className={styles.pageHead}>
        <div className={styles.pageHeadBg}>
          <Image
            src={heroImage}
            alt="Renovated weatherboard home in Melbourne by Nicon Built"
            fill
            priority
            sizes="100vw"
            className={styles.pageHeadImage}
          />
          <div className={styles.pageHeadOverlay} aria-hidden="true" />
        </div>
        <div className={`container ${styles.pageHeadContent}`}>
          <p className="eyebrow eyebrow--dark">Contact · Melbourne</p>
          <h1>Get in Touch</h1>
          {introParagraphs.map((p) => (
            <p key={p.slice(0, 30)} className={styles.lead}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className={`section section--surface ${styles.contactSection}`}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.formCol}>
            <ContactForm
              title="Request a Free Quote"
              subtitle={
                <>
                  Your details are kept private and will never be shared. Read our{" "}
                  <Link href="/privacy-policy/">Privacy Policy</Link>.
                </>
              }
            />
          </div>

          <aside className={styles.sideCol}>
            <div className={styles.callBlock}>
              <h2 className={styles.sideHeading}>Prefer to Call?</h2>
              <p className={styles.sideBody}>
                Speak to Nick directly. He&apos;s on-site most days but always calls back.
              </p>
              <CallButton className={`btn btn-accent ${styles.callBtn}`} icon />
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>
                <ClockIcon />
                Opening Hours
              </h3>
              <dl className={styles.hours}>
                <div className={styles.hoursRow}>
                  <dt>Monday to Saturday</dt>
                  <dd>7:00am – 7:00pm</dd>
                </div>
                <div className={styles.hoursRow}>
                  <dt>Sunday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>
                <PinIcon />
                Where We Work
              </h3>
              <p className={styles.cardBody}>
                Nicon Built is based in Port Melbourne and works with homeowners across
                Melbourne&apos;s inner south and bayside suburbs — from Williamstown around the bay
                to Brighton and Beaumaris, and up through Armadale, Hawthorn and Kew.{" "}
                <a href="#service-areas">View all service areas</a>.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Email</h3>
              <p className={styles.cardBody}>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="service-areas">
        <div className="container">
          <p className="eyebrow">Where we work</p>
          <h2>Service areas</h2>
          {areasParagraphs[0] ? <p className={styles.areasIntro}>{areasParagraphs[0]}</p> : null}
          <ul className={styles.suburbs}>
            {siteConfig.serviceAreas.map((suburb) => (
              <li key={suburb}>{suburb}</li>
            ))}
          </ul>
          {areasParagraphs[1] ? <p className={styles.areasNote}>{areasParagraphs[1]}</p> : null}
          <div className={styles.mapWrap}>
            <Image
              src={images.serviceAreaMap}
              alt="Map of Nicon Built's service area across Melbourne's inner south and bayside suburbs"
              width={1200}
              height={320}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.map}
            />
          </div>
        </div>
      </section>
    </>
  );
}
