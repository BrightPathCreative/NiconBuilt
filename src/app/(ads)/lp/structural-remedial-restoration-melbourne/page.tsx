import { LandingPage } from "@/components/landing/LandingPage";
import { buildLandingMetadata, getLandingPage } from "@/lib/landing-pages";

const page = getLandingPage("structural-remedial-restoration-melbourne");

export const metadata = buildLandingMetadata(page);

export default function Page() {
  return <LandingPage page={page} />;
}
