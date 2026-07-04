import type { Metadata } from "next";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
}: PageMeta): Metadata {
  const url = `https://niconbuilt.com.au${path === "/" ? "/" : path}`;

  return {
    title,
    description,
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: "Nicon Built",
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: "https://niconbuilt.com.au/images/og-image.webp",
          width: 1200,
          height: 630,
          alt: "Heritage home renovation Melbourne by Nicon Built",
        },
      ],
    },
    alternates: { canonical: url },
  };
}

/** SEO titles and descriptions from docs/seo.md */
export const pageMeta: Record<string, { title: string; description: string }> =
  {
    home: {
      title: "Heritage Renovation & Custom Builder Melbourne | Nicon Built",
      description:
        "Heritage renovation builder in Melbourne with 30+ years experience. Victorian, Edwardian and Federation homes, extensions, kitchens, bathrooms and maintenance.",
    },
    about: {
      title: "About Nicon Built | Nick Kafkalas, Melbourne Builder",
      description:
        "Nick Kafkalas has personally run Nicon Built since 1990. VBA licensed and fully insured, with 30+ years building and renovating Melbourne's inner south.",
    },
    services: {
      title: "Building and Renovation Services Melbourne | Nicon Built",
      description:
        "Heritage renovations, extensions, kitchens, bathrooms, maintenance and new builds across Melbourne's inner south. Every job run personally by Nick Kafkalas.",
    },
    "heritage-renovations-melbourne": {
      title: "Heritage Home Renovations Melbourne | Nicon Built Builder",
      description:
        "Heritage renovation specialists for Victorian, Edwardian and Federation homes across Melbourne's inner south. 30+ years experience, VBA licensed builder.",
    },
    "heritage-home-extensions-melbourne": {
      title: "Heritage Home Extensions Melbourne | Nicon Built Builder",
      description:
        "Heritage-compliant home extensions across Melbourne's inner south. Period-accurate materials and council permits fully managed, 30+ years of experience.",
    },
    "kitchen-renovations-melbourne": {
      title: "Kitchen Renovations Melbourne | Nicon Built Builder",
      description:
        "Kitchen renovations across Melbourne's inner south, managed start to finish by a licensed builder. Structural, plumbing, tiling and cabinetry coordinated.",
    },
    "bathroom-renovations-melbourne": {
      title: "Bathroom Renovations Melbourne | Nicon Built Builder",
      description:
        "Bathroom renovations across Melbourne's inner south, managed trade by trade in the right order: waterproofing, tiling, plumbing, electrical and fixtures.",
    },
    "home-renovations-melbourne": {
      title: "Home Renovations & Extensions Melbourne | Nicon Built",
      description:
        "Home renovations and extensions across Melbourne's inner south. Plans and permits sorted? Nick Kafkalas runs the build from start to finish, no handoffs.",
    },
    "home-maintenance-melbourne": {
      title: "Home Maintenance & Trade Services Melbourne | Nicon Built",
      description:
        "One trusted team for all your trade and maintenance needs across Melbourne's inner south. Licensed builder, 30-year trade network, and no job too small.",
    },
    "new-builds-melbourne": {
      title: "New Builds & Dual Occupancy Melbourne | Nicon Built",
      description:
        "Custom homes and dual-occupancy builds across Melbourne's inner south since 1990. Architect-designed or design-and-build, run personally by Nick Kafkalas.",
    },
    "our-work": {
      title: "Our Work | Renovations & Builds Melbourne | Nicon Built",
      description:
        "A look through completed heritage restorations, renovations, extensions and new builds across Melbourne's inner south and bayside suburbs, by Nicon Built.",
    },
    testimonials: {
      title: "Client Reviews | Nicon Built Melbourne Heritage Builder",
      description:
        "Read what Nicon Built clients say about working with Nick Kafkalas: 5.0 stars and 9 Google reviews across 30+ years of heritage renovation and building.",
    },
    contact: {
      title: "Contact Nicon Built | Melbourne Heritage & Renovation Builder",
      description:
        "Get a free, no-obligation quote from Nicon Built today. Nick usually replies the same day, serving Melbourne's inner south and bayside suburbs since 1990.",
    },
    faq: {
      title: "Frequently Asked Questions | Nicon Built Melbourne Builder",
      description:
        "Answers to common questions about heritage renovations, extensions, kitchen and bathroom renovations, trades and maintenance across Melbourne's inner south.",
    },
    "privacy-policy": {
      title: "Privacy Policy | Nicon Built",
      description: "Privacy policy for Nicon Built Pty Ltd.",
    },
    "thank-you": {
      title: "Thank You | Nicon Built",
      description: "Thank you for contacting Nicon Built.",
    },
  };

export function locationMeta(suburb: string) {
  return {
    title: `Heritage Renovations in ${suburb} | Nicon Built`,
    description: `Heritage renovations and building services in ${suburb}, Melbourne. 30+ years experience, VBA licensed builder. Get a free quote from Nicon Built today.`,
  };
}
