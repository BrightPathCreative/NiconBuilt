/** Site-wide configuration — values from env with safe fallbacks for development */
export const siteConfig = {
  name: "Nicon Built",
  legalName: "Nicon Built Pty Ltd",
  tagline: "Building Quality, Maintaining Excellence",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://niconbuilt.com.au",
  email: "nick@niconbuilt.com.au",
  address: {
    street: "186 Dow Street",
    locality: "Port Melbourne",
    region: "VIC",
    postalCode: "3207",
    country: "AU",
    full: "186 Dow Street, Port Melbourne VIC 3207",
  },
  abn: "88 632 512 577",
  phone:
    process.env.NEXT_PUBLIC_PRIMARY_PHONE?.trim() ||
    process.env.NEXT_PUBLIC_DEV_PHONE?.trim() ||
    "",
  vbaLicence:
    process.env.NEXT_PUBLIC_VBA_LICENCE_NUMBER?.trim() || "CDB-U 62648",
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
  ghlWebhook: process.env.GHL_WEBHOOK_URL?.trim() || "",
  ghlContactForm: {
    id: process.env.NEXT_PUBLIC_GHL_CONTACT_FORM_ID?.trim() || "vvUEO6TWQDp00EySpLfv",
    src:
      process.env.NEXT_PUBLIC_GHL_CONTACT_FORM_SRC?.trim() ||
      "https://links.brightpathcreative.com.au/widget/form/vvUEO6TWQDp00EySpLfv",
    embedScriptSrc:
      process.env.NEXT_PUBLIC_GHL_FORM_EMBED_SCRIPT_SRC?.trim() ||
      "https://links.brightpathcreative.com.au/js/form_embed.js",
    name: "Nicon Built Contact Us Form",
  },
  stats: {
    years: "30+",
    rating: "5.0",
    reviewCount: 9,
    projects: "200+",
  },
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

export function formatPhoneDisplay(phone: string): string {
  if (!phone) return "Call for a quote";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("04")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:${digits.startsWith("0") ? digits : `0${digits}`}` : "#contact";
}
