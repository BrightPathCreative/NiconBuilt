import { LocationPage } from "@/components/LocationPage";
import { buildMetadata } from "@/lib/metadata";

const suburb = "Elwood";

export const metadata = buildMetadata({
  title: "Heritage Renovations Elwood | Edwardian & Art Deco Homes | Nicon Built",
  description:
    "Heritage renovations for Elwood's Edwardian homes, Californian bungalows and interwar classics. Port Phillip permits managed, VBA licensed builder since 1990.",
  path: "/heritage-renovations-elwood/",
  ogImage: "/images/heritage-renovations-page-01.webp",
  ogImageAlt: "Heritage renovations in Elwood by Nicon Built",
});

export default function Page() {
  return (
    <LocationPage
      suburb={suburb}
      slug="/heritage-renovations-elwood/"
      copySlug="heritage-elwood"
    />
  );
}
