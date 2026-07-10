/** Server-side HTTP 301 redirects — Vercel/next.config, not client JS.
 * Source of truth for mapping decisions: docs/redirects-map.csv
 */
import { locationPages } from "./navigation";

export const redirects: {
  source: string;
  destination: string;
  permanent: boolean;
}[] = [
  // Old portfolio/work paths
  { source: "/work", destination: "/our-work/", permanent: true },
  { source: "/work/:path*", destination: "/our-work/", permanent: true },
  { source: "/portfolio-items", destination: "/our-work/", permanent: true },
  { source: "/portfolio-items/:path*", destination: "/our-work/", permanent: true },
  { source: "/videos", destination: "/our-work/", permanent: true },
  { source: "/project-showcase-yarraville", destination: "/our-work/", permanent: true },

  // Guarantees & team → about
  { source: "/guarantees", destination: "/about/", permanent: true },
  { source: "/team", destination: "/about/", permanent: true },

  // Build areas hub
  { source: "/build-areas", destination: "/home-renovations-melbourne/", permanent: true },
  { source: "/build-areas/:path*", destination: "/home-renovations-melbourne/", permanent: true },

  // Old thank-you pages
  {
    source: "/custom-home-builders-thank-you",
    destination: "/thank-you/",
    permanent: true,
  },

  // Unbounce landing pages
  { source: "/unbounce-pages/:path*", destination: "/", permanent: true },

  // WP archives / taxonomies / testimonial CPT
  { source: "/category", destination: "/blog/", permanent: true },
  { source: "/category/:path*", destination: "/blog/", permanent: true },
  { source: "/tag", destination: "/blog/", permanent: true },
  { source: "/tag/:path*", destination: "/blog/", permanent: true },
  { source: "/theplus_testimonial", destination: "/testimonials/", permanent: true },
  { source: "/theplus_testimonial/:path*", destination: "/testimonials/", permanent: true },

  // Suburb builder pages → location or service pages
  ...generateBuilderRedirects(),

  // Multi-unit / townhouse builders
  ...generateMultiUnitRedirects(),

  // Custom home builder city pages → home renovations
  ...generateCityBuilderRedirects(),

  // Heritage home builder city pages → heritage renovations
  ...generateHeritageCityRedirects(),

  // Design-build pages → new builds
  ...generateDesignBuildRedirects(),

  // Old blog posts at root → /blog/{slug}/ or /blog/
  ...generateBlogRedirects(),

  // v8 service slug consolidation
  { source: "/home-maintenance-melbourne", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/home-maintenance-melbourne/", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/plumbing-maintenance-melbourne", destination: "/plumbing-melbourne/", permanent: true },
  { source: "/plumbing-maintenance-melbourne/", destination: "/plumbing-melbourne/", permanent: true },
  { source: "/painting-melbourne", destination: "/painting-and-plastering-melbourne/", permanent: true },
  { source: "/painting-melbourne/", destination: "/painting-and-plastering-melbourne/", permanent: true },
  { source: "/plastering-melbourne", destination: "/painting-and-plastering-melbourne/", permanent: true },
  { source: "/plastering-melbourne/", destination: "/painting-and-plastering-melbourne/", permanent: true },
  { source: "/general-repairs-melbourne", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/general-repairs-melbourne/", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/minor-structural-repairs-melbourne", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/minor-structural-repairs-melbourne/", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/fixture-replacements-melbourne", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/fixture-replacements-melbourne/", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/caulking-melbourne", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/caulking-melbourne/", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/brickwork-repairs-melbourne", destination: "/property-maintenance-melbourne/", permanent: true },
  { source: "/brickwork-repairs-melbourne/", destination: "/property-maintenance-melbourne/", permanent: true },
];

function suburbSlugFromPath(pathname: string): string | null {
  const patterns = [
    /^\/builders-(.+)\/?$/,
    /^\/home-builders-(.+)\/?$/,
    /^\/multi-unit-builders-(.+)\/?$/,
    /^\/townhouse-builders-(.+)\/?$/,
  ];
  for (const pattern of patterns) {
    const match = pathname.match(pattern);
    if (match) return match[1].replace(/\/$/, "");
  }
  return null;
}

