import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/StickyCallBar";
import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * 404 for URLs that match no route segment at all — routes inside a route group
 * use that group's own `not-found.tsx` instead.
 *
 * Next.js embeds this boundary's rendered tree in the payload of every
 * prerendered page, so it carries the header (a client component, ~free to
 * serialise) and the copy's own recovery links, but not the site footer: the
 * footer's five link columns cost roughly 9 kB of payload on every page across
 * the site for markup almost nobody sees.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <NotFoundContent />
      </main>
      <StickyCallBar />
    </>
  );
}
