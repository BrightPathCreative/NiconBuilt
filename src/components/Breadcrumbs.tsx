import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema";
import styles from "./Breadcrumbs.module.css";

type Props = { items: BreadcrumbItem[] };

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href}>
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