function locationDestination(suburb: string): string {
  const normalized = suburb.replace(/-/g, " ").toLowerCase();
  const match = locationPages.find(
    (p) => p.suburb.toLowerCase().replace(/\s+/g, " ") === normalized.replace(/\s+/g, " ")
  );
  if (match) return match.slug;
  // Map common suburb slugs to closest location page or home renovations
  const suburbMap: Record<string, string> = {
    brighton: "/heritage-renovations-brighton/",
    armadale: "/heritage-renovations-armadale/",
    armdale: "/heritage-renovations-armadale/", // old WP typo
    malvern: "/heritage-renovations-malvern/",
    "albert-park": "/heritage-renovations-albert-park/",
    elwood: "/heritage-renovations-elwood/",
    "south-yarra": "/heritage-renovations-malvern/",
    toorak: "/heritage-renovations-malvern/",
    caulfield: "/heritage-renovations-brighton/",
    bentleigh: "/heritage-renovations-brighton/",
    hampton: "/heritage-renovations-brighton/",
    "port-melbourne": "/home-renovations-melbourne/",
    newport: "/home-renovations-melbourne/",
    spotswood: "/home-renovations-melbourne/",
    seddon: "/home-renovations-melbourne/",
    williamstown: "/home-renovations-melbourne/",
    "south-melbourne": "/home-renovations-melbourne/",
    "st-kilda": "/home-renovations-melbourne/",
    "st-kilda-west": "/home-renovations-melbourne/",
  };
  return suburbMap[suburb] ?? "/home-renovations-melbourne/";
}

function generateBuilderRedirects() {
  const suburbs = [
    "elwood",
    "brighton",
    "armadale",
    "armdale", // typo in old WP URL — keep as source
    "malvern",
    "albert-park",
    "south-yarra",
    "toorak",
    "bentleigh",
    "hampton",
    "caulfield",
    "port-melbourne",
    "newport",
    "spotswood",
    "seddon",
    "williamstown",
    "south-melbourne",
    "st-kilda",
    "st-kilda-west",
    "middle-park",
    "sandringham",
    "beaumaris",
    "moorabbin",
    "elsternwick",
    "camberwell",
    "hawthorn",
    "kew",
  ];
  const rules: { source: string; destination: string; permanent: boolean }[] = [];
  for (const suburb of suburbs) {
    rules.push({
      source: `/builders-${suburb}`,
      destination: locationDestination(suburb),
      permanent: true,
    });
    rules.push({
      source: `/home-builders-${suburb}`,
      destination: locationDestination(suburb),
      permanent: true,
    });
  }
  return rules;
}

function generateMultiUnitRedirects() {
  const suburbs = [
    "brighton",
    "armadale",
    "malvern",
    "elwood",
    "caulfield",
    "bentleigh",
    "hampton",
    "sandringham",
    "st-kilda",
    "port-melbourne",
    "altona-north",
    "newport",
    "south-melbourne",
    "williamstown",
  ];
  return suburbs.flatMap((suburb) => [
    {
      source: `/multi-unit-builders-${suburb}`,
      destination: "/new-builds-melbourne/",
      permanent: true,
    },
    {
      source: `/townhouse-builders-${suburb}`,
      destination: "/new-builds-melbourne/",
      permanent: true,
    },
  ]);
}

function generateCityBuilderRedirects() {
  const cities = [
    "custom-home-builders-city-of-stonnington",
    "custom-home-builders-city-of-glen-eira",
    "custom-home-builders-city-of-port-phillip",
    "custom-home-builders-bayside-city",
    "custom-homes-builders-city-of-stonnington",
    "custom-home-builders-city-of-boroondara",
    "custom-home-builders-newport",
  ];
  return cities.map((slug) => ({
    source: `/${slug}`,
    destination: "/home-renovations-melbourne/",
    permanent: true,
  }));
}

