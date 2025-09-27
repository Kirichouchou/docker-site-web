"use client";

import OfferCard, { type Offer } from "../../components/OfferCard";

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

export default function OffresPage() {
  const single = offers.length === 1;
  return (
    <div className="section">
      <div className="container mx-auto px-4">
        <div className="mb-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Nos services</h1>
        </div>
        <p className="text-black/70 mb-6 text-center">Nos services s’adaptent à vos objectifs : une présence en ligne claire ou une solution digitale complète pour accélérer votre croissance.</p>
        <div
          className={
            single
              ? "mx-auto max-w-3xl grid grid-cols-1 gap-6"
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
