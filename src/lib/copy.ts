import fs from "fs";
import path from "path";
import { SERVICE_PAGES } from "./service-page-config";

const COPY_DIR = path.join(process.cwd(), "docs", "copy");

export type FaqItem = { question: string; answer: string };

export type ServiceTile = {
  title: string;
  description: string;
  sub?: string;
  extra?: string;
};

export type Review = {
  meta: string;
  quote: string;
  author: string;
};

export type ParsedCopy = {
  raw: string;
  tagline?: string;
  headline?: string;
  subheadline?: string;
  intro?: string;
  heroTrust?: string;
  statsStrip?: string[];
  sections: { title: string; content: string }[];
  faqs: FaqItem[];
  paragraphs: string[];
  bullets: string[];
  serviceTiles: ServiceTile[];
  reviews: Review[];
  serviceAreas?: string;
};

function stripFrontmatter(content: string): string {
  if (content.startsWith("---")) {
    const end = content.indexOf("---", 3);
    if (end !== -1) return content.slice(end + 3).trim();
  }
  return content.trim();
}

function stripMetaLines(content: string): string {
  return content
    .split("\n")
    .filter(
      (line) =>
        !line.startsWith("⚠️") &&
        !line.startsWith("✅") &&
        !line.match(/^SEO targets:/) &&
        !line.match(/^File:/) &&
        !line.match(/^Status:/) &&
        !line.match(/^Page:/) &&
        !line.match(/^URL slug:/) &&
        !line.match(/^Word count/) &&
        !line.match(/^Last updated:/) &&
        !line.includes("PLACEHOLDER") &&
        !line.includes("<!--")
    )
    .join("\n");
}

function parseHeadlineSection(content: string): { headline?: string; subheadline?: string } {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return {};
  return {
    headline: lines[0],
    subheadline: lines.slice(1).join(" ") || undefined,
  };
}

function parseServiceTiles(content: string): ServiceTile[] {
  const tiles: ServiceTile[] = [];
  const lines = content.split("\n");
  let current: ServiceTile | null = null;

  for (const line of lines) {
    const tileMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/);
    if (tileMatch) {
      if (current) tiles.push(current);
      current = { title: tileMatch[1], description: tileMatch[2] };
      continue;
    }
    if (!current) continue;
    const subMatch = line.match(/^\s*Sub:\s*(.+)$/i);
    if (subMatch) {
      current.sub = subMatch[1].replace(/\s·\s/g, " · ");
      continue;
    }
    if (line.trim() && !line.startsWith("Sub:")) {
      current.extra = current.extra ? `${current.extra} ${line.trim()}` : line.trim();
    }
  }
  if (current) tiles.push(current);
  return tiles;
}

function parseReviews(content: string): Review[] {
  const reviews: Review[] = [];
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const bulletMatch = trimmed.match(/^[-*]\s+(.+?):\s*"(.+)"$/);
    if (bulletMatch) {
      reviews.push({
        meta: bulletMatch[1],
        quote: bulletMatch[2],
        author: extractAuthor(bulletMatch[1]),
      });
      continue;
    }

    const numberedMatch = trimmed.match(/^\d+\.\s+(.+?):\s*"(.+)"$/);
    if (numberedMatch) {
      reviews.push({
        meta: numberedMatch[1],
        quote: numberedMatch[2],
        author: extractAuthor(numberedMatch[1]),
      });
    }
  }
  return reviews;
}

function extractAuthor(meta: string): string {
  const withoutTimestamp = meta.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const afterStar = withoutTimestamp.replace(/^5★\s*/, "").trim();
  const paren = afterStar.indexOf("(");
  if (paren > 0) return afterStar.slice(0, paren).trim();
  if (afterStar.includes(",")) return afterStar.split(",")[0].trim();
  return afterStar;
}

/** Strip relative timestamps and author names — display stars only in review UI */
export function formatReviewMeta(meta: string): string {
  const starMatch = meta.match(/^(\d★)/);
  return starMatch ? starMatch[1] : "5★";
}

