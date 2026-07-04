import { LocationPage } from "@/components/LocationPage";
import { buildMetadata, locationMeta } from "@/lib/metadata";

const suburb = "Albert Park";

export const metadata = buildMetadata({
  ...locationMeta(suburb),
  path: "/heritage-renovations-albert-park/",
});

export default function Page() {
  return <LocationPage suburb={suburb} slug="/heritage-renovations-albert-park/" />;
}
