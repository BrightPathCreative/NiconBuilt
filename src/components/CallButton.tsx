import { siteConfig, phoneHref, formatPhoneDisplay, callCtaLabel } from "@/lib/site";

type Props = {
  className?: string;
  /** Optional prefix text — number is never appended to the label. */
  prefix?: string;
  /** Only set true if you explicitly need the number visible (not used on the live site). */
  showNumber?: boolean;
  icon?: boolean;
  label?: string;
};

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Click-to-call CTA. Dials NEXT_PUBLIC_PRIMARY_PHONE (GHL tracking number) via tel:; otherwise links to /contact/. */
export function CallButton({
  className = "btn btn-outline",
  prefix,
  showNumber = false,
  icon = false,
  label: explicitLabel,
}: Props) {
  const phone = siteConfig.phone;

  const label = explicitLabel ?? (phone
    ? showNumber
      ? prefix
        ? `${prefix} ${formatPhoneDisplay(phone)}`
        : formatPhoneDisplay(phone)
      : prefix ?? callCtaLabel
    : prefix ?? "Call us");

  const href = phone ? phoneHref(phone) : "/contact/";

  return (
    <a
      href={href}
      className={className}
      style={icon ? { display: "inline-flex", alignItems: "center", gap: "7px" } : undefined}
    >
      {icon ? <PhoneIcon /> : null}
      {label}
    </a>
  );
}
