"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-border transition-all ${
        scrolled ? "bg-white/90 backdrop-blur" : "bg-white/70 backdrop-blur"
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="container mx-auto grid grid-cols-3 items-center px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Fynora">
          <Image
            src="/fynora-logo.png"
            alt="Fynora"
            width={213}
            height={64}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center justify-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-semibold transition hover:opacity-80 ${
                  active ? "text-[hsl(var(--brand))]" : "text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[hsl(var(--brand))]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/offres"
            className="inline-flex items-center rounded-lg border border-[hsl(var(--brand))] bg-[hsl(var(--brand))] px-4 py-2 text-sm font-semibold text-[hsl(var(--brand-foreground))] shadow-soft transition hover:opacity-90"
            data-cta="nav_primary"
          >
            Lancer mon projet
          </Link>
        </div>
      </div>
    </nav>
  );
}
