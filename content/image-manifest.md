---
File: content/image-manifest.md
Status: DRAFT — every image below is currently missing; the old Concept 1b stock photos have been archived (see images/archive/) since they belonged to a different content direction
---

# Image Manifest — Nicon Built

## Naming convention

`[page]-[descriptor]-[number].webp` — e.g. `home-hero-bg.webp`, `about-nick-portrait.webp`, `kitchen-renovations-page-01.webp`. Convert everything to WebP with a fallback per the Technical Developer Brief; max 150KB for above-the-fold images; explicit width/height on every `<img>` (prevents layout shift); lazy-load everything below the fold; preload the homepage hero image specifically (`<link rel="preload" as="image">`) since mobile LCP is the single biggest performance problem on the current site (17.4s, target under 2.5s).

## Required images

Sara is supplying a Google Drive folder ("Images") directly to Cursor rather than through this pack: **https://drive.google.com/drive/folders/1tC88MT4d7ThYa5It5OFBC90yoW8vnEG7** — check there first for each slot below before treating it as unresolved.

| Slot | Page | Notes |
|---|---|---|
| `home-hero-bg` | Home | Full-width background. Recommended: heritage home exterior or renovation in progress |
| `about-nick-portrait` | About | Photo of Nick Kafkalas on site |
| `heritage-renovations-page-01` | Heritage Renovations and Restorations | Period home exterior or restoration detail |
| `heritage-extensions-page-01` | Heritage Home Extensions | New addition alongside original heritage building |
| `kitchen-renovations-page-01` | Kitchen Renovations | Completed kitchen renovation |
| `bathroom-renovations-page-01` | Bathroom Renovations | Completed bathroom renovation |
| `home-renovations-page-01` | Home Renovations and Extensions | Extension/renovation in progress or completed |
| `trades-maintenance-page-01` | Trades and Maintenance | Trades on site — painting, tiling, or maintenance in progress |
| `new-builds-page-01` | New Builds | Completed new build or dual-occupancy project |
| `our-work-gallery-*` | Our Work | Full project gallery. **No photos featuring Callum or John**, per Nick's instruction |
| `og-image` | Homepage (+ ideally one per major service page) | 1200×630 |
| `favicon` set | Site-wide | favicon.ico, icon.png (512×512), apple-icon.png (180×180) |
| Affiliation logos | Footer, About | MBAV, AIB, HIA, BEA — 4 logos |

All are ⚠️ PENDING — Sara's "Images" Drive folder should cover these; Cursor should check it against this list and flag anything still actually missing once reviewed.

## Archived — not currently used

`content/images/archive/` holds the 9 stock interior photos and the square "NICON BUILT" badge logo from the earlier Concept 1b exploration (everyday-trades positioning). These don't match the heritage-renovation content direction and are kept only per the "never delete, archive instead" rule — they're not part of this build's asset plan. `director.jpg` in that archive is unrelated stock, not an actual photo of Nick.

## Alt text

See `docs/seo.md` section 4 for the convention. Every image needs real, descriptive alt text — flagged **Critical** priority in the accessibility section of the Technical Developer Brief, not optional.
