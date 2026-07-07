import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateIso: string;
  blocks: BlogBlock[];
};

type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  published?: boolean;
};

function parseFrontmatter(raw: string): { meta: BlogFrontmatter; body: string } {
  if (!raw.startsWith("---")) {
    throw new Error("Blog post missing frontmatter");
  }

  const end = raw.indexOf("---", 3);
  if (end === -1) throw new Error("Blog post frontmatter not closed");

  const frontmatter = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const meta: Record<string, string | boolean> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^([\w-]+):\s*(.+)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (value === "true") meta[key] = true;
    else if (value === "false") meta[key] = false;
    else meta[key] = value.replace(/^["']|["']$/g, "");
  }

  if (!meta.title || !meta.excerpt || !meta.date) {
    throw new Error("Blog post requires title, excerpt, and date in frontmatter");
  }

  return {
    meta: meta as BlogFrontmatter,
    body,
  };
}

function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

function parseBody(body: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];

  for (const chunk of body.split(/\n\n+/)) {
    const text = chunk.trim();
    if (!text) continue;

    if (text.startsWith("### ")) {
      blocks.push({ type: "h3", text: text.replace(/^###\s+/, "") });
      continue;
    }

    if (text.startsWith("## ")) {
      blocks.push({ type: "h2", text: text.replace(/^##\s+/, "") });
      continue;
    }

    blocks.push({ type: "p", text });
  }

  return blocks;
}

function loadBlogPostFromFile(filename: string): BlogPost | null {
  if (!filename.endsWith(".md") || filename.toLowerCase() === "readme.md" || filename.startsWith("_")) {
    return null;
  }

  try {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { meta, body } = parseFrontmatter(raw);

    if (meta.published === false) return null;

    const slug = filename.replace(/\.md$/, "");
    const dateIso = String(meta.date).slice(0, 10);

    return {
      slug,
      title: meta.title,
      excerpt: meta.excerpt,
      dateIso,
      date: formatDisplayDate(dateIso),
      blocks: parseBody(body),
    };
  } catch {
    return null;
  }
}

export function loadBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .map(loadBlogPostFromFile)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso));
}

/** Cached at build time — safe for static generation */
export const blogPosts = loadBlogPosts();

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}
