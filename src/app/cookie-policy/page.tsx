import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "../privacy-policy/page.module.css";

export const metadata = buildMetadata({
  ...pageMeta["cookie-policy"],
  path: "/cookie-policy/",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Cookie Policy", href: "/cookie-policy/" },
];

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="section">
        <div className={`container prose ${styles.legal}`}>
          <h1>Cookie Policy</h1>
          <p className={styles.updated}>Last updated: July 2026</p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            websites remember preferences, understand how visitors use the site, and support
            features such as embedded forms.
          </p>
          <p>
            Similar technologies ù such as local storage and session storage ù work in a comparable
            way. This policy covers cookies and those related technologies where they affect your
            privacy.
          </p>

          <h2>How we use cookies</h2>
          <p>
            Nicon Built Pty Ltd uses cookies and similar technologies on niconbuilt.com.au for the
            following purposes:
          </p>

          <h3>Strictly necessary / functional</h3>
          <p>
            Our website uses session storage (not a cookie) to remember marketing attribution data
            ù such as UTM parameters or ad click identifiers ù for the duration of your browser
            session. This helps us understand which campaigns lead to enquiries when you submit
            our contact form. The data is cleared when you close your browser.
          </p>
          <p>
            Our contact form is provided by a third-party service. When you interact with the
            form, that provider may set its own cookies or use similar technologies to operate the
            form, prevent spam, and manage submissions. We do not control these cookies directly.
          </p>

          <h3>Analytics</h3>
          <p>
            When Google Analytics 4 (GA4) is enabled on this site, Google sets cookies to collect
            aggregated, anonymous usage statistics. Typical cookies include <code>_ga</code>,{" "}
            <code>_ga_*</code>, and <code>_gid</code>. These help us understand how visitors use
            the site ù for example, which pages are most visited and whether traffic comes from
            search or ads.
          </p>
          <p>
            GA4 only loads when a Measurement ID is configured in our website environment. If
            analytics is not enabled, these cookies are not set.
          </p>
          <p>We do not use advertising or remarketing cookies on this website.</p>

          <h2>Third-party cookies</h2>
          <p>Some cookies are set by third parties whose services appear on our pages:</p>
          <ul>
            <li>
              <strong>Google Analytics</strong> ù website usage statistics. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Contact form provider</strong> ó form embed and enquiry processing.
            </li>
          </ul>
          <p>We recommend reviewing these providers&apos; policies for full details.</p>

          <h2>Managing cookies</h2>
          <p>You can control or delete cookies through your browser settings. Most browsers allow you to:</p>
          <ul>
            <li>see which cookies are stored and delete them individually</li>
            <li>block third-party cookies</li>
            <li>block all cookies from specific sites</li>
            <li>block all cookies entirely</li>
          </ul>
          <p>
            Blocking all cookies may affect how some parts of the website work ù particularly the
            embedded contact form.
          </p>
          <p>
            To opt out of Google Analytics specifically, you can install the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h2>Cookie consent</h2>
          <p>
            This website does not currently display a cookie consent banner. Analytics cookies are
            only activated once Google Analytics is configured for production. If a consent mechanism
            is added in future, this policy will be updated accordingly.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Cookie Policy from time to time. The &ldquo;Last updated&rdquo; date
            at the top of this page will reflect any changes.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about how we use cookies, please contact us through our{" "}
            <Link href="/contact/">contact form</Link>.
          </p>
          <p>
            For how we handle personal information more broadly, see our{" "}
            <Link href="/privacy-policy/">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
