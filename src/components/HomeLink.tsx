"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type HomeLinkProps = {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function HomeLink({ className, children, onNavigate }: HomeLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Link
      href="/"
      className={className}
      aria-label="Nicon Built home"
      scroll
      onClick={(event) => {
        onNavigate?.();

        if (isHome) {
          event.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      }}
    >
      {children}
    </Link>
  );
}
