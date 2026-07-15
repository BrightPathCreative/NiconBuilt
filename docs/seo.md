---
File: docs/seo.md
Status: DRAFT — aligned with live `src/lib/metadata.ts`; needs client sign-off on meta copy only
Last updated: 2026-07-15
---

# SEO Spec — Nicon Built

## 1. Per-Page Meta

All titles target 50–60 characters; descriptions target 150–160 characters. Character counts are approximate — Google may truncate display differently.

**Implementation:** `src/lib/metadata.ts` → `pageMeta` object + per-page `buildMetadata()` calls. Blog posts use frontmatter `title` + `excerpt`.

### Core pages

| Page | Meta Title (chars) | Meta Description (chars) |
|---|---|---|
| Home | `Melbourne Home Services \| Trades & Maintenance \| Nicon Built` (55) | `Plumbing, electrical, painting, tiling, carpentry, roofing, pest control and property maintenance across Melbourne's inner south. One licensed team, start to finish.` (155) |
| About | `About Nicon Built \| VBA Licensed Home Services \| Nicon Built` (54) | `Nicon Built is a VBA licensed builder coordinating trades, property maintenance, kitchen and bathroom renovations and extensions across Melbourne's inner south. One team, one point of contact.` (155) |
| Services Overview | `Home Services and Renovation Builder Melbourne \| Nicon Built` (58) | `Plumbing, electrical, tiling, painting, rendering, brickwork, concreting, carpentry, kitchen and bathroom renovations, property maintenance, heritage work and new builds. Every job run by the Nicon Built team.` (160) |
| Our Work | `Our Work \| Home Services & Trade Projects \| Nicon Built` (52) | `Completed plumbing, electrical, painting, tiling, maintenance, kitchen and bathroom work across Melbourne's inner south. Real home service projects by Nicon Built.` (155) |
| Testimonials | `Client Reviews \| Nicon Built Melbourne` (38) | `Read what Nicon Built clients say — 5 star Google reviews from homeowners across Melbourne's inner south.` (105) |
| Contact | `Contact Nicon Built \| Melbourne Home Services Builder` (49) | `Get in touch with Nicon Built today. We usually reply the same day, serving Melbourne's inner south and bayside suburbs.` (118) |
| FAQ | `Frequently Asked Questions \| Nicon Built Melbourne` (52) | `Answers to common questions about home services, trades, kitchen and bathroom renovations, extensions and heritage work across Melbourne's inner south.` (154) |
| Blog index | `Building & Renovation Insights \| Blog \| Nicon Built` (52) | `Practical building and renovation advice from Nicon Built — 30+ years experience across Melbourne's inner south.` (112) |
| Privacy Policy | `Privacy Policy \| Nicon Built` (29) | `How Nicon Built Pty Ltd collects, uses and protects personal information submitted through our contact form and website analytics.` (130) |
| Cookie Policy | `Cookie Policy \| Nicon Built` (28) | `How Nicon Built uses cookies and similar technologies for analytics, contact forms and website functionality.` (112) |
| Thank You | `Thank You \| Nicon Built` (24) | `Thank you for contacting Nicon Built.` — **noindex**, excluded from sitemap |

404 has no dedicated meta (Next.js `not-found.tsx` — not indexed).

### Renovation & build service pages

| Page | Meta Title (chars) | Meta Description (chars) |
|---|---|---|
| Heritage Renovations | `Heritage Renovation and Restoration Melbourne \| Nicon Built` (58) | `Heritage renovation specialists for Victorian, Edwardian and Federation homes across Melbourne's inner south. 30+ years experience, VBA licensed builder.` (153) |
| Heritage Home Extensions | `Heritage Home Extensions Melbourne \| Nicon Built Builder` (56) | `Heritage-compliant home extensions across Melbourne's inner south. Period-accurate materials and council permits fully managed, 30+ years of experience.` (152) |
| Kitchen Renovations | `Kitchen Renovations Melbourne \| Licensed Builder \| Nicon Built` (58) | `Kitchen renovations across Melbourne's inner south, managed start to finish by a licensed builder. Structural, plumbing, tiling and cabinetry coordinated.` (154) |
| Bathroom Renovations | `Bathroom Renovations Melbourne \| Nicon Built Builder` (52) | `Bathroom renovations across Melbourne's inner south, managed trade by trade in the right order: waterproofing, tiling, plumbing, electrical and fixtures.` (153) |
| Home Renovations & Extensions | `Home Renovations & Extensions Melbourne \| Nicon Built` (53) | `Home renovations and extensions across Melbourne's inner south. Plans and permits sorted? Nicon Built runs the build from start to finish, no handoffs.` (153) |
| New Builds | `Custom Home Builder Melbourne \| New Builds & Dual Occupancy \| Nicon Built` (68 — long; acceptable) | `Custom homes and dual-occupancy builds across Melbourne's inner south since 1990. Architect-designed or design-and-build, managed by Nicon Built from start to finish.` (160) |

### Home service / trade pages

