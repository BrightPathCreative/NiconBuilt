import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * The Google tag (gtag.js) for the GA4 property — on every page. Also the tag
 * the Google Ads conversions on the landing pages hang off, so it must load
 * before any page-level gtag() call (see the root layout).
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
