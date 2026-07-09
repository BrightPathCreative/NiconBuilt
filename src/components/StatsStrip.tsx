import { loadCopy } from "@/lib/copy";
import styles from "./StatsStrip.module.css";

function splitStat(stat: string): { value: string; label: string } {
  const match = stat.match(/^([\d.]+\+?\s*⭐?)\s+(.+)$/);
  const value = match ? match[1].trim() : stat.split(" ")[0];
  const label = match ? match[2].trim() : stat.split(" ").slice(1).join(" ");
  return { value: value.replace("⭐", "★"), label };
}

function labelLines(label: string): string[] {
  const idx = label.indexOf(" ");
  return idx === -1 ? [label] : [label.slice(0, idx), label.slice(idx + 1)];
}

export function StatsStrip() {
  const copy = loadCopy("home");
  const stats = copy.statsStrip ?? [
    "30+ Years Experience",
    "5.0 ⭐ Google Rating",
    "200+ Projects Completed",
    "Fully Insured",
  ];

  return (
    <div className={styles.strip} role="region" aria-label="Company statistics">
      <div className={`container ${styles.inner}`}>
        {stats.map((stat, i) => {
          const { value, label } = splitStat(stat);
          return (
            <div className={styles.statWrap} key={stat}>
              {i > 0 ? <span className={styles.divider} aria-hidden="true" /> : null}
              <div className={styles.stat}>
                <span className={styles.value}>{value}</span>
                <span className={styles.label}>
                  {labelLines(label).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
