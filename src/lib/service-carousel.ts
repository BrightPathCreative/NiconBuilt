import carouselData from "../../content/service-carousel-sources.json";

/** Source filenames + alt text for per-service image carousels (built by scripts/optimize-images.mjs) */

export type CarouselSlide = {
  src: string;
  alt: string;
};

type CarouselSource = {
  file: string;
  alt: string;
};

export const SERVICE_CAROUSEL_SOURCES = carouselData.service as Record<
  string,
  CarouselSource[]
>;

export const TRADE_CAROUSEL_SOURCES = carouselData.trade as Record<
  string,
  CarouselSource[]
>;

export function carouselSlugForMetaKey(metaKey: string): string {
  return metaKey.replace(/\/$/, "").replace(/^\//, "");
}

export function getServiceCarouselSlides(metaKey: string): CarouselSlide[] {
  const slug = carouselSlugForMetaKey(metaKey);
  const sources = SERVICE_CAROUSEL_SOURCES[slug] ?? [];
  return sources.map((item, index) => ({
    src: `/images/service-carousel/${slug}-${String(index + 1).padStart(2, "0")}.webp`,
    alt: item.alt,
  }));
}

export function getTradeCarouselSlides(tradeSlug: string): CarouselSlide[] {
  const slug = tradeSlug.replace(/\/$/, "").replace(/^\//, "");
  const sources =
    TRADE_CAROUSEL_SOURCES[slug] ?? SERVICE_CAROUSEL_SOURCES["property-maintenance-melbourne"];
  return sources.map((item, index) => ({
    src: `/images/service-carousel/${slug}-${String(index + 1).padStart(2, "0")}.webp`,
    alt: item.alt,
  }));
}
