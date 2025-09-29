<<<<<<< HEAD
"use client";

import Image from "next/image";
=======
﻿"use client";

>>>>>>> 991b4c6 (Ylan le negre)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Services" },
  { href: "/contact", label: "Contact" },
];

<<<<<<< HEAD
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
=======
const brandLabel = "Fynora";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

>>>>>>> 991b4c6 (Ylan le negre)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

<<<<<<< HEAD
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

        <div className="hidden md:flex items-center justify-center gap-6">
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
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[hsl(var(--brand))] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/offres"
            className="inline-flex items-center rounded-lg px-4 py-2 min-h-11 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] shadow-soft hover:opacity-90 transition"
            data-cta="nav_primary"
          >
            Lancer mon projet
          </Link>
=======
  const bannerBase =
    "flex flex-col gap-4 rounded-full border border-white/10 px-6 py-4 text-white transition-all backdrop-blur-xl shadow-[0_25px_60px_-35px_rgba(11,25,55,0.9)] md:grid md:grid-cols-[auto,1fr,auto] md:items-center md:gap-10 md:px-10";
  const bannerTone = "bg-[#0A304E]";

  return (
    <nav className="sticky top-0 z-50 pt-4 pb-2 md:pb-4 bg-[#F2F5FC]">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className={`${bannerBase} ${bannerTone}`}>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition hover:text-white ${
                    active ? "text-white" : "text-white/70"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-white/80" />
                  )}
                </Link>
              );
            })}
          </div>

          <Link
            href="/"
            className="flex items-center justify-center text-xs font-semibold uppercase tracking-[0.32em] text-white/90 md:text-sm"
            aria-label={brandLabel}
          >
            {brandLabel}
          </Link>

          <div className="flex justify-end">
            <Link
              href="/offres"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_40px_-28px_rgba(10,32,58,0.9)] transition hover:bg-white/30"
              data-cta="nav_primary"
            >
              <span>R\u00e9server un appel</span>
              <span aria-hidden="true">{"\u2197"}</span>
            </Link>
          </div>
>>>>>>> 991b4c6 (Ylan le negre)
        </div>
      </div>
    </nav>
  );
}
<<<<<<< HEAD
=======


>>>>>>> 991b4c6 (Ylan le negre)
