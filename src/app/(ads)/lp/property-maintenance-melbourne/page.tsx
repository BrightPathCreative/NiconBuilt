import { LandingPage } from "@/components/landing/LandingPage";
import { buildLandingMetadata, getLandingPage } from "@/lib/landing-pages";

const page = getLandingPage("property-maintenance-melbourne");

export const metadata = buildLandingMetadata(page);

export default function Page() {
  return <LandingPage page={page} />;
}
