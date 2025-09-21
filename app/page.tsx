"use client";

import Hero from "../components/Hero";
import OfferCard, { type Offer } from "../components/OfferCard";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";

const offers: Offer[] = [
  {
    id: "essentiel",
    name: "Offre Essentiel",
    tagline:
      "Un site vitrine élégant et efficace pour affirmer votre présence en ligne.",
    benefits: [
      "Design moderne et harmonieux",
      "Pages essentielles (Accueil, Services, Contact)",
      "SEO technique de base pour être trouvé sur Google",
      "Gestion technique et suivi inclus : sécurité, mises à jour, corrections",
      "Hébergement au choix : vous gérez ou nous confiez pour 5 €/mois.",
      "Site évolutif : nouvelles fonctionnalités possibles sur devis.",
    ],
    price: { monthly: 290, yearly: 2900 },
  },
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
  return (
    <>
      <Hero />

      {/* Preuve / Social proof */}
      <section className="section" aria-labelledby="proof">
        <div className="container mx-auto px-4">
          <h2 id="proof" className="sr-only">Preuves</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["+38% conversion", "LTV +24%", "Time-to-value 2 semaines"].map((stat) => (
              <div key={stat} className="rounded-lg border border-border p-4 bg-white text-center font-semibold">
                {stat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="section" aria-labelledby="offers">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 id="offers" className="text-3xl font-bold">Nos offres</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <CTASection />
    </>
  );
}
