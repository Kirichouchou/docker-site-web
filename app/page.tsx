"use client";

import Hero from "../components/Hero";
import OfferCard, { type Offer } from "../components/OfferCard";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";

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
            <h2 id="offers" className="text-3xl font-bold">Offres orientées valeur</h2>
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
