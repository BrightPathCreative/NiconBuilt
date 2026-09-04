import type { Metadata } from "next";
import { loadCopy, type FaqItem, type Review } from "@/lib/copy";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { getServiceCarouselSlides, type CarouselSlide } from "@/lib/service-carousel";

/**
 * Google Ads landing pages.
 *
 * These are dedicated paid-traffic duplicates of the organic service pages, not
 * replacements for them. Three rules keep the two sets from working against
 * each other:
 *
 * 1. Body copy, bullets and FAQs are read from the same approved copy files the
 *    organic pages use (`docs/copy/*.md`), so there is still one source of
 *    truth. Only the ad-facing framing — H1, sub-headline, benefit lines, the
 *    three-step explainer — is written here, because it has to message-match
 *    the ad group it sits under.
 * 2. Every landing page is `noindex, follow: false` (see `buildLandingMetadata`)
 *    and is left out of the sitemap, so it can never compete with the organic
 *    page it was duplicated from. It is deliberately NOT blocked in robots.txt:
 *    Googlebot has to be able to fetch the page to see the noindex, and
 *    AdsBot-Google isn't covered by the `User-agent: *` rules anyway.
 * 3. `organicUrl` records which page each one was duplicated from, so when the
 *    approved copy changes, both get updated together.
 */

export type LandingStep = {
  title: string;
  body: string;
};

export type LandingPageConfig = {
  /** Route key and URL segment under /lp/. */
  key: string;
  slug: string;
  /** The Google Ads campaign / ad group this page is the destination for. */
  campaign: string;
  /** Organic page this was duplicated from — keep the two in sync. */
  organicUrl: string;
  /** Approved copy file (docs/copy/<copySlug>.md) supplying body copy and FAQs. */
  copySlug: string;
  /** service-carousel key for the project photo set. */
  carouselKey: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  ogImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  /** H1 — carries the ad group's head term. */
  headline: string;
  subheadline: string;
  /** Short proof lines beside the hero form. */
  heroBenefits: string[];
  /** Lead-in above the body copy. */
  approachTitle: string;
  bulletsTitle: string;
  /** Scope list. Empty means "take the approved copy's What's included list". */
  bullets: string[];
  steps: LandingStep[];
  /** Review authors to feature, matched against docs/copy/testimonials.md. */
  reviewAuthors: string[];
  /** Closing conversion band. */
  closingTitle: string;
  closingBody: string;
};

