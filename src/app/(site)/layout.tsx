import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTopOnNavigate } from "@/components/ScrollToTopOnNavigate";
import { StickyCallBar } from "@/components/StickyCallBar";

const BackToTop = dynamic(() =>
  import("@/components/BackToTop").then((mod) => mod.BackToTop)
);

/** Chrome for the public website. Google Ads landing pages use `(ads)` instead. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <ScrollToTopOnNavigate />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
      <StickyCallBar />
    </>
  );
}
