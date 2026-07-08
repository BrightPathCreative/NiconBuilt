import Image from "next/image";
import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/blog";
import styles from "./RecentArticles.module.css";

export function RecentArticles() {
  const posts = getRecentBlogPosts(3);
  if (!posts.length) return null;

  return (
    <section className={`section section--tone ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">From the blog</p>
            <h2>Recent articles</h2>
          </div>
          <Link href="/blog/" className={styles.viewAll}>
            View all articles →
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
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
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <span className={styles.readMore}>Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
