import Image from "next/image";
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
};

export function LocationPage({ suburb, slug }: Props) {
  const copy = loadCopy("heritage-renovations-restorations");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services/" },
    { name: `Heritage Renovations ${suburb}`, href: slug },
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
              <h1>Heritage Renovation Builder in {suburb} | Nicon Built</h1>
              {copy.subheadline ? <p>{copy.subheadline}</p> : null}
              {copy.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
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
      <ServiceLinks currentSlug="/heritage-renovations-melbourne/" />
      <QuoteCTA />
    </>
  );
}
