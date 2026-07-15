/** Site-wide configuration — values from env with safe fallbacks for development */
export const siteConfig = {
  name: "Nicon Built",
  legalName: "Nicon Built Pty Ltd",
  tagline: "Building Quality, Maintaining Excellence",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://niconbuilt.com.au",
  // Nick's email is private — it must not appear anywhere on the site.
  // All enquiries go through the contact form.
  // Suburb-level only — the street address is private and must not appear anywhere on the site.
  address: {
    locality: "Port Melbourne",
    region: "VIC",
    postalCode: "3207",
    country: "AU",
    full: "Port Melbourne, VIC 3207",
  },
  abn: "88 632 512 577",
  phone:
    process.env.NEXT_PUBLIC_PRIMARY_PHONE?.trim() ||
    process.env.NEXT_PUBLIC_DEV_PHONE?.trim() ||
    "",
  vbaLicence:
    process.env.NEXT_PUBLIC_VBA_LICENCE_NUMBER?.trim() || "CDB-U 62648",
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
  ghlContactForm: {
    id: process.env.NEXT_PUBLIC_GHL_CONTACT_FORM_ID?.trim() || "vvUEO6TWQDp00EySpLfv",
    src:
      process.env.NEXT_PUBLIC_GHL_CONTACT_FORM_SRC?.trim() ||
      "https://links.brightpathcreative.com.au/widget/form/vvUEO6TWQDp00EySpLfv",
    embedScriptSrc:
      process.env.NEXT_PUBLIC_GHL_FORM_EMBED_SCRIPT_SRC?.trim() ||
      "https://links.brightpathcreative.com.au/js/form_embed.js",
    name: "Nicon Built Contact Us Form",
    /** Starting height — form_embed.js / postMessage may grow this after load */
    height: 1100,
  },
  stats: {
    years: "30+",
    rating: "5.0",
    reviewCount: 9,
    projects: "200+",
  },
  /** Trades-first positioning — used in layout defaults, schema and OG fallbacks. */
  description:
    "Plumbing, electrical, painting, tiling, carpentry, roofing, pest control and property maintenance across Melbourne's inner south. One licensed Nicon Built team, start to finish.",
  social: {
    facebook: "https://www.facebook.com/niconbuilt",
    instagram: "https://www.instagram.com/nicon_built/",
  },
  serviceAreas: [
    "Port Melbourne",
    "Albert Park",
    "Middle Park",
    "South Melbourne",
    "Elwood",
    "St Kilda",
    "Brighton",
    "Hampton",
    "Sandringham",
    "Beaumaris",
    "Armadale",
    "Malvern",
    "South Yarra",
    "Williamstown",
    "Moorabbin",
    "Bentleigh",
    "Caulfield",
    "Elsternwick",
    "Camberwell",
    "Hawthorn",
    "Kew",
  ],
} as const;

export function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  // +61 4XX XXX XXX → 04XX XXX XXX
  if (digits.startsWith("61") && digits.length === 11) {
    return `0${digits.slice(2)}`;
  }
  if (digits.startsWith("0")) return digits;
  return `0${digits}`;
}

export function formatPhoneDisplay(phone: string): string {
  if (!phone) return "Call for a quote";
  const digits = normalizePhoneDigits(phone);
  if (digits.length === 10 && digits.startsWith("04")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function phoneHref(phone: string): string {
  const normalized = normalizePhoneDigits(phone);
  return normalized ? `tel:${normalized}` : "/contact/";
}

/** Default click-to-call label — number is never shown in the UI. */
export const callCtaLabel = "Click to call";
