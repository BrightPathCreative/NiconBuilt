import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, suburb, message } = body;

    if (!name || !phone || !suburb || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const webhook = siteConfig.ghlWebhook;

    if (webhook) {
      const ghlRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          suburb,
          message,
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
