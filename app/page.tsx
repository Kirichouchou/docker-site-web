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
          </div>
        </div>
      </section>

      <FAQ />

      <CTASection />
    </>
  );
}
