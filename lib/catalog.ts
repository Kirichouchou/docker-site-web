// lib/catalog.ts
import "server-only";

export type ProductKey = "productA" | "productB";

function envInt(name: string, fallback: number): number {
  const v = parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export const CATALOG = [
  {
    key: "productA" as const,
    name: "Pack Formation Pro",
    priceCents: envInt("PRICE_AMOUNT_PRODUCT_A", 15599),  // 155,99 €
    originalPriceCents: 19999,
    bullets: [
      "Accès complet à la formation",
      "Mises à jour incluses",
      "Support réactif",
    ],
    tag: "Le plus populaire",
    image: { src: "/images/productA.jpg", alt: "Pack Pro", width: 1200, height: 800 },
  },
  {
    key: "productB" as const,
    name: "Pack Formation Starter",
    priceCents: envInt("PRICE_AMOUNT_PRODUCT_B", 9999),   // 99,99 €
    originalPriceCents: 12999,
    bullets: [
      "Accès modules essentiels",
      "Mises à jour limitées",
      "Support standard",
    ],
    image: { src: "/images/productB.jpg", alt: "Pack Starter", width: 1200, height: 800 },
  },
];
