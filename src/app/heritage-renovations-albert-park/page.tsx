import { LocationPage } from "@/components/LocationPage";
import { buildMetadata } from "@/lib/metadata";

const suburb = "Albert Park";

export const metadata = buildMetadata({
  title: "Heritage Renovations Albert Park | Victorian Terrace Builder | Nicon Built",
  description:
    "Heritage renovations for Albert Park's Victorian terraces. Port Phillip heritage permits managed end to end by a local VBA licensed builder, since 1990.",
  path: "/heritage-renovations-albert-park/",
});

export default function Page() {
  return (
    <LocationPage
      suburb={suburb}
      slug="/heritage-renovations-albert-park/"
      copySlug="heritage-albert-park"
    />
  );
}
