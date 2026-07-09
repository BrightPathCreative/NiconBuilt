"use client";

import { useState } from "react";
import styles from "./ReviewsCarousel.module.css";

export type ReviewSlide = { stars: string; quote: string; author: string };

export function ReviewsCarousel({ reviews }: { reviews: ReviewSlide[] }) {
  const [index, setIndex] = useState(0);

  if (!reviews.length) return null;

  const go = (next: number) => setIndex((next + reviews.length) % reviews.length);
  const current = reviews[index];

  return (
    <div className={styles.carousel}>
      <blockquote key={current.author} className={`card ${styles.slide}`}>
        <p className={styles.meta}>{current.stars}</p>
        <p className={styles.quote}>&ldquo;{current.quote}&rdquo;</p>
        <footer className={styles.author}>{current.author}</footer>
      </blockquote>

      {reviews.length > 1 ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index - 1)}
            aria-label="Previous review"
          >
            ←
          </button>
          <div className={styles.dots} role="tablist" aria-label="Choose a review">
            {reviews.map((review, i) => (
              <button
                key={review.author}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1} of ${reviews.length}`}
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index + 1)}
            aria-label="Next review"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
