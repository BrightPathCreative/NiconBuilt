import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCTA } from "@/components/QuoteCTA";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { getBlogPost } from "@/lib/blog";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { blogPosts } = await import("@/lib/blog");
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Nicon Built Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
  });
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
        <div className={`container ${styles.article}`}>
          <p className={styles.date}>{post.date}</p>
          <h1>{post.title}</h1>
          {post.blocks.map((block) => {
            if (block.type === "h2") return <h2 key={block.text}>{block.text}</h2>;
            if (block.type === "h3") return <h3 key={block.text}>{block.text}</h3>;
            return <p key={block.text.slice(0, 40)}>{block.text}</p>;
          })}
          <div className={styles.links}>
            <Link href="/contact/">Get a free quote</Link>
            <span aria-hidden="true">·</span>
            <Link href="/heritage-renovations-melbourne/">Heritage renovations</Link>
            <span aria-hidden="true">·</span>
            <Link href="/home-renovations-melbourne/">Home renovations</Link>
          </div>
        </div>
      </article>

      <QuoteCTA />
    </>
  );
}
