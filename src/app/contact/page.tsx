import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { GhlEmbedForm } from "@/components/GhlEmbedForm";
import { loadCopy } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildMetadata({ ...pageMeta.contact, path: "/contact/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact/" },
];

export default function ContactPage() {
  const copy = loadCopy("contact");
  const phone = siteConfig.phone;
  const headlineContent = copy.sections.find((s) => s.title === "Headline")?.content ?? "";
  const introParagraphs = headlineContent
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(1);
  const areasContent = copy.serviceAreas ?? "";

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <h1>{copy.headline}</h1>
          {introParagraphs.map((p) => (
            <p key={p.slice(0, 30)} className={styles.lead}>
              {p}
            </p>
          ))}

          <div className={styles.infoGrid}>
            <div className={styles.details}>
              <h2>Contact details</h2>
              <ul>
                {phone ? (
                  <li>
                    <strong>Phone:</strong>{" "}
                    <a href={phoneHref(phone)}>{formatPhoneDisplay(phone)}</a>
                  </li>
                ) : null}
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
                <li>
                  <strong>Address:</strong> {siteConfig.address.full}
                </li>
                <li>
                  <strong>Hours:</strong> Monday to Saturday, 7:00am to 7:00pm
                </li>
              </ul>
            </div>

            <div className={styles.areas}>
              <h2>Service areas</h2>
              {areasContent.split(/\n\n+/).map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-width section (rather than squeezed into a side-by-side column) so the
          embedded GHL form's iframe renders wide enough to trigger its own desktop
          (2-column) breakpoint instead of falling back to its mobile single-column layout. */}
      <section className="section section--surface">
        <div className="container">
          <div className={styles.formWrap}>
            <GhlEmbedForm />
          </div>
        </div>
      </section>
    </>
  );
}
