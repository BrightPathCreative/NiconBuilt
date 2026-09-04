import {
  LandingHeader,
  LandingFooter,
  LandingCallBar,
} from "@/components/landing/LandingChrome";

/**
 * Chrome for Google Ads landing pages under /lp/.
 *
 * Separate from `(site)` so paid traffic lands on a page with no nav, no footer
 * link grid and no exits other than the quote form and the phone number.
 */
export default function AdsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <LandingHeader />
      <main id="main-content">{children}</main>
      <LandingFooter />
      <LandingCallBar />
    </>
  );
}
