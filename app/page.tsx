"use client";

import Hero from "../components/Hero";
import Features from "../components/Features";
import OfferCard, { type Offer } from "../components/OfferCard";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";

const offers: Offer[] = [
  {
    id: "cro",
    name: "Offre Sur-mesure – sur devis",
    tagline: "Un site exclusif, pensé comme un véritable outil de croissance.",
    benefits: [
      "Design premium, façonné à l’image de votre marque",
      "Fonctionnalités avancées : réservation, Click & Collect, e-commerce, multilingue…",
      "Stratégie de conversion et accompagnement marketing",
      "Suivi premium : interlocuteur dédié, ajustements, optimisation continue",
      "Projet conçu sur-mesure, après étude de vos objectifs. Devis transparent et adapté.",
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

      {/* Offres */}
      <section className="section" aria-labelledby="offers">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h2 id="offers" className="text-3xl font-bold">Nos offres</h2>
          </div>
          <div
            className={
              single
                ? "mx-auto max-w-lg grid grid-cols-1 gap-6"
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
