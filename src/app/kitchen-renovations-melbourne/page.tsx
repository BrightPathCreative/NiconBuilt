import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "kitchen-renovations",
  metaKey: "kitchen-renovations-melbourne",
  slug: "/kitchen-renovations-melbourne/",
  breadcrumbName: "Kitchen Renovations Melbourne",
  imageKey: "kitchenRenovations",
  imageAlt: "Kitchen renovation in Melbourne by Nicon Built",
});

export { metadata };
export default Page;
