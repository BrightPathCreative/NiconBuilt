---
File: README.md
Status: DRAFT — awaiting client confirmation on the items flagged below
---

# Nicon Built — Next.js Website

Multi-page Next.js App Router site for niconbuilt.com.au. Content authority remains in `/docs/copy/` and `/reference/`.

## Folder layout

This repo lives inside the client workspace at `/Volumes/LaCieDrive/NiconBuilt/nicon-built/`. The parent `NiconBuilt/` folder holds shared assets (photos, fonts, branding zips) — **not** the git repo. All code changes happen here.

| Path | Purpose |
|---|---|
| `src/` | App routes, components, lib |
| `docs/copy/` | Page copy (loaded at build time) |
| `content/blog/` | Blog post markdown |
| `public/` | Static assets served at domain root (`llms.txt`, images, favicons) |
| `reference/` | Archived approved copy and briefs (read-only reference) |

**Canonical `llms.txt`:** `public/llms.txt` only. Do not add a duplicate at repo root.

## Quick start

```bash
cd nicon-built
cp .env.example .env.local   # fill GHL, GA4, phone, VBA licence
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
npm run optimize-images   # re-process photos from ../05 Assets & Branding/Images/
npx vercel --prod         # deploy to Vercel (bright-path-creative/nicon-built)
```

**Production preview:** https://nicon-built-7rfb08zo9-bright-path-creative.vercel.app

See [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) for the full go-live checklist, [docs/DEPLOY.md](docs/DEPLOY.md) for DNS cutover, and [docs/redirects.csv](docs/redirects.csv) for 301 redirect reference.

## Implemented

- 39 indexable pages (home, 15 services, about, contact, our work, testimonials, FAQ, 5 location pages, blog index + 10 posts, privacy)
- Concept 1b design tokens, header/footer, native contact form → GHL webhook API route
- JSON-LD (LocalBusiness, FAQPage, BreadcrumbList, Review on testimonials), sitemap.xml, robots.txt, `public/llms.txt`
- ~80 redirects from old WordPress URLs via `src/lib/redirects.ts`
- WebP images from client photo library

## Still needed from client before go-live

See **[docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md)** for the full phased checklist.

| Item | Env var | When |
|---|---|---|
| GHL webhook URL | `GHL_WEBHOOK_URL` | Before go-live |
| GHL lead-gen phone | `NEXT_PUBLIC_PRIMARY_PHONE` | At go-live (Nick to provide) |
| GA4 Measurement ID | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Before or at go-live |
| VBA licence number | `NEXT_PUBLIC_VBA_LICENCE_NUMBER` | Optional — blank OK for now |
| Affiliation logos (MBAV, AIB, HIA, BEA) | `public/images/affiliations/` | When client provides |
| Domain DNS cutover | Vercel + VentraIP | After client approval |

---

Multi-page build confirmed. Content authority is `Nicon_Built_Copy_v7_Approved.md` (in `/reference`) plus `Nicon_Built_Technical_Developer_Brief.md` for everything technical/SEO/schema/redirects. Concept 1b (`Nicon_Landing_Wireframes_dc.html`) supplies the visual design system only.

## Asset-Status Table

