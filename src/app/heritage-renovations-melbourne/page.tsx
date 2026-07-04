import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "heritage-renovations-restorations",
  metaKey: "heritage-renovations-melbourne",
  slug: "/heritage-renovations-melbourne/",
  breadcrumbName: "Heritage Renovations Melbourne",
  imageKey: "heritageRenovations",
  imageAlt: "Heritage home renovation Melbourne by Nicon Built",
});

export { metadata };
export default Page;
