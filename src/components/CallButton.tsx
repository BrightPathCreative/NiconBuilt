import { siteConfig, phoneHref, formatPhoneDisplay } from "@/lib/site";

type Props = {
  className?: string;
  prefix?: string;
  showNumber?: boolean;
  icon?: boolean;
};

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Click-to-call CTA — renders nothing until NEXT_PUBLIC_PRIMARY_PHONE is set. */
export function CallButton({
  className = "btn btn-outline",
  prefix = "Call",
  showNumber = true,
  icon = false,
}: Props) {
  const phone = siteConfig.phone;
  if (!phone) return null;

  const label = showNumber
    ? prefix
      ? `${prefix} ${formatPhoneDisplay(phone)}`
      : formatPhoneDisplay(phone)
    : prefix;

  return (
    <a
      href={phoneHref(phone)}
      className={className}
      style={icon ? { display: "inline-flex", alignItems: "center", gap: "7px" } : undefined}
    >
      {icon ? <PhoneIcon /> : null}
      {label}
    </a>
  );
}
