"use client";

import { useEffect } from "react";

export default function ScrollTracker() {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      thresholds.forEach((t) => {
        if (!fired.has(t) && percent >= t) {
          fired.add(t);
          window.dispatchEvent(new CustomEvent("analytics:track", { detail: { name: "scroll", value: String(t) } }));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onTrack = (e: Event) => {
      const ce = e as CustomEvent;
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ce.detail),
        keepalive: true,
      }).catch(() => {});
    };
    window.addEventListener("analytics:track", onTrack as EventListener);
    return () => window.removeEventListener("analytics:track", onTrack as EventListener);
  }, []);

  return null;
}