| Item / File | Status | Notes |
|---|---|---|
| `.cursorrules` | ✅ Ready | Updated for kitchen/bathroom approval and resolved items |
| `docs/brief.md` | ⚠️ In progress | ABN, entity name, email, address, stats figure all confirmed. Only the VBA licence number and GHL phone remain open |
| `docs/content-notes.md` | ✅ Ready | Unchanged — still the correct visual spec (Concept 1b) |
| `design.md` | ⚠️ In progress | Motion spec still mostly assumed defaults, not yet confirmed |
| `docs/seo.md` | ✅ Ready | Full meta, schema (address confirmed in footer + schema), OG, alt-text, AEO, and Core Web Vitals targets drafted |
| `docs/sitemap.md` | ✅ Ready | Full IA, 5 location suburbs chosen (Brighton, Armadale, Malvern, Albert Park, Elwood), blog set to ~10 posts pending final list |
| `docs/copy/home.md` | ✅ Ready | Verbatim, approved. Stats figure confirmed final |
| `docs/copy/about.md` | ⚠️ In progress | Verbatim, approved — VBA licence number still missing (confirmed not on the live site either) |
| `docs/copy/services-overview.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/heritage-renovations-restorations.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/heritage-home-extensions.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/kitchen-renovations.md` | ✅ Ready | Approved by Sara — follow the copy as drafted |
| `docs/copy/bathroom-renovations.md` | ✅ Ready | Approved by Sara — follow the copy as drafted |
| `docs/copy/home-renovations-extensions.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/trades-and-maintenance.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/new-builds.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/our-work.md` | ⚠️ In progress | Copy approved; photos coming via Sara's Drive folder, not yet reviewed against the manifest |
| `docs/copy/testimonials.md` | ✅ Ready | 8 reviews approved for publishing (Johnny Andrianakis review removed) |
| `docs/copy/contact.md` | ⚠️ In progress | Copy approved, phone pending GHL |
| `docs/copy/faq.md` | ✅ Ready | Verbatim, approved |
| `docs/copy/404.md` | ⚠️ In progress | Draft, not client-approved |
| `docs/copy/thank-you.md` | ⚠️ In progress | Draft, not client-approved. Required by the GHL form flow |
| `docs/copy/privacy-policy.md` | ❌ Missing | Legal — BPC has a standard template for this exact situation, use it |
| `docs/copy/cookie-policy.md` | ❌ Missing | Possibly not needed at all — neither source doc calls for one, confirm |
| Location page copy ×5 | ❌ Missing | Suburbs chosen, copy not yet written |
| Blog post copy (~10, TBD) | ❌ Missing | Blocked on which of the 41 posts survive |
| `content/image-manifest.md` | ✅ Ready | Full slot list mapped; points to Sara's Drive folder for sourcing |
| All photography | ⚠️ In progress | Sara is supplying a Drive folder directly to Cursor: https://drive.google.com/drive/folders/1tC88MT4d7ThYa5It5OFBC90yoW8vnEG7 — needs checking against the manifest once Cursor has access |
| Favicon set / OG image / affiliation logos | ❌ Missing | Check the Drive folder first before treating these as unresolved |
| `.env.example` | ✅ Ready | |
| GHL webhook URL | ❌ Missing | |
| GA4 Measurement ID | ❌ Missing | |
| GHL lead-gen phone number | ❌ Missing | Confirmed coming from Sara later in the build |
| VBA licence number | ❌ Missing | Checked the live niconbuilt.com.au site directly (Home, About, Guarantees, Contact) — not published there either. Needs to come from Nick |
| `llms.txt` | ⚠️ In progress | Drafted per the technical brief's own template, phone number pending |
| `reference/Nicon_Built_Copy_v7_Approved.md` | ✅ Ready | |
| `reference/Nicon_Built_Technical_Developer_Brief.md` | ✅ Ready | |
| `content/images/archive/` | ✅ Archived, not deleted | Old Concept 1b stock photos + badge logo, no longer part of the asset plan |
| `README.md` | ✅ Ready | This file |

## Placeholder Registry

| Placeholder | Where used | Status |
|---|---|---|
| `[CRM NUMBER]` | Header, footer, contact, FAQ, schema | Pending GHL lead-gen number |
| `GHL_WEBHOOK_URL` | `/api/contact` | Pending GHL workflow setup |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 | Pending |
| VBA licence | Footer, schema | Default `CDB-U 62648` in code; env override optional |
| ABN | Footer | `88 632 512 577` — live |
| Email | — | **Not published** on site (form-only enquiries) |
| Street address | — | **Not published** — suburb-level only (Port Melbourne, VIC 3207) |
| Affiliation logos | Footer | Pending client assets |

## Privacy policy (contact data)

- No public email address on the live site.
- No street address on the live site — locality/suburb only.
- All enquiries via `/contact/` form → GHL webhook.
