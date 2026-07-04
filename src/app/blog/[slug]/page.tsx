import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { breadcrumbSchema } from "@/lib/schema";
import { getBlogPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { blogPosts } = await import("@/lib/blog");
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog/" },
    { name: post.title, href: `/blog/${post.slug}/` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <article className="section">
        <div className="container prose">
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-accent-label)",
            }}
          >
            {post.date}
          </p>
          <h1>{post.title}</h1>
          {post.content.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
          <p>
            <Link href="/contact/">Get a free quote</Link> ·{" "}
            <Link href="/heritage-renovations-melbourne/">Heritage renovations</Link> ·{" "}
            <Link href="/home-renovations-melbourne/">Home renovations</Link>
          </p>
        </div>
      </article>

      <QuoteCTA />
    </>
  );
}
