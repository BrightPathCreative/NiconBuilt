import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { TrackingParamsCapture } from "@/components/TrackingParamsCapture";
import { BackToTop } from "@/components/BackToTop";
import { ScrollToTopOnNavigate } from "@/components/ScrollToTopOnNavigate";
import { StickyCallBar } from "@/components/StickyCallBar";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Heritage Renovation & Custom Builder Melbourne | Nicon Built",
    template: "%s | Nicon Built",
  },
  description:
    "Heritage renovation builder in Melbourne with 30+ years experience. Victorian, Edwardian and Federation homes, extensions, kitchens, bathrooms and maintenance.",
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
