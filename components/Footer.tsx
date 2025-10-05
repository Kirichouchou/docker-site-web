"use client";

import { useMemo } from "react";
import { useContactOverlay } from "./ContactOverlayProvider";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { open } = useContactOverlay();
  const { dictionary } = useLanguage();
  const footerCopy = dictionary?.footer ?? {};

  const year = useMemo(() => new Date().getFullYear().toString(), []);
  const copyrightTemplate =
    footerCopy.copyright ?? "© {year} Fynora. Tous droits réservés.";
  const copyrightText = copyrightTemplate.replace("{year}", year);
  const legalLabel = footerCopy.legal ?? "Mentions légales";
  const supportLabel = footerCopy.support ?? "Support";

  return (
    <footer className="mt-16 border-t border-border bg-[#F2F5FC]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-black/60 md:flex-row">
        <div>{copyrightText}</div>
        <div className="flex items-center gap-4">
          <a href="/mentions-legales" className="hover:opacity-80">
            {legalLabel}
          </a>
          <button
            type="button"
            onClick={open}
            className="hover:opacity-80"
          >
            {supportLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}
