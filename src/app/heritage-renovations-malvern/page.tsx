import { LocationPage } from "@/components/LocationPage";
import { buildMetadata } from "@/lib/metadata";

const suburb = "Malvern";

export const metadata = buildMetadata({
  title: "Heritage Renovations Malvern | Edwardian & Federation Homes | Nicon Built",
  description:
    "Heritage renovations and extensions for Malvern's Edwardian and Federation homes. Stonnington heritage permits managed, VBA licensed builder since 1990.",
  path: "/heritage-renovations-malvern/",
});

export default function Page() {
  return (
    <LocationPage
      suburb={suburb}
      slug="/heritage-renovations-malvern/"
      copySlug="heritage-malvern"
    />
  );
}
