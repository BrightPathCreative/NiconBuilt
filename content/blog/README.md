# Blog posts

Drop pre-written articles here as Markdown files (`.md`). The site loads every published file in this folder automatically.

## File naming

Use the URL slug as the filename:

```
content/blog/should-i-renovate-or-build-new.md
→ https://niconbuilt.com.au/blog/should-i-renovate-or-build-new/
```

## Frontmatter (required)

```yaml
---
title: Should I Renovate or Build New?
excerpt: Practical guidance on choosing between renovating and building new.
date: 2023-03-12
published: true
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Page H1 and meta title |
| `excerpt` | Yes | Card teaser + meta description (~150 chars) |
| `date` | Yes | ISO date `YYYY-MM-DD` — used for sorting (newest first) |
| `published` | No | Default `true`. Set `false` to hide until ready |
| `image` | No | Public path to a hero/thumbnail image, e.g. `/images/blog/how-to-keep-your-build-within-budget.webp`. Shown on the blog index card, the homepage "Recent articles" card, and as the hero image on the post page. Omit until an image is supplied — the card/page layout works fine without one |
| `imageAlt` | No | Descriptive alt text for `image`. Falls back to the post title if omitted |

## Body content

Write normal paragraphs separated by a blank line. Optional headings, bullet lists, and inline `**bold**`, `*italic*` and `[link text](https://example.com)` formatting are all supported:

```markdown
Opening paragraph with **bold** and *italic* text, and a [link](https://example.com).

Second paragraph.

## Section heading

### Subheading

- Bullet point one
- Bullet point two

Final paragraph.
```

## Adding images

Drop the image file in `public/images/blog/` (create the folder if it doesn't exist) named after the post slug, e.g. `public/images/blog/how-to-keep-your-build-within-budget.webp`, then add `image: /images/blog/how-to-keep-your-build-within-budget.webp` to that post's frontmatter.

## Adding articles

1. Place all `.md` files in this folder (or paste a folder of files here).
2. Use the URL slug as the filename (see File naming above).
3. Set `published: true` on each post you want live.
4. Run `npm run dev` — posts appear on `/blog/`, the homepage “Recent articles” strip (latest 3), and the footer Blog link.

No code changes needed when swapping or adding posts — only edit or add files here.

## Current slots

The repo ships with **8 published posts**, each with a hero/thumbnail image in place.
