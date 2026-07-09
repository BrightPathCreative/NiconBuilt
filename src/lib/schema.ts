import { siteConfig } from "./site";

export type BreadcrumbItem = { name: string; href: string };

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    "@id": siteConfig.url,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    image: `${siteConfig.url}/images/og-image.webp`,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: siteConfig.serviceAreas,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    description: siteConfig.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.rating,
      reviewCount: String(siteConfig.stats.reviewCount),
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

type ReviewSchemaInput = {
  author: string;
  quote: string;
};

export function reviewsPageSchema(reviews: ReviewSchemaInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/testimonials/`,
    url: `${siteConfig.url}/testimonials/`,
    name: "Client Reviews | Nicon Built Melbourne",
    description: "Google reviews and client feedback for Nicon Built in Melbourne.",
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": siteConfig.url,
      name: siteConfig.legalName,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteConfig.stats.rating,
        reviewCount: String(siteConfig.stats.reviewCount),
      },
      review: reviews.map((review) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: review.author,
        },
        reviewBody: review.quote,
      })),
    },
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  url: string;
  image?: string;
};

export function serviceSchema({ name, description, url, image }: ServiceSchemaInput) {
  const pageUrl = `${siteConfig.url}${url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name,
    description,
    url: pageUrl,
    ...(image ? { image: image.startsWith("http") ? image : `${siteConfig.url}${image}` } : {}),
    provider: {
      "@type": "LocalBusiness",
      "@id": siteConfig.url,
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    serviceType: name,
  };
}

export function jsonLd(data: object) {
  return JSON.stringify(data);
}
