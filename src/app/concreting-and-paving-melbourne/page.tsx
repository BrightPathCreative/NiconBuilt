import { createServicePage } from "@/lib/service-pages";
import { getServicePage } from "@/lib/service-page-config";

const { metadata, Page } = createServicePage(
  getServicePage("concreting-and-paving-melbourne")
);

export { metadata };
export default Page;
