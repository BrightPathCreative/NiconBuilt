import { LocationPage } from "@/components/LocationPage";
import { buildMetadata } from "@/lib/metadata";

const suburb = "Armadale";

export const metadata = buildMetadata({
  title: "Heritage Renovations Armadale | Victorian Terrace Builder | Nicon Built",
  description:
    "Heritage renovations for Armadale's Victorian terraces and Edwardian villas. Stonnington heritage permits managed end to end, VBA licensed builder since 1990.",
  path: "/heritage-renovations-armadale/",
  ogImage: "/images/heritage-renovations-page-01.webp",
  ogImageAlt: "Heritage renovations in Armadale by Nicon Built",
});

export default function Page() {
  return (
    <LocationPage
      suburb={suburb}
      slug="/heritage-renovations-armadale/"
      copySlug="heritage-armadale"
    />
  );
}
