import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

// Backs the native fallback <ContactForm /> component, which is not currently
// rendered anywhere on the site (all forms now use the GHL-hosted embed via
// <GhlEmbedForm />). Kept live as a rollback path — safe to remove once the
// embed has proven reliable in production.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, serviceType, suburb, project } = body;

    if (!firstName || !lastName || !phone || !email || !serviceType || !suburb) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const webhook = siteConfig.ghlWebhook;

    if (webhook) {
      const ghlRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          name: `${firstName} ${lastName}`.trim(),
          phone,
          email,
          serviceType,
          suburb,
          project: project || "",
          source: "niconbuilt.com.au",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!ghlRes.ok) {
        console.error("GHL webhook failed:", ghlRes.status, await ghlRes.text());
        return NextResponse.json(
          { error: "Unable to submit your enquiry. Please call us directly." },
          { status: 502 }
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Form temporarily unavailable. Please email nick@niconbuilt.com.au" },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
