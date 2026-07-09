import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { QuoteCTA } from "@/components/QuoteCTA";
import { ServiceLinks } from "@/components/ServicePageLayout";
import { loadCopy } from "@/lib/copy";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { images } from "@/lib/images";

type Props = {
  suburb: string;
  slug: string;
  /** docs/copy/{copySlug}.md — suburb-specific heritage copy */
  copySlug: string;
};

export function LocationPage({ suburb, slug, copySlug }: Props) {
  const copy = loadCopy(copySlug);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Heritage Renovations", href: "/heritage-renovations-melbourne/" },
    { name: suburb, href: slug },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(copy.faqs)]} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            <div>
              <p className="eyebrow">Heritage Renovations · {suburb}</p>
              <h1>{copy.headline ?? `Heritage Renovations ${suburb}`}</h1>
              {copy.subheadline ? <p>{copy.subheadline}</p> : null}
              {copy.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p>
                Read more about our approach on the main{" "}
                <Link href="/heritage-renovations-melbourne/">
                  heritage renovations and restorations
                </Link>{" "}
                page.
              </p>
            </div>
            <Image
              src={images.heritageRenovations}
              alt={`Heritage renovation in ${suburb} by Nicon Built`}
              width={640}
              height={420}
              style={{ borderRadius: "12px", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <FaqSection faqs={copy.faqs} />
      <ServiceLinks currentSlug={slug} />
      <QuoteCTA />
    </>
  );
}
