"use client";
import { useEffect } from "react";

type Opts = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  selector?: string;
};

export function useReveal({
  selector = ".reveal",
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: Opts = {}) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("reveal--active"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay;
          if (delay) el.style.setProperty("--delay", `${delay}ms`);
          el.classList.add("reveal--active");
          if (once) obs.unobserve(el);
        });
      },
      { threshold, rootMargin }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, threshold, rootMargin, once]);
}
