/**
 * DOM event the Google Ads call-conversion callback fires once it has a
 * forwarding number. Lives on its own so the server-rendered tag component can
 * import it without dragging in the React hook in call-conversion.ts.
 */
export const FORWARDING_NUMBER_EVENT = "nb:forwarding-number";
