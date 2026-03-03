"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransitionLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsLoading(true);
      const tid = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(tid);
    }
  }, [pathname]);

  return (
    <>
      {isLoading && (
        <div
          className="h-1 w-full bg-slate-200 dark:bg-slate-700 animate-pulse"
          aria-hidden
        />
      )}
      {children}
    </>
  );
}
