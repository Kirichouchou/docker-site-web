"use client";

import OfferCard, { type Offer } from "../../components/OfferCard";

const offers: Offer[] = [
  {
    id: "essentiel",
    name: "Offre Essentiel – 290 €",
    tagline: "Un site qui va droit au but : esthétique, clair et prêt à convaincre.",
    benefits: [
      "Un design qui inspire confiance dès le premier regard",
      "Un parcours pensé pour guider vos visiteurs vers l’action",
      "Compatible mobile, tablette et ordinateur",
      "Hébergement & maintenance technique : 5 €/mois",
    ],
    price: { monthly: 290, yearly: 2900 },
  },
  {
    id: "cro",
    name: "Offre Pro – 590 €",
    tagline: "Votre histoire mérite un site qui captive et engage.",
    benefits: [
      "Design travaillé pour créer de l’émotion et marquer les esprits",
      "Intégration possible : réservation, catalogue, galerie, ou mise en avant de vos produits",
      "Optimisé pour convertir vos visiteurs en clients fidèles",
      "2 ajustements inclus après la mise en ligne pour affiner les détails",
      "Hébergement & maintenance technique : 5 €/mois",
    ],
    price: { monthly: 590, yearly: 5900 },
    recommended: true,
  },
];

export default function OffresPage() {
  return (
    <div className="section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Nos offres</h1>
        </div>
        <p className="text-black/70 mb-6">Choisissez un plan par objectifs. Les prix restent en second plan : l'important, ce sont les résultats.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </div>
    </div>
  );
}
