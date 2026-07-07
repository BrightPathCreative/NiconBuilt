"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CarouselSlide } from "@/lib/service-carousel";
import styles from "./ServiceImageCarousel.module.css";

type Props = {
  slides: CarouselSlide[];
  label?: string;
};

export function ServiceHeroCarousel({ slides, label = "Project gallery" }: Props) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [count]);

  if (!count) return null;

  // Only mount the active slide plus the one coming up next, instead of every
  // slide at once. All slides sit absolutely positioned inside the fold, so
  // the browser's native lazy-loading can't tell they're "off-screen" — left
  // unguarded, every service page hero would fire off 5-8 concurrent image
  // requests on load, competing with the actual LCP image for bandwidth. The
  // next slide still gets a full ~4.8s rotation to preload before it's shown.
  const nextIndex = count > 1 ? (active + 1) % count : active;

  return (
    <div className={styles.heroCarousel} aria-roledescription="carousel" aria-label={label}>
      <div className={styles.heroStage}>
        {slides.map((slide, index) => {
          const isActive = index === active;
          const shouldMount = isActive || index === nextIndex;
          return (
            <figure
              key={slide.src}
              className={`${styles.heroSlide} ${isActive ? styles.heroSlideActive : ""}`}
              aria-hidden={!isActive}
            >
              {shouldMount ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={720}
                  height={480}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : null}
            </figure>
          );
        })}
        <div className={styles.heroShade} aria-hidden="true" />
      </div>

      {count > 1 ? (
        <>
          <div className={styles.heroDots} role="tablist" aria-label="Gallery slides">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show image ${index + 1} of ${count}`}
                className={`${styles.heroDot} ${index === active ? styles.heroDotActive : ""}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          <p className={styles.heroCaption}>{slides[active]?.alt}</p>
        </>
      ) : null}
    </div>
  );
}

export function ServiceMarqueeCarousel({ slides, label = "Recent project work" }: Props) {
  if (!slides.length) return null;

  const track = [...slides, ...slides];

  return (
    <section className={styles.marqueeSection} aria-label={label}>
      <div className={styles.marqueeHeader}>
        <p className="eyebrow">Recent work</p>
        <h2 className={styles.marqueeTitle}>Built properly. Finished to last.</h2>
      </div>

      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeFadeLeft} aria-hidden="true" />
        <div className={styles.marqueeFadeRight} aria-hidden="true" />
        <div className={styles.marqueeTrack}>
          {track.map((slide, index) => (
            <figure
              key={`${slide.src}-${index}`}
              className={styles.marqueeCard}
              aria-hidden={index >= slides.length}
            >
              <Image
                src={slide.src}
                alt={index < slides.length ? slide.alt : ""}
                width={480}
                height={320}
                sizes="320px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceImageGallery({ slides, label }: Props) {
  if (!slides.length) return null;

  return (
    <>
      <ServiceMarqueeCarousel slides={slides} label={label} />
    </>
  );
}
