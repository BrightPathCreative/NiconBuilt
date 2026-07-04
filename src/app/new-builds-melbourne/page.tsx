import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "new-builds",
  metaKey: "new-builds-melbourne",
  slug: "/new-builds-melbourne/",
  breadcrumbName: "New Builds Melbourne",
  imageKey: "newBuilds",
  imageAlt: "Custom new home build Melbourne by Nicon Built",
});

export { metadata };
export default Page;
