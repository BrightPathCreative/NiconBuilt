import Image from "next/image";
import type { CarouselSlide } from "@/lib/service-carousel";
import styles from "./ServiceImageCarousel.module.css";

type Props = {
  slides: CarouselSlide[];
  label?: string;
};

/**
 * Server component (no "use client") — this is a pure CSS-driven marquee with
 * no state or event handlers. It used to live in the same "use client" file
 * as ServiceHeroCarousel, which forced its 10-16 duplicated <Image> instances
 * into the client hydration path on every service page for no reason. Moving
 * it here means it ships as static HTML with zero hydration cost.
 */
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

  return <ServiceMarqueeCarousel slides={slides} label={label} />;
}
