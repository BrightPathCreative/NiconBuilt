/**
 * Attribution capture for lead-gen forms.
 *
 * GHL forms embedded via iframe can't read the parent page's URL directly
 * (cross-origin), so we capture UTM/click-id params client-side on first
 * landing, persist them for the session, and forward them — plus the exact
 * page the form is currently on — as query params on the iframe `src`.
 * GHL auto-populates hidden fields whose parameter name matches a query
 * param exactly — those hidden fields must exist on the form in GHL for
 * this to have any effect.
 *
 * Two distinct "page" values are sent, since they answer different questions:
 * - `landing_page` — first page of the session (persisted). Answers "which ad/
 *   campaign/page brought this visitor in?"
 * - `page_url` / `page_path` — recalculated on every call, never persisted.
 *   Answers "which page was the form actually sitting on when they submitted it?"
 *   (e.g. the homepage hero, a specific service page's quick-enquiry strip, or /contact/).
 */

export const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "wbraid",
  "gbraid",
] as const;

export type TrackingParamKey = (typeof TRACKING_PARAM_KEYS)[number];

export type TrackingParams = Partial<Record<TrackingParamKey, string>> & {
  /** First page of the session — persisted, doesn't change as the visitor browses. Ad/campaign attribution. */
  landing_page?: string;
  referrer?: string;
  /** The exact page the form itself is embedded on at submit time — recalculated every call, never persisted. */
  page_url?: string;
  page_path?: string;
};

const STORAGE_KEY = "nb_lead_tracking_v1";

function readStored(): TrackingParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingParams) : {};
  } catch {
    return {};
  }
}

function writeStored(params: TrackingParams) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // sessionStorage unavailable (private browsing etc.) — non-fatal
  }
}

/**
 * Reads UTM/click-id params from the current URL, merges them with anything
 * already captured this session (first-touch wins for landing page + referrer,
 * latest-touch wins for UTM/click-ids), persists to sessionStorage, and
 * returns the merged set.
 */
export function captureTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {};

  const existing = readStored();
  const search = new URLSearchParams(window.location.search);
  const merged: TrackingParams = { ...existing };
  let changed = false;

  TRACKING_PARAM_KEYS.forEach((key) => {
    const value = search.get(key);
    if (value) {
      merged[key] = value;
      changed = true;
    }
  });

  if (!merged.landing_page) {
    merged.landing_page = window.location.href;
    changed = true;
  }

  if (!merged.referrer && document.referrer) {
    merged.referrer = document.referrer;
    changed = true;
  }

  if (changed) writeStored(merged);

  // Always fresh — reflects wherever the form actually is right now, not
  // wherever the visitor first landed. Never persisted to sessionStorage.
  merged.page_url = window.location.href;
  merged.page_path = window.location.pathname;

  return merged;
}
