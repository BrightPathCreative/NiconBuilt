import { HOME_SERVICES, PROJECT_SERVICES, SERVICE_PAGES } from "./service-page-config";

export { SERVICE_PAGES as services };

export const homeServices = HOME_SERVICES;
export const projectServices = PROJECT_SERVICES;

/** @deprecated Use homeServices — kept for imports during migration */
export const buildingServices = SERVICE_PAGES;

/** Footer trade column now maps to home service pages */
export const tradeServices = HOME_SERVICES;

export const locationPages = [
  { suburb: "Brighton", slug: "/heritage-renovations-brighton/" },
  { suburb: "Armadale", slug: "/heritage-renovations-armadale/" },
  { suburb: "Malvern", slug: "/heritage-renovations-malvern/" },
  { suburb: "Albert Park", slug: "/heritage-renovations-albert-park/" },
  { suburb: "Elwood", slug: "/heritage-renovations-elwood/" },
] as const;

export const headerNav = [
  { label: "Our Work", href: "/our-work/" },
  { label: "About", href: "/about/" },
] as const;

export const mainNav = [
  { label: "Home", href: "/" },
  ...headerNav,
  { label: "Contact", href: "/contact/" },
] as const;

export const footerNav = [
  { label: "Services", href: "/services/" },
  { label: "Our Work", href: "/our-work/" },
  { label: "Blog", href: "/blog/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "FAQ", href: "/faq/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
] as const;
