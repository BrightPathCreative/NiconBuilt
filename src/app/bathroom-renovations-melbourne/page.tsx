import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "bathroom-renovations",
  metaKey: "bathroom-renovations-melbourne",
  slug: "/bathroom-renovations-melbourne/",
  breadcrumbName: "Bathroom Renovations Melbourne",
  imageKey: "bathroomRenovations",
  imageAlt: "Bathroom renovation in Melbourne by Nicon Built",
});

export { metadata };
export default Page;
