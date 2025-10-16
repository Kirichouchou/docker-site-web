"use client";

import Script from "next/script";
import { useEffect } from "react";
import ScrollTracker from "./ScrollTracker";

export default function AnalyticsProvider() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    // Minimal event binding for CTA buttons
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cta], [data-event]");
      if (!el) return;
      const name = el.getAttribute("data-cta") || el.getAttribute("data-event") || "unknown";
      const value = el.getAttribute("data-value") || undefined;
      window.dispatchEvent(
        new CustomEvent("analytics:track", { detail: { name, value, ts: Date.now() } })
      );
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {clarityId ? (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}

      <ScrollTracker />
    </>
  );
}

