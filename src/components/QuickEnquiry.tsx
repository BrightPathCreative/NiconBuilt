import Image from "next/image";
import { CallButton } from "./CallButton";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/lib/site";
import styles from "./QuickEnquiry.module.css";

type Props = {
  heading?: string;
  body?: string;
  /** Background photo — pass a project image relevant to the page. */
  image?: string;
  imageAlt?: string;
};

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function QuickEnquiry({
  heading = "Get a free quote",
  body = "Tell Nick about your project. He'll come back to you with straight answers, not sales talk.",
  image,
  imageAlt = "",
}: Props) {
  const trustPoints = [
    "Free, no-obligation quote",
    "Nick usually gets back to you the same day",
    `VBA licensed & fully insured · ${siteConfig.stats.years} years experience`,
  ];

  return (
    <section className={styles.quickEnquiry} aria-labelledby="quick-enquiry-heading">
      <div className={styles.bg} aria-hidden="true">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className={styles.bgImage}
          />
        ) : null}
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow eyebrow--dark">Quick enquiry</p>
          <h2 id="quick-enquiry-heading" className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.body}>{body}</p>
          <ul className={styles.trustList}>
            {trustPoints.map((point) => (
              <li key={point} className={styles.trustItem}>
                <span className={styles.check}>
                  <CheckIcon />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <CallButton prefix="Or call" className={`btn btn-outline ${styles.callBtn}`} />
        </div>
        <div className={styles.formWrap}>
          <ContactForm compact showTitle={false} />
        </div>
      </div>
    </section>
  );
}
