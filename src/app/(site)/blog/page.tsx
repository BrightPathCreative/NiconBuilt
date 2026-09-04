import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { blogPosts } from "@/lib/blog";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Building & Renovation Insights | Blog | Nicon Built",
  description:
    "Practical building and renovation advice from Nicon Built — 30+ years experience across Melbourne's inner south.",
  path: "/blog/",
  ogImage: "/images/home-renovations-page-01.webp",
  ogImageAlt: "Building and renovation insights from Nicon Built, Melbourne",
});

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
          <p className="eyebrow">Insights</p>
          <h1>Building &amp; renovation insights</h1>
          <p className={styles.intro}>
            Practical advice from 30+ years building across Melbourne&apos;s inner south.
          </p>

          <div className={styles.grid}>
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className={`card ${styles.card}`}>
                {post.image ? (
                  <div className={styles.thumb}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      fill
                      sizes="(max-width: 960px) 100vw, 33vw"
                      className={styles.thumbImg}
                    />
                  </div>
                ) : null}
                <div className={styles.cardBody}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <span className={styles.readMore}>Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
