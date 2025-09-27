"use client";

import OfferCard, { type Offer } from "../../components/OfferCard";

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

export default function OffresPage() {
  const single = offers.length === 1;
  return (
    <div className="section">
      <div className="container mx-auto px-4">
        <div className="mb-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Nos offres</h1>
        </div>
        <p className="text-black/70 mb-6 text-center">Nos offres s’adaptent à vos objectifs : une présence en ligne claire ou une solution digitale complète pour accélérer votre croissance.</p>
        <div
          className={
            single
              ? "mx-auto max-w-lg grid grid-cols-1 gap-6"
              : "grid md:grid-cols-2 gap-6"
          }
        >
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </div>
    </div>
  );
}
