import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services, locationPages } from "@/lib/navigation";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = [
    "",
    "about/",
    "services/",
    "our-work/",
    "testimonials/",
    "contact/",
    "faq/",
    "privacy-policy/",
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map((path) => ({
      url: `${base}/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...locationPages.map((l) => ({
      url: `${base}${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];

  return entries;
}
