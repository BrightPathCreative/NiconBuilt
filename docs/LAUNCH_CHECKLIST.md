# Launch Checklist — Nicon Built

Use this list in order. Do not switch DNS until every **Go-live blocker** item is checked.

**Preview URL (review now):** https://nicon-built-7rfb08zo9-bright-path-creative.vercel.app  
**Production domain (after approval):** https://niconbuilt.com.au  
**Vercel project:** `bright-path-creative/nicon-built`

---

## Phase 1 — Client review (current stage)

Site is built and deployed to Vercel preview. No integrations required yet for review.

- [ ] Share preview URL with Nick for content/design approval
- [ ] Confirm 5 location suburbs (Brighton, Armadale, Malvern, Albert Park, Elwood) — or request changes
- [ ] Confirm Services Overview at `/services/` (old WP `/services/` uses same URL — no redirect needed)
- [ ] Confirm 8 testimonials published (Johnny Andrianakis review removed per brief)
- [ ] Confirm location page copy and 5 blog posts are acceptable (drafted for review — not verbatim v7)
- [ ] Confirm privacy policy text is acceptable
- [ ] Flag any copy or photo changes before go-live

**Not needed for review:** GHL webhook, GHL phone, GA4, VBA number, affiliation logos, domain DNS.

---

## Phase 2 — GoHighLevel (GHL) setup

GHL = GoHighLevel CRM. All contact forms POST to a **webhook URL** (not email). Nick gets leads via GHL automations.

### What is the GHL webhook?

When someone submits the contact form, the site sends JSON to a URL GoHighLevel gives you. GHL stores the lead and can trigger texts/emails to Sara/Nick. The URL looks like:

`https://services.leadconnectorhq.com/hooks/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

### Checklist

- [ ] Create (or locate) the website enquiry form/workflow in GoHighLevel
- [ ] Copy the **Inbound Webhook URL** from GHL
- [ ] Add to **Vercel → Settings → Environment Variables**:
  - `GHL_WEBHOOK_URL` = the webhook URL
- [ ] Test: submit the contact form on preview → confirm lead appears in GHL
- [ ] Confirm missed-call text-back is configured in GHL (not on the website)

### GHL lead-gen phone (provide at go-live)

- [ ] Nick provides the **GHL lead-gen number** (not `0407699454` — that is Nick's personal mobile and must never appear on the site)
- [ ] Add to Vercel env vars: `NEXT_PUBLIC_PRIMARY_PHONE` = e.g. `0412345678`
- [ ] Redeploy and verify: header click-to-call, footer, contact page, schema

---

## Phase 3 — Analytics (GA4)

### How to get the Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. **Admin** → **Data streams** → select (or create) stream for `niconbuilt.com.au`
3. Copy **Measurement ID** — format `G-XXXXXXXXXX`

### Checklist

- [ ] Create GA4 property + web data stream for `niconbuilt.com.au` (if not already done)
- [ ] Add to Vercel env vars: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
- [ ] Redeploy
- [ ] Verify in GA4 **Realtime** report while browsing the live site
- [ ] Add Sara/Nick as GA4 users if needed
- [ ] Link GA4 to **Google Search Console** (same Google account)
- [ ] Decide cookie/consent approach (brief does not require a cookie policy page — confirm with client)

**To hand the ID to dev:** paste `G-XXXXXXXXXX` in chat or add directly in Vercel (no code change needed if env var is set).

---

## Phase 4 — Credentials & assets

### VBA licence number

**Decision:** leave blank until Nick supplies it.

- [ ] When ready: add `NEXT_PUBLIC_VBA_LICENCE_NUMBER` in Vercel and redeploy
- [ ] Until then: site shows generic “VBA licensed builder” (no number) — acceptable for launch if client agrees

### Affiliation logos (MBAV, AIB, HIA, BEA)

- [ ] Client provides logo files (PNG or SVG, transparent background preferred)
- [ ] Add to `public/images/affiliations/` — e.g. `mbav.png`, `aib.png`, `hia.png`, `bea.png`
- [ ] Dev wires logos into footer + About page (or confirm text-only footer is OK for v1 launch)

### Other assets (optional)

- [ ] Replace OG image if client wants branded version (`public/images/og-image.webp`)
- [ ] Add any final gallery photos to Our Work (exclude photos with Callum or John per Nick's instruction)
- [ ] Confirm blog post list (~10 of 41) and migrate full content if needed

---

## Phase 5 — Environment variables (Vercel)

Set all of these in **Vercel → nicon-built → Settings → Environment Variables** for **Production** (and Preview if testing there).

| Variable | Required at launch? | Value / notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://niconbuilt.com.au` |
| `GHL_WEBHOOK_URL` | Yes | From GoHighLevel (Phase 2) |
| `NEXT_PUBLIC_PRIMARY_PHONE` | Yes | GHL lead-gen number (Phase 2) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | `G-XXXXXXXXXX` (Phase 3) |
| `NEXT_PUBLIC_VBA_LICENCE_NUMBER` | Optional | Blank OK until Nick provides |
| `GOOGLE_BUSINESS_PROFILE_ID` | Optional | Only if pulling live reviews |

