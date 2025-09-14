"use client";

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
          Recommandé
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold">{offer.name}</h3>
        <p className="text-sm text-black/70">{offer.tagline}</p>
      </div>
      <ul className="space-y-2 text-sm">
        {offer.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <div className="text-sm text-black/60 mb-2">À partir de</div>
        <div className="text-3xl font-extrabold tracking-tight">{price}€</div>
        <div className="text-xs text-black/50 mb-4">{billing === "monthly" ? "/mois" : "/an"} · prix en second plan, valeur d’abord</div>
        <Link
          href={`/contact?offer=${encodeURIComponent(offer.id)}&label=${encodeURIComponent(offer.name)}&price=${encodeURIComponent(String(price))}`}
          className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
          data-cta={`offer_${offer.id}_contact`}
          aria-label={`${offer.name} — nous contacter`}
        >
          Nous contacter
        </Link>
      </div>
    </div>
  );
}

