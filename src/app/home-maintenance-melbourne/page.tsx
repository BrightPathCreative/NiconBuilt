import { createServicePage } from "@/lib/service-pages";

const { metadata, Page } = createServicePage({
  copySlug: "trades-and-maintenance",
  metaKey: "home-maintenance-melbourne",
  slug: "/home-maintenance-melbourne/",
  breadcrumbName: "Trades and Maintenance Melbourne",
  imageKey: "tradesMaintenance",
  imageAlt: "Trade services on site Melbourne by Nicon Built",
});

export { metadata };
export default Page;
