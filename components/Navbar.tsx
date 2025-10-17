"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { useContactOverlay } from "./ContactOverlayProvider";
import { useLanguage } from "../contexts/LanguageContext";

type NavItem = {
  href: string;
  label: string;
  scrollId?: string;
};

const HIDE_THRESHOLD = 80;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openBooking } = useContactOverlay();
  const { dictionary, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        href: "/",
        label: dictionary?.navbar?.links?.home ?? "Accueil",
      },
      {
        href: "/#services",
        label: dictionary?.navbar?.links?.services ?? "Services",
        scrollId: "services",
      },
    ],
    [dictionary],
  );

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 8);

      const delta = current - lastScroll.current;
      const goingDown = delta > 0;
      const goingUp = delta < 0;

      if (current <= HIDE_THRESHOLD) {
        setHidden(false);
      } else if (goingDown) {
        setHidden(true);
      } else if (goingUp) {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (id: string) => {
    if (typeof window === "undefined") return;
    const target = document.getElementById(id);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const targetCenter = rect.top + window.scrollY + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const top = targetCenter - viewportCenter;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const handleNavClick = (item: NavItem) => async (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    if (!item.scrollId) return;
    event.preventDefault();

    if (pathname !== "/") {
      await router.push(item.href, { scroll: false });
      setTimeout(() => smoothScrollTo(item.scrollId!), 120);
    } else {
      window.history.replaceState(null, "", item.href);
      smoothScrollTo(item.scrollId);
    }
  };

  const shellClasses = scrolled ? "py-3 px-6" : "py-6 px-12";
  const navVisibility = hidden ? "opacity-0 pointer-events-none" : "opacity-100";
  const navAriaLabel = t("navbar.aria.mainNav");
  const ctaLabel = dictionary?.navbar?.cta ?? "Réserver un appel";
  const brandLabel = dictionary?.common?.brand ?? "Fynora";

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-center bg-transparent transition-all duration-300 ${navVisibility} ${
        scrolled ? "py-2" : "py-4"
      }`}
      role="navigation"
      aria-label={navAriaLabel}
    >
      <div
        className={`flex w-full max-w-6xl items-center rounded-full bg-[#0c2f4b] text-white transition-all ${
          shellClasses
        }`}
      >
        <div className="flex flex-1 basis-0 items-center gap-10 text-sm font-medium text-white/70">
          {navItems.map((item) => {
            const isHashRoute = Boolean(item.scrollId);
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isHashRoute ? handleNavClick(item) : undefined}
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
            aria-label={brandLabel}
          >
            {brandLabel}
          </Link>
        </div>

        <div className="flex flex-1 basis-0 justify-end">
          <button
            type="button"
            onClick={openBooking}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25"
            data-cta="nav_primary"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
