import Link from "next/link";
import { loadCopy, getSectionParagraphs } from "@/lib/copy";

/**
 * Body of the 404 page, without chrome.
 *
 * Kept separate because each route group needs its own `not-found.tsx`: Next.js
 * embeds the nearest not-found boundary in every page's payload, so a boundary
 * that pulls in the site header and footer would ship that markup with every
 * page on the site. Each group's boundary renders this and inherits chrome from
 * its own layout instead.
 */
export function NotFoundContent() {
  const copy = loadCopy("404");
  const body = getSectionParagraphs(copy, "Body");
  const primaryLink = getSectionParagraphs(copy, "Primary link")[0] ?? "Back to home → /";
  const secondaryLink = getSectionParagraphs(copy, "Secondary link")[0] ?? "Contact us → /contact/";
  const [primaryLabel, primaryHref = "/"] = primaryLink.split("→").map((part) => part.trim());
  const [secondaryLabel, secondaryHref = "/contact/"] = secondaryLink
    .split("→")
    .map((part) => part.trim());

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
        <h1>{copy.headline}</h1>
        {body.map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Link href={primaryHref} className="btn btn-primary">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="btn btn-outline">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
