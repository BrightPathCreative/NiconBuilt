import Image from "next/image";
import Link from "next/link";
import { CallButton } from "./CallButton";
import { HeroQuotePanel } from "./HeroQuotePanel";
import styles from "./Hero.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string | string[];
  image?: string;
  /**
   * Optional portrait-cropped variant served below 768px. Only pass this when a
   * mobile crop of `image` actually exists — without it the responsive `<Image>`
   * below picks the right size for the viewport on its own.
   */
  mobileImage?: string;
  imageAlt?: string;
  showForm?: boolean;
  showTrust?: boolean;
  trustLine?: string;
  priority?: boolean;
};

export function Hero({
  eyebrow = "Home Services · Melbourne",
  title,
  description,
  image,
  mobileImage,
  imageAlt = "Home services and renovations Melbourne by Nicon Built",
  showForm = false,
  showTrust = false,
  trustLine,
  priority = false,
}: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        {image ? (
          <picture className={styles.bgPicture}>
            {mobileImage ? (
              <source media="(max-width: 768px)" srcSet={mobileImage} type="image/webp" />
            ) : null}
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority={priority}
              quality={72}
              sizes="100vw"
              className={styles.bgImage}
            />
          </picture>
        ) : null}
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content} ${showForm ? styles.contentWithForm : ""}`}>
        <div className={styles.text}>
          <p className={`eyebrow eyebrow--dark ${styles.eyebrow}`}>{eyebrow}</p>
          <h1>{title}</h1>
          {description
            ? (Array.isArray(description) ? description : [description]).map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={styles.description}>
                  {paragraph}
                </p>
              ))
            : null}
          {showTrust && trustLine ? (
            <p className={styles.trust}>{trustLine}</p>
          ) : null}
          {!showForm ? (
            <div className={styles.ctas}>
              <Link href="/contact/" className="btn btn-accent">
                Get a free quote
              </Link>
              <CallButton className={`btn btn-outline ${styles.callOnDark}`} />
            </div>
          ) : null}
        </div>

        {showForm ? (
          <div className={styles.formWrap}>
            <HeroQuotePanel />
          </div>
        ) : null}
      </div>
    </section>
  );
}