- [ ] All required vars set in Vercel
- [ ] Trigger **Redeploy** after changing env vars (Deployments → ⋮ → Redeploy)

Local dev: copy `.env.example` → `.env.local` with the same values.

---

## Phase 6 — Domain & DNS (after client approval)

**Decision:** connect domain only once site is approved to go live.

### Before touching DNS

- [ ] Client has signed off preview site
- [ ] Phases 2–5 complete (form, phone, GA4 at minimum)
- [ ] Nick has added `sara@brightpathcreative.com.au` as VentraIP admin (per technical brief)

### Vercel domain

- [ ] Vercel → Project → **Domains** → Add `niconbuilt.com.au` and `www.niconbuilt.com.au`
- [ ] Note DNS records Vercel displays (A + CNAME)

### VentraIP DNS (VentraIP panel)

- [ ] Update **A record** for `@` → `76.76.21.21` (Vercel — confirm current value in Vercel dashboard)
- [ ] Update **CNAME** for `www` → `cname.vercel-dns.com`
- [ ] **Do NOT modify MX records** — Microsoft 365 email must keep working
- [ ] Wait 24–48 hours for propagation
- [ ] Confirm SSL certificate active in Vercel (automatic)
- [ ] Test email send/receive after DNS change

Full detail: [DEPLOY.md](./DEPLOY.md)

---

## Phase 7 — 301 redirects (before & after DNS)

Redirects live in [`src/lib/redirects.ts`](../src/lib/redirects.ts) (~80 rules from old WordPress URLs). Reference: [redirects.csv](./redirects.csv)

### Before go-live

- [ ] Export old URLs from WordPress sitemap or Screaming Frog crawl of `niconbuilt.com.au`
- [ ] Cross-check against [redirects.csv](./redirects.csv) — add any missing old URLs (never 404 an indexed URL)
- [ ] Test on **preview URL** with Screaming Frog **List Mode**: old path → 301 → correct new path, single hop only
- [ ] Confirm no redirect chains (A → B → C)

### After DNS live

- [ ] Re-run Screaming Frog on `https://niconbuilt.com.au`
- [ ] Google Search Console → submit new sitemap: `https://niconbuilt.com.au/sitemap.xml`
- [ ] Monitor GSC → Pages → “Not found” for 2–4 weeks
- [ ] Keep WordPress hosting alive ~30 days as rollback safety net

---

## Phase 8 — Pre-launch QA

- [ ] Submit contact form on production domain → lands in GHL → redirects to `/thank-you/`
- [ ] Click-to-call works on mobile (GHL number)
- [ ] All main pages load (home, 7 services, about, contact, our work, testimonials, FAQ, 5 locations)
- [ ] Privacy policy linked from footer
- [ ] `/thank-you/` is noindex (check robots meta)
- [ ] PageSpeed test — target 90+ mobile (hero image preloaded; old site was 36/100)
- [ ] Quick accessibility pass: form labels, focus states, contrast, skip link
- [ ] Spot-check copy — no `[CRM NUMBER]`, no `0407699454`, no placeholder text visible

---

## Phase 9 — Post-launch

- [ ] Announce go-live to Nick
- [ ] Update Google Business Profile website URL if needed
- [ ] Update Facebook / Instagram bio links if needed
- [ ] Archive or disable old WordPress site after 30-day safety period
- [ ] Schedule 2-week check-in: GSC errors, form submissions, GA4 traffic

---

## Quick reference — who provides what

| Item | Who | When |
|---|---|---|
| Site approval | Nick / Sara | Before DNS |
| GHL webhook URL | Sara (from GHL setup) | Before go-live |
| GHL lead-gen phone | Nick / Sara | At go-live |
| GA4 Measurement ID | Sara (Google Analytics) | Before or at go-live |
| VBA licence number | Nick | When available (blank OK initially) |
| Affiliation logos | Nick / client | Before or shortly after launch |
| Domain DNS switch | Sara (VentraIP, Nick's approval) | After approval |
| VentraIP admin access | Nick adds Sara | Before DNS |

---

## Never do at launch

- Never publish **0407699454** anywhere (Nick's personal mobile)
- Never change **Microsoft 365 MX records** during DNS update
- Never go live without **GHL webhook** (form will fail in production)
- Never create **redirect chains** (always direct A → C)
