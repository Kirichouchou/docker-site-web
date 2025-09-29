"use client";
import React, { HTMLAttributes, useEffect, useRef } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  direction?: "up" | "down" | "left" | "right";
  overshoot?: boolean;
  delay?: number; // ms
};

export default function Reveal({
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

    if (!("IntersectionObserver" in window)) {
      el.classList.add("reveal--active");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal--active");
          io.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [direction, overshoot, delay]);

  return (
    <Tag ref={ref as any} className={className} {...rest}>
      {children}
    </Tag>
  );
}
