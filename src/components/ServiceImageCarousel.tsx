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

  return (
    <div className={styles.heroCarousel} aria-roledescription="carousel" aria-label={label}>
      <div className={styles.heroStage}>
        {slides.map((slide, index) => (
          <figure
            key={slide.src}
            className={`${styles.heroSlide} ${index === active ? styles.heroSlideActive : ""}`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={720}
              height={480}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </figure>
        ))}
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
