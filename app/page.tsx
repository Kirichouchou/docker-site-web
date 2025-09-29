<<<<<<< HEAD
"use client";

import Hero from "../components/Hero";
import Features from "../components/Features";
import OfferCard, { type Offer } from "../components/OfferCard";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";

const offers: Offer[] = [
  {
    id: "cro",
    name: "Une offre unique : votre site sur-mesure",
    tagline: "Un projet conçu pour vos objectifs, qu’il s’agisse de lancer votre activité, développer vos ventes en ligne ou bâtir une marque digitale forte.",
    benefits: [
      "Design exclusif : une création alignée avec votre identité",
      "Fonctionnalités adaptées : e-commerce, Click & Collect, réservation, multilingue…",
      "Performance et visibilité : un site pensé pour attirer et convertir",
      "Accompagnement dédié : un partenaire à vos côtés sur la durée",
    ],
    price: { monthly: 0, yearly: 0 },
    recommended: true,
  },
];

export default function HomePage() {
  const single = offers.length === 1;
  return (
    <>
      <Hero />

      {/* Catégories/atouts principaux */}
      <Features />

      {/* Services */}
      <section className="section" aria-labelledby="services">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h2 id="services" className="text-3xl font-bold">Nos services</h2>
          </div>
          <div
            className={
              single
                ? "mx-auto max-w-3xl grid grid-cols-1 gap-6"
                : "mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center"
            }
          >
            {offers.map((o) => (
              <div key={o.id} className={single ? "w-full" : "w-full"}>
                <OfferCard offer={o} />
              </div>
            ))}
=======
﻿"use client";

import Hero from "../components/Hero";
import Features from "../components/Features";
import CTASection from "../components/CTASection";

const servicesHighlight = {
  title: "Piloter votre croissance",
  subtitle:
    "Chaque projet est suivi avec précision : stratégie, suivi et optimisation continue pour faire progresser vos résultats semaine après semaine.",
  pillars: [
    {
      title: "Tracking",
      description:
        "Mettre en place les bons indicateurs pour mesurer précisément l’impact de vos actions et prendre les bonnes décisions.",
      stack: ["Google Tag Manager", "GA4"],
    },
    {
      title: "Optimisation & reporting",
      description:
        "Des tableaux de bord clairs et actionnables pour piloter votre acquisition et identifier les prochaines priorités.",
      stack: ["Looker Studio", "Notion"],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />

      <section className="section bg-[#F2F5FC]" aria-labelledby="services">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#102B45] via-[#0A304E] to-[#051D33] shadow-[0_60px_120px_-45px_rgba(10,48,78,0.55)] text-white">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.08), transparent 50%)",
              }}
              aria-hidden="true"
            />
            <div className="relative grid gap-10 px-6 py-12 sm:px-10 md:px-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-12 lg:px-16 lg:py-16">
              <header className="max-w-xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">
                  Nos services
                </p>
                <h2 id="services" className="text-3xl md:text-4xl font-extrabold leading-snug">
                  {servicesHighlight.title}
                </h2>
                <p className="text-base md:text-lg text-white/80">
                  {servicesHighlight.subtitle}
                </p>
              </header>

              <div className="grid gap-6 sm:grid-cols-2">
                {servicesHighlight.pillars.map((pillar) => (
                  <article
                    key={pillar.title}
                    className="group relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 px-6 py-7 sm:px-8 sm:py-9 backdrop-blur-xl shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-1"
                  >
                    <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl transition-opacity group-hover:opacity-90" aria-hidden="true" />
                    <div className="relative space-y-4">
                      <h3 className="text-xl font-semibold">{pillar.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/70">
                        {pillar.stack.map((tool) => (
                          <span key={tool} className="rounded-full border border-white/25 bg-white/10 px-3 py-1">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
>>>>>>> 991b4c6 (Ylan le negre)
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <FAQ />

=======
>>>>>>> 991b4c6 (Ylan le negre)
      <CTASection />
    </>
  );
}
