<<<<<<< HEAD
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-flex items-center text-sm font-semibold text-[hsl(var(--brand))] mb-3" aria-live="polite">
              Nouveau · Places limitées ce mois-ci
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Un site internet n’est pas qu’une vitrine
            </h1>
            <p className="mt-4 text-lg text-black/70">
              C’est un outil pour attirer, convaincre et fidéliser vos clients. Chez Fynora, nous créons des sites qui ne se contentent pas de présenter vos services : ils racontent une histoire, inspirent confiance et déclenchent l’envie d’agir.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/offres"
                className="inline-flex justify-center items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold shadow-soft hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
                data-cta="hero_primary"
              >
                Lancer mon projet
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center rounded-lg px-6 py-3 min-h-12 bg-white text-foreground border border-border font-semibold hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
                data-cta="hero_secondary"
              >
                Parler à un expert
              </Link>
            </div>
            <p className="mt-3 text-sm text-black/60">Satisfaction garantie · Support réactif · Paiement sécurisé</p>
          </div>

          <div className="rounded-lg overflow-hidden border border-border shadow-soft">
            <div className="aspect-video w-full bg-muted" aria-label="Aperçu vidéo / visuel" />
=======
﻿"use client";

import Link from "next/link";
import React from "react";

export default function Hero() {
  const titleLineOne = "Un site internet n\u2019est pas";
  const titleLineTwo = "qu\u2019une vitrine";
  const description =
    "C\u2019est un outil pour s\u00e9duire vos visiteurs, inspirer confiance et transformer l\u2019int\u00e9r\u00eat en action. Chaque site est con\u00e7u pour devenir un v\u00e9ritable levier de croissance.";
  const ctaLabel = "R\u00e9server un appel";
  const ctaIcon = "\u2197";
  const mediaPlaceholderLabel = "Espace média";
  const mediaPlaceholderNote = "Ajoutez une vidéo ou un carrousel d'images ici.";

  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 pt-[72px] pb-24 bg-[#F2F5FC]">
      <div className="w-full max-w-[960px] text-center mt-16">
        <h1 className="mt-8 text-gray-900 font-black leading-[1.05] text-[clamp(3.5rem,8vw,5rem)]">
          <span className="block">{titleLineOne}</span>
          <span className="block">{titleLineTwo}</span>
        </h1>
        <p className="mt-8 mx-auto max-w-[640px] text-lg sm:text-xl text-black/70 leading-relaxed">
          {description}
        </p>
        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#0A304E] hover:bg-[#0C3D66] text-white font-semibold text-sm sm:text-base shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] border border-[#0A304E] hover:translate-y-[-2px] transition-transform"
          >
            {ctaLabel}
            <span aria-hidden="true">{ctaIcon}</span>
          </Link>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-[1280px] overflow-hidden rounded-[32px] border border-black/10 bg-white/80 backdrop-blur-sm shadow-[0_40px_100px_-50px_rgba(0,0,0,0.55)]">
            <div className="pt-[56.25%] w-full bg-gradient-to-br from-black/10 via-white/60 to-white/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50">
                {mediaPlaceholderLabel}
              </span>
              <span className="text-sm text-black/40 text-center px-6">
                {mediaPlaceholderNote}
              </span>
            </div>
>>>>>>> 991b4c6 (Ylan le negre)
          </div>
        </div>
      </div>
    </section>
  );
}
<<<<<<< HEAD
=======







>>>>>>> 991b4c6 (Ylan le negre)
