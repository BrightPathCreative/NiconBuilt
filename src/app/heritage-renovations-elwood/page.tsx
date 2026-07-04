import { LocationPage } from "@/components/LocationPage";
import { buildMetadata, locationMeta } from "@/lib/metadata";

const suburb = "Elwood";

export const metadata = buildMetadata({
  ...locationMeta(suburb),
  path: "/heritage-renovations-elwood/",
});

export default function Page() {
  return <LocationPage suburb={suburb} slug="/heritage-renovations-elwood/" />;
}
