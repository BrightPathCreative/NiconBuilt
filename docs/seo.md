---
File: docs/seo.md
Status: DRAFT — meta copy is new drafting, needs client sign-off same as any new copy. Schema uses confirmed real business facts.
---

# SEO Spec — Nicon Built

## 1. Per-Page Meta

All titles 50–60 chars, descriptions 150–160 chars (counted).

| Page | Meta Title (chars) | Meta Description (chars) |
|---|---|---|
| Home | `Heritage Renovation & Custom Builder Melbourne | Nicon Built` (60) | `Heritage renovation builder in Melbourne with 30+ years experience. Victorian, Edwardian and Federation homes, extensions, kitchens, bathrooms and maintenance.` (159) |
| About | `About Nicon Built | Nick Kafkalas, Melbourne Builder` (52) | `Nick Kafkalas has personally run Nicon Built since 1990. VBA licensed and fully insured, with 30+ years building and renovating Melbourne's inner south.` (152) |
| Services Overview | `Building and Renovation Services Melbourne | Nicon Built` (56) | `Heritage renovations, extensions, kitchens, bathrooms, maintenance and new builds across Melbourne's inner south. Every job run personally by Nick Kafkalas.` (156) |
| Heritage Renovations and Restorations | `Heritage Home Renovations Melbourne | Nicon Built Builder` (57) | `Heritage renovation specialists for Victorian, Edwardian and Federation homes across Melbourne's inner south. 30+ years experience, VBA licensed builder.` (153) |
| Heritage Home Extensions | `Heritage Home Extensions Melbourne | Nicon Built Builder` (56) | `Heritage-compliant home extensions across Melbourne's inner south. Period-accurate materials and council permits fully managed, 30+ years of experience.` (152) |
| Kitchen Renovations | `Kitchen Renovations Melbourne | Nicon Built Builder` (51) | `Kitchen renovations across Melbourne's inner south, managed start to finish by a licensed builder. Structural, plumbing, tiling and cabinetry coordinated.` (154) |
| Bathroom Renovations | `Bathroom Renovations Melbourne | Nicon Built Builder` (52) | `Bathroom renovations across Melbourne's inner south, managed trade by trade in the right order: waterproofing, tiling, plumbing, electrical and fixtures.` (153) |
| Home Renovations and Extensions | `Home Renovations & Extensions Melbourne | Nicon Built` (53) | `Home renovations and extensions across Melbourne's inner south. Plans and permits sorted? Nick Kafkalas runs the build from start to finish, no handoffs.` (153) |
| Trades and Maintenance | `Home Maintenance & Trade Services Melbourne | Nicon Built` (57) | `One trusted team for all your trade and maintenance needs across Melbourne's inner south. Licensed builder, 30-year trade network, and no job too small.` (152) |
| New Builds | `New Builds & Dual Occupancy Melbourne | Nicon Built` (51) | `Custom homes and dual-occupancy builds across Melbourne's inner south since 1990. Architect-designed or design-and-build, run personally by Nick Kafkalas.` (154) |
| Our Work | `Our Work | Renovations & Builds Melbourne | Nicon Built` (55) | `A look through completed heritage restorations, renovations, extensions and new builds across Melbourne's inner south and bayside suburbs, by Nicon Built.` (154) |
| Testimonials | `Client Reviews | Nicon Built Melbourne Heritage Builder` (55) | `Read what Nicon Built clients say about working with Nick Kafkalas: 5.0 stars and 9 Google reviews across 30+ years of heritage renovation and building.` (152) |
| Contact | `Contact Nicon Built | Melbourne Heritage & Renovation Builder` (61 — 1 over, trim if strict) | `Get a free, no-obligation quote from Nicon Built today. Nick usually replies the same day, serving Melbourne's inner south and bayside suburbs since 1990.` (154) |
| FAQ | `Frequently Asked Questions | Nicon Built Melbourne Builder` (58) | Not yet drafted — write once the exact FAQ page content is finalised, since it should reflect what's actually answered |
| Location pages (xN, TBD) | Template: `[Service] in [Suburb] | Nicon Built` | Template: `Heritage renovations and building services in [Suburb], Melbourne. 30+ years experience, VBA licensed builder. Get a free quote from Nicon Built today.` — verify character count per suburb name once the priority list is confirmed |
| Blog posts (5-6, TBD) | Per-post, once the surviving posts are chosen | Per-post |
| Privacy Policy | `Privacy Policy | Nicon Built` (29 — short by convention, acceptable for a legal page) | Not SEO-critical; skip or keep minimal |

