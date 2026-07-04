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
  const copy = loadCopy("property-maintenance");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services/" },
    { name: `Home Services ${suburb}`, href: slug },
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
              <p className="eyebrow">Home Services · {suburb}</p>
              <h1>Home Services in {suburb} | Nicon Built Melbourne</h1>
              {copy.subheadline ? <p>{copy.subheadline}</p> : null}
              {copy.paragraphs.slice(0, 3).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <Image
              src={images.tradesMaintenance}
              alt={`Home services in ${suburb} by Nicon Built`}
              width={640}
              height={420}
              style={{ borderRadius: "12px", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <FaqSection faqs={copy.faqs} />
      <ServiceLinks currentSlug="/property-maintenance-melbourne/" />
      <QuoteCTA />
    </>
  );
}
