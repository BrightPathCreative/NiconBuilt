---
File: docs/sitemap.md
Status: DRAFT — awaiting client confirmation on blog posts + priority suburbs
---

# Sitemap — Nicon Built

Multi-page build confirmed. Structure below follows `Nicon_Built_Copy_v7_Approved.md` (14 pages — the current content authority) with URL slugs from `Nicon_Built_Technical_Developer_Brief.md` where they already exist, extended for the pages v7 added since the brief was written (Kitchen Renovations, Bathroom Renovations, Services Overview, FAQ).

## 1. URL Structure

| Page | URL slug | Priority | Notes |
|---|---|---|---|
| Home | `/` | High | ✅ Copy ready |
| About | `/about/` | High | ✅ Copy ready |
| Services Overview | `/services/` | High | ✅ Copy ready. Slug not in the original brief — proposed new, confirm |
| Heritage Renovations and Restorations | `/heritage-renovations-melbourne/` | High | ✅ Copy ready — matches brief |
| Heritage Home Extensions | `/heritage-home-extensions-melbourne/` | High | ✅ Copy ready. New slug (page didn't exist in the original brief), confirm |
| Kitchen Renovations | `/kitchen-renovations-melbourne/` | Med | ✅ Copy ready and client-approved (Sara has confirmed both new pages) |
| Bathroom Renovations | `/bathroom-renovations-melbourne/` | Med | ✅ Copy ready and client-approved (Sara has confirmed both new pages) |
| Home Renovations and Extensions | `/home-renovations-melbourne/` | High | ✅ Copy ready. Reuses the brief's "High-End Renovations" slug — page was renamed, slug kept for URL stability |
| Trades and Maintenance | `/property-maintenance-melbourne/` | High | ✅ Live. Legacy `/home-maintenance-melbourne/` 301s here |
| New Builds | `/new-builds-melbourne/` | Low | ✅ Copy ready — matches brief. Explicitly "kept on the site but not the main focus" |
| Our Work | `/our-work/` | Med | ⚠️ Copy ready, but needs real photos — currently has zero images to show |
| Testimonials | `/testimonials/` | Med | ⚠️ Copy ready, but confirm which of the 9 reviews to publish (Callum flag — see `docs/brief.md`) |
| Contact | `/contact/` | High | ⚠️ Copy ready, phone number pending GHL |
| FAQ | `/faq/` | Med | ✅ Copy ready. New slug — not in the original brief's URL table, confirm |
| Location pages | `/heritage-renovations-[suburb]/` | Med | ✅ 5 priority suburbs chosen (left to my judgement, per Sara) — see the reasoning below |
| Blog (10 posts — final) | `/blog/[post-slug]/` | Low | ✅ 10 posts published; 31 old WP posts redirect to `/blog/` hub |
| Privacy Policy | `/privacy-policy/` | Low | ✅ Draft ready — client / legal sign-off |
| Cookie Policy | `/cookie-policy/` | Low | ✅ Draft ready — client / legal sign-off |
| Thank You | `/thank-you/` | — | ⚠️ Draft copy ready. `noindex`, excluded from sitemap, fires on form submit |
| 404 | `/404/` | — | ✅ Draft copy ready — awaiting client sign-off |

## 2. Location Pages — the 5 chosen

Sara left the suburb selection to me. I picked the top 5 from the 6 suburbs the approved copy itself names as the heaviest heritage-work areas ("Most of our heritage work is in Armadale, Malvern, Albert Park, Brighton, Elwood, and South Yarra" — `docs/copy/heritage-renovations-restorations.md`), rather than picking from the full 20-suburb general service list. Dropped South Yarra since it skews more toward apartments/units than the single-dwelling period housing stock the other five have in depth.

| Suburb | URL slug |
|---|---|
| Brighton | `/heritage-renovations-brighton/` |
| Armadale | `/heritage-renovations-armadale/` |
| Malvern | `/heritage-renovations-malvern/` |
| Albert Park | `/heritage-renovations-albert-park/` |
| Elwood | `/heritage-renovations-elwood/` |

Flag this back to Sara/Nick if a different 5 is preferred — this was a reasonable default, not a client instruction.

## 3. Navigation

**Primary nav** (per the technical brief, extended to 7 services per v7):
`Home | Services ▾ | Our Work | About | Contact`

**Services dropdown** — extend the brief's original 4 items to all 7 from v7:
Heritage Renovations and Restorations · Heritage Home Extensions · Kitchen Renovations · Bathroom Renovations · Home Renovations and Extensions · Trades and Maintenance · New Builds

Mobile: hamburger menu, click-to-call button always visible in the header. Sticky header on scroll — logo left, call button right.

## 4. Internal Linking Rules (from the technical brief)

- Every service page links to: Contact, Our Work, and at least 2 other service pages
- Homepage links to all service pages and key location pages
- Blog posts link to at least 2 relevant service pages
- About links to all service pages
- Footer links to all main pages + key location pages

## 5. Breadcrumbs

Implement on every page except Home. Format: `Home > Services > Heritage Renovations Melbourne`. Add `BreadcrumbList` JSON-LD to every non-home page.

## 6. robots.txt

```
User-agent: *
Disallow: /thank-you
Sitemap: https://niconbuilt.com.au/sitemap.xml
```

## 7. 301 Redirects

⚠️ Sara has confirmed this happens later in the build, once ready — not a day-one blocker. Full pattern-level strategy already exists in `Nicon_Built_Technical_Developer_Brief.md` (section 7) — the exhaustive 38-page-by-page mapping still needs to be built from that pattern before go-live. Key points:

- Implement via `.htaccess`/nginx, never JavaScript
- No redirect chains — A → C directly, never A → B → C
- Microsoft 365 email DNS/MX records must not be touched during the domain switch
- Test with Screaming Frog before go-live; check Google Search Console for crawl errors after

## 8. Legal Pages

- Privacy Policy — ✅ drafted at `/privacy-policy/` — client / legal sign-off required before go-live
- Cookie Policy — ✅ drafted at `/cookie-policy/` — covers GA4 + GHL form cookies; no consent banner currently
- Confirm with Nick whether a cookie consent banner is needed once GA4 goes live (Australian Privacy Act / APP guidelines)
