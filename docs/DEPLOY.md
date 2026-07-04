# Deployment & DNS

**Start here for go-live:** [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) — phased checklist with checkboxes.

Copy `.env.example` to `.env.local` and set:

| Variable | Required for launch | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://niconbuilt.com.au` |
| `GHL_WEBHOOK_URL` | Yes | GoHighLevel form webhook endpoint |
| `NEXT_PUBLIC_PRIMARY_PHONE` | Yes | GHL lead-gen number — never use 0407699454 |
| `NEXT_PUBLIC_VBA_LICENCE_NUMBER` | Optional | From Nick when available — blank OK until then |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | GA4 property ID (G-XXXXXXXX) |
| `NEXT_PUBLIC_DEV_PHONE` | Dev only | Optional local testing phone |

## Vercel deployment

1. Push repo to GitHub
2. Import project in Vercel, set root directory to `nicon-built`
3. Add all env vars above in Vercel project settings
4. Deploy

## DNS cutover (VentraIP → Vercel)

1. Add `niconbuilt.com.au` in Vercel → Domains
2. At VentraIP DNS: update A record to `76.76.21.21` and CNAME `www` to `cname.vercel-dns.com`
3. **Do not modify MX records** — Microsoft 365 email must stay intact
4. Wait 24–48h propagation
5. Run Screaming Frog redirect test on production URL
6. Submit sitemap in Google Search Console

## Affiliation logos

MBAV, AIB, HIA, BEA logos referenced in footer — add to `public/images/affiliations/` when supplied.
