import { useSyncExternalStore } from "react";
import { FORWARDING_NUMBER_EVENT } from "./call-conversion-event";

/**
 * Google Ads "calls from website" — forwarding number bridge.
 *
 * When a visitor arrives from an ad, Google's tag can swap the business number
 * for a per-session forwarding number so the call is attributed to the click.
 * Its default mechanism is to find the number as text in the DOM and replace
 * it, which does nothing here: the buttons read "Click to call" and the number
 * only lives in a `tel:` href and a desktop popover. So the landing pages
 * register the conversion with `phone_conversion_callback` instead, Google
 * hands the forwarding number to that callback, and `CallButton` reads it from
 * this store — every call button on the page swaps at once, href included.
 *
 * The callback is defined in an inline <script> (see GoogleAdsCallTracking), so
 * it can't import this module. It stashes the number on `window` and fires a
 * DOM event; the store reads the stash on first subscribe (in case the tag beat
 * hydration) and listens for the event (in case hydration beat the tag).
 */

export type ForwardingNumber = {
  /** Formatted for display, as Google supplies it. */
  display: string;
  /** `tel:` href built from the dialable form. */
  href: string;
  /** Digits (and leading +) only — what "Copy number" should copy. */
  digits: string;
};

type Stash = { formatted?: string; dialable?: string } | undefined;

declare global {
  interface Window {
    __nbForwardingNumber?: Stash;
  }
}

let current: ForwardingNumber | null = null;
const listeners = new Set<() => void>();

function fromStash(stash: Stash): ForwardingNumber | null {
  const dialable = stash?.dialable?.trim();
  const formatted = stash?.formatted?.trim();
  if (!dialable && !formatted) return null;
  const digits = (dialable || formatted || "").replace(/[^\d+]/g, "");
  if (!digits) return null;
  return { display: formatted || dialable || digits, href: `tel:${digits}`, digits };
}

function refresh() {
  const next = fromStash(window.__nbForwardingNumber);
  if (next?.href === current?.href) return;
  current = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener(FORWARDING_NUMBER_EVENT, refresh);
    refresh();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener(FORWARDING_NUMBER_EVENT, refresh);
  };
}

const getSnapshot = () => current;
const getServerSnapshot = () => null;

/** The Google forwarding number for this session, or null to use the real one. */
export function useForwardingNumber(): ForwardingNumber | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