function generateHeritageCityRedirects() {
  const cities = [
    "heritage-home-builders-city-of-port-phillip",
    "heritage-home-builders-bayside-city",
    "heritage-home-builders-city-of-glen-eira",
    "heritage-home-builders-city-of-boroondara",
    "heritage-home-builders-city-of-stonnington",
  ];
  return cities.map((slug) => ({
    source: `/${slug}`,
    destination: "/heritage-renovations-melbourne/",
    permanent: true,
  }));
}

function generateDesignBuildRedirects() {
  const cities = [
    "design-build-bayside-city",
    "design-build-city-of-stonnington",
    "design-build-city-of-port-phillip",
    "design-build-city-of-glen-eira",
    "design-build-city-of-boroondara",
  ];
  return cities.map((slug) => ({
    source: `/${slug}`,
    destination: "/new-builds-melbourne/",
    permanent: true,
  }));
}

/** Kept posts → /blog/{slug}/; removed posts → /blog/ hub (not homepage). */
function generateBlogRedirects() {
  const keptSlugs = [
    "build-your-home-efficiently-and-affordably-with-nicon-built",
    "fabulous-at-40-why-experience-matters-in-building",
    "how-to-design-for-a-narrow-block",
    "how-to-keep-your-build-within-budget",
    "renovation-inspirations-before-and-after-success-project-port-melbourne",
    "should-i-renovate-or-build-new-nicon-built",
    "the-importance-of-collaboration-in-building",
    "the-keys-to-a-successful-modern-heritage-extension",
    "top-building-tips-from-an-architectural-builder",
    "understanding-prime-cost-and-provisional-sum",
  ];

  const removedRootSlugs = [
    "3-heritage-home-styles-youll-see-around-melbourne",
    "3-ways-to-invite-the-outside-into-your-home",
    "5-benefits-to-design-and-build",
    "5-elements-of-a-modern-bathroom-design",
    "5-reasons-why-you-should-rebuild-your-home",
    "5-things-to-keep-in-mind-when-designing-your-dream-kitchen",
    "5-ways-an-extension-can-add-value-to-your-home",
    "6-tips-for-downsizers-empty-nesters",
    "7-essential-elements-every-luxury-home-needs",
    "architectural-design-qa-with-nicon-built-architect-john-caporaso",
    "architectural-home-design-whats-trending-in-2022",
    "building-your-first-home-with-a-pool",
    "conversions-you-need-for-a-warmer-winter-home",
    "creating-the-ultimate-open-plan-living-space",
    "how-to-choose-a-builder",
    "how-to-create-a-timeless-duplex-design",
    "how-to-downsize-with-the-future-in-mind",
    "how-to-ensure-your-project-is-delivered-on-time",
    "how-to-maximise-space-in-your-home",
    "how-to-set-a-realistic-building-budget",
    "innovative-design-trends-transforming-homes-in-2024",
    "is-design-build-the-right-choice-for-your-new-home",
    "keeping-ahead-of-the-curve-future-proofing-your-home",
    "maximising-the-aspects-of-your-home",
    "multi-unit-development-finance-explained",
    "outdoor-living-that-feels-like-a-vacation",
    "the-future-of-smart-homes-integrating-technology-into-your-build",
    "the-pros-and-cons-of-installing-skylights",
    "the-ultimate-guide-to-designing-your-architectural-home",
    "what-permits-do-you-need-to-extend-a-home",
    "what-to-consider-before-undertaking-a-heritage-renovation-in-melbourne",
  ];

  const rules: { source: string; destination: string; permanent: boolean }[] = [];

  for (const slug of keptSlugs) {
    rules.push({
      source: `/${slug}`,
      destination: `/blog/${slug}/`,
      permanent: true,
    });
  }

  // Old WP URL for this post included an invisible U+FFFC object-replacement char.
  rules.push({
    source: "/top-building-tips-from-an-architectural-builder%EF%BF%BC",
    destination: "/blog/top-building-tips-from-an-architectural-builder/",
    permanent: true,
  });

  for (const slug of removedRootSlugs) {
    rules.push({
      source: `/${slug}`,
      destination: "/blog/",
      permanent: true,
    });
  }

  return rules;
}

export { suburbSlugFromPath, locationDestination };
