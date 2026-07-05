import { ServicePageLayout } from "@/components/ServicePageLayout";
import { buildMetadata } from "@/lib/metadata";
import { getTradeCarouselSlides } from "@/lib/service-carousel";
import type { TradeService } from "./trades";
import { tradeServices } from "./trades";

export function createTradePage(trade: TradeService) {
  return {
    metadata: buildMetadata({
      title: trade.title,
      description: trade.paragraphs[0],
      path: trade.slug,
    }),
    Page: function TradePage() {
      return (
        <ServicePageLayout
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services/" },
            { name: "Trades and Maintenance", href: "/home-maintenance-melbourne/" },
            { name: trade.breadcrumbName, href: trade.slug },
          ]}
          headline={trade.headline}
          subheadline={trade.subheadline}
          paragraphs={trade.paragraphs}
          bullets={trade.bullets}
          bulletsTitle="What we handle"
          carouselSlides={getTradeCarouselSlides(trade.slug)}
          faqs={trade.faqs}
        />
      );
    },
  };
}

export function getTradeBySlug(slug: string): TradeService | undefined {
  return tradeServices.find((t) => t.slug === slug);
}
