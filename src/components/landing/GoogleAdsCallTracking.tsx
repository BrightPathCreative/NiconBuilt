import Script from "next/script";
import { FORWARDING_NUMBER_EVENT } from "@/lib/call-conversion-event";
import { formatPhoneDisplay, siteConfig } from "@/lib/site";

/**
 * Google Ads tag + "calls from website" conversion, for the /lp/ pages only.
 *
 * Two parts, in the order Google's install screen asks for them:
 *
 * 1. The Google tag itself — `gtag.js` for the Ads account. It was never on the
 *    site (the rest of the site runs GTM, which is a different thing), and the
 *    conversion snippet below is a `gtag()` call, so without this it would throw.
 * 2. The call conversion config. Google's default is to find the number as text
 *    in the page and replace it with a forwarding number, but our buttons say
 *    "Click to call" and keep the number in a `tel:` href — so it uses
 *    `phone_conversion_callback` and hands the forwarding number to
 *    lib/call-conversion.ts, where every CallButton picks it up.
 *
 * `afterInteractive` rather than in <head>, matching the GTM container: the
 * callback is reactive, so it doesn't matter whether the tag or hydration wins.
 */
export function GoogleAdsCallTracking() {
  const { id, callConversionLabel } = siteConfig.googleAds;
  const number = siteConfig.phone ? formatPhoneDisplay(siteConfig.phone) : "";
  if (!id || !callConversionLabel || !number) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-call-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
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
