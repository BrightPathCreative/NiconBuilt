---
File: docs/content-notes.md
Status: DRAFT — awaiting client confirmation
---

# Design Bible — Nicon Built ("The Showcase", Concept 1b)

Source: `Nicon_Landing_Wireframes_dc.html`, `<article id="1b">` block only. Palette, type, and spacing below are transcribed directly from that file — confirmed against both the design README and the wireframe's inline styles, not assumed.

## 1. Colour Tokens

> ⚠️ **Rule** — only the values below may be used anywhere in the build. Reference by CSS variable name in components, never by raw hex/oklch.

### Required 8-token block

The design has more nuance than 8 slots can capture cleanly (multiple muted-text shades, multiple surface shades, a distinct dark footer). The mapping below picks the single best-fit value for each required token; the **extended token block underneath carries the rest** — use both.

```css
:root {
  --color-primary: #1A1A1A;       /* Ink — headings, primary text, primary buttons */
  --color-secondary: #141414;     /* Footer dark */
  --color-accent: oklch(0.70 0.12 65);  /* Warm ochre — badges, "AFTER" tag, accents */
  --color-background: #EDEBE7;    /* Page canvas */
  --color-surface: #FAF9F7;       /* Card / panel surface */
  --color-text: #57544B;          /* Body text */
  --color-text-muted: #78746A;    /* Muted / secondary text */
  --color-border: #EAE7E0;        /* Light borders */
}
```

### Extended tokens (use alongside the above for full fidelity)

```css
:root {
  --color-surface-alt: #FCFBF9;
  --color-surface-white: #fff;
  --color-tone-band: #F3F1EC;         /* Light tone-band section background */
  --color-border-alt: #E4E0D9;
  --color-border-strong: #D8D3CA;     /* Form field borders */
  --color-text-muted-alt: #6B675E;
  --color-text-muted-light: #8C877E;
  --color-footer-border: #2A2A28;
  --color-footer-text: #8E897E;
  --color-footer-links: #A8A39A;
  --color-accent-label: oklch(0.62 0.12 55);  /* Ochre label/eyebrow text on light backgrounds */
  --color-accent-eyebrow-on-dark: oklch(0.82 0.09 70); /* Lighter ochre tint used for the hero eyebrow, on the dark hero image */
  --color-star-gold: #E8A33D;         /* Star rating icons */
  --color-badge-before-bg: rgba(0,0,0,0.62); /* "BEFORE" badge background, white text */
}
```

**Palette was supplied by the client design/reference file — do not alter, tint, or "improve" any of these values.**

## 2. Typography

| Property | Value |
|---|---|
| Heading font family | Archivo |
| Body font family | Barlow |
| Labels / eyebrows / meta font | JetBrains Mono |
| Heading weights (allowed) | 600, 700, 800, 900 |
| Body weights (allowed) | 400, 500, 600 |
| Label weights (allowed) | 400, 500 |
| Base font size | 15–17px (body copy) |
| Line height | 1.6 (body) |
| Letter-spacing (headings) | -0.5px to -1.5px depending on size (hero H1 tightest) |
| Letter-spacing (labels/eyebrows) | 2–3px, uppercase |
| Text transform rules | Eyebrows/labels always uppercase; no uppercase on CTA button text |
| Google Fonts URL | `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Barlow:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap` |

### Confirmed key sizes

| Element | Size / weight / spacing |
|---|---|
| Hero H1 | 64px / 900 / -1.5px letter-spacing / line-height 0.98 |
| Section H2 | 36–40px / 800 / -0.5px letter-spacing |
| Card title | 19–20px / 700 |
| Body copy | 15–17px / 1.6 line-height |
| Eyebrow / label | 12–13px mono, uppercase, 2–3px letter-spacing |
| Final CTA H2 | 44px / 900 / -1px letter-spacing |

## 3. Layout Rules

| Rule | Value |
|---|---|
| Max content width | 1280px (desktop container) |
| Section padding (horizontal) | 48px |
| Section padding (vertical) | 56–80px rhythm between sections |
| Grid columns (desktop) | 4-column (trades grid); 3-column (credentials → see note); responsive per section |
| Grid columns (mobile) | 1 column (trades grid collapses via tablet 2-col step) |
| Card border-radius | 12px |
| Large panel / hero card radius | 14px |
| Pill radius | 100px |
| Button radius | 8px |
| Button style | Rounded, 8px — confirmed from the wireframe's inline button styles, not "sharp" or "pill" |
| Image treatment | Trade-card images: 132px fixed height, `object-fit: cover`; portfolio/before-after images: `object-fit: cover` within fixed-height containers (230–420px depending on section); dark gradient overlay on hero and final-CTA background photos |
| Shadow style | Soft, large-radius drop shadow on the outer page card only (`0 30px 60px -30px rgba(0,0,0,0.25)`) — not used elsewhere in the current design |
| Standard grid gap | 16px |
| Card image height (trades grid) | 132px |

## 4. This Site IS / IS NOT

> Drafted from the design brief and README for confirmation — not verbatim client copy, but structural scope statements. Please confirm.

| This site IS | This site IS NOT |
|---|---|
| A single, photography-led marketing homepage built to drive quote requests and calls | An e-commerce, booking, or payment site |
| A trust-building page — 40+ years, licensed & insured, 5★ rated, credentials, testimonials, before/after proof | Built (yet) as a full multi-page site — individual service pages, About, Contact, and Location pages are referenced by the nav/footer but have **no page design supplied**. See the open question in `docs/sitemap.md`. |
| Fully responsive down from the 1280px desktop design | Shipped with the current stock placeholder photography — every image must be swapped for real Nicon Built project photos before launch |
| Locked to the palette, type, and spacing defined above | Free-form on colour, font, or spacing choices — no substitutions without client sign-off |
| A vehicle for the client's real business facts (ABN, phone, licence number, insurance figure) once confirmed | Live with any placeholder business fact, regulated claim, or `[PLACEHOLDER]` value still showing |
