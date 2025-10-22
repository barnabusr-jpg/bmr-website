"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestorationDisabler() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Reset scroll position on initial load and on refreshes
    window.scrollTo(0, 0);

    // Clean up event listeners
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
