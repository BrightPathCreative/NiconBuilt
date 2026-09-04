import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/GoogleTagManager";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

/**
 * Document shell only — fonts, analytics and the site-wide schema.
 *
 * Page chrome deliberately lives one level down, in the route-group layouts:
 * - `(site)/layout.tsx` — the public website: header nav, footer, sticky call bar.
 * - `(ads)/layout.tsx` — Google Ads landing pages: no nav, no footer link soup,
 *   nothing on the page that isn't a conversion path.
 *
 * Keeping both out of here is what lets a paid landing page render without the
 * site's exit links while still sharing one GTM container, one GA property and
 * one attribution capture, so leads from ads report alongside everything else.
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Melbourne Home Services | Trades & Maintenance | Nicon Built",
    template: "%s | Nicon Built",
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

const TrackingParamsCapture = dynamic(() =>
  import("@/components/TrackingParamsCapture").then((mod) => mod.TrackingParamsCapture)
);

const ghlOrigin = (() => {
  try {
    return new URL(siteConfig.ghlContactForm.src).origin;
  } catch {
    return "https://links.brightpathcreative.com.au";
  }
})();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={fontVariables}>
      <head>
        <link rel="preconnect" href={ghlOrigin} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={ghlOrigin} />
        <link
          rel="preload"
          href={siteConfig.ghlContactForm.embedScriptSrc}
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        {children}
        <JsonLd data={localBusinessSchema()} />
        <GoogleTagManager />
        <GoogleAnalytics />
        <TrackingParamsCapture />
      </body>
    </html>
  );
}
