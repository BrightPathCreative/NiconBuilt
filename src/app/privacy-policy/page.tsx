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
            {siteConfig.legalName} (ABN {siteConfig.abn}) operates niconbuilt.com.au. We are a
            building and home services business based in Port Melbourne, Victoria.
          </p>
          <p>
            We do not publish a public email address or street address on this website. You can
            contact us using our <Link href="/contact/">contact form</Link>.
          </p>

          <h2>Information we collect</h2>
          <h3>Contact form enquiries</h3>
          <p>
            When you submit our contact form, we collect the details you provide, which typically
            include your name, phone number, suburb, and message.
          </p>
          <p>
            If you arrive on our site via an online ad or campaign link, we may also capture
            marketing attribution data (such as UTM parameters or click identifiers) and the page
            you landed on. This helps us understand which enquiries came from which marketing
            activity.
          </p>
          <h3>Website analytics</h3>
          <p>
            When Google Analytics 4 is enabled on this site, we collect general usage information
            such as pages visited, approximate location (city/region level), device and browser
            type, and referral source. We do not use analytics data to identify you personally.
          </p>
          <h3>Phone calls</h3>
          <p>
            If you use the click-to-call button on our website, your call is handled by your phone
            provider. We do not record website browsing activity linked to your call unless you
            separately provide your details through our contact form or during the call.
          </p>

          <h2>How we use your information</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>respond to your enquiry and provide quotes or information about our services</li>
            <li>
              follow up about your project by phone or SMS where you have provided your number
            </li>
            <li>understand how visitors find and use our website so we can improve it</li>
            <li>meet our legal and regulatory obligations</li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>How we store and protect your information</h2>
          <p>
            Contact form submissions are processed through our secure enquiry management system
            and stored within systems used by our team. We take reasonable steps to protect
            personal information from misuse, loss, and unauthorised access, modification, or
            disclosure.
          </p>
          <p>
            Website analytics data is processed by Google in accordance with Google&apos;s policies.
          </p>

          <h2>Third-party service providers</h2>
          <p>
            We use trusted third parties to operate parts of this website and our enquiry workflow,
            including:
          </p>
          <ul>
            <li>
              <strong>Contact form provider</strong> — form processing, lead management, and
              follow-up workflows
            </li>
            <li>
              <strong>Google Analytics</strong> — website usage analytics (when enabled)
            </li>
            <li>
              <strong>Vercel</strong> — website hosting
            </li>
            <li>
              <strong>Bright Path Creative</strong> — website development and technical support
            </li>
          </ul>
          <p>
            These providers may process personal information on our behalf. Their handling of data
            is also governed by their own privacy policies.
          </p>

          <h2>Cookies and similar technologies</h2>
          <p>
            This website uses cookies and similar technologies for analytics and form
            functionality. For more detail, see our{" "}
            <Link href="/cookie-policy/">Cookie Policy</Link>.
          </p>

          <h2>Disclosure of information</h2>
          <p>We may disclose personal information:</p>
          <ul>
            <li>to our staff and contractors who need it to respond to your enquiry</li>
            <li>to the third-party providers listed above</li>
            <li>where required or authorised by law</li>
          </ul>
          <p>
            We do not disclose personal information overseas unless a service provider processes
            data outside Australia as part of their standard operations. Where that occurs, we
            take reasonable steps to ensure appropriate protections apply.
          </p>

          <h2>Access, correction, and deletion</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by
            contacting us through our <Link href="/contact/">contact form</Link>. We will respond
            within a reasonable time.
          </p>
          <p>
            If you are not satisfied with how we handle a privacy matter, you may contact the
            Office of the Australian Information Commissioner (OAIC) at{" "}
            <a href="https://www.oaic.gov.au/" target="_blank" rel="noopener noreferrer">
              oaic.gov.au
            </a>
            .
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date
            at the top of this page will reflect any changes. Continued use of the website after
            changes are published constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy enquiries, please use our <Link href="/contact/">contact form</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
