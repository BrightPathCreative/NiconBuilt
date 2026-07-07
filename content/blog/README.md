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

## Body content

Write normal paragraphs separated by a blank line. Optional headings:

```markdown
Opening paragraph.

Second paragraph.

## Section heading

More detail here.

### Subheading

Final paragraph.
```

## Adding your 8 articles

1. Place all `.md` files in this folder (or paste a folder of files here).
2. Set `published: true` on each post you want live.
3. Run `npm run dev` — posts appear on `/blog/`, the homepage “Recent articles” strip (latest 3), and the footer Blog link.

No code changes needed when swapping or adding posts — only edit or add files here.

## Current slots

The repo ships with **5 migrated posts** and **3 draft placeholders**. Replace the draft files with your final copy when ready.
