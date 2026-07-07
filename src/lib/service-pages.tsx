import { ServicePageLayout, ServiceLinks } from "@/components/ServicePageLayout";
import { loadCopy } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { getServiceCarouselSlides } from "@/lib/service-carousel";
import type { ServicePageConfig } from "./service-page-config";
import { SERVICE_PAGES } from "./service-page-config";

/**
 * Bigger-ticket project pages ($100k-$1.5M-scale renovations and builds).
 * These keep the photo gallery as the dominant first impression, so the
 * embedded quick-enquiry form sits lower on the page rather than in the hero.
 * Every other service page is treated as a trade/maintenance page, where the
 * form goes straight after the hero to capture higher-intent, lower-friction
 * enquiries.
 */
const PROJECT_PAGE_META_KEYS = new Set([
  "heritage-renovations-melbourne",
  "heritage-home-extensions-melbourne",
  "home-renovations-melbourne",
  "new-builds-melbourne",
  "kitchen-renovations-melbourne",
  "bathroom-renovations-melbourne",
]);

export function createServicePage(config: ServicePageConfig) {
  const copy = loadCopy(config.copySlug);
  const meta = pageMeta[config.metaKey as keyof typeof pageMeta];
  const enquiryFormPlacement = PROJECT_PAGE_META_KEYS.has(config.metaKey) ? "bottom" : "top";

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
          carouselSlides={getServiceCarouselSlides(config.metaKey)}
          faqs={copy.faqs}
          enquiryFormPlacement={enquiryFormPlacement}
        >
          <ServiceLinks currentSlug={config.slug} />
        </ServicePageLayout>
      );
    },
  };
}

export { SERVICE_PAGES };
