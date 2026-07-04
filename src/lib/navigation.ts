export const services = [
  {
    title: "Heritage Renovations and Restorations",
    slug: "/heritage-renovations-melbourne/",
    shortTitle: "Heritage Renovations",
  },
  {
    title: "Heritage Home Extensions",
    slug: "/heritage-home-extensions-melbourne/",
    shortTitle: "Heritage Extensions",
  },
  {
    title: "Kitchen Renovations",
    slug: "/kitchen-renovations-melbourne/",
    shortTitle: "Kitchen Renovations",
  },
  {
    title: "Bathroom Renovations",
    slug: "/bathroom-renovations-melbourne/",
    shortTitle: "Bathroom Renovations",
  },
  {
    title: "Home Renovations and Extensions",
    slug: "/home-renovations-melbourne/",
    shortTitle: "Home Renovations",
  },
  {
    title: "Trades and Maintenance",
    slug: "/home-maintenance-melbourne/",
    shortTitle: "Trades & Maintenance",
  },
  {
    title: "New Builds",
    slug: "/new-builds-melbourne/",
    shortTitle: "New Builds",
  },
] as const;

export const locationPages = [
  { suburb: "Brighton", slug: "/heritage-renovations-brighton/" },
  { suburb: "Armadale", slug: "/heritage-renovations-armadale/" },
  { suburb: "Malvern", slug: "/heritage-renovations-malvern/" },
  { suburb: "Albert Park", slug: "/heritage-renovations-albert-park/" },
  { suburb: "Elwood", slug: "/heritage-renovations-elwood/" },
] as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/our-work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const footerNav = [
  { label: "Services", href: "/services/" },
  { label: "Our Work", href: "/our-work/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "FAQ", href: "/faq/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
] as const;
