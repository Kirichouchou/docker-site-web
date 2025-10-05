"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, options, t } = useLanguage();
  const activeTagLabel = t("common.languageSelector.active");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const buttonLabel = useMemo(() => {
    const tooltip = t("common.languageSelector.tooltip");
    const active = options.find((option) => option.code === language)?.label;
    if (active) {
      return `${tooltip} : ${active}`;
    }
    return tooltip;
  }, [language, options, t]);

  return (
    <div ref={containerRef} className="pointer-events-auto fixed right-5 bottom-5 z-[70] sm:right-8 sm:bottom-8">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={t("common.languageSelector.ariaLabel")}
          className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-[#0A304E] px-4 py-2 text-white shadow-[0_25px_60px_-30px_rgba(10,48,78,0.65)] transition hover:bg-[#0C3D66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="text-lg font-semibold leading-none">A</span>
            <span className="absolute -right-0.5 top-0 text-xs font-semibold leading-none opacity-80">
              文
            </span>
          </span>
          <span className="sr-only">{buttonLabel}</span>
        </button>

        {open && (
          <div className="absolute right-0 bottom-full mb-3 w-44 overflow-hidden rounded-3xl border border-white/20 bg-[#0A304E] text-white shadow-[0_30px_80px_-40px_rgba(10,48,78,0.6)]">
            <ul className="divide-y divide-white/20">
              {options.map((option) => {
                const isActive = option.code === language;
                return (
                  <li key={option.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage(option.code);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isActive && (
                        <span className="text-xs uppercase tracking-[0.22em]">{activeTagLabel}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

