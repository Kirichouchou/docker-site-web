"use client";
import React, { type HTMLAttributes, useEffect, useRef } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  direction?: "up" | "down" | "left" | "right";
  overshoot?: boolean;
  delay?: number;
};

const isReducedMotion = () => {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const inViewport = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  const h = window.innerHeight || document.documentElement.clientHeight;
  const w = window.innerWidth || document.documentElement.clientWidth;
  return r.top < h && r.bottom > 0 && r.left < w && r.right > 0;
}

function Reveal({
  as: Tag = "div",
  direction = "up",
  overshoot = false,
  delay,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    el.classList.add("reveal", `reveal--${direction}`);
    if (overshoot) el.classList.add("reveal--overshoot");
    if (typeof delay === "number") el.dataset.delay = String(delay);

    if (isReducedMotion()) {
      el.classList.add("reveal--active");
      return;
    }

    if (inViewport(el)) {
      el.classList.add("reveal--active");
      return;
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              el.classList.add("reveal--active");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px 0px 0px" }
      );
      io.observe(el);

      const onTick = () => {
        if (!el.classList.contains("reveal--active") && inViewport(el)) {
          el.classList.add("reveal--active");
        }
      };
      window.addEventListener("scroll", onTick, { passive: true });
      window.addEventListener("resize", onTick);
      document.addEventListener("visibilitychange", onTick);

      return () => {
        io.disconnect();
        window.removeEventListener("scroll", onTick);
        window.removeEventListener("resize", onTick);
        document.removeEventListener("visibilitychange", onTick);
      };
    } else {
      el.classList.add("reveal--active");
    }
  }, [direction, overshoot, delay]);

  return (
    <Tag ref={ref as any} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export default React.memo(Reveal);
