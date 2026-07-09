"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

type Props = {
  children: React.ReactNode;
  /** Stagger index — multiplies the base delay (60ms per design.md's grid stagger spec). */
  index?: number;
  className?: string;
  as?: "div" | "li";
};

export function Reveal({ children, index = 0, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: visible ? `${Math.min(index, 8) * 60}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
