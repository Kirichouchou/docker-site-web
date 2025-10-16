"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { logger } from "../lib/logger";

function formatEUR(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

export default function ProductCard(props: {
  product: {
    key: "productA" | "productB";
    name: string;
    priceCents: number;
    originalPriceCents?: number;
    bullets: string[];
    tag?: string;
    image: { src: string; alt: string; width: number; height: number };
  };
}) {
  const { product } = props;
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productKey: product.key }),
      cache: "no-store",
    });

    // Lis le texte brut d'abord pour éviter "Unexpected end of JSON input"
    const text = await res.text();

    if (!res.ok) {
      // Remonte l’erreur du serveur (ex: PRICE_ID non configuré)
      throw new Error(`HTTP ${res.status} – ${text.slice(0, 300)}`);
    }

    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Réponse non-JSON: ${text.slice(0, 300)}`);
    }

    if (data?.url) {
      window.location.href = data.url; // redirection vers Stripe Checkout
    } else {
      throw new Error("Réponse sans URL de paiement.");
    }
  } catch (err: any) {
    logger.error("Erreur lors du checkout", err);
    alert(err.message || "Échec de la création de la session Stripe.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="relative overflow-hidden">
      {product.tag && (
        <div className="absolute top-3 right-3 rounded-2xl bg-brand text-white px-4 py-1.5 text-sm md:text-base font-medium shadow-soft">{product.tag}</div>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl overflow-hidden border border-border mb-4">
          <Image src={product.image.src} alt={product.image.alt} width={product.image.width} height={product.image.height} className="w-full h-auto object-cover" />
        </div>
        <div className="mb-3 flex items-baseline gap-2">
          <div className="text-2xl font-semibold">{formatEUR(product.priceCents)}</div>
          {typeof product.originalPriceCents === "number" && product.originalPriceCents > product.priceCents && (
            <div className="text-base text-muted-foreground line-through">{formatEUR(product.originalPriceCents)}</div>
          )}
        </div>
        <ul className="mb-4 space-y-2 list-disc pl-5 text-muted-foreground">
          {product.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <Button onClick={handleCheckout} disabled={loading} className="w-full h-12">
          {loading ? "Redirection…" : "Acheter maintenant"}
        </Button>
      </CardContent>
    </Card>
  );
}
