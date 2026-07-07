import { ContactForm } from "./ContactForm";
import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";
import styles from "./QuickEnquiry.module.css";

type Props = {
  heading?: string;
  body?: string;
};

export function QuickEnquiry({
  heading = "Get a quick quote",
  body = "No obligation. Nick usually gets back to you the same day.",
}: Props) {
  const phone = siteConfig.phone;

  return (
    <section className={`section ${styles.quickEnquiry}`} aria-labelledby="quick-enquiry-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Quick enquiry</p>
          <h2 id="quick-enquiry-heading">{heading}</h2>
          <p className={styles.body}>{body}</p>
          {phone ? (
            <a href={phoneHref(phone)} className={`btn btn-outline ${styles.callBtn}`}>
              Or call {formatPhoneDisplay(phone)}
            </a>
          ) : null}
        </div>
        <div className={styles.formWrap}>
          <ContactForm compact showTitle={false} />
        </div>
      </div>
    </section>
  );
}
