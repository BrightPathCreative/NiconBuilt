/** Server-side HTTP 301 redirects — Vercel/next.config, not client JS */
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

  // Old WP /services/ → new Services Overview (Option A from plan)
  // New site has Services Overview at /services/ — same slug, no redirect needed for /services/

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

  // Old blog posts at root → /blog/ or homepage
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
  };
  return suburbMap[suburb] ?? "/home-renovations-melbourne/";
}

function generateBuilderRedirects() {
  const suburbs = [
    "elwood",
    "brighton",
    "armadale",
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
    "st-kilda",
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
  ];
  return cities.map((slug) => ({
    source: `/${slug}`,
    destination: "/new-builds-melbourne/",
    permanent: true,
  }));
}

/** Blog posts not migrated redirect to homepage; kept posts use /blog/slug */
function generateBlogRedirects() {
  const keptSlugs = [
    "renovation-inspirations-before-and-after-success-project-port-melbourne",
    "should-i-renovate-or-build-new-nicon-built",
    "fabulous-at-40-why-experience-matters-in-building",
    "the-importance-of-collaboration-in-building",
    "how-to-design-for-a-narrow-block",
  ];

  const removedRootSlugs = [
    "the-future-of-smart-homes-integrating-technology-into-your-build",
    "innovative-design-trends-transforming-homes-in-2024",
    "keeping-ahead-of-the-curve-future-proofing-your-home",
    "3-ways-to-invite-the-outside-into-your-home",
  ];

  const rules: { source: string; destination: string; permanent: boolean }[] = [];

  for (const slug of keptSlugs) {
    rules.push({
      source: `/${slug}`,
      destination: `/blog/${slug}/`,
      permanent: true,
    });
  }

  for (const slug of removedRootSlugs) {
    rules.push({
      source: `/${slug}`,
      destination: "/",
      permanent: true,
    });
  }

  return rules;
}

export { suburbSlugFromPath, locationDestination };