const LANDING_PAGES: LandingPageConfig[] = [
  {
    key: "property-maintenance-melbourne",
    slug: "/lp/property-maintenance-melbourne/",
    campaign: "Property & Home Maintenance",
    organicUrl: "/property-maintenance-melbourne/",
    copySlug: "property-maintenance",
    carouselKey: "property-maintenance-melbourne",
    metaTitle: "Property & Home Maintenance Melbourne | Free Quote | Nicon Built",
    metaDescription:
      "One licensed builder managing every trade around your home. Painting, tiling, plumbing, electrical and repairs across Melbourne's inner south. Free quote, no job too small.",
    ogImage: images.propertyMaintenance,
    ogImageAlt: "Property maintenance at a Melbourne heritage home by Nicon Built",
    heroImage: images.propertyMaintenance,
    heroImageAlt:
      "Property maintenance work at a Melbourne heritage home by Nicon Built",
    headline: "Property & Home Maintenance in Melbourne",
    subheadline:
      "One call, one team, everything managed. Painters, tilers, plumbers, plasterers, electricians — coordinated by a VBA licensed builder. No job is too small.",
    heroBenefits: [
      "Free, no-obligation quote",
      "One point of contact — we coordinate every trade",
      "VBA licensed builder · Fully insured · 30+ years",
    ],
    approachTitle: "Why hand it to one team",
    bulletsTitle: "What we take care of",
    bullets: [],
    steps: [
      {
        title: "Tell us what needs doing",
        body: "One brief at the start — the whole list, big jobs and small. No need to work out who does what.",
      },
      {
        title: "We coordinate the trades",
        body: "Scheduling, sequencing, access and quality control are on us. You don't chase anyone.",
      },
      {
        title: "Done properly, once",
        body: "Every trade comes from a network we've worked with for years, and every job is held to our standard.",
      },
    ],
    reviewAuthors: ["Mary Katsianos", "Helen Stephanou", "Vicki"],
    closingTitle: "Get your maintenance list quoted",
    closingBody:
      "Send through what needs doing and we'll come back with straight answers, not sales talk. Free quote, no obligation.",
  },
  {
    key: "structural-remedial-restoration-melbourne",
    slug: "/lp/structural-remedial-restoration-melbourne/",
    campaign: "Structural Remedial & Restoration",
    organicUrl: "/heritage-renovations-melbourne/",
    copySlug: "heritage-renovations-restorations",
    carouselKey: "heritage-renovations-melbourne",
    metaTitle:
      "Structural Remedial & Restoration Melbourne | Licensed Builder | Nicon Built",
    metaDescription:
      "Structural remedial work and period home restoration across Melbourne's inner south. Heritage overlays, permits and period materials managed by a VBA licensed builder. Free quote.",
    ogImage: images.heritageRenovations,
    ogImageAlt: "Heritage home restoration in Melbourne by Nicon Built",
    heroImage: images.heritageRenovations,
    heroImageAlt: "Heritage home restoration in Melbourne by Nicon Built",
    headline: "Structural Remedial & Restoration in Melbourne",
    subheadline:
      "Victorian, Edwardian and Federation homes restored properly. Permit-required structural work, heritage overlays and period materials, all managed end to end by a VBA licensed builder.",
    heroBenefits: [
      "Free, no-obligation assessment",
      "Permit-required structural work a handyman can't legally do",
      "30+ years on Melbourne's period homes · VBA licensed · Fully insured",
    ],
    approachTitle: "Why period homes need a specialist",
    bulletsTitle: "What we take on",
    bullets: [
      "Minor structural repairs and alterations",
      "Building permit-required work",
      "Subfloor and framing repairs",
      "Load-bearing wall modifications",
      "Coordination with engineers where required",
      "Heritage overlay documentation reviewed before work starts",
      "Council heritage permit requirements handled start to finish",
      "Lime mortars, clinker brickwork, decorative plasterwork and period joinery",
      "Period-specific materials sourced through a 30-year specialist supplier network",
      "One team running the whole job, start to finish",
    ],
    steps: [
      {
        title: "Assessment before anything moves",
        body: "We read the heritage overlay documentation and walk the property with you before a tool is picked up.",
      },
      {
        title: "Surprises flagged early",
        body: "Period homes throw up surprises. We've seen most of them, and we plan for them upfront rather than mid-build.",
      },
      {
        title: "One team, start to finish",
        body: "Permits, period-appropriate materials and every trade managed by Nicon Built. One point of responsibility.",
      },
    ],
    reviewAuthors: ["Vicki", "Tony and Mary", "James O'Carroll"],
    closingTitle: "Get your property assessed",
    closingBody:
      "Tell us what the home is doing and what you want done. We'll walk it with you and flag the challenges early. Free quote, no obligation.",
  },
];

export type ResolvedLandingPage = LandingPageConfig & {
  /** First paragraph of the approved copy — rendered as the lead statement. */
  leadParagraph?: string;
  paragraphs: string[];
  resolvedBullets: string[];
  faqs: FaqItem[];
  reviews: Review[];
  slides: CarouselSlide[];
};

export function getLandingPage(key: string): ResolvedLandingPage {
  const config = LANDING_PAGES.find((page) => page.key === key);
  if (!config) throw new Error(`Unknown landing page: ${key}`);

  const copy = loadCopy(config.copySlug);
  const [leadParagraph, ...paragraphs] = copy.paragraphs;
  const testimonials = loadCopy("testimonials").reviews;

  return {
    ...config,
    leadParagraph,
    paragraphs,
    resolvedBullets: config.bullets.length ? config.bullets : copy.bullets,
    faqs: copy.faqs,
    // Keep the order the config asks for, and silently drop any author that has
    // since been edited out of the approved reviews rather than rendering a gap.
    reviews: config.reviewAuthors
      .map((author) => testimonials.find((review) => review.author === author))
      .filter((review): review is Review => Boolean(review)),
    slides: getServiceCarouselSlides(config.carouselKey),
  };
}

export { LANDING_PAGES };

/**
 * Landing pages are `noindex, follow: false` with a self-referencing canonical.
 * Self-canonical rather than pointing at `organicUrl`: a canonical to a
 * different URL alongside a noindex sends Google two contradictory
 * instructions, and the one it acts on isn't predictable.
 */
export function buildLandingMetadata(page: ResolvedLandingPage): Metadata {
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.slug,
    noIndex: true,
    ogImage: page.ogImage,
    ogImageAlt: page.ogImageAlt,
  });
}
