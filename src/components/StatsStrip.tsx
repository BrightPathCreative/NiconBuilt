import { loadCopy } from "@/lib/copy";
import styles from "./StatsStrip.module.css";

export function StatsStrip() {
  const copy = loadCopy("home");
  const stats = copy.statsStrip ?? [
    "30+ Years Experience",
    "5.0 Google Rating",
    "200+ Projects Completed",
    "Fully Insured",
  ];

  return (
    <div className={styles.strip} role="region" aria-label="Company statistics">
      <div className={`container ${styles.inner}`}>
        {stats.map((stat, i) => (
          <span key={stat}>
            {i > 0 ? <span className={styles.dot} aria-hidden="true">·</span> : null}
            {stat}
          </span>
        ))}
      </div>
    </div>
  );
}
