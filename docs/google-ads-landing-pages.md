# Google Ads landing pages

Dedicated paid-traffic landing pages, separate from the organic service pages
they were duplicated from.

## The pages

| Campaign / ad group | Landing page | Duplicated from |
|---|---|---|
| Property & Home Maintenance | `/lp/property-maintenance-melbourne/` | `/property-maintenance-melbourne/` |
| Structural Remedial & Restoration | `/lp/structural-remedial-restoration-melbourne/` | `/heritage-renovations-melbourne/` |

Point the ad group's final URL at the `/lp/` address. The organic pages stay
exactly as they are and keep ranking.

## What makes them different from the service pages

- **No navigation, and no footer at all.** The header is the logo plus the two
  CTAs — click-to-call and "Get a free quote" — and nothing else. There is no
  footer element and no outbound link anywhere on the page. Every element is
  either the quote form, the phone number, or proof that supports them.

  One consequence to be aware of: there is no privacy policy link on these
  pages. Google Ads expects one on a page collecting personal data, and the
  Privacy Act applies to the form regardless. If ads are ever disapproved on
  this basis, add a small-print line (ABN, VBA licence, privacy policy link)
  inside the closing CTA band or directly under the form — not a footer.
- **Form in the hero, already open.** The site's own heroes hide the form behind
  a "Start my free quote" toggle. On a paid click that's a step too many, so the
  form renders expanded, above the fold on desktop and immediately below the
  headline on mobile.
- **Message-matched H1.** The headline carries the ad group's head term rather
  than the SEO page title, so what the searcher clicked is the first thing they
  read.
- **Conversion path section order.** Offer and form → trust bar → why us →
  how it works → scope → recent work → reviews → FAQ → one last ask. Sticky
  call/quote bar on mobile throughout.

## Indexing

Every `/lp/` page is `noindex, nofollow` with a self-referencing canonical, and
is left out of `sitemap.xml`. That is what stops it competing with the organic
page it duplicates.

**Do not add `Disallow: /lp/` to robots.txt.** Googlebot has to be able to fetch
the page to see the `noindex`; blocking the crawl can leave the URL indexed with
no content instead of dropping it. `AdsBot-Google` isn't covered by the
`User-agent: *` rules anyway, so the current robots.txt already lets ad quality
checks through.

## Tracking

No separate setup — landing pages inherit the site's:

- **Attribution.** `TrackingParamsCapture` stores `gclid`, `wbraid`, `gbraid`
  and the `utm_*` params on landing, and `GhlEmbedForm` forwards them (plus
  `page_path`) on the GHL iframe `src`. The matching hidden fields have to exist
  on the form in GHL for the values to land on the contact record.
- **Conversions.** A detected submission pushes `ghl_form_submit` to the
  dataLayer (with `page` set to the landing page path) and fires a
  `generate_lead` GA4 event, then redirects to `/thank-you/`. Build the Google
  Ads conversion off the `ghl_form_submit` dataLayer event in GTM; segment by
  `page` to split landing page leads from the rest of the site.
- **Calls.** Click-to-call uses the same `CallButton` as the site. Call
  conversions still need to be set up in Google Ads separately if they're wanted.

## Adding another landing page

1. Add a config entry to `src/lib/landing-pages.ts`. Body copy, bullets and FAQs
   are read from `docs/copy/<copySlug>.md` — the same approved copy the organic
   page uses — so only the ad-facing framing (H1, sub-headline, benefit lines,
   the three steps, the closing ask) is written in the config.
2. Add `src/app/(ads)/lp/<slug>/page.tsx` — four lines, copy an existing one.
3. Set `organicUrl` so it's clear which page it duplicates. When the approved
   copy changes, both get updated together.

## Structure

`src/app/` is split into two route groups so the two kinds of page can have
different chrome:

- `(site)/` — the public website: header nav, footer, sticky call bar.
- `(ads)/` — landing pages: logo-and-CTAs header, no footer, no nav.

`src/app/layout.tsx` is now a document shell only — fonts, GTM, GA, attribution
capture and the site-wide schema. Anything visual belongs in a group layout.
