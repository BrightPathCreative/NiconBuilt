import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * 404 for /lp/ routes. Landing page chrome carries no nav, so the copy's own
 * "back to home" and "contact us" buttons are the only way out — which is why
 * this renders the shared content rather than a bare message.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
