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
    // pageMeta titles are complete SEO strings — bypass layout template to avoid doubled "| Nicon Built"
    title: { absolute: title },
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
          alt: "Home services and renovations Melbourne by Nicon Built",
        },
      ],
    },
    alternates: { canonical: url },
  };
}

/** SEO titles and descriptions — aligned with v8 copy */
export const pageMeta: Record<string, { title: string; description: string }> =
  {
    home: {
      title: "Home Services & Renovation Builder Melbourne | Nicon Built",
      description:
        "Everyday trades, kitchen and bathroom renovations, extensions and new builds across Melbourne's inner south. One reliable team, managed personally by Nick Kafkalas since 1990.",
    },
    about: {
      title: "About Nicon Built | Melbourne Home Services & Renovation Builder | Nicon Built",
      description:
        "Nick Kafkalas has personally run Nicon Built since 1990. VBA licensed and fully insured, coordinating trades, renovations and extensions across Melbourne's inner south.",
    },
    services: {
      title: "Home Services and Renovation Builder Melbourne | Nicon Built",
      description:
        "Plumbing, electrical, tiling, painting, carpentry, kitchen and bathroom renovations, property maintenance, heritage work and new builds. Every job run personally by Nick Kafkalas.",
    },
    "kitchen-renovations-melbourne": {
      title:
        "Kitchen Renovations Melbourne | Licensed Builder | Inner South and Bayside | Nicon Built",
      description:
        "Kitchen renovations across Melbourne's inner south, managed start to finish by a licensed builder. Structural, plumbing, tiling and cabinetry coordinated.",
    },
    "bathroom-renovations-melbourne": {
      title: "Bathroom Renovations Melbourne | Nicon Built Builder",
      description:
        "Bathroom renovations across Melbourne's inner south, managed trade by trade in the right order: waterproofing, tiling, plumbing, electrical and fixtures.",
    },
    "carpentry-and-joinery-melbourne": {
      title: "Carpentry and Joinery Melbourne | Nicon Built",
      description:
        "Decking, pergolas, doors, custom cabinetry and period joinery across Melbourne's inner south. Built properly and finished to last.",
    },
    "painting-and-plastering-melbourne": {
      title: "Painting and Plastering Melbourne | Nicon Built",
      description:
        "Interior and exterior painting with plaster repairs done properly first. Period homes and newer builds across Melbourne's inner south.",
    },
    "tiling-melbourne": {
      title: "Tiling Melbourne | Kitchens, Bathrooms and Outdoor | Nicon Built",
      description:
        "Kitchen, bathroom, laundry and outdoor tiling across Melbourne's inner south. Waterproofed where required, every joint consistent.",
    },
    "plumbing-melbourne": {
      title: "Plumbing Melbourne | Residential Plumbing | Nicon Built",
      description:
        "Residential plumbing, hot water systems, repairs and renovation coordination across Melbourne's inner south. Done to code, every time.",
    },
    "electrical-melbourne": {
      title: "Electrical Services Melbourne | Nicon Built",
      description:
        "Lighting, power points, switchboard upgrades and electrical coordination within renovations. Licensed electricians across Melbourne's inner south.",
    },
    "property-maintenance-melbourne": {
      title: "Property Maintenance Melbourne | Home Maintenance | Nicon Built",
      description:
        "One trusted team for home maintenance and trade coordination across Melbourne's inner south. Licensed builder, no job too small.",
    },
    "pest-control-melbourne": {
      title: "Pest Control Melbourne | Inspections & Treatments | Nicon Built",
      description:
        "Pest inspections and treatments across Melbourne's inner south, coordinated by a licensed builder. Termites, rodents, and general pest control.",
    },
    "cleaning-melbourne": {
      title: "Cleaning Melbourne | End-of-Job & Bond Cleans | Nicon Built",
      description:
        "End-of-job, bond, and regular cleaning across Melbourne's inner south. Coordinated after renovations or as a standalone service.",
    },
    "roofing-melbourne": {
      title: "Roofing Melbourne | Repairs & Maintenance | Nicon Built",
      description:
        "Roof repairs and maintenance across Melbourne's inner south. Tile and metal roofs, heritage homes, leak investigation and gutter coordination.",
    },
    "heritage-renovations-melbourne": {
      title: "Heritage Renovation and Restoration Melbourne | Nicon Built",
      description:
        "Heritage renovation specialists for Victorian, Edwardian and Federation homes across Melbourne's inner south. 30+ years experience, VBA licensed builder.",
    },
    "heritage-home-extensions-melbourne": {
      title: "Heritage Home Extensions Melbourne | Nicon Built Builder",
      description:
        "Heritage-compliant home extensions across Melbourne's inner south. Period-accurate materials and council permits fully managed, 30+ years of experience.",
    },
    "home-renovations-melbourne": {
      title: "Home Renovations & Extensions Melbourne | Nicon Built",
      description:
        "Home renovations and extensions across Melbourne's inner south. Plans and permits sorted? Nick Kafkalas runs the build from start to finish, no handoffs.",
    },
    "new-builds-melbourne": {
      title: "Custom Home Builder Melbourne | New Builds & Dual Occupancy | Nicon Built",
      description:
        "Custom homes and dual-occupancy builds across Melbourne's inner south since 1990. Architect-designed or design-and-build, run personally by Nick Kafkalas.",
    },
    "our-work": {
      title: "Our Work | Home Services & Renovations Melbourne | Nicon Built",
      description:
        "Completed kitchen and bathroom renovations, trade work, home extensions, heritage restorations and new builds across Melbourne's inner south by Nicon Built.",
    },
    testimonials: {
      title: "Client Reviews | Nicon Built Melbourne",
      description:
        "Read what Nicon Built clients say about working with Nick Kafkalas: 5.0 stars and 9 Google reviews across 30+ years of building across Melbourne's inner south.",
    },
    contact: {
      title: "Contact Nicon Built | Melbourne Home Services & Renovation Builder | Nicon Built",
      description:
        "Get in touch with Nicon Built today. Nick usually replies the same day, serving Melbourne's inner south and bayside suburbs since 1990.",
    },
    faq: {
      title: "Frequently Asked Questions | Nicon Built Melbourne",
      description:
        "Answers to common questions about home services, trades, kitchen and bathroom renovations, extensions and heritage work across Melbourne's inner south.",
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