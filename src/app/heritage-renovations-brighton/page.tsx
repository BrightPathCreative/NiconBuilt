import { LocationPage } from "@/components/LocationPage";
import { buildMetadata, locationMeta } from "@/lib/metadata";

const suburb = "Brighton";

export const metadata = buildMetadata({
  ...locationMeta(suburb),
  path: "/heritage-renovations-brighton/",
});

export default function Page() {
  return <LocationPage suburb={suburb} slug="/heritage-renovations-brighton/" />;
}
