import Image from "next/image";
import Link from "next/link";
import { CallButton } from "./CallButton";
import { ContactForm } from "./ContactForm";
import styles from "./Hero.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string | string[];
  image?: string;
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
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className={styles.bgImage}
          />
        ) : null}
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content} ${showForm ? styles.contentWithForm : ""}`}>
        <div className={styles.text}>
          <p className="eyebrow eyebrow--dark">{eyebrow}</p>
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
            <ContactForm compact />
          </div>
        ) : null}
      </div>
    </section>
  );
}
