---
File: README.md
Status: DRAFT — awaiting client confirmation on the items flagged below
---

# Nicon Built — Next.js Website

Multi-page Next.js App Router site for niconbuilt.com.au. Content authority remains in `/docs/copy/` and `/reference/`.

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

- 33 static pages (home, 7 services, about, contact, our work, testimonials, FAQ, 5 location pages, blog ×5, legal)
- Concept 1b design tokens, header/footer, GHL contact form API route
- JSON-LD (LocalBusiness, FAQPage, BreadcrumbList), sitemap.xml, robots.txt, llms.txt
- ~80 redirects from old WordPress URLs via `src/lib/redirects.ts`
- WebP images mapped from client photo library

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

| Placeholder | Where used | Resolved value | Confirmed? |
|---|---|---|---|
| `[CRM NUMBER]` | Header, hero, footer, Contact page, FAQ page, schema, `.env.example` | — | ☐ (coming later per Sara) |
| `[LICENCE NUMBER]` | About page credentials, footer | — checked the live site, not published there | ☐ |
| `[EMAIL]` | Already populated | `nick@niconbuilt.com.au` | ✅ |
| `[ADDRESS]` | Footer + schema | 186 Dow Street, Port Melbourne VIC 3207 | ✅ full public display confirmed |
| `[ABN]` | Footer, schema | 88 632 512 577 | ✅ |
| `[BUSINESS NAME]` | Throughout | Nicon Built / Nicon Built Pty Ltd | ✅ |
| `[PROJECTS COMPLETED FIGURE]` | Homepage stats strip | 200+ | ✅ |
| `[PRIORITY SUBURBS]` | Location pages | Brighton, Armadale, Malvern, Albert Park, Elwood | ✅ chosen by me, flagged for confirmation |
| `[SURVIVING BLOG POSTS]` | Blog migration | — | ☐ (building for ~10 of 41) |
| `[REVIEWS TO PUBLISH]` | Testimonials page | 8 of 9 (Johnny Andrianakis removed) | ✅ |
| `[IMAGE: *]` | Every image slot in `content/image-manifest.md` | — | ☐ pending Drive folder review |
| `[GHL WEBHOOK]` | Contact form | — | ☐ |
| `[GA ID]` | Analytics | — | ☐ |

🚨 **LAUNCH BLOCKED — unresolved placeholders found. Resolve all before deploying.**

## 🚨 Blockers — must resolve before build starts

1. GHL webhook endpoint not yet set up — even a declared "stub" clears this for dev purposes, but real wiring is needed before launch.
2. VBA licence number missing — confirmed via direct check that it isn't published anywhere on the current live site either, so it has to come from Nick directly, not from an existing source.
3. Photography — Sara's Drive folder needs to actually be checked against `content/image-manifest.md` once Cursor has access, to confirm what's covered and what's still genuinely missing.

## ⚠️ Warnings — fix before launch

1. GHL lead-gen phone number pending (confirmed coming later).
2. Which ~10 of the 41 existing blog posts survive — still undecided.
3. Full 38-page 301 redirect mapping still needs to be built from the pattern rules (confirmed as a later-stage task, not a day-one blocker).
4. Cookie policy — confirm whether it's actually needed; neither source document calls for one.
5. Current PageSpeed score is 36/100 mobile, 47/100 desktop, with a 17.4s mobile LCP — this needs active performance work, not just a target on paper.
6. The 5 chosen location suburbs (Brighton, Armadale, Malvern, Albert Park, Elwood) were my judgement call, not an explicit client instruction — worth a quick confirmation from Nick.

## ✅ Clear

1. Colour palette (Concept 1b) — defined as CSS variables.
2. Business identity, ABN, address, email — all confirmed real and resolved for public display.
3. Tech stack — Next.js App Router + TypeScript, satisfies the "custom-coded, not WordPress" requirement.
4. Static testimonials (8, Johnny Andrianakis removed) — confirmed final.
5. Kitchen Renovations and Bathroom Renovations pages — approved, no longer held back.
6. Homepage "200+ Projects Completed" stat — confirmed final.
