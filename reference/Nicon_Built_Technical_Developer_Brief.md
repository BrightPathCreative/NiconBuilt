# Nicon Built — Technical & Developer Brief
Custom-coded website build specification. niconbuilt.com.au | Prepared May 2026 | BrightPath Creative

> Pulled from Google Drive for this handover pack. Kept verbatim (condensed to the load-bearing facts) as the technical/SEO/redirect source of truth. The page count/names here (4 service pages) predate `Nicon_Built_Copy_v7_Approved.md` (7 service pages) — where they conflict, v7 wins on content/IA; this brief still governs technical, schema, accessibility, and redirect requirements.

## Project overview
- Client: **Nicon Built Pty Ltd**
- Domain: **niconbuilt.com.au** (existing — this is a migration, not a new site)
- Registrar: VentraIP — Nick to add sara@brightpathcreative.com.au as admin
- Hosting: VentraIP (confirm access)
- Email: Microsoft 365 — **do not touch or migrate DNS/MX records**
- Build type: custom-coded — NOT WordPress, no page builders
- CRM: GoHighLevel (GHL) — phone number, form webhooks, missed-call text-back
- Analytics: GA4 + Google Search Console, set up from day one
- Existing site: WordPress 6.7.5 / Elementor Pro — being replaced
- Existing pages: 38 published — all need 301 redirects
- Existing blog posts: 41 — being reduced to 5–6 relevant ones (not yet chosen)
- PageSpeed target: 90+ mobile and desktop. Current: mobile 36/100, desktop 47/100
- Current mobile LCP: 17.4s — target under 2.5s

## Core Web Vitals targets
| Metric | Target |
|---|---|
| LCP | < 2.5s mobile — preload hero image, no render-blocking scripts |
| FCP | < 1.8s — inline critical CSS, defer non-critical JS |
| CLS | < 0.1 — explicit width/height on all images |
| INP | < 200ms |
| TTFB | < 800ms |

## Image optimisation
WebP with fallback, max 150KB above-the-fold, lazy-load below-fold, preload hero, explicit width/height, responsive `srcset`.

## robots.txt
```
User-agent: *
Disallow: /thank-you
Sitemap: https://niconbuilt.com.au/sitemap.xml
```

## Title tag examples (from the brief — supersede for renamed/added pages per v7)
| Page | Title tag (draft) |
|---|---|
| Home | Heritage Renovation & Custom Builder Melbourne \| Nicon Built |
| Heritage Renovations | Heritage Home Renovations Melbourne \| Nicon Built |
| High-End Renovations *(now: Home Renovations and Extensions)* | High-End Home Renovations & Extensions Melbourne \| Nicon Built |
| General Maintenance *(now: Trades and Maintenance)* | Home Maintenance & Trade Services Melbourne \| Nicon Built |
| New Builds | Custom New Home Builders Melbourne \| Nicon Built |
| About | About Nicon Built \| Nick Kafkalas \| Melbourne Builder Since 1990 |
| Contact | Contact Nicon Built \| Melbourne Heritage & Renovation Builder |

## AEO / LLM discoverability
- `/llms.txt` at domain root — see `llms.txt` in the pack root
- FAQPage JSON-LD on every service page + homepage
- LocalBusiness JSON-LD (see below)
- E-E-A-T: Nick's name/photo/credentials on every service page, VBA licence number prominent on About + footer, affiliation logos (MBAV, AIB, HIA, BEA), static Google Reviews (9 existing)

