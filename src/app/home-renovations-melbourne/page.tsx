import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "home-renovations-extensions",
  metaKey: "home-renovations-melbourne",
  slug: "/home-renovations-melbourne/",
  breadcrumbName: "Home Renovations Melbourne",
  imageKey: "homeRenovations",
  imageAlt: "Home renovation and extension Melbourne by Nicon Built",
});

export { metadata };
export default Page;
