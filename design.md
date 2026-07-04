---
File: design.md
Status: DRAFT — awaiting client confirmation
---

# Motion & Interaction Spec — Nicon Built

> ⚠️ The wireframe (a static HTML mock) doesn't encode animation timing — only the general hover/interaction notes in the README. Everything below marked **ASSUMED** is a sensible default, not a client decision. Confirm or override before build.

## 1. Easing & Timing

| Token | Value / Description |
|---|---|
| `--ease-out` (default) | `cubic-bezier(0.16, 1, 0.3, 1)` — **ASSUMED**, standard smooth deceleration |
| `--ease-in-out` (modals) | `cubic-bezier(0.65, 0, 0.35, 1)` — **ASSUMED** |
| `--duration-fast` (hover states) | 150ms — **ASSUMED** |
| `--duration-base` (reveals) | 500ms — **ASSUMED** |
| `--duration-slow` (hero entrance) | 800ms — **ASSUMED** |
| Stagger delay between items | 80ms per item — **ASSUMED** |
| Reduced-motion rule | See below (standard, not project-specific) |

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

## 2. Hero Entrance Sequence

**ASSUMED** — order and timing not specified in source material. Draft sequence:

| Step | Element | Animation | Delay |
|---|---|---|---|
| 1 | Hero background image | Fade in from 0 opacity | 0ms |
| 2 | Nav bar | Fade + slide down 8px | 100ms |
| 3 | Eyebrow ("Home Services · Melbourne") | Fade + slide up 12px | 250ms |
| 4 | H1 ("Everyday trades, done right.") | Fade + slide up 16px | 350ms |
| 5 | Quote-form card | Fade + slide up 20px | 500ms |

## 3. Scroll-Reveal Behaviour

| Setting | Value |
|---|---|
| Trigger (IntersectionObserver threshold) | 0.2 — **ASSUMED** |
| Default reveal animation | Fade-up, 24px travel — **ASSUMED** |
| Stagger on card grids (12-trade grid, credentials, FAQ) | 60ms between items — **ASSUMED** |
| Elements that do NOT reveal (always visible) | Nav bar, hero content (uses entrance sequence above instead), footer |

## 4. Hover States

Confirmed qualitatively from the README; exact values below are proposed implementations.

| Element | Hover behaviour |
|---|---|
| Primary CTA button (dark, `#1A1A1A` bg) | Darken slightly (e.g. `#000`) + 1px lift — confirmed direction, exact values **ASSUMED** |
| Secondary / ghost button ("Click to call", translucent on hero) | Background opacity increases slightly on hover — **ASSUMED** |
| Nav links | Underline or opacity shift — **ASSUMED**, no exact spec given |
| Trade / service cards | Subtle lift (shadow) and/or reveal a "→" — confirmed from README, exact shadow value **ASSUMED**: `0 8px 24px -8px rgba(0,0,0,0.15)` |
| Image tiles (portfolio, also-available) | Slight scale-up on the image only (`scale(1.03)`), clipped by the container — **ASSUMED** |
| Footer links | Underline on hover — confirmed from README |
| Social icons | **N/A currently** — no social links/icons exist in the current design; add hover spec once social links are confirmed |

## 5. Forms, Lightbox & Cookie Banner

| Element | Behaviour / spec |
|---|---|
| Form field focus state | Border colour shifts from `--color-border-strong` to `--color-primary` — **ASSUMED** |
| Form validation style | Red border + inline error text below field — **ASSUMED**, standard pattern |
| Form success state | Replace form with a confirmation message (e.g. "Thanks — we'll be in touch today") — **ASSUMED**, exact copy needs client sign-off |
| Form error state | Inline banner above the submit button — **ASSUMED** |
| Lightbox open animation | **Not yet needed** — the wireframe's "Recent work" and "Before & after" sections use static images with "View portfolio →" links, not an in-page lightbox. Confirm with the client whether a lightbox/gallery is wanted, or whether "View portfolio" should link out to a separate page. |
| Lightbox close (click-outside / X) | N/A until the above is resolved |
| Cookie banner position | **ASSUMED**: bottom, full-width bar |
| Cookie banner accept / decline behaviour | **ASSUMED**: Accept dismisses and sets analytics consent; Decline dismisses without loading GA4 |
| Cookie banner re-trigger rule | **ASSUMED**: re-shows if no consent cookie found after 12 months |

## Quote-form validation (confirmed from the design)

The hero "Get a free quote" form has four fields: Name, Suburb, Job type (select), Phone. Per the handoff README:

- Name — required
- Phone — required, AU phone format
- Suburb — required
- Job type — required select

**Job type options currently in the wireframe markup:** Tiling, Plastering, Electrical, Plumbing, Brickwork, Caulking, Maintenance, Extension / new build, Other.

⚠️ **Gap flagged in the source README itself:** this list is missing six trades that appear everywhere else on the page (Painting, Roofing, Carpentry, Floor laying, Pest control, Cleaning). Extend the select to include all twelve trades plus Maintenance, Extension / new build, and Other before build.
