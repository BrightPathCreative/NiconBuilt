import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Nicon Built Melbourne Builder",
  description: "Building and renovation insights from Nicon Built, Melbourne heritage renovation specialists.",
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog/" },
];

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className="container">
          <h1>Building & Renovation Insights</h1>
          <p>Practical advice from 30+ years building across Melbourne&apos;s inner south.</p>

          <div style={{ display: "grid", gap: "16px", marginTop: "32px" }}>
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="card"
                style={{
                  padding: "24px",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>{post.title}</h2>
                <p style={{ margin: 0, color: "var(--color-text-muted)" }}>{post.excerpt}</p>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "13px",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {post.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
