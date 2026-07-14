import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Loading page">
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className={`${styles.shimmer} ${styles.eyebrow}`} />
          <span className={`${styles.shimmer} ${styles.title}`} />
          <span className={`${styles.shimmer} ${styles.subtitle}`} />
        </div>
      </section>

      <section className={`section section--surface ${styles.content}`}>
        <div className="container">
          <span className={`${styles.shimmer} ${styles.lead}`} />
          <div className={styles.row}>
            <span className={`${styles.shimmer} ${styles.image}`} />
            <div className={styles.textBlock}>
              <span className={`${styles.shimmer} ${styles.line}`} />
              <span className={`${styles.shimmer} ${styles.line}`} />
              <span className={`${styles.shimmer} ${styles.lineShort}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
