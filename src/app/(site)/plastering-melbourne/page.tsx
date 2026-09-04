import { createTradePage } from "@/lib/trade-pages";
import { getTradeBySlug } from "@/lib/trade-pages";

const trade = getTradeBySlug("/plastering-melbourne/")!;
const { metadata, Page } = createTradePage(trade);

export { metadata };
export default Page;
