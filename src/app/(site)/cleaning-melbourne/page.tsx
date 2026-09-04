import { createServicePage } from "@/lib/service-pages";
import { getServicePage } from "@/lib/service-page-config";

const { metadata, Page } = createServicePage(getServicePage("cleaning-melbourne"));

export { metadata };
export default Page;
