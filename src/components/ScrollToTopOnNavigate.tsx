"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Scroll to top on client-side route changes (logo, nav links, etc.). */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
