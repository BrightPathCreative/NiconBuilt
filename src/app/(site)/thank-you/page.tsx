import Link from "next/link";
import { loadCopy, getSectionParagraphs } from "@/lib/copy";
import { buildMetadata, pageMeta } from "@/lib/metadata";

export const metadata = buildMetadata({
  ...pageMeta["thank-you"],
  path: "/thank-you/",
  noIndex: true,
});

export default function ThankYouPage() {
  const copy = loadCopy("thank-you");
  const body = getSectionParagraphs(copy, "Body");
  const primaryLink = getSectionParagraphs(copy, "Primary link")[0] ?? "See our work → /our-work/";
  const [linkLabel, linkHref = "/our-work/"] = primaryLink.split("→").map((part) => part.trim());

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
        <h1>{copy.headline}</h1>
        {body.map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
          <Link href={linkHref} className="btn btn-primary">
            {linkLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
