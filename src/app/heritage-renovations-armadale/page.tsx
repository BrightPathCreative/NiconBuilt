import { LocationPage } from "@/components/LocationPage";
import { buildMetadata, locationMeta } from "@/lib/metadata";

const suburb = "Armadale";

export const metadata = buildMetadata({
  ...locationMeta(suburb),
  path: "/heritage-renovations-armadale/",
});

export default function Page() {
  return <LocationPage suburb={suburb} slug="/heritage-renovations-armadale/" />;
}
