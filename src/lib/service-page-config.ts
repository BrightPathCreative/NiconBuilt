import type { ServiceImageKey } from "@/lib/images";

export type ServicePageConfig = {
  copySlug: string;
  metaKey: string;
  slug: string;
  breadcrumbName: string;
  imageKey: ServiceImageKey;
  imageAlt: string;
};

export const SERVICE_PAGES: ServicePageConfig[] = [
  {
    copySlug: "heritage-renovations-restorations",
    metaKey: "heritage-renovations-melbourne",
    slug: "/heritage-renovations-melbourne/",
    breadcrumbName: "Heritage Renovations Melbourne",
    imageKey: "heritageRenovations",
    imageAlt: "Heritage home renovation Melbourne by Nicon Built",
  },
  {
    copySlug: "heritage-home-extensions",
    metaKey: "heritage-home-extensions-melbourne",
    slug: "/heritage-home-extensions-melbourne/",
    breadcrumbName: "Heritage Home Extensions Melbourne",
    imageKey: "heritageExtensions",
    imageAlt: "Heritage home extension Melbourne by Nicon Built",
  },
  {
    copySlug: "kitchen-renovations",
    metaKey: "kitchen-renovations-melbourne",
    slug: "/kitchen-renovations-melbourne/",
    breadcrumbName: "Kitchen Renovations Melbourne",
    imageKey: "kitchenRenovations",
    imageAlt: "Kitchen renovation in Melbourne by Nicon Built",
  },
  {
    copySlug: "bathroom-renovations",
    metaKey: "bathroom-renovations-melbourne",
    slug: "/bathroom-renovations-melbourne/",
    breadcrumbName: "Bathroom Renovations Melbourne",
    imageKey: "bathroomRenovations",
    imageAlt: "Bathroom renovation in Melbourne by Nicon Built",
  },
  {
    copySlug: "home-renovations-extensions",
    metaKey: "home-renovations-melbourne",
    slug: "/home-renovations-melbourne/",
    breadcrumbName: "Home Renovations Melbourne",
    imageKey: "homeRenovations",
    imageAlt: "Home renovation and extension Melbourne by Nicon Built",
  },
  {
    copySlug: "trades-and-maintenance",
    metaKey: "home-maintenance-melbourne",
    slug: "/home-maintenance-melbourne/",
    breadcrumbName: "Trades and Maintenance Melbourne",
    imageKey: "tradesMaintenance",
    imageAlt: "Trade services on site Melbourne by Nicon Built",
  },
  {
    copySlug: "new-builds",
    metaKey: "new-builds-melbourne",
    slug: "/new-builds-melbourne/",
    breadcrumbName: "New Builds Melbourne",
    imageKey: "newBuilds",
    imageAlt: "Custom new home build Melbourne by Nicon Built",
  },
];
