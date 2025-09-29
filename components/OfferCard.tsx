<<<<<<< HEAD
"use client";
=======
﻿"use client";
>>>>>>> 991b4c6 (Ylan le negre)

import Link from "next/link";

export type Offer = {
  id: string;
  name: string;
  tagline: string;
  benefits: string[];
  price: { monthly: number; yearly: number };
  recommended?: boolean;
};

export default function OfferCard({ offer, billing = "monthly" }: { offer: Offer; billing?: "monthly" | "yearly" }) {
  const price = billing === "monthly" ? offer.price.monthly : offer.price.yearly;
  return (
    <div
      className={`relative rounded-lg border bg-card border-border p-6 flex flex-col gap-4 shadow-soft ${
        offer.recommended ? "ring-2 ring-[hsl(var(--brand))]" : ""
      }`}
    >
      {offer.recommended && (
        <span className="absolute -top-3 right-4 text-xs font-bold bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] px-2 py-1 rounded-full">
<<<<<<< HEAD
          Recommandé
=======
          RecommandÃ©
>>>>>>> 991b4c6 (Ylan le negre)
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold">{offer.name}</h3>
        <p className="text-sm text-black/70">{offer.tagline}</p>
      </div>
      <ul className="space-y-2 text-sm">
        {offer.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
<<<<<<< HEAD
            <span aria-hidden="true">✓</span>
=======
            <span aria-hidden="true">âœ“</span>
>>>>>>> 991b4c6 (Ylan le negre)
            <span>{b}</span>
          </li>
        ))}
      </ul>
<<<<<<< HEAD
      <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link
          href={`/commande?offer=${encodeURIComponent(offer.id)}&label=${encodeURIComponent(offer.name)}&price=${encodeURIComponent(String(price))}`}
          className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
          data-cta={`offer_${offer.id}_devis`}
          aria-label={`${offer.name} — demander un devis`}
        >
          Demander un devis sur mesure
        </Link>
        <Link
          href="/contact"
          className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 min-h-12 bg-white border border-border font-semibold hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
          data-cta={`offer_${offer.id}_expert`}
          aria-label={`${offer.name} — parler à un expert`}
        >
          Parler à un expert
=======
      <div className="mt-auto">
        <Link
          href={`/commande?offer=${encodeURIComponent(offer.id)}&label=${encodeURIComponent(offer.name)}&price=${encodeURIComponent(String(price))}`}
          className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 min-h-12 bg-[#0A304E] hover:bg-[#0C3D66] text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A304E] border border-[#0A304E]"
          data-cta={`offer_${offer.id}_devis`}
          aria-label={`${offer.name} â€” demander un devis`}
        >
          Réserver un appel
>>>>>>> 991b4c6 (Ylan le negre)
        </Link>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======


>>>>>>> 991b4c6 (Ylan le negre)
