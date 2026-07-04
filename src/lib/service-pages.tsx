import { ServicePageLayout, ServiceLinks } from "@/components/ServicePageLayout";
import { loadCopy } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { images } from "@/lib/images";
import type { ServicePageConfig } from "./service-page-config";
import { SERVICE_PAGES } from "./service-page-config";

export function createServicePage(config: ServicePageConfig) {
  const copy = loadCopy(config.copySlug);
  const meta = pageMeta[config.metaKey as keyof typeof pageMeta];

  return {
    metadata: buildMetadata({ ...meta, path: config.slug }),
    Page: function ServicePage() {
      return (
        <ServicePageLayout
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services/" },
            { name: config.breadcrumbName, href: config.slug },
          ]}
          headline={copy.headline ?? meta.title}
          subheadline={copy.subheadline}
          paragraphs={copy.paragraphs}
          bullets={copy.bullets}
          image={images[config.imageKey]}
          imageAlt={config.imageAlt}
          faqs={copy.faqs}
        >
          <ServiceLinks currentSlug={config.slug} />
        </ServicePageLayout>
      );
    },
  };
}

export { SERVICE_PAGES };