### LocalBusiness schema (from the brief — real values)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nicon Built Pty Ltd",
  "@id": "https://niconbuilt.com.au",
  "url": "https://niconbuilt.com.au",
  "telephone": "[CRM NUMBER — GHL lead-gen number, not yet issued]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "186 Dow Street",
    "addressLocality": "Port Melbourne",
    "addressRegion": "VIC",
    "postalCode": "3207",
    "addressCountry": "AU"
  },
  "areaServed": ["Port Melbourne","Albert Park","Brighton","Malvern","Armadale"],
  "description": "Heritage renovation and custom building specialists, Melbourne."
}
```
⚠️ The brief's own example uses `0407699454` as a placeholder telephone — that's Nick's personal mobile, explicitly flagged in the brief itself to be **replaced by the GHL lead-gen number** before anything goes live. Never publish the personal mobile.

## Site architecture (brief's original 4-service version — extend per v7's 7 services)
| Page | URL |
|---|---|
| Home | niconbuilt.com.au/ |
| Heritage Renovations | /heritage-renovations-melbourne/ |
| High-End Renovations *(→ Home Renovations and Extensions)* | /home-renovations-melbourne/ |
| General Maintenance *(→ Trades and Maintenance)* | /home-maintenance-melbourne/ |
| New Builds | /new-builds-melbourne/ |
| About | /about/ |
| Our Work | /our-work/ |
| Testimonials | /testimonials/ |
| Contact | /contact/ |
| Privacy Policy | /privacy-policy/ |
| Thank You | /thank-you/ (noindex, excluded from sitemap) |
| Location pages | /heritage-renovations-[suburb]/ — one per priority suburb (not yet chosen) |
| Blog | /blog/[post-slug]/ |

Nav: Home | Services ▾ | Our Work | About | Contact. Services dropdown per the brief: Heritage Renovations | Renovations & Extensions | General Maintenance | New Builds — **extend this to 7 items** to match v7 (add Kitchen Renovations, Bathroom Renovations; rename per v7).

## Internal linking / breadcrumbs
- Every service page links to Contact, Our Work, and ≥2 other service pages
- Homepage links to all service + key location pages
- Blog posts link to ≥2 relevant service pages
- About links to all service pages
- Footer links to all main pages + key location pages
- Breadcrumbs on every page except Home: `Home > Services > Heritage Renovations Melbourne`, with `BreadcrumbList` JSON-LD

## Footer requirements
Business name, ABN, VBA licence number, phone (GHL number, click-to-call), email, full address (186 Dow Street, Port Melbourne VIC 3207), links to all main pages + privacy policy, Google review count/rating, MBAV/AIB/HIA/BEA logos, copyright (Nicon Built Pty Ltd).

## Trust / conversion
- Primary CTA every page: "Get a Free Quote" → contact form
- Secondary CTA: "Call Nick" → `tel:` to GHL number
- Sticky click-to-call on mobile
- Homepage contact form: Name, Phone, Suburb, Message
- All forms POST to GHL webhook — **never `mailto:` links**
- Form submit → GHL automation → Sara gets a text notification
- Missed-call text-back configured in GHL
- Form submit redirects to `/thank-you/` (noindex)

## Legal / compliance
- Privacy Policy required (GHL form data collection) — BPC standard template
- Thank You page — noindex, nofollow
- **ABN in footer: 88 632 512 577**

## Accessibility (WCAG 2.1 AA — flagged directly by Sara from the client's current site)
| Requirement | Note |
|---|---|
| Colour contrast | 4.5:1 minimum on all text/button combos. Current site's "Learn More" button disappears against the dark hero — do not repeat this. |
| Alt text | Every image needs descriptive alt text. Hero example given: "Heritage home renovation Port Melbourne by Nicon Built". Decorative images: `alt=""` |
| ARIA | Landmark roles on every page; ARIA labels on icon-only buttons |
| Keyboard nav | All interactive elements tabbable, visible focus states, skip-to-content link |
| Form labels | Real `<label>` elements — placeholder text is not a substitute |
| Font size | Minimum 16px body, never below 14px anywhere |
| Link clarity | Never rely on colour alone to distinguish links |
| Motion | Respect `prefers-reduced-motion` |

## 301 redirect strategy
⚠️ Sara has confirmed this happens later in the build, once ready — not a day-one blocker, but needs the full 38-page mapping before go-live.

| Old URL pattern | New destination | Type |
|---|---|---|
| /about/ | /about/ | Direct 301 |
| /contact/ | /contact/ | Direct 301 |
| /services/ | /heritage-renovations-melbourne/ | 301 to closest match |
| /home-builders-in-[suburb]/ | /home-renovations-[suburb]/ | 301 per suburb |
| /builders-in-[suburb]/ | /home-renovations-[suburb]/ | 301 per suburb |
| /multi-unit-builders-in-[suburb]/ | /new-builds-melbourne/ | 301 |
| /townhouse-builders-in-[suburb]/ | /new-builds-melbourne/ | 301 |
| /blog/[kept-post-slug]/ | /blog/[same-or-new-slug]/ | Direct 301 |
| /blog/[removed-post-slug]/ | / | 301 to Homepage |
| /build-areas/ | /home-renovations-melbourne/ | 301 |
| /portfolio-items/ | /our-work/ | 301 |
| /guarantees/ | /about/ | 301 |
| /unbounce-pages/* | / | 301 to Homepage |

Implement via `.htaccess`/nginx config, not JavaScript. Test with Screaming Frog before go-live, verify no redirect chains, check GSC for crawl errors post-launch.

## DNS transfer process
Nick adds sara@brightpathcreative.com.au as VentraIP admin → Sara updates DNS/nameservers only with Nick's explicit approval → **Microsoft 365 MX records must be preserved** → 24–48h propagation → pre-switch checklist: all pages built, all 301s mapped, SSL confirmed, GA4 connected.
