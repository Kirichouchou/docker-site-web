"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useContactOverlay } from "./ContactOverlayProvider";
import { useLanguage } from "../contexts/LanguageContext";
import Greeting from "./Greeting";

export default function Hero() {
  const { dictionary } = useLanguage();
  const heroCopy = dictionary?.hero ?? {};
  const titleLineOne = heroCopy.titleLineOne ?? "Un site internet n'est pas";
  const titleLineTwo = heroCopy.titleLineTwo ?? "qu'une vitrine";
  const description =
    heroCopy.description ??
    "C'est un outil pour séduire vos visiteurs, inspirer confiance et transformer l'intérêt en action. Chaque site est conçu pour devenir un véritable levier de croissance.";
  const ctaLabel = heroCopy.cta ?? "Réserver un appel";
  const mediaPlaceholderLabel = heroCopy.mediaPlaceholderLabel ?? "Espace média";
  const mediaPlaceholderNote =
    heroCopy.mediaPlaceholderNote ?? "Ajoutez une vidéo ou un carrousel d'images ici.";

  const { open } = useContactOverlay();

  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 pt-[72px] pb-24 bg-[#F2F5FC]">
      <div className="w-full max-w-[960px] text-center mt-8 md:mt-12 space-y-8">
        <Reveal as="div" className="mb-4">
          <Greeting />
        </Reveal>
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
        <Reveal delay={240} className="flex justify-center">
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-3 px-8 py-3 transform rounded-full bg-[#0A304E] hover:bg-[#0C3D66] text-white font-semibold text-sm sm:text-base shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] border border-[#0A304E] hover:translate-y-[-2px] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>
        <Reveal delay={360} className="flex justify-center">
          <div className="relative w-full max-w-[1280px] rounded-[32px] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.55)]">
            <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white/80 backdrop-blur-sm">
              <div className="pt-[56.25%] w-full bg-gradient-to-br from-black/10 via-white/60 to-white/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50">
                  {mediaPlaceholderLabel}
                </span>
                <span className="text-sm text-black/40 text-center px-6">
                  {mediaPlaceholderNote}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
