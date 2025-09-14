"use client";

import Hero from "../components/Hero";
import OfferCard, { type Offer } from "../components/OfferCard";
import PricingToggle from "../components/PricingToggle";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";
import { useState } from "react";

const offers: Offer[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Les bases pour passer à l’action.",
    benefits: [
      "Audit et plan d’action priorisé",
      "Implémentations quick-wins",
      "1 session de revue mensuelle",
    ],
    price: { monthly: 190, yearly: 1900 },
  },
  {
    id: "cro",
    name: "CRO+",
    tagline: "Itérations rapides orientées résultats.",
    benefits: [
      "Expériences A/B prioritaires",
      "Design system conversion-first",
      "2 sessions / mois + support async",
    ],
    price: { monthly: 490, yearly: 4900 },
    recommended: true,
  },
  {
    id: "partenariat",
    name: "Partenariat",
    tagline: "Extension d’équipe, objectifs communs.",
    benefits: [
      "Roadmap conjointe et KPIs",
      "Implémentation end-to-end",
      "Ateliers, coaching, et reporting",
    ],
    price: { monthly: 990, yearly: 9900 },
  },
];

export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
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
            <h2 id="offers" className="text-3xl font-bold">Offres orientées valeur</h2>
            <PricingToggle value={billing} onChange={setBilling} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} billing={billing} />
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <CTASection />
    </>
  );
}
