import type { ServiceImageKey } from "@/lib/images";

export type ServicePageConfig = {
  copySlug: string;
  metaKey: string;
  slug: string;
  tileTitle: string;
  shortTitle: string;
  breadcrumbName: string;
  imageKey: ServiceImageKey;
  imageAlt: string;
};

/** All 18 service pages — order matches home.md service tiles */
export const SERVICE_PAGES: ServicePageConfig[] = [
  {
    copySlug: "kitchen-renovations",
    metaKey: "kitchen-renovations-melbourne",
    slug: "/kitchen-renovations-melbourne/",
    tileTitle: "Kitchen Renovations",
    shortTitle: "Kitchen Renovations",
    breadcrumbName: "Kitchen Renovations Melbourne",
    imageKey: "kitchenRenovations",
    imageAlt: "Kitchen renovation in Melbourne by Nicon Built",
  },
  {
    copySlug: "bathroom-renovations",
    metaKey: "bathroom-renovations-melbourne",
    slug: "/bathroom-renovations-melbourne/",
    tileTitle: "Bathroom Renovations",
    shortTitle: "Bathroom Renovations",
    breadcrumbName: "Bathroom Renovations Melbourne",
    imageKey: "bathroomRenovations",
    imageAlt: "Bathroom renovation in Melbourne by Nicon Built",
  },
  {
    copySlug: "property-maintenance",
    metaKey: "property-maintenance-melbourne",
    slug: "/property-maintenance-melbourne/",
    tileTitle: "Property Maintenance",
    shortTitle: "Property Maintenance",
    breadcrumbName: "Property Maintenance Melbourne",
    imageKey: "propertyMaintenance",
    imageAlt: "Property maintenance landscaping at a Melbourne heritage home — Nicon Built",
  },
  {
    copySlug: "carpentry-and-joinery",
    metaKey: "carpentry-and-joinery-melbourne",
    slug: "/carpentry-and-joinery-melbourne/",
    tileTitle: "Carpentry and Joinery",
    shortTitle: "Carpentry & Joinery",
    breadcrumbName: "Carpentry and Joinery Melbourne",
    imageKey: "homeRenovations",
    imageAlt: "Carpentry and joinery work in Melbourne by Nicon Built",
  },
  {
    copySlug: "painting-and-plastering",
    metaKey: "painting-and-plastering-melbourne",
    slug: "/painting-and-plastering-melbourne/",
    tileTitle: "Painting and Plastering",
    shortTitle: "Painting & Plastering",
    breadcrumbName: "Painting and Plastering Melbourne",
    imageKey: "cleaning",
    imageAlt: "Painting and plastering in Melbourne by Nicon Built",
  },
  {
    copySlug: "rendering-and-solid-plastering",
    metaKey: "rendering-and-solid-plastering-melbourne",
    slug: "/rendering-and-solid-plastering-melbourne/",
    tileTitle: "Rendering and Solid Plastering",
    shortTitle: "Rendering & Plastering",
    breadcrumbName: "Rendering and Solid Plastering Melbourne",
    imageKey: "renderingAndSolidPlastering",
    imageAlt: "External render finish on a Melbourne home by Nicon Built",
  },
  {
    copySlug: "tiling-and-caulking",
    metaKey: "tiling-and-caulking-melbourne",
    slug: "/tiling-and-caulking-melbourne/",
    tileTitle: "Tiling and Caulking",
    shortTitle: "Tiling & Caulking",
    breadcrumbName: "Tiling and Caulking Melbourne",
    imageKey: "bathroomRenovations",
    imageAlt: "Tiling and caulking work in Melbourne by Nicon Built",
  },
  {
    copySlug: "plumbing",
    metaKey: "plumbing-melbourne",
    slug: "/plumbing-melbourne/",
    tileTitle: "Plumbing",
    shortTitle: "Plumbing",
    breadcrumbName: "Plumbing Melbourne",
    imageKey: "plumbing",
    imageAlt: "Plumber installing bathroom vanity plumbing — Nicon Built",
  },
  {
    copySlug: "roofing",
    metaKey: "roofing-melbourne",
    slug: "/roofing-melbourne/",
    tileTitle: "Roofing",
    shortTitle: "Roofing",
    breadcrumbName: "Roofing Melbourne",
    imageKey: "roofing",
    imageAlt: "Roofing repairs and maintenance in Melbourne by Nicon Built",
  },
  {
    copySlug: "brickwork-and-block-laying",
    metaKey: "brickwork-and-block-laying-melbourne",
    slug: "/brickwork-and-block-laying-melbourne/",
    tileTitle: "Brickwork and Block Laying",
    shortTitle: "Brickwork & Block Laying",
    breadcrumbName: "Brickwork and Block Laying Melbourne",
    imageKey: "brickworkAndBlockLaying",
    imageAlt: "Brick and block work on a Melbourne home by Nicon Built",
  },
  {
    copySlug: "concreting-and-paving",
    metaKey: "concreting-and-paving-melbourne",
    slug: "/concreting-and-paving-melbourne/",
    tileTitle: "Concreting and Paving",
    shortTitle: "Concreting & Paving",
    breadcrumbName: "Concreting and Paving Melbourne",
    imageKey: "concretingAndPaving",
    imageAlt: "Concrete and paving work at a Melbourne home by Nicon Built",
  },
  {
    copySlug: "electrical",
    metaKey: "electrical-melbourne",
    slug: "/electrical-melbourne/",
    tileTitle: "Electrical",
    shortTitle: "Electrical",
    breadcrumbName: "Electrical Melbourne",
    imageKey: "electrical",
    imageAlt: "Electrician working on a kitchen switchboard — Nicon Built",
  },
  {
    copySlug: "pest-control",
    metaKey: "pest-control-melbourne",
    slug: "/pest-control-melbourne/",
    tileTitle: "Pest Control",
    shortTitle: "Pest Control",
    breadcrumbName: "Pest Control Melbourne",
    imageKey: "pestControl",
    imageAlt: "Pest control services in Melbourne by Nicon Built",
  },
  {
    copySlug: "cleaning",
    metaKey: "cleaning-melbourne",
    slug: "/cleaning-melbourne/",
    tileTitle: "Cleaning",
    shortTitle: "Cleaning",
    breadcrumbName: "Cleaning Melbourne",
    imageKey: "cleaning",
    imageAlt: "Professional cleaning services in Melbourne by Nicon Built",
  },
  {
    copySlug: "heritage-renovations-restorations",
    metaKey: "heritage-renovations-melbourne",
    slug: "/heritage-renovations-melbourne/",
    tileTitle: "Heritage Renovations and Restorations",
    shortTitle: "Heritage Renovations",
    breadcrumbName: "Heritage Renovations Melbourne",
    imageKey: "heritageRenovations",
    imageAlt: "Heritage home renovation Melbourne by Nicon Built",
  },
  {
    copySlug: "heritage-home-extensions",
    metaKey: "heritage-home-extensions-melbourne",
    slug: "/heritage-home-extensions-melbourne/",
    tileTitle: "Heritage Home Extensions",
    shortTitle: "Heritage Extensions",
    breadcrumbName: "Heritage Home Extensions Melbourne",
    imageKey: "heritageExtensions",
    imageAlt: "Heritage home extension Melbourne by Nicon Built",
  },
  {
    copySlug: "home-renovations-extensions",
    metaKey: "home-renovations-melbourne",
    slug: "/home-renovations-melbourne/",
    tileTitle: "Home Renovations and Extensions",
    shortTitle: "Home Renovations",
    breadcrumbName: "Home Renovations Melbourne",
    imageKey: "homeRenovations",
    imageAlt: "Home renovation and extension Melbourne by Nicon Built",
  },
  {
    copySlug: "new-builds",
    metaKey: "new-builds-melbourne",
    slug: "/new-builds-melbourne/",
    tileTitle: "New Builds",
    shortTitle: "New Builds",
    breadcrumbName: "New Builds Melbourne",
    imageKey: "newBuilds",
    imageAlt: "Custom new home build Melbourne by Nicon Built",
  },
];

export const HOME_SERVICES = SERVICE_PAGES.slice(0, 14);
export const PROJECT_SERVICES = SERVICE_PAGES.slice(14);

export function getServicePage(metaKey: string): ServicePageConfig {
  const page = SERVICE_PAGES.find((p) => p.metaKey === metaKey);
  if (!page) throw new Error(`Unknown service page: ${metaKey}`);
  return page;
}

/** All service pages except the current one — used by "Explore our other services". */
export function getRelatedServicePages(excludeSlug?: string): ServicePageConfig[] {
  return SERVICE_PAGES.filter((page) => page.slug !== excludeSlug);
}
