import type { Metadata } from "next";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
};

function resolveOgImageUrl(imagePath: string): string {
  return imagePath.startsWith("http") ? imagePath : `${siteConfig.url}${imagePath}`;
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
  ogImage,
  ogImageAlt,
}: PageMeta): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "/" : path}`;
  const imagePath = ogImage ?? images.ogImage;

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
          url: resolveOgImageUrl(imagePath),
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? description.slice(0, 120),
        },
      ],
    },
    alternates: { canonical: url },
  };
}

/** SEO titles and descriptions — aligned with v8 copy */
export const pageMeta: Record<
  string,
  { title: string; description: string; ogImage?: string; ogImageAlt?: string }
> = {
  home: {
    title: "Melbourne Home Services | Trades & Maintenance | Nicon Built",
    description:
      "Plumbing, electrical, painting, tiling, carpentry, roofing, pest control and property maintenance across Melbourne's inner south. One licensed team, start to finish.",
    ogImage: images.homeHero,
    ogImageAlt: "Home services and property maintenance Melbourne by Nicon Built",
  },
  about: {
    title: "About Nicon Built | VBA Licensed Home Services | Nicon Built",
    description:
      "Nicon Built is a VBA licensed builder coordinating trades, property maintenance, kitchen and bathroom renovations and extensions across Melbourne's inner south. One team, one point of contact.",
    ogImage: images.nickPortrait,
    ogImageAlt: "Nicon Built — Melbourne home services and trades",
  },
  services: {
    title: "Home Services and Renovation Builder Melbourne | Nicon Built",
    description:
      "Plumbing, electrical, tiling, painting, rendering, brickwork, concreting, carpentry, kitchen and bathroom renovations, property maintenance, heritage work and new builds. Every job run by the Nicon Built team.",
    ogImage: images.propertyMaintenance,
    ogImageAlt: "Home services across Melbourne by Nicon Built",
  },
  "kitchen-renovations-melbourne": {
    title: "Kitchen Renovations Melbourne | Licensed Builder | Nicon Built",
    description:
      "Kitchen renovations across Melbourne's inner south, managed start to finish by a licensed builder. Structural, plumbing, tiling and cabinetry coordinated.",
    ogImage: images.kitchenRenovations,
    ogImageAlt: "Kitchen renovation in Melbourne by Nicon Built",
  },
  "bathroom-renovations-melbourne": {
    title: "Bathroom Renovations Melbourne | Nicon Built Builder",
    description:
      "Bathroom renovations across Melbourne's inner south, managed trade by trade in the right order: waterproofing, tiling, plumbing, electrical and fixtures.",
    ogImage: images.bathroomRenovations,
    ogImageAlt: "Bathroom renovation in Melbourne by Nicon Built",
  },
  "carpentry-and-joinery-melbourne": {
    title: "Carpentry and Joinery Melbourne | Nicon Built",
    description:
      "Decking, pergolas, doors, custom cabinetry and period joinery across Melbourne's inner south. Built properly and finished to last.",
    ogImage: images.homeRenovations,
    ogImageAlt: "Carpentry and joinery work in Melbourne by Nicon Built",
  },
  "painting-and-plastering-melbourne": {
    title: "Painting and Plastering Melbourne | Nicon Built",
    description:
      "Interior and exterior painting with plaster repairs done properly first. Period homes and newer builds across Melbourne's inner south.",
    ogImage: images.cleaning,
    ogImageAlt: "Painting and plastering in Melbourne by Nicon Built",
  },
  "rendering-and-solid-plastering-melbourne": {
    title: "Rendering and Solid Plastering Melbourne | Nicon Built",
    description:
      "External acrylic render, solid plaster and interior wall finishing across Melbourne's inner south. Heritage homes and new builds, fully coordinated by a licensed builder.",
    ogImage: images.renderingAndSolidPlastering,
    ogImageAlt: "External render finish on a Melbourne home by Nicon Built",
  },
  "tiling-and-caulking-melbourne": {
    title: "Tiling & Caulking Melbourne | Inner South | Nicon Built",
    description:
      "Kitchen, bathroom and outdoor tiling plus professional caulking and silicone sealing across Melbourne's inner south and bayside. Waterproofed where required.",
    ogImage: images.bathroomRenovations,
    ogImageAlt: "Tiling and caulking in Melbourne by Nicon Built",
  },
  "plumbing-melbourne": {
    title: "Plumbing Melbourne | Residential Plumbing | Nicon Built",
    description:
      "Residential plumbing, hot water systems, repairs and renovation coordination across Melbourne's inner south. Done to code, every time.",
    ogImage: images.plumbing,
    ogImageAlt: "Residential plumbing in Melbourne by Nicon Built",
  },
  "electrical-melbourne": {
    title: "Electrical Services Melbourne | Nicon Built",
    description:
      "Lighting, power points, switchboard upgrades and electrical coordination within renovations. Licensed electricians across Melbourne's inner south.",
    ogImage: images.electrical,
    ogImageAlt: "Electrical services in Melbourne by Nicon Built",
  },
  "property-maintenance-melbourne": {
    title: "Property Maintenance Melbourne | Home Maintenance | Nicon Built",
    description:
      "One trusted team for home maintenance and trade coordination across Melbourne's inner south. Licensed builder, no job too small.",
    ogImage: images.propertyMaintenance,
    ogImageAlt: "Property maintenance at a Melbourne heritage home by Nicon Built",
  },
  "pest-control-melbourne": {
    title: "Pest Control Melbourne | Inspections & Treatments | Nicon Built",
    description:
      "Pest inspections and treatments across Melbourne's inner south, coordinated by a licensed builder. Termites, rodents, and general pest control.",
    ogImage: images.pestControl,
    ogImageAlt: "Pest control services in Melbourne by Nicon Built",
  },
  "cleaning-melbourne": {
    title: "Cleaning Melbourne | End-of-Job & Bond Cleans | Nicon Built",
    description:
      "End-of-job, bond, and regular cleaning across Melbourne's inner south. Coordinated after renovations or as a standalone service.",
    ogImage: images.cleaning,
    ogImageAlt: "Professional cleaning services in Melbourne by Nicon Built",
  },
  "roofing-melbourne": {
    title: "Roofing Melbourne | Repairs & Maintenance | Nicon Built",
    description:
      "Roof repairs and maintenance across Melbourne's inner south. Tile and metal roofs, heritage homes, leak investigation and gutter coordination.",
    ogImage: images.roofing,
    ogImageAlt: "Roof repairs and maintenance in Melbourne by Nicon Built",
  },
  "brickwork-and-block-laying-melbourne": {
    title: "Brickwork and Block Laying Melbourne | Nicon Built",
    description:
      "Brick and block laying, repairs and repointing across Melbourne's inner south. Heritage brickwork, new walls and extensions, coordinated by a licensed builder.",
    ogImage: images.brickworkAndBlockLaying,
    ogImageAlt: "Brickwork and block laying in Melbourne by Nicon Built",
  },
  "concreting-and-paving-melbourne": {
    title: "Concreting and Paving Melbourne | Nicon Built",
    description:
      "Driveways, paths, polished concrete and paving across Melbourne's inner south. New pours, repairs and outdoor hardscaping, fully managed by Nicon Built.",
    ogImage: images.concretingAndPaving,
    ogImageAlt: "Concreting and paving in Melbourne by Nicon Built",
  },
  "heritage-renovations-melbourne": {
    title: "Heritage Renovation and Restoration Melbourne | Nicon Built",
    description:
      "Heritage renovation specialists for Victorian, Edwardian and Federation homes across Melbourne's inner south. 30+ years experience, VBA licensed builder.",
    ogImage: images.heritageRenovations,
    ogImageAlt: "Heritage home renovation Melbourne by Nicon Built",
  },
  "heritage-home-extensions-melbourne": {
    title: "Heritage Home Extensions Melbourne | Nicon Built Builder",
    description:
      "Heritage-compliant home extensions across Melbourne's inner south. Period-accurate materials and council permits fully managed, 30+ years of experience.",
    ogImage: images.heritageExtensions,
    ogImageAlt: "Heritage home extension Melbourne by Nicon Built",
  },
  "home-renovations-melbourne": {
    title: "Home Renovations & Extensions Melbourne | Nicon Built",
    description:
      "Home renovations and extensions across Melbourne's inner south. Plans and permits sorted? Nicon Built runs the build from start to finish, no handoffs.",
    ogImage: images.homeRenovations,
    ogImageAlt: "Home renovation and extension Melbourne by Nicon Built",
  },
  "new-builds-melbourne": {
    title: "Custom Home Builder Melbourne | New Builds & Dual Occupancy | Nicon Built",
    description:
      "Custom homes and dual-occupancy builds across Melbourne's inner south since 1990. Architect-designed or design-and-build, managed by Nicon Built from start to finish.",
    ogImage: images.newBuilds,
    ogImageAlt: "Custom new home build Melbourne by Nicon Built",
  },
  "our-work": {
    title: "Our Work | Home Services & Trade Projects | Nicon Built",
    description:
      "Completed plumbing, electrical, painting, tiling, maintenance, kitchen and bathroom work across Melbourne's inner south. Real home service projects by Nicon Built.",
    ogImage: images.gallery[0],
    ogImageAlt: "Completed home services project by Nicon Built, Melbourne",
  },
  testimonials: {
    title: "Client Reviews | Nicon Built Melbourne",
    description:
      "Read what Nicon Built clients say — 5 star Google reviews from homeowners across Melbourne's inner south.",
    ogImage: images.nickPortrait,
    ogImageAlt: "Nicon Built client reviews — Melbourne home services",
  },
  contact: {
    title: "Contact Nicon Built | Melbourne Home Services Builder",
    description:
      "Get in touch with Nicon Built today. We usually reply the same day, serving Melbourne's inner south and bayside suburbs.",
    ogImage: images.homeHero,
    ogImageAlt: "Contact Nicon Built — Melbourne home services and renovations",
  },
  faq: {
    title: "Frequently Asked Questions | Nicon Built Melbourne",
    description:
      "Answers to common questions about home services, trades, kitchen and bathroom renovations, extensions and heritage work across Melbourne's inner south.",
    ogImage: images.serviceAreaMap,
    ogImageAlt: "Nicon Built service areas across Melbourne's inner south",
  },
  "privacy-policy": {
    title: "Privacy Policy | Nicon Built",
    description:
      "How Nicon Built Pty Ltd collects, uses and protects personal information submitted through our contact form and website analytics.",
    ogImage: images.ogImage,
    ogImageAlt: "Nicon Built — Melbourne home services and renovations",
  },
  "cookie-policy": {
    title: "Cookie Policy | Nicon Built",
    description:
      "How Nicon Built uses cookies and similar technologies for analytics, contact forms and website functionality.",
    ogImage: images.ogImage,
    ogImageAlt: "Nicon Built — Melbourne home services and renovations",
  },
  "thank-you": {
    title: "Thank You | Nicon Built",
    description: "Thank you for contacting Nicon Built.",
    ogImage: images.ogImage,
    ogImageAlt: "Nicon Built — Melbourne home services and renovations",
  },
};
