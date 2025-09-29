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

type OfferCardProps = {
  offer: Offer;
  billing?: "monthly" | "yearly";
};

export default function OfferCard({ offer, billing = "monthly" }: OfferCardProps) {
  const price = billing === "monthly" ? offer.price.monthly : offer.price.yearly;
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-soft ${
        offer.recommended ? "ring-2 ring-[hsl(var(--brand))]" : ""
      }`}
    >
      {offer.recommended && (
        <span className="absolute -top-3 right-4 rounded-full bg-[hsl(var(--brand))] px-2 py-1 text-xs font-bold text-[hsl(var(--brand-foreground))]">
          Recommandé
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold">{offer.name}</h3>
        <p className="text-sm text-black/70">{offer.tagline}</p>
      </div>
      <ul className="space-y-2 text-sm">
        {offer.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span aria-hidden="true">✔</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Link
          href={`/commande?offer=${encodeURIComponent(offer.id)}&label=${encodeURIComponent(
            offer.name,
          )}&price=${encodeURIComponent(String(price))}`}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-[hsl(var(--brand))] bg-[hsl(var(--brand))] px-4 py-3 font-semibold text-[hsl(var(--brand-foreground))] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--brand))]"
          data-cta={`offer_${offer.id}_devis`}
          aria-label={`${offer.name} – demander un devis`}
        >
          Demander un devis sur mesure
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-border bg-white px-4 py-3 font-semibold text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--brand))]"
          data-cta={`offer_${offer.id}_expert`}
          aria-label={`${offer.name} – parler à un expert`}
        >
          Parler à un expert
        </Link>
      </div>
    </div>
  );
}
