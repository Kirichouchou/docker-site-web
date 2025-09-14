"use client";

import OfferCard, { type Offer } from "../../components/OfferCard";
import PricingToggle from "../../components/PricingToggle";
import { useState } from "react";

const offers: Offer[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Les bases pour passer à l'action.",
    benefits: ["Audit et plan d'action", "Quick-wins", "1 revue/mois"],
    price: { monthly: 190, yearly: 1900 },
  },
  {
    id: "cro",
    name: "CRO+",
    tagline: "Itérations rapides orientées résultats.",
    benefits: ["Tests A/B", "Design system", "2 revues/mois + async"],
    price: { monthly: 490, yearly: 4900 },
    recommended: true,
  },
];

export default function OffresPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  return (
    <div className="section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Nos offres</h1>
          <PricingToggle value={billing} onChange={setBilling} />
        </div>
        <p className="text-black/70 mb-6">Choisissez un plan par objectifs. Les prix restent en second plan : l'important, ce sont les résultats.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} billing={billing} />
          ))}
        </div>
      </div>
    </div>
  );
}

