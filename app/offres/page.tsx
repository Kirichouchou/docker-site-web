"use client";

import OfferCard, { type Offer } from "../../components/OfferCard";

const offers: Offer[] = [
  {
    id: "essentiel",
    name: "Offre Essentiel",
    tagline:
      "Bien plus qu’un site vitrine : une présence qui inspire confiance. Pensé pour les indépendants et petites structures, l’Essentiel offre un site élégant et efficace, conçu pour valoriser votre image et affirmer votre présence en ligne.",
    benefits: [
      "Design moderne et harmonieux, adapté à votre activité",
      "Pages essentielles (Accueil, Services, Contact)",
      "Optimisation technique SEO pour être trouvé sur Google",
      "Gestion technique et suivi inclus : sécurité, mises à jour et corrections assurées",
      "Hébergement au choix : vous pouvez utiliser votre propre solution ou nous confier l’hébergement pour 5 €/mois.",
      "Votre site est évolutif : vous pourrez ajouter de nouvelles fonctionnalités quand vos besoins grandiront (sur devis).",
    ],
    price: { monthly: 290, yearly: 2900 },
  },
  {
    id: "cro",
    name: "Offre Sur-mesure – sur devis",
    tagline:
      "Un site qui dépasse la vitrine pour devenir un véritable outil de croissance. Destinée aux marques ambitieuses, cette offre associe design exclusif et stratégie digitale pour transformer votre site en un outil puissant, capable de séduire, convaincre et fidéliser vos clients. Chaque projet est conçu sur-mesure, après une étude approfondie de vos objectifs, avec un devis transparent et adapté à vos ambitions.",
    benefits: [
      "Design unique et haut de gamme, façonné à l’image de votre marque",
      "Intégration de fonctionnalités avancées selon vos besoins : réservation en ligne, Click & Collect, multilingue, e-commerce complet…",
      "Stratégie de conversion et accompagnement marketing pour générer des résultats mesurables",
      "Suivi premium : interlocuteur dédié, ajustements continus, optimisation de vos performances",
    ],
    price: { monthly: 0, yearly: 0 },
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
