"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
      // Redirection vers la page de commande
      window.location.href = `/commande?product=${product.key}`;
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(err.message || "Échec de la redirection.");
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