| Page | Meta Title (chars) | Meta Description (chars) |
|---|---|---|
| Property Maintenance | `Property Maintenance Melbourne \| Home Maintenance \| Nicon Built` (60) | `One trusted team for home maintenance and trade coordination across Melbourne's inner south. Licensed builder, no job too small.` (127) |
| Carpentry & Joinery | `Carpentry and Joinery Melbourne \| Nicon Built` (46) | `Decking, pergolas, doors, custom cabinetry and period joinery across Melbourne's inner south. Built properly and finished to last.` (130) |
| Painting & Plastering | `Painting and Plastering Melbourne \| Nicon Built` (47) | `Interior and exterior painting with plaster repairs done properly first. Period homes and newer builds across Melbourne's inner south.` (133) |
| Rendering & Solid Plastering | `Rendering and Solid Plastering Melbourne \| Nicon Built` (55) | `External acrylic render, solid plaster and interior wall finishing across Melbourne's inner south. Heritage homes and new builds, fully coordinated by a licensed builder.` (160) |
| Tiling & Caulking | `Tiling & Caulking Melbourne \| Inner South \| Nicon Built` (54) | `Kitchen, bathroom and outdoor tiling plus professional caulking and silicone sealing across Melbourne's inner south and bayside. Waterproofed where required.` (155) |
| Plumbing | `Plumbing Melbourne \| Residential Plumbing \| Nicon Built` (53) | `Residential plumbing, hot water systems, repairs and renovation coordination across Melbourne's inner south. Done to code, every time.` (133) |
| Electrical | `Electrical Services Melbourne \| Nicon Built` (43) | `Lighting, power points, switchboard upgrades and electrical coordination within renovations. Licensed electricians across Melbourne's inner south.` (143) |
| Pest Control | `Pest Control Melbourne \| Inspections & Treatments \| Nicon Built` (60) | `Pest inspections and treatments across Melbourne's inner south, coordinated by a licensed builder. Termites, rodents, and general pest control.` (143) |
| Cleaning | `Cleaning Melbourne \| End-of-Job & Bond Cleans \| Nicon Built` (56) | `End-of-job, bond, and regular cleaning across Melbourne's inner south. Coordinated after renovations or as a standalone service.` (127) |
| Roofing | `Roofing Melbourne \| Repairs & Maintenance \| Nicon Built` (54) | `Roof repairs and maintenance across Melbourne's inner south. Tile and metal roofs, heritage homes, leak investigation and gutter coordination.` (143) |
| Brickwork & Block Laying | `Brickwork and Block Laying Melbourne \| Nicon Built` (51) | `Brick and block laying, repairs and repointing across Melbourne's inner south. Heritage brickwork, new walls and extensions, coordinated by a licensed builder.` (155) |
| Concreting & Paving | `Concreting and Paving Melbourne \| Nicon Built` (47) | `Driveways, paths, polished concrete and paving across Melbourne's inner south. New pours, repairs and outdoor hardscaping, fully managed by Nicon Built.` (153) |

### Location pages (heritage suburbs)

| Suburb | Meta Title (chars) | Meta Description (chars) |
|---|---|---|
| Brighton | `Heritage Renovations Brighton \| Period Home Builder \| Nicon Built` (62 — 2 over) | `Heritage renovations and restorations for Brighton's Victorian, Edwardian and interwar homes. Bayside council permits managed, VBA licensed builder since 1990.` (159) |
| Armadale | `Heritage Renovations Armadale \| Victorian Terrace Builder \| Nicon Built` (66 — long) | `Heritage renovations for Armadale's Victorian terraces and Edwardian villas. Stonnington heritage permits managed end to end, VBA licensed builder since 1990.` (157) |
| Malvern | `Heritage Renovations Malvern \| Edwardian & Federation Homes \| Nicon Built` (72 — long) | `Heritage renovations and extensions for Malvern's Edwardian and Federation homes. Stonnington heritage permits managed, VBA licensed builder since 1990.` (151) |
| Albert Park | `Heritage Renovations Albert Park \| Victorian Terrace Builder \| Nicon Built` (70 — long) | `Heritage renovations for Albert Park's Victorian terraces. Port Phillip heritage permits managed end to end by a local VBA licensed builder, since 1990.` (153) |
| Elwood | `Heritage Renovations Elwood \| Edwardian & Art Deco Homes \| Nicon Built` (68 — long) | `Heritage renovations for Elwood's Edwardian homes, Californian bungalows and interwar classics. Port Phillip permits managed, VBA licensed builder since 1990.` (157) |

### Blog posts (final set — 10 posts)

Title pattern: `{Post title} | Nicon Built Blog`. Description = frontmatter `excerpt`.

