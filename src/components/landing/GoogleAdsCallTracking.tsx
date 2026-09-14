import Script from "next/script";
import { FORWARDING_NUMBER_EVENT } from "@/lib/call-conversion-event";
import { formatPhoneDisplay, siteConfig } from "@/lib/site";

/**
 * Google Ads "calls from website" conversion, for the /lp/ pages only.
 *
 * Hangs off the site-wide Google tag (GoogleAnalytics in the root layout,
 * which renders ahead of this), exactly as Google's install screen has it:
 * the tag once per account, then this config on the page with the number.
 *
 * Google's default is to find the number as text in the page and replace it
 * with a forwarding number, but our buttons say "Click to call" and keep the
 * number in a `tel:` href — so this uses `phone_conversion_callback` and hands
 * the forwarding number to lib/call-conversion.ts, where every CallButton
 * picks it up.
 *
 * If the site-wide tag were ever switched off (gaId cleared), this would load
 * gtag.js itself so the conversion still works rather than silently queueing
 * commands nothing processes.
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
