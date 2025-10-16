"use client";

import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import Reveal from "./Reveal";
import { useContactOverlay } from "./ContactOverlayProvider";
import { useLanguage } from "../contexts/LanguageContext";

const HERO_REVIEWS = [
  {
    quote:
      "Le rendu est exactement comme attendu, voire meilleur. Ils sont tres reactifs.",
    name: "Christophe Halin",
  },
  {
    quote:
      "Un accompagnement clair du debut a la fin, le site convertit bien mieux qu'avant.",
    name: "Pauline Roussel",
  },
  {
    quote:
      "On a gagne en credibilite et nos prospects trouvent enfin les infos facilement.",
    name: "Mehdi Laurent",
  },
] as const;

export default function Hero() {
  const { dictionary } = useLanguage();
  const heroCopy = dictionary?.hero ?? {};
  const titleLineOne = heroCopy.titleLineOne ?? "Un site internet n'est pas";
  const titleLineTwo = heroCopy.titleLineTwo ?? "qu'une vitrine";
  const description =
    heroCopy.description ??
    "C'est un outil pour seduire vos visiteurs, inspirer confiance et transformer l'interet en action. Chaque site est concu pour devenir un veritable levier de croissance.";
  const ctaLabel = heroCopy.cta ?? "Reserver un appel";

  const { open } = useContactOverlay();
  const [reviewIndex, setReviewIndex] = React.useState(0);
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let fadeTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setIsFading(true);
      fadeTimeout = window.setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % HERO_REVIEWS.length);
        setIsFading(false);
      }, 260);
    }, 4600);

    return () => {
      window.clearInterval(interval);
      if (fadeTimeout !== undefined) {
        window.clearTimeout(fadeTimeout);
      }
    };
  }, []);

  const activeReview = HERO_REVIEWS[reviewIndex];
  const reviewerInitials = activeReview.name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] flex flex-col items-center justify-start px-4 pt-[72px] pb-0 bg-[#F2F5FC]">
      <div className="w-full max-w-[960px] text-center mt-8 md:mt-12 space-y-8">
        <Reveal
          as="h1"
          className="text-gray-900 font-black leading-[1.05] text-[clamp(3.5rem,8vw,5rem)]"
          overshoot
        >
          <span className="block">{titleLineOne}</span>
          <span className="block">{titleLineTwo}</span>
        </Reveal>
        <Reveal
          as="p"
          delay={140}
          className="mx-auto max-w-[640px] text-lg sm:text-xl text-black/70 leading-relaxed"
        >
          {description}
        </Reveal>
        <Reveal delay={240} className="flex flex-col items-center">
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-3 px-8 py-3 transform rounded-full bg-[#0A304E] hover:bg-[#0C3D66] text-white font-semibold text-sm sm:text-base shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] border border-[#0A304E] hover:translate-y-[-2px] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>
        <Reveal delay={320} className="flex justify-center pt-8 sm:pt-10">
          <div className="w-full max-w-[540px] text-center">
            <div
              className={`space-y-5 transition-all duration-300 ${
                isFading ? "translate-y-1 opacity-0" : "opacity-100"
              }`}
              aria-live="polite"
            >
              <p className="text-lg text-black/70">
                "{activeReview.quote}"
              </p>
              <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:text-left">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A304E] text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_20px_-16px_rgba(10,48,78,0.35)]">
                  {reviewerInitials}
                </div>
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-sm font-semibold text-[#0A304E]">
                    {activeReview.name}
                  </span>
                  <span className="hidden h-4 w-px bg-black/10 sm:block" aria-hidden="true" />
                  <div className="flex items-center gap-[6px] text-black">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`hero-review-star-${index}`}
                        className="h-[18px] w-[18px]"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {HERO_REVIEWS.map((_, index) => (
                <span
                  key={`hero-review-dot-${index}`}
                  className={`h-[6px] w-[6px] rounded-full transition-opacity ${
                    reviewIndex === index ? "bg-[#0A304E] opacity-100" : "bg-[#0A304E] opacity-30"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
