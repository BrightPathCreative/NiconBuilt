import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  ...pageMeta["privacy-policy"],
  path: "/privacy-policy/",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy/" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className={`container prose ${styles.legal}`}>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: July 2026</p>

          <h2>Who we are</h2>
          <p>
            {siteConfig.legalName} (ABN {siteConfig.abn}) operates niconbuilt.com.au. We are
            based in Port Melbourne, Victoria. You can reach us via our{" "}
            <Link href="/contact/">contact form</Link>.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you submit our contact form, we collect your name, phone number, suburb, and
            message. We may also collect analytics data via Google Analytics 4, including pages
            visited and general device information.
          </p>

          <h2>How we use your information</h2>
          <p>
            Contact form submissions are used to respond to your enquiry and provide quotes for
            building services. Information is processed through our CRM (GoHighLevel) and may
            trigger automated notifications to our team. We do not sell your personal information.
          </p>

          <h2>Storage and security</h2>
          <p>
            Your information is stored securely within our CRM platform and email systems. We take
            reasonable steps to protect personal information from misuse, loss, and unauthorised
            access.
          </p>

          <h2>Third parties</h2>
          <p>
            We use GoHighLevel for form processing and Google Analytics for website analytics.
            These providers may process data on our behalf in accordance with their own privacy
            policies.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by
            contacting us through our <Link href="/contact/">contact form</Link>.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy enquiries, please reach out through our{" "}
            <Link href="/contact/">contact form</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