Contact title is 61 characters, 1 over the 60 target — acceptable in practice (Google's display cutoff is approximate, not a hard 60), but flagging since the spec calls for counting.

## 2. JSON-LD Schema

### LocalBusiness (homepage + footer-level, every page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nicon Built Pty Ltd",
  "@id": "https://niconbuilt.com.au",
  "url": "https://niconbuilt.com.au",
  "telephone": "[CRM NUMBER]",
  "email": "nick@niconbuilt.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "186 Dow Street",
    "addressLocality": "Port Melbourne",
    "addressRegion": "VIC",
    "postalCode": "3207",
    "addressCountry": "AU"
  },
  "areaServed": [
    "Port Melbourne", "Albert Park", "Middle Park", "South Melbourne", "Elwood",
    "St Kilda", "Brighton", "Hampton", "Sandringham", "Beaumaris", "Armadale",
    "Malvern", "South Yarra", "Williamstown", "Moorabbin", "Bentleigh",
    "Caulfield", "Elsternwick", "Camberwell", "Hawthorn", "Kew"
  ],
  "description": "Heritage renovation and custom building specialists, Melbourne.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "9"
  }
}
```

Address in schema: confirmed for full public display in the footer as well (Sara has resolved this — no longer just a schema-only value).

telephone: leave as [CRM NUMBER] until the GHL lead-gen number is issued. Never publish 0407699454 (Nick's personal mobile) — the technical brief is explicit that it's a placeholder only.

Note: reviewCount stays 9 (the real live Google Business Profile total) even though the Testimonials page itself only publishes 8 of them per Sara's decision — schema should reflect the actual external rating, not just the on-page count.

### FAQPage (every service page + homepage + the dedicated FAQ page)

Add this schema wherever FAQ content appears, using that page's actual questions. Example from the technical brief:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you specialise in heritage home renovations in Melbourne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Nicon Built has been restoring and renovating heritage homes across Melbourne's inner south since 1990. Nick Kafkalas personally oversees every heritage project."
      }
    }
  ]
}
```

### BreadcrumbList (every non-home page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://niconbuilt.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://niconbuilt.com.au/services/" },
    { "@type": "ListItem", "position": 3, "name": "Heritage Renovations Melbourne", "item": "https://niconbuilt.com.au/heritage-renovations-melbourne/" }
  ]
}
```

## 3. Open Graph

```html
<meta property="og:title" content="Heritage Renovation Builders Melbourne | Nicon Built" />
<meta property="og:description" content="30+ years experience. Heritage renovations, extensions & maintenance across Melbourne's inner south." />
<meta property="og:image" content="https://niconbuilt.com.au/assets/og-image.jpg" />
<meta property="og:url" content="https://niconbuilt.com.au/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_AU" />
```

Per the technical brief: create a dedicated 1200x630 OG image for the homepage, and give each major service page its own OG image where possible (not required for all — homepage is the priority).

## 4. Alt Text Conventions (from the technical brief's accessibility section)

| Image type | Alt text pattern / example |
|---|---|
| Hero image | "[Scene] Port Melbourne by Nicon Built" — e.g. "Heritage home renovation Port Melbourne by Nicon Built" (the brief's own example) |
| Service page image | "[Service] in [suburb] by Nicon Built" |
| Nick's portrait | "Nick Kafkalas, founder of Nicon Built" |
| Gallery / project photo | "[Project type] — [suburb], completed by Nicon Built" |
| Decorative / icon | alt="" |

Every image needs real, descriptive alt text — no image ships with alt="" unless it's genuinely decorative. This is flagged as Critical priority in the accessibility section of the technical brief, not optional.

## 5. AEO / LLM Discoverability (BrightPath Creative standard, from the technical brief)

- /llms.txt at the domain root — see the pack's top-level llms.txt
- FAQPage schema on every service page and the homepage (not just the dedicated FAQ page)
- E-E-A-T signals: Nick's name, photo, and credentials on every service page; VBA licence number prominent on About + footer (pending the actual number); affiliation logos (MBAV, AIB, HIA, BEA); "last updated" date on blog posts; links to authoritative external sources in blog content (e.g. City of Melbourne heritage overlay pages, VBA)

## 6. Core Web Vitals & Performance (SEO-adjacent, from the technical brief)

These directly affect ranking and are called out as Critical:

| Metric | Target | Current |
|---|---|---|
| PageSpeed (mobile) | 90+ | 36/100 |
| PageSpeed (desktop) | 90+ | 47/100 |
| LCP (mobile) | < 2.5s | 17.4s |
| FCP | < 1.8s | — |
| CLS | < 0.1 | — |
| INP | < 200ms | — |
| TTFB | < 800ms | — |

80% of Nicon Built's traffic is mobile — the mobile LCP fix (preload the hero image, eliminate render-blocking scripts) is the single highest-impact change per the brief.
