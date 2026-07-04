import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "heritage-home-extensions",
  metaKey: "heritage-home-extensions-melbourne",
  slug: "/heritage-home-extensions-melbourne/",
  breadcrumbName: "Heritage Home Extensions Melbourne",
  imageKey: "heritageExtensions",
  imageAlt: "Heritage home extension Melbourne by Nicon Built",
});

export { metadata };
export default Page;
