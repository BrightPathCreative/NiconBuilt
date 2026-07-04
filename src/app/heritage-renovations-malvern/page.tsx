import { LocationPage } from "@/components/LocationPage";
import { buildMetadata, locationMeta } from "@/lib/metadata";

const suburb = "Malvern";

export const metadata = buildMetadata({
  ...locationMeta(suburb),
  path: "/heritage-renovations-malvern/",
});

export default function Page() {
  return <LocationPage suburb={suburb} slug="/heritage-renovations-malvern/" />;
}
