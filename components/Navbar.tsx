"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToServices = () => {
    if (typeof window === "undefined") return;
    const target = document.getElementById("services");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const targetCenter = rect.top + window.scrollY + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const top = targetCenter - viewportCenter;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const handleServicesClick = async (
    event: ReactMouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    if (pathname !== "/") {
      await router.push("/#services", { scroll: false });
      setTimeout(scrollToServices, 120);
    } else {
      scrollToServices();
    }
  };

  const shellClasses = scrolled ? "py-3 px-6" : "py-6 px-12";

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-center bg-transparent transition-all ${
        scrolled ? "py-2" : "py-4"
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div
        className={`flex w-full max-w-6xl items-center rounded-full bg-[#0c2f4b] text-white transition-all ${
          shellClasses
        }`}
      >
        <div className="flex flex-1 basis-0 items-center gap-10 text-sm font-medium text-white/70">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const isServices = item.label === "Services";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isServices ? handleServicesClick : undefined}
                className={`relative inline-flex items-center whitespace-nowrap transition ${
                  active ? "text-white" : "hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-white"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden flex-1 basis-0 justify-center md:flex">
          <Link
            href="/"
            className="text-2xl font-black leading-tight text-white font-sans"
            aria-label="Fynora"
          >
            Fynora
          </Link>
        </div>

        <div className="flex flex-1 basis-0 justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25"
            data-cta="nav_primary"
          >
            R�server un appel
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}