| Slug | Meta Title | Excerpt (description) |
|---|---|---|
| `build-your-home-efficiently-and-affordably-with-nicon-built` | Build Your Home Efficiently and Affordably with Nicon Built \| Nicon Built Blog | How Nicon Built's 6-step process and 30+ years of experience help you build a customised home efficiently, affordably and without the stress. |
| `fabulous-at-40-why-experience-matters-in-building` | Why Experience Matters in Building \| Nicon Built Blog | After 30+ years in the industry, here are the rules we live by: from listening closely to clients to keeping every build on budget. |
| `how-to-design-for-a-narrow-block` | How to Design for a Narrow Block \| Nicon Built Blog | How to make the most of a narrow inner-Melbourne block, from local knowledge to natural light and vertical space. |
| `how-to-keep-your-build-within-budget` | How to Keep Your Build Within Budget \| Nicon Built Blog | Practical ways to avoid budget blow-outs, from engaging a builder early to steering clear of free quotes and late-stage variations. |
| `renovation-inspirations-before-and-after-success-project-port-melbourne` | Renovation Inspirations: Before and After Success Project Port Melbourne \| Nicon Built Blog | A look at a completed Port Melbourne renovation, from planning through to the finished result. |
| `should-i-renovate-or-build-new-nicon-built` | Should I Renovate or Build New? \| Nicon Built Blog | Practical guidance on choosing between renovating your existing home and starting fresh. |
| `the-importance-of-collaboration-in-building` | The Importance of Collaboration in Building \| Nicon Built Blog | Why collaboration between architect, designer and builder, and clear communication with clients, delivers better building outcomes. |
| `the-keys-to-a-successful-modern-heritage-extension` | The Keys to a Successful Modern Heritage Extension \| Nicon Built Blog | What it takes to extend a heritage home well, balancing preservation, council regulations and modern living needs. |
| `top-building-tips-from-an-architectural-builder` | Top Building Tips From An Architectural Builder \| Nicon Built Blog | Five practical tips for anyone designing and building a new home, from organising your brief to choosing an experienced team. |
| `understanding-prime-cost-and-provisional-sum` | Understanding Prime Cost and Provisional Sum \| Nicon Built Blog | A plain-English guide to prime cost and provisional sum items in your building contract, and how to avoid budget surprises. |

**Blog redirects:** 31 removed old WordPress posts 301 → `/blog/` hub; 10 kept posts 301 → `/blog/{slug}/`. See `src/lib/redirects.ts`.

---

## 2. JSON-LD Schema

### LocalBusiness (homepage + footer-level, every page)

Implemented in `src/lib/schema.ts`. Key facts:

- **name:** Nicon Built Pty Ltd
- **address:** Port Melbourne, VIC 3207 (suburb-level only — no street address)
- **telephone:** omitted until GHL lead-gen number is issued — never Nick's personal mobile
- **aggregateRating:** 5.0 / 9 reviews (matches live Google Business Profile, not on-page testimonial count)
- **sameAs:** Facebook + Instagram

### FAQPage

Add wherever FAQ content appears (service pages, homepage, `/faq/`). Implemented per page via `faqSchema()`.

### BreadcrumbList

Every non-home page. Implemented via `breadcrumbSchema()`.

---

## 3. Open Graph

Default OG image: `https://niconbuilt.com.au/images/og-image.webp` (1200×630).

Set per page via `buildMetadata()` → `openGraph.images`. All pages currently share the default OG image unless overridden.

Homepage OG title suggestion (if a dedicated OG tag is ever split from meta title):

```html
<meta property="og:title" content="Home Services & Renovation Builder Melbourne | Nicon Built" />
<meta property="og:description" content="Everyday trades, renovations and extensions across Melbourne's inner south. 30+ years experience." />
<meta property="og:image" content="https://niconbuilt.com.au/images/og-image.webp" />
<meta property="og:url" content="https://niconbuilt.com.au/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_AU" />
```

Per-service OG images are optional — homepage/default image is sufficient for v1 launch.

---

## 4. Alt Text Conventions

| Image type | Alt text pattern / example |
|---|---|
| Hero image | "[Scene] Melbourne by Nicon Built" |
| Service page image | "[Service] in Melbourne by Nicon Built" |
| Nick's portrait | "Nick Kafkalas, founder of Nicon Built" |
| Gallery / project photo | "[Project type] — [suburb], completed by Nicon Built" |
| Blog hero | From frontmatter `imageAlt`, or post title as fallback |
| Decorative / icon | `alt=""` |

---

## 5. AEO / LLM Discoverability

- `/llms.txt` at domain root — live in `public/llms.txt`
- FAQPage schema on service pages and homepage
- E-E-A-T: Nick's name, photo, credentials on service pages; VBA licence in footer/schema
- Blog posts include practical advice with internal links to service pages

---

## 6. Core Web Vitals & Performance

Mobile performance improvements shipped (hero preload, deferred client bundles). Re-test PageSpeed after go-live on production domain.

| Metric | Target |
|---|---|
| PageSpeed (mobile) | 90+ |
| LCP (mobile) | < 2.5s |
| CLS | < 0.1 |

---

## 7. Client sign-off checklist (SEO)

Before go-live, confirm:

- [ ] Meta titles/descriptions read correctly for trades-first positioning (v8 copy direction)
- [ ] Testimonials meta references 9 Google reviews (schema) vs 8 on-page reviews — intentional
- [ ] Location suburb list (Brighton, Armadale, Malvern, Albert Park, Elwood) is final
- [ ] GA4 Measurement ID ready — analytics only loads once env var is set
- [ ] OG image is acceptable for social sharing (or supply a branded replacement)
- [ ] Privacy Policy + Cookie Policy reviewed and approved
