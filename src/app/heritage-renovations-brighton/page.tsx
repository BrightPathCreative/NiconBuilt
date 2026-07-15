import { LocationPage } from "@/components/LocationPage";
import { buildMetadata } from "@/lib/metadata";

const suburb = "Brighton";

export const metadata = buildMetadata({
  title: "Heritage Renovations Brighton | Period Home Builder | Nicon Built",
  description:
    "Heritage renovations and restorations for Brighton's Victorian, Edwardian and interwar homes. Bayside council permits managed, VBA licensed builder since 1990.",
  path: "/heritage-renovations-brighton/",
  ogImage: "/images/heritage-renovations-page-01.webp",
  ogImageAlt: "Heritage renovations in Brighton by Nicon Built",
});

export default function Page() {
  return (
    <LocationPage
      suburb={suburb}
      slug="/heritage-renovations-brighton/"
      copySlug="heritage-brighton"
    />
  );
}