export function loadCopy(slug: string): ParsedCopy {
  const filePath = path.join(COPY_DIR, `${slug}.md`);
  const raw = stripMetaLines(stripFrontmatter(fs.readFileSync(filePath, "utf-8")));
  const sections: { title: string; content: string }[] = [];
  const faqs: FaqItem[] = [];
  let tagline: string | undefined;
  let headline: string | undefined;
  let subheadline: string | undefined;
  let intro: string | undefined;
  let heroTrust: string | undefined;
  let statsStrip: string[] | undefined;
  let serviceAreas: string | undefined;
  let bullets: string[] = [];
  let currentSection = "";
  let currentContent: string[] = [];

  const flushSection = () => {
    if (currentSection) {
      sections.push({ title: currentSection, content: currentContent.join("\n").trim() });
    }
    currentSection = "";
    currentContent = [];
  };

  const lines = raw.split("\n");
  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushSection();
      currentSection = line.replace(/^##\s+/, "").trim();
      continue;
    }

    if (line.startsWith("### ")) {
      flushSection();
      currentSection = line.replace(/^###\s+/, "").trim();
      continue;
    }

    const faqMatch = line.match(/^\*\*(.+?)\*\*\s*(.*)$/);
    if (faqMatch && !line.startsWith("**H1:**")) {
      const [, question, rest] = faqMatch;
      faqs.push({ question, answer: rest || "" });
      continue;
    }

    if (faqs.length > 0 && faqs[faqs.length - 1].answer === "" && line.trim()) {
      faqs[faqs.length - 1].answer = line.trim();
      continue;
    }

    if (currentSection === "Hero" && line.startsWith("**H1:**")) {
      headline = line.replace("**H1:**", "").trim();
      continue;
    }

    if (currentSection === "Hero" && line.match(/^\*5\.0 Stars/)) {
      heroTrust = line.replace(/^\*|\*$/g, "").trim();
      continue;
    }

    if (currentSection.startsWith("What's included") && line.startsWith("- ")) {
      bullets.push(line.replace(/^-\s*/, "").trim());
      continue;
    }

    currentContent.push(line);
  }
  flushSection();

  const taglineSection = sections.find((s) => s.title === "Tagline");
  if (taglineSection) tagline = taglineSection.content.trim();

  const headlineSection = sections.find((s) => s.title === "Headline");
  if (headlineSection) {
    const parsed = parseHeadlineSection(headlineSection.content);
    headline = headline || parsed.headline;
    subheadline = parsed.subheadline;
  }

  const heroSection = sections.find((s) => s.title === "Hero");
  if (heroSection) {
    const heroLines = heroSection.content
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("*"));
    if (!headline && heroLines[0]) headline = heroLines[0];
    intro = heroLines.join("\n\n");
  }

  const pageCopy = sections.find((s) => s.title === "Page copy");
  if (pageCopy) {
    intro = pageCopy.content.trim();
  }

  const statsSection = sections.find((s) => s.title === "Stats strip");
  if (statsSection) {
    statsStrip = statsSection.content
      .split(/[—–-]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const areasSection = sections.find((s) => s.title === "Service areas");
  if (areasSection) serviceAreas = areasSection.content.trim();

  const tilesSection = sections.find((s) => s.title.startsWith("Service tiles"));
  let serviceTiles = tilesSection ? parseServiceTiles(tilesSection.content) : [];

  // Service tile lists must stay under the Service tiles heading. If another ## section
  // was inserted before the numbered list, recover tiles from the following sections.
  if (!serviceTiles.length && tilesSection) {
    const tilesIndex = sections.findIndex((s) => s.title.startsWith("Service tiles"));
    for (let i = tilesIndex + 1; i < sections.length; i++) {
      const candidate = parseServiceTiles(sections[i].content);
      if (candidate.length) {
        serviceTiles = candidate;
        break;
      }
    }
  }

  const reviewsSection =
    sections.find((s) => s.title.startsWith("Top 3 Google reviews")) ||
    sections.find((s) => s.title.startsWith("Reviews to publish")) ||
    sections.find((s) => s.title.startsWith("All reviews"));
  const reviews = reviewsSection ? parseReviews(reviewsSection.content) : [];

  const includedSection = sections.find((s) => s.title.startsWith("What's included"));
  if (includedSection && !bullets.length) {
    bullets = includedSection.content
      .split("\n")
      .filter((l) => l.startsWith("- "))
      .map((l) => l.replace(/^-\s*/, "").trim());
  }

  const paragraphs = intro ? splitParagraphs(intro) : [];

  return {
    raw,
    tagline,
    headline,
    subheadline,
    intro,
    heroTrust,
    statsStrip,
    sections,
    faqs,
    paragraphs,
    bullets,
    serviceTiles,
    reviews,
    serviceAreas,
  };
}


export function getSection(copy: ParsedCopy, title: string): string | undefined {
  return copy.sections.find((s) => s.title === title || s.title.startsWith(title))?.content;
}

function splitParagraphs(text: string): string[] {
  const blocks = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (blocks.length > 1) return blocks;
  return text
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export function getSectionParagraphs(copy: ParsedCopy, title: string): string[] {
  const content = getSection(copy, title);
  if (!content) return [];
  return splitParagraphs(content);
}

/** Map service tile title to nav slug */
export const serviceTileSlugs: Record<string, string> = Object.fromEntries(
  SERVICE_PAGES.map((page) => [page.tileTitle, page.slug])
);

export const serviceImageKeys = SERVICE_PAGES.map((page) => page.imageKey);
