"use client";

import { useEffect } from "react";
import { captureTrackingParams } from "@/lib/tracking";

/**
 * Mounted once in the root layout so UTM/gclid/fbclid params are captured
 * on whichever page a visitor first lands on (e.g. a blog post or service
 * page from a paid ad), not just on the page containing the contact form.
 * Persisted to sessionStorage and later forwarded into the GHL form iframe.
 */
export function TrackingParamsCapture() {
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return null;
}
