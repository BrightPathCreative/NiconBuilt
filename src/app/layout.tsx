import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { BackToTop } from "@/components/BackToTop";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
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
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <JsonLd data={localBusinessSchema()} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
