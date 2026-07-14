/** Public image paths mapped to manifest slots */
export const images = {
  homeHero: "/images/home-hero-bg.webp",
  homeHeroMobile: "/images/home-hero-bg-mobile.webp",
  nickPortrait: "/images/about-nick-portrait.webp",
  heritageRenovations: "/images/heritage-renovations-page-01.webp",
  heritageExtensions: "/images/heritage-extensions-page-01.webp",
  kitchenRenovations: "/images/kitchen-renovations-page-01.webp",
  bathroomRenovations: "/images/bathroom-renovations-page-01.webp",
  homeRenovations: "/images/home-renovations-page-01.webp",
  tradesMaintenance: "/images/trades-maintenance-page-01.webp",
  pestControl: "/images/pest-control-page-01.webp",
  cleaning: "/images/cleaning-page-01.webp",
  roofing: "/images/roofing-page-01.webp",
  newBuilds: "/images/new-builds-page-01.webp",
  plumbing: "/images/plumbing-page-01.webp",
  electrical: "/images/electrical-page-01.webp",
  propertyMaintenance: "/images/property-maintenance-page-01.webp",
  emergencyMakeSafe: "/images/emergency-make-safe.webp",
  renderingAndSolidPlastering: "/images/rendering-and-solid-plastering-page-01.webp",
  brickworkAndBlockLaying: "/images/brickwork-and-block-laying-page-01.webp",
  concretingAndPaving: "/images/concreting-and-paving-page-01.webp",
  serviceAreaMap: "/images/service-area-map.webp",
  ogImage: "/images/og-image.webp",
  gallery: Array.from({ length: 12 }, (_, i) =>
    `/images/our-work-gallery-${String(i + 1).padStart(2, "0")}.webp`
  ),
} as const;

export type ServiceImageKey = keyof Pick<
  typeof images,
  | "heritageRenovations"
  | "heritageExtensions"
  | "kitchenRenovations"
  | "bathroomRenovations"
  | "homeRenovations"
  | "tradesMaintenance"
  | "pestControl"
  | "cleaning"
  | "roofing"
  | "newBuilds"
  | "plumbing"
  | "electrical"
  | "propertyMaintenance"
  | "renderingAndSolidPlastering"
  | "brickworkAndBlockLaying"
  | "concretingAndPaving"
>;
