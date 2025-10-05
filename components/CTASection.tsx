"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useContactOverlay } from "./ContactOverlayProvider";
import { useLanguage } from "../contexts/LanguageContext";

type CTASectionProps = {
  embedded?: boolean;
  className?: string;
};

type CTAContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export default function CTASection({ embedded = false, className = "" }: CTASectionProps) {
  const { openBooking } = useContactOverlay();
  const { dictionary } = useLanguage();
  const copy: CTAContent = {
    eyebrow: dictionary?.ctaSection?.eyebrow ?? "On s'occupe de tout.",
    title: dictionary?.ctaSection?.title ?? "Vous vous concentrez sur vos clients.",
    description:
      dictionary?.ctaSection?.description ??
      "Nous orchestrons la conception, le pilotage et l'optimisation afin que vous puissiez vous focaliser sur l'essentiel : votre cœur de métier.",
    cta: dictionary?.ctaSection?.cta ?? "Réserver un appel",
  };

  if (embedded) {
    return (
      <div className={`relative overflow-visible ${className}`.trim()}>
        <div
          className="pointer-events-none absolute inset-x-16 -top-4 h-28 rounded-[64px] bg-[#0A304E]/18 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <Card onClick={openBooking} content={copy} />
        </div>
      </div>
    );
  }

  return (
    <section
      className={`relative overflow-hidden bg-[#F2F5FC] py-24 ${className}`.trim()}
      aria-labelledby="cta-title"
    >
      <div className="container relative mx-auto px-4">
        <Card onClick={openBooking} content={copy} />
      </div>
    </section>
  );
}

type CardProps = {
  onClick: () => void;
  content: CTAContent;
};

function Card({ onClick, content }: CardProps) {
  return (
    <Reveal
      delay={120}
      overshoot
      className="mx-auto max-w-3xl rounded-[48px] border border-[#0A304E]/30 bg-[#0A304E]/90 p-10 text-center text-white backdrop-blur-lg shadow-[0_50px_140px_-70px_rgba(10,48,78,0.55)]"
    >
      <p
        id="cta-title"
        className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70"
      >
        {content.eyebrow}
      </p>
      <h2 className="mt-4 text-3xl md:text-[2.75rem] font-extrabold leading-tight">
        {content.title}
      </h2>
      <p className="mt-4 text-base md:text-lg text-white/80">
        {content.description}
      </p>

      <div className="mt-8 flex justify-center">
        <Reveal delay={200} className="inline-flex">
          <button
            type="button"
            onClick={onClick}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white transition hover:bg-white/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            data-cta="cta_primary"
          >
            <span className="flex flex-col text-left">
              <span className="text-sm font-semibold">{content.cta}</span>
            </span>
            <ArrowUpRight className="ml-1 h-4 w-4 text-white/70 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </Reveal>
  );
}
