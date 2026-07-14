import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { QuoteCTA } from "@/components/QuoteCTA";
import { loadCopy } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { siteConfig, phoneHref, callCtaLabel } from "@/lib/site";

export const metadata = buildMetadata({ ...pageMeta.faq, path: "/faq/" });

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq/" },
];

export default function FaqPage() {
  const copy = loadCopy("faq");
  const phone = siteConfig.phone;
  const intro = copy.subheadline ?? "";

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(copy.faqs)]} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <h1>{copy.headline}</h1>
          <p>
            {intro.includes("[CRM NUMBER]") ? (
              <>
                Can&apos;t find what you&apos;re after?{" "}
                {phone ? (
                  <>
                    <a href={phoneHref(phone)}>{callCtaLabel}</a>
                  </>
                ) : (
                  "Get in touch"
                )}{" "}
                or send us a message on the Contact page.
              </>
            ) : (
              intro
            )}
          </p>
        </div>
      </section>

      <FaqSection faqs={copy.faqs} />
      <QuoteCTA />
    </>
  );
}
