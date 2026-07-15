import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ScrollToTopOnNavigate } from "@/components/ScrollToTopOnNavigate";
import { StickyCallBar } from "@/components/StickyCallBar";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const BackToTop = dynamic(() =>
  import("@/components/BackToTop").then((mod) => mod.BackToTop)
);

const TrackingParamsCapture = dynamic(() =>
  import("@/components/TrackingParamsCapture").then((mod) => mod.TrackingParamsCapture)
);

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={fontVariables}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <ScrollToTopOnNavigate />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <StickyCallBar />
        <JsonLd data={localBusinessSchema()} />
        <GoogleAnalytics />
        <TrackingParamsCapture />
      </body>
    </html>
  );
}
