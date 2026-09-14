import Script from "next/script";
import { FORWARDING_NUMBER_EVENT } from "@/lib/call-conversion-event";
import { formatPhoneDisplay, siteConfig } from "@/lib/site";

/**
 * Google Ads "calls from website" conversion, for the /lp/ pages only.
 *
 * The contractor's snippet is a gtag() call, so it needs gtag.js on the page.
 * The site doesn't otherwise load gtag.js (GA4 is fired from GTM, and loading
 * it directly as well doubled pageviews), so this loads it for the Ads account
 * on these two pages only. If a site-wide Google tag is ever switched back on
 * (siteConfig.gaId), it hangs off that instead and skips its own loader.
 *
 * Google's default is to find the number as text in the page and replace it
 * with a forwarding number, but our buttons say "Click to call" and keep the
 * number in a `tel:` href — so this uses `phone_conversion_callback` and hands
 * the forwarding number to lib/call-conversion.ts, where every CallButton
 * picks it up.
 */
export function GoogleAdsCallTracking() {
  const { id, callConversionLabel } = siteConfig.googleAds;
  const number = siteConfig.phone ? formatPhoneDisplay(siteConfig.phone) : "";
  if (!id || !callConversionLabel || !number) return null;

  const hasSiteTag = Boolean(siteConfig.gaId);

  return (
    <>
      {!hasSiteTag ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
      ) : null}
      <Script id="google-ads-call-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          ${hasSiteTag ? "" : `gtag('js', new Date());\n          gtag('config', '${id}');`}
          gtag('config', '${id}/${callConversionLabel}', {
            'phone_conversion_number': '${number}',
            'phone_conversion_callback': function (formatted, dialable) {
              window.__nbForwardingNumber = { formatted: formatted, dialable: dialable };
              window.dispatchEvent(new Event('${FORWARDING_NUMBER_EVENT}'));
            }
          });
        `}
      </Script>
    </>
  );
}
