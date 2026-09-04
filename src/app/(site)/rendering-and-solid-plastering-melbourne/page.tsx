import { createServicePage } from "@/lib/service-pages";
import { getServicePage } from "@/lib/service-page-config";

const { metadata, Page } = createServicePage(
  getServicePage("rendering-and-solid-plastering-melbourne")
);

export { metadata };
export default Page;
