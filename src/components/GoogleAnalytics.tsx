import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * GA4 via gtag.js. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set,
 * and it deliberately isn't: GA4 is fired from the GTM container, and having
 * both doubled every pageview. See siteConfig.gaId.
 */
export function GoogleAnalytics() {
  const gaId = siteConfig.gaId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
